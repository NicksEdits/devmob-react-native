import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestPostDto } from './create-request-post.dto';

export class UpdateRequestPostDto extends PartialType(CreateRequestPostDto) {}
