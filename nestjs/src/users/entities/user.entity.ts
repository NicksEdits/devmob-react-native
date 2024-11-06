import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator'
import { ROLE_USER, ROLES } from 'src/helpers/UserHelper'
import { RequestPost } from '../../request-posts/entities/requestPost.entity'
import { Point } from 'geojson'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Index()
  @IsEmpty()
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
  posts: RequestPost[]

  // @Column({ type: 'double precision', name: 'd_lat', nullable: true })
  // lat: number | null

  // @Column({ type: 'double precision', name: 'd_long', nullable: true })
  // long: number | null

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  position: Point | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
