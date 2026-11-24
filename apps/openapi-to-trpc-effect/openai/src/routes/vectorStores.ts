import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import {
  ChunkingStrategyRequestParamSchema,
  ComparisonFilterSchema,
  CompoundFilterSchema,
  CreateVectorStoreFileRequestSchema,
  CreateVectorStoreRequestSchema,
  DeleteVectorStoreFileResponseSchema,
  DeleteVectorStoreResponseSchema,
  ListVectorStoreFilesResponseSchema,
  ListVectorStoresResponseSchema,
  MetadataSchema,
  VectorStoreExpirationAfterSchema,
  VectorStoreFileAttributesSchema,
  VectorStoreFileBatchObjectSchema,
  VectorStoreFileContentResponseSchema,
  VectorStoreFileObjectSchema,
  VectorStoreObjectSchema,
  VectorStoreSearchResultsPageSchema,
} from '../components'

const t = initTRPC.create()

export const vectorStoresRouter = t.router({
  getVectorStores: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListVectorStoresResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStores: t.procedure
    .input(Schema.toStandardSchemaV1(CreateVectorStoreRequestSchema))
    .output(Schema.toStandardSchemaV1(VectorStoreObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(VectorStoreObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String,
          name: Schema.optionalKey(
            Schema.NullOr(Schema.String).annotate({ description: 'The name of the vector store.' }),
          ),
          expires_after: Schema.optionalKey(Schema.NullOr(VectorStoreExpirationAfterSchema)),
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVectorStoresVectorStoreId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ vector_store_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(DeleteVectorStoreResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFileBatches: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_ids: Schema.optionalKey(
            Schema.Array(Schema.String)
              .check(Schema.isMinLength(1), Schema.isMaxLength(2000))
              .annotate({
                description:
                  'A list of [File](https://developers.openai.com/api/reference/resources/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files. If `attributes` or `chunking_strategy` are provided, they will be applied to all files in the batch. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `files`.',
              }),
          ),
          files: Schema.optionalKey(
            Schema.Array(CreateVectorStoreFileRequestSchema)
              .check(Schema.isMinLength(1), Schema.isMaxLength(2000))
              .annotate({
                description:
                  'A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `file_ids`.',
              }),
          ),
          chunking_strategy: Schema.optionalKey(ChunkingStrategyRequestParamSchema),
          attributes: Schema.optionalKey(VectorStoreFileAttributesSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileBatchObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFileBatchesBatchId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          batch_id: Schema.String.annotate({ jsonSchemaExamples: ['vsfb_abc123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileBatchObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFileBatchesBatchIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, batch_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileBatchObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFileBatchesBatchIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String,
          batch_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
          filter: Schema.optionalKey(
            Schema.Literals(['in_progress', 'completed', 'failed', 'cancelled']),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListVectorStoreFilesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
          filter: Schema.optionalKey(
            Schema.Literals(['in_progress', 'completed', 'failed', 'cancelled']),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListVectorStoreFilesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({
            description:
              'A [File](https://developers.openai.com/api/reference/resources/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. For multi-file ingestion, we recommend [`file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create) to minimize per-vector-store write requests.',
          }),
          chunking_strategy: Schema.optionalKey(ChunkingStrategyRequestParamSchema),
          attributes: Schema.optionalKey(VectorStoreFileAttributesSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({ jsonSchemaExamples: ['file-abc123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({ jsonSchemaExamples: ['file-abc123'] }),
          attributes: VectorStoreFileAttributesSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ vector_store_id: Schema.String, file_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeleteVectorStoreFileResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFilesFileIdContent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          file_id: Schema.String.annotate({ jsonSchemaExamples: ['file-abc123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreFileContentResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vector_store_id: Schema.String.annotate({ jsonSchemaExamples: ['vs_abc123'] }),
          query: Schema.Union([
            Schema.String,
            Schema.Array(
              Schema.String.annotate({ description: 'A list of queries to search for.' }),
            ),
          ]).annotate({ description: 'A query string for a search' }),
          rewrite_query: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(false)),
          ).annotate({
            description: 'Whether to rewrite the natural language query for vector search.',
          }),
          max_num_results: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(50),
          )
            .pipe(Schema.withDecodingDefault(Effect.succeed(10)))
            .annotate({
              description:
                'The maximum number of results to return. This number should be between 1 and 50 inclusive.',
            }),
          filters: Schema.optionalKey(
            Schema.Union([ComparisonFilterSchema, CompoundFilterSchema]).annotate({
              description: 'A filter to apply based on file attributes.',
            }),
          ),
          ranking_options: Schema.StructWithRest(
            Schema.Struct({
              ranker: Schema.Literals(['none', 'auto', 'default-2024-11-15'])
                .pipe(Schema.withDecodingDefault(Effect.succeed('auto')))
                .annotate({
                  description:
                    'Enable re-ranking; set to `none` to disable, which can help reduce latency.',
                }),
              score_threshold: Schema.Number.check(
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(1),
              ).pipe(Schema.withDecodingDefault(Effect.succeed(0))),
            }),
            [Schema.Record(Schema.String, Schema.Unknown)],
          )
            .check(
              Schema.makeFilter((input) =>
                Object.keys(input).every((key) => ['ranker', 'score_threshold'].includes(key)),
              ),
            )
            .annotate({ description: 'Ranking options for search.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VectorStoreSearchResultsPageSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
