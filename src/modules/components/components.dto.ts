import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumberString,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator'
import { IUser } from '../users/users.dto'

export class ListComponentsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  pageSize?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  pageNum?: string
}

class IComponent {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  version: string

  @ApiProperty()
  display_name: string

  @ApiProperty()
  css_display: string

  @ApiProperty()
  creator_id: number

  @ApiProperty()
  create_time: string

  @ApiProperty()
  update_time: string

  @ApiProperty({ type: IUser })
  creator: IUser
}

export class ListComponentsResDto {
  @ApiProperty({ isArray: true, type: IComponent })
  data: IComponent[]

  @ApiProperty()
  total: number
}

export class CreateComponentBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  version: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  display_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  css_display: string
}

export class IUpdateComponentParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  componentId: string
}
