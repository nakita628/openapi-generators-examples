import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { SafetyAlertResourceSchema, SafetyCaseResourceSchema } from '../components'

const t = initTRPC.create()

export const safetyRouter = t.router({
  getSafetyCasesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 128, {
              expected: 'a string of at most 128 characters',
            }),
          ).annotate({ description: 'Safety case ID' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SafetyCaseResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSafetyAlertsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 38, {
              expected: 'a string of at most 38 characters',
            }),
          ).annotate({ description: 'Project safety alert ID' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SafetyAlertResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
