import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'src/decorators/public'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login() {
    return this.authService.login('chd', '123456')
  }
}
