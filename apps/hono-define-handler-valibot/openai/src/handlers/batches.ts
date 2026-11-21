import { Hono } from 'hono'
import {
  getBatchesHandler,
  postBatchesHandler,
  getBatchesBatchIdHandler,
  postBatchesBatchIdCancelHandler,
} from '../routes'

export const batchesHandler = new Hono()
  .get(
    '/batches',
    getBatchesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/batches',
    postBatchesHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/batches/:batch_id',
    getBatchesBatchIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/batches/:batch_id/cancel',
    postBatchesBatchIdCancelHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
