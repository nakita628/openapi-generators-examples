import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
} from '../components'

const t = initTRPC.create()

export const stickersRouter = t.router({
  getStickersStickerId: t.procedure
    .input(z.object({ sticker_id: SnowflakeTypeSchema }))
    .output(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
