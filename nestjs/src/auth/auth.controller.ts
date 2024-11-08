import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './guard/auth.guard'
import { RegisterDto } from './dto/register.dto'
import { GuestGuard } from './guard/guest.guard'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { SignInDto } from './dto/signin.dto'
import { UsersService } from 'src/users/users.service'

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  //   @UseGuards(GuestGuard)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    console.log('login', signInDto)
    return this.authService.signIn(signInDto)
  }

  //   @UseGuards(GuestGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @UseGuards(AuthGuard)
  @Get('users/me')
  getProfile(@Request() req) {
    const userId = req.user.userId
    return this.userService.findOne(userId)
  }
}
