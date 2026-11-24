import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Effect, Schema } from 'effect'
import { LinksSelfSchema, LinksPaginationSchema, BookingSchema } from '../components'

export const webhooksHandler = new Hono().post(
  '/newBooking',
  describeRoute({
    operationId: 'new-booking',
    summary: 'New Booking',
    description:
      'Subscribe to new bookings being created, to update integrations for your users.  Related data is available via the links provided in the request.\n',
    tags: ['Bookings'],
    responses: {
      '200': {
        description: 'Return a 200 status to indicate that the data was received successfully.',
        headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
      },
    },
  }),
  validator(
    'json',
    Schema.toStandardSchemaV1(
      (() => {
        const M0 = BookingSchema
        const M1 = Schema.Struct({
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
                    (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
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
  ),
  (c) => { throw new Error('Not implemented') },
)
