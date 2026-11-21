import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.union([
        CreateTranscriptionResponseJsonSchema,
        CreateTranscriptionResponseDiarizedJsonSchema,
        CreateTranscriptionResponseVerboseJsonSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioTranslations: t.procedure
    .output(
      v.union([CreateTranslationResponseJsonSchema, CreateTranslationResponseVerboseJsonSchema]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioVoiceConsents: t.procedure
    .input(
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
      }),
    )
    .output(VoiceConsentListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsents: t.procedure.output(VoiceConsentResourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getAudioVoiceConsentsConsentId: t.procedure
    .input(v.object({ consent_id: v.string() }))
    .output(VoiceConsentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsentsConsentId: t.procedure
    .input(
      v.object({
        consent_id: v.string(),
        name: v.pipe(v.string(), v.description('The updated label for this consent recording.')),
      }),
    )
    .output(VoiceConsentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAudioVoiceConsentsConsentId: t.procedure
    .input(v.object({ consent_id: v.string() }))
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
    .input(v.object({ voice_id: v.string() }))
    .output(VoiceDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
