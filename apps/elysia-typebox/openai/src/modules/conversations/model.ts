import { t, type UnwrapSchema } from 'elysia'
import { InputItemSchema } from '../../components/schemas'

export const ConversationsModel = {
  listConversationItemsParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  listConversationItemsQuery: t.Object({
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
  createConversationItemsParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  createConversationItemsQuery: t.Object({
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
  createConversationItemsBody: t.Object({
    items: t.Array(InputItemSchema, {
      maxItems: 20,
      description: 'The items to add to the conversation. You may add up to 20 items at a time.\n',
    }),
  }),
  getConversationItemParams: t.Object({
    conversation_id: t.String({ example: 'conv_123' }),
    item_id: t.String({ example: 'msg_abc' }),
  }),
  getConversationItemQuery: t.Object({
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
  deleteConversationItemParams: t.Object({
    conversation_id: t.String({ example: 'conv_123' }),
    item_id: t.String({ example: 'msg_abc' }),
  }),
  getConversationParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  updateConversationParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  deleteConversationParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
} as const

export type ConversationsModel = {
  [k in keyof typeof ConversationsModel]: UnwrapSchema<(typeof ConversationsModel)[k]>
}
