import { os } from '@orpc/server'
import { type } from 'arktype'
import { BatchSchema, CreateBatchRequestSchema, ListBatchesResponseSchema } from '../components'

export const getBatches = os
  .route({
    method: 'GET',
    path: '/batches',
    tags: ['Batch'],
    summary: 'List batches',
    description: "List your organization's batches.",
    successDescription: 'Batch listed successfully.',
  })
  .input(
    type({
      'after?': type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
    }),
  )
  .output(ListBatchesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postBatches = os
  .route({
    method: 'POST',
    path: '/batches',
    tags: ['Batch'],
    summary: 'Create batch',
    description: 'Creates and executes a batch from an uploaded file of requests',
    successDescription: 'Batch created successfully.',
  })
  .input(CreateBatchRequestSchema)
  .output(BatchSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getBatchesBatchId = os
  .route({
    method: 'GET',
    path: '/batches/{batch_id}',
    tags: ['Batch'],
    summary: 'Retrieve batch',
    description: 'Retrieves a batch.',
    successDescription: 'Batch retrieved successfully.',
  })
  .input(type({ batch_id: type('string') }))
  .output(BatchSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postBatchesBatchIdCancel = os
  .route({
    method: 'POST',
    path: '/batches/{batch_id}/cancel',
    tags: ['Batch'],
    summary: 'Cancel batch',
    description:
      'Cancels an in-progress batch. The batch will be in status `cancelling` for up to 10 minutes, before changing to `cancelled`, where it will have partial results (if any) available in the output file.',
    successDescription: "Batch is cancelling. Returns the cancelling batch's details.",
  })
  .input(type({ batch_id: type('string') }))
  .output(BatchSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
