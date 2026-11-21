import { Hono } from 'hono'
import { getGatewayHandler, getGatewayBotHandler } from '../routes'

export const gatewayHandler = new Hono()
  .get(
    '/gateway',
    getGatewayHandler(async (c) => {}),
  )
  .get(
    '/gateway/bot',
    getGatewayBotHandler(async (c) => {}),
  )
