import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
} from '../components'

const t = initTRPC.create()

export const stickersRouter = t.router({
  getStickersStickerId: t.procedure
    .input(v.object({ sticker_id: SnowflakeTypeSchema }))
    .output(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
