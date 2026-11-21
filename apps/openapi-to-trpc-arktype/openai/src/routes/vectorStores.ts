import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    )
    .output(ListVectorStoresResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStores: t.procedure
    .input(CreateVectorStoreRequestSchema)
    .output(VectorStoreObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreId: t.procedure
    .input(type({ vector_store_id: 'string' }))
    .output(VectorStoreObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreId: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        'name?': type('string | null').describe('The name of the vector store.'),
        'expires_after?': type(VectorStoreExpirationAfterSchema).or('null'),
        'metadata?': MetadataSchema,
      }),
    )
    .output(VectorStoreObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVectorStoresVectorStoreId: t.procedure
    .input(type({ vector_store_id: 'string' }))
    .output(DeleteVectorStoreResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFileBatches: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        'file_ids?': type('string[]')
          .and(type('1 <= unknown[] <= 2000'))
          .describe(
            'A list of [File](https://developers.openai.com/api/reference/resources/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files. If `attributes` or `chunking_strategy` are provided, they will be applied to all files in the batch. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `files`.',
          ),
        'files?': type(type(CreateVectorStoreFileRequestSchema).array())
          .and(type('1 <= unknown[] <= 2000'))
          .describe(
            'A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `file_ids`.',
          ),
        'chunking_strategy?': ChunkingStrategyRequestParamSchema,
        'attributes?': VectorStoreFileAttributesSchema,
      }),
    )
    .output(VectorStoreFileBatchObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFileBatchesBatchId: t.procedure
    .input(type({ vector_store_id: 'string', batch_id: 'string' }))
    .output(VectorStoreFileBatchObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFileBatchesBatchIdCancel: t.procedure
    .input(type({ vector_store_id: 'string', batch_id: 'string' }))
    .output(VectorStoreFileBatchObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFileBatchesBatchIdFiles: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        batch_id: 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
        'filter?': "'in_progress' | 'completed' | 'failed' | 'cancelled'",
      }),
    )
    .output(ListVectorStoreFilesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFiles: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
        'filter?': "'in_progress' | 'completed' | 'failed' | 'cancelled'",
      }),
    )
    .output(ListVectorStoreFilesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFiles: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        file_id: type('string').describe(
          'A [File](https://developers.openai.com/api/reference/resources/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. For multi-file ingestion, we recommend [`file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create) to minimize per-vector-store write requests.',
        ),
        'chunking_strategy?': ChunkingStrategyRequestParamSchema,
        'attributes?': VectorStoreFileAttributesSchema,
      }),
    )
    .output(VectorStoreFileObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(type({ vector_store_id: 'string', file_id: 'string' }))
    .output(VectorStoreFileObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        file_id: 'string',
        attributes: VectorStoreFileAttributesSchema,
      }),
    )
    .output(VectorStoreFileObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(type({ vector_store_id: 'string', file_id: 'string' }))
    .output(DeleteVectorStoreFileResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFilesFileIdContent: t.procedure
    .input(type({ vector_store_id: 'string', file_id: 'string' }))
    .output(VectorStoreFileContentResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdSearch: t.procedure
    .input(
      type({
        vector_store_id: 'string',
        query: type('string')
          .or(type(type('string').describe('A list of queries to search for.')).array())
          .describe('A query string for a search'),
        'rewrite_query?': type('boolean').describe(
          'Whether to rewrite the natural language query for vector search.',
        ),
        'max_num_results?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of results to return. This number should be between 1 and 50 inclusive.',
        ),
        'filters?': type(ComparisonFilterSchema)
          .or(CompoundFilterSchema)
          .describe('A filter to apply based on file attributes.'),
        'ranking_options?': type({
          'ranker?': type("'none' | 'auto' | 'default-2024-11-15'").describe(
            'Enable re-ranking; set to `none` to disable, which can help reduce latency.',
          ),
          'score_threshold?': 'number >= 0 & number <= 1',
          '+': 'reject',
        }).describe('Ranking options for search.'),
      }),
    )
    .output(VectorStoreSearchResultsPageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
