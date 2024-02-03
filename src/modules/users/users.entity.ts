import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export type IRole = 'user' | 'admin'

@Entity('wm_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  create_time: string

  @Column({
    enum: ['user', 'admin'],
  })
  role: IRole
}
