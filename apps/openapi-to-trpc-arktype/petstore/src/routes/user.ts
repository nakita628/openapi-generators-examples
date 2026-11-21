import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { UserSchema } from '../components'

const t = initTRPC.create()

export const userRouter = t.router({
  postUser: t.procedure
    .input(UserSchema)
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUserCreateWithList: t.procedure
    .input(type(UserSchema).array())
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogin: t.procedure
    .input(type({ 'username?': 'string', 'password?': 'string' }))
    .output(type('string'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogout: t.procedure.query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getUserUsername: t.procedure
    .input(type({ username: 'string' }))
    .output(UserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUserUsername: t.procedure
    .input(
      type({
        username: 'string',
        'id?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'firstName?': 'string',
        'lastName?': 'string',
        'email?': 'string',
        'password?': 'string',
        'phone?': 'string',
        'userStatus?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647',
        ).describe('User Status'),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUserUsername: t.procedure.input(type({ username: 'string' })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
