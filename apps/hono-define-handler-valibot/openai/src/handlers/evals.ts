import { Hono } from 'hono'
import {
  getEvalsHandler,
  postEvalsHandler,
  getEvalsEvalIdHandler,
  postEvalsEvalIdHandler,
  deleteEvalsEvalIdHandler,
  getEvalsEvalIdRunsHandler,
  postEvalsEvalIdRunsHandler,
  getEvalsEvalIdRunsRunIdHandler,
  deleteEvalsEvalIdRunsRunIdHandler,
  postEvalsEvalIdRunsRunIdCancelHandler,
  getEvalsEvalIdRunsRunIdOutputItemsHandler,
  getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdHandler,
} from '../routes'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    getEvalsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/evals',
    postEvalsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/evals/:eval_id',
    getEvalsEvalIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/evals/:eval_id',
    postEvalsEvalIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/evals/:eval_id',
    deleteEvalsEvalIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/evals/:eval_id/runs',
    getEvalsEvalIdRunsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/evals/:eval_id/runs',
    postEvalsEvalIdRunsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    getEvalsEvalIdRunsRunIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    deleteEvalsEvalIdRunsRunIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    postEvalsEvalIdRunsRunIdCancelHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    getEvalsEvalIdRunsRunIdOutputItemsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
