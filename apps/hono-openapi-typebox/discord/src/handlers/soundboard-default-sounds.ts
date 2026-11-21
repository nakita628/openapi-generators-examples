import { Hono } from 'hono'
import { describeRoute, resolver } from 'hono-openapi'
import { Type } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  SoundboardSoundResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const soundboardDefaultSoundsHandler = new Hono().get(
  '/soundboard-default-sounds',
  describeRoute({
    operationId: 'get_soundboard_default_sounds',
    responses: {
      '200': {
        description: '200 response for get_soundboard_default_sounds',
        headers: {
          'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
          'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
          'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
          'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
          'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
        },
        content: {
          'application/json': {
            schema: resolver(Compile(Type.Array(SoundboardSoundResponseSchema))),
          },
        },
      },
      '429': ClientRatelimitedResponseResponse,
      '4XX': ClientErrorResponseResponse,
    },
    security: [{ BotToken: [] }],
  }),
  (c) => { throw new Error('Not implemented') },
)
