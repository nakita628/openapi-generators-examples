import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { CreateEmbeddingRequestSchema } from '../components'

export const embeddingsHandler = new Hono().post(
  '/embeddings',
  tbValidator('json', CreateEmbeddingRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
