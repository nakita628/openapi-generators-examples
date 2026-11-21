import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .input(v.object({ webhook_id: SnowflakeTypeSchema }))
  .output(
    v.union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteWebhooksWebhookId = os
  .route({
    method: 'DELETE',
    path: '/webhooks/{webhook_id}',
    successStatus: 204,
    successDescription: '204 response for delete_webhook',
  })
  .input(v.object({ webhook_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookId = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}',
    successDescription: '200 response for update_webhook',
  })
  .input(
    v.object({
      webhook_id: SnowflakeTypeSchema,
      name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
      avatar: v.optional(v.nullable(v.string())),
      channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
    }),
  )
  .output(
    v.union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'GET',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successDescription: '200 response for get_webhook_by_token',
  })
  .input(
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
    }),
  )
  .output(
    v.union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'POST',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successDescription: '200 response for execute_webhook',
  })
  .input(
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      wait: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      thread_id: v.optional(SnowflakeTypeSchema),
      with_components: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
      avatar: v.optional(v.nullable(v.string())),
    }),
  )
  .output(
    v.union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      wait: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      thread_id: v.optional(SnowflakeTypeSchema),
      action: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      ref: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      ref_type: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      comment: v.optional(v.union([v.nullable(v.null()), GithubCommentSchema])),
      issue: v.optional(v.union([v.nullable(v.null()), GithubIssueSchema])),
      pull_request: v.optional(v.union([v.nullable(v.null()), GithubIssueSchema])),
      repository: v.optional(v.union([v.nullable(v.null()), GithubRepositorySchema])),
      forkee: v.optional(v.union([v.nullable(v.null()), GithubRepositorySchema])),
      sender: GithubUserSchema,
      member: v.optional(v.union([v.nullable(v.null()), GithubUserSchema])),
      release: v.optional(v.union([v.nullable(v.null()), GithubReleaseSchema])),
      head_commit: v.optional(v.union([v.nullable(v.null()), GithubCommitSchema])),
      commits: v.optional(v.nullable(v.pipe(v.array(GithubCommitSchema), v.maxLength(1521)))),
      forced: v.optional(v.nullable(v.boolean())),
      compare: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
      review: v.optional(v.union([v.nullable(v.null()), GithubReviewSchema])),
      check_run: v.optional(v.union([v.nullable(v.null()), GithubCheckRunSchema])),
      check_suite: v.optional(v.union([v.nullable(v.null()), GithubCheckSuiteSchema])),
      discussion: v.optional(v.union([v.nullable(v.null()), GithubDiscussionSchema])),
      answer: v.optional(v.union([v.nullable(v.null()), GithubCommentSchema])),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      thread_id: v.optional(SnowflakeTypeSchema),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      thread_id: v.optional(SnowflakeTypeSchema),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      thread_id: v.optional(SnowflakeTypeSchema),
      with_components: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
      embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
      allowed_mentions: v.optional(
        v.union([v.nullable(v.null()), MessageAllowedMentionsRequestSchema]),
      ),
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
      poll: v.optional(v.union([v.nullable(v.null()), PollCreateRequestSchema])),
      flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      message_id: SnowflakeTypeSchema,
      thread_id: v.optional(SnowflakeTypeSchema),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      message_id: SnowflakeTypeSchema,
      thread_id: v.optional(SnowflakeTypeSchema),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      message_id: SnowflakeTypeSchema,
      thread_id: v.optional(SnowflakeTypeSchema),
      with_components: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
      embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
      allowed_mentions: v.optional(
        v.union([v.nullable(v.null()), MessageAllowedMentionsRequestSchema]),
      ),
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
      poll: v.optional(v.union([v.nullable(v.null()), PollCreateRequestSchema])),
      flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
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
    v.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      wait: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      thread_id: v.optional(SnowflakeTypeSchema),
      text: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
      username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      icon_url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
      attachments: v.optional(
        v.nullable(v.pipe(v.array(WebhookSlackEmbedSchema), v.maxLength(1521))),
      ),
    }),
  )
  .output(v.nullable(v.string()))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
