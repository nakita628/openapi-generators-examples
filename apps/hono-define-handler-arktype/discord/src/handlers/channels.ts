import { Hono } from 'hono'
import {
  getChannelsChannelIdHandler,
  deleteChannelsChannelIdHandler,
  patchChannelsChannelIdHandler,
  postChannelsChannelIdFollowersHandler,
  getChannelsChannelIdInvitesHandler,
  postChannelsChannelIdInvitesHandler,
  getChannelsChannelIdMessagesHandler,
  postChannelsChannelIdMessagesHandler,
  postChannelsChannelIdMessagesBulkDeleteHandler,
  getChannelsChannelIdMessagesPinsHandler,
  putChannelsChannelIdMessagesPinsMessageIdHandler,
  deleteChannelsChannelIdMessagesPinsMessageIdHandler,
  getChannelsChannelIdMessagesMessageIdHandler,
  deleteChannelsChannelIdMessagesMessageIdHandler,
  patchChannelsChannelIdMessagesMessageIdHandler,
  postChannelsChannelIdMessagesMessageIdCrosspostHandler,
  deleteChannelsChannelIdMessagesMessageIdReactionsHandler,
  getChannelsChannelIdMessagesMessageIdReactionsEmojiNameHandler,
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameHandler,
  putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeHandler,
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeHandler,
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdHandler,
  postChannelsChannelIdMessagesMessageIdThreadsHandler,
  getChannelsChannelIdPermissionsMemberUserIdHandler,
  getChannelsChannelIdPermissionsRoleRoleIdHandler,
  putChannelsChannelIdPermissionsOverwriteIdHandler,
  deleteChannelsChannelIdPermissionsOverwriteIdHandler,
  getChannelsChannelIdPinsHandler,
  putChannelsChannelIdPinsMessageIdHandler,
  deleteChannelsChannelIdPinsMessageIdHandler,
  getChannelsChannelIdPollsMessageIdAnswersAnswerIdHandler,
  postChannelsChannelIdPollsMessageIdExpireHandler,
  putChannelsChannelIdRecipientsUserIdHandler,
  deleteChannelsChannelIdRecipientsUserIdHandler,
  postChannelsChannelIdSendSoundboardSoundHandler,
  getChannelsChannelIdThreadMembersHandler,
  putChannelsChannelIdThreadMembersMeHandler,
  deleteChannelsChannelIdThreadMembersMeHandler,
  getChannelsChannelIdThreadMembersUserIdHandler,
  putChannelsChannelIdThreadMembersUserIdHandler,
  deleteChannelsChannelIdThreadMembersUserIdHandler,
  postChannelsChannelIdThreadsHandler,
  getChannelsChannelIdThreadsArchivedPrivateHandler,
  getChannelsChannelIdThreadsArchivedPublicHandler,
  getChannelsChannelIdThreadsSearchHandler,
  postChannelsChannelIdTypingHandler,
  getChannelsChannelIdUsersMeThreadsArchivedPrivateHandler,
  putChannelsChannelIdVoiceStatusHandler,
  getChannelsChannelIdWebhooksHandler,
  postChannelsChannelIdWebhooksHandler,
} from '../routes'

export const channelsHandler = new Hono()
  .get(
    '/channels/:channel_id',
    getChannelsChannelIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id',
    deleteChannelsChannelIdHandler(async (c, { param }) => {}),
  )
  .patch(
    '/channels/:channel_id',
    patchChannelsChannelIdHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/channels/:channel_id/followers',
    postChannelsChannelIdFollowersHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/channels/:channel_id/invites',
    getChannelsChannelIdInvitesHandler(async (c, { param }) => {}),
  )
  .post(
    '/channels/:channel_id/invites',
    postChannelsChannelIdInvitesHandler(async (c, { param, form, json }) => {}),
  )
  .get(
    '/channels/:channel_id/messages',
    getChannelsChannelIdMessagesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/channels/:channel_id/messages',
    postChannelsChannelIdMessagesHandler(async (c, { param, form, json }) => {}),
  )
  .post(
    '/channels/:channel_id/messages/bulk-delete',
    postChannelsChannelIdMessagesBulkDeleteHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/channels/:channel_id/messages/pins',
    getChannelsChannelIdMessagesPinsHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/channels/:channel_id/messages/pins/:message_id',
    putChannelsChannelIdMessagesPinsMessageIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/messages/pins/:message_id',
    deleteChannelsChannelIdMessagesPinsMessageIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/channels/:channel_id/messages/:message_id',
    getChannelsChannelIdMessagesMessageIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/messages/:message_id',
    deleteChannelsChannelIdMessagesMessageIdHandler(async (c, { param }) => {}),
  )
  .patch(
    '/channels/:channel_id/messages/:message_id',
    patchChannelsChannelIdMessagesMessageIdHandler(async (c, { param, form, json }) => {}),
  )
  .post(
    '/channels/:channel_id/messages/:message_id/crosspost',
    postChannelsChannelIdMessagesMessageIdCrosspostHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions',
    deleteChannelsChannelIdMessagesMessageIdReactionsHandler(async (c, { param }) => {}),
  )
  .get(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    getChannelsChannelIdMessagesMessageIdReactionsEmojiNameHandler(
      async (c, { param, query }) => {},
    ),
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameHandler(async (c, { param }) => {}),
  )
  .put(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
    deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdHandler(
      async (c, { param }) => {},
    ),
  )
  .post(
    '/channels/:channel_id/messages/:message_id/threads',
    postChannelsChannelIdMessagesMessageIdThreadsHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/channels/:channel_id/permissions/member/:user_id',
    getChannelsChannelIdPermissionsMemberUserIdHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/channels/:channel_id/permissions/role/:role_id',
    getChannelsChannelIdPermissionsRoleRoleIdHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/channels/:channel_id/permissions/:overwrite_id',
    putChannelsChannelIdPermissionsOverwriteIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/channels/:channel_id/permissions/:overwrite_id',
    deleteChannelsChannelIdPermissionsOverwriteIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/channels/:channel_id/pins',
    getChannelsChannelIdPinsHandler(async (c, { param }) => {}),
  )
  .put(
    '/channels/:channel_id/pins/:message_id',
    putChannelsChannelIdPinsMessageIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/pins/:message_id',
    deleteChannelsChannelIdPinsMessageIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/channels/:channel_id/polls/:message_id/answers/:answer_id',
    getChannelsChannelIdPollsMessageIdAnswersAnswerIdHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/channels/:channel_id/polls/:message_id/expire',
    postChannelsChannelIdPollsMessageIdExpireHandler(async (c, { param }) => {}),
  )
  .put(
    '/channels/:channel_id/recipients/:user_id',
    putChannelsChannelIdRecipientsUserIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/channels/:channel_id/recipients/:user_id',
    deleteChannelsChannelIdRecipientsUserIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/channels/:channel_id/send-soundboard-sound',
    postChannelsChannelIdSendSoundboardSoundHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/channels/:channel_id/thread-members',
    getChannelsChannelIdThreadMembersHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/channels/:channel_id/thread-members/@me',
    putChannelsChannelIdThreadMembersMeHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/thread-members/@me',
    deleteChannelsChannelIdThreadMembersMeHandler(async (c, { param }) => {}),
  )
  .get(
    '/channels/:channel_id/thread-members/:user_id',
    getChannelsChannelIdThreadMembersUserIdHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/channels/:channel_id/thread-members/:user_id',
    putChannelsChannelIdThreadMembersUserIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/channels/:channel_id/thread-members/:user_id',
    deleteChannelsChannelIdThreadMembersUserIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/channels/:channel_id/threads',
    postChannelsChannelIdThreadsHandler(async (c, { param, form, json }) => {}),
  )
  .get(
    '/channels/:channel_id/threads/archived/private',
    getChannelsChannelIdThreadsArchivedPrivateHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/channels/:channel_id/threads/archived/public',
    getChannelsChannelIdThreadsArchivedPublicHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/channels/:channel_id/threads/search',
    getChannelsChannelIdThreadsSearchHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/channels/:channel_id/typing',
    postChannelsChannelIdTypingHandler(async (c, { param }) => {}),
  )
  .get(
    '/channels/:channel_id/users/@me/threads/archived/private',
    getChannelsChannelIdUsersMeThreadsArchivedPrivateHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/channels/:channel_id/voice-status',
    putChannelsChannelIdVoiceStatusHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/channels/:channel_id/webhooks',
    getChannelsChannelIdWebhooksHandler(async (c, { param }) => {}),
  )
  .post(
    '/channels/:channel_id/webhooks',
    postChannelsChannelIdWebhooksHandler(async (c, { param, json }) => {}),
  )
