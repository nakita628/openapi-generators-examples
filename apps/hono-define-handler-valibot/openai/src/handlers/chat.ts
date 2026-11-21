import { Hono } from 'hono'
import {
  getChatCompletionsHandler,
  postChatCompletionsHandler,
  getChatCompletionsCompletionIdHandler,
  postChatCompletionsCompletionIdHandler,
  deleteChatCompletionsCompletionIdHandler,
  getChatCompletionsCompletionIdMessagesHandler,
} from '../routes'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    getChatCompletionsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/chat/completions',
    postChatCompletionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/chat/completions/:completion_id',
    getChatCompletionsCompletionIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/chat/completions/:completion_id',
    postChatCompletionsCompletionIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/chat/completions/:completion_id',
    deleteChatCompletionsCompletionIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/chat/completions/:completion_id/messages',
    getChatCompletionsCompletionIdMessagesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
