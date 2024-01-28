import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findOneByName(username)
    let uid
    if (user) {
      if (user.password !== password) {
        throw new UnauthorizedException('invalid password!')
      }
      uid = user.id
    } else {
      const insertRes = await this.usersService.createUser({
        name: username,
        password,
        role: 'user',
      })
      uid = insertRes.raw.insertId
    }

    const payload = { sub: uid, username }
    return {
      username,
      uid,
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
