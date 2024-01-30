import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'
import { IUser } from '../users/users.dto'

export class ListPagesQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  pageSize?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  pageNum?: string
}

class IPage {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  creator_id: number

  @ApiProperty()
  create_time: string

  @ApiProperty()
  update_time: string

  @ApiProperty()
  config: string

  @ApiProperty({ type: IUser })
  creator: IUser
}

export class ListPagesResDto {
  @ApiProperty({ isArray: true, type: IPage })
  data: IPage[]

  @ApiProperty()
  total: number
}
