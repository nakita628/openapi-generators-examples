import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      id: type('string')
        .narrow((data, ctx) => [...data].length <= 128 || ctx.mustBe('at most 128 characters'))
        .describe('Safety case ID'),
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
    type({
      id: type('string')
        .narrow((data, ctx) => [...data].length <= 38 || ctx.mustBe('at most 38 characters'))
        .describe('Project safety alert ID'),
    }),
  )
  .output(SafetyAlertResourceSchema)
  .handler(async ({ input }) => {})
