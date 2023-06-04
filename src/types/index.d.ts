import { User } from '../schema/user.schema'

declare module 'express' {

    export interface Request {
        user: User
    }
}
