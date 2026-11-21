import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { DeleteModelResponseSchema, ListModelsResponseSchema, ModelSchema } from '../components'

const t = initTRPC.create()

export const modelsRouter = t.router({
  getModels: t.procedure.output(ListModelsResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getModelsModel: t.procedure
    .input(v.object({ model: v.pipe(v.string(), v.metadata({ examples: ['gpt-6.2-astra'] })) }))
    .output(ModelSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteModelsModel: t.procedure
    .input(
      v.object({
        model: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
        ),
      }),
    )
    .output(DeleteModelResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
