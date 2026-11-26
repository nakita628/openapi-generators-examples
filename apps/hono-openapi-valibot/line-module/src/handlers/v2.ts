import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  DetachModuleRequestSchema,
  AcquireChatControlRequestSchema,
  GetModulesResponseSchema,
} from '../components'

export const v2Handler = new Hono()
  .post(
    '/v2/bot/channel/detach',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/partner-docs/#unlink-detach-module-channel-by-operation-mc-admin',
      },
      tags: ['line-module'],
      operationId: 'detachModule',
      description:
        'The module channel admin calls the Detach API to detach the module channel from a LINE Official Account.',
      responses: { '200': { description: 'OK' } },
    }),
    validator('json', DetachModuleRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/partner-docs/#acquire-control-api',
      },
      tags: ['line-module'],
      operationId: 'acquireChatControl',
      description:
        'If the Standby Channel wants to take the initiative (Chat Control), it calls the Acquire Control API.\nThe channel that was previously an Active Channel will automatically switch to a Standby Channel.\n',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', v.object({ chatId: v.string() })),
    validator('json', AcquireChatControlRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/partner-docs/#release-control-api',
      },
      tags: ['line-module'],
      operationId: 'releaseChatControl',
      description:
        'To return the initiative (Chat Control) of Active Channel to Primary Channel, call the Release Control API.\n',
      responses: { '200': { description: 'OK' } },
    }),
    validator('param', v.object({ chatId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/partner-docs/#get-multiple-bot-info-api',
      },
      tags: ['line-module'],
      operationId: 'getModules',
      description:
        'Gets a list of basic information about the bots of multiple LINE Official Accounts that have attached module channels.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(GetModulesResponseSchema),
              example: {
                bots: [
                  {
                    userId: 'Uf2dd6e8b081d2ff9c05c98a8a8b269c9',
                    basicId: '@628...',
                    displayName: 'Test01',
                    pictureUrl: 'https://profile.line-scdn.net/0hyxytJNAlJldEDQzlatVZAHhIKDoz...',
                  },
                  {
                    userId: 'Ua831d37bfe8232808202b85127663f70',
                    basicId: '@076lu...',
                    displayName: 'Test02',
                    pictureUrl: 'https://profile.line-scdn.net/0hohnizdyzMEdTECbnVo9PEG9VPiok...',
                  },
                  {
                    userId: 'Ub77ea431fba86f7c159a0c0f5be43d9f',
                    basicId: '@290n...',
                    displayName: 'Test03',
                  },
                  {
                    userId: 'Ub8ec80a14e879e9c6833fb4cee0e632b',
                    basicId: '@793j...',
                    displayName: 'Test04',
                  },
                ],
              },
            },
          },
        },
      },
    }),
    validator(
      'query',
      v.object({
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
