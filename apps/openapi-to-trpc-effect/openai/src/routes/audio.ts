import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
  postAudioSpeech: t.procedure
    .input(Schema.toStandardSchemaV1(CreateSpeechRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioTranscriptions: t.procedure
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          CreateTranscriptionResponseJsonSchema,
          CreateTranscriptionResponseDiarizedJsonSchema,
          CreateTranscriptionResponseVerboseJsonSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioTranslations: t.procedure
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          CreateTranslationResponseJsonSchema,
          CreateTranslationResponseVerboseJsonSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioVoiceConsents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VoiceConsentListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsents: t.procedure
    .output(Schema.toStandardSchemaV1(VoiceConsentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioVoiceConsentsConsentId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ consent_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(VoiceConsentResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoiceConsentsConsentId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          consent_id: Schema.String,
          name: Schema.String.annotate({
            description: 'The updated label for this consent recording.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VoiceConsentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAudioVoiceConsentsConsentId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ consent_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(VoiceConsentDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAudioVoices: t.procedure
    .input(Schema.toStandardSchemaV1(CreateVoicePromptRequestSchema))
    .output(Schema.toStandardSchemaV1(VoiceResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAudioVoicesVoiceId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ voice_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(VoiceDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
