import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
    sValidator('json', Schema.toStandardSchemaV1(SetWebhookEndpointRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/channel/webhook/test',
    sValidator('json', Schema.toStandardSchemaV1(TestWebhookEndpointRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ messageId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ messageId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ messageId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/reply',
    sValidator('json', Schema.toStandardSchemaV1(ReplyMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/push',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'x-line-retry-key': Schema.optionalKey(Schema.String.check(Schema.isUUID())),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PushMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/multicast',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'x-line-retry-key': Schema.optionalKey(Schema.String.check(Schema.isUUID())),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(MulticastRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/narrowcast',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'x-line-retry-key': Schema.optionalKey(Schema.String.check(Schema.isUUID())),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(NarrowcastRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ requestId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/broadcast',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'x-line-retry-key': Schema.optionalKey(Schema.String.check(Schema.isUUID())),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BroadcastRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/quota', (c) => { throw new Error('Not implemented') })
  .get('/v2/bot/message/quota/consumption', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/delivery/reply',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/push',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/multicast',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/reply',
    sValidator('json', Schema.toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/push',
    sValidator('json', Schema.toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/multicast',
    sValidator('json', Schema.toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/narrowcast',
    sValidator('json', Schema.toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/broadcast',
    sValidator('json', Schema.toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/message/aggregation/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/message/aggregation/list',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(Schema.String),
          start: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/profile/:userId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/followers/ids',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt32(), Schema.isLessThanOrEqualTo(1000))
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(300))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/info', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String, userId: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String, userId: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(Schema.Struct({ start: Schema.optionalKey(Schema.String) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(Schema.Struct({ start: Schema.optionalKey(Schema.String) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/group/:groupId/leave',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/room/:roomId/leave',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/summary',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu',
    sValidator('json', Schema.toStandardSchemaV1(RichMenuRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/validate',
    sValidator('json', Schema.toStandardSchemaV1(RichMenuRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/list', (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .delete('/v2/bot/user/all/richmenu', (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/richmenu/alias',
    sValidator('json', Schema.toStandardSchemaV1(CreateRichMenuAliasRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ richMenuAliasId: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ richMenuAliasId: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateRichMenuAliasRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ richMenuAliasId: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/richmenu/alias/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/user/:userId/richmenu',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ userId: Schema.String, richMenuId: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/bulk/link',
    sValidator('json', Schema.toStandardSchemaV1(RichMenuBulkLinkRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/bulk/unlink',
    sValidator('json', Schema.toStandardSchemaV1(RichMenuBulkUnlinkRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/batch',
    sValidator('json', Schema.toStandardSchemaV1(RichMenuBatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/validate/batch',
    sValidator('json', Schema.toStandardSchemaV1(RichMenuBatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/progress/batch',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ requestId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/markAsRead',
    sValidator('json', Schema.toStandardSchemaV1(MarkMessagesAsReadRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/pnp/templated/push',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'x-line-delivery-tag': Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 16, {
                expected: 'a string of at least 16 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PnpTemplatedMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ date: Schema.String.check(Schema.isPattern(/^[0-9]{8}$/)) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ date: Schema.String.check(Schema.isPattern(/^[0-9]{8}$/)) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/v2/bot/membership/list', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          membershipId: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt32(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(300))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          status: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(Schema.Literals(['DRAFT', 'RUNNING', 'CLOSED'])).check(
                  Schema.isUnique(),
                ),
              ),
            ),
          ),
          start: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt32(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/coupon',
    sValidator('json', Schema.toStandardSchemaV1(CouponCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon/:couponId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ couponId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/coupon/:couponId/close',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ couponId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/loading/start',
    sValidator('json', Schema.toStandardSchemaV1(ShowLoadingAnimationRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/markAsRead',
    sValidator('json', Schema.toStandardSchemaV1(MarkMessagesAsReadByTokenRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
