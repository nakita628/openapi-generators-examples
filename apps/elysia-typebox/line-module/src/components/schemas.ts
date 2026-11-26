import { t } from 'elysia'

export const DetachModuleRequestSchema = t.Object(
  {
    botId: t.Optional(
      t.String({
        description: 'User ID of the LINE Official Account bot attached to the module channel.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#unlink-detach-module-channel-by-operation-mc-admin',
    },
    description:
      'Unlink (detach) the module channel by the operation of the module channel administrator',
  },
)

export const AcquireChatControlRequestSchema = t.Object(
  {
    expired: t.Optional(
      t.Boolean({
        example: true,
        description:
          "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
      }),
    ),
    ttl: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 31536000,
        example: 3600,
        description:
          'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#acquire-control-api',
    },
    description: 'Request entity of the Acquire Control API',
  },
)

export const ModuleBotSchema = t.Object(
  {
    userId: t.String({ description: "Bot's user ID" }),
    basicId: t.String({ description: "Bot's basic ID" }),
    premiumId: t.Optional(
      t.String({
        description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
      }),
    ),
    displayName: t.String({ description: "Bot's display name" }),
    pictureUrl: t.Optional(
      t.String({
        description:
          "Profile image URL. Image URL starting with `https://`. Not included in the response if the bot doesn't have a profile image.",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
    description: 'basic information about the bot.',
  },
)

export const GetModulesResponseSchema = t.Object(
  {
    bots: t.Array(ModuleBotSchema, {
      description: 'Array of Bot list Item objects representing basic information about the bot.',
    }),
    next: t.Optional(
      t.String({
        description:
          'Continuation token.\nUsed to get the next array of basic bot information.\nThis property is only returned if there are more unreturned results.\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
    description: 'List of bots to which the module is attached',
  },
)
