import { Column, Entity, Index, Point, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column({ length: 255 })
  username: string

  @Column({ length: 255 })
  password: string

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  latitude: Point | null
}
