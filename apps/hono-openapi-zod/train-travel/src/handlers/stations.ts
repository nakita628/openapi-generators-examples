import { Hono } from 'hono'
import { describeRoute, resolver } from 'hono-openapi'
import * as z from 'zod'
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
              z.intersection(
                z.intersection(
                  WrapperCollectionSchema,
                  z.object({ data: z.array(StationSchema).exactOptional() }),
                ),
                z.object({
                  links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional(),
                }),
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
              z.intersection(
                z.intersection(
                  WrapperCollectionSchema,
                  z.object({ data: z.array(StationSchema).exactOptional() }),
                ),
                z.object({
                  links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional(),
                }),
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
  (c) => {},
)
