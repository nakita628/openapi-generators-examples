import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      topic: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
      channel_id: SnowflakeTypeSchema,
      'privacy_level?': type('null').or(StageInstancesPrivacyLevelsSchema),
      'guild_scheduled_event_id?': type('null').or(SnowflakeTypeSchema),
      'send_start_notification?': 'boolean | null',
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
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteStageInstancesChannelId = os
  .route({
    method: 'DELETE',
    path: '/stage-instances/{channel_id}',
    successStatus: 204,
    successDescription: '204 response for delete_stage_instance',
  })
  .input(type({ channel_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchStageInstancesChannelId = os
  .route({
    method: 'PATCH',
    path: '/stage-instances/{channel_id}',
    successDescription: '200 response for update_stage_instance',
  })
  .input(
    type({
      channel_id: SnowflakeTypeSchema,
      'topic?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters')),
      'privacy_level?': StageInstancesPrivacyLevelsSchema,
    }),
  )
  .output(StageInstanceResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
