import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  async findOne() {
    return Promise.resolve({ password: '123456', username: 'chd', id: 123 })
  }

  listUsers(): Promise<string[]> {
    return Promise.resolve(['a', 'b'])
  }
}
