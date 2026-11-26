import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getV2BotChannelWebhookEndpoint = os.getV2BotChannelWebhookEndpoint.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const putV2BotChannelWebhookEndpoint = os.putV2BotChannelWebhookEndpoint.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotChannelWebhookTest = os.postV2BotChannelWebhookTest.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageMessageIdContent = os.getV2BotMessageMessageIdContent.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageMessageIdContentPreview =
  os.getV2BotMessageMessageIdContentPreview.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotMessageMessageIdContentTranscoding =
  os.getV2BotMessageMessageIdContentTranscoding.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotMessageReply = os.postV2BotMessageReply.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotMessagePush = os.postV2BotMessagePush.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotMessageMulticast = os.postV2BotMessageMulticast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageNarrowcast = os.postV2BotMessageNarrowcast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageProgressNarrowcast = os.getV2BotMessageProgressNarrowcast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageBroadcast = os.postV2BotMessageBroadcast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageQuota = os.getV2BotMessageQuota.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotMessageQuotaConsumption = os.getV2BotMessageQuotaConsumption.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageDeliveryReply = os.getV2BotMessageDeliveryReply.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageDeliveryPush = os.getV2BotMessageDeliveryPush.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageDeliveryMulticast = os.getV2BotMessageDeliveryMulticast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageDeliveryBroadcast = os.getV2BotMessageDeliveryBroadcast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageValidateReply = os.postV2BotMessageValidateReply.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageValidatePush = os.postV2BotMessageValidatePush.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageValidateMulticast = os.postV2BotMessageValidateMulticast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageValidateNarrowcast = os.postV2BotMessageValidateNarrowcast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageValidateBroadcast = os.postV2BotMessageValidateBroadcast.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageAggregationInfo = os.getV2BotMessageAggregationInfo.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageAggregationList = os.getV2BotMessageAggregationList.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotProfileUserId = os.getV2BotProfileUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotFollowersIds = os.getV2BotFollowersIds.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotInfo = os.getV2BotInfo.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotGroupGroupIdMemberUserId = os.getV2BotGroupGroupIdMemberUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRoomRoomIdMemberUserId = os.getV2BotRoomRoomIdMemberUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotGroupGroupIdMembersIds = os.getV2BotGroupGroupIdMembersIds.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRoomRoomIdMembersIds = os.getV2BotRoomRoomIdMembersIds.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotGroupGroupIdLeave = os.postV2BotGroupGroupIdLeave.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRoomRoomIdLeave = os.postV2BotRoomRoomIdLeave.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotGroupGroupIdSummary = os.getV2BotGroupGroupIdSummary.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotGroupGroupIdMembersCount = os.getV2BotGroupGroupIdMembersCount.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRoomRoomIdMembersCount = os.getV2BotRoomRoomIdMembersCount.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRichmenu = os.postV2BotRichmenu.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotRichmenuValidate = os.postV2BotRichmenuValidate.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRichmenuRichMenuIdContent = os.getV2BotRichmenuRichMenuIdContent.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRichmenuRichMenuIdContent = os.postV2BotRichmenuRichMenuIdContent.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRichmenuRichMenuId = os.getV2BotRichmenuRichMenuId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteV2BotRichmenuRichMenuId = os.deleteV2BotRichmenuRichMenuId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRichmenuList = os.getV2BotRichmenuList.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotUserAllRichmenuRichMenuId = os.postV2BotUserAllRichmenuRichMenuId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotUserAllRichmenu = os.getV2BotUserAllRichmenu.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteV2BotUserAllRichmenu = os.deleteV2BotUserAllRichmenu.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRichmenuAlias = os.postV2BotRichmenuAlias.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotRichmenuAliasRichMenuAliasId = os.getV2BotRichmenuAliasRichMenuAliasId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRichmenuAliasRichMenuAliasId =
  os.postV2BotRichmenuAliasRichMenuAliasId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteV2BotRichmenuAliasRichMenuAliasId =
  os.deleteV2BotRichmenuAliasRichMenuAliasId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotRichmenuAliasList = os.getV2BotRichmenuAliasList.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotUserUserIdRichmenu = os.getV2BotUserUserIdRichmenu.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteV2BotUserUserIdRichmenu = os.deleteV2BotUserUserIdRichmenu.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotUserUserIdRichmenuRichMenuId =
  os.postV2BotUserUserIdRichmenuRichMenuId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotRichmenuBulkLink = os.postV2BotRichmenuBulkLink.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRichmenuBulkUnlink = os.postV2BotRichmenuBulkUnlink.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotRichmenuBatch = os.postV2BotRichmenuBatch.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotRichmenuValidateBatch = os.postV2BotRichmenuValidateBatch.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotRichmenuProgressBatch = os.getV2BotRichmenuProgressBatch.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotUserUserIdLinkToken = os.postV2BotUserUserIdLinkToken.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessageMarkAsRead = os.postV2BotMessageMarkAsRead.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotMessagePnpTemplatedPush = os.postV2BotMessagePnpTemplatedPush.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageDeliveryPnp = os.getV2BotMessageDeliveryPnp.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMessageDeliveryPnpTemplated = os.getV2BotMessageDeliveryPnpTemplated.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMembershipSubscriptionUserId = os.getV2BotMembershipSubscriptionUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotMembershipList = os.getV2BotMembershipList.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotMembershipMembershipIdUsersIds =
  os.getV2BotMembershipMembershipIdUsersIds.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotCoupon = os.getV2BotCoupon.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotCoupon = os.postV2BotCoupon.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotCouponCouponId = os.getV2BotCouponCouponId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const putV2BotCouponCouponIdClose = os.putV2BotCouponCouponIdClose.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotChatLoadingStart = os.postV2BotChatLoadingStart.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotChatMarkAsRead = os.postV2BotChatMarkAsRead.handler(async ({ input }) => { throw new Error('Not implemented') })
