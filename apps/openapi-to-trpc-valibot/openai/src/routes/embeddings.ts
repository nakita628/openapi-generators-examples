import { initTRPC, TRPCError } from '@trpc/server'
import { CreateEmbeddingRequestSchema, CreateEmbeddingResponseSchema } from '../components'

const t = initTRPC.create()

export const embeddingsRouter = t.router({
  postEmbeddings: t.procedure
    .input(CreateEmbeddingRequestSchema)
    .output(CreateEmbeddingResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
