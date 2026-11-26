import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
    tbValidator('json', SetWebhookEndpointRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/channel/webhook/test',
    tbValidator('json', TestWebhookEndpointRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content',
    tbValidator('param', Type.Object({ messageId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    tbValidator('param', Type.Object({ messageId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    tbValidator('param', Type.Object({ messageId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/message/reply', tbValidator('json', ReplyMessageRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/message/push',
    tbValidator(
      'header',
      Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
    ),
    tbValidator('json', PushMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/multicast',
    tbValidator(
      'header',
      Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
    ),
    tbValidator('json', MulticastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/narrowcast',
    tbValidator(
      'header',
      Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
    ),
    tbValidator('json', NarrowcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    tbValidator('query', Type.Object({ requestId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/broadcast',
    tbValidator(
      'header',
      Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
    ),
    tbValidator('json', BroadcastRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/quota', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/quota/consumption', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/delivery/reply',
    tbValidator('query', Type.Object({ date: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/push',
    tbValidator('query', Type.Object({ date: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/multicast',
    tbValidator('query', Type.Object({ date: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    tbValidator('query', Type.Object({ date: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/reply',
    tbValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/push',
    tbValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/multicast',
    tbValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/narrowcast',
    tbValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/broadcast',
    tbValidator('json', ValidateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/aggregation/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/aggregation/list',
    tbValidator(
      'query',
      Type.Object({ limit: Type.Optional(Type.String()), start: Type.Optional(Type.String()) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/profile/:userId',
    tbValidator('param', Type.Object({ userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/followers/ids',
    tbValidator(
      'query',
      Type.Object({
        start: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '300' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    tbValidator('param', Type.Object({ groupId: Type.String(), userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    tbValidator('param', Type.Object({ roomId: Type.String(), userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    tbValidator('param', Type.Object({ groupId: Type.String() })),
    tbValidator('query', Type.Object({ start: Type.Optional(Type.String()) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    tbValidator('param', Type.Object({ roomId: Type.String() })),
    tbValidator('query', Type.Object({ start: Type.Optional(Type.String()) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/group/:groupId/leave',
    tbValidator('param', Type.Object({ groupId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/room/:roomId/leave',
    tbValidator('param', Type.Object({ roomId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/summary',
    tbValidator('param', Type.Object({ groupId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    tbValidator('param', Type.Object({ groupId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    tbValidator('param', Type.Object({ roomId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu', tbValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/validate', tbValidator('json', RichMenuRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    tbValidator('param', Type.Object({ richMenuId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    tbValidator('param', Type.Object({ richMenuId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    tbValidator('param', Type.Object({ richMenuId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    tbValidator('param', Type.Object({ richMenuId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/list', (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    tbValidator('param', Type.Object({ richMenuId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .delete('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .post('/v2/bot/richmenu/alias', tbValidator('json', CreateRichMenuAliasRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    tbValidator('param', Type.Object({ richMenuAliasId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    tbValidator('param', Type.Object({ richMenuAliasId: Type.String() })),
    tbValidator('json', UpdateRichMenuAliasRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    tbValidator('param', Type.Object({ richMenuAliasId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/alias/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/user/:userId/richmenu',
    tbValidator('param', Type.Object({ userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/user/:userId/richmenu',
    tbValidator('param', Type.Object({ userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    tbValidator('param', Type.Object({ userId: Type.String(), richMenuId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu/bulk/link', tbValidator('json', RichMenuBulkLinkRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/richmenu/bulk/unlink',
    tbValidator('json', RichMenuBulkUnlinkRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/richmenu/batch', tbValidator('json', RichMenuBatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/richmenu/validate/batch',
    tbValidator('json', RichMenuBatchRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/progress/batch',
    tbValidator('query', Type.Object({ requestId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    tbValidator('param', Type.Object({ userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/markAsRead',
    tbValidator('json', MarkMessagesAsReadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/pnp/templated/push',
    tbValidator(
      'header',
      Type.Object({
        'x-line-delivery-tag': Type.Optional(Type.String({ minLength: 16, maxLength: 100 })),
      }),
    ),
    tbValidator('json', PnpTemplatedMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    tbValidator('query', Type.Object({ date: Type.String({ pattern: '^[0-9]{8}$' }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    tbValidator('query', Type.Object({ date: Type.String({ pattern: '^[0-9]{8}$' }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    tbValidator('param', Type.Object({ userId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/membership/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    tbValidator(
      'param',
      Type.Object({
        membershipId: Codec(
          Type.Refine(
            Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
            (value) => Number.isSafeInteger(Number(value)),
            () => 'must be a safe integer',
          ),
        )
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        start: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '300' }),
                  (value) => Number.isSafeInteger(Number(value)),
                  () => 'must be a safe integer',
                ),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon',
    tbValidator(
      'query',
      Type.Object({
        status: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal('DRAFT'), Type.Literal('RUNNING'), Type.Literal('CLOSED')]),
            { uniqueItems: true },
          ),
        ),
        start: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number.isSafeInteger(Number(value)),
                  () => 'must be a safe integer',
                ),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/v2/bot/coupon', tbValidator('json', CouponCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/coupon/:couponId',
    tbValidator('param', Type.Object({ couponId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/coupon/:couponId/close',
    tbValidator('param', Type.Object({ couponId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/loading/start',
    tbValidator('json', ShowLoadingAnimationRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/markAsRead',
    tbValidator('json', MarkMessagesAsReadByTokenRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
