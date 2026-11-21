import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { SafetyAlertResourceSchema, SafetyCaseResourceSchema } from '../components'

const t = initTRPC.create()

export const safetyRouter = t.router({
  getSafetyCasesId: t.procedure
    .input(
      v.object({
        id: v.pipe(v.pipe(v.string(), v.maxCodePoints(128)), v.description('Safety case ID')),
      }),
    )
    .output(SafetyCaseResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSafetyAlertsId: t.procedure
    .input(
      v.object({
        id: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(38)),
          v.description('Project safety alert ID'),
        ),
      }),
    )
    .output(SafetyAlertResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
