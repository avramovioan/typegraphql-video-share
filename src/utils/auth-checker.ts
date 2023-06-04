import { AuthChecker } from 'type-graphql'
import { Context } from '../types/context'
import { UserRole } from '../enums/user-role'

export const authChecker: AuthChecker<Context> = (
  {
    context: {
      user,
    },
  },
  roles: UserRole[]
) => {
  if(!user?.roles) {
    return false
  }
  return user.roles.some((role: UserRole) => roles.includes(role))
}



