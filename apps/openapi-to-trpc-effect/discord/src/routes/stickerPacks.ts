import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  SnowflakeTypeSchema,
  StickerPackCollectionResponseSchema,
  StickerPackResponseSchema,
} from '../components'

const t = initTRPC.create()

export const stickerPacksRouter = t.router({
  getStickerPacks: t.procedure
    .output(Schema.toStandardSchemaV1(StickerPackCollectionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStickerPacksPackId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ pack_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(StickerPackResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
