import { initTRPC, TRPCError } from '@trpc/server'
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
    .input(type({ webhook_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookId: t.procedure
    .input(type({ webhook_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookId: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        'avatar?': 'string | null',
        'channel_id?': type('null').or(SnowflakeTypeSchema),
      }),
    )
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookToken: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'wait?': 'boolean',
        'thread_id?': SnowflakeTypeSchema,
        'with_components?': 'boolean',
        body: type(IncomingWebhookRequestPartialSchema).or(
          IncomingWebhookUpdateRequestPartialSchema,
        ),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        'avatar?': 'string | null',
      }),
    )
    .output(
      type(
        type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
      ).or(GuildIncomingWebhookResponseSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenGithub: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'wait?': 'boolean',
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
        'comment?': type('null').or(GithubCommentSchema),
        'issue?': type('null').or(GithubIssueSchema),
        'pull_request?': type('null').or(GithubIssueSchema),
        'repository?': type('null').or(GithubRepositorySchema),
        'forkee?': type('null').or(GithubRepositorySchema),
        sender: GithubUserSchema,
        'member?': type('null').or(GithubUserSchema),
        'release?': type('null').or(GithubReleaseSchema),
        'head_commit?': type('null').or(GithubCommitSchema),
        'commits?': type(type(type(GithubCommitSchema).array()).and(type('unknown[] <= 1521'))).or(
          'null',
        ),
        'forced?': 'boolean | null',
        'compare?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
          ),
        ).or('null'),
        'review?': type('null').or(GithubReviewSchema),
        'check_run?': type('null').or(GithubCheckRunSchema),
        'check_suite?': type('null').or(GithubCheckSuiteSchema),
        'discussion?': type('null').or(GithubDiscussionSchema),
        'answer?': type('null').or(GithubCommentSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'thread_id?': SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'thread_id?': SnowflakeTypeSchema,
        'with_components?': 'boolean',
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
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
        'poll?': type('null').or(PollCreateRequestSchema),
        'flags?': 'number.integer | null',
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        message_id: SnowflakeTypeSchema,
        'thread_id?': SnowflakeTypeSchema,
        'with_components?': 'boolean',
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
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
        'poll?': type('null').or(PollCreateRequestSchema),
        'flags?': 'number.integer | null',
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenSlack: t.procedure
    .input(
      type({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'wait?': 'boolean',
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
