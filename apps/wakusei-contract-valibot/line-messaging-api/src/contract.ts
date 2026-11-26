import { oc } from '@orpc/contract'
import * as v from 'valibot'
import {
  BotInfoResponseSchema,
  BroadcastRequestSchema,
  BroadcastResponseSchema,
  CouponCreateRequestSchema,
  CouponCreateResponseSchema,
  CouponResponseSchema,
  CreateRichMenuAliasRequestSchema,
  GetAggregationUnitNameListResponseSchema,
  GetAggregationUnitUsageResponseSchema,
  GetFollowersResponseSchema,
  GetJoinedMembershipUsersResponseSchema,
  GetMembershipSubscriptionResponseSchema,
  GetMessageContentTranscodingResponseSchema,
  GetWebhookEndpointResponseSchema,
  GroupMemberCountResponseSchema,
  GroupSummaryResponseSchema,
  GroupUserProfileResponseSchema,
  IssueLinkTokenResponseSchema,
  MarkMessagesAsReadByTokenRequestSchema,
  MarkMessagesAsReadRequestSchema,
  MembersIdsResponseSchema,
  MembershipListResponseSchema,
  MessageQuotaResponseSchema,
  MessagingApiPagerCouponListResponseSchema,
  MulticastRequestSchema,
  MulticastResponseSchema,
  NarrowcastProgressResponseSchema,
  NarrowcastRequestSchema,
  NarrowcastResponseSchema,
  NumberOfMessagesResponseSchema,
  PnpMessagesRequestSchema,
  PnpTemplatedMessageRequestSchema,
  PushMessageRequestSchema,
  PushMessageResponseSchema,
  QuotaConsumptionResponseSchema,
  ReplyMessageRequestSchema,
  ReplyMessageResponseSchema,
  RichMenuAliasListResponseSchema,
  RichMenuAliasResponseSchema,
  RichMenuBatchProgressResponseSchema,
  RichMenuBatchRequestSchema,
  RichMenuBulkLinkRequestSchema,
  RichMenuBulkUnlinkRequestSchema,
  RichMenuIdResponseSchema,
  RichMenuListResponseSchema,
  RichMenuRequestSchema,
  RichMenuResponseSchema,
  RoomMemberCountResponseSchema,
  RoomUserProfileResponseSchema,
  SetWebhookEndpointRequestSchema,
  ShowLoadingAnimationRequestSchema,
  ShowLoadingAnimationResponseSchema,
  TestWebhookEndpointRequestSchema,
  TestWebhookEndpointResponseSchema,
  UserProfileResponseSchema,
  ValidateMessageRequestSchema,
} from './components'

export const contract = {
  getV2BotChannelWebhookEndpoint: oc
    .route({
      method: 'GET',
      path: '/v2/bot/channel/webhook/endpoint',
      tags: ['messaging-api'],
      description: 'Get webhook endpoint information',
    })
    .output(GetWebhookEndpointResponseSchema),
  putV2BotChannelWebhookEndpoint: oc
    .route({
      method: 'PUT',
      path: '/v2/bot/channel/webhook/endpoint',
      tags: ['messaging-api'],
      description: 'Set webhook endpoint URL',
    })
    .input(SetWebhookEndpointRequestSchema),
  postV2BotChannelWebhookTest: oc
    .route({
      method: 'POST',
      path: '/v2/bot/channel/webhook/test',
      tags: ['messaging-api'],
      description: 'Test webhook endpoint',
    })
    .input(TestWebhookEndpointRequestSchema)
    .output(TestWebhookEndpointResponseSchema),
  getV2BotMessageMessageIdContent: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/{messageId}/content',
      tags: ['messaging-api-blob'],
      description: 'Download image, video, and audio data sent from users.',
    })
    .input(v.object({ messageId: v.string() })),
  getV2BotMessageMessageIdContentPreview: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/{messageId}/content/preview',
      tags: ['messaging-api-blob'],
      description: 'Get a preview image of the image or video',
    })
    .input(v.object({ messageId: v.string() })),
  getV2BotMessageMessageIdContentTranscoding: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/{messageId}/content/transcoding',
      tags: ['messaging-api-blob'],
      description: 'Verify the preparation status of a video or audio for getting',
    })
    .input(v.object({ messageId: v.string() }))
    .output(GetMessageContentTranscodingResponseSchema),
  postV2BotMessageReply: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/reply',
      tags: ['messaging-api'],
      description: 'Send reply message',
    })
    .input(ReplyMessageRequestSchema)
    .output(ReplyMessageResponseSchema),
  postV2BotMessagePush: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/push',
      tags: ['messaging-api'],
      description: 'Sends a message to a user, group chat, or multi-person chat at any time.',
    })
    .input(PushMessageRequestSchema)
    .output(PushMessageResponseSchema),
  postV2BotMessageMulticast: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/multicast',
      tags: ['messaging-api'],
      description:
        "An API that efficiently sends the same message to multiple user IDs. You can't send messages to group chats or multi-person chats.",
    })
    .input(MulticastRequestSchema)
    .output(MulticastResponseSchema),
  postV2BotMessageNarrowcast: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/narrowcast',
      tags: ['messaging-api'],
      description: 'Send narrowcast message',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(NarrowcastRequestSchema)
    .output(NarrowcastResponseSchema),
  getV2BotMessageProgressNarrowcast: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/progress/narrowcast',
      tags: ['messaging-api'],
      description: 'Gets the status of a narrowcast message.',
    })
    .input(v.object({ requestId: v.string() }))
    .output(NarrowcastProgressResponseSchema),
  postV2BotMessageBroadcast: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/broadcast',
      tags: ['messaging-api'],
      description: 'Sends a message to multiple users at any time.',
    })
    .input(BroadcastRequestSchema)
    .output(BroadcastResponseSchema),
  getV2BotMessageQuota: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/quota',
      tags: ['messaging-api'],
      description:
        'Gets the target limit for sending messages in the current month. The total number of the free messages and the additional messages is returned.',
    })
    .output(MessageQuotaResponseSchema),
  getV2BotMessageQuotaConsumption: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/quota/consumption',
      tags: ['messaging-api'],
      description: 'Gets the number of messages sent in the current month.',
    })
    .output(QuotaConsumptionResponseSchema),
  getV2BotMessageDeliveryReply: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/delivery/reply',
      tags: ['messaging-api'],
      description: 'Get number of sent reply messages',
    })
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema),
  getV2BotMessageDeliveryPush: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/delivery/push',
      tags: ['messaging-api'],
      description: 'Get number of sent push messages',
    })
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema),
  getV2BotMessageDeliveryMulticast: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/delivery/multicast',
      tags: ['messaging-api'],
      description: 'Get number of sent multicast messages',
    })
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema),
  getV2BotMessageDeliveryBroadcast: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/delivery/broadcast',
      tags: ['messaging-api'],
      description: 'Get number of sent broadcast messages',
    })
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema),
  postV2BotMessageValidateReply: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/validate/reply',
      tags: ['messaging-api'],
      description: 'Validate message objects of a reply message',
    })
    .input(ValidateMessageRequestSchema),
  postV2BotMessageValidatePush: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/validate/push',
      tags: ['messaging-api'],
      description: 'Validate message objects of a push message',
    })
    .input(ValidateMessageRequestSchema),
  postV2BotMessageValidateMulticast: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/validate/multicast',
      tags: ['messaging-api'],
      description: 'Validate message objects of a multicast message',
    })
    .input(ValidateMessageRequestSchema),
  postV2BotMessageValidateNarrowcast: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/validate/narrowcast',
      tags: ['messaging-api'],
      description: 'Validate message objects of a narrowcast message',
    })
    .input(ValidateMessageRequestSchema),
  postV2BotMessageValidateBroadcast: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/validate/broadcast',
      tags: ['messaging-api'],
      description: 'Validate message objects of a broadcast message',
    })
    .input(ValidateMessageRequestSchema),
  getV2BotMessageAggregationInfo: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/aggregation/info',
      tags: ['messaging-api'],
      description: 'Get number of units used this month',
    })
    .output(GetAggregationUnitUsageResponseSchema),
  getV2BotMessageAggregationList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/aggregation/list',
      tags: ['messaging-api'],
      description: 'Get name list of units used this month',
    })
    .input(v.object({ limit: v.optional(v.string()), start: v.optional(v.string()) }))
    .output(GetAggregationUnitNameListResponseSchema),
  getV2BotProfileUserId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/profile/{userId}',
      tags: ['messaging-api'],
      description: 'Get profile',
    })
    .input(v.object({ userId: v.string() }))
    .output(UserProfileResponseSchema),
  getV2BotFollowersIds: oc
    .route({
      method: 'GET',
      path: '/v2/bot/followers/ids',
      tags: ['messaging-api'],
      description: 'Get a list of users who added your LINE Official Account as a friend',
    })
    .input(
      v.object({
        start: v.optional(v.string()),
        limit: v.optional(
          v.pipe(
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
        ),
      }),
    )
    .output(GetFollowersResponseSchema),
  getV2BotInfo: oc
    .route({
      method: 'GET',
      path: '/v2/bot/info',
      tags: ['messaging-api'],
      description: 'Get bot info',
    })
    .output(BotInfoResponseSchema),
  getV2BotGroupGroupIdMemberUserId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/group/{groupId}/member/{userId}',
      tags: ['messaging-api'],
      description: 'Get group chat member profile',
    })
    .input(v.object({ groupId: v.string(), userId: v.string() }))
    .output(GroupUserProfileResponseSchema),
  getV2BotRoomRoomIdMemberUserId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/room/{roomId}/member/{userId}',
      tags: ['messaging-api'],
      description: 'Get multi-person chat member profile',
    })
    .input(v.object({ roomId: v.string(), userId: v.string() }))
    .output(RoomUserProfileResponseSchema),
  getV2BotGroupGroupIdMembersIds: oc
    .route({
      method: 'GET',
      path: '/v2/bot/group/{groupId}/members/ids',
      tags: ['messaging-api'],
      description: 'Get group chat member user IDs',
    })
    .input(v.object({ groupId: v.string(), start: v.optional(v.string()) }))
    .output(MembersIdsResponseSchema),
  getV2BotRoomRoomIdMembersIds: oc
    .route({
      method: 'GET',
      path: '/v2/bot/room/{roomId}/members/ids',
      tags: ['messaging-api'],
      description: 'Get multi-person chat member user IDs',
    })
    .input(v.object({ roomId: v.string(), start: v.optional(v.string()) }))
    .output(MembersIdsResponseSchema),
  postV2BotGroupGroupIdLeave: oc
    .route({
      method: 'POST',
      path: '/v2/bot/group/{groupId}/leave',
      tags: ['messaging-api'],
      description: 'Leave group chat',
    })
    .input(v.object({ groupId: v.string() })),
  postV2BotRoomRoomIdLeave: oc
    .route({
      method: 'POST',
      path: '/v2/bot/room/{roomId}/leave',
      tags: ['messaging-api'],
      description: 'Leave multi-person chat',
    })
    .input(v.object({ roomId: v.string() })),
  getV2BotGroupGroupIdSummary: oc
    .route({
      method: 'GET',
      path: '/v2/bot/group/{groupId}/summary',
      tags: ['messaging-api'],
      description: 'Get group chat summary',
    })
    .input(v.object({ groupId: v.string() }))
    .output(GroupSummaryResponseSchema),
  getV2BotGroupGroupIdMembersCount: oc
    .route({
      method: 'GET',
      path: '/v2/bot/group/{groupId}/members/count',
      tags: ['messaging-api'],
      description: 'Get number of users in a group chat',
    })
    .input(v.object({ groupId: v.string() }))
    .output(GroupMemberCountResponseSchema),
  getV2BotRoomRoomIdMembersCount: oc
    .route({
      method: 'GET',
      path: '/v2/bot/room/{roomId}/members/count',
      tags: ['messaging-api'],
      description: 'Get number of users in a multi-person chat',
    })
    .input(v.object({ roomId: v.string() }))
    .output(RoomMemberCountResponseSchema),
  postV2BotRichmenu: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu',
      tags: ['messaging-api'],
      description: 'Create rich menu',
    })
    .input(RichMenuRequestSchema)
    .output(RichMenuIdResponseSchema),
  postV2BotRichmenuValidate: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/validate',
      tags: ['messaging-api'],
      description: 'Validate rich menu object',
    })
    .input(RichMenuRequestSchema),
  getV2BotRichmenuRichMenuIdContent: oc
    .route({
      method: 'GET',
      path: '/v2/bot/richmenu/{richMenuId}/content',
      tags: ['messaging-api-blob'],
      description: 'Download rich menu image.',
    })
    .input(v.object({ richMenuId: v.string() })),
  postV2BotRichmenuRichMenuIdContent: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/{richMenuId}/content',
      tags: ['messaging-api-blob'],
      description: 'Upload rich menu image',
    })
    .input(v.object({ richMenuId: v.string() })),
  getV2BotRichmenuRichMenuId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/richmenu/{richMenuId}',
      tags: ['messaging-api'],
      description: 'Gets a rich menu via a rich menu ID.',
    })
    .input(v.object({ richMenuId: v.string() }))
    .output(RichMenuResponseSchema),
  deleteV2BotRichmenuRichMenuId: oc
    .route({
      method: 'DELETE',
      path: '/v2/bot/richmenu/{richMenuId}',
      tags: ['messaging-api'],
      description: 'Deletes a rich menu.',
    })
    .input(v.object({ richMenuId: v.string() })),
  getV2BotRichmenuList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/richmenu/list',
      tags: ['messaging-api'],
      description: 'Get rich menu list',
    })
    .output(RichMenuListResponseSchema),
  postV2BotUserAllRichmenuRichMenuId: oc
    .route({
      method: 'POST',
      path: '/v2/bot/user/all/richmenu/{richMenuId}',
      tags: ['messaging-api'],
      description: 'Set default rich menu',
    })
    .input(v.object({ richMenuId: v.string() })),
  getV2BotUserAllRichmenu: oc
    .route({
      method: 'GET',
      path: '/v2/bot/user/all/richmenu',
      tags: ['messaging-api'],
      description: 'Gets the ID of the default rich menu set with the Messaging API.',
    })
    .output(RichMenuIdResponseSchema),
  deleteV2BotUserAllRichmenu: oc.route({
    method: 'DELETE',
    path: '/v2/bot/user/all/richmenu',
    tags: ['messaging-api'],
    description: 'Cancel default rich menu',
  }),
  postV2BotRichmenuAlias: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/alias',
      tags: ['messaging-api'],
      description: 'Create rich menu alias',
    })
    .input(CreateRichMenuAliasRequestSchema),
  getV2BotRichmenuAliasRichMenuAliasId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/richmenu/alias/{richMenuAliasId}',
      tags: ['messaging-api'],
      description: 'Get rich menu alias information',
    })
    .input(v.object({ richMenuAliasId: v.string() }))
    .output(RichMenuAliasResponseSchema),
  postV2BotRichmenuAliasRichMenuAliasId: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/alias/{richMenuAliasId}',
      tags: ['messaging-api'],
      description: 'Update rich menu alias',
    })
    .input(
      v.object({
        richMenuAliasId: v.string(),
        richMenuId: v.pipe(
          v.string(),
          v.description('The rich menu ID to be associated with the rich menu alias.'),
        ),
      }),
    ),
  deleteV2BotRichmenuAliasRichMenuAliasId: oc
    .route({
      method: 'DELETE',
      path: '/v2/bot/richmenu/alias/{richMenuAliasId}',
      tags: ['messaging-api'],
      description: 'Delete rich menu alias',
    })
    .input(v.object({ richMenuAliasId: v.string() })),
  getV2BotRichmenuAliasList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/richmenu/alias/list',
      tags: ['messaging-api'],
      description: 'Get list of rich menu alias',
    })
    .output(RichMenuAliasListResponseSchema),
  getV2BotUserUserIdRichmenu: oc
    .route({
      method: 'GET',
      path: '/v2/bot/user/{userId}/richmenu',
      tags: ['messaging-api'],
      description: 'Get rich menu ID of user',
    })
    .input(v.object({ userId: v.string() }))
    .output(RichMenuIdResponseSchema),
  deleteV2BotUserUserIdRichmenu: oc
    .route({
      method: 'DELETE',
      path: '/v2/bot/user/{userId}/richmenu',
      tags: ['messaging-api'],
      description: 'Unlink rich menu from user',
    })
    .input(v.object({ userId: v.string() })),
  postV2BotUserUserIdRichmenuRichMenuId: oc
    .route({
      method: 'POST',
      path: '/v2/bot/user/{userId}/richmenu/{richMenuId}',
      tags: ['messaging-api'],
      description: 'Link rich menu to user.',
    })
    .input(v.object({ userId: v.string(), richMenuId: v.string() })),
  postV2BotRichmenuBulkLink: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/bulk/link',
      tags: ['messaging-api'],
      description: 'Link rich menu to multiple users',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(RichMenuBulkLinkRequestSchema),
  postV2BotRichmenuBulkUnlink: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/bulk/unlink',
      tags: ['messaging-api'],
      description: 'Unlink rich menus from multiple users',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(RichMenuBulkUnlinkRequestSchema),
  postV2BotRichmenuBatch: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/batch',
      tags: ['messaging-api'],
      description:
        'You can use this endpoint to batch control the rich menu linked to the users using the endpoint such as Link rich menu to user.\nThe following operations are available:\n\n1. Replace a rich menu with another rich menu for all users linked to a specific rich menu\n2. Unlink a rich menu for all users linked to a specific rich menu\n3. Unlink a rich menu for all users linked the rich menu\n',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(RichMenuBatchRequestSchema),
  postV2BotRichmenuValidateBatch: oc
    .route({
      method: 'POST',
      path: '/v2/bot/richmenu/validate/batch',
      tags: ['messaging-api'],
      description:
        'Validate a request body of the Replace or unlink the linked rich menus in batches endpoint.',
    })
    .input(RichMenuBatchRequestSchema),
  getV2BotRichmenuProgressBatch: oc
    .route({
      method: 'GET',
      path: '/v2/bot/richmenu/progress/batch',
      tags: ['messaging-api'],
      description: 'Get the status of Replace or unlink a linked rich menus in batches.',
    })
    .input(v.object({ requestId: v.string() }))
    .output(RichMenuBatchProgressResponseSchema),
  postV2BotUserUserIdLinkToken: oc
    .route({
      method: 'POST',
      path: '/v2/bot/user/{userId}/linkToken',
      tags: ['messaging-api'],
      description: 'Issue link token',
    })
    .input(v.object({ userId: v.string() }))
    .output(IssueLinkTokenResponseSchema),
  postV2BotMessageMarkAsRead: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/markAsRead',
      tags: ['messaging-api'],
      description: 'Mark messages from users as read',
    })
    .input(MarkMessagesAsReadRequestSchema),
  postBotPnpPush: oc
    .route({
      method: 'POST',
      path: '/bot/pnp/push',
      tags: ['messaging-api'],
      description: 'Send LINE notification message',
    })
    .input(PnpMessagesRequestSchema),
  postV2BotMessagePnpTemplatedPush: oc
    .route({
      method: 'POST',
      path: '/v2/bot/message/pnp/templated/push',
      tags: ['messaging-api'],
      description: 'Send LINE notification message (template)',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(PnpTemplatedMessageRequestSchema),
  getV2BotMessageDeliveryPnp: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/delivery/pnp',
      tags: ['messaging-api'],
      description: 'Get number of sent LINE notification messages',
    })
    .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) }))
    .output(NumberOfMessagesResponseSchema),
  getV2BotMessageDeliveryPnpTemplated: oc
    .route({
      method: 'GET',
      path: '/v2/bot/message/delivery/pnp/templated',
      tags: ['messaging-api'],
      description: 'Get number of sent LINE notification messages (template)',
    })
    .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) }))
    .output(NumberOfMessagesResponseSchema),
  getV2BotMembershipSubscriptionUserId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/membership/subscription/{userId}',
      tags: ['messaging-api'],
      description: "Get a user's membership subscription.",
    })
    .input(v.object({ userId: v.string() }))
    .output(GetMembershipSubscriptionResponseSchema),
  getV2BotMembershipList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/membership/list',
      tags: ['messaging-api'],
      description: 'Get a list of memberships.',
    })
    .output(MembershipListResponseSchema),
  getV2BotMembershipMembershipIdUsersIds: oc
    .route({
      method: 'GET',
      path: '/v2/bot/membership/{membershipId}/users/ids',
      tags: ['messaging-api'],
      description: 'Get a list of user IDs who joined the membership.',
    })
    .input(
      v.object({
        membershipId: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        start: v.optional(v.string()),
        limit: v.optional(
          v.pipe(
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
        ),
      }),
    )
    .output(GetJoinedMembershipUsersResponseSchema),
  getV2BotCoupon: oc
    .route({
      method: 'GET',
      path: '/v2/bot/coupon',
      tags: ['messaging-api'],
      description: 'Get a paginated list of coupons.',
    })
    .input(
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
        limit: v.optional(
          v.pipe(
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
        ),
      }),
    )
    .output(MessagingApiPagerCouponListResponseSchema),
  postV2BotCoupon: oc
    .route({
      method: 'POST',
      path: '/v2/bot/coupon',
      tags: ['messaging-api'],
      description:
        'Create a new coupon. Define coupon details such as type, title, and validity period.',
    })
    .input(CouponCreateRequestSchema)
    .output(CouponCreateResponseSchema),
  getV2BotCouponCouponId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/coupon/{couponId}',
      tags: ['messaging-api'],
      description: 'Get coupon detail',
    })
    .input(v.object({ couponId: v.string() }))
    .output(CouponResponseSchema),
  putV2BotCouponCouponIdClose: oc
    .route({
      method: 'PUT',
      path: '/v2/bot/coupon/{couponId}/close',
      tags: ['messaging-api'],
      description: 'Close coupon',
    })
    .input(v.object({ couponId: v.string() })),
  postV2BotChatLoadingStart: oc
    .route({
      method: 'POST',
      path: '/v2/bot/chat/loading/start',
      tags: ['messaging-api'],
      description:
        'Display a loading animation in one-on-one chats between users and LINE Official Accounts.',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(ShowLoadingAnimationRequestSchema)
    .output(ShowLoadingAnimationResponseSchema),
  postV2BotChatMarkAsRead: oc
    .route({
      method: 'POST',
      path: '/v2/bot/chat/markAsRead',
      tags: ['messaging-api'],
      description: 'Mark messages from users as read by token',
    })
    .input(MarkMessagesAsReadByTokenRequestSchema),
}
