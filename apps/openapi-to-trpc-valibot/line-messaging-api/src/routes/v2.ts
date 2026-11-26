import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const v2Router = t.router({
  getV2BotChannelWebhookEndpoint: t.procedure.output(GetWebhookEndpointResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  putV2BotChannelWebhookEndpoint: t.procedure
    .input(SetWebhookEndpointRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChannelWebhookTest: t.procedure
    .input(TestWebhookEndpointRequestSchema)
    .output(TestWebhookEndpointResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContent: t.procedure
    .input(v.object({ messageId: v.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContentPreview: t.procedure
    .input(v.object({ messageId: v.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContentTranscoding: t.procedure
    .input(v.object({ messageId: v.string() }))
    .output(GetMessageContentTranscodingResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageReply: t.procedure
    .input(ReplyMessageRequestSchema)
    .output(ReplyMessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessagePush: t.procedure
    .input(PushMessageRequestSchema)
    .output(PushMessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageMulticast: t.procedure
    .input(MulticastRequestSchema)
    .output(MulticastResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageNarrowcast: t.procedure
    .input(NarrowcastRequestSchema)
    .output(NarrowcastResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageProgressNarrowcast: t.procedure
    .input(v.object({ requestId: v.string() }))
    .output(NarrowcastProgressResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageBroadcast: t.procedure
    .input(BroadcastRequestSchema)
    .output(BroadcastResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageQuota: t.procedure.output(MessageQuotaResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotMessageQuotaConsumption: t.procedure.output(QuotaConsumptionResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotMessageDeliveryReply: t.procedure
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPush: t.procedure
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryMulticast: t.procedure
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryBroadcast: t.procedure
    .input(v.object({ date: v.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateReply: t.procedure.input(ValidateMessageRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotMessageValidatePush: t.procedure.input(ValidateMessageRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotMessageValidateMulticast: t.procedure
    .input(ValidateMessageRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateNarrowcast: t.procedure
    .input(ValidateMessageRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateBroadcast: t.procedure
    .input(ValidateMessageRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageAggregationInfo: t.procedure
    .output(GetAggregationUnitUsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageAggregationList: t.procedure
    .input(v.partial(v.object({ limit: v.string(), start: v.string() })))
    .output(GetAggregationUnitNameListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotProfileUserId: t.procedure
    .input(v.object({ userId: v.string() }))
    .output(UserProfileResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotFollowersIds: t.procedure
    .input(
      v.object({
        start: v.optional(v.string()),
        limit: v.optional(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.maxValue(1000),
          ),
          300,
        ),
      }),
    )
    .output(GetFollowersResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInfo: t.procedure.output(BotInfoResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotGroupGroupIdMemberUserId: t.procedure
    .input(v.object({ groupId: v.string(), userId: v.string() }))
    .output(GroupUserProfileResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMemberUserId: t.procedure
    .input(v.object({ roomId: v.string(), userId: v.string() }))
    .output(RoomUserProfileResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdMembersIds: t.procedure
    .input(v.object({ groupId: v.string(), start: v.optional(v.string()) }))
    .output(MembersIdsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMembersIds: t.procedure
    .input(v.object({ roomId: v.string(), start: v.optional(v.string()) }))
    .output(MembersIdsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotGroupGroupIdLeave: t.procedure.input(v.object({ groupId: v.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRoomRoomIdLeave: t.procedure.input(v.object({ roomId: v.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotGroupGroupIdSummary: t.procedure
    .input(v.object({ groupId: v.string() }))
    .output(GroupSummaryResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdMembersCount: t.procedure
    .input(v.object({ groupId: v.string() }))
    .output(GroupMemberCountResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMembersCount: t.procedure
    .input(v.object({ roomId: v.string() }))
    .output(RoomMemberCountResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenu: t.procedure
    .input(RichMenuRequestSchema)
    .output(RichMenuIdResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuValidate: t.procedure.input(RichMenuRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotRichmenuRichMenuIdContent: t.procedure
    .input(v.object({ richMenuId: v.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuRichMenuIdContent: t.procedure
    .input(v.object({ richMenuId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuRichMenuId: t.procedure
    .input(v.object({ richMenuId: v.string() }))
    .output(RichMenuResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotRichmenuRichMenuId: t.procedure
    .input(v.object({ richMenuId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuList: t.procedure.output(RichMenuListResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotUserAllRichmenuRichMenuId: t.procedure
    .input(v.object({ richMenuId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotUserAllRichmenu: t.procedure.output(RichMenuIdResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  deleteV2BotUserAllRichmenu: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRichmenuAlias: t.procedure.input(CreateRichMenuAliasRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(v.object({ richMenuAliasId: v.string() }))
    .output(RichMenuAliasResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(
      v.object({
        richMenuAliasId: v.string(),
        richMenuId: v.pipe(
          v.string(),
          v.description('The rich menu ID to be associated with the rich menu alias.'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(v.object({ richMenuAliasId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuAliasList: t.procedure.output(RichMenuAliasListResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotUserUserIdRichmenu: t.procedure
    .input(v.object({ userId: v.string() }))
    .output(RichMenuIdResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotUserUserIdRichmenu: t.procedure
    .input(v.object({ userId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserUserIdRichmenuRichMenuId: t.procedure
    .input(v.object({ userId: v.string(), richMenuId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuBulkLink: t.procedure.input(RichMenuBulkLinkRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRichmenuBulkUnlink: t.procedure.input(RichMenuBulkUnlinkRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRichmenuBatch: t.procedure.input(RichMenuBatchRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRichmenuValidateBatch: t.procedure.input(RichMenuBatchRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotRichmenuProgressBatch: t.procedure
    .input(v.object({ requestId: v.string() }))
    .output(RichMenuBatchProgressResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserUserIdLinkToken: t.procedure
    .input(v.object({ userId: v.string() }))
    .output(IssueLinkTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageMarkAsRead: t.procedure.input(MarkMessagesAsReadRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotMessagePnpTemplatedPush: t.procedure
    .input(PnpTemplatedMessageRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPnp: t.procedure
    .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPnpTemplated: t.procedure
    .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/)) }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipSubscriptionUserId: t.procedure
    .input(v.object({ userId: v.string() }))
    .output(GetMembershipSubscriptionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipList: t.procedure.output(MembershipListResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotMembershipMembershipIdUsersIds: t.procedure
    .input(
      v.object({
        start: v.optional(v.string()),
        limit: v.optional(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(1),
            v.maxValue(1000),
          ),
          300,
        ),
        membershipId: v.pipe(v.number(), v.integer()),
      }),
    )
    .output(GetJoinedMembershipUsersResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotCoupon: t.procedure
    .input(
      v.object({
        status: v.optional(
          v.pipe(
            v.array(v.picklist(['DRAFT', 'RUNNING', 'CLOSED'])),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        start: v.optional(v.string()),
        limit: v.optional(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(1),
            v.maxValue(100),
          ),
          20,
        ),
      }),
    )
    .output(MessagingApiPagerCouponListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotCoupon: t.procedure
    .input(CouponCreateRequestSchema)
    .output(CouponCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotCouponCouponId: t.procedure
    .input(v.object({ couponId: v.string() }))
    .output(CouponResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotCouponCouponIdClose: t.procedure
    .input(v.object({ couponId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatLoadingStart: t.procedure
    .input(ShowLoadingAnimationRequestSchema)
    .output(ShowLoadingAnimationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatMarkAsRead: t.procedure
    .input(MarkMessagesAsReadByTokenRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
