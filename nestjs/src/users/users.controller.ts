import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AdminGuard } from 'src/auth/guard/admin.guard'
import { OwnerGuard } from 'src/auth/guard/owner.guard'
import { hash } from 'crypto'

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
  @UseGuards(OwnerGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(OwnerGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = hash('sha256', updateUserDto.password)
    }
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
