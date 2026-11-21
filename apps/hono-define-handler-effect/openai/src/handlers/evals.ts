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
    getEvalsHandler(async (c, { query }) => {}),
  )
  .post(
    '/evals',
    postEvalsHandler(async (c, { json }) => {}),
  )
  .get(
    '/evals/:eval_id',
    getEvalsEvalIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/evals/:eval_id',
    postEvalsEvalIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/evals/:eval_id',
    deleteEvalsEvalIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/evals/:eval_id/runs',
    getEvalsEvalIdRunsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/evals/:eval_id/runs',
    postEvalsEvalIdRunsHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    getEvalsEvalIdRunsRunIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    deleteEvalsEvalIdRunsRunIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    postEvalsEvalIdRunsRunIdCancelHandler(async (c, { param }) => {}),
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    getEvalsEvalIdRunsRunIdOutputItemsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdHandler(async (c, { param }) => {}),
  )
