import { os } from '@orpc/server'
import * as z from 'zod'
import { SafetyAlertResourceSchema, SafetyCaseResourceSchema } from '../components'

export const getSafetyCasesId = os
  .route({
    method: 'GET',
    path: '/safety/cases/{id}',
    summary: 'Get safety case',
    description: 'Get a safety case by ID.',
    successDescription: 'Success',
  })
  .input(z.object({ id: z.string().max(128).meta({ description: 'Safety case ID' }) }))
  .output(SafetyCaseResourceSchema)
  .handler(async ({ input }) => {})

export const getSafetyAlertsId = os
  .route({
    method: 'GET',
    path: '/safety/alerts/{id}',
    summary: 'Get project safety alert',
    description: 'Get a safety alert belonging to the authenticated API project.',
    successDescription: 'Success',
  })
  .input(z.object({ id: z.string().max(38).meta({ description: 'Project safety alert ID' }) }))
  .output(SafetyAlertResourceSchema)
  .handler(async ({ input }) => {})
