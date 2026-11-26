import { t, type UnwrapSchema } from 'elysia'

export const V2Model = {
  getMessageContentParams: t.Object({ messageId: t.String() }),
  getMessageContentPreviewParams: t.Object({ messageId: t.String() }),
  getMessageContentTranscodingByMessageIdParams: t.Object({ messageId: t.String() }),
  pushMessageHeaders: t.Object({ 'x-line-retry-key': t.Optional(t.String({ format: 'uuid' })) }),
  multicastHeaders: t.Object({ 'x-line-retry-key': t.Optional(t.String({ format: 'uuid' })) }),
  narrowcastHeaders: t.Object({ 'x-line-retry-key': t.Optional(t.String({ format: 'uuid' })) }),
  getNarrowcastProgressQuery: t.Object({ requestId: t.String() }),
  broadcastHeaders: t.Object({ 'x-line-retry-key': t.Optional(t.String({ format: 'uuid' })) }),
  getNumberOfSentReplyMessagesQuery: t.Object({ date: t.String() }),
  getNumberOfSentPushMessagesQuery: t.Object({ date: t.String() }),
  getNumberOfSentMulticastMessagesQuery: t.Object({ date: t.String() }),
  getNumberOfSentBroadcastMessagesQuery: t.Object({ date: t.String() }),
  getAggregationUnitNameListQuery: t.Object({
    limit: t.Optional(t.String()),
    start: t.Optional(t.String()),
  }),
  getProfileParams: t.Object({ userId: t.String() }),
  getFollowersQuery: t.Object({
    start: t.Optional(t.String()),
    limit: t.Optional(
      t.Integer({ format: 'int32', minimum: -2147483648, maximum: 1000, default: 300 }),
    ),
  }),
  getGroupMemberProfileParams: t.Object({ groupId: t.String(), userId: t.String() }),
  getRoomMemberProfileParams: t.Object({ roomId: t.String(), userId: t.String() }),
  getGroupMembersIdsParams: t.Object({ groupId: t.String() }),
  getGroupMembersIdsQuery: t.Object({ start: t.Optional(t.String()) }),
  getRoomMembersIdsParams: t.Object({ roomId: t.String() }),
  getRoomMembersIdsQuery: t.Object({ start: t.Optional(t.String()) }),
  leaveGroupParams: t.Object({ groupId: t.String() }),
  leaveRoomParams: t.Object({ roomId: t.String() }),
  getGroupSummaryParams: t.Object({ groupId: t.String() }),
  getGroupMemberCountParams: t.Object({ groupId: t.String() }),
  getRoomMemberCountParams: t.Object({ roomId: t.String() }),
  getRichMenuImageParams: t.Object({ richMenuId: t.String() }),
  setRichMenuImageParams: t.Object({ richMenuId: t.String() }),
  getRichMenuParams: t.Object({ richMenuId: t.String() }),
  deleteRichMenuParams: t.Object({ richMenuId: t.String() }),
  setDefaultRichMenuParams: t.Object({ richMenuId: t.String() }),
  getRichMenuAliasParams: t.Object({ richMenuAliasId: t.String() }),
  updateRichMenuAliasParams: t.Object({ richMenuAliasId: t.String() }),
  deleteRichMenuAliasParams: t.Object({ richMenuAliasId: t.String() }),
  getRichMenuIdOfUserParams: t.Object({ userId: t.String() }),
  unlinkRichMenuIdFromUserParams: t.Object({ userId: t.String() }),
  linkRichMenuIdToUserParams: t.Object({ userId: t.String(), richMenuId: t.String() }),
  getRichMenuBatchProgressQuery: t.Object({ requestId: t.String() }),
  issueLinkTokenParams: t.Object({ userId: t.String() }),
  pushTemplatedMessagesByPhoneHeaders: t.Object({
    'x-line-delivery-tag': t.Optional(t.String({ minLength: 16, maxLength: 100 })),
  }),
  getPNPMessageStatisticsQuery: t.Object({ date: t.String({ pattern: '^[0-9]{8}$' }) }),
  getPNPTemplatedMessageStatisticsQuery: t.Object({ date: t.String({ pattern: '^[0-9]{8}$' }) }),
  getMembershipSubscriptionParams: t.Object({ userId: t.String() }),
  getJoinedMembershipUsersParams: t.Object({
    membershipId: t.Integer({ maximum: 9007199254740991 }),
  }),
  getJoinedMembershipUsersQuery: t.Object({
    start: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ format: 'int32', minimum: 1, maximum: 1000, default: 300 })),
  }),
  listCouponQuery: t.Object({
    status: t.Optional(
      t.Array(t.UnionEnum(['DRAFT', 'RUNNING', 'CLOSED'], { default: undefined }), {
        uniqueItems: true,
      }),
    ),
    start: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ format: 'int32', minimum: 1, maximum: 100, default: 20 })),
  }),
  getCouponDetailParams: t.Object({ couponId: t.String() }),
  closeCouponParams: t.Object({ couponId: t.String() }),
} as const

export type V2Model = { [k in keyof typeof V2Model]: UnwrapSchema<(typeof V2Model)[k]> }
