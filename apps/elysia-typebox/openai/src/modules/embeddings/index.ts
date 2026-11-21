import { Elysia, t } from 'elysia'
import {
  CreateEmbeddingRequestSchema,
  CreateEmbeddingResponseSchema,
  EmbeddingSchema,
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { EmbeddingsModel } from './model'

export const embeddings = new Elysia()
  .model({
    CreateEmbeddingRequest: CreateEmbeddingRequestSchema,
    CreateEmbeddingResponse: CreateEmbeddingResponseSchema,
    Embedding: EmbeddingSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/embeddings', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateEmbeddingRequest',
    response: {
      200: 'CreateEmbeddingResponse',
      400: 'ErrorResponse',
      401: 'ErrorResponse',
      403: t.Void(),
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Embeddings'],
      summary: 'Create embeddings',
      description: 'Creates an embedding vector representing the input text.',
      operationId: 'createEmbedding',
    },
  })
