import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  CreateVectorStoreFileBatchRequestSchema,
  CreateVectorStoreFileRequestSchema,
  CreateVectorStoreRequestSchema,
  UpdateVectorStoreFileAttributesRequestSchema,
  UpdateVectorStoreRequestSchema,
  VectorStoreSearchRequestSchema,
} from '../components'

export const vectorStoresHandler = new Hono()
  .get(
    '/vector_stores',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/vector_stores', sValidator('json', CreateVectorStoreRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/vector_stores/:vector_store_id',
    sValidator('param', type({ vector_store_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id',
    sValidator('param', type({ vector_store_id: 'string' })),
    sValidator('json', UpdateVectorStoreRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id',
    sValidator('param', type({ vector_store_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    sValidator('param', type({ vector_store_id: 'string' })),
    sValidator('json', CreateVectorStoreFileBatchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    sValidator('param', type({ vector_store_id: 'string', batch_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    sValidator('param', type({ vector_store_id: 'string', batch_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    sValidator('param', type({ vector_store_id: 'string', batch_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
        'filter?': "'in_progress' | 'completed' | 'failed' | 'cancelled'",
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    sValidator('param', type({ vector_store_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
        'filter?': "'in_progress' | 'completed' | 'failed' | 'cancelled'",
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    sValidator('param', type({ vector_store_id: 'string' })),
    sValidator('json', CreateVectorStoreFileRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator('param', type({ vector_store_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator('param', type({ vector_store_id: 'string', file_id: 'string' })),
    sValidator('json', UpdateVectorStoreFileAttributesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator('param', type({ vector_store_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    sValidator('param', type({ vector_store_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    sValidator('param', type({ vector_store_id: 'string' })),
    sValidator('json', VectorStoreSearchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
