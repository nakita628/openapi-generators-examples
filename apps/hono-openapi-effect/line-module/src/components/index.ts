import { Schema } from 'effect'

export const DetachModuleRequestSchema = Schema.Struct({
  botId: Schema.optionalKey(
    Schema.String.annotate({
      description: 'User ID of the LINE Official Account bot attached to the module channel.',
    }),
  ),
})
  .annotate({
    description:
      'Unlink (detach) the module channel by the operation of the module channel administrator',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#unlink-detach-module-channel-by-operation-mc-admin',
    },
  })
  .annotate({ identifier: 'DetachModuleRequest' })

export type DetachModuleRequest = Schema.Schema.Type<typeof DetachModuleRequestSchema>

export const AcquireChatControlRequestSchema = Schema.Struct({
  expired: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
      jsonSchemaExamples: [true],
    }),
  ),
  ttl: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32(), Schema.isLessThanOrEqualTo(31536000)).annotate({
      description:
        'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
      jsonSchemaExamples: [3600],
    }),
  ),
})
  .annotate({
    description: 'Request entity of the Acquire Control API',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#acquire-control-api',
    },
  })
  .annotate({ identifier: 'AcquireChatControlRequest' })

export type AcquireChatControlRequest = Schema.Schema.Type<typeof AcquireChatControlRequestSchema>

export const ModuleBotSchema = Schema.Struct({
  userId: Schema.String.annotate({ description: "Bot's user ID" }),
  basicId: Schema.String.annotate({ description: "Bot's basic ID" }),
  premiumId: Schema.optionalKey(
    Schema.String.annotate({
      description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
    }),
  ),
  displayName: Schema.String.annotate({ description: "Bot's display name" }),
  pictureUrl: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Profile image URL. Image URL starting with `https://`. Not included in the response if the bot doesn't have a profile image.",
    }),
  ),
})
  .annotate({
    description: 'basic information about the bot.',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  })
  .annotate({ identifier: 'ModuleBot' })

export type ModuleBot = Schema.Schema.Type<typeof ModuleBotSchema>

export const GetModulesResponseSchema = Schema.Struct({
  bots: Schema.Array(ModuleBotSchema).annotate({
    description: 'Array of Bot list Item objects representing basic information about the bot.',
  }),
  next: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Continuation token.\nUsed to get the next array of basic bot information.\nThis property is only returned if there are more unreturned results.\n',
    }),
  ),
})
  .annotate({
    description: 'List of bots to which the module is attached',
    jsonSchemaExternalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  })
  .annotate({ identifier: 'GetModulesResponse' })

export type GetModulesResponse = Schema.Schema.Type<typeof GetModulesResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
