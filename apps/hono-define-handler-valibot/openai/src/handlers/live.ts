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
    postLiveSessionsHandler(async (c, { json }) => {}),
  )
  .post(
    '/live/sessions/:session_id/accept',
    postLiveSessionsSessionIdAcceptHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/live/sessions/:session_id/fork',
    postLiveSessionsSessionIdForkHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/live/sessions/:session_id/hangup',
    postLiveSessionsSessionIdHangupHandler(async (c, { param }) => {}),
  )
  .post(
    '/live/sessions/:session_id/refer',
    postLiveSessionsSessionIdReferHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/live/sessions/:session_id/reject',
    postLiveSessionsSessionIdRejectHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/live/sessions/:session_id/content',
    getLiveSessionsSessionIdContentHandler(async (c, { param }) => {}),
  )
