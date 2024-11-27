import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AdminGuard } from 'src/auth/guard/admin.guard'
import { MeGuard } from 'src/auth/guard/me.guard'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Users',
    description: 'Requires admin authentication (AdminGuard)'
  })
  @ApiResponse({
    status: 200,
    example: {
      id: 5,
      username: "Nicolas",
      role: "USER",
      position: null,
      createdAt: "2024-11-25T13:08:40.991Z",
      updatedAt: "2024-11-25T13:37:56.124Z"
    }
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to create',
    examples: {
      default: {
        value: {
          username: "Nicolas",
          password: "password123",
          lat: 48.8566,
          long: 2.3522
        }
      }
    }
  })
  @UseGuards(AdminGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Users',
    description: 'Requires admin authentication (AdminGuard)'
  })
  @ApiResponse({
    status: 200,
    example: { users : [{
        id: 5,
        username: 'Nicolas',
        role: 'USER',
        position: null,
        createdAt: '2024-11-25T13:08:40.991Z',
        updatedAt: '2024-11-25T13:37:56.124Z'
      },
        {
          id: 6,
          username: 'Patrick',
          role: 'USER',
          position: null,
          createdAt: '2024-11-25T13:08:40.991Z',
          updatedAt: '2024-11-25T13:37:56.124Z'
        }]
    }
  })
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get current authenticated user',
    description: 'Requires user authentication (AuthGuard)'
  })
  @ApiResponse({
    status: 200,
    example: {
      id: 5,
      username: "Nicolas",
      role: "USER",
      position: null,
      createdAt: "2024-11-25T13:08:40.991Z",
      updatedAt: "2024-11-25T13:37:56.124Z"
    }
  })
  getProfile(@Request() req) {
    const userId = req.user.userId
    return this.usersService.findOne(userId)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get User by id',
    description: 'Requires authentication for accessing your own profile or Admin access (MeGuard)'
  })
  @ApiResponse({
    status: 200,
    example: {
      id: 5,
      username: "Nicolas",
      role: "USER",
      position: null,
      createdAt: "2024-11-25T13:08:40.991Z",
      updatedAt: "2024-11-25T13:37:56.124Z"
    }
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user to retrieve' })
  @UseGuards(MeGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Post('update-password')
  @ApiOperation({
    summary: 'Update User Password',
    description: 'Requires authentication for password change (AuthGuard)'
  })
  @ApiResponse({
    status: 200,
    example: {
      id: 5,
      username: "Nicolas",
      role: "USER",
      position: null,
      createdAt: "2024-11-25T13:08:40.991Z",
      updatedAt: "2024-11-25T13:37:56.124Z"
    }
  })
  @ApiBody({
    type: UpdatePasswordDto,
    description: 'Password change data',
    examples: {
      default: {
        value: {
          currentPassword: "password123",
          newPassword: "newpassword123",
          confirmNewPassword: "newpassword123"
        }
      }
    }
  })
  @UseGuards(AuthGuard)
  updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(req.user.userId, updatePasswordDto)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update User',
    description: 'Requires authentication for updating your own profile or Admin access (MeGuard)'
  })
  @ApiResponse({
    status: 200,
    example: {
      id: 5,
      username: "Nicolas",
      role: "USER",
      position: null,
      createdAt: "2024-11-25T13:08:40.991Z",
      updatedAt: "2024-11-25T13:37:56.124Z"
    }
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user to update' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data to update',
    examples: {
      default: {
        value: {
          username: "Nicolas",
          password: "newpassword123",
          lat: 48.8566,
          long: 2.3522
        }
      }
    }
  })
  @UseGuards(MeGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete User',
    description: 'Requires authentication to delete your own profile (MeGuard)'
  })
  @ApiResponse({
    status: 200,
    example: {
      id: 5,
      username: "Nicolas",
      role: "USER",
      position: null,
      createdAt: "2024-11-25T13:08:40.991Z",
      updatedAt: "2024-11-25T13:37:56.124Z"
    }
  })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user to delete' })
  @UseGuards(MeGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}