import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  listUsers(): Promise<string[]> {
    return Promise.resolve(['a', 'b'])
  }
}
