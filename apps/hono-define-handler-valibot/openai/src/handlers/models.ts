import { Hono } from 'hono'
import { getModelsHandler, getModelsModelHandler, deleteModelsModelHandler } from '../routes'

export const modelsHandler = new Hono()
  .get(
    '/models',
    getModelsHandler(async (c) => {}),
  )
  .get(
    '/models/:model',
    getModelsModelHandler(async (c, { param }) => {}),
  )
  .delete(
    '/models/:model',
    deleteModelsModelHandler(async (c, { param }) => {}),
  )
