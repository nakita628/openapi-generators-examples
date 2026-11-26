import { os } from '@orpc/server'
import * as v from 'valibot'
import { DetachModuleRequestSchema, GetModulesResponseSchema } from '../components'

export const postV2BotChannelDetach = os
  .route({
    method: 'POST',
    path: '/v2/bot/channel/detach',
    tags: ['line-module'],
    description:
      'The module channel admin calls the Detach API to detach the module channel from a LINE Official Account.',
  })
  .input(DetachModuleRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChatChatIdControlAcquire = os
  .route({
    method: 'POST',
    path: '/v2/bot/chat/{chatId}/control/acquire',
    tags: ['line-module'],
    description:
      'If the Standby Channel wants to take the initiative (Chat Control), it calls the Acquire Control API.\nThe channel that was previously an Active Channel will automatically switch to a Standby Channel.\n',
  })
  .input(
    v.object({
      chatId: v.string(),
      expired: v.optional(
        v.pipe(
          v.boolean(),
          v.description(
            "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
          ),
          v.metadata({ examples: [true] }),
        ),
      ),
      ttl: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChatChatIdControlRelease = os
  .route({
    method: 'POST',
    path: '/v2/bot/chat/{chatId}/control/release',
    tags: ['line-module'],
    description:
      'To return the initiative (Chat Control) of Active Channel to Primary Channel, call the Release Control API.\n',
  })
  .input(v.object({ chatId: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotList = os
  .route({
    method: 'GET',
    path: '/v2/bot/list',
    tags: ['line-module'],
    description:
      'Gets a list of basic information about the bots of multiple LINE Official Accounts that have attached module channels.',
  })
  .input(
    v.object({
      start: v.optional(v.string()),
      limit: v.optional(
        v.pipe(
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
      ),
    }),
  )
  .output(GetModulesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
