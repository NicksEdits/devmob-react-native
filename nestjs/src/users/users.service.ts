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

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private data: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      (await validate(createUserDto).then((errors) => errors.length > 0)) ||
      !createUserDto.password ||
      !createUserDto.username
    ) {
      throw new UnprocessableEntityException('Invalid data')
    }
    if (await this.data.findOneBy({ username: createUserDto.username })) {
      throw new UnprocessableEntityException('Username already exists')
    }
    createUserDto.password = hash('sha256', createUserDto.password)
    return this.data.save(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.data.find().then((users) => {
      users.forEach((user) => (user.password = undefined))
      return users
    })
  }
  //o

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
      !updateUserDto.password ||
      !updateUserDto.username
    ) {
      throw new UnprocessableEntityException('Invalid data')
    }
    if (updateUserDto.password) {
      updateUserDto.password = hash('sha256', updateUserDto.password)
    }
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
