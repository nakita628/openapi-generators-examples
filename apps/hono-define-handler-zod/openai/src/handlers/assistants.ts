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
    getAssistantsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/assistants',
    postAssistantsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/assistants/:assistant_id',
    getAssistantsAssistantIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/assistants/:assistant_id',
    postAssistantsAssistantIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/assistants/:assistant_id',
    deleteAssistantsAssistantIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
