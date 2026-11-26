import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
  getV2BotChannelWebhookEndpoint: t.procedure
    .output(Schema.toStandardSchemaV1(GetWebhookEndpointResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotChannelWebhookEndpoint: t.procedure
    .input(Schema.toStandardSchemaV1(SetWebhookEndpointRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChannelWebhookTest: t.procedure
    .input(Schema.toStandardSchemaV1(TestWebhookEndpointRequestSchema))
    .output(Schema.toStandardSchemaV1(TestWebhookEndpointResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContent: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ messageId: Schema.String })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContentPreview: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ messageId: Schema.String })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageMessageIdContentTranscoding: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ messageId: Schema.String })))
    .output(Schema.toStandardSchemaV1(GetMessageContentTranscodingResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageReply: t.procedure
    .input(Schema.toStandardSchemaV1(ReplyMessageRequestSchema))
    .output(Schema.toStandardSchemaV1(ReplyMessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessagePush: t.procedure
    .input(Schema.toStandardSchemaV1(PushMessageRequestSchema))
    .output(Schema.toStandardSchemaV1(PushMessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageMulticast: t.procedure
    .input(Schema.toStandardSchemaV1(MulticastRequestSchema))
    .output(Schema.toStandardSchemaV1(MulticastResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageNarrowcast: t.procedure
    .input(Schema.toStandardSchemaV1(NarrowcastRequestSchema))
    .output(Schema.toStandardSchemaV1(NarrowcastResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageProgressNarrowcast: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ requestId: Schema.String })))
    .output(Schema.toStandardSchemaV1(NarrowcastProgressResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageBroadcast: t.procedure
    .input(Schema.toStandardSchemaV1(BroadcastRequestSchema))
    .output(Schema.toStandardSchemaV1(BroadcastResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageQuota: t.procedure
    .output(Schema.toStandardSchemaV1(MessageQuotaResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageQuotaConsumption: t.procedure
    .output(Schema.toStandardSchemaV1(QuotaConsumptionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryReply: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String })))
    .output(Schema.toStandardSchemaV1(NumberOfMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPush: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String })))
    .output(Schema.toStandardSchemaV1(NumberOfMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryMulticast: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String })))
    .output(Schema.toStandardSchemaV1(NumberOfMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryBroadcast: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ date: Schema.String })))
    .output(Schema.toStandardSchemaV1(NumberOfMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateReply: t.procedure
    .input(Schema.toStandardSchemaV1(ValidateMessageRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidatePush: t.procedure
    .input(Schema.toStandardSchemaV1(ValidateMessageRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateMulticast: t.procedure
    .input(Schema.toStandardSchemaV1(ValidateMessageRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateNarrowcast: t.procedure
    .input(Schema.toStandardSchemaV1(ValidateMessageRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageValidateBroadcast: t.procedure
    .input(Schema.toStandardSchemaV1(ValidateMessageRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageAggregationInfo: t.procedure
    .output(Schema.toStandardSchemaV1(GetAggregationUnitUsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageAggregationList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(Schema.String),
          start: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetAggregationUnitNameListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotProfileUserId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String })))
    .output(Schema.toStandardSchemaV1(UserProfileResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotFollowersIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt32(), Schema.isLessThanOrEqualTo(1000)).pipe(
            Schema.withDecodingDefault(Effect.succeed(300)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetFollowersResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInfo: t.procedure.output(Schema.toStandardSchemaV1(BotInfoResponseSchema)).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotGroupGroupIdMemberUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String, userId: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(GroupUserProfileResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMemberUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String, userId: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(RoomUserProfileResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdMembersIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ groupId: Schema.String, start: Schema.optionalKey(Schema.String) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MembersIdsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMembersIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ roomId: Schema.String, start: Schema.optionalKey(Schema.String) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MembersIdsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotGroupGroupIdLeave: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRoomRoomIdLeave: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdSummary: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String })))
    .output(Schema.toStandardSchemaV1(GroupSummaryResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotGroupGroupIdMembersCount: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ groupId: Schema.String })))
    .output(Schema.toStandardSchemaV1(GroupMemberCountResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRoomRoomIdMembersCount: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ roomId: Schema.String })))
    .output(Schema.toStandardSchemaV1(RoomMemberCountResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenu: t.procedure
    .input(Schema.toStandardSchemaV1(RichMenuRequestSchema))
    .output(Schema.toStandardSchemaV1(RichMenuIdResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuValidate: t.procedure
    .input(Schema.toStandardSchemaV1(RichMenuRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuRichMenuIdContent: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuRichMenuIdContent: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuRichMenuId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String })))
    .output(Schema.toStandardSchemaV1(RichMenuResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotRichmenuRichMenuId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuList: t.procedure
    .output(Schema.toStandardSchemaV1(RichMenuListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserAllRichmenuRichMenuId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotUserAllRichmenu: t.procedure
    .output(Schema.toStandardSchemaV1(RichMenuIdResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotUserAllRichmenu: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotRichmenuAlias: t.procedure
    .input(Schema.toStandardSchemaV1(CreateRichMenuAliasRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuAliasId: Schema.String })))
    .output(Schema.toStandardSchemaV1(RichMenuAliasResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          richMenuAliasId: Schema.String,
          richMenuId: Schema.String.annotate({
            description: 'The rich menu ID to be associated with the rich menu alias.',
          }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotRichmenuAliasRichMenuAliasId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ richMenuAliasId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuAliasList: t.procedure
    .output(Schema.toStandardSchemaV1(RichMenuAliasListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotUserUserIdRichmenu: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String })))
    .output(Schema.toStandardSchemaV1(RichMenuIdResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV2BotUserUserIdRichmenu: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserUserIdRichmenuRichMenuId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ userId: Schema.String, richMenuId: Schema.String }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuBulkLink: t.procedure
    .input(Schema.toStandardSchemaV1(RichMenuBulkLinkRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuBulkUnlink: t.procedure
    .input(Schema.toStandardSchemaV1(RichMenuBulkUnlinkRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuBatch: t.procedure
    .input(Schema.toStandardSchemaV1(RichMenuBatchRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotRichmenuValidateBatch: t.procedure
    .input(Schema.toStandardSchemaV1(RichMenuBatchRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotRichmenuProgressBatch: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ requestId: Schema.String })))
    .output(Schema.toStandardSchemaV1(RichMenuBatchProgressResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotUserUserIdLinkToken: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String })))
    .output(Schema.toStandardSchemaV1(IssueLinkTokenResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessageMarkAsRead: t.procedure
    .input(Schema.toStandardSchemaV1(MarkMessagesAsReadRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotMessagePnpTemplatedPush: t.procedure
    .input(Schema.toStandardSchemaV1(PnpTemplatedMessageRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPnp: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ date: Schema.String.check(Schema.isPattern(/^[0-9]{8}$/)) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(NumberOfMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMessageDeliveryPnpTemplated: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ date: Schema.String.check(Schema.isPattern(/^[0-9]{8}$/)) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(NumberOfMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipSubscriptionUserId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ userId: Schema.String })))
    .output(Schema.toStandardSchemaV1(GetMembershipSubscriptionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipList: t.procedure
    .output(Schema.toStandardSchemaV1(MembershipListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotMembershipMembershipIdUsersIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(
            Schema.isInt32(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(300))),
          membershipId: Schema.Number.check(Schema.isInt()),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetJoinedMembershipUsersResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotCoupon: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          status: Schema.optionalKey(
            Schema.Array(Schema.Literals(['DRAFT', 'RUNNING', 'CLOSED'])).check(Schema.isUnique()),
          ),
          start: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(
            Schema.isInt32(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(100),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(20))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessagingApiPagerCouponListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotCoupon: t.procedure
    .input(Schema.toStandardSchemaV1(CouponCreateRequestSchema))
    .output(Schema.toStandardSchemaV1(CouponCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotCouponCouponId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ couponId: Schema.String })))
    .output(Schema.toStandardSchemaV1(CouponResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putV2BotCouponCouponIdClose: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ couponId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatLoadingStart: t.procedure
    .input(Schema.toStandardSchemaV1(ShowLoadingAnimationRequestSchema))
    .output(Schema.toStandardSchemaV1(ShowLoadingAnimationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatMarkAsRead: t.procedure
    .input(Schema.toStandardSchemaV1(MarkMessagesAsReadByTokenRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
