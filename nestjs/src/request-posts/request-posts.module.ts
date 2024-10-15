import { Module } from '@nestjs/common';
import { RequestPostsService } from './request-posts.service';
import { RequestPostsController } from './request-posts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestPost} from "./entities/requestPost.entity";
import {User} from "../users/entities/user.entity";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [RequestPostsController],
  providers: [RequestPostsService],
  imports: [
    TypeOrmModule.forFeature([RequestPost, User]),  // Ajoutez User ici si vous utilisez le dépôt dans ce module
    UsersModule,  // Assurez-vous que UserModule est bien importé
  ],  exports: [RequestPostsService],
})
export class RequestPostsModule {}
