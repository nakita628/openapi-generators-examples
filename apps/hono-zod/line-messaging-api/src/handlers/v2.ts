import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
    sValidator('param', z.object({ messageId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    sValidator('param', z.object({ messageId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    sValidator('param', z.object({ messageId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/message/reply', sValidator('json', ReplyMessageRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/message/push',
    sValidator('header', z.object({ 'x-line-retry-key': z.uuid().exactOptional() })),
    sValidator('json', PushMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/multicast',
    sValidator('header', z.object({ 'x-line-retry-key': z.uuid().exactOptional() })),
    sValidator('json', MulticastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/narrowcast',
    sValidator('header', z.object({ 'x-line-retry-key': z.uuid().exactOptional() })),
    sValidator('json', NarrowcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    sValidator('query', z.object({ requestId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/broadcast',
    sValidator('header', z.object({ 'x-line-retry-key': z.uuid().exactOptional() })),
    sValidator('json', BroadcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/quota', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/quota/consumption', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/delivery/reply',
    sValidator('query', z.object({ date: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/push',
    sValidator('query', z.object({ date: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/multicast',
    sValidator('query', z.object({ date: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    sValidator('query', z.object({ date: z.string() })),
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
    sValidator(
      'query',
      z.object({ limit: z.string().exactOptional(), start: z.string().exactOptional() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/profile/:userId', sValidator('param', z.object({ userId: z.string() })), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/followers/ids',
    sValidator(
      'query',
      z.object({
        start: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.int32().max(1000),
          )
          .default(300)
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    sValidator('param', z.object({ groupId: z.string(), userId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    sValidator('param', z.object({ roomId: z.string(), userId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    sValidator('param', z.object({ groupId: z.string() })),
    sValidator('query', z.object({ start: z.string().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    sValidator('param', z.object({ roomId: z.string() })),
    sValidator('query', z.object({ start: z.string().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/group/:groupId/leave',
    sValidator('param', z.object({ groupId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/room/:roomId/leave',
    sValidator('param', z.object({ roomId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/summary',
    sValidator('param', z.object({ groupId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    sValidator('param', z.object({ groupId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    sValidator('param', z.object({ roomId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu', sValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/validate', sValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', z.object({ richMenuId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', z.object({ richMenuId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', z.object({ richMenuId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', z.object({ richMenuId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/list', (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    sValidator('param', z.object({ richMenuId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .delete('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/alias', sValidator('json', CreateRichMenuAliasRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', z.object({ richMenuAliasId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', z.object({ richMenuAliasId: z.string() })),
    sValidator('json', UpdateRichMenuAliasRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator('param', z.object({ richMenuAliasId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/alias/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', z.object({ userId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', z.object({ userId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    sValidator('param', z.object({ userId: z.string(), richMenuId: z.string() })),
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
    sValidator('query', z.object({ requestId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    sValidator('param', z.object({ userId: z.string() })),
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
      z.object({ 'x-line-delivery-tag': z.string().min(16).max(100).exactOptional() }),
    ),
    sValidator('json', PnpTemplatedMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    sValidator('query', z.object({ date: z.string().regex(/^[0-9]{8}$/) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    sValidator('query', z.object({ date: z.string().regex(/^[0-9]{8}$/) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    sValidator('param', z.object({ userId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/membership/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    sValidator(
      'param',
      z.object({
        membershipId: z.preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        ),
      }),
    ),
    sValidator(
      'query',
      z.object({
        start: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.int32().min(1).max(1000),
          )
          .default(300)
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon',
    sValidator(
      'query',
      z.object({
        status: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(z.enum(['DRAFT', 'RUNNING', 'CLOSED']))
              .refine((val) => new Set(val).size === val.length),
          )
          .exactOptional(),
        start: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.int32().min(1).max(100),
          )
          .default(20)
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/coupon', sValidator('json', CouponCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/coupon/:couponId',
    sValidator('param', z.object({ couponId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/coupon/:couponId/close',
    sValidator('param', z.object({ couponId: z.string() })),
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
