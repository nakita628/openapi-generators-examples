import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  AssistantObjectSchema,
  AssistantSupportedModelsSchema,
  AssistantToolsCodeSchema,
  AssistantToolsFileSearchSchema,
  AssistantToolsFunctionSchema,
  AssistantsApiResponseFormatOptionSchema,
  CreateAssistantRequestSchema,
  DeleteAssistantResponseSchema,
  ListAssistantsResponseSchema,
  MetadataSchema,
  ReasoningEffortSchema,
} from '../components'

const t = initTRPC.create()

export const assistantsRouter = t.router({
  getAssistants: t.procedure
    .input(
      type({
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    )
    .output(ListAssistantsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAssistants: t.procedure
    .input(CreateAssistantRequestSchema)
    .output(AssistantObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAssistantsAssistantId: t.procedure
    .input(type({ assistant_id: 'string' }))
    .output(AssistantObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAssistantsAssistantId: t.procedure
    .input(
      type({
        assistant_id: 'string',
        'model?': type('string')
          .or(AssistantSupportedModelsSchema)
          .describe(
            'ID of the model to use. You can use the [List models](https://developers.openai.com/api/reference/resources/models/methods/list) API to see all of your available models, or see our [Model overview](https://developers.openai.com/api/docs/models) for descriptions of them.\n',
          ),
        'reasoning_effort?': ReasoningEffortSchema,
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'))
            .describe('The name of the assistant. The maximum length is 256 characters.\n'),
        ).or('null | null'),
        'description?': type(
          type('string')
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'))
            .describe('The description of the assistant. The maximum length is 512 characters.\n'),
        ).or('null | null'),
        'instructions?': type(
          type('string')
            .narrow(
              (data, ctx) => [...data].length <= 256000 || ctx.mustBe('at most 256000 characters'),
            )
            .describe(
              'The system instructions that the assistant uses. The maximum length is 256,000 characters.\n',
            ),
        ).or('null | null'),
        'tools?': type(
          type(
            type(type(AssistantToolsCodeSchema).or(AssistantToolsFileSearchSchema)).or(
              AssistantToolsFunctionSchema,
            ),
          ).array(),
        )
          .and(type('unknown[] <= 128'))
          .describe(
            'A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.\n',
          ),
        'tool_resources?': type(
          type({
            'code_interpreter?': type({
              'file_ids?': type('string[]')
                .and(type('unknown[] <= 20'))
                .describe(
                  'Overrides the list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                ),
            }),
            'file_search?': type({
              'vector_store_ids?': type('string[]')
                .and(type('unknown[] <= 1'))
                .describe(
                  'Overrides the [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.\n',
                ),
            }),
          }).describe(
            "A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
          ),
        ).or('null | null'),
        'metadata?': MetadataSchema,
        'temperature?': type(
          type('number >= 0 & number <= 2').describe(
            'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
          ),
        ).or('null | null'),
        'top_p?': type(
          type('number >= 0 & number <= 1').describe(
            'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
          ),
        ).or('null | null'),
        'response_format?': type(AssistantsApiResponseFormatOptionSchema).or('null | null'),
      }),
    )
    .output(AssistantObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAssistantsAssistantId: t.procedure
    .input(type({ assistant_id: 'string' }))
    .output(DeleteAssistantResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
