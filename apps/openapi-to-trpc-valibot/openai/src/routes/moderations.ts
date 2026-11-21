import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  CreateCSAMModerationResponseSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
} from '../components'

const t = initTRPC.create()

export const moderationsRouter = t.router({
  postModerations: t.procedure
    .input(CreateModerationRequestSchema)
    .output(v.union([CreateModerationResponseSchema, CreateCSAMModerationResponseSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
