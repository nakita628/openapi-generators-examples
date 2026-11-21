import { Hono } from 'hono'
import { getModelsHandler, getModelsModelHandler, deleteModelsModelHandler } from '../routes'

export const modelsHandler = new Hono()
  .get(
    '/models',
    getModelsHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/models/:model',
    getModelsModelHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/models/:model',
    deleteModelsModelHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
