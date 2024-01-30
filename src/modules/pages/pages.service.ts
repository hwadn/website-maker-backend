import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Page } from './pages.entity'
import { Repository } from 'typeorm'

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
}
