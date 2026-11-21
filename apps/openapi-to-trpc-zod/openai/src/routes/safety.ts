import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { SafetyAlertResourceSchema, SafetyCaseResourceSchema } from '../components'

const t = initTRPC.create()

export const safetyRouter = t.router({
  getSafetyCasesId: t.procedure
    .input(z.object({ id: z.string().max(128).meta({ description: 'Safety case ID' }) }))
    .output(SafetyCaseResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSafetyAlertsId: t.procedure
    .input(z.object({ id: z.string().max(38).meta({ description: 'Project safety alert ID' }) }))
    .output(SafetyAlertResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
