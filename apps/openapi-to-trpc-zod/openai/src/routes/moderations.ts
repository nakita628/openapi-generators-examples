import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  CreateCSAMModerationResponseSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
} from '../components'

const t = initTRPC.create()

export const moderationsRouter = t.router({
  postModerations: t.procedure
    .input(CreateModerationRequestSchema)
    .output(z.xor([CreateModerationResponseSchema, CreateCSAMModerationResponseSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
