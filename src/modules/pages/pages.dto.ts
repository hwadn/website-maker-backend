import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

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
  creator_name: string

  @ApiProperty()
  create_time: number

  @ApiProperty()
  update_time: number

  @ApiProperty()
  config: string
}

export class ListPagesResDto {
  @ApiProperty({ isArray: true, type: IPage })
  data: IPage[]

  @ApiProperty()
  total: number
}
