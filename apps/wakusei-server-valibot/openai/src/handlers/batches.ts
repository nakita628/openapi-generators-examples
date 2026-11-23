import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      after: v.optional(v.string()),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
      ),
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
  .input(v.object({ batch_id: v.string() }))
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
  .input(v.object({ batch_id: v.string() }))
  .output(BatchSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
