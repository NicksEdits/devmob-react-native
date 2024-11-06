import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { IsString } from 'class-validator'
import { User } from '../../users/entities/user.entity'
import { Point } from 'geojson'

@Entity()
export class RequestPost {
  @PrimaryGeneratedColumn()
  @Index()
  @Unique('id', ['id'])
  id: number

  @Index()
  @Column({ length: 255 })
  @IsString()
  title: string

  @Column({ type: 'text' })
  @IsString()
  description: string

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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user!: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
