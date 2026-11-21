import { os } from '@orpc/server'
import * as v from 'valibot'
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

export const getVectorStores = os
  .route({
    method: 'GET',
    path: '/vector_stores',
    tags: ['Vector stores'],
    summary: 'List vector stores',
    description: 'Returns a list of vector stores.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
    }),
  )
  .output(ListVectorStoresResponseSchema)
  .handler(async ({ input }) => {})

export const postVectorStores = os
  .route({
    method: 'POST',
    path: '/vector_stores',
    tags: ['Vector stores'],
    summary: 'Create vector store',
    description: 'Create a vector store.',
  })
  .input(CreateVectorStoreRequestSchema)
  .output(VectorStoreObjectSchema)
  .handler(async ({ input }) => {})

export const getVectorStoresVectorStoreId = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store',
    description: 'Retrieves a vector store.',
  })
  .input(v.object({ vector_store_id: v.string() }))
  .output(VectorStoreObjectSchema)
  .handler(async ({ input }) => {})

export const postVectorStoresVectorStoreId = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}',
    tags: ['Vector stores'],
    summary: 'Modify vector store',
    description: 'Modifies a vector store.',
  })
  .input(
    v.object({
      vector_store_id: v.string(),
      name: v.optional(
        v.pipe(v.nullable(v.string()), v.description('The name of the vector store.')),
      ),
      expires_after: v.optional(v.nullable(VectorStoreExpirationAfterSchema)),
      metadata: v.optional(MetadataSchema),
    }),
  )
  .output(VectorStoreObjectSchema)
  .handler(async ({ input }) => {})

export const deleteVectorStoresVectorStoreId = os
  .route({
    method: 'DELETE',
    path: '/vector_stores/{vector_store_id}',
    tags: ['Vector stores'],
    summary: 'Delete vector store',
    description: 'Delete a vector store.',
  })
  .input(v.object({ vector_store_id: v.string() }))
  .output(DeleteVectorStoreResponseSchema)
  .handler(async ({ input }) => {})

export const postVectorStoresVectorStoreIdFileBatches = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/file_batches',
    tags: ['Vector stores'],
    summary: 'Create vector store file batch',
    description: 'Create a vector store file batch.',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      file_ids: v.optional(
        v.pipe(
          v.pipe(v.array(v.string()), v.minLength(1), v.maxLength(2000)),
          v.description(
            'A list of [File](https://developers.openai.com/api/reference/resources/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files. If `attributes` or `chunking_strategy` are provided, they will be applied to all files in the batch. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `files`.',
          ),
        ),
      ),
      files: v.optional(
        v.pipe(
          v.pipe(v.array(CreateVectorStoreFileRequestSchema), v.minLength(1), v.maxLength(2000)),
          v.description(
            'A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `file_ids`.',
          ),
        ),
      ),
      chunking_strategy: v.optional(ChunkingStrategyRequestParamSchema),
      attributes: v.optional(VectorStoreFileAttributesSchema),
    }),
  )
  .output(VectorStoreFileBatchObjectSchema)
  .handler(async ({ input }) => {})

export const getVectorStoresVectorStoreIdFileBatchesBatchId = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store file batch',
    description: 'Retrieves a vector store file batch.',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      batch_id: v.pipe(v.string(), v.metadata({ examples: ['vsfb_abc123'] })),
    }),
  )
  .output(VectorStoreFileBatchObjectSchema)
  .handler(async ({ input }) => {})

export const postVectorStoresVectorStoreIdFileBatchesBatchIdCancel = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel',
    tags: ['Vector stores'],
    summary: 'Cancel vector store file batch',
    description:
      'Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.',
  })
  .input(v.object({ vector_store_id: v.string(), batch_id: v.string() }))
  .output(VectorStoreFileBatchObjectSchema)
  .handler(async ({ input }) => {})

export const getVectorStoresVectorStoreIdFileBatchesBatchIdFiles = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}/files',
    tags: ['Vector stores'],
    summary: 'List vector store files in a batch',
    description: 'Returns a list of vector store files in a batch.',
  })
  .input(
    v.object({
      vector_store_id: v.string(),
      batch_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
      filter: v.optional(v.picklist(['in_progress', 'completed', 'failed', 'cancelled'])),
    }),
  )
  .output(ListVectorStoreFilesResponseSchema)
  .handler(async ({ input }) => {})

export const getVectorStoresVectorStoreIdFiles = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/files',
    tags: ['Vector stores'],
    summary: 'List vector store files',
    description: 'Returns a list of vector store files.',
  })
  .input(
    v.object({
      vector_store_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
      filter: v.optional(v.picklist(['in_progress', 'completed', 'failed', 'cancelled'])),
    }),
  )
  .output(ListVectorStoreFilesResponseSchema)
  .handler(async ({ input }) => {})

export const postVectorStoresVectorStoreIdFiles = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/files',
    tags: ['Vector stores'],
    summary: 'Create vector store file',
    description:
      'Create a vector store file by attaching a [File](https://developers.openai.com/api/reference/resources/files) to a [vector store](https://developers.openai.com/api/reference/resources/vector_stores).',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      file_id: v.pipe(
        v.string(),
        v.description(
          'A [File](https://developers.openai.com/api/reference/resources/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. For multi-file ingestion, we recommend [`file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create) to minimize per-vector-store write requests.',
        ),
      ),
      chunking_strategy: v.optional(ChunkingStrategyRequestParamSchema),
      attributes: v.optional(VectorStoreFileAttributesSchema),
    }),
  )
  .output(VectorStoreFileObjectSchema)
  .handler(async ({ input }) => {})

export const getVectorStoresVectorStoreIdFilesFileId = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/files/{file_id}',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store file',
    description: 'Retrieves a vector store file.',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
    }),
  )
  .output(VectorStoreFileObjectSchema)
  .handler(async ({ input }) => {})

export const postVectorStoresVectorStoreIdFilesFileId = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/files/{file_id}',
    tags: ['Vector stores'],
    summary: 'Update vector store file attributes',
    description: 'Update attributes on a vector store file.',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      attributes: VectorStoreFileAttributesSchema,
    }),
  )
  .output(VectorStoreFileObjectSchema)
  .handler(async ({ input }) => {})

export const deleteVectorStoresVectorStoreIdFilesFileId = os
  .route({
    method: 'DELETE',
    path: '/vector_stores/{vector_store_id}/files/{file_id}',
    tags: ['Vector stores'],
    summary: 'Delete vector store file',
    description:
      'Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://developers.openai.com/api/reference/resources/files/methods/delete) endpoint.',
  })
  .input(v.object({ vector_store_id: v.string(), file_id: v.string() }))
  .output(DeleteVectorStoreFileResponseSchema)
  .handler(async ({ input }) => {})

export const getVectorStoresVectorStoreIdFilesFileIdContent = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/files/{file_id}/content',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store file content',
    description: 'Retrieve the parsed contents of a vector store file.',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
    }),
  )
  .output(VectorStoreFileContentResponseSchema)
  .handler(async ({ input }) => {})

export const postVectorStoresVectorStoreIdSearch = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/search',
    tags: ['Vector stores'],
    summary: 'Search vector store',
    description:
      'Search a vector store for relevant chunks based on a query and file attributes filter.',
  })
  .input(
    v.object({
      vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
      query: v.pipe(
        v.union([
          v.string(),
          v.array(v.pipe(v.string(), v.description('A list of queries to search for.'))),
        ]),
        v.description('A query string for a search'),
      ),
      rewrite_query: v.optional(
        v.pipe(
          v.optional(v.boolean(), false),
          v.description('Whether to rewrite the natural language query for vector search.'),
        ),
      ),
      max_num_results: v.optional(
        v.pipe(
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)), 10),
          v.description(
            'The maximum number of results to return. This number should be between 1 and 50 inclusive.',
          ),
        ),
      ),
      filters: v.optional(
        v.pipe(
          v.union([ComparisonFilterSchema, CompoundFilterSchema]),
          v.description('A filter to apply based on file attributes.'),
        ),
      ),
      ranking_options: v.optional(
        v.pipe(
          v.strictObject({
            ranker: v.pipe(
              v.optional(v.picklist(['none', 'auto', 'default-2024-11-15']), 'auto'),
              v.description(
                'Enable re-ranking; set to `none` to disable, which can help reduce latency.',
              ),
            ),
            score_threshold: v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(1)), 0),
          }),
          v.description('Ranking options for search.'),
        ),
      ),
    }),
  )
  .output(VectorStoreSearchResultsPageSchema)
  .handler(async ({ input }) => {})
