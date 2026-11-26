import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
    sValidator('param', type({ messageId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    sValidator('param', type({ messageId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    sValidator('param', type({ messageId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/message/reply', sValidator('json', ReplyMessageRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/message/push',
    sValidator('header', type({ 'x-line-retry-key?': 'string.uuid' })),
    sValidator('json', PushMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/multicast',
    sValidator('header', type({ 'x-line-retry-key?': 'string.uuid' })),
    sValidator('json', MulticastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/narrowcast',
    sValidator('header', type({ 'x-line-retry-key?': 'string.uuid' })),
    sValidator('json', NarrowcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    sValidator('query', type({ requestId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/broadcast',
    sValidator('header', type({ 'x-line-retry-key?': 'string.uuid' })),
    sValidator('json', BroadcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/quota', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/quota/consumption', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/delivery/reply', sValidator('query', type({ date: 'string' })), (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/delivery/push', sValidator('query', type({ date: 'string' })), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/delivery/multicast',
    sValidator('query', type({ date: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    sValidator('query', type({ date: 'string' })),
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
    sValidator('query', type({ 'limit?': 'string', 'start?': 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/profile/:userId', sValidator('param', type({ userId: 'string' })), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/followers/ids',
    sValidator(
      'query',
      type({
        'start?': 'string',
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to(
            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 1000',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    sValidator('param', type({ groupId: 'string', userId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    sValidator('param', type({ roomId: 'string', userId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    sValidator('param', type({ groupId: 'string' })),
    sValidator('query', type({ 'start?': 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    sValidator('param', type({ roomId: 'string' })),
    sValidator('query', type({ 'start?': 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/group/:groupId/leave', sValidator('param', type({ groupId: 'string' })), (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/room/:roomId/leave', sValidator('param', type({ roomId: 'string' })), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/group/:groupId/summary',
    sValidator('param', type({ groupId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    sValidator('param', type({ groupId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    sValidator('param', type({ roomId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu', sValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/validate', sValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', type({ richMenuId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', type({ richMenuId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', type({ richMenuId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', type({ richMenuId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/list', (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    sValidator('param', type({ richMenuId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .delete('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/alias', sValidator('json', CreateRichMenuAliasRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', type({ richMenuAliasId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', type({ richMenuAliasId: 'string' })),
    sValidator('json', UpdateRichMenuAliasRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', type({ richMenuAliasId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/alias/list', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/user/:userId/richmenu', sValidator('param', type({ userId: 'string' })), (c) => { throw new Error('Not implemented') })
  .delete(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', type({ userId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    sValidator('param', type({ userId: 'string', richMenuId: 'string' })),
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
    sValidator('query', type({ requestId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    sValidator('param', type({ userId: 'string' })),
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
      type({
        'x-line-delivery-tag?': type('string')
          .narrow((data, ctx) => [...data].length >= 16 || ctx.mustBe('at least 16 characters'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      }),
    ),
    sValidator('json', PnpTemplatedMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    sValidator('query', type({ date: type('string').and(/^[0-9]{8}$/) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    sValidator('query', type({ date: type('string').and(/^[0-9]{8}$/) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    sValidator('param', type({ userId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/membership/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    sValidator(
      'param',
      type({
        membershipId: type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
      }),
    ),
    sValidator(
      'query',
      type({
        'start?': 'string',
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to(
            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 1000',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon',
    sValidator(
      'query',
      type({
        'status?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type("'DRAFT' | 'RUNNING' | 'CLOSED'")
            .array()
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'start?': 'string',
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to(
            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 100',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/coupon', sValidator('json', CouponCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/coupon/:couponId', sValidator('param', type({ couponId: 'string' })), (c) => { throw new Error('Not implemented') })
  .put(
    '/v2/bot/coupon/:couponId/close',
    sValidator('param', type({ couponId: 'string' })),
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
