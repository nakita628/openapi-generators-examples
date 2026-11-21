import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'

const t = initTRPC.create()

export const marketsRouter = t.router({
  getMarkets: t.procedure
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          markets: Schema.optional(
            Schema.Array(Schema.String).annotate({ jsonSchemaExamples: [['CA', 'BR', 'IT']] }),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
