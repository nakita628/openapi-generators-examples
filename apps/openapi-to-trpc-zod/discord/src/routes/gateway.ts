import { initTRPC, TRPCError } from '@trpc/server'
import { GatewayBotResponseSchema, GatewayResponseSchema } from '../components'

const t = initTRPC.create()

export const gatewayRouter = t.router({
  getGateway: t.procedure.output(GatewayResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getGatewayBot: t.procedure.output(GatewayBotResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
