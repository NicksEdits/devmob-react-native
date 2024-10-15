import {
  Column,
  CreateDateColumn,
  Entity,
  Index, JoinColumn, ManyToOne,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import {IsLatitude, IsLongitude, IsString} from 'class-validator'
import {User} from "../../users/entities/user.entity";

@Entity()
export class RequestPost {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ length: 255 })
  @IsString()
  title: string

  @Column({ type: 'text' })
  @IsString()
  description: string

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  @IsLatitude()
  latitude: Point | null

  @IsLongitude()
  longitude: Point | null

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
