import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  ActionRowComponentForMessageRequestSchema,
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ContainerComponentForMessageRequestSchema,
  FileComponentForMessageRequestSchema,
  GithubCheckRunSchema,
  GithubCheckSuiteSchema,
  GithubCommentSchema,
  GithubCommitSchema,
  GithubDiscussionSchema,
  GithubIssueSchema,
  GithubReleaseSchema,
  GithubRepositorySchema,
  GithubReviewSchema,
  GithubUserSchema,
  GuildIncomingWebhookResponseSchema,
  MediaGalleryComponentForMessageRequestSchema,
  MessageAllowedMentionsRequestSchema,
  MessageAttachmentRequestSchema,
  MessageResponseSchema,
  PollCreateRequestSchema,
  RichEmbedSchema,
  SectionComponentForMessageRequestSchema,
  SeparatorComponentForMessageRequestSchema,
  SnowflakeTypeSchema,
  TextDisplayComponentForMessageRequestSchema,
  WebhookSlackEmbedSchema,
} from '../components'

export const getWebhooksWebhookId = os
  .route({
    method: 'GET',
    path: '/webhooks/{webhook_id}',
    successDescription: '200 response for get_webhook',
  })
  .input(type({ webhook_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
    ).or(GuildIncomingWebhookResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteWebhooksWebhookId = os
  .route({
    method: 'DELETE',
    path: '/webhooks/{webhook_id}',
    successStatus: 204,
    successDescription: '204 response for delete_webhook',
  })
  .input(type({ webhook_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookId = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}',
    successDescription: '200 response for update_webhook',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
      'avatar?': type('string | null'),
      'channel_id?': type('null | null').or(SnowflakeTypeSchema),
    }),
  )
  .output(
    type(
      type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
    ).or(GuildIncomingWebhookResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'GET',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successDescription: '200 response for get_webhook_by_token',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(
    type(
      type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
    ).or(GuildIncomingWebhookResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'POST',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successDescription: '200 response for execute_webhook',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'wait?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'thread_id?': SnowflakeTypeSchema,
      'with_components?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'DELETE',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successStatus: 204,
    successDescription: '204 response for delete_webhook_by_token',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successDescription: '200 response for update_webhook_by_token',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
      'avatar?': type('string | null'),
    }),
  )
  .output(
    type(
      type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
    ).or(GuildIncomingWebhookResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhooksWebhookIdWebhookTokenGithub = os
  .route({
    method: 'POST',
    path: '/webhooks/{webhook_id}/{webhook_token}/github',
    successStatus: 204,
    successDescription: '204 response for execute_github_compatible_webhook',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'wait?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'thread_id?': SnowflakeTypeSchema,
      'action?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
      'ref?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
      'ref_type?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
      'comment?': type('null | null').or(GithubCommentSchema),
      'issue?': type('null | null').or(GithubIssueSchema),
      'pull_request?': type('null | null').or(GithubIssueSchema),
      'repository?': type('null | null').or(GithubRepositorySchema),
      'forkee?': type('null | null').or(GithubRepositorySchema),
      sender: GithubUserSchema,
      'member?': type('null | null').or(GithubUserSchema),
      'release?': type('null | null').or(GithubReleaseSchema),
      'head_commit?': type('null | null').or(GithubCommitSchema),
      'commits?': type(type(type(GithubCommitSchema).array()).and(type('unknown[] <= 1521'))).or(
        'null',
      ),
      'forced?': type('boolean | null'),
      'compare?': type(
        type('string.url').narrow(
          (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
        ),
      ).or('null'),
      'review?': type('null | null').or(GithubReviewSchema),
      'check_run?': type('null | null').or(GithubCheckRunSchema),
      'check_suite?': type('null | null').or(GithubCheckSuiteSchema),
      'discussion?': type('null | null').or(GithubDiscussionSchema),
      'answer?': type('null | null').or(GithubCommentSchema),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getWebhooksWebhookIdWebhookTokenMessagesOriginal = os
  .route({
    method: 'GET',
    path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    successDescription: '200 response for get_original_webhook_message',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'thread_id?': SnowflakeTypeSchema,
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteWebhooksWebhookIdWebhookTokenMessagesOriginal = os
  .route({
    method: 'DELETE',
    path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    successStatus: 204,
    successDescription: '204 response for delete_original_webhook_message',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'thread_id?': SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookIdWebhookTokenMessagesOriginal = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    successDescription: '200 response for update_original_webhook_message',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'thread_id?': SnowflakeTypeSchema,
      'with_components?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'content?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      ).or('null'),
      'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
      'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
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
      'poll?': type('null | null').or(PollCreateRequestSchema),
      'flags?': type('number.integer | null'),
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getWebhooksWebhookIdWebhookTokenMessagesMessageId = os
  .route({
    method: 'GET',
    path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    successDescription: '200 response for get_webhook_message',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      message_id: SnowflakeTypeSchema,
      'thread_id?': SnowflakeTypeSchema,
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteWebhooksWebhookIdWebhookTokenMessagesMessageId = os
  .route({
    method: 'DELETE',
    path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    successStatus: 204,
    successDescription: '204 response for delete_webhook_message',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      message_id: SnowflakeTypeSchema,
      'thread_id?': SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookIdWebhookTokenMessagesMessageId = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    successDescription: '200 response for update_webhook_message',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      message_id: SnowflakeTypeSchema,
      'thread_id?': SnowflakeTypeSchema,
      'with_components?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'content?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      ).or('null'),
      'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
      'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
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
      'poll?': type('null | null').or(PollCreateRequestSchema),
      'flags?': type('number.integer | null'),
    }),
  )
  .output(MessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhooksWebhookIdWebhookTokenSlack = os
  .route({
    method: 'POST',
    path: '/webhooks/{webhook_id}/{webhook_token}/slack',
    successDescription: '200 response for execute_slack_compatible_webhook',
  })
  .input(
    type({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'wait?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'thread_id?': SnowflakeTypeSchema,
      'text?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      ).or('null'),
      'username?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
      'icon_url?': type(
        type('string.url').narrow(
          (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
        ),
      ).or('null'),
      'attachments?': type(
        type(type(WebhookSlackEmbedSchema).array()).and(type('unknown[] <= 1521')),
      ).or('null'),
    }),
  )
  .output(type('string | null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
