import {
  Column,
  CreateDateColumn,
  Entity,
  Index, OneToMany,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsLatitude, IsNotEmpty, IsString } from 'class-validator'
import { ROLE_USER, ROLES } from 'src/helpers/UserHelper'
import {RequestPost} from "../../request-posts/entities/requestPost.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column({ length: 255 })
  @IsString()
  @IsNotEmpty()
  username: string

  // @Column({ length: 255, select: false })
  @Column({ length: 255 })
  @IsString()
  password: string

  @Column({ type: 'enum', enum: ROLES, default: ROLE_USER })
  role: (typeof ROLES)[number]

  @OneToMany(() => RequestPost, (post) => post.user)
  posts: RequestPost[];

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  @IsLatitude()
  latitude: Point | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
