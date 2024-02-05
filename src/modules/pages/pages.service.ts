import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Page } from './pages.entity'
import { Repository } from 'typeorm'
import { CreatePageBodyDto, UpdatePageBodyDto } from './pages.dto'

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {}

  async listPages(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize
    const [pages, total] = await this.pageRepository
      .createQueryBuilder('pages')
      .leftJoinAndSelect('pages.creator', 'user', 'user.id=pages.creator_id')
      .select([
        'pages.id',
        'pages.title',
        'pages.creator_id',
        'pages.create_time',
        'pages.update_time',
        'pages.config',
        'user.name',
        'user.id',
        'user.role',
      ])
      .skip(skip)
      .take(pageSize)
      .getManyAndCount()

    return {
      data: pages,
      total,
    }
  }

  async createPage(body: CreatePageBodyDto & { creator_id: number }) {
    const { creator_id, title } = body
    return this.pageRepository.insert({ creator_id, title })
  }

  async updatePage(body: UpdatePageBodyDto & { pageId: number }) {
    const { pageId, title, config } = body
    return this.pageRepository.update(pageId, { title, config })
  }

  async getPageDetail(pageId: number) {
    const detail = await this.pageRepository.findOne({
      where: { id: pageId },
      relations: ['creator'],
      select: [
        'id',
        'title',
        'creator_id',
        'create_time',
        'update_time',
        'config',
        'creator',
      ],
    })
    const { creator, ...others } = detail
    const { id, name, create_time, role } = creator
    return { ...others, creator: { id, name, create_time, role } }
  }
}
