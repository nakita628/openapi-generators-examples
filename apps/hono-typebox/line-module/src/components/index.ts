import { Type, type Static } from 'typebox'

export const DetachModuleRequestSchema = Type.Object(
  {
    botId: Type.Optional(
      Type.String({
        description: 'User ID of the LINE Official Account bot attached to the module channel.',
      }),
    ),
  },
  {
    description:
      'Unlink (detach) the module channel by the operation of the module channel administrator',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#unlink-detach-module-channel-by-operation-mc-admin',
    },
  },
)

export type DetachModuleRequest = Static<typeof DetachModuleRequestSchema>

export const AcquireChatControlRequestSchema = Type.Object(
  {
    expired: Type.Optional(
      Type.Boolean({
        description:
          "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
        examples: [true],
      }),
    ),
    ttl: Type.Optional(
      Type.Integer({
        maximum: 31536000,
        description:
          'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
        examples: [3600],
      }),
    ),
  },
  {
    description: 'Request entity of the Acquire Control API',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#acquire-control-api',
    },
  },
)

export type AcquireChatControlRequest = Static<typeof AcquireChatControlRequestSchema>

export const ModuleBotSchema = Type.Object(
  {
    userId: Type.String({ description: "Bot's user ID" }),
    basicId: Type.String({ description: "Bot's basic ID" }),
    premiumId: Type.Optional(
      Type.String({
        description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
      }),
    ),
    displayName: Type.String({ description: "Bot's display name" }),
    pictureUrl: Type.Optional(
      Type.String({
        description:
          "Profile image URL. Image URL starting with `https://`. Not included in the response if the bot doesn't have a profile image.",
      }),
    ),
  },
  {
    description: 'basic information about the bot.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  },
)

export type ModuleBot = Static<typeof ModuleBotSchema>

export const GetModulesResponseSchema = Type.Object(
  {
    bots: Type.Array(ModuleBotSchema, {
      description: 'Array of Bot list Item objects representing basic information about the bot.',
    }),
    next: Type.Optional(
      Type.String({
        description:
          'Continuation token.\nUsed to get the next array of basic bot information.\nThis property is only returned if there are more unreturned results.\n',
      }),
    ),
  },
  {
    description: 'List of bots to which the module is attached',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  },
)

export type GetModulesResponse = Static<typeof GetModulesResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
