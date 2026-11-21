import { Elysia } from 'elysia'
import {
  AssistantObjectSchema,
  AssistantSupportedModelsSchema,
  AssistantToolsCodeSchema,
  AssistantToolsFileSearchSchema,
  AssistantToolsFunctionSchema,
  AssistantsApiResponseFormatOptionSchema,
  CreateAssistantRequestSchema,
  DeleteAssistantResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  FileSearchRankerSchema,
  FileSearchRankingOptionsSchema,
  FunctionObjectSchema,
  FunctionParametersSchema,
  ListAssistantsResponseSchema,
  MetadataSchema,
  MisalignmentErrorDetailsResourceSchema,
  ModifyAssistantRequestSchema,
  ReasoningEffortSchema,
  ResponseFormatJsonObjectSchema,
  ResponseFormatJsonSchemaSchema,
  ResponseFormatJsonSchemaSchemaSchema,
  ResponseFormatTextSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { AssistantsModel } from './model'

export const assistants = new Elysia()
  .model({
    AssistantObject: AssistantObjectSchema,
    AssistantSupportedModels: AssistantSupportedModelsSchema,
    AssistantToolsCode: AssistantToolsCodeSchema,
    AssistantToolsFileSearch: AssistantToolsFileSearchSchema,
    AssistantToolsFunction: AssistantToolsFunctionSchema,
    AssistantsApiResponseFormatOption: AssistantsApiResponseFormatOptionSchema,
    CreateAssistantRequest: CreateAssistantRequestSchema,
    DeleteAssistantResponse: DeleteAssistantResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    FileSearchRanker: FileSearchRankerSchema,
    FileSearchRankingOptions: FileSearchRankingOptionsSchema,
    FunctionObject: FunctionObjectSchema,
    FunctionParameters: FunctionParametersSchema,
    ListAssistantsResponse: ListAssistantsResponseSchema,
    Metadata: MetadataSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    ModifyAssistantRequest: ModifyAssistantRequestSchema,
    ReasoningEffort: ReasoningEffortSchema,
    ResponseFormatJsonObject: ResponseFormatJsonObjectSchema,
    ResponseFormatJsonSchema: ResponseFormatJsonSchemaSchema,
    ResponseFormatJsonSchemaSchema: ResponseFormatJsonSchemaSchemaSchema,
    ResponseFormatText: ResponseFormatTextSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/assistants', ({ query }) => {}, {
    query: AssistantsModel.listAssistantsQuery,
    response: { 200: 'ListAssistantsResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'List assistants',
      description: 'Returns a list of assistants.',
      operationId: 'listAssistants',
    },
  })
  .post('/assistants', ({ body }) => {}, {
    body: 'CreateAssistantRequest',
    response: { 200: 'AssistantObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Create assistant',
      description: 'Create an assistant with a model and instructions.',
      operationId: 'createAssistant',
    },
  })
  .get('/assistants/:assistant_id', ({ params }) => {}, {
    params: AssistantsModel.getAssistantParams,
    response: { 200: 'AssistantObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Retrieve assistant',
      description: 'Retrieves an assistant.',
      operationId: 'getAssistant',
    },
  })
  .post('/assistants/:assistant_id', ({ params, body }) => {}, {
    params: AssistantsModel.modifyAssistantParams,
    body: 'ModifyAssistantRequest',
    response: { 200: 'AssistantObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Modify assistant',
      description: 'Modifies an assistant.',
      operationId: 'modifyAssistant',
    },
  })
  .delete('/assistants/:assistant_id', ({ params }) => {}, {
    params: AssistantsModel.deleteAssistantParams,
    response: { 200: 'DeleteAssistantResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Delete assistant',
      description: 'Delete an assistant.',
      operationId: 'deleteAssistant',
    },
  })
