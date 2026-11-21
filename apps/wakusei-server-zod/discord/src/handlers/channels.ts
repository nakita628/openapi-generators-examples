import { os } from '@orpc/server'
import * as z from 'zod'
import {
  ActionRowComponentForMessageRequestSchema,
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwritesSchema,
  ContainerComponentForMessageRequestSchema,
  CreatedThreadResponseSchema,
  CustomClientThemeShareRequestSchema,
  FileComponentForMessageRequestSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildChannelResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  MediaGalleryComponentForMessageRequestSchema,
  MessageAllowedMentionsRequestSchema,
  MessageAttachmentRequestSchema,
  MessageReferenceRequestSchema,
  MessageResponseSchema,
  PermissionsResponseSchema,
  PinnedMessagesResponseSchema,
  PollAnswerDetailsResponseSchema,
  PollCreateRequestSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  ReactionTypesSchema,
  RichEmbedSchema,
  SectionComponentForMessageRequestSchema,
  SeparatorComponentForMessageRequestSchema,
  SnowflakeTypeSchema,
  SortingOrderSchema,
  TextDisplayComponentForMessageRequestSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadMemberResponseSchema,
  ThreadResponseSchema,
  ThreadSearchResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortingModeSchema,
  ThreadsResponseSchema,
  TypingIndicatorResponseSchema,
  UserResponseSchema,
} from '../components'

export const getChannelsChannelId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}',
    successDescription: '200 response for get_channel',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
      GuildChannelResponseSchema,
      PrivateChannelResponseSchema,
      PrivateGroupChannelResponseSchema,
      ThreadResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}',
    successDescription: '200 response for delete_channel',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
      GuildChannelResponseSchema,
      PrivateChannelResponseSchema,
      PrivateGroupChannelResponseSchema,
      ThreadResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchChannelsChannelId = os
  .route({
    method: 'PATCH',
    path: '/channels/{channel_id}',
    successDescription: '200 response for update_channel',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
      GuildChannelResponseSchema,
      PrivateChannelResponseSchema,
      PrivateGroupChannelResponseSchema,
      ThreadResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdFollowers = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/followers',
    successDescription: '200 response for follow_channel',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
  .output(ChannelFollowerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdInvites = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/invites',
    successDescription: '200 response for list_channel_invites',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    z
      .array(
        z.xor([
          FriendInviteResponseSchema,
          GroupDMInviteResponseSchema,
          GuildInviteResponseSchema,
          z.null().nullable(),
        ]),
      )
      .nullable(),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdInvites = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/invites',
    successDescription: '200 response for create_channel_invite',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessages = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages',
    successDescription: '200 response for list_messages',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      around: SnowflakeTypeSchema.exactOptional(),
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z.coerce.number().int().min(1).max(100).exactOptional(),
    }),
  )
  .output(z.array(MessageResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdMessages = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/messages',
    successDescription: '200 response for create_message',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      content: z.string().max(4000).nullable().exactOptional(),
      embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
      allowed_mentions: z
        .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
        .exactOptional(),
      sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
      components: z
        .array(
          z.xor([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        )
        .max(40)
        .nullable()
        .exactOptional(),
      flags: z.int().nullable().exactOptional(),
      attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
      poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
      shared_client_theme: z
        .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
        .exactOptional(),
      message_reference: z
        .xor([z.null().nullable(), MessageReferenceRequestSchema])
        .exactOptional(),
      nonce: z
        .xor([
          z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
          z.string().max(25),
          z.null().nullable(),
        ])
        .exactOptional(),
      enforce_nonce: z.boolean().nullable().exactOptional(),
      tts: z.boolean().nullable().exactOptional(),
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdMessagesBulkDelete = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/messages/bulk-delete',
    successStatus: 204,
    successDescription: '204 response for bulk_delete_messages',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      messages: z
        .array(SnowflakeTypeSchema)
        .min(2)
        .max(100)
        .refine((val) => new Set(val).size === val.length),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesPins = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/pins',
    successDescription: '200 response for list_pins',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      before: z.iso.datetime({ offset: true }).exactOptional(),
      limit: z.coerce.number().int().min(1).max(50).exactOptional(),
    }),
  )
  .output(PinnedMessagesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdMessagesPinsMessageId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/messages/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for create_pin',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesPinsMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_pin',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/{message_id}',
    successDescription: '200 response for get_message',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_message',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'PATCH',
    path: '/channels/{channel_id}/messages/{message_id}',
    successDescription: '200 response for update_message',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      content: z.string().max(4000).nullable().exactOptional(),
      embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
      flags: z.int().nullable().exactOptional(),
      allowed_mentions: z
        .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
        .exactOptional(),
      sticker_ids: z.array(SnowflakeTypeSchema).max(1521).nullable().exactOptional(),
      components: z
        .array(
          z.xor([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        )
        .max(40)
        .nullable()
        .exactOptional(),
      attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdMessagesMessageIdCrosspost = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/messages/{message_id}/crosspost',
    successDescription: '200 response for crosspost_message',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactions = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions',
    successStatus: 204,
    successDescription: '204 response for delete_all_message_reactions',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesMessageIdReactionsEmojiName = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    successDescription: '200 response for list_message_reactions_by_emoji',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: z.string().max(152133),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      type: ReactionTypesSchema.exactOptional(),
    }),
  )
  .output(z.array(UserResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    successStatus: 204,
    successDescription: '204 response for delete_all_message_reactions_by_emoji',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: z.string().max(152133),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    successStatus: 204,
    successDescription: '204 response for add_my_message_reaction',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: z.string().max(152133),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    successStatus: 204,
    successDescription: '204 response for delete_my_message_reaction',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: z.string().max(152133),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_user_message_reaction',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: z.string().max(152133),
      user_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdMessagesMessageIdThreads = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/messages/{message_id}/threads',
    successStatus: 201,
    successDescription: '201 response for create_thread_from_message',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(100),
      auto_archive_duration: z
        .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
        .exactOptional(),
      rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
    }),
  )
  .output(ThreadResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPermissionsMemberUserId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/permissions/member/{user_id}',
    description:
      "Returns the fully cascaded permissions for a member in this channel, applying their roles and the channel's permission overwrites.",
    successDescription: '200 response for get_channel_member_permissions',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      implicit: z.stringbool().exactOptional(),
    }),
  )
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPermissionsRoleRoleId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/permissions/role/{role_id}',
    description:
      "Returns the permissions a role grants in this channel, applying the channel's permission overwrites on top of the role's guild-level permissions.",
    successDescription: '200 response for get_channel_role_permissions',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
      implicit: z.stringbool().exactOptional(),
    }),
  )
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdPermissionsOverwriteId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/permissions/{overwrite_id}',
    successStatus: 204,
    successDescription: '204 response for set_channel_permission_overwrite',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      overwrite_id: SnowflakeTypeSchema,
      type: z.xor([z.null().nullable(), ChannelPermissionOverwritesSchema]).exactOptional(),
      allow: z.int().nullable().exactOptional(),
      deny: z.int().nullable().exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdPermissionsOverwriteId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/permissions/{overwrite_id}',
    successStatus: 204,
    successDescription: '204 response for delete_channel_permission_overwrite',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPins = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/pins',
    successDescription: '200 response for deprecated_list_pins',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(z.array(MessageResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdPinsMessageId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for deprecated_create_pin',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdPinsMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for deprecated_delete_pin',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPollsMessageIdAnswersAnswerId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
    successDescription: '200 response for get_answer_voters',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      answer_id: z.coerce.number().pipe(z.int32().min(1).max(10)),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z.coerce.number().int().min(1).max(100).exactOptional(),
    }),
  )
  .output(PollAnswerDetailsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdPollsMessageIdExpire = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/polls/{message_id}/expire',
    successDescription: '200 response for poll_expire',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdRecipientsUserId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/recipients/{user_id}',
    successStatus: 201,
    successDescription: '201 response for add_group_dm_user',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      access_token: z.string().max(152133).nullable().exactOptional(),
      nick: z.string().max(152133).nullable().exactOptional(),
    }),
  )
  .output(z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdRecipientsUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/recipients/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_group_dm_user',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdSendSoundboardSound = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/send-soundboard-sound',
    successStatus: 204,
    successDescription: '204 response for send_soundboard_sound',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      sound_id: SnowflakeTypeSchema,
      source_guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadMembers = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/thread-members',
    successDescription: '200 response for list_thread_members',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      with_member: z.stringbool().exactOptional(),
      limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(z.array(ThreadMemberResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdThreadMembersMe = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/thread-members/@me',
    successStatus: 204,
    successDescription: '204 response for join_thread',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdThreadMembersMe = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/thread-members/@me',
    successStatus: 204,
    successDescription: '204 response for leave_thread',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successDescription: '200 response for get_thread_member',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      with_member: z.stringbool().exactOptional(),
    }),
  )
  .output(ThreadMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for add_thread_member',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_thread_member',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdThreads = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/threads',
    successStatus: 201,
    successDescription: '201 response for create_thread',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(CreatedThreadResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadsArchivedPrivate = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/threads/archived/private',
    successDescription: '200 response for list_private_archived_threads',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      before: z.iso.datetime({ offset: true }).exactOptional(),
      limit: z.coerce.number().int().min(2).max(100).exactOptional(),
    }),
  )
  .output(ThreadsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadsArchivedPublic = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/threads/archived/public',
    successDescription: '200 response for list_public_archived_threads',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      before: z.iso.datetime({ offset: true }).exactOptional(),
      limit: z.coerce.number().int().min(2).max(100).exactOptional(),
    }),
  )
  .output(ThreadsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadsSearch = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/threads/search',
    successDescription: '200 response for thread_search',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      name: z.string().max(100).exactOptional(),
      slop: z.coerce.number().int().min(0).max(100).exactOptional(),
      min_id: SnowflakeTypeSchema.exactOptional(),
      max_id: SnowflakeTypeSchema.exactOptional(),
      tag: z
        .union([
          z.string(),
          z.preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(SnowflakeTypeSchema)
              .max(20)
              .refine((val) => new Set(val).size === val.length),
          ),
        ])
        .exactOptional(),
      tag_setting: ThreadSearchTagSettingSchema.exactOptional(),
      archived: z.stringbool().exactOptional(),
      sort_by: ThreadSortingModeSchema.exactOptional(),
      sort_order: SortingOrderSchema.exactOptional(),
      limit: z.coerce.number().int().min(1).max(25).exactOptional(),
      offset: z.coerce.number().int().min(0).max(9975).exactOptional(),
    }),
  )
  .output(ThreadSearchResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdTyping = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/typing',
    successDescription: '200 response for trigger_typing_indicator',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(TypingIndicatorResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdUsersMeThreadsArchivedPrivate = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/users/@me/threads/archived/private',
    successDescription: '200 response for list_my_private_archived_threads',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      before: SnowflakeTypeSchema.exactOptional(),
      limit: z.coerce.number().int().min(2).max(100).exactOptional(),
    }),
  )
  .output(ThreadsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdVoiceStatus = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/voice-status',
    description: "Set a voice channel's status.",
    successStatus: 204,
    successDescription: '204 response for update_voice_channel_status',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      status: z
        .string()
        .max(500)
        .nullable()
        .meta({ description: 'The new voice channel status' })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdWebhooks = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/webhooks',
    successDescription: '200 response for list_channel_webhooks',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    z
      .array(
        z.xor([
          ApplicationIncomingWebhookResponseSchema,
          ChannelFollowerWebhookResponseSchema,
          GuildIncomingWebhookResponseSchema,
        ]),
      )
      .nullable(),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdWebhooks = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/webhooks',
    successDescription: '200 response for create_webhook',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(80),
      avatar: z.string().nullable().exactOptional(),
    }),
  )
  .output(GuildIncomingWebhookResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
