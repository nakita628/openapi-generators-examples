import { os } from '@orpc/server'
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
} from '../components'

export const getV2BotChannelWebhookEndpoint = os
  .route({
    method: 'GET',
    path: '/v2/bot/channel/webhook/endpoint',
    tags: ['messaging-api'],
    description: 'Get webhook endpoint information',
  })
  .output(GetWebhookEndpointResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putV2BotChannelWebhookEndpoint = os
  .route({
    method: 'PUT',
    path: '/v2/bot/channel/webhook/endpoint',
    tags: ['messaging-api'],
    description: 'Set webhook endpoint URL',
  })
  .input(SetWebhookEndpointRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChannelWebhookTest = os
  .route({
    method: 'POST',
    path: '/v2/bot/channel/webhook/test',
    tags: ['messaging-api'],
    description: 'Test webhook endpoint',
  })
  .input(TestWebhookEndpointRequestSchema)
  .output(TestWebhookEndpointResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageMessageIdContent = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/{messageId}/content',
    tags: ['messaging-api-blob'],
    description: 'Download image, video, and audio data sent from users.',
  })
  .input(v.object({ messageId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageMessageIdContentPreview = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/{messageId}/content/preview',
    tags: ['messaging-api-blob'],
    description: 'Get a preview image of the image or video',
  })
  .input(v.object({ messageId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageMessageIdContentTranscoding = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/{messageId}/content/transcoding',
    tags: ['messaging-api-blob'],
    description: 'Verify the preparation status of a video or audio for getting',
  })
  .input(v.object({ messageId: v.string() }))
  .output(GetMessageContentTranscodingResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageReply = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/reply',
    tags: ['messaging-api'],
    description: 'Send reply message',
  })
  .input(ReplyMessageRequestSchema)
  .output(ReplyMessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessagePush = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/push',
    tags: ['messaging-api'],
    description: 'Sends a message to a user, group chat, or multi-person chat at any time.',
  })
  .input(PushMessageRequestSchema)
  .output(PushMessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageMulticast = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/multicast',
    tags: ['messaging-api'],
    description:
      "An API that efficiently sends the same message to multiple user IDs. You can't send messages to group chats or multi-person chats.",
  })
  .input(MulticastRequestSchema)
  .output(MulticastResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageNarrowcast = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/narrowcast',
    tags: ['messaging-api'],
    description: 'Send narrowcast message',
    successStatus: 202,
    successDescription: 'Accepted',
  })
  .input(NarrowcastRequestSchema)
  .output(NarrowcastResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageProgressNarrowcast = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/progress/narrowcast',
    tags: ['messaging-api'],
    description: 'Gets the status of a narrowcast message.',
  })
  .input(v.object({ requestId: v.string() }))
  .output(NarrowcastProgressResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageBroadcast = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/broadcast',
    tags: ['messaging-api'],
    description: 'Sends a message to multiple users at any time.',
  })
  .input(BroadcastRequestSchema)
  .output(BroadcastResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageQuota = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/quota',
    tags: ['messaging-api'],
    description:
      'Gets the target limit for sending messages in the current month. The total number of the free messages and the additional messages is returned.',
  })
  .output(MessageQuotaResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageQuotaConsumption = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/quota/consumption',
    tags: ['messaging-api'],
    description: 'Gets the number of messages sent in the current month.',
  })
  .output(QuotaConsumptionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageDeliveryReply = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/delivery/reply',
    tags: ['messaging-api'],
    description: 'Get number of sent reply messages',
  })
  .input(v.object({ date: v.string() }))
  .output(NumberOfMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageDeliveryPush = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/delivery/push',
    tags: ['messaging-api'],
    description: 'Get number of sent push messages',
  })
  .input(v.object({ date: v.string() }))
  .output(NumberOfMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageDeliveryMulticast = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/delivery/multicast',
    tags: ['messaging-api'],
    description: 'Get number of sent multicast messages',
  })
  .input(v.object({ date: v.string() }))
  .output(NumberOfMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageDeliveryBroadcast = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/delivery/broadcast',
    tags: ['messaging-api'],
    description: 'Get number of sent broadcast messages',
  })
  .input(v.object({ date: v.string() }))
  .output(NumberOfMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageValidateReply = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/validate/reply',
    tags: ['messaging-api'],
    description: 'Validate message objects of a reply message',
  })
  .input(ValidateMessageRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageValidatePush = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/validate/push',
    tags: ['messaging-api'],
    description: 'Validate message objects of a push message',
  })
  .input(ValidateMessageRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageValidateMulticast = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/validate/multicast',
    tags: ['messaging-api'],
    description: 'Validate message objects of a multicast message',
  })
  .input(ValidateMessageRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageValidateNarrowcast = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/validate/narrowcast',
    tags: ['messaging-api'],
    description: 'Validate message objects of a narrowcast message',
  })
  .input(ValidateMessageRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageValidateBroadcast = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/validate/broadcast',
    tags: ['messaging-api'],
    description: 'Validate message objects of a broadcast message',
  })
  .input(ValidateMessageRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageAggregationInfo = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/aggregation/info',
    tags: ['messaging-api'],
    description: 'Get number of units used this month',
  })
  .output(GetAggregationUnitUsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageAggregationList = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/aggregation/list',
    tags: ['messaging-api'],
    description: 'Get name list of units used this month',
  })
  .input(v.object({ limit: v.optional(v.string()), start: v.optional(v.string()) }))
  .output(GetAggregationUnitNameListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotProfileUserId = os
  .route({
    method: 'GET',
    path: '/v2/bot/profile/{userId}',
    tags: ['messaging-api'],
    description: 'Get profile',
  })
  .input(v.object({ userId: v.string() }))
  .output(UserProfileResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotFollowersIds = os
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
  .output(GetFollowersResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInfo = os
  .route({
    method: 'GET',
    path: '/v2/bot/info',
    tags: ['messaging-api'],
    description: 'Get bot info',
  })
  .output(BotInfoResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotGroupGroupIdMemberUserId = os
  .route({
    method: 'GET',
    path: '/v2/bot/group/{groupId}/member/{userId}',
    tags: ['messaging-api'],
    description: 'Get group chat member profile',
  })
  .input(v.object({ groupId: v.string(), userId: v.string() }))
  .output(GroupUserProfileResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRoomRoomIdMemberUserId = os
  .route({
    method: 'GET',
    path: '/v2/bot/room/{roomId}/member/{userId}',
    tags: ['messaging-api'],
    description: 'Get multi-person chat member profile',
  })
  .input(v.object({ roomId: v.string(), userId: v.string() }))
  .output(RoomUserProfileResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotGroupGroupIdMembersIds = os
  .route({
    method: 'GET',
    path: '/v2/bot/group/{groupId}/members/ids',
    tags: ['messaging-api'],
    description: 'Get group chat member user IDs',
  })
  .input(v.object({ groupId: v.string(), start: v.optional(v.string()) }))
  .output(MembersIdsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRoomRoomIdMembersIds = os
  .route({
    method: 'GET',
    path: '/v2/bot/room/{roomId}/members/ids',
    tags: ['messaging-api'],
    description: 'Get multi-person chat member user IDs',
  })
  .input(v.object({ roomId: v.string(), start: v.optional(v.string()) }))
  .output(MembersIdsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotGroupGroupIdLeave = os
  .route({
    method: 'POST',
    path: '/v2/bot/group/{groupId}/leave',
    tags: ['messaging-api'],
    description: 'Leave group chat',
  })
  .input(v.object({ groupId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRoomRoomIdLeave = os
  .route({
    method: 'POST',
    path: '/v2/bot/room/{roomId}/leave',
    tags: ['messaging-api'],
    description: 'Leave multi-person chat',
  })
  .input(v.object({ roomId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotGroupGroupIdSummary = os
  .route({
    method: 'GET',
    path: '/v2/bot/group/{groupId}/summary',
    tags: ['messaging-api'],
    description: 'Get group chat summary',
  })
  .input(v.object({ groupId: v.string() }))
  .output(GroupSummaryResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotGroupGroupIdMembersCount = os
  .route({
    method: 'GET',
    path: '/v2/bot/group/{groupId}/members/count',
    tags: ['messaging-api'],
    description: 'Get number of users in a group chat',
  })
  .input(v.object({ groupId: v.string() }))
  .output(GroupMemberCountResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRoomRoomIdMembersCount = os
  .route({
    method: 'GET',
    path: '/v2/bot/room/{roomId}/members/count',
    tags: ['messaging-api'],
    description: 'Get number of users in a multi-person chat',
  })
  .input(v.object({ roomId: v.string() }))
  .output(RoomMemberCountResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenu = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu',
    tags: ['messaging-api'],
    description: 'Create rich menu',
  })
  .input(RichMenuRequestSchema)
  .output(RichMenuIdResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuValidate = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/validate',
    tags: ['messaging-api'],
    description: 'Validate rich menu object',
  })
  .input(RichMenuRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRichmenuRichMenuIdContent = os
  .route({
    method: 'GET',
    path: '/v2/bot/richmenu/{richMenuId}/content',
    tags: ['messaging-api-blob'],
    description: 'Download rich menu image.',
  })
  .input(v.object({ richMenuId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuRichMenuIdContent = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/{richMenuId}/content',
    tags: ['messaging-api-blob'],
    description: 'Upload rich menu image',
  })
  .input(v.object({ richMenuId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRichmenuRichMenuId = os
  .route({
    method: 'GET',
    path: '/v2/bot/richmenu/{richMenuId}',
    tags: ['messaging-api'],
    description: 'Gets a rich menu via a rich menu ID.',
  })
  .input(v.object({ richMenuId: v.string() }))
  .output(RichMenuResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV2BotRichmenuRichMenuId = os
  .route({
    method: 'DELETE',
    path: '/v2/bot/richmenu/{richMenuId}',
    tags: ['messaging-api'],
    description: 'Deletes a rich menu.',
  })
  .input(v.object({ richMenuId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRichmenuList = os
  .route({
    method: 'GET',
    path: '/v2/bot/richmenu/list',
    tags: ['messaging-api'],
    description: 'Get rich menu list',
  })
  .output(RichMenuListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotUserAllRichmenuRichMenuId = os
  .route({
    method: 'POST',
    path: '/v2/bot/user/all/richmenu/{richMenuId}',
    tags: ['messaging-api'],
    description: 'Set default rich menu',
  })
  .input(v.object({ richMenuId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotUserAllRichmenu = os
  .route({
    method: 'GET',
    path: '/v2/bot/user/all/richmenu',
    tags: ['messaging-api'],
    description: 'Gets the ID of the default rich menu set with the Messaging API.',
  })
  .output(RichMenuIdResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV2BotUserAllRichmenu = os
  .route({
    method: 'DELETE',
    path: '/v2/bot/user/all/richmenu',
    tags: ['messaging-api'],
    description: 'Cancel default rich menu',
  })
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuAlias = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/alias',
    tags: ['messaging-api'],
    description: 'Create rich menu alias',
  })
  .input(CreateRichMenuAliasRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRichmenuAliasRichMenuAliasId = os
  .route({
    method: 'GET',
    path: '/v2/bot/richmenu/alias/{richMenuAliasId}',
    tags: ['messaging-api'],
    description: 'Get rich menu alias information',
  })
  .input(v.object({ richMenuAliasId: v.string() }))
  .output(RichMenuAliasResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuAliasRichMenuAliasId = os
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
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV2BotRichmenuAliasRichMenuAliasId = os
  .route({
    method: 'DELETE',
    path: '/v2/bot/richmenu/alias/{richMenuAliasId}',
    tags: ['messaging-api'],
    description: 'Delete rich menu alias',
  })
  .input(v.object({ richMenuAliasId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRichmenuAliasList = os
  .route({
    method: 'GET',
    path: '/v2/bot/richmenu/alias/list',
    tags: ['messaging-api'],
    description: 'Get list of rich menu alias',
  })
  .output(RichMenuAliasListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotUserUserIdRichmenu = os
  .route({
    method: 'GET',
    path: '/v2/bot/user/{userId}/richmenu',
    tags: ['messaging-api'],
    description: 'Get rich menu ID of user',
  })
  .input(v.object({ userId: v.string() }))
  .output(RichMenuIdResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV2BotUserUserIdRichmenu = os
  .route({
    method: 'DELETE',
    path: '/v2/bot/user/{userId}/richmenu',
    tags: ['messaging-api'],
    description: 'Unlink rich menu from user',
  })
  .input(v.object({ userId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotUserUserIdRichmenuRichMenuId = os
  .route({
    method: 'POST',
    path: '/v2/bot/user/{userId}/richmenu/{richMenuId}',
    tags: ['messaging-api'],
    description: 'Link rich menu to user.',
  })
  .input(v.object({ userId: v.string(), richMenuId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuBulkLink = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/bulk/link',
    tags: ['messaging-api'],
    description: 'Link rich menu to multiple users',
    successStatus: 202,
    successDescription: 'Accepted',
  })
  .input(RichMenuBulkLinkRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuBulkUnlink = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/bulk/unlink',
    tags: ['messaging-api'],
    description: 'Unlink rich menus from multiple users',
    successStatus: 202,
    successDescription: 'Accepted',
  })
  .input(RichMenuBulkUnlinkRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuBatch = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/batch',
    tags: ['messaging-api'],
    description:
      'You can use this endpoint to batch control the rich menu linked to the users using the endpoint such as Link rich menu to user.\nThe following operations are available:\n\n1. Replace a rich menu with another rich menu for all users linked to a specific rich menu\n2. Unlink a rich menu for all users linked to a specific rich menu\n3. Unlink a rich menu for all users linked the rich menu\n',
    successStatus: 202,
    successDescription: 'Accepted',
  })
  .input(RichMenuBatchRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotRichmenuValidateBatch = os
  .route({
    method: 'POST',
    path: '/v2/bot/richmenu/validate/batch',
    tags: ['messaging-api'],
    description:
      'Validate a request body of the Replace or unlink the linked rich menus in batches endpoint.',
  })
  .input(RichMenuBatchRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotRichmenuProgressBatch = os
  .route({
    method: 'GET',
    path: '/v2/bot/richmenu/progress/batch',
    tags: ['messaging-api'],
    description: 'Get the status of Replace or unlink a linked rich menus in batches.',
  })
  .input(v.object({ requestId: v.string() }))
  .output(RichMenuBatchProgressResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotUserUserIdLinkToken = os
  .route({
    method: 'POST',
    path: '/v2/bot/user/{userId}/linkToken',
    tags: ['messaging-api'],
    description: 'Issue link token',
  })
  .input(v.object({ userId: v.string() }))
  .output(IssueLinkTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessageMarkAsRead = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/markAsRead',
    tags: ['messaging-api'],
    description: 'Mark messages from users as read',
  })
  .input(MarkMessagesAsReadRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotMessagePnpTemplatedPush = os
  .route({
    method: 'POST',
    path: '/v2/bot/message/pnp/templated/push',
    tags: ['messaging-api'],
    description: 'Send LINE notification message (template)',
    successStatus: 202,
    successDescription: 'Accepted',
  })
  .input(PnpTemplatedMessageRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageDeliveryPnp = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/delivery/pnp',
    tags: ['messaging-api'],
    description: 'Get number of sent LINE notification messages',
  })
  .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) }))
  .output(NumberOfMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMessageDeliveryPnpTemplated = os
  .route({
    method: 'GET',
    path: '/v2/bot/message/delivery/pnp/templated',
    tags: ['messaging-api'],
    description: 'Get number of sent LINE notification messages (template)',
  })
  .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) }))
  .output(NumberOfMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMembershipSubscriptionUserId = os
  .route({
    method: 'GET',
    path: '/v2/bot/membership/subscription/{userId}',
    tags: ['messaging-api'],
    description: "Get a user's membership subscription.",
  })
  .input(v.object({ userId: v.string() }))
  .output(GetMembershipSubscriptionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMembershipList = os
  .route({
    method: 'GET',
    path: '/v2/bot/membership/list',
    tags: ['messaging-api'],
    description: 'Get a list of memberships.',
  })
  .output(MembershipListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotMembershipMembershipIdUsersIds = os
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
  .output(GetJoinedMembershipUsersResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotCoupon = os
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
  .output(MessagingApiPagerCouponListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotCoupon = os
  .route({
    method: 'POST',
    path: '/v2/bot/coupon',
    tags: ['messaging-api'],
    description:
      'Create a new coupon. Define coupon details such as type, title, and validity period.',
  })
  .input(CouponCreateRequestSchema)
  .output(CouponCreateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotCouponCouponId = os
  .route({
    method: 'GET',
    path: '/v2/bot/coupon/{couponId}',
    tags: ['messaging-api'],
    description: 'Get coupon detail',
  })
  .input(v.object({ couponId: v.string() }))
  .output(CouponResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putV2BotCouponCouponIdClose = os
  .route({
    method: 'PUT',
    path: '/v2/bot/coupon/{couponId}/close',
    tags: ['messaging-api'],
    description: 'Close coupon',
  })
  .input(v.object({ couponId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChatLoadingStart = os
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
  .output(ShowLoadingAnimationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChatMarkAsRead = os
  .route({
    method: 'POST',
    path: '/v2/bot/chat/markAsRead',
    tags: ['messaging-api'],
    description: 'Mark messages from users as read by token',
  })
  .input(MarkMessagesAsReadByTokenRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
