import { Hono } from 'hono'
import { postResponsesBetaTrueHandler } from '../routes'

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  postResponsesBetaTrueHandler(async (c, { header, json }) => {}),
)
