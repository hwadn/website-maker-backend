import { IRole } from 'src/entities/user.entity'

export interface ICreateUserArgs {
  name: string
  password: string
  role: IRole
}
