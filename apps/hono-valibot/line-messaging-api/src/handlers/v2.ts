import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  SetWebhookEndpointRequestSchema,
  TestWebhookEndpointRequestSchema,
  ReplyMessageRequestSchema,
  PushMessageRequestSchema,
  MulticastRequestSchema,
  NarrowcastRequestSchema,
  BroadcastRequestSchema,
  ValidateMessageRequestSchema,
  RichMenuRequestSchema,
  CreateRichMenuAliasRequestSchema,
  UpdateRichMenuAliasRequestSchema,
  RichMenuBulkLinkRequestSchema,
  RichMenuBulkUnlinkRequestSchema,
  RichMenuBatchRequestSchema,
  MarkMessagesAsReadRequestSchema,
  PnpTemplatedMessageRequestSchema,
  CouponCreateRequestSchema,
  ShowLoadingAnimationRequestSchema,
  MarkMessagesAsReadByTokenRequestSchema,
} from '../components'

export const v2Handler = new Hono()
  .get('/v2/bot/channel/webhook/endpoint', (c) => { throw new Error('Not implemented') })
  .put(
    '/v2/bot/channel/webhook/endpoint',
    sValidator('json', SetWebhookEndpointRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/channel/webhook/test',
    sValidator('json', TestWebhookEndpointRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content',
    sValidator('param', v.object({ messageId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    sValidator('param', v.object({ messageId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    sValidator('param', v.object({ messageId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/message/reply', sValidator('json', ReplyMessageRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/message/push',
    sValidator(
      'header',
      v.partial(
        v.object({
          'x-line-retry-key': v.pipe(
            v.string(),
            v.regex(
              /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
            ),
          ),
        }),
      ),
    ),
    sValidator('json', PushMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/multicast',
    sValidator(
      'header',
      v.partial(
        v.object({
          'x-line-retry-key': v.pipe(
            v.string(),
            v.regex(
              /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
            ),
          ),
        }),
      ),
    ),
    sValidator('json', MulticastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/narrowcast',
    sValidator(
      'header',
      v.partial(
        v.object({
          'x-line-retry-key': v.pipe(
            v.string(),
            v.regex(
              /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
            ),
          ),
        }),
      ),
    ),
    sValidator('json', NarrowcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    sValidator('query', v.object({ requestId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/broadcast',
    sValidator(
      'header',
      v.partial(
        v.object({
          'x-line-retry-key': v.pipe(
            v.string(),
            v.regex(
              /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
            ),
          ),
        }),
      ),
    ),
    sValidator('json', BroadcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/quota', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/quota/consumption', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/delivery/reply',
    sValidator('query', v.object({ date: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/push',
    sValidator('query', v.object({ date: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/multicast',
    sValidator('query', v.object({ date: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    sValidator('query', v.object({ date: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/reply',
    sValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/push',
    sValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/multicast',
    sValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/narrowcast',
    sValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/broadcast',
    sValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/aggregation/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/aggregation/list',
    sValidator('query', v.partial(v.object({ limit: v.string(), start: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/profile/:userId', sValidator('param', v.object({ userId: v.string() })), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/followers/ids',
    sValidator(
      'query',
      v.object({
        start: v.optional(v.string()),
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: -2147483648, maximum: 1000 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.maxValue(1000),
            ),
            '300',
          ),
          v.metadata({ default: 300 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    sValidator('param', v.object({ groupId: v.string(), userId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    sValidator('param', v.object({ roomId: v.string(), userId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    sValidator('param', v.object({ groupId: v.string() })),
    sValidator('query', v.partial(v.object({ start: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    sValidator('param', v.object({ roomId: v.string() })),
    sValidator('query', v.partial(v.object({ start: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/group/:groupId/leave',
    sValidator('param', v.object({ groupId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/room/:roomId/leave',
    sValidator('param', v.object({ roomId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/summary',
    sValidator('param', v.object({ groupId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    sValidator('param', v.object({ groupId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    sValidator('param', v.object({ roomId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu', sValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/validate', sValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', v.object({ richMenuId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', v.object({ richMenuId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', v.object({ richMenuId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', v.object({ richMenuId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/list', (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    sValidator('param', v.object({ richMenuId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .delete('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/alias', sValidator('json', CreateRichMenuAliasRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', v.object({ richMenuAliasId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', v.object({ richMenuAliasId: v.string() })),
    sValidator('json', UpdateRichMenuAliasRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', v.object({ richMenuAliasId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/alias/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', v.object({ userId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', v.object({ userId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    sValidator('param', v.object({ userId: v.string(), richMenuId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu/bulk/link', sValidator('json', RichMenuBulkLinkRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/richmenu/bulk/unlink',
    sValidator('json', RichMenuBulkUnlinkRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu/batch', sValidator('json', RichMenuBatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/richmenu/validate/batch',
    sValidator('json', RichMenuBatchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/progress/batch',
    sValidator('query', v.object({ requestId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    sValidator('param', v.object({ userId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/markAsRead',
    sValidator('json', MarkMessagesAsReadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/pnp/templated/push',
    sValidator(
      'header',
      v.partial(
        v.object({
          'x-line-delivery-tag': v.pipe(v.string(), v.minCodePoints(16), v.maxCodePoints(100)),
        }),
      ),
    ),
    sValidator('json', PnpTemplatedMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    sValidator('query', v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    sValidator('query', v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    sValidator('param', v.object({ userId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/membership/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    sValidator(
      'param',
      v.object({
        membershipId: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        start: v.optional(v.string()),
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 1, maximum: 1000 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(1),
              v.maxValue(1000),
            ),
            '300',
          ),
          v.metadata({ default: 300 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon',
    sValidator(
      'query',
      v.object({
        status: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.picklist(['DRAFT', 'RUNNING', 'CLOSED'])),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        start: v.optional(v.string()),
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 1, maximum: 100 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(1),
              v.maxValue(100),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/coupon', sValidator('json', CouponCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/coupon/:couponId',
    sValidator('param', v.object({ couponId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/coupon/:couponId/close',
    sValidator('param', v.object({ couponId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/loading/start',
    sValidator('json', ShowLoadingAnimationRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/markAsRead',
    sValidator('json', MarkMessagesAsReadByTokenRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
