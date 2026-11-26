import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { PnpMessagesRequestSchema } from '../components'

const t = initTRPC.create()

export const botRouter = t.router({
  postBotPnpPush: t.procedure
    .input(Schema.toStandardSchemaV1(PnpMessagesRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
