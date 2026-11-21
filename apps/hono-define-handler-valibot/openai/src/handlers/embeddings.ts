import { Hono } from 'hono'
import { postEmbeddingsHandler } from '../routes'

export const embeddingsHandler = new Hono().post(
  '/embeddings',
  postEmbeddingsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
)
