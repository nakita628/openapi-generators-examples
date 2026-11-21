import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAudioSpeech = os.postAudioSpeech.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAudioTranscriptions = os.postAudioTranscriptions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAudioTranslations = os.postAudioTranslations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAudioVoiceConsents = os.getAudioVoiceConsents.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAudioVoiceConsents = os.postAudioVoiceConsents.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAudioVoiceConsentsConsentId = os.getAudioVoiceConsentsConsentId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAudioVoiceConsentsConsentId = os.postAudioVoiceConsentsConsentId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteAudioVoiceConsentsConsentId = os.deleteAudioVoiceConsentsConsentId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAudioVoices = os.postAudioVoices.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteAudioVoicesVoiceId = os.deleteAudioVoicesVoiceId.handler(async ({ input }) => { throw new Error('Not implemented') })
