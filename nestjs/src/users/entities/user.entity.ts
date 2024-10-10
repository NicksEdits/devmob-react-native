import { Column, Entity, Index, Point, PrimaryGeneratedColumn } from 'typeorm'
import { IsLatitude, IsString } from 'class-validator'

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

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  @IsLatitude()
  latitude: Point | null
}
