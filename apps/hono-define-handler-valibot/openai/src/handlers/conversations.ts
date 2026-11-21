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
    getConversationsConversationIdItemsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/conversations/:conversation_id/items',
    postConversationsConversationIdItemsHandler(async (c, { param, query, json }) => {}),
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    getConversationsConversationIdItemsItemIdHandler(async (c, { param, query }) => {}),
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    deleteConversationsConversationIdItemsItemIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/conversations',
    postConversationsHandler(async (c, { json }) => {}),
  )
  .get(
    '/conversations/:conversation_id',
    getConversationsConversationIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/conversations/:conversation_id',
    postConversationsConversationIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/conversations/:conversation_id',
    deleteConversationsConversationIdHandler(async (c, { param }) => {}),
  )
