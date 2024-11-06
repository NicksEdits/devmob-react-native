import { IsNotEmpty, IsString } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  lat: number | null

  long: number | null
}
