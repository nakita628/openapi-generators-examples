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
    getChatCompletionsHandler(async (c, { query }) => {}),
  )
  .post(
    '/chat/completions',
    postChatCompletionsHandler(async (c, { json }) => {}),
  )
  .get(
    '/chat/completions/:completion_id',
    getChatCompletionsCompletionIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/chat/completions/:completion_id',
    postChatCompletionsCompletionIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/chat/completions/:completion_id',
    deleteChatCompletionsCompletionIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/chat/completions/:completion_id/messages',
    getChatCompletionsCompletionIdMessagesHandler(async (c, { param, query }) => {}),
  )
