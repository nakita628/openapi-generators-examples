import { Hono } from 'hono'
import { postBotPnpPushHandler } from '../routes'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  postBotPnpPushHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
)
