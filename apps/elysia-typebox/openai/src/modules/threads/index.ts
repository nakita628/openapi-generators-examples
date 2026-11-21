import { Elysia } from 'elysia'
import {
  AssistantSupportedModelsSchema,
  AssistantToolsCodeSchema,
  AssistantToolsFileSearchSchema,
  AssistantToolsFileSearchTypeOnlySchema,
  AssistantToolsFunctionSchema,
  AssistantsApiResponseFormatOptionSchema,
  AssistantsApiToolChoiceOptionSchema,
  AssistantsNamedToolChoiceSchema,
  CreateMessageRequestSchema,
  CreateRunRequestSchema,
  CreateThreadAndRunRequestSchema,
  CreateThreadRequestSchema,
  DeleteMessageResponseSchema,
  DeleteThreadResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  FileSearchRankerSchema,
  FileSearchRankingOptionsSchema,
  FunctionObjectSchema,
  FunctionParametersSchema,
  ListMessagesResponseSchema,
  ListRunStepsResponseSchema,
  ListRunsResponseSchema,
  MessageContentImageFileObjectSchema,
  MessageContentImageUrlObjectSchema,
  MessageContentRefusalObjectSchema,
  MessageContentTextAnnotationsFileCitationObjectSchema,
  MessageContentTextAnnotationsFilePathObjectSchema,
  MessageContentTextObjectSchema,
  MessageObjectSchema,
  MessageRequestContentTextObjectSchema,
  MetadataSchema,
  MisalignmentErrorDetailsResourceSchema,
  ModifyMessageRequestSchema,
  ModifyRunRequestSchema,
  ModifyThreadRequestSchema,
  ParallelToolCallsSchema,
  ReasoningEffortSchema,
  ResponseFormatJsonObjectSchema,
  ResponseFormatJsonSchemaSchema,
  ResponseFormatJsonSchemaSchemaSchema,
  ResponseFormatTextSchema,
  RunCompletionUsageSchema,
  RunObjectSchema,
  RunStepCompletionUsageSchema,
  RunStepDetailsMessageCreationObjectSchema,
  RunStepDetailsToolCallsCodeObjectSchema,
  RunStepDetailsToolCallsCodeOutputImageObjectSchema,
  RunStepDetailsToolCallsCodeOutputLogsObjectSchema,
  RunStepDetailsToolCallsFileSearchObjectSchema,
  RunStepDetailsToolCallsFileSearchRankingOptionsObjectSchema,
  RunStepDetailsToolCallsFileSearchResultObjectSchema,
  RunStepDetailsToolCallsFunctionObjectSchema,
  RunStepDetailsToolCallsObjectSchema,
  RunStepObjectSchema,
  RunToolCallObjectSchema,
  SubmitToolOutputsRunRequestSchema,
  ThreadObjectSchema,
  TruncationObjectSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { ThreadsModel } from './model'

export const threads = new Elysia()
  .model({
    AssistantSupportedModels: AssistantSupportedModelsSchema,
    AssistantToolsCode: AssistantToolsCodeSchema,
    AssistantToolsFileSearch: AssistantToolsFileSearchSchema,
    AssistantToolsFileSearchTypeOnly: AssistantToolsFileSearchTypeOnlySchema,
    AssistantToolsFunction: AssistantToolsFunctionSchema,
    AssistantsApiResponseFormatOption: AssistantsApiResponseFormatOptionSchema,
    AssistantsApiToolChoiceOption: AssistantsApiToolChoiceOptionSchema,
    AssistantsNamedToolChoice: AssistantsNamedToolChoiceSchema,
    CreateMessageRequest: CreateMessageRequestSchema,
    CreateRunRequest: CreateRunRequestSchema,
    CreateThreadAndRunRequest: CreateThreadAndRunRequestSchema,
    CreateThreadRequest: CreateThreadRequestSchema,
    DeleteMessageResponse: DeleteMessageResponseSchema,
    DeleteThreadResponse: DeleteThreadResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    FileSearchRanker: FileSearchRankerSchema,
    FileSearchRankingOptions: FileSearchRankingOptionsSchema,
    FunctionObject: FunctionObjectSchema,
    FunctionParameters: FunctionParametersSchema,
    ListMessagesResponse: ListMessagesResponseSchema,
    ListRunStepsResponse: ListRunStepsResponseSchema,
    ListRunsResponse: ListRunsResponseSchema,
    MessageContentImageFileObject: MessageContentImageFileObjectSchema,
    MessageContentImageUrlObject: MessageContentImageUrlObjectSchema,
    MessageContentRefusalObject: MessageContentRefusalObjectSchema,
    MessageContentTextAnnotationsFileCitationObject:
      MessageContentTextAnnotationsFileCitationObjectSchema,
    MessageContentTextAnnotationsFilePathObject: MessageContentTextAnnotationsFilePathObjectSchema,
    MessageContentTextObject: MessageContentTextObjectSchema,
    MessageObject: MessageObjectSchema,
    MessageRequestContentTextObject: MessageRequestContentTextObjectSchema,
    Metadata: MetadataSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    ModifyMessageRequest: ModifyMessageRequestSchema,
    ModifyRunRequest: ModifyRunRequestSchema,
    ModifyThreadRequest: ModifyThreadRequestSchema,
    ParallelToolCalls: ParallelToolCallsSchema,
    ReasoningEffort: ReasoningEffortSchema,
    ResponseFormatJsonObject: ResponseFormatJsonObjectSchema,
    ResponseFormatJsonSchema: ResponseFormatJsonSchemaSchema,
    ResponseFormatJsonSchemaSchema: ResponseFormatJsonSchemaSchemaSchema,
    ResponseFormatText: ResponseFormatTextSchema,
    RunCompletionUsage: RunCompletionUsageSchema,
    RunObject: RunObjectSchema,
    RunStepCompletionUsage: RunStepCompletionUsageSchema,
    RunStepDetailsMessageCreationObject: RunStepDetailsMessageCreationObjectSchema,
    RunStepDetailsToolCallsCodeObject: RunStepDetailsToolCallsCodeObjectSchema,
    RunStepDetailsToolCallsCodeOutputImageObject:
      RunStepDetailsToolCallsCodeOutputImageObjectSchema,
    RunStepDetailsToolCallsCodeOutputLogsObject: RunStepDetailsToolCallsCodeOutputLogsObjectSchema,
    RunStepDetailsToolCallsFileSearchObject: RunStepDetailsToolCallsFileSearchObjectSchema,
    RunStepDetailsToolCallsFileSearchRankingOptionsObject:
      RunStepDetailsToolCallsFileSearchRankingOptionsObjectSchema,
    RunStepDetailsToolCallsFileSearchResultObject:
      RunStepDetailsToolCallsFileSearchResultObjectSchema,
    RunStepDetailsToolCallsFunctionObject: RunStepDetailsToolCallsFunctionObjectSchema,
    RunStepDetailsToolCallsObject: RunStepDetailsToolCallsObjectSchema,
    RunStepObject: RunStepObjectSchema,
    RunToolCallObject: RunToolCallObjectSchema,
    SubmitToolOutputsRunRequest: SubmitToolOutputsRunRequestSchema,
    ThreadObject: ThreadObjectSchema,
    TruncationObject: TruncationObjectSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/threads', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateThreadRequest',
    response: { 200: 'ThreadObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Create thread',
      description: 'Create a thread.',
      operationId: 'createThread',
    },
  })
  .post('/threads/runs', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateThreadAndRunRequest',
    response: { 200: 'RunObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Create thread and run',
      description: 'Create a thread and run it in one request.',
      operationId: 'createThreadAndRun',
    },
  })
  .get('/threads/:thread_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.getThreadParams,
    response: { 200: 'ThreadObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Retrieve thread',
      description: 'Retrieves a thread.',
      operationId: 'getThread',
    },
  })
  .post('/threads/:thread_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.modifyThreadParams,
    body: 'ModifyThreadRequest',
    response: { 200: 'ThreadObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Modify thread',
      description: 'Modifies a thread.',
      operationId: 'modifyThread',
    },
  })
  .delete('/threads/:thread_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.deleteThreadParams,
    response: { 200: 'DeleteThreadResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Delete thread',
      description: 'Delete a thread.',
      operationId: 'deleteThread',
    },
  })
  .get('/threads/:thread_id/messages', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.listMessagesParams,
    query: ThreadsModel.listMessagesQuery,
    response: { 200: 'ListMessagesResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'List messages',
      description: 'Returns a list of messages for a given thread.',
      operationId: 'listMessages',
    },
  })
  .post('/threads/:thread_id/messages', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.createMessageParams,
    body: 'CreateMessageRequest',
    response: { 200: 'MessageObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Create message',
      description: 'Create a message.',
      operationId: 'createMessage',
    },
  })
  .get('/threads/:thread_id/messages/:message_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.getMessageParams,
    response: { 200: 'MessageObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Retrieve message',
      description: 'Retrieve a message.',
      operationId: 'getMessage',
    },
  })
  .post('/threads/:thread_id/messages/:message_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.modifyMessageParams,
    body: 'ModifyMessageRequest',
    response: { 200: 'MessageObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Modify message',
      description: 'Modifies a message.',
      operationId: 'modifyMessage',
    },
  })
  .delete('/threads/:thread_id/messages/:message_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.deleteMessageParams,
    response: { 200: 'DeleteMessageResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Delete message',
      description: 'Deletes a message.',
      operationId: 'deleteMessage',
    },
  })
  .get('/threads/:thread_id/runs', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.listRunsParams,
    query: ThreadsModel.listRunsQuery,
    response: { 200: 'ListRunsResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'List runs',
      description: 'Returns a list of runs belonging to a thread.',
      operationId: 'listRuns',
    },
  })
  .post('/threads/:thread_id/runs', ({ params, query, body }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.createRunParams,
    query: ThreadsModel.createRunQuery,
    body: 'CreateRunRequest',
    response: { 200: 'RunObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Create run',
      description: 'Create a run.',
      operationId: 'createRun',
    },
  })
  .get('/threads/:thread_id/runs/:run_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.getRunParams,
    response: { 200: 'RunObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Retrieve run',
      description: 'Retrieves a run.',
      operationId: 'getRun',
    },
  })
  .post('/threads/:thread_id/runs/:run_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.modifyRunParams,
    body: 'ModifyRunRequest',
    response: { 200: 'RunObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Modify run',
      description: 'Modifies a run.',
      operationId: 'modifyRun',
    },
  })
  .post('/threads/:thread_id/runs/:run_id/cancel', ({ params }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.cancelRunParams,
    response: { 200: 'RunObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Cancel a run',
      description: 'Cancels a run that is `in_progress`.',
      operationId: 'cancelRun',
    },
  })
  .get('/threads/:thread_id/runs/:run_id/steps', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.listRunStepsParams,
    query: ThreadsModel.listRunStepsQuery,
    response: { 200: 'ListRunStepsResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'List run steps',
      description: 'Returns a list of run steps belonging to a run.',
      operationId: 'listRunSteps',
    },
  })
  .get('/threads/:thread_id/runs/:run_id/steps/:step_id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.getRunStepParams,
    query: ThreadsModel.getRunStepQuery,
    response: { 200: 'RunStepObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Retrieve run step',
      description: 'Retrieves a run step.',
      operationId: 'getRunStep',
    },
  })
  .post('/threads/:thread_id/runs/:run_id/submit_tool_outputs', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ThreadsModel.submitToolOuputsToRunParams,
    body: 'SubmitToolOutputsRunRequest',
    response: { 200: 'RunObject', 429: 'ErrorResponse' },
    detail: {
      tags: ['Assistants'],
      summary: 'Submit tool outputs to run',
      description:
        'When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they\'re all completed. All outputs must be submitted in a single request.\n',
      operationId: 'submitToolOuputsToRun',
    },
  })
