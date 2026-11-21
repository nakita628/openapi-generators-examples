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
    postChatkitSessionsSessionIdCancelHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/chatkit/sessions',
    postChatkitSessionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/chatkit/threads/:thread_id/items',
    getChatkitThreadsThreadIdItemsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/chatkit/threads/:thread_id',
    getChatkitThreadsThreadIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/chatkit/threads/:thread_id',
    deleteChatkitThreadsThreadIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/chatkit/threads',
    getChatkitThreadsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
