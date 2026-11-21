import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  MarketsResponse,
} from '../components'

export const marketsHandler = new Hono().get(
  '/markets',
  describeRoute({
    deprecated: true,
    tags: ['Markets'],
    operationId: 'get-available-markets',
    summary: 'Get Available Markets\n',
    description: 'Get the list of markets where Spotify is available.\n',
    responses: {
      '200': MarketsResponse,
      '401': UnauthorizedResponse,
      '403': ForbiddenResponse,
      '429': TooManyRequestsResponse,
    },
    security: [{ oauth_2_0: [] }],
  }),
  (c) => {},
)
