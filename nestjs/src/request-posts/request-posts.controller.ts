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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger'

interface AuthRequest extends Request {
  user: {
    userId: number
  }
}

@ApiTags('posts')
@Controller('request-posts')
export class RequestPostsController {
  constructor(private readonly requestPostsService: RequestPostsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a Request Post',
    description: 'Requires authentication (AuthGuard)',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a request post',
    example: {
      id: 1,
      title: "Titre du post",
      description: "Description du post",
      distant: 0,
      user: {
        id: 1,
        username: "Nicolas",
        role: "USER",
        position: null,
        createdAt: "2024-11-25T13:08:40.991Z",
        updatedAt: "2024-11-25T13:37"
      },
      lat: 48.8566,
      long: 2.3522,
      createdAt: '2024-11-25T13:08:40.991Z',
      updatedAt: '2024-11-25T13:37:56.124Z',
    },
  })
  @ApiBody({
    type: CreateRequestPostDto,
    description: 'Details of the request post to be created',
    examples: {
      default: {
        value: {
          title: "Titre du post",
          description: "Description du post",
          lat: 48.8566,
          long: 2.3522,
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  create(
    @Body() createRequestPostDto: CreateRequestPostDto,
    @Req() req: AuthRequest,
  ) {
    return this.requestPostsService.create(
      createRequestPostDto,
      req.user.userId,
    )
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Request Posts',
    description: 'Requires authentication (AuthGuard). Can filter by location and range.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all request posts',
    example: [
      {
        id: 1,
        title: "Titre du post",
        description: "Description du post",
        distant: 0,
        lat: 48.8566,
        long: 2.3522,
        createdAt: '2024-11-25T13:08:40.991Z',
        updatedAt: '2024-11-25T13:37:56.124Z',
      },
    ],
  })
  @ApiQuery({
    name: 'lat',
    required: false,
    description: 'Latitude to filter posts by location',
    type: Number,
  })
  @ApiQuery({
    name: 'long',
    required: false,
    description: 'Longitude to filter posts by location',
    type: Number,
  })
  @UseGuards(AuthGuard)
  findAll(
    @Query('lat') lat: number | null,
    @Query('long') long: number | null,
    @Req() req: AuthRequest,
  ) {
    if (lat && long) {
      return this.requestPostsService.getRange(
        req.user.userId,
        lat,
        long,
      )
    }
    return this.requestPostsService.findAllFromOtherUsers(req.user.userId)
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get all Request Posts from the authenticated user',
    description: 'Requires authentication (AuthGuard)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched request posts from the current user',
    example: [
      {
        id: 1,
        title: "Titre du post",
        description: "Description du post",
        distant: 0,
        lat: 48.8566,
        long: 2.3522,
        createdAt: '2024-11-25T13:08:40.991Z',
        updatedAt: '2024-11-25T13:37:56.124Z',
      },
    ],
  })
  @UseGuards(AuthGuard)
  findAllFromSpecificUser(@Req() req: AuthRequest) {
    return this.requestPostsService.findAllFromSpecificUser(req.user.userId)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Request Post by ID',
    description: 'Requires authentication (AuthGuard)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched a request post',
    example: {
      id: 1,
      title: "Titre du post",
      description: "Description du post",
      distant: 0,
      lat: 48.8566,
      long: 2.3522,
      createdAt: '2024-11-25T13:08:40.991Z',
      updatedAt: '2024-11-25T13:37:56.124Z',
    },
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the request post to fetch',
    type: String,
  })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.requestPostsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Request Post',
    description: 'Requires authentication and ownership verification',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the request post',
    example: {
      id: 1,
      title: "Titre du post",
      description: "Description du post",
      distant: 0,
      user: {
        id: 1,
        username: "Nicolas",
        role: "USER",
        position: null,
        createdAt: "2024-11-25T13:08:40.991Z",
        updatedAt: "2024-11-25T13:37"
      },
      lat: 48.8566,
      long: 2.3522,
      createdAt: '2024-11-25T13:08:40.991Z',
      updatedAt: '2024-11-25T13:37:56.124Z',
    },
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the request post to update',
    type: String,
  })
  @ApiBody({
    type: UpdateRequestPostDto,
    examples: {
      default: {
        value: {
          title: "Titre du post",
          description: "Description du post",
        }
      }
    },
    description: 'Updated details of the request post',
  })
  @UseGuards(AuthGuard, RequestPostOwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateRequestPostDto: UpdateRequestPostDto,
  ) {
    return this.requestPostsService.update(+id, updateRequestPostDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Request Post',
    description: 'Requires authentication  and ownership verification ',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted the request post',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the request post to delete',
    type: String,
  })
  @UseGuards(AuthGuard, RequestPostOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.requestPostsService.remove(+id)
  }
}