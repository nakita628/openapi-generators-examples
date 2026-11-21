import { Hono } from 'hono'
import { describeRoute, resolver } from 'hono-openapi'
import * as v from 'valibot'
import {
  VoiceRegionResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const voiceHandler = new Hono().get(
  '/voice/regions',
  describeRoute({
    operationId: 'list_voice_regions',
    responses: {
      '200': {
        description: '200 response for list_voice_regions',
        headers: {
          'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
          'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
          'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
          'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
          'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
        },
        content: {
          'application/json': { schema: resolver(v.nullable(v.array(VoiceRegionResponseSchema))) },
        },
      },
      '429': ClientRatelimitedResponseResponse,
      '4XX': ClientErrorResponseResponse,
    },
    security: [{ BotToken: [] }],
  }),
  (c) => { throw new Error('Not implemented') },
)
