import { Hono } from 'hono'
import {
  postLiveSessionsHandler,
  postLiveSessionsSessionIdAcceptHandler,
  postLiveSessionsSessionIdForkHandler,
  postLiveSessionsSessionIdHangupHandler,
  postLiveSessionsSessionIdReferHandler,
  postLiveSessionsSessionIdRejectHandler,
  getLiveSessionsSessionIdContentHandler,
} from '../routes'

export const liveHandler = new Hono()
  .post(
    '/live/sessions',
    postLiveSessionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/live/sessions/:session_id/accept',
    postLiveSessionsSessionIdAcceptHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/live/sessions/:session_id/fork',
    postLiveSessionsSessionIdForkHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/live/sessions/:session_id/hangup',
    postLiveSessionsSessionIdHangupHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/live/sessions/:session_id/refer',
    postLiveSessionsSessionIdReferHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/live/sessions/:session_id/reject',
    postLiveSessionsSessionIdRejectHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/live/sessions/:session_id/content',
    getLiveSessionsSessionIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
