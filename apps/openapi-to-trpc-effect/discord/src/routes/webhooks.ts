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
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 80, {
                expected: 'a string of at most 80 characters',
              }),
            ),
          ),
          avatar: Schema.optionalKey(Schema.NullOr(Schema.String)),
          channel_id: Schema.optionalKey(Schema.Union([Schema.Null, SnowflakeTypeSchema])),
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
          wait: Schema.optionalKey(Schema.Boolean),
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
          with_components: Schema.optionalKey(Schema.Boolean),
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
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 80, {
                expected: 'a string of at most 80 characters',
              }),
            ),
          ),
          avatar: Schema.optionalKey(Schema.NullOr(Schema.String)),
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
          wait: Schema.optionalKey(Schema.Boolean),
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
          action: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          ref: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          ref_type: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          comment: Schema.optionalKey(Schema.Union([Schema.Null, GithubCommentSchema])),
          issue: Schema.optionalKey(Schema.Union([Schema.Null, GithubIssueSchema])),
          pull_request: Schema.optionalKey(Schema.Union([Schema.Null, GithubIssueSchema])),
          repository: Schema.optionalKey(Schema.Union([Schema.Null, GithubRepositorySchema])),
          forkee: Schema.optionalKey(Schema.Union([Schema.Null, GithubRepositorySchema])),
          sender: GithubUserSchema,
          member: Schema.optionalKey(Schema.Union([Schema.Null, GithubUserSchema])),
          release: Schema.optionalKey(Schema.Union([Schema.Null, GithubReleaseSchema])),
          head_commit: Schema.optionalKey(Schema.Union([Schema.Null, GithubCommitSchema])),
          commits: Schema.optionalKey(
            Schema.NullOr(Schema.Array(GithubCommitSchema).check(Schema.isMaxLength(1521))),
          ),
          forced: Schema.optionalKey(Schema.NullOr(Schema.Boolean)),
          compare: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          review: Schema.optionalKey(Schema.Union([Schema.Null, GithubReviewSchema])),
          check_run: Schema.optionalKey(Schema.Union([Schema.Null, GithubCheckRunSchema])),
          check_suite: Schema.optionalKey(Schema.Union([Schema.Null, GithubCheckSuiteSchema])),
          discussion: Schema.optionalKey(Schema.Union([Schema.Null, GithubDiscussionSchema])),
          answer: Schema.optionalKey(Schema.Union([Schema.Null, GithubCommentSchema])),
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
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
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
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
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
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
          with_components: Schema.optionalKey(Schema.Boolean),
          content: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 2000, {
                  expected: 'a string of at most 2000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optionalKey(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          allowed_mentions: Schema.optionalKey(
            Schema.Union([Schema.Null, MessageAllowedMentionsRequestSchema]),
          ),
          components: Schema.optionalKey(
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
          attachments: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
          poll: Schema.optionalKey(Schema.Union([Schema.Null, PollCreateRequestSchema])),
          flags: Schema.optionalKey(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
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
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
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
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
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
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
          with_components: Schema.optionalKey(Schema.Boolean),
          content: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 2000, {
                  expected: 'a string of at most 2000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optionalKey(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          allowed_mentions: Schema.optionalKey(
            Schema.Union([Schema.Null, MessageAllowedMentionsRequestSchema]),
          ),
          components: Schema.optionalKey(
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
          attachments: Schema.optionalKey(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
          poll: Schema.optionalKey(Schema.Union([Schema.Null, PollCreateRequestSchema])),
          flags: Schema.optionalKey(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
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
          wait: Schema.optionalKey(Schema.Boolean),
          thread_id: Schema.optionalKey(SnowflakeTypeSchema),
          text: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 2000, {
                  expected: 'a string of at most 2000 characters',
                }),
              ),
            ),
          ),
          username: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          icon_url: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          attachments: Schema.optionalKey(
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
