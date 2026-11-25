import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  SnowflakeTypeSchema,
  StickerPackCollectionResponseSchema,
  StickerPackResponseSchema,
} from '../components'

const t = initTRPC.create()

export const stickerPacksRouter = t.router({
  getStickerPacks: t.procedure.output(StickerPackCollectionResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getStickerPacksPackId: t.procedure
    .input(z.object({ pack_id: SnowflakeTypeSchema }))
    .output(StickerPackResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
