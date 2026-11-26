import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  GetWebhookEndpointResponseSchema,
  SetWebhookEndpointRequestSchema,
  TestWebhookEndpointRequestSchema,
  TestWebhookEndpointResponseSchema,
  GetMessageContentTranscodingResponseSchema,
  ReplyMessageRequestSchema,
  ReplyMessageResponseSchema,
  PushMessageRequestSchema,
  PushMessageResponseSchema,
  MulticastRequestSchema,
  MulticastResponseSchema,
  NarrowcastRequestSchema,
  NarrowcastResponseSchema,
  NarrowcastProgressResponseSchema,
  BroadcastRequestSchema,
  BroadcastResponseSchema,
  MessageQuotaResponseSchema,
  QuotaConsumptionResponseSchema,
  NumberOfMessagesResponseSchema,
  ValidateMessageRequestSchema,
  GetAggregationUnitUsageResponseSchema,
  GetAggregationUnitNameListResponseSchema,
  UserProfileResponseSchema,
  GetFollowersResponseSchema,
  BotInfoResponseSchema,
  GroupUserProfileResponseSchema,
  RoomUserProfileResponseSchema,
  MembersIdsResponseSchema,
  GroupSummaryResponseSchema,
  GroupMemberCountResponseSchema,
  RoomMemberCountResponseSchema,
  RichMenuRequestSchema,
  RichMenuIdResponseSchema,
  RichMenuResponseSchema,
  RichMenuListResponseSchema,
  CreateRichMenuAliasRequestSchema,
  RichMenuAliasResponseSchema,
  UpdateRichMenuAliasRequestSchema,
  RichMenuAliasListResponseSchema,
  RichMenuBulkLinkRequestSchema,
  RichMenuBulkUnlinkRequestSchema,
  RichMenuBatchRequestSchema,
  RichMenuBatchProgressResponseSchema,
  IssueLinkTokenResponseSchema,
  MarkMessagesAsReadRequestSchema,
  PnpTemplatedMessageRequestSchema,
  GetMembershipSubscriptionResponseSchema,
  MembershipListResponseSchema,
  GetJoinedMembershipUsersResponseSchema,
  CouponCreateRequestSchema,
  CouponCreateResponseSchema,
  CouponResponseSchema,
  MessagingApiPagerCouponListResponseSchema,
  ShowLoadingAnimationRequestSchema,
  ShowLoadingAnimationResponseSchema,
  MarkMessagesAsReadByTokenRequestSchema,
  ErrorResponseSchema,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const v2Handler = new Hono()
  .get(
    '/v2/bot/channel/webhook/endpoint',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information',
      },
      tags: ['messaging-api'],
      operationId: 'getWebhookEndpoint',
      description: 'Get webhook endpoint information',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetWebhookEndpointResponseSchema)),
              examples: {
                ACTIVE: {
                  summary: 'If the webhook URL was set and the webhook usage is enabled',
                  value: { endpoint: 'https://example.com/test', active: true },
                },
                INACTIVE: {
                  summary: 'If the webhook URL was set and the webhook usage is disabled',
                  value: { endpoint: 'https://example.com/test', active: false },
                },
              },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/channel/webhook/endpoint',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url',
      },
      tags: ['messaging-api'],
      operationId: 'setWebhookEndpoint',
      description: 'Set webhook endpoint URL',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(SetWebhookEndpointRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/channel/webhook/test',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint',
      },
      tags: ['messaging-api'],
      operationId: 'testWebhookEndpoint',
      description: 'Test webhook endpoint',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(TestWebhookEndpointResponseSchema)),
              example: {
                success: true,
                timestamp: '2020-09-30T05:38:20.031Z',
                statusCode: 200,
                reason: 'OK',
                detail: '200',
              },
            },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(TestWebhookEndpointRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-content' },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['messaging-api-blob'],
      operationId: 'getMessageContent',
      description: 'Download image, video, and audio data sent from users.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            '*/*': {
              schema: resolver(toStandardSchemaV1(Type.String({ description: 'blob response' }))),
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ messageId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-image-or-video-preview',
      },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['messaging-api-blob'],
      operationId: 'getMessageContentPreview',
      description: 'Get a preview image of the image or video',
      responses: {
        '200': {
          description: 'OK',
          content: {
            '*/*': {
              schema: resolver(toStandardSchemaV1(Type.String({ description: 'blob response' }))),
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ messageId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status',
      },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['messaging-api-blob'],
      operationId: 'getMessageContentTranscodingByMessageId',
      description: 'Verify the preparation status of a video or audio for getting',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetMessageContentTranscodingResponseSchema)),
              example: { status: 'processing' },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ messageId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/reply',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#send-reply-message',
      },
      tags: ['messaging-api'],
      operationId: 'replyMessage',
      description: 'Send reply message',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ReplyMessageResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'Too Many Requests',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(ReplyMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/push',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
      },
      tags: ['messaging-api'],
      operationId: 'pushMessage',
      description: 'Sends a message to a user, group chat, or multi-person chat at any time.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(PushMessageResponseSchema)) },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'Forbidden',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: 'Conflict',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'Too Many Requests',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
      ),
    ),
    validator('json', toStandardSchemaV1(PushMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/multicast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#send-multicast-message',
      },
      tags: ['messaging-api'],
      operationId: 'multicast',
      description:
        "An API that efficiently sends the same message to multiple user IDs. You can't send messages to group chats or multi-person chats.",
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(MulticastResponseSchema)) },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'Forbidden',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: 'Conflict',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'Too Many Requests',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
      ),
    ),
    validator('json', toStandardSchemaV1(MulticastRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/narrowcast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#send-narrowcast-message',
      },
      tags: ['messaging-api'],
      operationId: 'narrowcast',
      description: 'Send narrowcast message',
      responses: {
        '202': {
          description: 'Accepted',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(NarrowcastResponseSchema)) },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'Forbidden',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: 'Conflict',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'Too Many Requests',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
      ),
    ),
    validator('json', toStandardSchemaV1(NarrowcastRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status',
      },
      tags: ['messaging-api'],
      operationId: 'getNarrowcastProgress',
      description: 'Gets the status of a narrowcast message.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NarrowcastProgressResponseSchema)),
              example: { phase: 'waiting', acceptedTime: '2020-12-03T10:15:30.121Z' },
            },
          },
        },
      },
    }),
    validator('query', toStandardSchemaV1(Type.Object({ requestId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/broadcast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message',
      },
      tags: ['messaging-api'],
      operationId: 'broadcast',
      description: 'Sends a message to multiple users at any time.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(BroadcastResponseSchema)) },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'Forbidden',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: 'Conflict',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'Too Many Requests',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({ 'x-line-retry-key': Type.Optional(Type.String({ format: 'uuid' })) }),
      ),
    ),
    validator('json', toStandardSchemaV1(BroadcastRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/quota',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-quota' },
      tags: ['messaging-api'],
      operationId: 'getMessageQuota',
      description:
        'Gets the target limit for sending messages in the current month. The total number of the free messages and the additional messages is returned.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(MessageQuotaResponseSchema)),
              example: { type: 'limited', value: 1000 },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/quota/consumption',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-consumption',
      },
      tags: ['messaging-api'],
      operationId: 'getMessageQuotaConsumption',
      description: 'Gets the number of messages sent in the current month.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(QuotaConsumptionResponseSchema)),
              example: { totalUsage: 500 },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/reply',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-reply-messages',
      },
      tags: ['messaging-api'],
      operationId: 'getNumberOfSentReplyMessages',
      description: 'Get number of sent reply messages',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NumberOfMessagesResponseSchema)),
              example: { status: 'ready', success: 10000 },
            },
          },
        },
      },
    }),
    validator('query', toStandardSchemaV1(Type.Object({ date: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/push',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-push-messages',
      },
      tags: ['messaging-api'],
      operationId: 'getNumberOfSentPushMessages',
      description: 'Get number of sent push messages',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NumberOfMessagesResponseSchema)),
              example: { status: 'ready', success: 10000 },
            },
          },
        },
      },
    }),
    validator('query', toStandardSchemaV1(Type.Object({ date: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/multicast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-multicast-messages',
      },
      tags: ['messaging-api'],
      operationId: 'getNumberOfSentMulticastMessages',
      description: 'Get number of sent multicast messages',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NumberOfMessagesResponseSchema)),
              example: { status: 'ready', success: 10000 },
            },
          },
        },
      },
    }),
    validator('query', toStandardSchemaV1(Type.Object({ date: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-broadcast-messages',
      },
      tags: ['messaging-api'],
      operationId: 'getNumberOfSentBroadcastMessages',
      description: 'Get number of sent broadcast messages',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NumberOfMessagesResponseSchema)),
              example: { status: 'ready', success: 10000 },
            },
          },
        },
      },
    }),
    validator('query', toStandardSchemaV1(Type.Object({ date: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/reply',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-reply-message',
      },
      tags: ['messaging-api'],
      operationId: 'validateReply',
      description: 'Validate message objects of a reply message',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/push',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-push-message',
      },
      tags: ['messaging-api'],
      operationId: 'validatePush',
      description: 'Validate message objects of a push message',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/multicast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-multicast-message',
      },
      tags: ['messaging-api'],
      operationId: 'validateMulticast',
      description: 'Validate message objects of a multicast message',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/narrowcast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-narrowcast-message',
      },
      tags: ['messaging-api'],
      operationId: 'validateNarrowcast',
      description: 'Validate message objects of a narrowcast message',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/validate/broadcast',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-broadcast-message',
      },
      tags: ['messaging-api'],
      operationId: 'validateBroadcast',
      description: 'Validate message objects of a broadcast message',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(ValidateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/aggregation/info',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month',
      },
      tags: ['messaging-api'],
      operationId: 'getAggregationUnitUsage',
      description: 'Get number of units used this month',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetAggregationUnitUsageResponseSchema)),
              example: { numOfCustomAggregationUnits: 22 },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/aggregation/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month',
      },
      tags: ['messaging-api'],
      operationId: 'getAggregationUnitNameList',
      description: 'Get name list of units used this month',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetAggregationUnitNameListResponseSchema)),
              example: {
                customAggregationUnits: ['promotion_a', 'promotion_b'],
                next: 'jxEWCEEP...',
              },
            },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({ limit: Type.Optional(Type.String()), start: Type.Optional(Type.String()) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/profile/:userId',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-profile' },
      tags: ['messaging-api'],
      operationId: 'getProfile',
      description: 'Get profile',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(UserProfileResponseSchema)),
              example: {
                displayName: 'LINE taro',
                userId: 'U4af4980629...',
                language: 'en',
                pictureUrl: 'https://obs.line-apps.com/...',
                statusMessage: 'Hello, LINE!',
              },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ userId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/followers/ids',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-follower-ids',
      },
      tags: ['messaging-api'],
      operationId: 'getFollowers',
      description: 'Get a list of users who added your LINE Official Account as a friend',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetFollowersResponseSchema)),
              example: {
                userIds: ['U4af4980629...', 'U0c229f96c4...', 'U95afb1d4df...'],
                next: 'yANU9IA...',
              },
            },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/info',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-bot-info' },
      tags: ['messaging-api'],
      operationId: 'getBotInfo',
      description: 'Get bot info',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(BotInfoResponseSchema)),
              example: {
                userId: 'Ub9952f8...',
                basicId: '@216ru...',
                displayName: 'Example name',
                pictureUrl: 'https://obs.line-apps.com/...',
                chatMode: 'chat',
                markAsReadMode: 'manual',
              },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile',
      },
      tags: ['messaging-api'],
      operationId: 'getGroupMemberProfile',
      description: 'Get group chat member profile',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GroupUserProfileResponseSchema)),
              example: {
                displayName: 'LINE taro',
                userId: 'U4af4980629...',
                pictureUrl: 'https://obs.line-apps.com/...',
              },
            },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ groupId: Type.String(), userId: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile',
      },
      tags: ['messaging-api'],
      operationId: 'getRoomMemberProfile',
      description: 'Get multi-person chat member profile',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RoomUserProfileResponseSchema)),
              example: {
                displayName: 'LINE taro',
                userId: 'U4af4980629...',
                pictureUrl: 'https://obs.line-apps.com/...',
              },
            },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ roomId: Type.String(), userId: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-member-user-ids',
      },
      tags: ['messaging-api'],
      operationId: 'getGroupMembersIds',
      description: 'Get group chat member user IDs',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(MembersIdsResponseSchema)),
              example: {
                memberIds: ['U4af4980629...', 'U0c229f96c4...', 'U95afb1d4df...'],
                next: 'jxEWCEEP...',
              },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ groupId: Type.String() }))),
    validator('query', toStandardSchemaV1(Type.Object({ start: Type.Optional(Type.String()) }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-room-member-user-ids',
      },
      tags: ['messaging-api'],
      operationId: 'getRoomMembersIds',
      description: 'Get multi-person chat member user IDs',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(MembersIdsResponseSchema)),
              example: {
                memberIds: ['U4af4980629...', 'U0c229f96c4...', 'U95afb1d4df...'],
                next: 'jxEWCEEP...',
              },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ roomId: Type.String() }))),
    validator('query', toStandardSchemaV1(Type.Object({ start: Type.Optional(Type.String()) }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/group/:groupId/leave',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#leave-group' },
      tags: ['messaging-api'],
      operationId: 'leaveGroup',
      description: 'Leave group chat',
      responses: {
        '200': { description: 'OK' },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ groupId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/room/:roomId/leave',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#leave-room' },
      tags: ['messaging-api'],
      operationId: 'leaveRoom',
      description: 'Leave multi-person chat',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ roomId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/summary',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-group-summary',
      },
      tags: ['messaging-api'],
      operationId: 'getGroupSummary',
      description: 'Get group chat summary',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GroupSummaryResponseSchema)),
              example: {
                groupId: 'Ca56f94637c...',
                groupName: 'Group name',
                pictureUrl: 'https://profile.line-scdn.net/abcdefghijklmn',
              },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ groupId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-group-count',
      },
      tags: ['messaging-api'],
      operationId: 'getGroupMemberCount',
      description: 'Get number of users in a group chat',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GroupMemberCountResponseSchema)),
              example: { count: 3 },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ groupId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-members-room-count',
      },
      tags: ['messaging-api'],
      operationId: 'getRoomMemberCount',
      description: 'Get number of users in a multi-person chat',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RoomMemberCountResponseSchema)),
              example: { count: 3 },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ roomId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu',
      },
      tags: ['messaging-api'],
      operationId: 'createRichMenu',
      description: 'Create rich menu',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuIdResponseSchema)),
              example: { richMenuId: '{richMenuId}' },
            },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(RichMenuRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/validate',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-rich-menu-object',
      },
      tags: ['messaging-api'],
      operationId: 'validateRichMenuObject',
      description: 'Validate rich menu object',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(RichMenuRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#download-rich-menu-image',
      },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['messaging-api-blob'],
      operationId: 'getRichMenuImage',
      description: 'Download rich menu image.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            '*/*': {
              schema: resolver(toStandardSchemaV1(Type.String({ description: 'blob response' }))),
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image',
      },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['messaging-api-blob'],
      operationId: 'setRichMenuImage',
      description: 'Upload rich menu image',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu',
      },
      tags: ['messaging-api'],
      operationId: 'getRichMenu',
      description: 'Gets a rich menu via a rich menu ID.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuResponseSchema)),
              example: {
                richMenuId: '{richMenuId}',
                size: { width: 2500, height: 1686 },
                name: 'nice rich menu',
                chatBarText: 'click',
                selected: false,
                areas: [
                  {
                    bounds: { x: 0, y: 0, width: 2500, height: 1686 },
                    action: { type: 'postback', data: 'action=buy&itemid=123' },
                  },
                ],
              },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu',
      },
      tags: ['messaging-api'],
      operationId: 'deleteRichMenu',
      description: 'Deletes a rich menu.',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list',
      },
      tags: ['messaging-api'],
      operationId: 'getRichMenuList',
      description: 'Get rich menu list',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuListResponseSchema)),
              example: {
                richmenus: [
                  {
                    richMenuId: '{richMenuId}',
                    size: { width: 2500, height: 1686 },
                    selected: false,
                    name: 'nice rich menu',
                    chatBarText: 'click',
                    areas: [
                      {
                        bounds: { x: 0, y: 0, width: 2500, height: 1686 },
                        action: { type: 'postback', data: 'action=buy&itemid=123' },
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#set-default-rich-menu',
      },
      tags: ['messaging-api'],
      operationId: 'setDefaultRichMenu',
      description: 'Set default rich menu',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/user/all/richmenu',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-default-rich-menu-id',
      },
      tags: ['messaging-api'],
      operationId: 'getDefaultRichMenuId',
      description: 'Gets the ID of the default rich menu set with the Messaging API.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuIdResponseSchema)),
              example: { richMenuId: '{richMenuId}' },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/user/all/richmenu',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#cancel-default-rich-menu',
      },
      tags: ['messaging-api'],
      operationId: 'cancelDefaultRichMenu',
      description: 'Cancel default rich menu',
      responses: { '200': { description: 'OK' } },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias',
      },
      tags: ['messaging-api'],
      operationId: 'createRichMenuAlias',
      description: 'Create rich menu alias',
      responses: {
        '200': { description: 'OK' },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateRichMenuAliasRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-by-id',
      },
      tags: ['messaging-api'],
      operationId: 'getRichMenuAlias',
      description: 'Get rich menu alias information',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuAliasResponseSchema)),
              example: {
                richMenuAliasId: 'richmenu-alias-a',
                richMenuId: 'richmenu-88c05ef6921ae53f8b58a25f3a65faf7',
              },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuAliasId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias',
      },
      tags: ['messaging-api'],
      operationId: 'updateRichMenuAlias',
      description: 'Update rich menu alias',
      responses: {
        '200': { description: 'OK' },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuAliasId: Type.String() }))),
    validator('json', toStandardSchemaV1(UpdateRichMenuAliasRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu-alias',
      },
      tags: ['messaging-api'],
      operationId: 'deleteRichMenuAlias',
      description: 'Delete rich menu alias',
      responses: {
        '200': { description: 'OK' },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ richMenuAliasId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/alias/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list',
      },
      tags: ['messaging-api'],
      operationId: 'getRichMenuAliasList',
      description: 'Get list of rich menu alias',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuAliasListResponseSchema)),
              examples: {
                TWO_ALIASES: {
                  summary: 'If you have 2 rich menu aliases',
                  value: {
                    aliases: [
                      {
                        richMenuAliasId: 'richmenu-alias-a',
                        richMenuId: 'richmenu-862e6ad6c267d2ddf3f42bc78554f6a4',
                      },
                      {
                        richMenuAliasId: 'richmenu-alias-b',
                        richMenuId: 'richmenu-88c05ef6921ae53f8b58a25f3a65faf7',
                      },
                    ],
                  },
                },
                NO_ALIASES: { summary: 'If you have 0 rich menu alias', value: { aliases: [] } },
              },
            },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/user/:userId/richmenu',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-id-of-user',
      },
      tags: ['messaging-api'],
      operationId: 'getRichMenuIdOfUser',
      description: 'Get rich menu ID of user',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuIdResponseSchema)),
              example: { richMenuId: '{richMenuId}' },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ userId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/user/:userId/richmenu',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-user',
      },
      tags: ['messaging-api'],
      operationId: 'unlinkRichMenuIdFromUser',
      description: 'Unlink rich menu from user',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ userId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-user',
      },
      tags: ['messaging-api'],
      operationId: 'linkRichMenuIdToUser',
      description: 'Link rich menu to user.',
      responses: { '200': { description: 'OK' } },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ userId: Type.String(), richMenuId: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/bulk/link',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-users',
      },
      tags: ['messaging-api'],
      operationId: 'linkRichMenuIdToUsers',
      description: 'Link rich menu to multiple users',
      responses: { '202': { description: 'Accepted' } },
    }),
    validator('json', toStandardSchemaV1(RichMenuBulkLinkRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/bulk/unlink',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-users',
      },
      tags: ['messaging-api'],
      operationId: 'unlinkRichMenuIdFromUsers',
      description: 'Unlink rich menus from multiple users',
      responses: { '202': { description: 'Accepted' } },
    }),
    validator('json', toStandardSchemaV1(RichMenuBulkUnlinkRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/batch',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users',
      },
      tags: ['messaging-api'],
      operationId: 'richMenuBatch',
      description:
        'You can use this endpoint to batch control the rich menu linked to the users using the endpoint such as Link rich menu to user.\nThe following operations are available:\n\n1. Replace a rich menu with another rich menu for all users linked to a specific rich menu\n2. Unlink a rich menu for all users linked to a specific rich menu\n3. Unlink a rich menu for all users linked the rich menu\n',
      responses: { '202': { description: 'Accepted' } },
    }),
    validator('json', toStandardSchemaV1(RichMenuBatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/richmenu/validate/batch',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#validate-batch-control-rich-menus-request',
      },
      tags: ['messaging-api'],
      operationId: 'validateRichMenuBatchRequest',
      description:
        'Validate a request body of the Replace or unlink the linked rich menus in batches endpoint.',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(RichMenuBatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/richmenu/progress/batch',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status',
      },
      tags: ['messaging-api'],
      operationId: 'getRichMenuBatchProgress',
      description: 'Get the status of Replace or unlink a linked rich menus in batches.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(RichMenuBatchProgressResponseSchema)),
              example: { phase: 'ongoing', acceptedTime: '2023-07-04T10:15:30.121Z' },
            },
          },
        },
      },
    }),
    validator('query', toStandardSchemaV1(Type.Object({ requestId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#issue-link-token',
      },
      tags: ['messaging-api'],
      operationId: 'issueLinkToken',
      description: 'Issue link token',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(IssueLinkTokenResponseSchema)),
              example: { linkToken: 'NMZTNuVrPTqlr2IF8Bnymkb7rXfYv5EY' },
            },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ userId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/markAsRead',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read',
      },
      tags: ['messaging-api'],
      operationId: 'markMessagesAsRead',
      description: 'Mark messages from users as read',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', toStandardSchemaV1(MarkMessagesAsReadRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/message/pnp/templated/push',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/line-notification-messages/#send-line-notification-message-template',
      },
      tags: ['messaging-api'],
      operationId: 'pushTemplatedMessagesByPhone',
      description: 'Send LINE notification message (template)',
      responses: {
        '202': { description: 'Accepted' },
        '422': {
          description:
            "Failed to send the LINE notification message. For example, there is no LINE user associated with the specified phone number, the phone number is outside the LINE notification message service area, the user has refused to receive LINE notification messages, or the user hasn't agreed to LINE's Privacy Policy.\n",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'x-line-delivery-tag': Type.Optional(Type.String({ minLength: 16, maxLength: 100 })),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(PnpTemplatedMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/partner-docs/#get-number-of-sent-line-notification-messages',
      },
      tags: ['messaging-api'],
      operationId: 'getPNPMessageStatistics',
      description: 'Get number of sent LINE notification messages',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NumberOfMessagesResponseSchema)),
              example: { status: 'ready', success: 3 },
            },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(Type.Object({ date: Type.String({ pattern: '^[0-9]{8}$' }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/line-notification-messages/#get-number-of-sent-line-notification-messages-template',
      },
      tags: ['messaging-api'],
      operationId: 'getPNPTemplatedMessageStatistics',
      description: 'Get number of sent LINE notification messages (template)',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(NumberOfMessagesResponseSchema)),
              example: { status: 'ready', success: 3 },
            },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(Type.Object({ date: Type.String({ pattern: '^[0-9]{8}$' }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-a-users-membership-subscription-status',
      },
      tags: ['messaging-api'],
      operationId: 'getMembershipSubscription',
      description: "Get a user's membership subscription.",
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetMembershipSubscriptionResponseSchema)),
              example: {
                subscriptions: [
                  {
                    membership: {
                      membershipId: 3189,
                      title: 'Basic Plan',
                      description: 'You will receive messages and photos every Saturday.',
                      benefits: ['Members Only Messages', 'Members Only Photos'],
                      price: 500,
                      currency: 'JPY',
                    },
                    user: {
                      membershipNo: 1,
                      joinedTime: 1707214784,
                      nextBillingDate: '2024-02-08',
                      totalSubscriptionMonths: 1,
                    },
                  },
                ],
              },
            },
          },
        },
        '400': {
          description: 'An invalid user ID is specified.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'Unable to get information about the membership to which the user subscribes.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ userId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-plans',
      },
      tags: ['messaging-api'],
      operationId: 'getMembershipList',
      description: 'Get a list of memberships.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(MembershipListResponseSchema)),
              example: {
                memberships: [
                  {
                    membershipId: 3189,
                    title: 'Basic Plan',
                    description: 'You will receive messages and photos every Saturday.',
                    benefits: ['Members Only Messages', 'Members Only Photos'],
                    price: 500,
                    currency: 'JPY',
                    memberCount: 1,
                    memberLimit: null,
                    isInAppPurchase: true,
                    isPublished: true,
                  },
                  {
                    membershipId: 3213,
                    title: 'Premium Plan',
                    description: 'Invitation to a special party.',
                    benefits: ['Members Only Party'],
                    price: 1500,
                    currency: 'JPY',
                    memberCount: 0,
                    memberLimit: null,
                    isInAppPurchase: false,
                    isPublished: true,
                  },
                ],
              },
            },
          },
        },
        '404': {
          description: 'Unable to get information about the memberships.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-membership-user-ids',
      },
      tags: ['messaging-api'],
      operationId: 'getJoinedMembershipUsers',
      description: 'Get a list of user IDs who joined the membership.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetJoinedMembershipUsersResponseSchema)),
              example: {
                userIds: ['U4af4980629...', 'U0c229f96c4...', 'U95afb1d4df...'],
                next: 'jxEWCEEP...',
              },
            },
          },
        },
        '400': {
          description: '`start` is incorrect or expired, or `limit` is under 1 or over 1000.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'Membership ID is not owned by the bot or does not exist.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
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
    ),
    validator(
      'query',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-coupons-list',
      },
      tags: ['messaging-api'],
      operationId: 'listCoupon',
      description: 'Get a paginated list of coupons.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(MessagingApiPagerCouponListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/coupon',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-coupon',
      },
      tags: ['messaging-api'],
      operationId: 'createCoupon',
      description:
        'Create a new coupon. Define coupon details such as type, title, and validity period.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(CouponCreateResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CouponCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/coupon/:couponId',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#get-coupon' },
      tags: ['messaging-api'],
      operationId: 'getCouponDetail',
      description: 'Get coupon detail',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(CouponResponseSchema)) },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ couponId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/coupon/:couponId/close',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#discontinue-coupon',
      },
      tags: ['messaging-api'],
      operationId: 'closeCoupon',
      description: 'Close coupon',
      responses: {
        '200': { description: 'OK' },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'Not Found',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '410': {
          description: 'Gone',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ couponId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/loading/start',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator',
      },
      tags: ['messaging-api'],
      operationId: 'showLoadingAnimation',
      description:
        'Display a loading animation in one-on-one chats between users and LINE Official Accounts.',
      responses: {
        '202': {
          description: 'Accepted',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ShowLoadingAnimationResponseSchema)),
            },
          },
        },
        '400': {
          description: 'An invalid chat ID is specified, or the loadingSeconds value is invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(ShowLoadingAnimationRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/markAsRead',
    describeRoute({
      externalDocs: { url: 'https://developers.line.biz/en/reference/messaging-api/#mark-as-read' },
      tags: ['messaging-api'],
      operationId: 'markMessagesAsReadByToken',
      description: 'Mark messages from users as read by token',
      responses: {
        '200': { description: 'OK' },
        '400': {
          description:
            'An invalid markAsReadToken is specified. Tokens must be used by the bot that received them via Webhook.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(MarkMessagesAsReadByTokenRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
