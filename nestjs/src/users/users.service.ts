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

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private data: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      (await validate(createUserDto).then((errors) => errors.length > 0)) ||
      createUserDto.password.trim().length === 0 ||
      createUserDto.username.trim().length === 0 ||
      createUserDto.id
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
      updateUserDto.password.trim().length === 0 ||
      updateUserDto.username.trim().length === 0 ||
      updateUserDto.id
    ) {
      throw new UnprocessableEntityException('Invalid data')
    }
    if (updateUserDto.password) {
      updateUserDto.password = hash('sha256', updateUserDto.password)
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

  async remove(id: number): Promise<boolean> {
    const done = await this.data.delete(id)
    return done.affected === 1
  }
}
