import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { CreateEmbeddingRequestSchema, CreateEmbeddingResponseSchema } from '../components'

const t = initTRPC.create()

export const embeddingsRouter = t.router({
  postEmbeddings: t.procedure
    .input(Schema.toStandardSchemaV1(CreateEmbeddingRequestSchema))
    .output(Schema.toStandardSchemaV1(CreateEmbeddingResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
