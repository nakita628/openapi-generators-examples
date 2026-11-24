import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
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
    .input(v.object({ assistant_id: v.string() }))
    .output(AssistantObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAssistantsAssistantId: t.procedure
    .input(
      v.object({
        assistant_id: v.string(),
        model: v.optional(
          v.pipe(
            v.union([v.string(), AssistantSupportedModelsSchema]),
            v.description(
              'ID of the model to use. You can use the [List models](https://developers.openai.com/api/reference/resources/models/methods/list) API to see all of your available models, or see our [Model overview](https://developers.openai.com/api/docs/models) for descriptions of them.\n',
            ),
          ),
        ),
        reasoning_effort: v.optional(ReasoningEffortSchema),
        name: v.optional(
          v.union([
            v.pipe(
              v.pipe(v.string(), v.maxCodePoints(256)),
              v.description('The name of the assistant. The maximum length is 256 characters.\n'),
            ),
            v.null(),
          ]),
        ),
        description: v.optional(
          v.union([
            v.pipe(
              v.pipe(v.string(), v.maxCodePoints(512)),
              v.description(
                'The description of the assistant. The maximum length is 512 characters.\n',
              ),
            ),
            v.null(),
          ]),
        ),
        instructions: v.optional(
          v.union([
            v.pipe(
              v.pipe(v.string(), v.maxCodePoints(256000)),
              v.description(
                'The system instructions that the assistant uses. The maximum length is 256,000 characters.\n',
              ),
            ),
            v.null(),
          ]),
        ),
        tools: v.pipe(
          v.optional(
            v.pipe(
              v.array(
                v.union([
                  AssistantToolsCodeSchema,
                  AssistantToolsFileSearchSchema,
                  AssistantToolsFunctionSchema,
                ]),
              ),
              v.maxLength(128),
            ),
            [],
          ),
          v.description(
            'A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.\n',
          ),
        ),
        tool_resources: v.optional(
          v.union([
            v.pipe(
              v.partial(
                v.object({
                  code_interpreter: v.object({
                    file_ids: v.pipe(
                      v.optional(v.pipe(v.array(v.string()), v.maxLength(20)), []),
                      v.description(
                        'Overrides the list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                      ),
                    ),
                  }),
                  file_search: v.partial(
                    v.object({
                      vector_store_ids: v.pipe(
                        v.pipe(v.array(v.string()), v.maxLength(1)),
                        v.description(
                          'Overrides the [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.\n',
                        ),
                      ),
                    }),
                  ),
                }),
              ),
              v.description(
                "A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
              ),
            ),
            v.null(),
          ]),
        ),
        metadata: v.optional(MetadataSchema),
        temperature: v.optional(
          v.union([
            v.pipe(
              v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(2)), 1),
              v.description(
                'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
              ),
              v.metadata({ examples: [1] }),
            ),
            v.null(),
          ]),
        ),
        top_p: v.optional(
          v.union([
            v.pipe(
              v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(1)), 1),
              v.description(
                'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
              ),
              v.metadata({ examples: [1] }),
            ),
            v.null(),
          ]),
        ),
        response_format: v.optional(v.union([AssistantsApiResponseFormatOptionSchema, v.null()])),
      }),
    )
    .output(AssistantObjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAssistantsAssistantId: t.procedure
    .input(v.object({ assistant_id: v.string() }))
    .output(DeleteAssistantResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
