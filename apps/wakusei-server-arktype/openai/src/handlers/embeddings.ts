import { os } from '@orpc/server'
import { CreateEmbeddingRequestSchema, CreateEmbeddingResponseSchema } from '../components'

export const postEmbeddings = os
  .route({
    method: 'POST',
    path: '/embeddings',
    tags: ['Embeddings'],
    summary: 'Create embeddings',
    description: 'Creates an embedding vector representing the input text.',
  })
  .input(CreateEmbeddingRequestSchema)
  .output(CreateEmbeddingResponseSchema)
  .handler(async ({ input }) => {})
