import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { CreateRequestPostDto } from './dto/create-request-post.dto'
import { UpdateRequestPostDto } from './dto/update-request-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
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
    if (
      await validate(createRequestPostDto).then((errors) => errors.length > 0)
    ) {
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
      return posts
    })
  }

  async getRange(lat: number, long: number, range: number = 1000) {
    let origin = {
      type: 'Point',
      coordinates: [long, lat],
    }
    let posts = await this.data
      .createQueryBuilder('request_post')
      .select([
        '*',
        'ST_Distance(request_post.position, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(request_post.position)))/1000 AS distance',
      ])
      .where(
        'ST_DWithin(request_post.position, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(request_post.position)) ,:range)',
      )
      .orderBy('distance', 'ASC')
      .setParameters({
        // stringify GeoJSON
        origin: JSON.stringify(origin),
        range: range * 1000, //KM conversion
      })
      .leftJoinAndSelect('request_post.user', 'user')
      .getRawMany()
      .then((posts) => {
        posts.forEach((post) => {
          // parse all user_ props to user object
          post.user = new User()
          post.user.id = post.user_id
          post.user.email = post.user_email
          post.user.position = post.user_position
          post.user.username = post.user_username
          post.user.createdAt = post.user_createdAt

          post.user_password = undefined
          post.user_role = undefined
          post.user_updatedAt = undefined

          post.user_id = undefined
          post.user_email = undefined
          post.user_position = undefined
          post.user_username = undefined
          post.user_createdAt = undefined
        })
        return posts
      })
    return posts
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
    if (
      await validate(updateRequestPostDto).then((errors) => errors.length > 0)
    ) {
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
