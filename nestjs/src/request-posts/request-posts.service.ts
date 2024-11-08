import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { UpdateRequestPostDto } from './dto/update-request-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {RequestPost} from "./entities/requestPost.entity";
import {asapScheduler} from "rxjs";
import {UsersService} from "../users/users.service";

@Injectable()
export class RequestPostsService {
  constructor(
    @InjectRepository(RequestPost) private data: Repository<RequestPost>,
    private userService: UsersService
  ) {}


  async create(createRequestPostDto: CreateRequestPostDto, userId: number) {
    const user = await this.userService.findOne(userId)
    // Créer un nouveau post avec l'utilisateur associé
    const newRequestPost = this.data.create({
      ...createRequestPostDto,
      user: user, // Assigner directement l'utilisateur
    });

    newRequestPost.user = user;

    return this.data.save(newRequestPost).then((post) => {
      if (!post) {
        throw new NotFoundException()
      }
      post.user.password = undefined
      post.user.role = undefined
      post.user.updatedAt = undefined
      return post
    });
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
    });
  }

  findOne(id: number) {
    return this.data.findOne( { where: { id }, relations: ['user']}).then((post) => {
      if (!post) {
        throw new NotFoundException()
      }
      post.user.password = undefined
      post.user.role = undefined
      post.user.updatedAt = undefined
      return post
    })
  }

  async update(id: number, updateRequestPostDto: UpdateRequestPostDto): Promise<RequestPost> {
    const [done] = await Promise.all([this.data.update(id, {...updateRequestPostDto})])
    if (done.affected === 1) {
      return this.data.findOne({ where: { id }, relations: ['user']}).then((post) => {
        if (!post) {
          throw new NotFoundException()
        }
        post.user.password = undefined
        post.user.role = undefined
        post.user.updatedAt = undefined
        return post
      });
    }
    throw new NotFoundException()
  }

  async remove(id: number) : Promise<boolean> {
    const done = await this.data.delete(id)
    return done.affected === 1
  }

}
