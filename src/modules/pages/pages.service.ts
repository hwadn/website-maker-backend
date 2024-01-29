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
    // TODO
    const [pages, total] = await this.pageRepository
      .createQueryBuilder('pages')
      .leftJoinAndSelect('pages.user', 'user', 'user.id=pages.creator_id')
      .select(['pages.id', 'user.name'])
      .skip(skip)
      .take(pageSize)
      .getManyAndCount()

    return {
      data: pages,
      total,
    }
  }
}
