import { t, type UnwrapSchema } from 'elysia'
import { OrderEnumSchema } from '../../components/schemas'

export const SkillsModel = {
  ListSkillsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(OrderEnumSchema),
    after: t.Optional(
      t.String({
        description: 'Identifier for the last item from the previous pagination request',
      }),
    ),
  }),
  GetSkillParams: t.Object({ skill_id: t.String({ example: 'skill_123' }) }),
  UpdateSkillDefaultVersionParams: t.Object({ skill_id: t.String({ example: 'skill_123' }) }),
  DeleteSkillParams: t.Object({ skill_id: t.String({ example: 'skill_123' }) }),
  GetSkillContentParams: t.Object({ skill_id: t.String({ example: 'skill_123' }) }),
  GetSkillContentResponse200: t.String(),
  ListSkillVersionsParams: t.Object({ skill_id: t.String({ example: 'skill_123' }) }),
  ListSkillVersionsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(OrderEnumSchema),
    after: t.Optional(t.String({ example: 'skillver_123' })),
  }),
  CreateSkillVersionParams: t.Object({ skill_id: t.String({ example: 'skill_123' }) }),
  GetSkillVersionParams: t.Object({
    skill_id: t.String({ example: 'skill_123' }),
    version: t.String({ description: 'The version number to retrieve.' }),
  }),
  DeleteSkillVersionParams: t.Object({
    skill_id: t.String({ example: 'skill_123' }),
    version: t.String({ description: 'The skill version number.' }),
  }),
  GetSkillVersionContentParams: t.Object({
    skill_id: t.String({ example: 'skill_123' }),
    version: t.String({ description: 'The skill version number.' }),
  }),
  GetSkillVersionContentResponse200: t.String(),
} as const

export type SkillsModel = { [k in keyof typeof SkillsModel]: UnwrapSchema<(typeof SkillsModel)[k]> }
