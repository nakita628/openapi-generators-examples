import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema, SchemaGetter, SchemaIssue } from 'effect'
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
        (() => {
          const M0 = WrapperCollectionSchema
          const M1 = Schema.Struct({ data: Schema.optionalKey(Schema.Array(TripSchema)) })
          const M2 = Schema.Struct({
            links: Schema.optionalKey(
              (() => {
                const M0 = LinksSelfSchema
                const M1 = LinksPaginationSchema
                const isAll = (input: unknown): input is typeof M0.Type & typeof M1.Type =>
                  Schema.is(M0)(input) && Schema.is(M1)(input)
                return Schema.Unknown.pipe(
                  Schema.decodeTo(Schema.declare(isAll), {
                    decode: SchemaGetter.transformEffect((input) =>
                      Effect.all([
                        Schema.decodeUnknownEffect(M0)(input),
                        Schema.decodeUnknownEffect(M1)(input),
                      ]).pipe(
                        Effect.mapError((error) => error.issue),
                        Effect.flatMap((values) => {
                          const merged = values.every(
                            (value) =>
                              typeof value === 'object' && value !== null && !Array.isArray(value),
                          )
                            ? Object.assign({}, ...values)
                            : values[0]
                          return isAll(merged)
                            ? Effect.succeed(merged)
                            : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
                        }),
                      ),
                    ),
                    encode: SchemaGetter.passthrough({ strict: false }),
                  }),
                )
              })(),
            ),
          })
          const isAll = (
            input: unknown,
          ): input is typeof M0.Type & typeof M1.Type & typeof M2.Type =>
            Schema.is(M0)(input) && Schema.is(M1)(input) && Schema.is(M2)(input)
          return Schema.Unknown.pipe(
            Schema.decodeTo(Schema.declare(isAll), {
              decode: SchemaGetter.transformEffect((input) =>
                Effect.all([
                  Schema.decodeUnknownEffect(M0)(input),
                  Schema.decodeUnknownEffect(M1)(input),
                  Schema.decodeUnknownEffect(M2)(input),
                ]).pipe(
                  Effect.mapError((error) => error.issue),
                  Effect.flatMap((values) => {
                    const merged = values.every(
                      (value) =>
                        typeof value === 'object' && value !== null && !Array.isArray(value),
                    )
                      ? Object.assign({}, ...values)
                      : values[0]
                    return isAll(merged)
                      ? Effect.succeed(merged)
                      : Effect.fail(new SchemaIssue.InvalidValue(undefined, merged))
                  }),
                ),
              ),
              encode: SchemaGetter.passthrough({ strict: false }),
            }),
          )
        })(),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
