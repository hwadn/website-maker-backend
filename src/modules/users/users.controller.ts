import { Controller, Get, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListUsersQueryDto, ListUsersResDto } from './users.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: ListUsersResDto })
  listUsers(@Query() query: ListUsersQueryDto): Promise<ListUsersResDto> {
    const { pageSize = 10, pageNum = 1 } = query
    return this.usersService.listUsers(Number(pageSize), Number(pageNum))
  }
}
