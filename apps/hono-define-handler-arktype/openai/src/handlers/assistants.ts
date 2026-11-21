import { Hono } from 'hono'
import {
  getAssistantsHandler,
  postAssistantsHandler,
  getAssistantsAssistantIdHandler,
  postAssistantsAssistantIdHandler,
  deleteAssistantsAssistantIdHandler,
} from '../routes'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
    getAssistantsHandler(async (c, { query }) => {}),
  )
  .post(
    '/assistants',
    postAssistantsHandler(async (c, { json }) => {}),
  )
  .get(
    '/assistants/:assistant_id',
    getAssistantsAssistantIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/assistants/:assistant_id',
    postAssistantsAssistantIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/assistants/:assistant_id',
    deleteAssistantsAssistantIdHandler(async (c, { param }) => {}),
  )
