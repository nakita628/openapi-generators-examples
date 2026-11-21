import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getChannelsChannelId = os.getChannelsChannelId.handler(async ({ input }) => {})
export const deleteChannelsChannelId = os.deleteChannelsChannelId.handler(async ({ input }) => {})
export const patchChannelsChannelId = os.patchChannelsChannelId.handler(async ({ input }) => {})
export const postChannelsChannelIdFollowers = os.postChannelsChannelIdFollowers.handler(
  async ({ input }) => {},
)
export const getChannelsChannelIdInvites = os.getChannelsChannelIdInvites.handler(
  async ({ input }) => {},
)
export const postChannelsChannelIdInvites = os.postChannelsChannelIdInvites.handler(
  async ({ input }) => {},
)
export const getChannelsChannelIdMessages = os.getChannelsChannelIdMessages.handler(
  async ({ input }) => {},
)
export const postChannelsChannelIdMessages = os.postChannelsChannelIdMessages.handler(
  async ({ input }) => {},
)
export const postChannelsChannelIdMessagesBulkDelete =
  os.postChannelsChannelIdMessagesBulkDelete.handler(async ({ input }) => {})
export const getChannelsChannelIdMessagesPins = os.getChannelsChannelIdMessagesPins.handler(
  async ({ input }) => {},
)
export const putChannelsChannelIdMessagesPinsMessageId =
  os.putChannelsChannelIdMessagesPinsMessageId.handler(async ({ input }) => {})
export const deleteChannelsChannelIdMessagesPinsMessageId =
  os.deleteChannelsChannelIdMessagesPinsMessageId.handler(async ({ input }) => {})
export const getChannelsChannelIdMessagesMessageId =
  os.getChannelsChannelIdMessagesMessageId.handler(async ({ input }) => {})
export const deleteChannelsChannelIdMessagesMessageId =
  os.deleteChannelsChannelIdMessagesMessageId.handler(async ({ input }) => {})
export const patchChannelsChannelIdMessagesMessageId =
  os.patchChannelsChannelIdMessagesMessageId.handler(async ({ input }) => {})
export const postChannelsChannelIdMessagesMessageIdCrosspost =
  os.postChannelsChannelIdMessagesMessageIdCrosspost.handler(async ({ input }) => {})
export const deleteChannelsChannelIdMessagesMessageIdReactions =
  os.deleteChannelsChannelIdMessagesMessageIdReactions.handler(async ({ input }) => {})
export const getChannelsChannelIdMessagesMessageIdReactionsEmojiName =
  os.getChannelsChannelIdMessagesMessageIdReactionsEmojiName.handler(async ({ input }) => {})
export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName =
  os.deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName.handler(async ({ input }) => {})
export const putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe =
  os.putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe.handler(async ({ input }) => {})
export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe =
  os.deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe.handler(async ({ input }) => {})
export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId =
  os.deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId.handler(
    async ({ input }) => {},
  )
export const postChannelsChannelIdMessagesMessageIdThreads =
  os.postChannelsChannelIdMessagesMessageIdThreads.handler(async ({ input }) => {})
export const getChannelsChannelIdPermissionsMemberUserId =
  os.getChannelsChannelIdPermissionsMemberUserId.handler(async ({ input }) => {})
export const getChannelsChannelIdPermissionsRoleRoleId =
  os.getChannelsChannelIdPermissionsRoleRoleId.handler(async ({ input }) => {})
export const putChannelsChannelIdPermissionsOverwriteId =
  os.putChannelsChannelIdPermissionsOverwriteId.handler(async ({ input }) => {})
export const deleteChannelsChannelIdPermissionsOverwriteId =
  os.deleteChannelsChannelIdPermissionsOverwriteId.handler(async ({ input }) => {})
export const getChannelsChannelIdPins = os.getChannelsChannelIdPins.handler(async ({ input }) => {})
export const putChannelsChannelIdPinsMessageId = os.putChannelsChannelIdPinsMessageId.handler(
  async ({ input }) => {},
)
export const deleteChannelsChannelIdPinsMessageId = os.deleteChannelsChannelIdPinsMessageId.handler(
  async ({ input }) => {},
)
export const getChannelsChannelIdPollsMessageIdAnswersAnswerId =
  os.getChannelsChannelIdPollsMessageIdAnswersAnswerId.handler(async ({ input }) => {})
export const postChannelsChannelIdPollsMessageIdExpire =
  os.postChannelsChannelIdPollsMessageIdExpire.handler(async ({ input }) => {})
export const putChannelsChannelIdRecipientsUserId = os.putChannelsChannelIdRecipientsUserId.handler(
  async ({ input }) => {},
)
export const deleteChannelsChannelIdRecipientsUserId =
  os.deleteChannelsChannelIdRecipientsUserId.handler(async ({ input }) => {})
export const postChannelsChannelIdSendSoundboardSound =
  os.postChannelsChannelIdSendSoundboardSound.handler(async ({ input }) => {})
export const getChannelsChannelIdThreadMembers = os.getChannelsChannelIdThreadMembers.handler(
  async ({ input }) => {},
)
export const putChannelsChannelIdThreadMembersMe = os.putChannelsChannelIdThreadMembersMe.handler(
  async ({ input }) => {},
)
export const deleteChannelsChannelIdThreadMembersMe =
  os.deleteChannelsChannelIdThreadMembersMe.handler(async ({ input }) => {})
export const getChannelsChannelIdThreadMembersUserId =
  os.getChannelsChannelIdThreadMembersUserId.handler(async ({ input }) => {})
export const putChannelsChannelIdThreadMembersUserId =
  os.putChannelsChannelIdThreadMembersUserId.handler(async ({ input }) => {})
export const deleteChannelsChannelIdThreadMembersUserId =
  os.deleteChannelsChannelIdThreadMembersUserId.handler(async ({ input }) => {})
export const postChannelsChannelIdThreads = os.postChannelsChannelIdThreads.handler(
  async ({ input }) => {},
)
export const getChannelsChannelIdThreadsArchivedPrivate =
  os.getChannelsChannelIdThreadsArchivedPrivate.handler(async ({ input }) => {})
export const getChannelsChannelIdThreadsArchivedPublic =
  os.getChannelsChannelIdThreadsArchivedPublic.handler(async ({ input }) => {})
export const getChannelsChannelIdThreadsSearch = os.getChannelsChannelIdThreadsSearch.handler(
  async ({ input }) => {},
)
export const postChannelsChannelIdTyping = os.postChannelsChannelIdTyping.handler(
  async ({ input }) => {},
)
export const getChannelsChannelIdUsersMeThreadsArchivedPrivate =
  os.getChannelsChannelIdUsersMeThreadsArchivedPrivate.handler(async ({ input }) => {})
export const putChannelsChannelIdVoiceStatus = os.putChannelsChannelIdVoiceStatus.handler(
  async ({ input }) => {},
)
export const getChannelsChannelIdWebhooks = os.getChannelsChannelIdWebhooks.handler(
  async ({ input }) => {},
)
export const postChannelsChannelIdWebhooks = os.postChannelsChannelIdWebhooks.handler(
  async ({ input }) => {},
)
