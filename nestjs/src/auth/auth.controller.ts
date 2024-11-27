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
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Requires guest access, does not require authentication (GuestGuard)'
  })
  @ApiResponse({
    status: 200,
    example: { token: 'string' },
    description: 'Returns a JWT token upon successful login'
  })
  @ApiBody({
    type: SignInDto,
    description: 'User credentials to sign in',
    examples: {
      default: {
        value: {
          username: 'Nicolas',
          password: 'password123',
        }
      }
    }
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiOperation({
    summary: 'Register',
    description: 'Requires guest access for registering a new user (GuestGuard)'
  })
  @ApiResponse({
    status: 200,
    example: { token: 'string' },
    description: 'Returns a JWT token upon successful registration'
  })
  @ApiBody({
    type: RegisterDto,
    description: 'User details for registration',
    examples: {
      default: {
        value: {
          username: 'Nicolas',
          password: 'password123',
        }
      }
    }
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
}