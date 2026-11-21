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
    postAudioSpeechHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/audio/transcriptions',
    postAudioTranscriptionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/audio/translations',
    postAudioTranslationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/audio/voice_consents',
    getAudioVoiceConsentsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/audio/voice_consents',
    postAudioVoiceConsentsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/audio/voice_consents/:consent_id',
    getAudioVoiceConsentsConsentIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/audio/voice_consents/:consent_id',
    postAudioVoiceConsentsConsentIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/audio/voice_consents/:consent_id',
    deleteAudioVoiceConsentsConsentIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/audio/voices',
    postAudioVoicesHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/audio/voices/:voice_id',
    deleteAudioVoicesVoiceIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
