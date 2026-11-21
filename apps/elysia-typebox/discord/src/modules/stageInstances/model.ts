import { t, type UnwrapSchema } from 'elysia'
import { SnowflakeTypeSchema, StageInstancesPrivacyLevelsSchema } from '../../components/schemas'

export const StageInstancesModel = {
  create_stage_instanceBody: t.Object({
    topic: t.String({ minLength: 1, maxLength: 120 }),
    channel_id: SnowflakeTypeSchema,
    privacy_level: t.Optional(t.Union([t.Null(), StageInstancesPrivacyLevelsSchema])),
    guild_scheduled_event_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
    send_start_notification: t.Optional(t.Union([t.Boolean(), t.Null()])),
  }),
  get_stage_instanceParams: t.Object({ channel_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  delete_stage_instanceParams: t.Object({ channel_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_stage_instanceParams: t.Object({ channel_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_stage_instanceBody: t.Object({
    topic: t.Optional(t.String({ minLength: 1, maxLength: 120 })),
    privacy_level: t.Optional(StageInstancesPrivacyLevelsSchema),
  }),
} as const

export type StageInstancesModel = {
  [k in keyof typeof StageInstancesModel]: UnwrapSchema<(typeof StageInstancesModel)[k]>
}
