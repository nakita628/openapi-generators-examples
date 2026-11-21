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
    postStageInstancesHandler(async (c, { json }) => {}),
  )
  .get(
    '/stage-instances/:channel_id',
    getStageInstancesChannelIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/stage-instances/:channel_id',
    deleteStageInstancesChannelIdHandler(async (c, { param }) => {}),
  )
  .patch(
    '/stage-instances/:channel_id',
    patchStageInstancesChannelIdHandler(async (c, { param, json }) => {}),
  )
