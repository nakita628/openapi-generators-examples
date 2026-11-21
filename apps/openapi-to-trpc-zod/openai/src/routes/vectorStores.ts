import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
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
    .input(z.object({ vector_store_id: z.string() }))
    .output(VectorStoreObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreId: t.procedure
    .input(
      z.object({
        vector_store_id: z.string(),
        name: z
          .string()
          .nullable()
          .meta({ description: 'The name of the vector store.' })
          .exactOptional(),
        expires_after: VectorStoreExpirationAfterSchema.nullable().exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(VectorStoreObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVectorStoresVectorStoreId: t.procedure
    .input(z.object({ vector_store_id: z.string() }))
    .output(DeleteVectorStoreResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFileBatches: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_ids: z
          .array(z.string())
          .min(1)
          .max(2000)
          .meta({
            description:
              'A list of [File](https://developers.openai.com/api/reference/resources/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files. If `attributes` or `chunking_strategy` are provided, they will be applied to all files in the batch. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `files`.',
          })
          .exactOptional(),
        files: z
          .array(CreateVectorStoreFileRequestSchema)
          .min(1)
          .max(2000)
          .meta({
            description:
              'A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `file_ids`.',
          })
          .exactOptional(),
        chunking_strategy: ChunkingStrategyRequestParamSchema.exactOptional(),
        attributes: VectorStoreFileAttributesSchema.exactOptional(),
      }),
    )
    .output(VectorStoreFileBatchObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFileBatchesBatchId: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        batch_id: z.string().meta({ examples: ['vsfb_abc123'] }),
      }),
    )
    .output(VectorStoreFileBatchObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFileBatchesBatchIdCancel: t.procedure
    .input(z.object({ vector_store_id: z.string(), batch_id: z.string() }))
    .output(VectorStoreFileBatchObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFileBatchesBatchIdFiles: t.procedure
    .input(
      z.object({
        vector_store_id: z.string(),
        batch_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).exactOptional(),
      }),
    )
    .output(ListVectorStoreFilesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFiles: t.procedure
    .input(
      z.object({
        vector_store_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).exactOptional(),
      }),
    )
    .output(ListVectorStoreFilesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFiles: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z
          .string()
          .meta({
            description:
              'A [File](https://developers.openai.com/api/reference/resources/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. For multi-file ingestion, we recommend [`file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create) to minimize per-vector-store write requests.',
          }),
        chunking_strategy: ChunkingStrategyRequestParamSchema.exactOptional(),
        attributes: VectorStoreFileAttributesSchema.exactOptional(),
      }),
    )
    .output(VectorStoreFileObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    )
    .output(VectorStoreFileObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
        attributes: VectorStoreFileAttributesSchema,
      }),
    )
    .output(VectorStoreFileObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVectorStoresVectorStoreIdFilesFileId: t.procedure
    .input(z.object({ vector_store_id: z.string(), file_id: z.string() }))
    .output(DeleteVectorStoreFileResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVectorStoresVectorStoreIdFilesFileIdContent: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    )
    .output(VectorStoreFileContentResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVectorStoresVectorStoreIdSearch: t.procedure
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        query: z
          .xor([
            z.string(),
            z.array(z.string().meta({ description: 'A list of queries to search for.' })),
          ])
          .meta({ description: 'A query string for a search' }),
        rewrite_query: z
          .boolean()
          .default(false)
          .meta({ description: 'Whether to rewrite the natural language query for vector search.' })
          .exactOptional(),
        max_num_results: z
          .int()
          .min(1)
          .max(50)
          .default(10)
          .meta({
            description:
              'The maximum number of results to return. This number should be between 1 and 50 inclusive.',
          })
          .exactOptional(),
        filters: z
          .xor([ComparisonFilterSchema, CompoundFilterSchema])
          .meta({ description: 'A filter to apply based on file attributes.' })
          .exactOptional(),
        ranking_options: z
          .strictObject({
            ranker: z
              .enum(['none', 'auto', 'default-2024-11-15'])
              .default('auto')
              .meta({
                description:
                  'Enable re-ranking; set to `none` to disable, which can help reduce latency.',
              })
              .exactOptional(),
            score_threshold: z.number().min(0).max(1).default(0).exactOptional(),
          })
          .meta({ description: 'Ranking options for search.' })
          .exactOptional(),
      }),
    )
    .output(VectorStoreSearchResultsPageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
