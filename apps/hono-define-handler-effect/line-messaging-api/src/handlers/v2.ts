import { Hono } from 'hono'
import {
  getV2BotChannelWebhookEndpointHandler,
  putV2BotChannelWebhookEndpointHandler,
  postV2BotChannelWebhookTestHandler,
  getV2BotMessageMessageIdContentHandler,
  getV2BotMessageMessageIdContentPreviewHandler,
  getV2BotMessageMessageIdContentTranscodingHandler,
  postV2BotMessageReplyHandler,
  postV2BotMessagePushHandler,
  postV2BotMessageMulticastHandler,
  postV2BotMessageNarrowcastHandler,
  getV2BotMessageProgressNarrowcastHandler,
  postV2BotMessageBroadcastHandler,
  getV2BotMessageQuotaHandler,
  getV2BotMessageQuotaConsumptionHandler,
  getV2BotMessageDeliveryReplyHandler,
  getV2BotMessageDeliveryPushHandler,
  getV2BotMessageDeliveryMulticastHandler,
  getV2BotMessageDeliveryBroadcastHandler,
  postV2BotMessageValidateReplyHandler,
  postV2BotMessageValidatePushHandler,
  postV2BotMessageValidateMulticastHandler,
  postV2BotMessageValidateNarrowcastHandler,
  postV2BotMessageValidateBroadcastHandler,
  getV2BotMessageAggregationInfoHandler,
  getV2BotMessageAggregationListHandler,
  getV2BotProfileUserIdHandler,
  getV2BotFollowersIdsHandler,
  getV2BotInfoHandler,
  getV2BotGroupGroupIdMemberUserIdHandler,
  getV2BotRoomRoomIdMemberUserIdHandler,
  getV2BotGroupGroupIdMembersIdsHandler,
  getV2BotRoomRoomIdMembersIdsHandler,
  postV2BotGroupGroupIdLeaveHandler,
  postV2BotRoomRoomIdLeaveHandler,
  getV2BotGroupGroupIdSummaryHandler,
  getV2BotGroupGroupIdMembersCountHandler,
  getV2BotRoomRoomIdMembersCountHandler,
  postV2BotRichmenuHandler,
  postV2BotRichmenuValidateHandler,
  getV2BotRichmenuRichMenuIdContentHandler,
  postV2BotRichmenuRichMenuIdContentHandler,
  getV2BotRichmenuRichMenuIdHandler,
  deleteV2BotRichmenuRichMenuIdHandler,
  getV2BotRichmenuListHandler,
  postV2BotUserAllRichmenuRichMenuIdHandler,
  getV2BotUserAllRichmenuHandler,
  deleteV2BotUserAllRichmenuHandler,
  postV2BotRichmenuAliasHandler,
  getV2BotRichmenuAliasRichMenuAliasIdHandler,
  postV2BotRichmenuAliasRichMenuAliasIdHandler,
  deleteV2BotRichmenuAliasRichMenuAliasIdHandler,
  getV2BotRichmenuAliasListHandler,
  getV2BotUserUserIdRichmenuHandler,
  deleteV2BotUserUserIdRichmenuHandler,
  postV2BotUserUserIdRichmenuRichMenuIdHandler,
  postV2BotRichmenuBulkLinkHandler,
  postV2BotRichmenuBulkUnlinkHandler,
  postV2BotRichmenuBatchHandler,
  postV2BotRichmenuValidateBatchHandler,
  getV2BotRichmenuProgressBatchHandler,
  postV2BotUserUserIdLinkTokenHandler,
  postV2BotMessageMarkAsReadHandler,
  postV2BotMessagePnpTemplatedPushHandler,
  getV2BotMessageDeliveryPnpHandler,
  getV2BotMessageDeliveryPnpTemplatedHandler,
  getV2BotMembershipSubscriptionUserIdHandler,
  getV2BotMembershipListHandler,
  getV2BotMembershipMembershipIdUsersIdsHandler,
  getV2BotCouponHandler,
  postV2BotCouponHandler,
  getV2BotCouponCouponIdHandler,
  putV2BotCouponCouponIdCloseHandler,
  postV2BotChatLoadingStartHandler,
  postV2BotChatMarkAsReadHandler,
} from '../routes'

export const v2Handler = new Hono()
  .get(
    '/v2/bot/channel/webhook/endpoint',
    getV2BotChannelWebhookEndpointHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .put(
    '/v2/bot/channel/webhook/endpoint',
    putV2BotChannelWebhookEndpointHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/channel/webhook/test',
    postV2BotChannelWebhookTestHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/:messageId/content',
    getV2BotMessageMessageIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/:messageId/content/preview',
    getV2BotMessageMessageIdContentPreviewHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/:messageId/content/transcoding',
    getV2BotMessageMessageIdContentTranscodingHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/reply',
    postV2BotMessageReplyHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/push',
    postV2BotMessagePushHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/multicast',
    postV2BotMessageMulticastHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/narrowcast',
    postV2BotMessageNarrowcastHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/progress/narrowcast',
    getV2BotMessageProgressNarrowcastHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/broadcast',
    postV2BotMessageBroadcastHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/quota',
    getV2BotMessageQuotaHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/quota/consumption',
    getV2BotMessageQuotaConsumptionHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/delivery/reply',
    getV2BotMessageDeliveryReplyHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/delivery/push',
    getV2BotMessageDeliveryPushHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/delivery/multicast',
    getV2BotMessageDeliveryMulticastHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/delivery/broadcast',
    getV2BotMessageDeliveryBroadcastHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/validate/reply',
    postV2BotMessageValidateReplyHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/validate/push',
    postV2BotMessageValidatePushHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/validate/multicast',
    postV2BotMessageValidateMulticastHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/validate/narrowcast',
    postV2BotMessageValidateNarrowcastHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/validate/broadcast',
    postV2BotMessageValidateBroadcastHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/aggregation/info',
    getV2BotMessageAggregationInfoHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/aggregation/list',
    getV2BotMessageAggregationListHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/profile/:userId',
    getV2BotProfileUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/followers/ids',
    getV2BotFollowersIdsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/info',
    getV2BotInfoHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/group/:groupId/member/:userId',
    getV2BotGroupGroupIdMemberUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/room/:roomId/member/:userId',
    getV2BotRoomRoomIdMemberUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/group/:groupId/members/ids',
    getV2BotGroupGroupIdMembersIdsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/room/:roomId/members/ids',
    getV2BotRoomRoomIdMembersIdsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/group/:groupId/leave',
    postV2BotGroupGroupIdLeaveHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/room/:roomId/leave',
    postV2BotRoomRoomIdLeaveHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/group/:groupId/summary',
    getV2BotGroupGroupIdSummaryHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/group/:groupId/members/count',
    getV2BotGroupGroupIdMembersCountHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/room/:roomId/members/count',
    getV2BotRoomRoomIdMembersCountHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu',
    postV2BotRichmenuHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/validate',
    postV2BotRichmenuValidateHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/richmenu/:richMenuId/content',
    getV2BotRichmenuRichMenuIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/:richMenuId/content',
    postV2BotRichmenuRichMenuIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/richmenu/:richMenuId',
    getV2BotRichmenuRichMenuIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v2/bot/richmenu/:richMenuId',
    deleteV2BotRichmenuRichMenuIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/richmenu/list',
    getV2BotRichmenuListHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/user/all/richmenu/:richMenuId',
    postV2BotUserAllRichmenuRichMenuIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/user/all/richmenu',
    getV2BotUserAllRichmenuHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v2/bot/user/all/richmenu',
    deleteV2BotUserAllRichmenuHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/alias',
    postV2BotRichmenuAliasHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    getV2BotRichmenuAliasRichMenuAliasIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    postV2BotRichmenuAliasRichMenuAliasIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v2/bot/richmenu/alias/:richMenuAliasId',
    deleteV2BotRichmenuAliasRichMenuAliasIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/richmenu/alias/list',
    getV2BotRichmenuAliasListHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/user/:userId/richmenu',
    getV2BotUserUserIdRichmenuHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v2/bot/user/:userId/richmenu',
    deleteV2BotUserUserIdRichmenuHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/user/:userId/richmenu/:richMenuId',
    postV2BotUserUserIdRichmenuRichMenuIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/bulk/link',
    postV2BotRichmenuBulkLinkHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/bulk/unlink',
    postV2BotRichmenuBulkUnlinkHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/batch',
    postV2BotRichmenuBatchHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/richmenu/validate/batch',
    postV2BotRichmenuValidateBatchHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/richmenu/progress/batch',
    getV2BotRichmenuProgressBatchHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/user/:userId/linkToken',
    postV2BotUserUserIdLinkTokenHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/markAsRead',
    postV2BotMessageMarkAsReadHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/message/pnp/templated/push',
    postV2BotMessagePnpTemplatedPushHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/delivery/pnp',
    getV2BotMessageDeliveryPnpHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/message/delivery/pnp/templated',
    getV2BotMessageDeliveryPnpTemplatedHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/membership/subscription/:userId',
    getV2BotMembershipSubscriptionUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/membership/list',
    getV2BotMembershipListHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/membership/:membershipId/users/ids',
    getV2BotMembershipMembershipIdUsersIdsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/coupon',
    getV2BotCouponHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/coupon',
    postV2BotCouponHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/coupon/:couponId',
    getV2BotCouponCouponIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/v2/bot/coupon/:couponId/close',
    putV2BotCouponCouponIdCloseHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/chat/loading/start',
    postV2BotChatLoadingStartHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/chat/markAsRead',
    postV2BotChatMarkAsReadHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
