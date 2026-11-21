import { Hono } from 'hono'
import {
  postChatkitSessionsSessionIdCancelHandler,
  postChatkitSessionsHandler,
  getChatkitThreadsThreadIdItemsHandler,
  getChatkitThreadsThreadIdHandler,
  deleteChatkitThreadsThreadIdHandler,
  getChatkitThreadsHandler,
} from '../routes'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    postChatkitSessionsSessionIdCancelHandler(async (c, { param }) => {}),
  )
  .post(
    '/chatkit/sessions',
    postChatkitSessionsHandler(async (c, { json }) => {}),
  )
  .get(
    '/chatkit/threads/:thread_id/items',
    getChatkitThreadsThreadIdItemsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/chatkit/threads/:thread_id',
    getChatkitThreadsThreadIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/chatkit/threads/:thread_id',
    deleteChatkitThreadsThreadIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/chatkit/threads',
    getChatkitThreadsHandler(async (c, { query }) => {}),
  )
