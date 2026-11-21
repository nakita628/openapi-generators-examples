import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  CreateVectorStoreFileBatchRequestSchema,
  CreateVectorStoreFileRequestSchema,
  CreateVectorStoreRequestSchema,
  DeleteVectorStoreFileResponseSchema,
  DeleteVectorStoreResponseSchema,
  ErrorResponseSchema,
  ListVectorStoreFilesResponseSchema,
  ListVectorStoresResponseSchema,
  UpdateVectorStoreFileAttributesRequestSchema,
  UpdateVectorStoreRequestSchema,
  VectorStoreFileBatchObjectSchema,
  VectorStoreFileContentResponseSchema,
  VectorStoreFileObjectSchema,
  VectorStoreObjectSchema,
  VectorStoreSearchRequestSchema,
  VectorStoreSearchResultsPageSchema,
  TooManyRequestsResponse,
} from '../components'

export const vectorStoresHandler = new Hono()
  .get(
    '/vector_stores',
    describeRoute({
      operationId: 'listVectorStores',
      tags: ['Vector stores'],
      summary: 'List vector stores',
      description: 'Returns a list of vector stores.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ListVectorStoresResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '503': {
          description: 'The vector store list is temporarily unavailable. Retry the request.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores',
    describeRoute({
      operationId: 'createVectorStore',
      tags: ['Vector stores'],
      summary: 'Create vector store',
      description: 'Create a vector store.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreObjectSchema) } },
        },
        '400': {
          description: 'The vector store input, files or chunking configuration are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'A referenced input file was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', CreateVectorStoreRequestSchema),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id',
    describeRoute({
      operationId: 'getVectorStore',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store',
      description: 'Retrieves a vector store.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreObjectSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ vector_store_id: v.string() })),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id',
    describeRoute({
      operationId: 'modifyVectorStore',
      tags: ['Vector stores'],
      summary: 'Modify vector store',
      description: 'Modifies a vector store.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreObjectSchema) } },
        },
        '400': {
          description:
            'The vector store input is invalid, the store has expired, or the store cannot be modified.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller is not authorized to update the vector store.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ vector_store_id: v.string() })),
    validator('json', UpdateVectorStoreRequestSchema),
    (c) => {},
  )
  .delete(
    '/vector_stores/:vector_store_id',
    describeRoute({
      operationId: 'deleteVectorStore',
      tags: ['Vector stores'],
      summary: 'Delete vector store',
      description: 'Delete a vector store.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(DeleteVectorStoreResponseSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description:
            'The vector store is temporarily unavailable for this change or was modified concurrently.',
          headers: {
            'Retry-After': {
              description:
                'When this change is blocked by a vector store migration, the number of seconds to wait before retrying. Other conflicts may omit this header.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ vector_store_id: v.string() })),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    describeRoute({
      operationId: 'createVectorStoreFileBatch',
      tags: ['Vector stores'],
      summary: 'Create vector store file batch',
      description: 'Create a vector store file batch.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreFileBatchObjectSchema) } },
        },
        '400': {
          description:
            'The file batch input is invalid, the store has expired, or a file limit would be exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description:
            'The vector store is temporarily unavailable for this change or was modified concurrently.',
          headers: {
            'Retry-After': {
              description:
                'When this change is blocked by a vector store migration, the number of seconds to wait before retrying. Other conflicts may omit this header.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The files could not be attached to the vector store.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({ vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })) }),
    ),
    validator('json', CreateVectorStoreFileBatchRequestSchema),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    describeRoute({
      operationId: 'getVectorStoreFileBatch',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file batch',
      description: 'Retrieves a vector store file batch.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreFileBatchObjectSchema) } },
        },
        '400': {
          description: 'The file batch identifier is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store or file batch was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        batch_id: v.pipe(v.string(), v.metadata({ examples: ['vsfb_abc123'] })),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    describeRoute({
      operationId: 'cancelVectorStoreFileBatch',
      tags: ['Vector stores'],
      summary: 'Cancel vector store file batch',
      description:
        'Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreFileBatchObjectSchema) } },
        },
        '400': {
          description: 'The file batch identifier is invalid or the vector store has expired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store or file batch was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description:
            'The vector store is temporarily unavailable for this change or was modified concurrently.',
          headers: {
            'Retry-After': {
              description:
                'When this change is blocked by a vector store migration, the number of seconds to wait before retrying. Other conflicts may omit this header.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ vector_store_id: v.string(), batch_id: v.string() })),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    describeRoute({
      operationId: 'listFilesInVectorStoreBatch',
      tags: ['Vector stores'],
      summary: 'List vector store files in a batch',
      description: 'Returns a list of vector store files in a batch.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ListVectorStoreFilesResponseSchema) } },
        },
        '400': {
          description: 'The file batch identifier or file filter is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store or file batch was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ vector_store_id: v.string(), batch_id: v.string() })),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
        filter: v.optional(v.picklist(['in_progress', 'completed', 'failed', 'cancelled'])),
      }),
    ),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    describeRoute({
      operationId: 'listVectorStoreFiles',
      tags: ['Vector stores'],
      summary: 'List vector store files',
      description: 'Returns a list of vector store files.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ListVectorStoreFilesResponseSchema) } },
        },
        '400': {
          description: 'The requested file filter is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ vector_store_id: v.string() })),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
        filter: v.optional(v.picklist(['in_progress', 'completed', 'failed', 'cancelled'])),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    describeRoute({
      operationId: 'createVectorStoreFile',
      tags: ['Vector stores'],
      summary: 'Create vector store file',
      description:
        'Create a vector store file by attaching a [File](https://developers.openai.com/api/reference/resources/files) to a [vector store](https://developers.openai.com/api/reference/resources/vector_stores).',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreFileObjectSchema) } },
        },
        '400': {
          description:
            'The file input is invalid, the store has expired, or a file limit would be exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description:
            'The vector store is temporarily unavailable for this change or was modified concurrently.',
          headers: {
            'Retry-After': {
              description:
                'When this change is blocked by a vector store migration, the number of seconds to wait before retrying. Other conflicts may omit this header.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The file could not be attached to the vector store.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({ vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })) }),
    ),
    validator('json', CreateVectorStoreFileRequestSchema),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    describeRoute({
      operationId: 'getVectorStoreFile',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file',
      description: 'Retrieves a vector store file.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreFileObjectSchema) } },
        },
        '404': {
          description: 'The vector store or file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The vector store file could not be retrieved.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    describeRoute({
      operationId: 'updateVectorStoreFileAttributes',
      tags: ['Vector stores'],
      summary: 'Update vector store file attributes',
      description: 'Update attributes on a vector store file.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreFileObjectSchema) } },
        },
        '400': {
          description: 'The file attributes are invalid or the vector store has expired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store or file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description:
            'The vector store is temporarily unavailable for this change or was modified concurrently.',
          headers: {
            'Retry-After': {
              description:
                'When this change is blocked by a vector store migration, the number of seconds to wait before retrying. Other conflicts may omit this header.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The vector store file attributes could not be updated.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      }),
    ),
    validator('json', UpdateVectorStoreFileAttributesRequestSchema),
    (c) => {},
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    describeRoute({
      operationId: 'deleteVectorStoreFile',
      tags: ['Vector stores'],
      summary: 'Delete vector store file',
      description:
        'Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://developers.openai.com/api/reference/resources/files/methods/delete) endpoint.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(DeleteVectorStoreFileResponseSchema) },
          },
        },
        '400': {
          description: 'The vector store has expired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store or file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description:
            'The vector store is temporarily unavailable for this change or was modified concurrently.',
          headers: {
            'Retry-After': {
              description:
                'When this change is blocked by a vector store migration, the number of seconds to wait before retrying. Other conflicts may omit this header.',
              schema: { type: 'integer', minimum: 1 },
            },
          },
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The vector store file could not be deleted.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ vector_store_id: v.string(), file_id: v.string() })),
    (c) => {},
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    describeRoute({
      operationId: 'retrieveVectorStoreFileContent',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file content',
      description: 'Retrieve the parsed contents of a vector store file.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(VectorStoreFileContentResponseSchema) },
          },
        },
        '400': {
          description: 'The vector store has expired or the file content is not ready.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store or file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The vector store file content could not be retrieved.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })),
        file_id: v.pipe(v.string(), v.metadata({ examples: ['file-abc123'] })),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    describeRoute({
      operationId: 'searchVectorStore',
      tags: ['Vector stores'],
      summary: 'Search vector store',
      description:
        'Search a vector store for relevant chunks based on a query and file attributes filter.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(VectorStoreSearchResultsPageSchema) } },
        },
        '400': {
          description: 'The search input or filters are invalid, or the vector store has expired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The vector store was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      v.object({ vector_store_id: v.pipe(v.string(), v.metadata({ examples: ['vs_abc123'] })) }),
    ),
    validator('json', VectorStoreSearchRequestSchema),
    (c) => {},
  )
