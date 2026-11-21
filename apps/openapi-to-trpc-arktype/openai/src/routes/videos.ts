import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'Identifier for the last item from the previous pagination request',
        ),
      }),
    )
    .output(VideoListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideos: t.procedure
    .input(CreateVideoJsonBodySchema)
    .output(VideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosCharacters: t.procedure.output(VideoCharacterResourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getVideosCharactersCharacterId: t.procedure
    .input(type({ character_id: 'string' }))
    .output(VideoCharacterResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosEdits: t.procedure
    .input(CreateVideoEditJsonBodySchema)
    .output(VideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosExtensions: t.procedure
    .input(CreateVideoExtendJsonBodySchema)
    .output(VideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosVideoId: t.procedure
    .input(type({ video_id: 'string' }))
    .output(VideoResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVideosVideoId: t.procedure
    .input(type({ video_id: 'string' }))
    .output(DeletedVideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosVideoIdContent: t.procedure
    .input(type({ video_id: 'string', 'variant?': VideoContentVariantSchema }))
    .output(type('string'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosVideoIdRemix: t.procedure
    .input(
      type({
        video_id: 'string',
        prompt: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 32000 || ctx.mustBe('at most 32000 characters'),
          )
          .describe('Updated text prompt that directs the remix generation.'),
      }),
    )
    .output(VideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
