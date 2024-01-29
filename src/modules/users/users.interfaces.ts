import { IRole } from 'src/modules/users/users.entity'

export interface ICreateUserArgs {
  name: string
  password: string
  role: IRole
}
