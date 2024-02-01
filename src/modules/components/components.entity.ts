import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm'
import { User } from '../users/users.entity'

@Entity('wm_components')
export class Component {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  version: string

  @Column()
  display_name: string

  @Column()
  css_display: string

  @Column()
  @RelationId((component: Component) => component.creator)
  creator_id: number

  @Column()
  create_time: string

  @Column()
  update_time: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User
}
