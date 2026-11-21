import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
    .input(Schema.toStandardSchemaV1(Schema.Struct({ webhook_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ApplicationIncomingWebhookResponseSchema,
          ChannelFollowerWebhookResponseSchema,
          GuildIncomingWebhookResponseSchema,
        ]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ webhook_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 80, {
                expected: 'a string of at most 80 characters',
              }),
            ),
          ),
          avatar: Schema.optional(Schema.NullOr(Schema.String)),
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ApplicationIncomingWebhookResponseSchema,
          ChannelFollowerWebhookResponseSchema,
          GuildIncomingWebhookResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ApplicationIncomingWebhookResponseSchema,
          ChannelFollowerWebhookResponseSchema,
          GuildIncomingWebhookResponseSchema,
        ]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          wait: Schema.optional(Schema.Boolean),
          thread_id: Schema.optional(SnowflakeTypeSchema),
          with_components: Schema.optional(Schema.Boolean),
          body: Schema.Union([
            IncomingWebhookRequestPartialSchema,
            IncomingWebhookUpdateRequestPartialSchema,
          ]),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 80, {
                expected: 'a string of at most 80 characters',
              }),
            ),
          ),
          avatar: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ApplicationIncomingWebhookResponseSchema,
          ChannelFollowerWebhookResponseSchema,
          GuildIncomingWebhookResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenGithub: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          wait: Schema.optional(Schema.Boolean),
          thread_id: Schema.optional(SnowflakeTypeSchema),
          action: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          ref: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          ref_type: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          comment: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCommentSchema])),
          issue: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubIssueSchema])),
          pull_request: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubIssueSchema]),
          ),
          repository: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubRepositorySchema]),
          ),
          forkee: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubRepositorySchema]),
          ),
          sender: GithubUserSchema,
          member: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubUserSchema])),
          release: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubReleaseSchema])),
          head_commit: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubCommitSchema]),
          ),
          commits: Schema.optional(
            Schema.NullOr(Schema.Array(GithubCommitSchema).check(Schema.isMaxLength(1521))),
          ),
          forced: Schema.optional(Schema.NullOr(Schema.Boolean)),
          compare: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          review: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubReviewSchema])),
          check_run: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubCheckRunSchema]),
          ),
          check_suite: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubCheckSuiteSchema]),
          ),
          discussion: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GithubDiscussionSchema]),
          ),
          answer: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCommentSchema])),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          thread_id: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          thread_id: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesOriginal: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          thread_id: Schema.optional(SnowflakeTypeSchema),
          with_components: Schema.optional(Schema.Boolean),
          content: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 2000, {
                  expected: 'a string of at most 2000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optional(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          allowed_mentions: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
          ),
          components: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ).check(Schema.isMaxLength(40)),
            ),
          ),
          attachments: Schema.optional(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
          poll: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema]),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          message_id: SnowflakeTypeSchema,
          thread_id: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          message_id: SnowflakeTypeSchema,
          thread_id: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchWebhooksWebhookIdWebhookTokenMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          message_id: SnowflakeTypeSchema,
          thread_id: Schema.optional(SnowflakeTypeSchema),
          with_components: Schema.optional(Schema.Boolean),
          content: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 2000, {
                  expected: 'a string of at most 2000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optional(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          allowed_mentions: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
          ),
          components: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ).check(Schema.isMaxLength(40)),
            ),
          ),
          attachments: Schema.optional(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
          poll: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema]),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhooksWebhookIdWebhookTokenSlack: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_id: SnowflakeTypeSchema,
          webhook_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          wait: Schema.optional(Schema.Boolean),
          thread_id: Schema.optional(SnowflakeTypeSchema),
          text: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 2000, {
                  expected: 'a string of at most 2000 characters',
                }),
              ),
            ),
          ),
          username: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          icon_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          attachments: Schema.optional(
            Schema.NullOr(Schema.Array(WebhookSlackEmbedSchema).check(Schema.isMaxLength(1521))),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.String)))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
