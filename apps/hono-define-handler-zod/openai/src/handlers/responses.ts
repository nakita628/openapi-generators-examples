import { Hono } from 'hono'
import {
  postResponsesHandler,
  getResponsesResponseIdHandler,
  deleteResponsesResponseIdHandler,
  postResponsesResponseIdCancelHandler,
  getResponsesResponseIdInputItemsHandler,
  postResponsesInputTokensHandler,
  postResponsesCompactHandler,
  getResponsesResponseIdBetaTrueHandler,
  deleteResponsesResponseIdBetaTrueHandler,
  postResponsesResponseIdCancelBetaTrueHandler,
  postResponsesCompactBetaTrueHandler,
  getResponsesResponseIdInputItemsBetaTrueHandler,
  postResponsesInputTokensBetaTrueHandler,
} from '../routes'

export const responsesHandler = new Hono()
  .post(
    '/responses',
    postResponsesHandler(async (c, { json }) => {}),
  )
  .get(
    '/responses/:response_id',
    getResponsesResponseIdHandler(async (c, { param, query }) => {}),
  )
  .delete(
    '/responses/:response_id',
    deleteResponsesResponseIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/responses/:response_id/cancel',
    postResponsesResponseIdCancelHandler(async (c, { param }) => {}),
  )
  .get(
    '/responses/:response_id/input_items',
    getResponsesResponseIdInputItemsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/responses/input_tokens',
    postResponsesInputTokensHandler(async (c, { json }) => {}),
  )
  .post(
    '/responses/compact',
    postResponsesCompactHandler(async (c, { json }) => {}),
  )
  .get(
    '/responses/:response_id?beta=true',
    getResponsesResponseIdBetaTrueHandler(async (c, { param, query, header }) => {}),
  )
  .delete(
    '/responses/:response_id?beta=true',
    deleteResponsesResponseIdBetaTrueHandler(async (c, { param, header }) => {}),
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    postResponsesResponseIdCancelBetaTrueHandler(async (c, { param, header }) => {}),
  )
  .post(
    '/responses/compact?beta=true',
    postResponsesCompactBetaTrueHandler(async (c, { header, json }) => {}),
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    getResponsesResponseIdInputItemsBetaTrueHandler(async (c, { param, query, header }) => {}),
  )
  .post(
    '/responses/input_tokens?beta=true',
    postResponsesInputTokensBetaTrueHandler(async (c, { header, json }) => {}),
  )
