import { Elysia } from 'elysia'
import {
  AutoChunkingStrategyRequestParamSchema,
  ChunkingStrategyRequestParamSchema,
  ComparisonFilterSchema,
  CompoundFilterSchema,
  CreateVectorStoreFileBatchRequestSchema,
  CreateVectorStoreFileRequestSchema,
  CreateVectorStoreRequestSchema,
  DeleteVectorStoreFileResponseSchema,
  DeleteVectorStoreResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  ListVectorStoreFilesResponseSchema,
  ListVectorStoresResponseSchema,
  MetadataSchema,
  MisalignmentErrorDetailsResourceSchema,
  OtherChunkingStrategyResponseParamSchema,
  StaticChunkingStrategySchema,
  StaticChunkingStrategyRequestParamSchema,
  StaticChunkingStrategyResponseParamSchema,
  UpdateVectorStoreFileAttributesRequestSchema,
  UpdateVectorStoreRequestSchema,
  VectorStoreExpirationAfterSchema,
  VectorStoreFileAttributesSchema,
  VectorStoreFileBatchObjectSchema,
  VectorStoreFileContentResponseSchema,
  VectorStoreFileObjectSchema,
  VectorStoreObjectSchema,
  VectorStoreSearchRequestSchema,
  VectorStoreSearchResultContentObjectSchema,
  VectorStoreSearchResultItemSchema,
  VectorStoreSearchResultsPageSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { VectorStoresModel } from './model'

export const vectorStores = new Elysia()
  .model({
    AutoChunkingStrategyRequestParam: AutoChunkingStrategyRequestParamSchema,
    ChunkingStrategyRequestParam: ChunkingStrategyRequestParamSchema,
    ComparisonFilter: ComparisonFilterSchema,
    CompoundFilter: CompoundFilterSchema,
    CreateVectorStoreFileBatchRequest: CreateVectorStoreFileBatchRequestSchema,
    CreateVectorStoreFileRequest: CreateVectorStoreFileRequestSchema,
    CreateVectorStoreRequest: CreateVectorStoreRequestSchema,
    DeleteVectorStoreFileResponse: DeleteVectorStoreFileResponseSchema,
    DeleteVectorStoreResponse: DeleteVectorStoreResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    ListVectorStoreFilesResponse: ListVectorStoreFilesResponseSchema,
    ListVectorStoresResponse: ListVectorStoresResponseSchema,
    Metadata: MetadataSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    OtherChunkingStrategyResponseParam: OtherChunkingStrategyResponseParamSchema,
    StaticChunkingStrategy: StaticChunkingStrategySchema,
    StaticChunkingStrategyRequestParam: StaticChunkingStrategyRequestParamSchema,
    StaticChunkingStrategyResponseParam: StaticChunkingStrategyResponseParamSchema,
    UpdateVectorStoreFileAttributesRequest: UpdateVectorStoreFileAttributesRequestSchema,
    UpdateVectorStoreRequest: UpdateVectorStoreRequestSchema,
    VectorStoreExpirationAfter: VectorStoreExpirationAfterSchema,
    VectorStoreFileAttributes: VectorStoreFileAttributesSchema,
    VectorStoreFileBatchObject: VectorStoreFileBatchObjectSchema,
    VectorStoreFileContentResponse: VectorStoreFileContentResponseSchema,
    VectorStoreFileObject: VectorStoreFileObjectSchema,
    VectorStoreObject: VectorStoreObjectSchema,
    VectorStoreSearchRequest: VectorStoreSearchRequestSchema,
    VectorStoreSearchResultContentObject: VectorStoreSearchResultContentObjectSchema,
    VectorStoreSearchResultItem: VectorStoreSearchResultItemSchema,
    VectorStoreSearchResultsPage: VectorStoreSearchResultsPageSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/vector_stores', ({ query }) => { throw new Error('Not implemented') }, {
    query: VectorStoresModel.listVectorStoresQuery,
    response: { 200: 'ListVectorStoresResponse', 429: 'ErrorResponse', 503: 'ErrorResponse' },
    detail: {
      tags: ['Vector stores'],
      summary: 'List vector stores',
      description: 'Returns a list of vector stores.',
      operationId: 'listVectorStores',
    },
  })
  .post('/vector_stores', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateVectorStoreRequest',
    response: {
      200: 'VectorStoreObject',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Create vector store',
      description: 'Create a vector store.',
      operationId: 'createVectorStore',
    },
  })
  .get('/vector_stores/:vector_store_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.getVectorStoreParams,
    response: { 200: 'VectorStoreObject', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Vector stores'],
      summary: 'Retrieve vector store',
      description: 'Retrieves a vector store.',
      operationId: 'getVectorStore',
    },
  })
  .post('/vector_stores/:vector_store_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.modifyVectorStoreParams,
    body: 'UpdateVectorStoreRequest',
    response: {
      200: 'VectorStoreObject',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Modify vector store',
      description: 'Modifies a vector store.',
      operationId: 'modifyVectorStore',
    },
  })
  .delete('/vector_stores/:vector_store_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.deleteVectorStoreParams,
    response: {
      200: 'DeleteVectorStoreResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Delete vector store',
      description: 'Delete a vector store.',
      operationId: 'deleteVectorStore',
    },
  })
  .post('/vector_stores/:vector_store_id/file_batches', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.createVectorStoreFileBatchParams,
    body: 'CreateVectorStoreFileBatchRequest',
    response: {
      200: 'VectorStoreFileBatchObject',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Create vector store file batch',
      description: 'Create a vector store file batch.',
      operationId: 'createVectorStoreFileBatch',
    },
  })
  .get('/vector_stores/:vector_store_id/file_batches/:batch_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.getVectorStoreFileBatchParams,
    response: {
      200: 'VectorStoreFileBatchObject',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file batch',
      description: 'Retrieves a vector store file batch.',
      operationId: 'getVectorStoreFileBatch',
    },
  })
  .post('/vector_stores/:vector_store_id/file_batches/:batch_id/cancel', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.cancelVectorStoreFileBatchParams,
    response: {
      200: 'VectorStoreFileBatchObject',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Cancel vector store file batch',
      description:
        'Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.',
      operationId: 'cancelVectorStoreFileBatch',
    },
  })
  .get('/vector_stores/:vector_store_id/file_batches/:batch_id/files', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.listFilesInVectorStoreBatchParams,
    query: VectorStoresModel.listFilesInVectorStoreBatchQuery,
    response: {
      200: 'ListVectorStoreFilesResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'List vector store files in a batch',
      description: 'Returns a list of vector store files in a batch.',
      operationId: 'listFilesInVectorStoreBatch',
    },
  })
  .get('/vector_stores/:vector_store_id/files', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.listVectorStoreFilesParams,
    query: VectorStoresModel.listVectorStoreFilesQuery,
    response: {
      200: 'ListVectorStoreFilesResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'List vector store files',
      description: 'Returns a list of vector store files.',
      operationId: 'listVectorStoreFiles',
    },
  })
  .post('/vector_stores/:vector_store_id/files', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.createVectorStoreFileParams,
    body: 'CreateVectorStoreFileRequest',
    response: {
      200: 'VectorStoreFileObject',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Create vector store file',
      description:
        'Create a vector store file by attaching a [File](https://developers.openai.com/api/reference/resources/files) to a [vector store](https://developers.openai.com/api/reference/resources/vector_stores).',
      operationId: 'createVectorStoreFile',
    },
  })
  .get('/vector_stores/:vector_store_id/files/:file_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.getVectorStoreFileParams,
    response: {
      200: 'VectorStoreFileObject',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file',
      description: 'Retrieves a vector store file.',
      operationId: 'getVectorStoreFile',
    },
  })
  .post('/vector_stores/:vector_store_id/files/:file_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.updateVectorStoreFileAttributesParams,
    body: 'UpdateVectorStoreFileAttributesRequest',
    response: {
      200: 'VectorStoreFileObject',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Update vector store file attributes',
      description: 'Update attributes on a vector store file.',
      operationId: 'updateVectorStoreFileAttributes',
    },
  })
  .delete('/vector_stores/:vector_store_id/files/:file_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.deleteVectorStoreFileParams,
    response: {
      200: 'DeleteVectorStoreFileResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Delete vector store file',
      description:
        'Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://developers.openai.com/api/reference/resources/files/methods/delete) endpoint.',
      operationId: 'deleteVectorStoreFile',
    },
  })
  .get('/vector_stores/:vector_store_id/files/:file_id/content', ({ params }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.retrieveVectorStoreFileContentParams,
    response: {
      200: 'VectorStoreFileContentResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file content',
      description: 'Retrieve the parsed contents of a vector store file.',
      operationId: 'retrieveVectorStoreFileContent',
    },
  })
  .post('/vector_stores/:vector_store_id/search', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: VectorStoresModel.searchVectorStoreParams,
    body: 'VectorStoreSearchRequest',
    response: {
      200: 'VectorStoreSearchResultsPage',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Vector stores'],
      summary: 'Search vector store',
      description:
        'Search a vector store for relevant chunks based on a query and file attributes filter.',
      operationId: 'searchVectorStore',
    },
  })
