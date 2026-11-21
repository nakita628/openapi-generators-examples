import { os } from '@orpc/server'
import { GatewayBotResponseSchema, GatewayResponseSchema } from '../components'

export const getGateway = os
  .route({ method: 'GET', path: '/gateway', successDescription: '200 response for get_gateway' })
  .output(GatewayResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGatewayBot = os
  .route({
    method: 'GET',
    path: '/gateway/bot',
    successDescription: '200 response for get_bot_gateway',
  })
  .output(GatewayBotResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
