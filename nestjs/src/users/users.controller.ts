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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @UseGuards(MeGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Post('update-password')
  @UseGuards(MeGuard)
  updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(req.user.userId, updatePasswordDto)
  }

  @Patch(':id')
  @UseGuards(MeGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(MeGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
