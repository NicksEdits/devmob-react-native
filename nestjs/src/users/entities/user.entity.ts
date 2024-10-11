import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsLatitude, IsString } from 'class-validator'
import { ROLE_USER, ROLES } from 'src/helpers/UserHelper'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column({ length: 255 })
  @IsString()
  username: string

  // @Column({ length: 255, select: false })
  @Column({ length: 255 })
  @IsString()
  password: string

  @Column({ type: 'enum', enum: ROLES, default: ROLE_USER })
  role: (typeof ROLES)[number]

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
