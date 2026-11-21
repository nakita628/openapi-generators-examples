import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        limit: z.int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
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
    .input(z.object({ character_id: z.string().meta({ examples: ['char_123'] }) }))
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
    .input(z.object({ video_id: z.string().meta({ examples: ['video_123'] }) }))
    .output(VideoResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVideosVideoId: t.procedure
    .input(z.object({ video_id: z.string().meta({ examples: ['video_123'] }) }))
    .output(DeletedVideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVideosVideoIdContent: t.procedure
    .input(
      z.object({
        video_id: z.string().meta({ examples: ['video_123'] }),
        variant: VideoContentVariantSchema.exactOptional(),
      }),
    )
    .output(z.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVideosVideoIdRemix: t.procedure
    .input(
      z.object({
        video_id: z.string().meta({ examples: ['video_123'] }),
        prompt: z
          .string()
          .min(1)
          .max(32000)
          .meta({ description: 'Updated text prompt that directs the remix generation.' }),
      }),
    )
    .output(VideoResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
