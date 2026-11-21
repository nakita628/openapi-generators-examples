import { Hono } from 'hono'
import {
  getConversationsConversationIdItemsHandler,
  postConversationsConversationIdItemsHandler,
  getConversationsConversationIdItemsItemIdHandler,
  deleteConversationsConversationIdItemsItemIdHandler,
  postConversationsHandler,
  getConversationsConversationIdHandler,
  postConversationsConversationIdHandler,
  deleteConversationsConversationIdHandler,
} from '../routes'

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    getConversationsConversationIdItemsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/conversations/:conversation_id/items',
    postConversationsConversationIdItemsHandler(async (c, { param, query, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    getConversationsConversationIdItemsItemIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    deleteConversationsConversationIdItemsItemIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/conversations',
    postConversationsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/conversations/:conversation_id',
    getConversationsConversationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/conversations/:conversation_id',
    postConversationsConversationIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/conversations/:conversation_id',
    deleteConversationsConversationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
