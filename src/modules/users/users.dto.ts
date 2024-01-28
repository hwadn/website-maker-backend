import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export class ListUsersQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  pageSize?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  pageNum?: string
}

class IUser {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({ enum: ['user', 'admin'] })
  role: string
}

export class ListUsersResDto {
  @ApiProperty({ isArray: true, type: IUser })
  data: IUser[]

  @ApiProperty()
  total: number
}
