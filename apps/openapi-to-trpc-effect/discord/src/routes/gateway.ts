import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { GatewayBotResponseSchema, GatewayResponseSchema } from '../components'

const t = initTRPC.create()

export const gatewayRouter = t.router({
  getGateway: t.procedure.output(Schema.toStandardSchemaV1(GatewayResponseSchema)).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getGatewayBot: t.procedure
    .output(Schema.toStandardSchemaV1(GatewayBotResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
