import { os } from '@orpc/server'
import { type } from 'arktype'
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
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
        PrivateGroupChannelResponseSchema,
      ),
    ).or(ThreadResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}',
    successDescription: '200 response for delete_channel',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
        PrivateGroupChannelResponseSchema,
      ),
    ).or(ThreadResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchChannelsChannelId = os
  .route({
    method: 'PATCH',
    path: '/channels/{channel_id}',
    successDescription: '200 response for update_channel',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
        PrivateGroupChannelResponseSchema,
      ),
    ).or(ThreadResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdFollowers = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/followers',
    successDescription: '200 response for follow_channel',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
  .output(ChannelFollowerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdInvites = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/invites',
    successDescription: '200 response for list_channel_invites',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(
        type(
          type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
            GuildInviteResponseSchema,
          ),
        ).or('null | null'),
      ).array(),
    ).or('null'),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdInvites = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/invites',
    successDescription: '200 response for create_channel_invite',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(
    type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
      GuildInviteResponseSchema,
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessages = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages',
    successDescription: '200 response for list_messages',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      'around?': SnowflakeTypeSchema,
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
    }),
  )
  .output(type(type(MessageResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdMessages = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/messages',
    successDescription: '200 response for create_message',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      'content?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
        ),
      ).or('null'),
      'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
      'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
      'sticker_ids?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3'))).or(
        'null',
      ),
      'components?': type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(ActionRowComponentForMessageRequestSchema).or(
                        ContainerComponentForMessageRequestSchema,
                      ),
                    ).or(FileComponentForMessageRequestSchema),
                  ).or(MediaGalleryComponentForMessageRequestSchema),
                ).or(SectionComponentForMessageRequestSchema),
              ).or(SeparatorComponentForMessageRequestSchema),
            ).or(TextDisplayComponentForMessageRequestSchema),
          ).array(),
        ).and(type('unknown[] <= 40')),
      ).or('null'),
      'flags?': type('number.integer | null'),
      'attachments?': type(
        type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
      ).or('null'),
      'poll?': type('null | null').or(PollCreateRequestSchema),
      'shared_client_theme?': type('null | null').or(CustomClientThemeShareRequestSchema),
      'message_reference?': type('null | null').or(MessageReferenceRequestSchema),
      'nonce?': type(
        type(
          type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow(
              (data, ctx) =>
                data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
            )
            .narrow(
              (data, ctx) =>
                data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
            ),
        ).or(
          type('string').narrow(
            (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
          ),
        ),
      ).or('null | null'),
      'enforce_nonce?': type('boolean | null'),
      'tts?': type('boolean | null'),
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
    type({
      channel_id: SnowflakeTypeSchema,
      messages: type(type(SnowflakeTypeSchema).array())
        .and(type('2 <= unknown[] <= 100'))
        .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
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
    type({
      channel_id: SnowflakeTypeSchema,
      'before?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 50'),
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
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesPinsMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_pin',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/{message_id}',
    successDescription: '200 response for get_message',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_message',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchChannelsChannelIdMessagesMessageId = os
  .route({
    method: 'PATCH',
    path: '/channels/{channel_id}/messages/{message_id}',
    successDescription: '200 response for update_message',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      'content?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
        ),
      ).or('null'),
      'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
      'flags?': type('number.integer | null'),
      'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
      'sticker_ids?': type(
        type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 1521')),
      ).or('null'),
      'components?': type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(ActionRowComponentForMessageRequestSchema).or(
                        ContainerComponentForMessageRequestSchema,
                      ),
                    ).or(FileComponentForMessageRequestSchema),
                  ).or(MediaGalleryComponentForMessageRequestSchema),
                ).or(SectionComponentForMessageRequestSchema),
              ).or(SeparatorComponentForMessageRequestSchema),
            ).or(TextDisplayComponentForMessageRequestSchema),
          ).array(),
        ).and(type('unknown[] <= 40')),
      ).or('null'),
      'attachments?': type(
        type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
      ).or('null'),
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
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactions = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions',
    successStatus: 204,
    successDescription: '204 response for delete_all_message_reactions',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdMessagesMessageIdReactionsEmojiName = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    successDescription: '200 response for list_message_reactions_by_emoji',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'type?': ReactionTypesSchema,
    }),
  )
  .output(type(UserResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    successStatus: 204,
    successDescription: '204 response for delete_all_message_reactions_by_emoji',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
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
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
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
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
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
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      emoji_name: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
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
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      'auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
      'rate_limit_per_user?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
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
    type({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      'implicit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
    type({
      channel_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
      'implicit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
    type({
      channel_id: SnowflakeTypeSchema,
      overwrite_id: SnowflakeTypeSchema,
      'type?': type('null | null').or(ChannelPermissionOverwritesSchema),
      'allow?': type('number.integer | null'),
      'deny?': type('number.integer | null'),
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
  .input(type({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPins = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/pins',
    successDescription: '200 response for deprecated_list_pins',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(type(type(MessageResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdPinsMessageId = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for deprecated_create_pin',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdPinsMessageId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/pins/{message_id}',
    successStatus: 204,
    successDescription: '204 response for deprecated_delete_pin',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdPollsMessageIdAnswersAnswerId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
    successDescription: '200 response for get_answer_voters',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
      answer_id: type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 10',
        ),
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
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
  .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
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
    type({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      'access_token?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
      'nick?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
    }),
  )
  .output(type(PrivateChannelResponseSchema).or(PrivateGroupChannelResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdRecipientsUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/recipients/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_group_dm_user',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdSendSoundboardSound = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/send-soundboard-sound',
    successStatus: 204,
    successDescription: '204 response for send_soundboard_sound',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      sound_id: SnowflakeTypeSchema,
      'source_guild_id?': type('null | null').or(SnowflakeTypeSchema),
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
    type({
      channel_id: SnowflakeTypeSchema,
      'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'after?': SnowflakeTypeSchema,
    }),
  )
  .output(type(ThreadMemberResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putChannelsChannelIdThreadMembersMe = os
  .route({
    method: 'PUT',
    path: '/channels/{channel_id}/thread-members/@me',
    successStatus: 204,
    successDescription: '204 response for join_thread',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdThreadMembersMe = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/thread-members/@me',
    successStatus: 204,
    successDescription: '204 response for leave_thread',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successDescription: '200 response for get_thread_member',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
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
  .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChannelsChannelIdThreadMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/channels/{channel_id}/thread-members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_thread_member',
  })
  .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdThreads = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/threads',
    successStatus: 201,
    successDescription: '201 response for create_thread',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(CreatedThreadResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdThreadsArchivedPrivate = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/threads/archived/private',
    successDescription: '200 response for list_private_archived_threads',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      'before?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 2 & number.integer <= 100'),
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
    type({
      channel_id: SnowflakeTypeSchema,
      'before?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 2 & number.integer <= 100'),
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
    type({
      channel_id: SnowflakeTypeSchema,
      'name?': type('string').narrow(
        (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
      ),
      'slop?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'min_id?': SnowflakeTypeSchema,
      'max_id?': SnowflakeTypeSchema,
      'tag?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown').pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type(type(SnowflakeTypeSchema).array())
              .and(type('unknown[] <= 20'))
              .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
          ),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'tag_setting?': ThreadSearchTagSettingSchema,
      'archived?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'sort_by?': ThreadSortingModeSchema,
      'sort_order?': SortingOrderSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 25'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 9975'),
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
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(TypingIndicatorResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdUsersMeThreadsArchivedPrivate = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/users/@me/threads/archived/private',
    successDescription: '200 response for list_my_private_archived_threads',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      'before?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 2 & number.integer <= 100'),
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
    type({
      channel_id: SnowflakeTypeSchema,
      'status?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
        ),
      )
        .or('null')
        .describe('The new voice channel status'),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChannelsChannelIdWebhooks = os
  .route({
    method: 'GET',
    path: '/channels/{channel_id}/webhooks',
    successDescription: '200 response for list_channel_webhooks',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(
        type(
          type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
        ).or(GuildIncomingWebhookResponseSchema),
      ).array(),
    ).or('null'),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChannelsChannelIdWebhooks = os
  .route({
    method: 'POST',
    path: '/channels/{channel_id}/webhooks',
    successDescription: '200 response for create_webhook',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
      'avatar?': type('string | null'),
    }),
  )
  .output(GuildIncomingWebhookResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
