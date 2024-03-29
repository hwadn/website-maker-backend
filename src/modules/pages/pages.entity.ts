import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm'
import { User } from '../users/users.entity'

@Entity('wm_pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  @RelationId((page: Page) => page.creator)
  creator_id: number

  @Column()
  create_time: string

  @Column()
  update_time: string

  @Column()
  config: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User
}
