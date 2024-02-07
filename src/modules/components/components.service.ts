import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Component } from './components.entity'
import { Repository } from 'typeorm'
import { CreateComponentBodyDto } from './components.dto'

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
  ) {}

  async listComponents(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize
    const [pages, total] = await this.componentRepository
      .createQueryBuilder('components')
      .leftJoinAndSelect(
        'components.creator',
        'user',
        'user.id=components.creator_id',
      )
      .select([
        'components.id',
        'components.name',
        'components.version',
        'components.display_name',
        'components.creator_id',
        'components.create_time',
        'components.update_time',
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

  async createComponent(body: CreateComponentBodyDto & { creator_id: number }) {
    const { creator_id, name, version, display_name } = body
    return this.componentRepository.insert({
      creator_id,
      name,
      version,
      display_name,
    })
  }

  async updateComponent(
    body: CreateComponentBodyDto & { componentId: number },
  ) {
    const { componentId, name, version, display_name } = body
    return this.componentRepository.update(componentId, {
      name,
      version,
      display_name,
    })
  }
}
