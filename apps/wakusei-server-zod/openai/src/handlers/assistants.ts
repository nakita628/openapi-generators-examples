import { os } from '@orpc/server'
import * as z from 'zod'
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

export const getAssistants = os
  .route({
    method: 'GET',
    path: '/assistants',
    tags: ['Assistants'],
    summary: 'List assistants',
    description: 'Returns a list of assistants.',
    deprecated: true,
  })
  .input(
    z.object({
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      after: z.string().exactOptional(),
      before: z.string().exactOptional(),
    }),
  )
  .output(ListAssistantsResponseSchema)
  .handler(async ({ input }) => {})

export const postAssistants = os
  .route({
    method: 'POST',
    path: '/assistants',
    tags: ['Assistants'],
    summary: 'Create assistant',
    description: 'Create an assistant with a model and instructions.',
    deprecated: true,
  })
  .input(CreateAssistantRequestSchema)
  .output(AssistantObjectSchema)
  .handler(async ({ input }) => {})

export const getAssistantsAssistantId = os
  .route({
    method: 'GET',
    path: '/assistants/{assistant_id}',
    tags: ['Assistants'],
    summary: 'Retrieve assistant',
    description: 'Retrieves an assistant.',
    deprecated: true,
  })
  .input(z.object({ assistant_id: z.string() }))
  .output(AssistantObjectSchema)
  .handler(async ({ input }) => {})

export const postAssistantsAssistantId = os
  .route({
    method: 'POST',
    path: '/assistants/{assistant_id}',
    tags: ['Assistants'],
    summary: 'Modify assistant',
    description: 'Modifies an assistant.',
    deprecated: true,
  })
  .input(
    z.object({
      assistant_id: z.string(),
      model: z
        .union([z.string(), AssistantSupportedModelsSchema])
        .meta({
          description:
            'ID of the model to use. You can use the [List models](https://developers.openai.com/api/reference/resources/models/methods/list) API to see all of your available models, or see our [Model overview](https://developers.openai.com/api/docs/models) for descriptions of them.\n',
        })
        .exactOptional(),
      reasoning_effort: ReasoningEffortSchema.exactOptional(),
      name: z
        .union([
          z
            .string()
            .max(256)
            .meta({
              description: 'The name of the assistant. The maximum length is 256 characters.\n',
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      description: z
        .union([
          z
            .string()
            .max(512)
            .meta({
              description:
                'The description of the assistant. The maximum length is 512 characters.\n',
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      instructions: z
        .union([
          z
            .string()
            .max(256000)
            .meta({
              description:
                'The system instructions that the assistant uses. The maximum length is 256,000 characters.\n',
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      tools: z
        .array(
          z.xor([
            AssistantToolsCodeSchema,
            AssistantToolsFileSearchSchema,
            AssistantToolsFunctionSchema,
          ]),
        )
        .max(128)
        .default([])
        .meta({
          description:
            'A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.\n',
        })
        .exactOptional(),
      tool_resources: z
        .union([
          z
            .object({
              code_interpreter: z
                .object({
                  file_ids: z
                    .array(z.string())
                    .max(20)
                    .default([])
                    .meta({
                      description:
                        'Overrides the list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
                    })
                    .exactOptional(),
                })
                .exactOptional(),
              file_search: z
                .object({
                  vector_store_ids: z
                    .array(z.string())
                    .max(1)
                    .meta({
                      description:
                        'Overrides the [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.\n',
                    })
                    .exactOptional(),
                })
                .exactOptional(),
            })
            .meta({
              description:
                "A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      metadata: MetadataSchema.exactOptional(),
      temperature: z
        .union([
          z
            .number()
            .min(0)
            .max(2)
            .default(1)
            .meta({
              description:
                'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
              examples: [1],
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      top_p: z
        .union([
          z
            .number()
            .min(0)
            .max(1)
            .default(1)
            .meta({
              description:
                'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
              examples: [1],
            }),
          z.null().nullable(),
        ])
        .exactOptional(),
      response_format: z
        .union([AssistantsApiResponseFormatOptionSchema, z.null().nullable()])
        .exactOptional(),
    }),
  )
  .output(AssistantObjectSchema)
  .handler(async ({ input }) => {})

export const deleteAssistantsAssistantId = os
  .route({
    method: 'DELETE',
    path: '/assistants/{assistant_id}',
    tags: ['Assistants'],
    summary: 'Delete assistant',
    description: 'Delete an assistant.',
    deprecated: true,
  })
  .input(z.object({ assistant_id: z.string() }))
  .output(DeleteAssistantResponseSchema)
  .handler(async ({ input }) => {})
