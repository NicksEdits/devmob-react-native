import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { hash } from 'crypto'
import { validate } from 'class-validator'
import { Point } from 'geojson'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private data: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      (await validate(createUserDto).then((errors) => errors.length > 0)) ||
      createUserDto.password.trim().length === 0 ||
      createUserDto.username.trim().length === 0
    ) {
      throw new UnprocessableEntityException('Invalid data')
    }
    if (await this.data.findOneBy({ username: createUserDto.username })) {
      throw new UnprocessableEntityException('Username already exists')
    }
    createUserDto.password = hash('sha256', createUserDto.password)

    if (createUserDto.lat && createUserDto.long) {
      const position: Point = {
        type: 'Point',
        coordinates: [createUserDto.long, createUserDto.lat],
      }
      createUserDto.position = position
    }

    createUserDto.long = undefined
    createUserDto.lat = undefined

    return this.data.save(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.data.find().then((users) => {
      users.forEach((user) => (user.password = undefined))
      return users
    })
  }

  findOne(id: number): Promise<User> {
    return this.data.findOneBy({ id }).then((user) => {
      if (!user) {
        throw new NotFoundException()
      }
      user.password = undefined
      return user
    })
  }

  findOneByUsername(username: string): Promise<User> {
    return this.data.findOneBy({ username }).then((user) => {
      if (!user) {
        throw new NotFoundException()
      }
      user.password = undefined
      return user
    })
  }

  findOneByUsernameWithPassword(username: string): Promise<User> {
    return this.data.findOneBy({ username })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (
      validate(updateUserDto).then((errors) => errors.length > 0) ||
      updateUserDto.username.trim().length === 0
    ) {
      throw new UnprocessableEntityException('Invalid data')
    }
    if (updateUserDto.password) {
      delete updateUserDto.password
    }

    if (updateUserDto.lat && updateUserDto.long) {
      const position: Point = {
        type: 'Point',
        coordinates: [updateUserDto.long, updateUserDto.lat],
      }
      updateUserDto.position = position
    }

    updateUserDto.long = undefined
    updateUserDto.lat = undefined

    const done = await this.data.update(id, { ...updateUserDto })
    if (done.affected === 1) {
      return this.findOne(id)
    }
    throw new NotFoundException()
  }

  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Object> {
    const user = await this.data.findOneBy({ id: userId })
    if (!user) {
      throw new NotFoundException()
    }

    const payloadValid = await validate(updatePasswordDto).then(
      (errors) => errors.length > 0,
    )
    if (payloadValid) {
      throw new UnprocessableEntityException('Invalid data')
    }

    const currentPassword = hash('sha256', updatePasswordDto.currentPassword)
    if (currentPassword !== user.password) {
      throw new UnprocessableEntityException('Invalid current password')
    }

    if (
      updatePasswordDto.newPassword !== updatePasswordDto.confirmNewPassword
    ) {
      throw new UnprocessableEntityException('Passwords do not match')
    }

    updatePasswordDto.newPassword = hash(
      'sha256',
      updatePasswordDto.newPassword,
    )

    const done = await this.data.update(userId, {
      password: updatePasswordDto.newPassword,
    })
    if (done.affected === 1) {
      return {
        message: 'Password updated',
      }
    }
    throw new NotFoundException()
  }

  async remove(id: number): Promise<boolean> {
    const done = await this.data.delete(id)
    return done.affected === 1
  }
}
