import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { CreateCompletionRequestSchema, CreateCompletionResponseSchema } from '../components'

const t = initTRPC.create()

export const completionsRouter = t.router({
  postCompletions: t.procedure
    .input(Schema.toStandardSchemaV1(CreateCompletionRequestSchema))
    .output(Schema.toStandardSchemaV1(CreateCompletionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
