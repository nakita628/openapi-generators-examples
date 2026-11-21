import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores',
    sValidator('json', Schema.toStandardSchemaV1(CreateVectorStoreRequestSchema)),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateVectorStoreRequestSchema)),
    (c) => {},
  )
  .delete(
    '/vector_stores/:vector_store_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateVectorStoreFileBatchRequestSchema)),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          batch_id: Schema.String.annotate({ jsonSchemaExamples: ['vsfb_abc123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, batch_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, batch_id: Schema.String }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
          filter: Schema.optional(
            Schema.Literals(['in_progress', 'completed', 'failed', 'cancelled']),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
          filter: Schema.optional(
            Schema.Literals(['in_progress', 'completed', 'failed', 'cancelled']),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateVectorStoreFileRequestSchema)),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({ jsonSchemaExamples: ['file-abc123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({ jsonSchemaExamples: ['file-abc123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateVectorStoreFileAttributesRequestSchema)),
    (c) => {},
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({ jsonSchemaExamples: ['file-abc123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(VectorStoreSearchRequestSchema)),
    (c) => {},
  )
