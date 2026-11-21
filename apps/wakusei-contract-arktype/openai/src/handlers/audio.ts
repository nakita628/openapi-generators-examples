import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAudioSpeech = os.postAudioSpeech.handler(async ({ input }) => {})
export const postAudioTranscriptions = os.postAudioTranscriptions.handler(async ({ input }) => {})
export const postAudioTranslations = os.postAudioTranslations.handler(async ({ input }) => {})
export const getAudioVoiceConsents = os.getAudioVoiceConsents.handler(async ({ input }) => {})
export const postAudioVoiceConsents = os.postAudioVoiceConsents.handler(async ({ input }) => {})
export const getAudioVoiceConsentsConsentId = os.getAudioVoiceConsentsConsentId.handler(
  async ({ input }) => {},
)
export const postAudioVoiceConsentsConsentId = os.postAudioVoiceConsentsConsentId.handler(
  async ({ input }) => {},
)
export const deleteAudioVoiceConsentsConsentId = os.deleteAudioVoiceConsentsConsentId.handler(
  async ({ input }) => {},
)
export const postAudioVoices = os.postAudioVoices.handler(async ({ input }) => {})
export const deleteAudioVoicesVoiceId = os.deleteAudioVoicesVoiceId.handler(async ({ input }) => {})
