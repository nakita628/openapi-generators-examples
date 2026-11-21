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
    getBatchesHandler(async (c, { query }) => {}),
  )
  .post(
    '/batches',
    postBatchesHandler(async (c, { json }) => {}),
  )
  .get(
    '/batches/:batch_id',
    getBatchesBatchIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/batches/:batch_id/cancel',
    postBatchesBatchIdCancelHandler(async (c, { param }) => {}),
  )
