import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  LinksSelfSchema,
  LinksPaginationSchema,
  TripSchema,
  WrapperCollectionSchema,
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  TooManyRequestsResponse,
  UnauthorizedResponse,
} from '../components'

export const tripsHandler = new Hono().get(
  '/trips',
  describeRoute({
    summary: 'Get available train trips',
    description:
      'Returns a list of available train trips between the specified origin and destination stations on the given date, and allows for filtering by bicycle and dog allowances.',
    operationId: 'get-trips',
    tags: ['Trips'],
    responses: {
      '200': {
        description: 'A list of available train trips',
        headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
        content: {
          'application/json': {
            schema: resolver(
              Schema.toStandardSchemaV1(
                WrapperCollectionSchema.check(
                  Schema.makeFilter((input) =>
                    Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(TripSchema)) }))(
                      input,
                    ),
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
            ),
            example: {
              data: [
                {
                  id: 'ea399ba1-6d95-433f-92d1-83f67b775594',
                  origin: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                  destination: 'b2e783e1-c824-4d63-b37a-d8d698862f1d',
                  departure_time: '2024-02-01T10:00:00Z',
                  arrival_time: '2024-02-01T16:00:00Z',
                  price: 50,
                  operator: 'Deutsche Bahn',
                  bicycles_allowed: true,
                  dogs_allowed: true,
                },
                {
                  id: '4d67459c-af07-40bb-bb12-178dbb88e09f',
                  origin: 'b2e783e1-c824-4d63-b37a-d8d698862f1d',
                  destination: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                  departure_time: '2024-02-01T12:00:00Z',
                  arrival_time: '2024-02-01T18:00:00Z',
                  price: 50,
                  operator: 'SNCF',
                  bicycles_allowed: true,
                  dogs_allowed: true,
                },
              ],
              links: {
                self: 'https://api.example.com/trips?origin=efdbb9d1-02c2-4bc3-afb7-6788d8782b1e&destination=b2e783e1-c824-4d63-b37a-d8d698862f1d&date=2024-02-01',
                next: 'https://api.example.com/trips?origin=efdbb9d1-02c2-4bc3-afb7-6788d8782b1e&destination=b2e783e1-c824-4d63-b37a-d8d698862f1d&date=2024-02-01&page=2',
              },
            },
          },
          'application/xml': {
            schema: resolver(
              Schema.toStandardSchemaV1(
                WrapperCollectionSchema.check(
                  Schema.makeFilter((input) =>
                    Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(TripSchema)) }))(
                      input,
                    ),
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
  validator(
    'query',
    Schema.toStandardSchemaV1(
      Schema.Struct({
        origin: Schema.String.check(Schema.isUUID()),
        destination: Schema.String.check(Schema.isUUID()),
        date: Schema.String.check(
          Schema.isPattern(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
        bicycles: Schema.String.check(
          Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
        )
          .pipe(
            Schema.decodeTo(
              Schema.Boolean,
              SchemaTransformation.transform({
                decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                encode: (output) => (output ? 'true' : 'false'),
              }),
            ),
          )
          .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
        dogs: Schema.String.check(
          Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
        )
          .pipe(
            Schema.decodeTo(
              Schema.Boolean,
              SchemaTransformation.transform({
                decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                encode: (output) => (output ? 'true' : 'false'),
              }),
            ),
          )
          .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
      }),
    ),
  ),
  (c) => { throw new Error('Not implemented') },
)
