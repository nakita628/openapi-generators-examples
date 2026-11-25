import { initTRPC, TRPCError } from '@trpc/server'
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
    .input(v.object({ webhook_id: SnowflakeTypeSchema }))
    .output(
      v.union([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookId: t.procedure
    .input(v.object({ webhook_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookId: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
        avatar: v.optional(v.nullable(v.string())),
        channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      }),
    )
    .output(
      v.union([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookToken: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        wait: v.optional(v.boolean()),
        thread_id: v.optional(SnowflakeTypeSchema),
        with_components: v.optional(v.boolean()),
        body: v.union([
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
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookToken: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenGithub: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        wait: v.optional(v.boolean()),
        thread_id: v.optional(SnowflakeTypeSchema),
        action: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        ref: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        ref_type: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        comment: v.optional(v.union([v.null(), GithubCommentSchema])),
        issue: v.optional(v.union([v.null(), GithubIssueSchema])),
        pull_request: v.optional(v.union([v.null(), GithubIssueSchema])),
        repository: v.optional(v.union([v.null(), GithubRepositorySchema])),
        forkee: v.optional(v.union([v.null(), GithubRepositorySchema])),
        sender: GithubUserSchema,
        member: v.optional(v.union([v.null(), GithubUserSchema])),
        release: v.optional(v.union([v.null(), GithubReleaseSchema])),
        head_commit: v.optional(v.union([v.null(), GithubCommitSchema])),
        commits: v.optional(v.nullable(v.pipe(v.array(GithubCommitSchema), v.maxLength(1521)))),
        forced: v.optional(v.nullable(v.boolean())),
        compare: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
        review: v.optional(v.union([v.null(), GithubReviewSchema])),
        check_run: v.optional(v.union([v.null(), GithubCheckRunSchema])),
        check_suite: v.optional(v.union([v.null(), GithubCheckSuiteSchema])),
        discussion: v.optional(v.union([v.null(), GithubDiscussionSchema])),
        answer: v.optional(v.union([v.null(), GithubCommentSchema])),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        thread_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        thread_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        thread_id: v.optional(SnowflakeTypeSchema),
        with_components: v.optional(v.boolean()),
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
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
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        message_id: SnowflakeTypeSchema,
        thread_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        message_id: SnowflakeTypeSchema,
        thread_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        message_id: SnowflakeTypeSchema,
        thread_id: v.optional(SnowflakeTypeSchema),
        with_components: v.optional(v.boolean()),
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(2000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
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
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenSlack: t.procedure
    .input(
      v.object({
        webhook_id: SnowflakeTypeSchema,
        webhook_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        wait: v.optional(v.boolean()),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
