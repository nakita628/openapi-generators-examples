import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
} from '../components'

export const postStageInstances = os
  .route({
    method: 'POST',
    path: '/stage-instances',
    successDescription: '200 response for create_stage_instance',
  })
  .input(
    v.object({
      topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
      channel_id: SnowflakeTypeSchema,
      privacy_level: v.optional(v.union([v.nullable(v.null()), StageInstancesPrivacyLevelsSchema])),
      guild_scheduled_event_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
      send_start_notification: v.optional(v.nullable(v.boolean())),
    }),
  )
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getStageInstancesChannelId = os
  .route({
    method: 'GET',
    path: '/stage-instances/{channel_id}',
    successDescription: '200 response for get_stage_instance',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteStageInstancesChannelId = os
  .route({
    method: 'DELETE',
    path: '/stage-instances/{channel_id}',
    successStatus: 204,
    successDescription: '204 response for delete_stage_instance',
  })
  .input(v.object({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchStageInstancesChannelId = os
  .route({
    method: 'PATCH',
    path: '/stage-instances/{channel_id}',
    successDescription: '200 response for update_stage_instance',
  })
  .input(
    v.object({
      channel_id: SnowflakeTypeSchema,
      topic: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120))),
      privacy_level: v.optional(StageInstancesPrivacyLevelsSchema),
    }),
  )
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
