import { Hono } from 'hono'
import { describeRoute, resolver } from 'hono-openapi'
import { Compile } from 'typebox/compile'
import {
  GatewayBotResponseSchema,
  GatewayResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const gatewayHandler = new Hono()
  .get(
    '/gateway',
    describeRoute({
      operationId: 'get_gateway',
      responses: {
        '200': {
          description: '200 response for get_gateway',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GatewayResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/gateway/bot',
    describeRoute({
      operationId: 'get_bot_gateway',
      responses: {
        '200': {
          description: '200 response for get_bot_gateway',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(GatewayBotResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
