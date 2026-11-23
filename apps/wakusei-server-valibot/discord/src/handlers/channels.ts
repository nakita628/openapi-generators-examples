import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    v.union([
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
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    v.union([
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
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    v.union([
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
  .input(v.object({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
  .output(ChannelFollowerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdInvites = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/invites',
    successDescription: '200 response for list_channel_invites',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    v.nullable(
      v.array(
        v.union([
          FriendInviteResponseSchema,
          GroupDMInviteResponseSchema,
          GuildInviteResponseSchema,
          v.null(),
        ]),
      ),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdInvites = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/invites',
    successDescription: '200 response for create_channel_invite',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessages = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages',
    successDescription: '200 response for list_messages',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      around: v.optional(SnowflakeTypeSchema),
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
    }),
  )
  .output(v.nullable(v.array(MessageResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdMessages = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/messages',
    successDescription: '200 response for create_message',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
      embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
      allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
      sticker_ids: v.optional(v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3)))),
      components: v.optional(
        v.nullable(
          v.pipe(
            v.array(
              v.union([
                ActionRowComponentForMessageRequestSchema,
                ContainerComponentForMessageRequestSchema,
                FileComponentForMessageRequestSchema,
                MediaGalleryComponentForMessageRequestSchema,
                SectionComponentForMessageRequestSchema,
                SeparatorComponentForMessageRequestSchema,
                TextDisplayComponentForMessageRequestSchema,
              ]),
            ),
            v.maxLength(40),
          ),
        ),
      ),
      flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      attachments: v.optional(
        v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
      ),
      poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
      shared_client_theme: v.optional(v.union([v.null(), CustomClientThemeShareRequestSchema])),
      message_reference: v.optional(v.union([v.null(), MessageReferenceRequestSchema])),
      nonce: v.optional(
        v.union([
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775808n),
          ),
          v.pipe(v.string(), v.maxCodePoints(25)),
          v.null(),
        ]),
      ),
      enforce_nonce: v.optional(v.nullable(v.boolean())),
      tts: v.optional(v.nullable(v.boolean())),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      messages: v.pipe(
        v.array(SnowflakeTypeSchema),
        v.minLength(2),
        v.maxLength(100),
        v.check((input) => new Set(input).size === input.length),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      before: v.optional(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(50),
        ),
      ),
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
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesPinsMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_pin',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/{message_id}',
    successDescription: '200 response for get_message',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_message',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'PATCH',
    path: '/channels/{channel_id}/messages/{message_id}',
    successDescription: '200 response for update_message',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
      embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
      flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
      sticker_ids: v.optional(v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(1521)))),
      components: v.optional(
        v.nullable(
          v.pipe(
            v.array(
              v.union([
                ActionRowComponentForMessageRequestSchema,
                ContainerComponentForMessageRequestSchema,
                FileComponentForMessageRequestSchema,
                MediaGalleryComponentForMessageRequestSchema,
                SectionComponentForMessageRequestSchema,
                SeparatorComponentForMessageRequestSchema,
                TextDisplayComponentForMessageRequestSchema,
              ]),
            ),
            v.maxLength(40),
          ),
        ),
      ),
      attachments: v.optional(
        v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
      ),
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
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactions = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions',
    successStatus: 204,
    successDescription: '204 response for delete_all_message_reactions',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesMessageIdReactionsEmojiName = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    successDescription: '200 response for list_message_reactions_by_emoji',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      type: v.optional(ReactionTypesSchema),
    }),
  )
  .output(v.array(UserResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    successStatus: 204,
    successDescription: '204 response for delete_all_message_reactions_by_emoji',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
      auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
      rate_limit_per_user: v.optional(
        v.nullable(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(0),
            v.maxValue(21600),
          ),
        ),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      implicit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
      implicit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      overwrite_id: SnowflakeTypeSchema,
      type: v.optional(v.union([v.null(), ChannelPermissionOverwritesSchema])),
      allow: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      deny: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
  .input(v.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPins = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/pins',
    successDescription: '200 response for deprecated_list_pins',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(MessageResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdPinsMessageId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for deprecated_create_pin',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdPinsMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for deprecated_delete_pin',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPollsMessageIdAnswersAnswerId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
    successDescription: '200 response for get_answer_voters',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      answer_id: v.pipe(
        v.string(),
        v.regex(/^-?(?:0|[1-9]\d*)$/),
        v.transform((input) => Number(input)),
        v.number(),
        v.safeInteger(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(1),
        v.maxValue(10),
      ),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
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
  .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      access_token: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    }),
  )
  .output(v.union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdRecipientsUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/recipients/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_group_dm_user',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdSendSoundboardSound = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/send-soundboard-sound',
    successStatus: 204,
    successDescription: '204 response for send_soundboard_sound',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      sound_id: SnowflakeTypeSchema,
      source_guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      with_member: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      after: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(v.array(ThreadMemberResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdThreadMembersMe = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/thread-members/@me',
    successStatus: 204,
    successDescription: '204 response for join_thread',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdThreadMembersMe = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/thread-members/@me',
    successStatus: 204,
    successDescription: '204 response for leave_thread',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successDescription: '200 response for get_thread_member',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      with_member: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
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
  .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_thread_member',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdThreads = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/threads',
    successStatus: 201,
    successDescription: '201 response for create_thread',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(CreatedThreadResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadsArchivedPrivate = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/threads/archived/private',
    successDescription: '200 response for list_private_archived_threads',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      before: v.optional(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(2),
          v.maxValue(100),
        ),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      before: v.optional(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(2),
          v.maxValue(100),
        ),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      name: v.optional(v.pipe(v.string(), v.maxCodePoints(100))),
      slop: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      min_id: v.optional(SnowflakeTypeSchema),
      max_id: v.optional(SnowflakeTypeSchema),
      tag: v.optional(
        v.union([
          v.string(),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(SnowflakeTypeSchema),
            v.maxLength(20),
            v.check((input) => new Set(input).size === input.length),
          ),
        ]),
      ),
      tag_setting: v.optional(ThreadSearchTagSettingSchema),
      archived: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      sort_by: v.optional(ThreadSortingModeSchema),
      sort_order: v.optional(SortingOrderSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(25),
        ),
      ),
      offset: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(9975),
        ),
      ),
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
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(TypingIndicatorResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdUsersMeThreadsArchivedPrivate = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/users/@me/threads/archived/private',
    successDescription: '200 response for list_my_private_archived_threads',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      before: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(2),
          v.maxValue(100),
        ),
      ),
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
    v.object({
      channel_id: SnowflakeTypeSchema,
      status: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.maxCodePoints(500))),
          v.description('The new voice channel status'),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdWebhooks = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/webhooks',
    successDescription: '200 response for list_channel_webhooks',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(
    v.nullable(
      v.array(
        v.union([
          ApplicationIncomingWebhookResponseSchema,
          ChannelFollowerWebhookResponseSchema,
          GuildIncomingWebhookResponseSchema,
        ]),
      ),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdWebhooks = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/webhooks',
    successDescription: '200 response for create_webhook',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80)),
      avatar: v.optional(v.nullable(v.string())),
    }),
  )
  .output(GuildIncomingWebhookResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
