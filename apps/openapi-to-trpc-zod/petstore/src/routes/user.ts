import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
    .input(z.array(UserSchema))
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogin: t.procedure
    .input(z.object({ username: z.string().exactOptional(), password: z.string().exactOptional() }))
    .output(z.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogout: t.procedure.query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getUserUsername: t.procedure
    .input(z.object({ username: z.string() }))
    .output(UserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUserUsername: t.procedure
    .input(
      z.object({
        username: z.string(),
        id: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        firstName: z
          .string()
          .meta({ examples: ['John'] })
          .exactOptional(),
        lastName: z
          .string()
          .meta({ examples: ['James'] })
          .exactOptional(),
        email: z
          .string()
          .meta({ examples: ['john@email.com'] })
          .exactOptional(),
        password: z
          .string()
          .meta({ examples: ['12345'] })
          .exactOptional(),
        phone: z
          .string()
          .meta({ examples: ['12345'] })
          .exactOptional(),
        userStatus: z
          .int32()
          .meta({ description: 'User Status', examples: [1] })
          .exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUserUsername: t.procedure.input(z.object({ username: z.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
