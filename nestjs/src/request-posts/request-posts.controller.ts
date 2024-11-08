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
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { RequestPostsService } from './request-posts.service'
import { CreateRequestPostDto } from './dto/create-request-post.dto'
import { UpdateRequestPostDto } from './dto/update-request-post.dto'
import { AuthGuard } from '../auth/guard/auth.guard'
import { RequestPostOwnerGuard } from '../auth/guard/request-post-owner.guard'

interface AuthRequest extends Request {
  user: {
    userId: number
  }
}

@Controller('request-posts')
export class RequestPostsController {
  constructor(private readonly requestPostsService: RequestPostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createRequestPostDto: CreateRequestPostDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.userId
    return this.requestPostsService.create(createRequestPostDto, userId)
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Query('lat') lat: number | null,
    @Query('long') long: number | null,
    @Query('range') range: number | null,
  ) {
    if (lat && long) {
      return this.requestPostsService.getRange(lat, long, range)
    }
    return this.requestPostsService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.requestPostsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RequestPostOwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateRequestPostDto: UpdateRequestPostDto,
  ) {
    return this.requestPostsService.update(+id, updateRequestPostDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RequestPostOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.requestPostsService.remove(+id)
  }
}
