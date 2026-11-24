import { Hono } from 'hono'
import { describeRoute, resolver } from 'hono-openapi'
import { Effect, Schema } from 'effect'
import {
  StationSchema,
  LinksSelfSchema,
  LinksPaginationSchema,
  WrapperCollectionSchema,
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  TooManyRequestsResponse,
  UnauthorizedResponse,
} from '../components'

export const stationsHandler = new Hono().get(
  '/stations',
  describeRoute({
    summary: 'Get a list of train stations',
    description: 'Returns a list of all train stations in the system.',
    operationId: 'get-stations',
    tags: ['Stations'],
    responses: {
      '200': {
        description: 'A list of train stations',
        headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
        content: {
          'application/json': {
            schema: resolver(
              Schema.toStandardSchemaV1(
                (() => {
                  const M0 = WrapperCollectionSchema
                  const M1 = Schema.Struct({
                    data: Schema.optionalKey(Schema.Array(StationSchema)),
                  })
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
                                      typeof value === 'object' &&
                                      value !== null &&
                                      !Array.isArray(value),
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
                                typeof value === 'object' &&
                                value !== null &&
                                !Array.isArray(value),
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
            example: {
              data: [
                {
                  id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                  name: 'Berlin Hauptbahnhof',
                  address: 'Invalidenstraße 10557 Berlin, Germany',
                  country_code: 'DE',
                  timezone: 'Europe/Berlin',
                },
                {
                  id: 'b2e783e1-c824-4d63-b37a-d8d698862f1d',
                  name: 'Paris Gare du Nord',
                  address: '18 Rue de Dunkerque 75010 Paris, France',
                  country_code: 'FR',
                  timezone: 'Europe/Paris',
                },
              ],
              links: {
                self: 'https://api.example.com/stations&page=2',
                next: 'https://api.example.com/stations?page=3',
                prev: 'https://api.example.com/stations?page=1',
              },
            },
          },
          'application/xml': {
            schema: resolver(
              Schema.toStandardSchemaV1(
                (() => {
                  const M0 = WrapperCollectionSchema
                  const M1 = Schema.Struct({
                    data: Schema.optionalKey(Schema.Array(StationSchema)),
                  })
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
                                      typeof value === 'object' &&
                                      value !== null &&
                                      !Array.isArray(value),
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
                                typeof value === 'object' &&
                                value !== null &&
                                !Array.isArray(value),
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
          },
        },
      },
      '400': BadRequestResponse,
      '401': UnauthorizedResponse,
      '403': ForbiddenResponse,
      '429': TooManyRequestsResponse,
      '500': InternalServerErrorResponse,
    },
  }),
  (c) => { throw new Error('Not implemented') },
)
