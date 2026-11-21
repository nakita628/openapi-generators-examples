import { Hono } from 'hono'
import { getChaptersIdHandler, getChaptersHandler } from '../routes'

export const chaptersHandler = new Hono()
  .get(
    '/chapters/:id',
    getChaptersIdHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/chapters',
    getChaptersHandler(async (c, { query }) => {}),
  )
