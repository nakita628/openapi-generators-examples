import { t, type UnwrapSchema } from 'elysia'

export const ResponsesModel = {
  getResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  getResponseQuery: t.Object({
    include: t.Optional(
      t.Array(
        t.UnionEnum(
          [
            'file_search_call.results',
            'web_search_call.results',
            'web_search_call.action.sources',
            'message.input_image.image_url',
            'computer_call_output.output.image_url',
            'code_interpreter_call.outputs',
            'reasoning.encrypted_content',
            'message.output_text.logprobs',
          ],
          {
            description:
              'Specify additional output data to include in the model response. Currently supported values are:\n- `web_search_call.results`: Include the search results of the web search tool call.\n- `web_search_call.action.sources`: Include the sources of the web search tool call.\n- `code_interpreter_call.outputs`: Includes the outputs of python code execution in code interpreter tool call items.\n- `computer_call_output.output.image_url`: Include image urls from the computer call output.\n- `file_search_call.results`: Include the search results of the file search tool call.\n- `message.input_image.image_url`: Include image urls from the input message.\n- `message.output_text.logprobs`: Include logprobs with assistant messages.\n- `reasoning.encrypted_content`: Includes an encrypted version of reasoning tokens in reasoning item outputs. This enables reasoning items to be used in multi-turn conversations when using the Responses API statelessly (like when the `store` parameter is set to `false`, or when an organization is enrolled in the zero data retention program).',
            default: undefined,
          },
        ),
      ),
    ),
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
    include: t.Optional(
      t.Array(
        t.UnionEnum(
          [
            'file_search_call.results',
            'web_search_call.results',
            'web_search_call.action.sources',
            'message.input_image.image_url',
            'computer_call_output.output.image_url',
            'code_interpreter_call.outputs',
            'reasoning.encrypted_content',
            'message.output_text.logprobs',
          ],
          {
            description:
              'Specify additional output data to include in the model response. Currently supported values are:\n- `web_search_call.results`: Include the search results of the web search tool call.\n- `web_search_call.action.sources`: Include the sources of the web search tool call.\n- `code_interpreter_call.outputs`: Includes the outputs of python code execution in code interpreter tool call items.\n- `computer_call_output.output.image_url`: Include image urls from the computer call output.\n- `file_search_call.results`: Include the search results of the file search tool call.\n- `message.input_image.image_url`: Include image urls from the input message.\n- `message.output_text.logprobs`: Include logprobs with assistant messages.\n- `reasoning.encrypted_content`: Includes an encrypted version of reasoning tokens in reasoning item outputs. This enables reasoning items to be used in multi-turn conversations when using the Responses API statelessly (like when the `store` parameter is set to `false`, or when an organization is enrolled in the zero data retention program).',
            default: undefined,
          },
        ),
      ),
    ),
  }),
  beta_cancelResponseParams: t.Object({
    response_id: t.String({ example: 'resp_677efb5139a88190b512bc3fef8e535d' }),
  }),
  beta_cancelResponseHeaders: t.Object({
    'openai-beta': t.Optional(t.ArrayQuery(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_CompactconversationHeaders: t.Object({
    'openai-beta': t.Optional(t.ArrayQuery(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_listInputItemsParams: t.Object({ response_id: t.String() }),
  beta_listInputItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(t.String()),
    include: t.Optional(
      t.Array(
        t.UnionEnum(
          [
            'file_search_call.results',
            'web_search_call.results',
            'web_search_call.action.sources',
            'message.input_image.image_url',
            'computer_call_output.output.image_url',
            'code_interpreter_call.outputs',
            'reasoning.encrypted_content',
            'message.output_text.logprobs',
          ],
          {
            description:
              'Specify additional output data to include in the model response. Currently supported values are:\n- `web_search_call.results`: Include the search results of the web search tool call.\n- `web_search_call.action.sources`: Include the sources of the web search tool call.\n- `code_interpreter_call.outputs`: Includes the outputs of python code execution in code interpreter tool call items.\n- `computer_call_output.output.image_url`: Include image urls from the computer call output.\n- `file_search_call.results`: Include the search results of the file search tool call.\n- `message.input_image.image_url`: Include image urls from the input message.\n- `message.output_text.logprobs`: Include logprobs with assistant messages.\n- `reasoning.encrypted_content`: Includes an encrypted version of reasoning tokens in reasoning item outputs. This enables reasoning items to be used in multi-turn conversations when using the Responses API statelessly (like when the `store` parameter is set to `false`, or when an organization is enrolled in the zero data retention program).',
            default: undefined,
          },
        ),
      ),
    ),
  }),
  beta_listInputItemsHeaders: t.Object({
    'openai-beta': t.Optional(t.ArrayQuery(t.Literal('responses_multi_agent=v1'))),
  }),
  beta_GetinputtokencountsHeaders: t.Object({
    'openai-beta': t.Optional(t.ArrayQuery(t.Literal('responses_multi_agent=v1'))),
  }),
} as const

export type ResponsesModel = {
  [k in keyof typeof ResponsesModel]: UnwrapSchema<(typeof ResponsesModel)[k]>
}
