import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { UpdateRequestPostDto } from './dto/update-request-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {RequestPost} from "./entities/requestPost.entity";
import {UpdateUserDto} from "../users/dto/update-user.dto";

@Injectable()
export class RequestPostsService {
  constructor(@InjectRepository(RequestPost) private data: Repository<RequestPost>) {}
  create(createRequestPostDto: CreateRequestPostDto) {
    return this.data.save(createRequestPostDto)
  }

  findAll() {
    return this.data.find()
  }

  findOne(id: number) {
    return this.data.findOneBy({ id })
  }

  async update(id: number, updateRequestPostDto: UpdateRequestPostDto): Promise<RequestPost> {
    const [done] = await Promise.all([this.data.update(id, {...updateRequestPostDto})])
    if (done.affected === 1) {
      return this.findOne(id)
    }
    throw new NotFoundException()
  }

  async remove(id: number) : Promise<boolean> {
    const done = await this.data.delete(id)
    return done.affected === 1
  }

}
