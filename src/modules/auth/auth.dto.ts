import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

export class LoginResDto {
  @ApiProperty()
  username: string

  @ApiProperty()
  uid: string

  @ApiProperty()
  accessToken: string
}
