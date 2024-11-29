import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { CreateRequestPostDto } from './dto/create-request-post.dto'
import { UpdateRequestPostDto } from './dto/update-request-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Equal, Not, Repository } from 'typeorm'
import { RequestPost } from './entities/requestPost.entity'
import { UsersService } from '../users/users.service'
import { Point } from 'geojson'
import { validate } from 'class-validator'

@Injectable()
export class RequestPostsService {
  constructor(
    @InjectRepository(RequestPost) private data: Repository<RequestPost>,
    private userService: UsersService,
  ) {}

  async create(createRequestPostDto: CreateRequestPostDto, userId: number) {
    console.log('createRequestPostDto', createRequestPostDto)
    const errors = await validate(createRequestPostDto)
    if (errors.length > 0) {
      throw new UnprocessableEntityException('Invalid data')
    }

    const user = await this.userService.findOne(userId)

    if (!user) {
      throw new NotFoundException()
    }

    if (createRequestPostDto.lat && createRequestPostDto.long) {
      const position: Point = {
        type: 'Point',
        coordinates: [createRequestPostDto.long, createRequestPostDto.lat],
      }
      createRequestPostDto.position = position
    }

    createRequestPostDto.long = undefined
    createRequestPostDto.lat = undefined

    const newRequestPost = this.data.create({
      ...createRequestPostDto,
      user: user, // Assigner directement l'utilisateur
    })

    newRequestPost.user = user

    return this.data.save(newRequestPost).then((post) => {
      if (!post) {
        throw new NotFoundException()
      }
      post.user.password = undefined
      post.user.role = undefined
      post.user.updatedAt = undefined
      return post
    })
  }

  findAll() {
    return this.data.find({ relations: ['user'] }).then((posts) => {
      posts.forEach((post) => {
        if (post.user) {
          post.user.password = undefined
          post.user.role = undefined
          post.user.updatedAt = undefined
        }
      })
      return posts.sort((a, b) => {
        return b.updated_at.getTime() - a.updated_at.getTime()
      })
    })
  }

  findAllFromOtherUsers(userId: number) {
    return this.data
      .find({ relations: ['user'], where: { user: Not(userId) } })
      .then((posts) => {
        posts.forEach((post) => {
          if (post.user) {
            post.user.password = undefined
            post.user.role = undefined
            post.user.updatedAt = undefined
          }
        })
        return posts.sort((a, b) => {
          return b.updated_at.getTime() - a.updated_at.getTime()
        })
      })
  }

  findAllFromSpecificUser(userId: number) {
    return this.data
      .find({ relations: ['user'], where: { user: Equal(userId) } })
      .then((posts) => {
        posts.forEach((post) => {
          if (post.user) {
            post.user.password = undefined
            post.user.role = undefined
            post.user.updatedAt = undefined
          }
        })
        return posts.sort((a, b) => {
          return b.updated_at.getTime() - a.updated_at.getTime()
        })
      })
  }

  async getRange(
    userId: number,
    lat: number,
    long: number,
    range: number = 5000, // 5km
  ) {
    let origin = {
      type: 'Point',
      coordinates: [long, lat],
    }
    let posts = await this.data
      .createQueryBuilder('rq')
      .select([
        '*',
        'rq.id as rq_id',
        'ST_Distance(rq.position, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(rq.position))) AS distance',
      ])
      .where(
        'ST_DWithin(rq.position, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(rq.position)) ,:range)',
      )
      .andWhere('rq.userId != :userId', { userId })
      .orderBy('distance', 'ASC')
      .setParameters({
        // stringify GeoJSON
        origin: JSON.stringify(origin),
        range: range,
      })
      .innerJoinAndSelect('user', 'useruser', 'useruser.id = rq.userId')
      .getRawMany()
      .then((posts) => {
        posts.forEach((post) => {
          // parse all user_ props to user object
          post.id = post.rq_id
          post.rq_id = undefined
          post.userId = undefined

          post.user = new User()
          post.user.id = post.useruser_id
          post.user.position = post.useruser_position
          post.user.username = post.useruser_username
          post.user.createdAt = post.useruser_createdAt

          post.useruser_password = undefined
          post.useruser_role = undefined
          post.useruser_updatedAt = undefined

          post.useruser_id = undefined
          post.useruser_email = undefined
          post.useruser_position = undefined
          post.useruser_username = undefined
          post.useruser_createdAt = undefined
        })
        return posts
      })
    return posts.sort((a, b) => {
      return b.updated_at.getTime() - a.updated_at.getTime()
    })
  }

  findOne(id: number) {
    return this.data
      .findOne({ where: { id }, relations: ['user'] })
      .then((post) => {
        if (!post) {
          throw new NotFoundException()
        }
        post.user.password = undefined
        post.user.role = undefined
        post.user.updatedAt = undefined
        return post
      })
  }

  async update(
    id: number,
    updateRequestPostDto: UpdateRequestPostDto,
  ): Promise<RequestPost> {
    const errors = await validate(updateRequestPostDto)
    if (errors.length > 0) {
      throw new UnprocessableEntityException('Invalid data')
    }

    if (updateRequestPostDto.lat && updateRequestPostDto.long) {
      const position: Point = {
        type: 'Point',
        coordinates: [updateRequestPostDto.long, updateRequestPostDto.lat],
      }
      updateRequestPostDto.position = position
    }

    updateRequestPostDto.long = undefined
    updateRequestPostDto.lat = undefined

    const [done] = await Promise.all([
      this.data.update(id, { ...updateRequestPostDto }),
    ])
    if (done.affected === 1) {
      return this.data
        .findOne({ where: { id }, relations: ['user'] })
        .then((post) => {
          if (!post) {
            throw new NotFoundException()
          }
          post.user.password = undefined
          post.user.role = undefined
          post.user.updatedAt = undefined
          return post
        })
    }
    throw new NotFoundException()
  }

  async remove(id: number): Promise<boolean> {
    const done = await this.data.delete(id)
    return done.affected === 1
  }
}
