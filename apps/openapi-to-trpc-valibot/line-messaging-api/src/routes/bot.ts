import { initTRPC, TRPCError } from '@trpc/server'
import { PnpMessagesRequestSchema } from '../components'

const t = initTRPC.create()

export const botRouter = t.router({
  postBotPnpPush: t.procedure.input(PnpMessagesRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
