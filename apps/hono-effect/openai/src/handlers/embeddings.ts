import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { CreateEmbeddingRequestSchema } from '../components'

export const embeddingsHandler = new Hono().post(
  '/embeddings',
  sValidator('json', Schema.toStandardSchemaV1(CreateEmbeddingRequestSchema)),
  (c) => {},
)
