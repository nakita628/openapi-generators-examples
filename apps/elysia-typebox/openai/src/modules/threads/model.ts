import { t, type UnwrapSchema } from 'elysia'

export const ThreadsModel = {
  getThreadParams: t.Object({ thread_id: t.String() }),
  modifyThreadParams: t.Object({ thread_id: t.String() }),
  deleteThreadParams: t.Object({ thread_id: t.String() }),
  listMessagesParams: t.Object({ thread_id: t.String() }),
  listMessagesQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
    run_id: t.Optional(t.String()),
  }),
  createMessageParams: t.Object({ thread_id: t.String() }),
  getMessageParams: t.Object({ thread_id: t.String(), message_id: t.String() }),
  modifyMessageParams: t.Object({ thread_id: t.String(), message_id: t.String() }),
  deleteMessageParams: t.Object({ thread_id: t.String(), message_id: t.String() }),
  listRunsParams: t.Object({ thread_id: t.String() }),
  listRunsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  createRunParams: t.Object({ thread_id: t.String() }),
  createRunQuery: t.Object({
    'include[]': t.Optional(
      t.Array(t.Literal('step_details.tool_calls[*].file_search.results[*].content')),
    ),
  }),
  getRunParams: t.Object({ thread_id: t.String(), run_id: t.String() }),
  modifyRunParams: t.Object({ thread_id: t.String(), run_id: t.String() }),
  cancelRunParams: t.Object({ thread_id: t.String(), run_id: t.String() }),
  listRunStepsParams: t.Object({ thread_id: t.String(), run_id: t.String() }),
  listRunStepsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
    'include[]': t.Optional(
      t.Array(t.Literal('step_details.tool_calls[*].file_search.results[*].content')),
    ),
  }),
  getRunStepParams: t.Object({ thread_id: t.String(), run_id: t.String(), step_id: t.String() }),
  getRunStepQuery: t.Object({
    'include[]': t.Optional(
      t.Array(t.Literal('step_details.tool_calls[*].file_search.results[*].content')),
    ),
  }),
  submitToolOuputsToRunParams: t.Object({ thread_id: t.String(), run_id: t.String() }),
} as const

export type ThreadsModel = {
  [k in keyof typeof ThreadsModel]: UnwrapSchema<(typeof ThreadsModel)[k]>
}
