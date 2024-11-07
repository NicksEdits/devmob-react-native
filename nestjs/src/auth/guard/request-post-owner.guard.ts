import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '../constants'
import { Request } from 'express'
import { ROLE_ADMIN } from 'src/helpers/UserHelper'
import { RequestPostsService } from 'src/request-posts/request-posts.service'

@Injectable()
export class RequestPostOwnerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private requestPostsService: RequestPostsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const requestPost = await this.requestPostsService.findOne(
      request.params.id,
    )

    if (!requestPost) {
      throw new NotFoundException()
    }

    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      if (
        requestPost.user.id !== payload.userId &&
        payload.role !== ROLE_ADMIN
      ) {
        throw new UnauthorizedException()
      }
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}