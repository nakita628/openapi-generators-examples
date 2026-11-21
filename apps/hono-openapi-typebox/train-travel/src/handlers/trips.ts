import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
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
              Compile(
                Type.Intersect([
                  WrapperCollectionSchema,
                  Type.Object({ data: Type.Optional(Type.Array(TripSchema)) }),
                  Type.Object({
                    links: Type.Optional(Type.Intersect([LinksSelfSchema, LinksPaginationSchema])),
                  }),
                ]),
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
              Compile(
                Type.Intersect([
                  WrapperCollectionSchema,
                  Type.Object({ data: Type.Optional(Type.Array(TripSchema)) }),
                  Type.Object({
                    links: Type.Optional(Type.Intersect([LinksSelfSchema, LinksPaginationSchema])),
                  }),
                ]),
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
    Compile(
      Type.Object({
        origin: Type.String({ format: 'uuid' }),
        destination: Type.String({ format: 'uuid' }),
        date: Type.String({ format: 'date-time' }),
        bicycles: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')], { default: 'false' }))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        dogs: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')], { default: 'false' }))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
  ),
  (c) => {},
)
