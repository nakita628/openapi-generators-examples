import { initTRPC, TRPCError } from '@trpc/server'
import { CreateCompletionRequestSchema, CreateCompletionResponseSchema } from '../components'

const t = initTRPC.create()

export const completionsRouter = t.router({
  postCompletions: t.procedure
    .input(CreateCompletionRequestSchema)
    .output(CreateCompletionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
