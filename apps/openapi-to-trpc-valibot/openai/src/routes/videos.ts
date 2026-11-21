import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          limit: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description('Identifier for the last item from the previous pagination request'),
          ),
        }),
      ),
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
    .input(v.object({ character_id: v.pipe(v.string(), v.metadata({ examples: ['char_123'] })) }))
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
    .input(v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }))
    .output(VideoResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVideosVideoId: t.procedure
    .input(v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }))
    .output(DeletedVideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosVideoIdContent: t.procedure
    .input(
      v.object({
        video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })),
        variant: v.optional(VideoContentVariantSchema),
      }),
    )
    .output(v.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosVideoIdRemix: t.procedure
    .input(
      v.object({
        video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })),
        prompt: v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32000)),
          v.description('Updated text prompt that directs the remix generation.'),
        ),
      }),
    )
    .output(VideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
