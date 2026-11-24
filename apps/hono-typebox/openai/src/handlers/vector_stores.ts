import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/vector_stores', tbValidator('json', CreateVectorStoreRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/vector_stores/:vector_store_id',
    tbValidator('param', Type.Object({ vector_store_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id',
    tbValidator('param', Type.Object({ vector_store_id: Type.String() })),
    tbValidator('json', UpdateVectorStoreRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id',
    tbValidator('param', Type.Object({ vector_store_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    tbValidator(
      'param',
      Type.Object({ vector_store_id: Type.String({ examples: ['vs_abc123'] }) }),
    ),
    tbValidator('json', CreateVectorStoreFileBatchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    tbValidator(
      'param',
      Type.Object({
        vector_store_id: Type.String({ examples: ['vs_abc123'] }),
        batch_id: Type.String({ examples: ['vsfb_abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    tbValidator('param', Type.Object({ vector_store_id: Type.String(), batch_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    tbValidator('param', Type.Object({ vector_store_id: Type.String(), batch_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
        filter: Type.Optional(
          Type.Union([
            Type.Literal('in_progress'),
            Type.Literal('completed'),
            Type.Literal('failed'),
            Type.Literal('cancelled'),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    tbValidator('param', Type.Object({ vector_store_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
        filter: Type.Optional(
          Type.Union([
            Type.Literal('in_progress'),
            Type.Literal('completed'),
            Type.Literal('failed'),
            Type.Literal('cancelled'),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    tbValidator(
      'param',
      Type.Object({ vector_store_id: Type.String({ examples: ['vs_abc123'] }) }),
    ),
    tbValidator('json', CreateVectorStoreFileRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    tbValidator(
      'param',
      Type.Object({
        vector_store_id: Type.String({ examples: ['vs_abc123'] }),
        file_id: Type.String({ examples: ['file-abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    tbValidator(
      'param',
      Type.Object({
        vector_store_id: Type.String({ examples: ['vs_abc123'] }),
        file_id: Type.String({ examples: ['file-abc123'] }),
      }),
    ),
    tbValidator('json', UpdateVectorStoreFileAttributesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    tbValidator('param', Type.Object({ vector_store_id: Type.String(), file_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    tbValidator(
      'param',
      Type.Object({
        vector_store_id: Type.String({ examples: ['vs_abc123'] }),
        file_id: Type.String({ examples: ['file-abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    tbValidator(
      'param',
      Type.Object({ vector_store_id: Type.String({ examples: ['vs_abc123'] }) }),
    ),
    tbValidator('json', VectorStoreSearchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
