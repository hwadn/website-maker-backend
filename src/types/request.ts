import { Request } from 'express'

interface IUser {
  uid: number
  name: string
}

export interface IRequest extends Request {
  user: IUser
}
