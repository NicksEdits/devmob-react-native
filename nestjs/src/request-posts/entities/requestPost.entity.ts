import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { IsLatitude, IsString } from 'class-validator'
import {User} from "../../users/entities/user.entity";

@Entity()
export class RequestPost {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
