import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListAssistantsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAssistants: t.procedure
    .input(Schema.toStandardSchemaV1(CreateAssistantRequestSchema))
    .output(Schema.toStandardSchemaV1(AssistantObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAssistantsAssistantId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(AssistantObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAssistantsAssistantId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          assistant_id: Schema.String,
          model: Schema.optionalKey(
            Schema.Union([Schema.String, AssistantSupportedModelsSchema]).annotate({
              description:
                'ID of the model to use. You can use the [List models](https://developers.openai.com/api/reference/resources/models/methods/list) API to see all of your available models, or see our [Model overview](https://developers.openai.com/api/docs/models) for descriptions of them.\n',
            }),
          ),
          reasoning_effort: Schema.optionalKey(ReasoningEffortSchema),
          name: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 256, {
                  expected: 'a string of at most 256 characters',
                }),
              ).annotate({
                description: 'The name of the assistant. The maximum length is 256 characters.\n',
              }),
              Schema.Null,
            ]),
          ),
          description: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ).annotate({
                description:
                  'The description of the assistant. The maximum length is 512 characters.\n',
              }),
              Schema.Null,
            ]),
          ),
          instructions: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 256000, {
                  expected: 'a string of at most 256000 characters',
                }),
              ).annotate({
                description:
                  'The system instructions that the assistant uses. The maximum length is 256,000 characters.\n',
              }),
              Schema.Null,
            ]),
          ),
          tools: Schema.Array(
            Schema.Union([
              AssistantToolsCodeSchema,
              AssistantToolsFileSearchSchema,
              AssistantToolsFunctionSchema,
            ]),
          )
            .check(Schema.isMaxLength(128))
            .pipe(Schema.withDecodingDefault(Effect.succeed([])))
            .annotate({
              description:
                'A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.\n',
            }),
          tool_resources: Schema.Union([
            Schema.Struct({
              code_interpreter: Schema.Struct({
                file_ids: Schema.Array(Schema.String)
                  .check(Schema.isMaxLength(20))
                  .pipe(Schema.withDecodingDefault(Effect.succeed([])))
                  .annotate({
                    description:
                      'Overrides the list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                  }),
              }),
              file_search: Schema.optionalKey(
                Schema.Struct({
                  vector_store_ids: Schema.optionalKey(
                    Schema.Array(Schema.String)
                      .check(Schema.isMaxLength(1))
                      .annotate({
                        description:
                          'Overrides the [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.\n',
                      }),
                  ),
                }),
              ),
            }).annotate({
              description:
                "A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
            }),
            Schema.Null,
          ]),
          metadata: Schema.optionalKey(MetadataSchema),
          temperature: Schema.Union([
            Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(2))
              .pipe(Schema.withDecodingDefault(Effect.succeed(1)))
              .annotate({
                description:
                  'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
                jsonSchemaExamples: [1],
              }),
            Schema.Null,
          ]),
          top_p: Schema.Union([
            Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1))
              .pipe(Schema.withDecodingDefault(Effect.succeed(1)))
              .annotate({
                description:
                  'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
                jsonSchemaExamples: [1],
              }),
            Schema.Null,
          ]),
          response_format: Schema.optionalKey(
            Schema.Union([AssistantsApiResponseFormatOptionSchema, Schema.Null]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AssistantObjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAssistantsAssistantId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(DeleteAssistantResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
