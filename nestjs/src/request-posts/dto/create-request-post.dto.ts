import { IsEmpty } from 'class-validator'
import { RequestPost } from '../entities/requestPost.entity'

export class CreateRequestPostDto extends RequestPost {
  lat: number | null
  long: number | null
}
