import { os } from '@orpc/server'
import * as v from 'valibot'
import { SafetyAlertResourceSchema, SafetyCaseResourceSchema } from '../components'

export const getSafetyCasesId = os
  .route({
    method: 'GET',
    path: '/safety/cases/{id}',
    summary: 'Get safety case',
    description: 'Get a safety case by ID.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      id: v.pipe(v.pipe(v.string(), v.maxCodePoints(128)), v.description('Safety case ID')),
    }),
  )
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
  .input(
    v.object({
      id: v.pipe(v.pipe(v.string(), v.maxCodePoints(38)), v.description('Project safety alert ID')),
    }),
  )
  .output(SafetyAlertResourceSchema)
  .handler(async ({ input }) => {})
