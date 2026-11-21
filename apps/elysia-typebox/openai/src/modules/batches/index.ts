import { Elysia } from 'elysia'
import {
  BatchSchema,
  BatchErrorSchema,
  BatchFileExpirationAfterSchema,
  BatchRequestCountsSchema,
  CreateBatchRequestSchema,
  ErrorSchema,
  ErrorResponseSchema,
  ListBatchesResponseSchema,
  MetadataSchema,
  MisalignmentErrorDetailsResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { BatchesModel } from './model'

export const batches = new Elysia()
  .model({
    Batch: BatchSchema,
    BatchError: BatchErrorSchema,
    BatchFileExpirationAfter: BatchFileExpirationAfterSchema,
    BatchRequestCounts: BatchRequestCountsSchema,
    CreateBatchRequest: CreateBatchRequestSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    ListBatchesResponse: ListBatchesResponseSchema,
    Metadata: MetadataSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/batches', ({ query }) => { throw new Error('Not implemented') }, {
    query: BatchesModel.listBatchesQuery,
    response: {
      200: 'ListBatchesResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Batch'],
      summary: 'List batches',
      description: "List your organization's batches.",
      operationId: 'listBatches',
    },
  })
  .post('/batches', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateBatchRequest',
    response: {
      200: 'Batch',
      400: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Batch'],
      summary: 'Create batch',
      description: 'Creates and executes a batch from an uploaded file of requests',
      operationId: 'createBatch',
    },
  })
  .get('/batches/:batch_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: BatchesModel.retrieveBatchParams,
    response: { 200: 'Batch', 400: 'ErrorResponse', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Batch'],
      summary: 'Retrieve batch',
      description: 'Retrieves a batch.',
      operationId: 'retrieveBatch',
    },
  })
  .post('/batches/:batch_id/cancel', ({ params }) => { throw new Error('Not implemented') }, {
    params: BatchesModel.cancelBatchParams,
    response: {
      200: 'Batch',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Batch'],
      summary: 'Cancel batch',
      description:
        'Cancels an in-progress batch. The batch will be in status `cancelling` for up to 10 minutes, before changing to `cancelled`, where it will have partial results (if any) available in the output file.',
      operationId: 'cancelBatch',
    },
  })
