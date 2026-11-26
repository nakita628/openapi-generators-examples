import { defineHandler } from 'hono/factory'
import { type } from 'arktype'

export const DetachModuleRequestSchema = type({
  'botId?': type('string').describe(
    'User ID of the LINE Official Account bot attached to the module channel.',
  ),
}).describe(
  'Unlink (detach) the module channel by the operation of the module channel administrator',
)

export type DetachModuleRequest = typeof DetachModuleRequestSchema.infer

export const AcquireChatControlRequestSchema = type({
  'expired?': type('boolean').describe(
    "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
  ),
  'ttl?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 31536000',
  ).describe(
    'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
  ),
}).describe('Request entity of the Acquire Control API')

export type AcquireChatControlRequest = typeof AcquireChatControlRequestSchema.infer

export const ModuleBotSchema = type({
  userId: type('string').describe("Bot's user ID"),
  basicId: type('string').describe("Bot's basic ID"),
  'premiumId?': type('string').describe(
    "Bot's premium ID. Not included in the response if the premium ID isn't set.",
  ),
  displayName: type('string').describe("Bot's display name"),
  'pictureUrl?': type('string').describe(
    "Profile image URL. Image URL starting with `https://`. Not included in the response if the bot doesn't have a profile image.",
  ),
}).describe('basic information about the bot.')

export type ModuleBot = typeof ModuleBotSchema.infer

export const GetModulesResponseSchema = type({
  bots: type(ModuleBotSchema)
    .array()
    .describe('Array of Bot list Item objects representing basic information about the bot.'),
  'next?': type('string').describe(
    'Continuation token.\nUsed to get the next array of basic bot information.\nThis property is only returned if there are more unreturned results.\n',
  ),
}).describe('List of bots to which the module is attached')

export type GetModulesResponse = typeof GetModulesResponseSchema.infer

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}

export const postV2BotChannelDetachHandler = defineHandler({
  json: { '~standard': DetachModuleRequestSchema['~standard'] },
})

export const postV2BotChatChatIdControlAcquireHandler = defineHandler({
  param: { '~standard': type({ chatId: 'string' })['~standard'] },
  json: { '~standard': AcquireChatControlRequestSchema['~standard'] },
})

export const postV2BotChatChatIdControlReleaseHandler = defineHandler({
  param: { '~standard': type({ chatId: 'string' })['~standard'] },
})

export const getV2BotListHandler = defineHandler({
  query: {
    '~standard': type({
      'start?': 'string',
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 100'),
    })['~standard'],
  },
  response: { '~standard': GetModulesResponseSchema['~standard'] },
})
