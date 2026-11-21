import { Hono } from 'hono'
import { getGatewayHandler, getGatewayBotHandler } from '../routes'

export const gatewayHandler = new Hono()
  .get(
    '/gateway',
    getGatewayHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/gateway/bot',
    getGatewayBotHandler(async (c) => { throw new Error('Not implemented') }),
  )
