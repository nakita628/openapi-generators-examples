import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
} from '../components'

const t = initTRPC.create()

export const stickersRouter = t.router({
  getStickersStickerId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ sticker_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([GuildStickerResponseSchema, StandardStickerResponseSchema]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
