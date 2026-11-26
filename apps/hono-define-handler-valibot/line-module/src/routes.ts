import { defineHandler } from 'hono/factory'
import * as v from 'valibot'

export const DetachModuleRequestSchema = v.pipe(
  v.partial(
    v.object({
      botId: v.pipe(
        v.string(),
        v.description('User ID of the LINE Official Account bot attached to the module channel.'),
      ),
    }),
  ),
  v.description(
    'Unlink (detach) the module channel by the operation of the module channel administrator',
  ),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#unlink-detach-module-channel-by-operation-mc-admin',
    },
  }),
)

export type DetachModuleRequest = v.InferOutput<typeof DetachModuleRequestSchema>

export const AcquireChatControlRequestSchema = v.pipe(
  v.partial(
    v.object({
      expired: v.pipe(
        v.boolean(),
        v.description(
          "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
        ),
        v.metadata({ examples: [true] }),
      ),
      ttl: v.pipe(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.maxValue(31536000),
        ),
        v.description(
          'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
        ),
        v.metadata({ examples: [3600] }),
      ),
    }),
  ),
  v.description('Request entity of the Acquire Control API'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#acquire-control-api',
    },
  }),
)

export type AcquireChatControlRequest = v.InferOutput<typeof AcquireChatControlRequestSchema>

export const ModuleBotSchema = v.pipe(
  v.object({
    userId: v.pipe(v.string(), v.description("Bot's user ID")),
    basicId: v.pipe(v.string(), v.description("Bot's basic ID")),
    premiumId: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "Bot's premium ID. Not included in the response if the premium ID isn't set.",
        ),
      ),
    ),
    displayName: v.pipe(v.string(), v.description("Bot's display name")),
    pictureUrl: v.optional(
      v.pipe(
        v.string(),
        v.description(
          "Profile image URL. Image URL starting with `https://`. Not included in the response if the bot doesn't have a profile image.",
        ),
      ),
    ),
  }),
  v.description('basic information about the bot.'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  }),
)

export type ModuleBot = v.InferOutput<typeof ModuleBotSchema>

export const GetModulesResponseSchema = v.pipe(
  v.object({
    bots: v.pipe(
      v.array(ModuleBotSchema),
      v.description('Array of Bot list Item objects representing basic information about the bot.'),
    ),
    next: v.optional(
      v.pipe(
        v.string(),
        v.description(
          'Continuation token.\nUsed to get the next array of basic bot information.\nThis property is only returned if there are more unreturned results.\n',
        ),
      ),
    ),
  }),
  v.description('List of bots to which the module is attached'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  }),
)

export type GetModulesResponse = v.InferOutput<typeof GetModulesResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}

export const postV2BotChannelDetachHandler = defineHandler({ json: DetachModuleRequestSchema })

export const postV2BotChatChatIdControlAcquireHandler = defineHandler({
  param: v.object({ chatId: v.string() }),
  json: AcquireChatControlRequestSchema,
})

export const postV2BotChatChatIdControlReleaseHandler = defineHandler({
  param: v.object({ chatId: v.string() }),
})

export const getV2BotListHandler = defineHandler({
  query: v.object({
    start: v.optional(v.string()),
    limit: v.pipe(
      v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer', minimum: -2147483648, maximum: 100 }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.maxValue(100),
        ),
        '100',
      ),
      v.metadata({ default: 100 }),
    ),
  }),
  response: GetModulesResponseSchema,
})
