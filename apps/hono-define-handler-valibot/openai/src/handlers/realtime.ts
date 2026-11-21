import { Hono } from 'hono'
import {
  postRealtimeCallsHandler,
  postRealtimeCallsCallIdAcceptHandler,
  postRealtimeCallsCallIdHangupHandler,
  postRealtimeCallsCallIdReferHandler,
  postRealtimeCallsCallIdRejectHandler,
  postRealtimeClientSecretsHandler,
  postRealtimeSessionsHandler,
  postRealtimeTranscriptionSessionsHandler,
  postRealtimeTranslationsClientSecretsHandler,
} from '../routes'

export const realtimeHandler = new Hono()
  .post(
    '/realtime/calls',
    postRealtimeCallsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/calls/:call_id/accept',
    postRealtimeCallsCallIdAcceptHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/calls/:call_id/hangup',
    postRealtimeCallsCallIdHangupHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/calls/:call_id/refer',
    postRealtimeCallsCallIdReferHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/calls/:call_id/reject',
    postRealtimeCallsCallIdRejectHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/client_secrets',
    postRealtimeClientSecretsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/sessions',
    postRealtimeSessionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/transcription_sessions',
    postRealtimeTranscriptionSessionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/realtime/translations/client_secrets',
    postRealtimeTranslationsClientSecretsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
