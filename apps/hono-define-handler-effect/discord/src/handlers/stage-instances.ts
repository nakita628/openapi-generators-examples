import { Hono } from 'hono'
import {
  postStageInstancesHandler,
  getStageInstancesChannelIdHandler,
  deleteStageInstancesChannelIdHandler,
  patchStageInstancesChannelIdHandler,
} from '../routes'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    postStageInstancesHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/stage-instances/:channel_id',
    getStageInstancesChannelIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/stage-instances/:channel_id',
    deleteStageInstancesChannelIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/stage-instances/:channel_id',
    patchStageInstancesChannelIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
