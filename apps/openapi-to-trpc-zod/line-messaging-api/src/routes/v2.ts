import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
    .input(z.object({ messageId: z.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContentPreview: t.procedure
    .input(z.object({ messageId: z.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContentTranscoding: t.procedure
    .input(z.object({ messageId: z.string() }))
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
    .input(z.object({ requestId: z.string() }))
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
    .input(z.object({ date: z.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPush: t.procedure
    .input(z.object({ date: z.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryMulticast: t.procedure
    .input(z.object({ date: z.string() }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryBroadcast: t.procedure
    .input(z.object({ date: z.string() }))
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
    .input(z.object({ limit: z.string().exactOptional(), start: z.string().exactOptional() }))
    .output(GetAggregationUnitNameListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotProfileUserId: t.procedure
    .input(z.object({ userId: z.string() }))
    .output(UserProfileResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotFollowersIds: t.procedure
    .input(
      z.object({
        start: z.string().exactOptional(),
        limit: z.int32().max(1000).default(300).exactOptional(),
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
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .output(GroupUserProfileResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMemberUserId: t.procedure
    .input(z.object({ roomId: z.string(), userId: z.string() }))
    .output(RoomUserProfileResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdMembersIds: t.procedure
    .input(z.object({ groupId: z.string(), start: z.string().exactOptional() }))
    .output(MembersIdsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMembersIds: t.procedure
    .input(z.object({ roomId: z.string(), start: z.string().exactOptional() }))
    .output(MembersIdsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotGroupGroupIdLeave: t.procedure.input(z.object({ groupId: z.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRoomRoomIdLeave: t.procedure.input(z.object({ roomId: z.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotGroupGroupIdSummary: t.procedure
    .input(z.object({ groupId: z.string() }))
    .output(GroupSummaryResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdMembersCount: t.procedure
    .input(z.object({ groupId: z.string() }))
    .output(GroupMemberCountResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMembersCount: t.procedure
    .input(z.object({ roomId: z.string() }))
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
    .input(z.object({ richMenuId: z.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuRichMenuIdContent: t.procedure
    .input(z.object({ richMenuId: z.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuRichMenuId: t.procedure
    .input(z.object({ richMenuId: z.string() }))
    .output(RichMenuResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotRichmenuRichMenuId: t.procedure
    .input(z.object({ richMenuId: z.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuList: t.procedure.output(RichMenuListResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotUserAllRichmenuRichMenuId: t.procedure
    .input(z.object({ richMenuId: z.string() }))
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
    .input(z.object({ richMenuAliasId: z.string() }))
    .output(RichMenuAliasResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(
      z.object({
        richMenuAliasId: z.string(),
        richMenuId: z
          .string()
          .meta({ description: 'The rich menu ID to be associated with the rich menu alias.' }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(z.object({ richMenuAliasId: z.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuAliasList: t.procedure.output(RichMenuAliasListResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotUserUserIdRichmenu: t.procedure
    .input(z.object({ userId: z.string() }))
    .output(RichMenuIdResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotUserUserIdRichmenu: t.procedure
    .input(z.object({ userId: z.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserUserIdRichmenuRichMenuId: t.procedure
    .input(z.object({ userId: z.string(), richMenuId: z.string() }))
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
    .input(z.object({ requestId: z.string() }))
    .output(RichMenuBatchProgressResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserUserIdLinkToken: t.procedure
    .input(z.object({ userId: z.string() }))
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
    .input(z.object({ date: z.string().regex(/^[0-9]{8}$/) }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPnpTemplated: t.procedure
    .input(z.object({ date: z.string().regex(/^[0-9]{8}$/) }))
    .output(NumberOfMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipSubscriptionUserId: t.procedure
    .input(z.object({ userId: z.string() }))
    .output(GetMembershipSubscriptionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipList: t.procedure.output(MembershipListResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotMembershipMembershipIdUsersIds: t.procedure
    .input(
      z.object({
        start: z.string().exactOptional(),
        limit: z.int32().min(1).max(1000).default(300).exactOptional(),
        membershipId: z.int(),
      }),
    )
    .output(GetJoinedMembershipUsersResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotCoupon: t.procedure
    .input(
      z.object({
        status: z
          .array(z.enum(['DRAFT', 'RUNNING', 'CLOSED']))
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        start: z.string().exactOptional(),
        limit: z.int32().min(1).max(100).default(20).exactOptional(),
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
    .input(z.object({ couponId: z.string() }))
    .output(CouponResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotCouponCouponIdClose: t.procedure
    .input(z.object({ couponId: z.string() }))
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
