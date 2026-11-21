import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { DeleteModelResponseSchema, ListModelsResponseSchema, ModelSchema } from '../components'

const t = initTRPC.create()

export const modelsRouter = t.router({
  getModels: t.procedure.output(ListModelsResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getModelsModel: t.procedure
    .input(type({ model: 'string' }))
    .output(ModelSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteModelsModel: t.procedure
    .input(type({ model: 'string' }))
    .output(DeleteModelResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
