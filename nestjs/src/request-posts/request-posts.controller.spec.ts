import { Test, TestingModule } from '@nestjs/testing';
import { RequestPostsController } from './request-posts.controller';
import { RequestPostsService } from './request-posts.service';

describe('RequestPostsController', () => {
  let controller: RequestPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestPostsController],
      providers: [RequestPostsService],
    }).compile();

    controller = module.get<RequestPostsController>(RequestPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
