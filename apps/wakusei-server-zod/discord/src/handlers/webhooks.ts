import { os } from '@orpc/server'
import * as z from 'zod'
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
  .input(z.object({ webhook_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
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
  .input(z.object({ webhook_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookId = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}',
    successDescription: '200 response for update_webhook',
  })
  .input(
    z.object({
      webhook_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(80).exactOptional(),
      avatar: z.string().nullable().exactOptional(),
      channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
    }),
  )
  .output(
    z.xor([
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
  .input(z.object({ webhook_id: SnowflakeTypeSchema, webhook_token: z.string().max(152133) }))
  .output(
    z.xor([
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      wait: z.stringbool().exactOptional(),
      thread_id: SnowflakeTypeSchema.exactOptional(),
      with_components: z.stringbool().exactOptional(),
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
  .input(z.object({ webhook_id: SnowflakeTypeSchema, webhook_token: z.string().max(152133) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchWebhooksWebhookIdWebhookToken = os
  .route({
    method: 'PATCH',
    path: '/webhooks/{webhook_id}/{webhook_token}',
    successDescription: '200 response for update_webhook_by_token',
  })
  .input(
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      name: z.string().min(1).max(80).exactOptional(),
      avatar: z.string().nullable().exactOptional(),
    }),
  )
  .output(
    z.xor([
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      wait: z.stringbool().exactOptional(),
      thread_id: SnowflakeTypeSchema.exactOptional(),
      action: z.string().max(152133).nullable().exactOptional(),
      ref: z.string().max(152133).nullable().exactOptional(),
      ref_type: z.string().max(152133).nullable().exactOptional(),
      comment: z.xor([z.null(), GithubCommentSchema]).exactOptional(),
      issue: z.xor([z.null(), GithubIssueSchema]).exactOptional(),
      pull_request: z.xor([z.null(), GithubIssueSchema]).exactOptional(),
      repository: z.xor([z.null(), GithubRepositorySchema]).exactOptional(),
      forkee: z.xor([z.null(), GithubRepositorySchema]).exactOptional(),
      sender: GithubUserSchema,
      member: z.xor([z.null(), GithubUserSchema]).exactOptional(),
      release: z.xor([z.null(), GithubReleaseSchema]).exactOptional(),
      head_commit: z.xor([z.null(), GithubCommitSchema]).exactOptional(),
      commits: z.array(GithubCommitSchema).max(1521).nullable().exactOptional(),
      forced: z.boolean().nullable().exactOptional(),
      compare: z.url().max(2048).nullable().exactOptional(),
      review: z.xor([z.null(), GithubReviewSchema]).exactOptional(),
      check_run: z.xor([z.null(), GithubCheckRunSchema]).exactOptional(),
      check_suite: z.xor([z.null(), GithubCheckSuiteSchema]).exactOptional(),
      discussion: z.xor([z.null(), GithubDiscussionSchema]).exactOptional(),
      answer: z.xor([z.null(), GithubCommentSchema]).exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      thread_id: SnowflakeTypeSchema.exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      thread_id: SnowflakeTypeSchema.exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      thread_id: SnowflakeTypeSchema.exactOptional(),
      with_components: z.stringbool().exactOptional(),
      content: z.string().max(2000).nullable().exactOptional(),
      embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
      allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
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
      poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
      flags: z.int().nullable().exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      message_id: SnowflakeTypeSchema,
      thread_id: SnowflakeTypeSchema.exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      message_id: SnowflakeTypeSchema,
      thread_id: SnowflakeTypeSchema.exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      message_id: SnowflakeTypeSchema,
      thread_id: SnowflakeTypeSchema.exactOptional(),
      with_components: z.stringbool().exactOptional(),
      content: z.string().max(2000).nullable().exactOptional(),
      embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
      allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
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
      poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
      flags: z.int().nullable().exactOptional(),
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
    z.object({
      webhook_id: SnowflakeTypeSchema,
      webhook_token: z.string().max(152133),
      wait: z.stringbool().exactOptional(),
      thread_id: SnowflakeTypeSchema.exactOptional(),
      text: z.string().max(2000).nullable().exactOptional(),
      username: z.string().max(152133).nullable().exactOptional(),
      icon_url: z.url().max(2048).nullable().exactOptional(),
      attachments: z.array(WebhookSlackEmbedSchema).max(1521).nullable().exactOptional(),
    }),
  )
  .output(z.string().nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })
