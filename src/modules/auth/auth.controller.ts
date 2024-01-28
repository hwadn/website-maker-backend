import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'src/decorators/public'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginBodyDto, LoginResDto } from './auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({ type: LoginResDto })
  login(@Body() body: LoginBodyDto): Promise<LoginResDto> {
    return this.authService.login(body.username, body.password)
  }
}
