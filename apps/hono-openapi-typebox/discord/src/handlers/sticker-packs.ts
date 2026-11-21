import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  SnowflakeTypeSchema,
  StickerPackCollectionResponseSchema,
  StickerPackResponseSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const stickerPacksHandler = new Hono()
  .get(
    '/sticker-packs',
    describeRoute({
      operationId: 'list_sticker_packs',
      responses: {
        '200': {
          description: '200 response for list_sticker_packs',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(StickerPackCollectionResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/sticker-packs/:pack_id',
    describeRoute({
      operationId: 'get_sticker_pack',
      responses: {
        '200': {
          description: '200 response for get_sticker_pack',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(StickerPackResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ pack_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
