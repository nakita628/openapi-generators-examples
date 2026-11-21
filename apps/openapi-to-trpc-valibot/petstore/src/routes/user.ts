import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(v.array(UserSchema))
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogin: t.procedure
    .input(v.partial(v.object({ username: v.string(), password: v.string() })))
    .output(v.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogout: t.procedure.query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getUserUsername: t.procedure
    .input(v.object({ username: v.string() }))
    .output(UserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUserUsername: t.procedure
    .input(
      v.object({
        username: v.string(),
        id: v.optional(
          v.pipe(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        firstName: v.optional(v.pipe(v.string(), v.metadata({ examples: ['John'] }))),
        lastName: v.optional(v.pipe(v.string(), v.metadata({ examples: ['James'] }))),
        email: v.optional(v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] }))),
        password: v.optional(v.pipe(v.string(), v.metadata({ examples: ['12345'] }))),
        phone: v.optional(v.pipe(v.string(), v.metadata({ examples: ['12345'] }))),
        userStatus: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
            v.description('User Status'),
            v.metadata({ examples: [1] }),
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUserUsername: t.procedure.input(v.object({ username: v.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
