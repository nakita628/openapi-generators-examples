import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { SafetyAlertResourceSchema, SafetyCaseResourceSchema } from '../components'

const t = initTRPC.create()

export const safetyRouter = t.router({
  getSafetyCasesId: t.procedure
    .input(
      type({
        id: type('string')
          .narrow((data, ctx) => [...data].length <= 128 || ctx.mustBe('at most 128 characters'))
          .describe('Safety case ID'),
      }),
    )
    .output(SafetyCaseResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSafetyAlertsId: t.procedure
    .input(
      type({
        id: type('string')
          .narrow((data, ctx) => [...data].length <= 38 || ctx.mustBe('at most 38 characters'))
          .describe('Project safety alert ID'),
      }),
    )
    .output(SafetyAlertResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
