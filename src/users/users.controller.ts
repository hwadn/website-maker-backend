import { Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser() {
    return {}
  }

  @Get()
  listUsers() {
    return this.usersService.listUsers()
  }

  @Get('/:id')
  getUserById() {
    return {}
  }
}
