import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      topic: z.string().min(1).max(120),
      channel_id: SnowflakeTypeSchema,
      privacy_level: z.xor([z.null(), StageInstancesPrivacyLevelsSchema]).exactOptional(),
      guild_scheduled_event_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      send_start_notification: z.boolean().nullable().exactOptional(),
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
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteStageInstancesChannelId = os
  .route({
    method: 'DELETE',
    path: '/stage-instances/{channel_id}',
    successStatus: 204,
    successDescription: '204 response for delete_stage_instance',
  })
  .input(z.object({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchStageInstancesChannelId = os
  .route({
    method: 'PATCH',
    path: '/stage-instances/{channel_id}',
    successDescription: '200 response for update_stage_instance',
  })
  .input(
    z.object({
      channel_id: SnowflakeTypeSchema,
      topic: z.string().min(1).max(120).exactOptional(),
      privacy_level: StageInstancesPrivacyLevelsSchema.exactOptional(),
    }),
  )
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
