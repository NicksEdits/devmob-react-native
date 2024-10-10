import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private data: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.data.save(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.data.find()
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
