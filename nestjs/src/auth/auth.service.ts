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
    if (user && hashedPassword === user.password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    console.log("signInDto")
    const user = await this.validateUser(signInDto.username, signInDto.password)
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = {
      username: user.username,
      userId: user.id,
      role: user.role,
      expiresIn: '30d',
    }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: RegisterDto): Promise<any> {
    await this.usersService.create({
      ...createUserDto,
      password: createUserDto.password,
    })
    return this.signIn({
      username: createUserDto.username,
      password: createUserDto.password,
    })
  }
}
