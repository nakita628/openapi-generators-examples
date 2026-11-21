import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { CreateEmbeddingRequestSchema } from '../components'

export const embeddingsHandler = new Hono().post(
  '/embeddings',
  sValidator('json', CreateEmbeddingRequestSchema),
  (c) => {},
)
