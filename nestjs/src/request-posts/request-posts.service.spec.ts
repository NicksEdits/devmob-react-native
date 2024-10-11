import { Test, TestingModule } from '@nestjs/testing';
import { RequestPostsService } from './request-posts.service';

describe('RequestPostsService', () => {
  let service: RequestPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestPostsService],
    }).compile();

    service = module.get<RequestPostsService>(RequestPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
