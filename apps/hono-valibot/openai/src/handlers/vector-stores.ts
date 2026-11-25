import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/vector_stores', sValidator('json', CreateVectorStoreRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/vector_stores/:vector_store_id',
    sValidator('param', v.object({ vector_store_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id',
    sValidator('param', v.object({ vector_store_id: v.string() })),
    sValidator('json', UpdateVectorStoreRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id',
    sValidator('param', v.object({ vector_store_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    sValidator(
      'param',
      v.object({ vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })) }),
    ),
    sValidator('json', CreateVectorStoreFileBatchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    sValidator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        batch_id: v.pipe(v.string(), v.metadata({ examples: ['vsfb_abc123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    sValidator('param', v.object({ vector_store_id: v.string(), batch_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    sValidator('param', v.object({ vector_store_id: v.string(), batch_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
        filter: v.optional(v.picklist(['in_progress', 'completed', 'failed', 'cancelled'])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    sValidator('param', v.object({ vector_store_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
        filter: v.optional(v.picklist(['in_progress', 'completed', 'failed', 'cancelled'])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    sValidator(
      'param',
      v.object({ vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })) }),
    ),
    sValidator('json', CreateVectorStoreFileRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      }),
    ),
    sValidator('json', UpdateVectorStoreFileAttributesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator('param', v.object({ vector_store_id: v.string(), file_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    sValidator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    sValidator(
      'param',
      v.object({ vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })) }),
    ),
    sValidator('json', VectorStoreSearchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
