import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  describeRoute({
    operationId: 'get_sticker',
    responses: {
      '200': {
        description: '200 response for get_sticker',
        headers: {
          'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
          'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
          'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
          'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
          'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
        },
        content: {
          'application/json': {
            schema: resolver(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema)),
          },
        },
      },
      '429': ClientRatelimitedResponseResponse,
      '4XX': ClientErrorResponseResponse,
    },
    security: [{ BotToken: [] }],
  }),
  validator('param', type({ sticker_id: SnowflakeTypeSchema })),
  (c) => { throw new Error('Not implemented') },
)
