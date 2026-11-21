import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { DeleteModelResponseSchema, ListModelsResponseSchema, ModelSchema } from '../components'

const t = initTRPC.create()

export const modelsRouter = t.router({
  getModels: t.procedure.output(Schema.toStandardSchemaV1(ListModelsResponseSchema)).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getModelsModel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ model: Schema.String.annotate({ jsonSchemaExamples: ['gpt-6.2-astra'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ModelSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteModelsModel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          model: Schema.String.annotate({
            jsonSchemaExamples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeleteModelResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
