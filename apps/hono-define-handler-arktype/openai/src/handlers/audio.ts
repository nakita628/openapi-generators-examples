import { Hono } from 'hono'
import {
  postAudioSpeechHandler,
  postAudioTranscriptionsHandler,
  postAudioTranslationsHandler,
  getAudioVoiceConsentsHandler,
  postAudioVoiceConsentsHandler,
  getAudioVoiceConsentsConsentIdHandler,
  postAudioVoiceConsentsConsentIdHandler,
  deleteAudioVoiceConsentsConsentIdHandler,
  postAudioVoicesHandler,
  deleteAudioVoicesVoiceIdHandler,
} from '../routes'

export const audioHandler = new Hono()
  .post(
    '/audio/speech',
    postAudioSpeechHandler(async (c, { json }) => {}),
  )
  .post(
    '/audio/transcriptions',
    postAudioTranscriptionsHandler(async (c, { form }) => {}),
  )
  .post(
    '/audio/translations',
    postAudioTranslationsHandler(async (c, { form }) => {}),
  )
  .get(
    '/audio/voice_consents',
    getAudioVoiceConsentsHandler(async (c, { query }) => {}),
  )
  .post(
    '/audio/voice_consents',
    postAudioVoiceConsentsHandler(async (c, { form }) => {}),
  )
  .get(
    '/audio/voice_consents/:consent_id',
    getAudioVoiceConsentsConsentIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/audio/voice_consents/:consent_id',
    postAudioVoiceConsentsConsentIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/audio/voice_consents/:consent_id',
    deleteAudioVoiceConsentsConsentIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/audio/voices',
    postAudioVoicesHandler(async (c, { form, json }) => {}),
  )
  .delete(
    '/audio/voices/:voice_id',
    deleteAudioVoicesVoiceIdHandler(async (c, { param }) => {}),
  )
