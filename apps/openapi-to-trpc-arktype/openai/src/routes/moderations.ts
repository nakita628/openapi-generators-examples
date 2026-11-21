import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  CreateCSAMModerationResponseSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
} from '../components'

const t = initTRPC.create()

export const moderationsRouter = t.router({
  postModerations: t.procedure
    .input(CreateModerationRequestSchema)
    .output(type(CreateModerationResponseSchema).or(CreateCSAMModerationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
