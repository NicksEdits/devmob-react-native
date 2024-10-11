import { Module } from '@nestjs/common';
import { RequestPostsService } from './request-posts.service';
import { RequestPostsController } from './request-posts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestPost} from "./entities/requestPost.entity";

@Module({
  controllers: [RequestPostsController],
  providers: [RequestPostsService],
  imports: [TypeOrmModule.forFeature([RequestPost])],
  exports: [RequestPostsService],
})
export class RequestPostsModule {}
