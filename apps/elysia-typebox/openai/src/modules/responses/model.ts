import { t, type UnwrapSchema } from 'elysia'
import { BetaIncludeEnumSchema, IncludeEnumSchema } from '../../components/schemas'

export const ResponsesModel = {
  getResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  getResponseQuery: t.Object({
    include: t.Optional(t.Array(IncludeEnumSchema)),
    stream: t.Optional(t.Boolean()),
    starting_after: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    include_obfuscation: t.Optional(t.Boolean()),
  }),
  deleteResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  deleteResponseResponse200: t.Object({
    object: t.Literal('response.deleted', { default: 'response.deleted' }),
    deleted: t.Boolean(),
    id: t.String(),
  }),
  cancelResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  listInputItemsParams: t.Object({ response_id: t.String() }),
  listInputItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(t.String()),
    include: t.Optional(t.Array(IncludeEnumSchema)),
  }),
  beta_getResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  beta_getResponseQuery: t.Object({
    include: t.Optional(t.Array(BetaIncludeEnumSchema)),
    stream: t.Optional(t.Boolean()),
    starting_after: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    include_obfuscation: t.Optional(t.Boolean()),
  }),
  beta_getResponseHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_deleteResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  beta_deleteResponseHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_deleteResponseResponse200: t.Object({
    object: t.Literal('response.deleted', { default: 'response.deleted' }),
    deleted: t.Boolean(),
    id: t.String(),
  }),
  beta_cancelResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  beta_cancelResponseHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_CompactconversationHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_listInputItemsParams: t.Object({ response_id: t.String() }),
  beta_listInputItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(t.String()),
    include: t.Optional(t.Array(BetaIncludeEnumSchema)),
  }),
  beta_listInputItemsHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_GetinputtokencountsHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
} as const

export type ResponsesModel = {
  [k in keyof typeof ResponsesModel]: UnwrapSchema<(typeof ResponsesModel)[k]>
}
