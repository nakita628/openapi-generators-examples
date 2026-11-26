import { Elysia, t } from 'elysia'
import {
  AcquisitionConditionRequestSchema,
  AcquisitionConditionResponseSchema,
  ActionSchema,
  BotInfoResponseSchema,
  BroadcastRequestSchema,
  BroadcastResponseSchema,
  ChatReferenceSchema,
  CouponCreateRequestSchema,
  CouponCreateResponseSchema,
  CouponListResponseSchema,
  CouponResponseSchema,
  CouponRewardRequestSchema,
  CouponRewardResponseSchema,
  CreateRichMenuAliasRequestSchema,
  DemographicFilterSchema,
  ErrorDetailSchema,
  ErrorResponseSchema,
  FilterSchema,
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
  LimitSchema,
  MarkMessagesAsReadByTokenRequestSchema,
  MarkMessagesAsReadRequestSchema,
  MembersIdsResponseSchema,
  MembershipSchema,
  MembershipListResponseSchema,
  MessageSchema,
  MessageQuotaResponseSchema,
  MessagingApiPagerCouponListResponseSchema,
  MulticastRequestSchema,
  MulticastResponseSchema,
  NarrowcastProgressResponseSchema,
  NarrowcastRequestSchema,
  NarrowcastResponseSchema,
  NotificationDisabledSchema,
  NumberOfMessagesResponseSchema,
  PnpTemplatedButtonSchema,
  PnpTemplatedEmphasizedItemSchema,
  PnpTemplatedItemSchema,
  PnpTemplatedMessageBodySchema,
  PnpTemplatedMessageRequestSchema,
  PushMessageRequestSchema,
  PushMessageResponseSchema,
  QuickReplySchema,
  QuickReplyItemSchema,
  QuotaConsumptionResponseSchema,
  QuotaTypeSchema,
  RecipientSchema,
  ReplyMessageRequestSchema,
  ReplyMessageResponseSchema,
  RichMenuAliasListResponseSchema,
  RichMenuAliasResponseSchema,
  RichMenuAreaSchema,
  RichMenuBatchOperationSchema,
  RichMenuBatchProgressPhaseSchema,
  RichMenuBatchProgressResponseSchema,
  RichMenuBatchRequestSchema,
  RichMenuBoundsSchema,
  RichMenuBulkLinkRequestSchema,
  RichMenuBulkUnlinkRequestSchema,
  RichMenuIdResponseSchema,
  RichMenuListResponseSchema,
  RichMenuRequestSchema,
  RichMenuResponseSchema,
  RichMenuSizeSchema,
  RoomMemberCountResponseSchema,
  RoomUserProfileResponseSchema,
  SenderSchema,
  SentMessageSchema,
  SetWebhookEndpointRequestSchema,
  ShowLoadingAnimationRequestSchema,
  ShowLoadingAnimationResponseSchema,
  SubscribedMembershipPlanSchema,
  SubscribedMembershipUserSchema,
  SubscriptionSchema,
  TestWebhookEndpointRequestSchema,
  TestWebhookEndpointResponseSchema,
  UpdateRichMenuAliasRequestSchema,
  UserProfileResponseSchema,
  ValidateMessageRequestSchema,
} from '../../components/schemas'
import { V2Model } from './model'

export const v2 = new Elysia()
  .model({
    AcquisitionConditionRequest: AcquisitionConditionRequestSchema,
    AcquisitionConditionResponse: AcquisitionConditionResponseSchema,
    Action: ActionSchema,
    BotInfoResponse: BotInfoResponseSchema,
    BroadcastRequest: BroadcastRequestSchema,
    BroadcastResponse: BroadcastResponseSchema,
    ChatReference: ChatReferenceSchema,
    CouponCreateRequest: CouponCreateRequestSchema,
    CouponCreateResponse: CouponCreateResponseSchema,
    CouponListResponse: CouponListResponseSchema,
    CouponResponse: CouponResponseSchema,
    CouponRewardRequest: CouponRewardRequestSchema,
    CouponRewardResponse: CouponRewardResponseSchema,
    CreateRichMenuAliasRequest: CreateRichMenuAliasRequestSchema,
    DemographicFilter: DemographicFilterSchema,
    ErrorDetail: ErrorDetailSchema,
    ErrorResponse: ErrorResponseSchema,
    Filter: FilterSchema,
    GetAggregationUnitNameListResponse: GetAggregationUnitNameListResponseSchema,
    GetAggregationUnitUsageResponse: GetAggregationUnitUsageResponseSchema,
    GetFollowersResponse: GetFollowersResponseSchema,
    GetJoinedMembershipUsersResponse: GetJoinedMembershipUsersResponseSchema,
    GetMembershipSubscriptionResponse: GetMembershipSubscriptionResponseSchema,
    GetMessageContentTranscodingResponse: GetMessageContentTranscodingResponseSchema,
    GetWebhookEndpointResponse: GetWebhookEndpointResponseSchema,
    GroupMemberCountResponse: GroupMemberCountResponseSchema,
    GroupSummaryResponse: GroupSummaryResponseSchema,
    GroupUserProfileResponse: GroupUserProfileResponseSchema,
    IssueLinkTokenResponse: IssueLinkTokenResponseSchema,
    Limit: LimitSchema,
    MarkMessagesAsReadByTokenRequest: MarkMessagesAsReadByTokenRequestSchema,
    MarkMessagesAsReadRequest: MarkMessagesAsReadRequestSchema,
    MembersIdsResponse: MembersIdsResponseSchema,
    Membership: MembershipSchema,
    MembershipListResponse: MembershipListResponseSchema,
    Message: MessageSchema,
    MessageQuotaResponse: MessageQuotaResponseSchema,
    MessagingApiPagerCouponListResponse: MessagingApiPagerCouponListResponseSchema,
    MulticastRequest: MulticastRequestSchema,
    MulticastResponse: MulticastResponseSchema,
    NarrowcastProgressResponse: NarrowcastProgressResponseSchema,
    NarrowcastRequest: NarrowcastRequestSchema,
    NarrowcastResponse: NarrowcastResponseSchema,
    NotificationDisabled: NotificationDisabledSchema,
    NumberOfMessagesResponse: NumberOfMessagesResponseSchema,
    PnpTemplatedButton: PnpTemplatedButtonSchema,
    PnpTemplatedEmphasizedItem: PnpTemplatedEmphasizedItemSchema,
    PnpTemplatedItem: PnpTemplatedItemSchema,
    PnpTemplatedMessageBody: PnpTemplatedMessageBodySchema,
    PnpTemplatedMessageRequest: PnpTemplatedMessageRequestSchema,
    PushMessageRequest: PushMessageRequestSchema,
    PushMessageResponse: PushMessageResponseSchema,
    QuickReply: QuickReplySchema,
    QuickReplyItem: QuickReplyItemSchema,
    QuotaConsumptionResponse: QuotaConsumptionResponseSchema,
    QuotaType: QuotaTypeSchema,
    Recipient: RecipientSchema,
    ReplyMessageRequest: ReplyMessageRequestSchema,
    ReplyMessageResponse: ReplyMessageResponseSchema,
    RichMenuAliasListResponse: RichMenuAliasListResponseSchema,
    RichMenuAliasResponse: RichMenuAliasResponseSchema,
    RichMenuArea: RichMenuAreaSchema,
    RichMenuBatchOperation: RichMenuBatchOperationSchema,
    RichMenuBatchProgressPhase: RichMenuBatchProgressPhaseSchema,
    RichMenuBatchProgressResponse: RichMenuBatchProgressResponseSchema,
    RichMenuBatchRequest: RichMenuBatchRequestSchema,
    RichMenuBounds: RichMenuBoundsSchema,
    RichMenuBulkLinkRequest: RichMenuBulkLinkRequestSchema,
    RichMenuBulkUnlinkRequest: RichMenuBulkUnlinkRequestSchema,
    RichMenuIdResponse: RichMenuIdResponseSchema,
    RichMenuListResponse: RichMenuListResponseSchema,
    RichMenuRequest: RichMenuRequestSchema,
    RichMenuResponse: RichMenuResponseSchema,
    RichMenuSize: RichMenuSizeSchema,
    RoomMemberCountResponse: RoomMemberCountResponseSchema,
    RoomUserProfileResponse: RoomUserProfileResponseSchema,
    Sender: SenderSchema,
    SentMessage: SentMessageSchema,
    SetWebhookEndpointRequest: SetWebhookEndpointRequestSchema,
    ShowLoadingAnimationRequest: ShowLoadingAnimationRequestSchema,
    ShowLoadingAnimationResponse: ShowLoadingAnimationResponseSchema,
    SubscribedMembershipPlan: SubscribedMembershipPlanSchema,
    SubscribedMembershipUser: SubscribedMembershipUserSchema,
    Subscription: SubscriptionSchema,
    TestWebhookEndpointRequest: TestWebhookEndpointRequestSchema,
    TestWebhookEndpointResponse: TestWebhookEndpointResponseSchema,
    UpdateRichMenuAliasRequest: UpdateRichMenuAliasRequestSchema,
    UserProfileResponse: UserProfileResponseSchema,
    ValidateMessageRequest: ValidateMessageRequestSchema,
  })
  .get('/v2/bot/channel/webhook/endpoint', () => { throw new Error('Not implemented') }, {
    response: { 200: 'GetWebhookEndpointResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get webhook endpoint information',
      operationId: 'getWebhookEndpoint',
    },
  })
  .put('/v2/bot/channel/webhook/endpoint', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'SetWebhookEndpointRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Set webhook endpoint URL',
      operationId: 'setWebhookEndpoint',
    },
  })
  .post('/v2/bot/channel/webhook/test', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'TestWebhookEndpointRequest',
    response: { 200: 'TestWebhookEndpointResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Test webhook endpoint',
      operationId: 'testWebhookEndpoint',
    },
  })
  .get('/v2/bot/message/:messageId/content', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getMessageContentParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api-blob'],
      description: 'Download image, video, and audio data sent from users.',
      operationId: 'getMessageContent',
    },
  })
  .get('/v2/bot/message/:messageId/content/preview', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getMessageContentPreviewParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api-blob'],
      description: 'Get a preview image of the image or video',
      operationId: 'getMessageContentPreview',
    },
  })
  .get('/v2/bot/message/:messageId/content/transcoding', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getMessageContentTranscodingByMessageIdParams,
    response: { 200: 'GetMessageContentTranscodingResponse' },
    detail: {
      tags: ['messaging-api-blob'],
      description: 'Verify the preparation status of a video or audio for getting',
      operationId: 'getMessageContentTranscodingByMessageId',
    },
  })
  .post('/v2/bot/message/reply', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ReplyMessageRequest',
    response: { 200: 'ReplyMessageResponse', 400: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Send reply message',
      operationId: 'replyMessage',
    },
  })
  .post('/v2/bot/message/push', ({ headers, body }) => { throw new Error('Not implemented') }, {
    headers: V2Model.pushMessageHeaders,
    body: 'PushMessageRequest',
    response: {
      200: 'PushMessageResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['messaging-api'],
      description: 'Sends a message to a user, group chat, or multi-person chat at any time.',
      operationId: 'pushMessage',
    },
  })
  .post('/v2/bot/message/multicast', ({ headers, body }) => { throw new Error('Not implemented') }, {
    headers: V2Model.multicastHeaders,
    body: 'MulticastRequest',
    response: {
      200: 'MulticastResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['messaging-api'],
      description:
        "An API that efficiently sends the same message to multiple user IDs. You can't send messages to group chats or multi-person chats.",
      operationId: 'multicast',
    },
  })
  .post('/v2/bot/message/narrowcast', ({ headers, body }) => { throw new Error('Not implemented') }, {
    headers: V2Model.narrowcastHeaders,
    body: 'NarrowcastRequest',
    response: {
      202: 'NarrowcastResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['messaging-api'],
      description: 'Send narrowcast message',
      operationId: 'narrowcast',
    },
  })
  .get('/v2/bot/message/progress/narrowcast', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNarrowcastProgressQuery,
    response: { 200: 'NarrowcastProgressResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Gets the status of a narrowcast message.',
      operationId: 'getNarrowcastProgress',
    },
  })
  .post('/v2/bot/message/broadcast', ({ headers, body }) => { throw new Error('Not implemented') }, {
    headers: V2Model.broadcastHeaders,
    body: 'BroadcastRequest',
    response: {
      200: 'BroadcastResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['messaging-api'],
      description: 'Sends a message to multiple users at any time.',
      operationId: 'broadcast',
    },
  })
  .get('/v2/bot/message/quota', () => { throw new Error('Not implemented') }, {
    response: { 200: 'MessageQuotaResponse' },
    detail: {
      tags: ['messaging-api'],
      description:
        'Gets the target limit for sending messages in the current month. The total number of the free messages and the additional messages is returned.',
      operationId: 'getMessageQuota',
    },
  })
  .get('/v2/bot/message/quota/consumption', () => { throw new Error('Not implemented') }, {
    response: { 200: 'QuotaConsumptionResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Gets the number of messages sent in the current month.',
      operationId: 'getMessageQuotaConsumption',
    },
  })
  .get('/v2/bot/message/delivery/reply', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNumberOfSentReplyMessagesQuery,
    response: { 200: 'NumberOfMessagesResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of sent reply messages',
      operationId: 'getNumberOfSentReplyMessages',
    },
  })
  .get('/v2/bot/message/delivery/push', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNumberOfSentPushMessagesQuery,
    response: { 200: 'NumberOfMessagesResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of sent push messages',
      operationId: 'getNumberOfSentPushMessages',
    },
  })
  .get('/v2/bot/message/delivery/multicast', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNumberOfSentMulticastMessagesQuery,
    response: { 200: 'NumberOfMessagesResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of sent multicast messages',
      operationId: 'getNumberOfSentMulticastMessages',
    },
  })
  .get('/v2/bot/message/delivery/broadcast', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNumberOfSentBroadcastMessagesQuery,
    response: { 200: 'NumberOfMessagesResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of sent broadcast messages',
      operationId: 'getNumberOfSentBroadcastMessages',
    },
  })
  .post('/v2/bot/message/validate/reply', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ValidateMessageRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Validate message objects of a reply message',
      operationId: 'validateReply',
    },
  })
  .post('/v2/bot/message/validate/push', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ValidateMessageRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Validate message objects of a push message',
      operationId: 'validatePush',
    },
  })
  .post('/v2/bot/message/validate/multicast', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ValidateMessageRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Validate message objects of a multicast message',
      operationId: 'validateMulticast',
    },
  })
  .post('/v2/bot/message/validate/narrowcast', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ValidateMessageRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Validate message objects of a narrowcast message',
      operationId: 'validateNarrowcast',
    },
  })
  .post('/v2/bot/message/validate/broadcast', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ValidateMessageRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Validate message objects of a broadcast message',
      operationId: 'validateBroadcast',
    },
  })
  .get('/v2/bot/message/aggregation/info', () => { throw new Error('Not implemented') }, {
    response: { 200: 'GetAggregationUnitUsageResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of units used this month',
      operationId: 'getAggregationUnitUsage',
    },
  })
  .get('/v2/bot/message/aggregation/list', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getAggregationUnitNameListQuery,
    response: { 200: 'GetAggregationUnitNameListResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get name list of units used this month',
      operationId: 'getAggregationUnitNameList',
    },
  })
  .get('/v2/bot/profile/:userId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getProfileParams,
    response: { 200: 'UserProfileResponse' },
    detail: { tags: ['messaging-api'], description: 'Get profile', operationId: 'getProfile' },
  })
  .get('/v2/bot/followers/ids', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getFollowersQuery,
    response: { 200: 'GetFollowersResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get a list of users who added your LINE Official Account as a friend',
      operationId: 'getFollowers',
    },
  })
  .get('/v2/bot/info', () => { throw new Error('Not implemented') }, {
    response: { 200: 'BotInfoResponse' },
    detail: { tags: ['messaging-api'], description: 'Get bot info', operationId: 'getBotInfo' },
  })
  .get('/v2/bot/group/:groupId/member/:userId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getGroupMemberProfileParams,
    response: { 200: 'GroupUserProfileResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get group chat member profile',
      operationId: 'getGroupMemberProfile',
    },
  })
  .get('/v2/bot/room/:roomId/member/:userId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRoomMemberProfileParams,
    response: { 200: 'RoomUserProfileResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get multi-person chat member profile',
      operationId: 'getRoomMemberProfile',
    },
  })
  .get('/v2/bot/group/:groupId/members/ids', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: V2Model.getGroupMembersIdsParams,
    query: V2Model.getGroupMembersIdsQuery,
    response: { 200: 'MembersIdsResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get group chat member user IDs',
      operationId: 'getGroupMembersIds',
    },
  })
  .get('/v2/bot/room/:roomId/members/ids', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRoomMembersIdsParams,
    query: V2Model.getRoomMembersIdsQuery,
    response: { 200: 'MembersIdsResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get multi-person chat member user IDs',
      operationId: 'getRoomMembersIds',
    },
  })
  .post('/v2/bot/group/:groupId/leave', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.leaveGroupParams,
    response: { 200: t.Void(), 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: { tags: ['messaging-api'], description: 'Leave group chat', operationId: 'leaveGroup' },
  })
  .post('/v2/bot/room/:roomId/leave', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.leaveRoomParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Leave multi-person chat',
      operationId: 'leaveRoom',
    },
  })
  .get('/v2/bot/group/:groupId/summary', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getGroupSummaryParams,
    response: { 200: 'GroupSummaryResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get group chat summary',
      operationId: 'getGroupSummary',
    },
  })
  .get('/v2/bot/group/:groupId/members/count', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getGroupMemberCountParams,
    response: { 200: 'GroupMemberCountResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of users in a group chat',
      operationId: 'getGroupMemberCount',
    },
  })
  .get('/v2/bot/room/:roomId/members/count', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRoomMemberCountParams,
    response: { 200: 'RoomMemberCountResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of users in a multi-person chat',
      operationId: 'getRoomMemberCount',
    },
  })
  .post('/v2/bot/richmenu', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RichMenuRequest',
    response: { 200: 'RichMenuIdResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Create rich menu',
      operationId: 'createRichMenu',
    },
  })
  .post('/v2/bot/richmenu/validate', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RichMenuRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Validate rich menu object',
      operationId: 'validateRichMenuObject',
    },
  })
  .get('/v2/bot/richmenu/:richMenuId/content', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRichMenuImageParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api-blob'],
      description: 'Download rich menu image.',
      operationId: 'getRichMenuImage',
    },
  })
  .post('/v2/bot/richmenu/:richMenuId/content', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.setRichMenuImageParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api-blob'],
      description: 'Upload rich menu image',
      operationId: 'setRichMenuImage',
    },
  })
  .get('/v2/bot/richmenu/:richMenuId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRichMenuParams,
    response: { 200: 'RichMenuResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Gets a rich menu via a rich menu ID.',
      operationId: 'getRichMenu',
    },
  })
  .delete('/v2/bot/richmenu/:richMenuId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.deleteRichMenuParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Deletes a rich menu.',
      operationId: 'deleteRichMenu',
    },
  })
  .get('/v2/bot/richmenu/list', () => { throw new Error('Not implemented') }, {
    response: { 200: 'RichMenuListResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get rich menu list',
      operationId: 'getRichMenuList',
    },
  })
  .post('/v2/bot/user/all/richmenu/:richMenuId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.setDefaultRichMenuParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Set default rich menu',
      operationId: 'setDefaultRichMenu',
    },
  })
  .get('/v2/bot/user/all/richmenu', () => { throw new Error('Not implemented') }, {
    response: { 200: 'RichMenuIdResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Gets the ID of the default rich menu set with the Messaging API.',
      operationId: 'getDefaultRichMenuId',
    },
  })
  .delete('/v2/bot/user/all/richmenu', () => { throw new Error('Not implemented') }, {
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Cancel default rich menu',
      operationId: 'cancelDefaultRichMenu',
    },
  })
  .post('/v2/bot/richmenu/alias', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateRichMenuAliasRequest',
    response: { 200: t.Void(), 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Create rich menu alias',
      operationId: 'createRichMenuAlias',
    },
  })
  .get('/v2/bot/richmenu/alias/:richMenuAliasId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRichMenuAliasParams,
    response: { 200: 'RichMenuAliasResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get rich menu alias information',
      operationId: 'getRichMenuAlias',
    },
  })
  .post('/v2/bot/richmenu/alias/:richMenuAliasId', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: V2Model.updateRichMenuAliasParams,
    body: 'UpdateRichMenuAliasRequest',
    response: { 200: t.Void(), 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Update rich menu alias',
      operationId: 'updateRichMenuAlias',
    },
  })
  .delete('/v2/bot/richmenu/alias/:richMenuAliasId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.deleteRichMenuAliasParams,
    response: { 200: t.Void(), 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Delete rich menu alias',
      operationId: 'deleteRichMenuAlias',
    },
  })
  .get('/v2/bot/richmenu/alias/list', () => { throw new Error('Not implemented') }, {
    response: { 200: 'RichMenuAliasListResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get list of rich menu alias',
      operationId: 'getRichMenuAliasList',
    },
  })
  .get('/v2/bot/user/:userId/richmenu', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRichMenuIdOfUserParams,
    response: { 200: 'RichMenuIdResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get rich menu ID of user',
      operationId: 'getRichMenuIdOfUser',
    },
  })
  .delete('/v2/bot/user/:userId/richmenu', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.unlinkRichMenuIdFromUserParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Unlink rich menu from user',
      operationId: 'unlinkRichMenuIdFromUser',
    },
  })
  .post('/v2/bot/user/:userId/richmenu/:richMenuId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.linkRichMenuIdToUserParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Link rich menu to user.',
      operationId: 'linkRichMenuIdToUser',
    },
  })
  .post('/v2/bot/richmenu/bulk/link', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RichMenuBulkLinkRequest',
    response: { 202: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Link rich menu to multiple users',
      operationId: 'linkRichMenuIdToUsers',
    },
  })
  .post('/v2/bot/richmenu/bulk/unlink', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RichMenuBulkUnlinkRequest',
    response: { 202: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Unlink rich menus from multiple users',
      operationId: 'unlinkRichMenuIdFromUsers',
    },
  })
  .post('/v2/bot/richmenu/batch', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RichMenuBatchRequest',
    response: { 202: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description:
        'You can use this endpoint to batch control the rich menu linked to the users using the endpoint such as Link rich menu to user.\nThe following operations are available:\n\n1. Replace a rich menu with another rich menu for all users linked to a specific rich menu\n2. Unlink a rich menu for all users linked to a specific rich menu\n3. Unlink a rich menu for all users linked the rich menu\n',
      operationId: 'richMenuBatch',
    },
  })
  .post('/v2/bot/richmenu/validate/batch', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RichMenuBatchRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description:
        'Validate a request body of the Replace or unlink the linked rich menus in batches endpoint.',
      operationId: 'validateRichMenuBatchRequest',
    },
  })
  .get('/v2/bot/richmenu/progress/batch', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getRichMenuBatchProgressQuery,
    response: { 200: 'RichMenuBatchProgressResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get the status of Replace or unlink a linked rich menus in batches.',
      operationId: 'getRichMenuBatchProgress',
    },
  })
  .post('/v2/bot/user/:userId/linkToken', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.issueLinkTokenParams,
    response: { 200: 'IssueLinkTokenResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Issue link token',
      operationId: 'issueLinkToken',
    },
  })
  .post('/v2/bot/message/markAsRead', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'MarkMessagesAsReadRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['messaging-api'],
      description: 'Mark messages from users as read',
      operationId: 'markMessagesAsRead',
    },
  })
  .post('/v2/bot/message/pnp/templated/push', ({ headers, body }) => { throw new Error('Not implemented') }, {
    headers: V2Model.pushTemplatedMessagesByPhoneHeaders,
    body: 'PnpTemplatedMessageRequest',
    response: { 202: t.Void(), 422: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Send LINE notification message (template)',
      operationId: 'pushTemplatedMessagesByPhone',
    },
  })
  .get('/v2/bot/message/delivery/pnp', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getPNPMessageStatisticsQuery,
    response: { 200: 'NumberOfMessagesResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of sent LINE notification messages',
      operationId: 'getPNPMessageStatistics',
    },
  })
  .get('/v2/bot/message/delivery/pnp/templated', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getPNPTemplatedMessageStatisticsQuery,
    response: { 200: 'NumberOfMessagesResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get number of sent LINE notification messages (template)',
      operationId: 'getPNPTemplatedMessageStatistics',
    },
  })
  .get('/v2/bot/membership/subscription/:userId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getMembershipSubscriptionParams,
    response: {
      200: 'GetMembershipSubscriptionResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['messaging-api'],
      description: "Get a user's membership subscription.",
      operationId: 'getMembershipSubscription',
    },
  })
  .get('/v2/bot/membership/list', () => { throw new Error('Not implemented') }, {
    response: { 200: 'MembershipListResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get a list of memberships.',
      operationId: 'getMembershipList',
    },
  })
  .get('/v2/bot/membership/:membershipId/users/ids', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: V2Model.getJoinedMembershipUsersParams,
    query: V2Model.getJoinedMembershipUsersQuery,
    response: {
      200: 'GetJoinedMembershipUsersResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['messaging-api'],
      description: 'Get a list of user IDs who joined the membership.',
      operationId: 'getJoinedMembershipUsers',
    },
  })
  .get('/v2/bot/coupon', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.listCouponQuery,
    response: { 200: 'MessagingApiPagerCouponListResponse', 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get a paginated list of coupons.',
      operationId: 'listCoupon',
    },
  })
  .post('/v2/bot/coupon', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CouponCreateRequest',
    response: { 200: 'CouponCreateResponse', 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description:
        'Create a new coupon. Define coupon details such as type, title, and validity period.',
      operationId: 'createCoupon',
    },
  })
  .get('/v2/bot/coupon/:couponId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getCouponDetailParams,
    response: { 200: 'CouponResponse', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Get coupon detail',
      operationId: 'getCouponDetail',
    },
  })
  .put('/v2/bot/coupon/:couponId/close', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.closeCouponParams,
    response: { 200: t.Void(), 400: 'ErrorResponse', 404: 'ErrorResponse', 410: 'ErrorResponse' },
    detail: { tags: ['messaging-api'], description: 'Close coupon', operationId: 'closeCoupon' },
  })
  .post('/v2/bot/chat/loading/start', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ShowLoadingAnimationRequest',
    response: { 202: 'ShowLoadingAnimationResponse', 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description:
        'Display a loading animation in one-on-one chats between users and LINE Official Accounts.',
      operationId: 'showLoadingAnimation',
    },
  })
  .post('/v2/bot/chat/markAsRead', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'MarkMessagesAsReadByTokenRequest',
    response: { 200: t.Void(), 400: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Mark messages from users as read by token',
      operationId: 'markMessagesAsReadByToken',
    },
  })
