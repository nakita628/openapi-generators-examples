import { t, type UnwrapSchema } from 'elysia'
import {
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
} from '../../components/schemas'

export const AudioModel = {
  createTranscriptionResponse200: t.Union([
    CreateTranscriptionResponseJsonSchema,
    CreateTranscriptionResponseDiarizedJsonSchema,
    CreateTranscriptionResponseVerboseJsonSchema,
  ]),
  createTranslationResponse200: t.Union([
    CreateTranslationResponseJsonSchema,
    CreateTranslationResponseVerboseJsonSchema,
  ]),
  listVoiceConsentsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
  }),
  getVoiceConsentParams: t.Object({ consent_id: t.String() }),
  updateVoiceConsentParams: t.Object({ consent_id: t.String() }),
  deleteVoiceConsentParams: t.Object({ consent_id: t.String() }),
  deleteVoiceParams: t.Object({ voice_id: t.String() }),
} as const

export type AudioModel = { [k in keyof typeof AudioModel]: UnwrapSchema<(typeof AudioModel)[k]> }
