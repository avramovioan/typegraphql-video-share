import { BaseUserInput, CreateUserInput, User, UserModel } from '../schema/user.schema'
import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { AppError } from '../utils/error'
import { ErrorCodes } from '../constants/error-codes'
import { generateToken } from '../utils/token'
import bcryptjs from 'bcryptjs'

export class UserService {
  async getUsers(paginatedInput: PaginationInput) {
    const userPaginationServices =
        new PaginationService({ model:  UserModel })
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getUser(_id: string) {
    return UserModel.findById(_id).lean()
  }
  async createUser(user: CreateUserInput) {
    const password = bcryptjs.hashSync(user.password, 10)
    const userData = { ...user, password }
    const createdUser = await UserModel.create(userData)
    return generateToken(createdUser._id, createdUser.roles)
  }
  async deleteUser(_id: string) {
    return UserModel.findByIdAndRemove(_id)
  }
  async updateUser(_id: string, user: BaseUserInput) {
    return UserModel.findByIdAndUpdate(_id, user, { new: true })
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).lean()
    if(!user) {
      throw AppError('User not found', ErrorCodes.BAD_USER_INPUT)
    }
    const isMatching = await bcryptjs.compare(password, user.password)
    if(!isMatching) {
      throw AppError('User not found', ErrorCodes.BAD_USER_INPUT)
    }
    return generateToken(user._id, user.roles)
  }

  async currentUser(user: User) {
    if(!user?._id) {
      throw AppError('Unauthenticated', ErrorCodes.UNAUTHENTICATED)
    }
    return UserModel.findById(user._id).lean()
  }
}