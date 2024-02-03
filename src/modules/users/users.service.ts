import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/modules/users/users.entity'
import { ICreateUserArgs } from './users.interfaces'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(args: ICreateUserArgs) {
    return this.usersRepository.insert(args)
  }

  findOneByName(username: string) {
    return this.usersRepository.findOneBy({ name: username })
  }

  async listUsers(pageSize: number, pageNumber: number) {
    const skip = (pageNumber - 1) * pageSize
    const [users, total] = await this.usersRepository.findAndCount({
      skip,
      take: pageSize,
      select: ['id', 'name', 'role', 'create_time'],
    })

    return {
      data: users,
      total,
    }
  }
}
