import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UnprocessableEntityException, UseGuards, Req
} from '@nestjs/common';
import { RequestPostsService } from './request-posts.service';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { UpdateRequestPostDto } from './dto/update-request-post.dto';
import {validate} from "class-validator";
import {AuthGuard} from "../auth/guard/auth.guard";
import {User} from "../users/entities/user.entity";
interface AuthRequest extends Request {
  user: {
    userId: number;
  }
}

@Controller('request-posts')
export class RequestPostsController {
  constructor(private readonly requestPostsService: RequestPostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createRequestPostDto: CreateRequestPostDto,
    @Req() req: AuthRequest
  ) {
    const userId = req.user.userId;
    return this.requestPostsService.create(createRequestPostDto, userId);
  }

  @Get()
    @UseGuards(AuthGuard)

  findAll() {
    return this.requestPostsService.findAll();
  }

  @Get(':id')
    @UseGuards(AuthGuard)

  findOne(@Param('id') id: string) {
    return this.requestPostsService.findOne(+id);
  }

  @Patch(':id')
    @UseGuards(AuthGuard)

  update(@Param('id') id: string, @Body() updateRequestPostDto: UpdateRequestPostDto) {
    return this.requestPostsService.update(+id, updateRequestPostDto);
  }

  @Delete(':id')
    @UseGuards(AuthGuard)

  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.requestPostsService.remove(+id);
  }
}
