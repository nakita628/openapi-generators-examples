import { Elysia, t } from 'elysia'
import {
  AcquireChatControlRequestSchema,
  DetachModuleRequestSchema,
  GetModulesResponseSchema,
  ModuleBotSchema,
} from '../../components/schemas'
import { V2Model } from './model'

export const v2 = new Elysia()
  .model({
    AcquireChatControlRequest: AcquireChatControlRequestSchema,
    DetachModuleRequest: DetachModuleRequestSchema,
    GetModulesResponse: GetModulesResponseSchema,
    ModuleBot: ModuleBotSchema,
  })
  .post('/v2/bot/channel/detach', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'DetachModuleRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['line-module'],
      description:
        'The module channel admin calls the Detach API to detach the module channel from a LINE Official Account.',
      operationId: 'detachModule',
    },
  })
  .post('/v2/bot/chat/:chatId/control/acquire', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: V2Model.acquireChatControlParams,
    body: 'AcquireChatControlRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['line-module'],
      description:
        'If the Standby Channel wants to take the initiative (Chat Control), it calls the Acquire Control API.\nThe channel that was previously an Active Channel will automatically switch to a Standby Channel.\n',
      operationId: 'acquireChatControl',
    },
  })
  .post('/v2/bot/chat/:chatId/control/release', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.releaseChatControlParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['line-module'],
      description:
        'To return the initiative (Chat Control) of Active Channel to Primary Channel, call the Release Control API.\n',
      operationId: 'releaseChatControl',
    },
  })
  .get('/v2/bot/list', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getModulesQuery,
    response: { 200: 'GetModulesResponse' },
    detail: {
      tags: ['line-module'],
      description:
        'Gets a list of basic information about the bots of multiple LINE Official Accounts that have attached module channels.',
      operationId: 'getModules',
    },
  })
