import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
} from '../components'

const t = initTRPC.create()

export const stickersRouter = t.router({
  getStickersStickerId: t.procedure
    .input(type({ sticker_id: SnowflakeTypeSchema }))
    .output(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
