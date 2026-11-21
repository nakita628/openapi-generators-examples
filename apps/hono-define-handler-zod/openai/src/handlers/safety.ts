import { Hono } from 'hono'
import { getSafetyCasesIdHandler, getSafetyAlertsIdHandler } from '../routes'

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    getSafetyCasesIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/safety/alerts/:id',
    getSafetyAlertsIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
