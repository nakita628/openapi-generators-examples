import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  TripSchema,
  WrapperCollectionSchema,
} from '../components'

const t = initTRPC.create()

export const tripsRouter = t.router({
  getTrips: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          origin: Schema.String.check(Schema.isUUID()),
          destination: Schema.String.check(Schema.isUUID()),
          date: Schema.String.check(
            Schema.isPattern(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          bicycles: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))),
          dogs: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        WrapperCollectionSchema.check(
          Schema.makeFilter((input) =>
            Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(TripSchema)) }))(input),
          ),
          Schema.makeFilter((input) =>
            Schema.is(
              Schema.Struct({
                links: Schema.optional(
                  LinksSelfSchema.check(
                    Schema.makeFilter((input) => Schema.is(LinksPaginationSchema)(input)),
                  ),
                ),
              }),
            )(input),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
