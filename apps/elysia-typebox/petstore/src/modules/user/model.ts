import { t, type UnwrapSchema } from 'elysia'
import { UserSchema } from '../../components/schemas'

export const UserModel = {
  createUsersWithListInputBody: t.Array(UserSchema),
  loginUserQuery: t.Object({ username: t.Optional(t.String()), password: t.Optional(t.String()) }),
  loginUserResponse200: t.String(),
  getUserByNameParams: t.Object({ username: t.String() }),
  updateUserParams: t.Object({ username: t.String() }),
  deleteUserParams: t.Object({ username: t.String() }),
} as const

export type UserModel = { [k in keyof typeof UserModel]: UnwrapSchema<(typeof UserModel)[k]> }
