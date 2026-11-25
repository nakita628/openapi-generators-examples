import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores',
    sValidator('json', Schema.toStandardSchemaV1(CreateVectorStoreRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vector_stores/:vector_store_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateVectorStoreRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, batch_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
          filter: Schema.optionalKey(
            Schema.Literals(['in_progress', 'completed', 'failed', 'cancelled']),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
          filter: Schema.optionalKey(
            Schema.Literals(['in_progress', 'completed', 'failed', 'cancelled']),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
