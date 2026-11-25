import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/vector_stores', sValidator('json', CreateVectorStoreRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/vector_stores/:vector_store_id',
    sValidator('param', z.object({ vector_store_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id',
    sValidator('param', z.object({ vector_store_id: z.string() })),
    sValidator('json', UpdateVectorStoreRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id',
    sValidator('param', z.object({ vector_store_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    sValidator(
      'param',
      z.object({ vector_store_id: z.string().meta({ examples: ['vs_abc123'] }) }),
    ),
    sValidator('json', CreateVectorStoreFileBatchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    sValidator(
      'param',
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        batch_id: z.string().meta({ examples: ['vsfb_abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    sValidator('param', z.object({ vector_store_id: z.string(), batch_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    sValidator('param', z.object({ vector_store_id: z.string(), batch_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    sValidator('param', z.object({ vector_store_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    sValidator(
      'param',
      z.object({ vector_store_id: z.string().meta({ examples: ['vs_abc123'] }) }),
    ),
    sValidator('json', CreateVectorStoreFileRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    ),
    sValidator('json', UpdateVectorStoreFileAttributesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator('param', z.object({ vector_store_id: z.string(), file_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    sValidator(
      'param',
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    sValidator(
      'param',
      z.object({ vector_store_id: z.string().meta({ examples: ['vs_abc123'] }) }),
    ),
    sValidator('json', VectorStoreSearchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
