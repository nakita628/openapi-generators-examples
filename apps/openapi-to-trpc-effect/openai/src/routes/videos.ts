import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendJsonBodySchema,
  CreateVideoJsonBodySchema,
  DeletedVideoResourceSchema,
  OrderEnumSchema,
  VideoCharacterResourceSchema,
  VideoContentVariantSchema,
  VideoListResourceSchema,
  VideoResourceSchema,
} from '../components'

const t = initTRPC.create()

export const videosRouter = t.router({
  getVideos: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VideoListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideos: t.procedure
    .input(Schema.toStandardSchemaV1(CreateVideoJsonBodySchema))
    .output(Schema.toStandardSchemaV1(VideoResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosCharacters: t.procedure
    .output(Schema.toStandardSchemaV1(VideoCharacterResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosCharactersCharacterId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          character_id: Schema.String.annotate({ jsonSchemaExamples: ['char_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VideoCharacterResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosEdits: t.procedure
    .input(Schema.toStandardSchemaV1(CreateVideoEditJsonBodySchema))
    .output(Schema.toStandardSchemaV1(VideoResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosExtensions: t.procedure
    .input(Schema.toStandardSchemaV1(CreateVideoExtendJsonBodySchema))
    .output(Schema.toStandardSchemaV1(VideoResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosVideoId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VideoResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVideosVideoId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedVideoResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosVideoIdContent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }),
          variant: Schema.optional(VideoContentVariantSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.String))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosVideoIdRemix: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }),
          prompt: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 32000, {
              expected: 'a string of at most 32000 characters',
            }),
          ).annotate({ description: 'Updated text prompt that directs the remix generation.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VideoResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
