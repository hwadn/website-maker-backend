import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/modules/users/users.service'
import { LoginBodyDto } from './auth.dto'
import { IRole } from '../users/users.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginBodyDto) {
    const { inviter, username, password } = body
    if (inviter !== '陈华东') {
      throw new UnauthorizedException('inviter is invalid!', 'login')
    }
    const user = await this.usersService.findOneByName(username)
    let uid
    const role: IRole = 'user'
    if (user) {
      if (user.password !== password) {
        throw new UnauthorizedException('invalid password!', 'login')
      }
      uid = user.id
    } else {
      const insertRes = await this.usersService.createUser({
        name: username,
        password,
        role,
      })
      uid = insertRes.raw.insertId
    }

    const payload = { uid, username, role }
    return {
      username,
      uid,
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
