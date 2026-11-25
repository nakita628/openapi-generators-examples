import { initTRPC, TRPCError } from '@trpc/server'
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
  IncomingWebhookRequestPartialSchema,
  IncomingWebhookUpdateRequestPartialSchema,
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

const t = initTRPC.create()

export const webhooksRouter = t.router({
  getWebhooksWebhookId: t.procedure
    .input(z.object({ webhook_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookId: t.procedure
    .input(z.object({ webhook_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookToken: t.procedure
    .input(z.object({ webhook_id: SnowflakeTypeSchema, webhook_token: z.string().max(152133) }))
    .output(
      z.xor([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        wait: z.boolean().exactOptional(),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        with_components: z.boolean().exactOptional(),
        body: z.union([
          IncomingWebhookRequestPartialSchema,
          IncomingWebhookUpdateRequestPartialSchema,
        ]),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookToken: t.procedure
    .input(z.object({ webhook_id: SnowflakeTypeSchema, webhook_token: z.string().max(152133) }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookToken: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenGithub: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        wait: z.boolean().exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        with_components: z.boolean().exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        message_id: SnowflakeTypeSchema,
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        message_id: SnowflakeTypeSchema,
        thread_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        message_id: SnowflakeTypeSchema,
        thread_id: SnowflakeTypeSchema.exactOptional(),
        with_components: z.boolean().exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenSlack: t.procedure
    .input(
      z.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: z.string().max(152133),
        wait: z.boolean().exactOptional(),
        thread_id: SnowflakeTypeSchema.exactOptional(),
        text: z.string().max(2000).nullable().exactOptional(),
        username: z.string().max(152133).nullable().exactOptional(),
        icon_url: z.url().max(2048).nullable().exactOptional(),
        attachments: z.array(WebhookSlackEmbedSchema).max(1521).nullable().exactOptional(),
      }),
    )
    .output(z.string().nullable())
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
