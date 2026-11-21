import { os } from '@orpc/server'
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

export const getVectorStores = os
  .route({
    method: 'GET',
    path: '/vector_stores',
    tags: ['Vector stores'],
    summary: 'List vector stores',
    description: 'Returns a list of vector stores.',
  })
  .input(
    type({
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
    }),
  )
  .output(ListVectorStoresResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVectorStoresVectorStoreId = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store',
    description: 'Retrieves a vector store.',
  })
  .input(type({ vector_store_id: type('string') }))
  .output(VectorStoreObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVectorStoresVectorStoreId = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}',
    tags: ['Vector stores'],
    summary: 'Modify vector store',
    description: 'Modifies a vector store.',
  })
  .input(
    type({
      vector_store_id: type('string'),
      'name?': type('string | null').describe('The name of the vector store.'),
      'expires_after?': type(VectorStoreExpirationAfterSchema).or('null'),
      'metadata?': MetadataSchema,
    }),
  )
  .output(VectorStoreObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteVectorStoresVectorStoreId = os
  .route({
    method: 'DELETE',
    path: '/vector_stores/{vector_store_id}',
    tags: ['Vector stores'],
    summary: 'Delete vector store',
    description: 'Delete a vector store.',
  })
  .input(type({ vector_store_id: type('string') }))
  .output(DeleteVectorStoreResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVectorStoresVectorStoreIdFileBatches = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/file_batches',
    tags: ['Vector stores'],
    summary: 'Create vector store file batch',
    description: 'Create a vector store file batch.',
  })
  .input(
    type({
      vector_store_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVectorStoresVectorStoreIdFileBatchesBatchId = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store file batch',
    description: 'Retrieves a vector store file batch.',
  })
  .input(type({ vector_store_id: type('string'), batch_id: type('string') }))
  .output(VectorStoreFileBatchObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVectorStoresVectorStoreIdFileBatchesBatchIdCancel = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel',
    tags: ['Vector stores'],
    summary: 'Cancel vector store file batch',
    description:
      'Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.',
  })
  .input(type({ vector_store_id: type('string'), batch_id: type('string') }))
  .output(VectorStoreFileBatchObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVectorStoresVectorStoreIdFileBatchesBatchIdFiles = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}/files',
    tags: ['Vector stores'],
    summary: 'List vector store files in a batch',
    description: 'Returns a list of vector store files in a batch.',
  })
  .input(
    type({
      vector_store_id: type('string'),
      batch_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
      'filter?': type("'in_progress' | 'completed' | 'failed' | 'cancelled'"),
    }),
  )
  .output(ListVectorStoreFilesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVectorStoresVectorStoreIdFiles = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/files',
    tags: ['Vector stores'],
    summary: 'List vector store files',
    description: 'Returns a list of vector store files.',
  })
  .input(
    type({
      vector_store_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
      'filter?': type("'in_progress' | 'completed' | 'failed' | 'cancelled'"),
    }),
  )
  .output(ListVectorStoreFilesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      vector_store_id: type('string'),
      file_id: type('string').describe(
        'A [File](https://developers.openai.com/api/reference/resources/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. For multi-file ingestion, we recommend [`file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create) to minimize per-vector-store write requests.',
      ),
      'chunking_strategy?': ChunkingStrategyRequestParamSchema,
      'attributes?': VectorStoreFileAttributesSchema,
    }),
  )
  .output(VectorStoreFileObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVectorStoresVectorStoreIdFilesFileId = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/files/{file_id}',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store file',
    description: 'Retrieves a vector store file.',
  })
  .input(type({ vector_store_id: type('string'), file_id: type('string') }))
  .output(VectorStoreFileObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVectorStoresVectorStoreIdFilesFileId = os
  .route({
    method: 'POST',
    path: '/vector_stores/{vector_store_id}/files/{file_id}',
    tags: ['Vector stores'],
    summary: 'Update vector store file attributes',
    description: 'Update attributes on a vector store file.',
  })
  .input(
    type({
      vector_store_id: type('string'),
      file_id: type('string'),
      attributes: VectorStoreFileAttributesSchema,
    }),
  )
  .output(VectorStoreFileObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteVectorStoresVectorStoreIdFilesFileId = os
  .route({
    method: 'DELETE',
    path: '/vector_stores/{vector_store_id}/files/{file_id}',
    tags: ['Vector stores'],
    summary: 'Delete vector store file',
    description:
      'Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://developers.openai.com/api/reference/resources/files/methods/delete) endpoint.',
  })
  .input(type({ vector_store_id: type('string'), file_id: type('string') }))
  .output(DeleteVectorStoreFileResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVectorStoresVectorStoreIdFilesFileIdContent = os
  .route({
    method: 'GET',
    path: '/vector_stores/{vector_store_id}/files/{file_id}/content',
    tags: ['Vector stores'],
    summary: 'Retrieve vector store file content',
    description: 'Retrieve the parsed contents of a vector store file.',
  })
  .input(type({ vector_store_id: type('string'), file_id: type('string') }))
  .output(VectorStoreFileContentResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      vector_store_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })
