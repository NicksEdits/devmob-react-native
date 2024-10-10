import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto'
import { SignInDto } from './dto/signin.dto'
import { hash } from 'crypto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameWithPassword(username)
    const hashedPassword = hash('sha256', pass)
    if (user && user.password === hashedPassword) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.validateUser(signInDto.username, signInDto.password)
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = {
      username: user.username,
      sub: user.id,
    }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: RegisterDto): Promise<any> {
    const hashedPassword = hash('sha256', createUserDto.password)
    await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    })
    return this.signIn({
      username: createUserDto.username,
      password: createUserDto.password,
    })
  }
}
