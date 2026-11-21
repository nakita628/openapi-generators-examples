import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.union([
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
      z.xor([CreateTranslationResponseJsonSchema, CreateTranslationResponseVerboseJsonSchema]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioVoiceConsents: t.procedure
    .input(
      z.object({ after: z.string().exactOptional(), limit: z.int().default(20).exactOptional() }),
    )
    .output(VoiceConsentListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsents: t.procedure.output(VoiceConsentResourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getAudioVoiceConsentsConsentId: t.procedure
    .input(z.object({ consent_id: z.string() }))
    .output(VoiceConsentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsentsConsentId: t.procedure
    .input(
      z.object({
        consent_id: z.string(),
        name: z.string().meta({ description: 'The updated label for this consent recording.' }),
      }),
    )
    .output(VoiceConsentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAudioVoiceConsentsConsentId: t.procedure
    .input(z.object({ consent_id: z.string() }))
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
    .input(z.object({ voice_id: z.string() }))
    .output(VoiceDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
