import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  CreateSpeechRequestSchema,
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
  CreateVoicePromptRequestSchema,
  VoiceConsentDeletedResourceSchema,
  VoiceConsentListResourceSchema,
  VoiceConsentResourceSchema,
  VoiceDeletedResourceSchema,
  VoiceResourceSchema,
} from '../components'

const t = initTRPC.create()

export const audioRouter = t.router({
  postAudioSpeech: t.procedure.input(CreateSpeechRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postAudioTranscriptions: t.procedure
    .output(
      type(
        type(CreateTranscriptionResponseJsonSchema).or(
          CreateTranscriptionResponseDiarizedJsonSchema,
        ),
      ).or(CreateTranscriptionResponseVerboseJsonSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioTranslations: t.procedure
    .output(
      type(CreateTranslationResponseJsonSchema).or(CreateTranslationResponseVerboseJsonSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioVoiceConsents: t.procedure
    .input(type({ 'after?': 'string', 'limit?': 'number.integer' }))
    .output(VoiceConsentListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsents: t.procedure.output(VoiceConsentResourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getAudioVoiceConsentsConsentId: t.procedure
    .input(type({ consent_id: 'string' }))
    .output(VoiceConsentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsentsConsentId: t.procedure
    .input(
      type({
        consent_id: 'string',
        name: type('string').describe('The updated label for this consent recording.'),
      }),
    )
    .output(VoiceConsentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAudioVoiceConsentsConsentId: t.procedure
    .input(type({ consent_id: 'string' }))
    .output(VoiceConsentDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoices: t.procedure
    .input(CreateVoicePromptRequestSchema)
    .output(VoiceResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAudioVoicesVoiceId: t.procedure
    .input(type({ voice_id: 'string' }))
    .output(VoiceDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
