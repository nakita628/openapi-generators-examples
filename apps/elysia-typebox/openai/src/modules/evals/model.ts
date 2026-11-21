import { t, type UnwrapSchema } from 'elysia'
import { MetadataSchema } from '../../components/schemas'

export const EvalsModel = {
  listEvalsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
    order_by: t.Optional(t.UnionEnum(['created_at', 'updated_at'], { default: 'created_at' })),
  }),
  getEvalParams: t.Object({ eval_id: t.String() }),
  updateEvalParams: t.Object({ eval_id: t.String() }),
  updateEvalBody: t.Object({
    name: t.Optional(t.String({ description: 'Rename the evaluation.' })),
    metadata: t.Optional(MetadataSchema),
  }),
  deleteEvalParams: t.Object({ eval_id: t.String() }),
  deleteEvalResponse200: t.Object({
    object: t.String({ example: 'eval.deleted' }),
    deleted: t.Boolean({ example: true }),
    eval_id: t.String({ example: 'eval_abc123' }),
  }),
  getEvalRunsParams: t.Object({ eval_id: t.String() }),
  getEvalRunsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
    status: t.Optional(
      t.UnionEnum(['queued', 'in_progress', 'completed', 'canceled', 'failed'], {
        default: undefined,
      }),
    ),
  }),
  createEvalRunParams: t.Object({ eval_id: t.String() }),
  getEvalRunParams: t.Object({ eval_id: t.String(), run_id: t.String() }),
  deleteEvalRunParams: t.Object({ eval_id: t.String(), run_id: t.String() }),
  deleteEvalRunResponse200: t.Object({
    object: t.Optional(t.String({ example: 'eval.run.deleted' })),
    deleted: t.Optional(t.Boolean({ example: true })),
    run_id: t.Optional(t.String({ example: 'evalrun_677469f564d48190807532a852da3afb' })),
  }),
  cancelEvalRunParams: t.Object({ eval_id: t.String(), run_id: t.String() }),
  getEvalRunOutputItemsParams: t.Object({ eval_id: t.String(), run_id: t.String() }),
  getEvalRunOutputItemsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    status: t.Optional(t.UnionEnum(['fail', 'pass'], { default: undefined })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
  getEvalRunOutputItemParams: t.Object({
    eval_id: t.String(),
    run_id: t.String(),
    output_item_id: t.String(),
  }),
} as const

export type EvalsModel = { [k in keyof typeof EvalsModel]: UnwrapSchema<(typeof EvalsModel)[k]> }
