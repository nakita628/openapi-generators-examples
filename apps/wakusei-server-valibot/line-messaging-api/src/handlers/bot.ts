import { os } from '@orpc/server'
import { PnpMessagesRequestSchema } from '../components'

export const postBotPnpPush = os
  .route({
    method: 'POST',
    path: '/bot/pnp/push',
    tags: ['messaging-api'],
    description: 'Send LINE notification message',
  })
  .input(PnpMessagesRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
