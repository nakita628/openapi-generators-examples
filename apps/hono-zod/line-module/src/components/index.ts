import * as z from 'zod'

export const DetachModuleRequestSchema = z
  .object({
    botId: z
      .string()
      .meta({
        description: 'User ID of the LINE Official Account bot attached to the module channel.',
      })
      .exactOptional(),
  })
  .meta({
    description:
      'Unlink (detach) the module channel by the operation of the module channel administrator',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#unlink-detach-module-channel-by-operation-mc-admin',
    },
  })

export type DetachModuleRequest = z.infer<typeof DetachModuleRequestSchema>

export const AcquireChatControlRequestSchema = z
  .object({
    expired: z
      .boolean()
      .meta({
        description:
          "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
        examples: [true],
      })
      .exactOptional(),
    ttl: z
      .int32()
      .max(31536000)
      .meta({
        description:
          'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
        examples: [3600],
      })
      .exactOptional(),
  })
  .meta({
    description: 'Request entity of the Acquire Control API',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#acquire-control-api',
    },
  })

export type AcquireChatControlRequest = z.infer<typeof AcquireChatControlRequestSchema>

export const ModuleBotSchema = z
  .object({
    userId: z.string().meta({ description: "Bot's user ID" }),
    basicId: z.string().meta({ description: "Bot's basic ID" }),
    premiumId: z
      .string()
      .meta({
        description: "Bot's premium ID. Not included in the response if the premium ID isn't set.",
      })
      .exactOptional(),
    displayName: z.string().meta({ description: "Bot's display name" }),
    pictureUrl: z
      .string()
      .meta({
        description:
          "Profile image URL. Image URL starting with `https://`. Not included in the response if the bot doesn't have a profile image.",
      })
      .exactOptional(),
  })
  .meta({
    description: 'basic information about the bot.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  })

export type ModuleBot = z.infer<typeof ModuleBotSchema>

export const GetModulesResponseSchema = z
  .object({
    bots: z
      .array(ModuleBotSchema)
      .meta({
        description: 'Array of Bot list Item objects representing basic information about the bot.',
      }),
    next: z
      .string()
      .meta({
        description:
          'Continuation token.\nUsed to get the next array of basic bot information.\nThis property is only returned if there are more unreturned results.\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'List of bots to which the module is attached',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
    },
  })

export type GetModulesResponse = z.infer<typeof GetModulesResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
