import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema, SchemaGetter, SchemaIssue } from 'effect'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  StationSchema,
  WrapperCollectionSchema,
} from '../components'

const t = initTRPC.create()

export const stationsRouter = t.router({
  getStations: t.procedure
    .output(
      Schema.toStandardSchemaV1(
        (() => {
          const M0 = WrapperCollectionSchema
          const M1 = Schema.Struct({ data: Schema.optionalKey(Schema.Array(StationSchema)) })
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
