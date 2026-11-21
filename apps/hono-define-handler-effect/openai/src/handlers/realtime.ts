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
    postRealtimeCallsHandler(async (c, { form }) => {}),
  )
  .post(
    '/realtime/calls/:call_id/accept',
    postRealtimeCallsCallIdAcceptHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/realtime/calls/:call_id/hangup',
    postRealtimeCallsCallIdHangupHandler(async (c, { param }) => {}),
  )
  .post(
    '/realtime/calls/:call_id/refer',
    postRealtimeCallsCallIdReferHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/realtime/calls/:call_id/reject',
    postRealtimeCallsCallIdRejectHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/realtime/client_secrets',
    postRealtimeClientSecretsHandler(async (c, { json }) => {}),
  )
  .post(
    '/realtime/sessions',
    postRealtimeSessionsHandler(async (c, { json }) => {}),
  )
  .post(
    '/realtime/transcription_sessions',
    postRealtimeTranscriptionSessionsHandler(async (c, { json }) => {}),
  )
  .post(
    '/realtime/translations/client_secrets',
    postRealtimeTranslationsClientSecretsHandler(async (c, { json }) => {}),
  )
