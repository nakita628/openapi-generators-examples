import { Elysia } from 'elysia'
import {
  CreateFineTuningCheckpointPermissionRequestSchema,
  CreateFineTuningJobRequestSchema,
  DeleteFineTuningCheckpointPermissionResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  EvalItemSchema,
  EvalItemContentSchema,
  EvalItemContentArraySchema,
  EvalItemContentItemSchema,
  EvalItemContentOutputTextSchema,
  EvalItemContentTextSchema,
  EvalItemInputImageSchema,
  FineTuneDPOHyperparametersSchema,
  FineTuneDPOMethodSchema,
  FineTuneMethodSchema,
  FineTuneReinforcementHyperparametersSchema,
  FineTuneReinforcementMethodSchema,
  FineTuneSupervisedHyperparametersSchema,
  FineTuneSupervisedMethodSchema,
  FineTuningCheckpointPermissionSchema,
  FineTuningIntegrationSchema,
  FineTuningJobSchema,
  FineTuningJobCheckpointSchema,
  FineTuningJobEventSchema,
  GraderLabelModelSchema,
  GraderMultiSchema,
  GraderPythonSchema,
  GraderScoreModelSchema,
  GraderStringCheckSchema,
  GraderTextSimilaritySchema,
  InputAudioSchema,
  InputTextContentSchema,
  ListFineTuningCheckpointPermissionResponseSchema,
  ListFineTuningJobCheckpointsResponseSchema,
  ListFineTuningJobEventsResponseSchema,
  ListPaginatedFineTuningJobsResponseSchema,
  MetadataSchema,
  MisalignmentErrorDetailsResourceSchema,
  PromptCacheBreakpointConfigSchema,
  ReasoningEffortSchema,
  RunGraderRequestSchema,
  RunGraderResponseSchema,
  ValidateGraderRequestSchema,
  ValidateGraderResponseSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { FineTuningModel } from './model'

export const fineTuning = new Elysia()
  .model({
    CreateFineTuningCheckpointPermissionRequest: CreateFineTuningCheckpointPermissionRequestSchema,
    CreateFineTuningJobRequest: CreateFineTuningJobRequestSchema,
    DeleteFineTuningCheckpointPermissionResponse:
      DeleteFineTuningCheckpointPermissionResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    EvalItem: EvalItemSchema,
    EvalItemContent: EvalItemContentSchema,
    EvalItemContentArray: EvalItemContentArraySchema,
    EvalItemContentItem: EvalItemContentItemSchema,
    EvalItemContentOutputText: EvalItemContentOutputTextSchema,
    EvalItemContentText: EvalItemContentTextSchema,
    EvalItemInputImage: EvalItemInputImageSchema,
    FineTuneDPOHyperparameters: FineTuneDPOHyperparametersSchema,
    FineTuneDPOMethod: FineTuneDPOMethodSchema,
    FineTuneMethod: FineTuneMethodSchema,
    FineTuneReinforcementHyperparameters: FineTuneReinforcementHyperparametersSchema,
    FineTuneReinforcementMethod: FineTuneReinforcementMethodSchema,
    FineTuneSupervisedHyperparameters: FineTuneSupervisedHyperparametersSchema,
    FineTuneSupervisedMethod: FineTuneSupervisedMethodSchema,
    FineTuningCheckpointPermission: FineTuningCheckpointPermissionSchema,
    FineTuningIntegration: FineTuningIntegrationSchema,
    FineTuningJob: FineTuningJobSchema,
    FineTuningJobCheckpoint: FineTuningJobCheckpointSchema,
    FineTuningJobEvent: FineTuningJobEventSchema,
    GraderLabelModel: GraderLabelModelSchema,
    GraderMulti: GraderMultiSchema,
    GraderPython: GraderPythonSchema,
    GraderScoreModel: GraderScoreModelSchema,
    GraderStringCheck: GraderStringCheckSchema,
    GraderTextSimilarity: GraderTextSimilaritySchema,
    InputAudio: InputAudioSchema,
    InputTextContent: InputTextContentSchema,
    ListFineTuningCheckpointPermissionResponse: ListFineTuningCheckpointPermissionResponseSchema,
    ListFineTuningJobCheckpointsResponse: ListFineTuningJobCheckpointsResponseSchema,
    ListFineTuningJobEventsResponse: ListFineTuningJobEventsResponseSchema,
    ListPaginatedFineTuningJobsResponse: ListPaginatedFineTuningJobsResponseSchema,
    Metadata: MetadataSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    PromptCacheBreakpointConfig: PromptCacheBreakpointConfigSchema,
    ReasoningEffort: ReasoningEffortSchema,
    RunGraderRequest: RunGraderRequestSchema,
    RunGraderResponse: RunGraderResponseSchema,
    ValidateGraderRequest: ValidateGraderRequestSchema,
    ValidateGraderResponse: ValidateGraderResponseSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/fine_tuning/alpha/graders/run', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'RunGraderRequest',
    response: { 200: 'RunGraderResponse', 400: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Run grader',
      description: 'Run a grader.\n',
      operationId: 'runGrader',
    },
  })
  .post('/fine_tuning/alpha/graders/validate', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ValidateGraderRequest',
    response: { 200: 'ValidateGraderResponse', 400: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Validate grader',
      description: 'Validate a grader.\n',
      operationId: 'validateGrader',
    },
  })
  .get(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: FineTuningModel.listFineTuningCheckpointPermissionsParams,
      query: FineTuningModel.listFineTuningCheckpointPermissionsQuery,
      response: {
        200: 'ListFineTuningCheckpointPermissionResponse',
        400: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: ['Fine-tuning'],
        summary: 'List checkpoint permissions',
        description:
          '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.\n',
        operationId: 'listFineTuningCheckpointPermissions',
      },
    },
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: FineTuningModel.createFineTuningCheckpointPermissionParams,
      body: 'CreateFineTuningCheckpointPermissionRequest',
      response: {
        200: 'ListFineTuningCheckpointPermissionResponse',
        400: 'ErrorResponse',
        404: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: ['Fine-tuning'],
        summary: 'Create checkpoint permissions',
        description:
          '**NOTE:** Calling this endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nThis enables organization owners to share fine-tuned models with other projects in their organization.\n',
        operationId: 'createFineTuningCheckpointPermission',
      },
    },
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: FineTuningModel.deleteFineTuningCheckpointPermissionParams,
      response: {
        200: 'DeleteFineTuningCheckpointPermissionResponse',
        400: 'ErrorResponse',
        404: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: ['Fine-tuning'],
        summary: 'Delete checkpoint permission',
        description:
          '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.\n',
        operationId: 'deleteFineTuningCheckpointPermission',
      },
    },
  )
  .get('/fine_tuning/jobs', ({ query }) => { throw new Error('Not implemented') }, {
    query: FineTuningModel.listPaginatedFineTuningJobsQuery,
    response: {
      200: 'ListPaginatedFineTuningJobsResponse',
      400: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning jobs',
      description: "List your organization's fine-tuning jobs\n",
      operationId: 'listPaginatedFineTuningJobs',
    },
  })
  .post('/fine_tuning/jobs', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateFineTuningJobRequest',
    response: { 200: 'FineTuningJob', 400: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Create fine-tuning job',
      description:
        'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\n\nResponse includes details of the enqueued job including job status and the name of the fine-tuned models once complete.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
      operationId: 'createFineTuningJob',
    },
  })
  .get('/fine_tuning/jobs/:fine_tuning_job_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: FineTuningModel.retrieveFineTuningJobParams,
    response: { 200: 'FineTuningJob', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Retrieve fine-tuning job',
      description:
        'Get info about a fine-tuning job.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
      operationId: 'retrieveFineTuningJob',
    },
  })
  .post('/fine_tuning/jobs/:fine_tuning_job_id/cancel', ({ params }) => { throw new Error('Not implemented') }, {
    params: FineTuningModel.cancelFineTuningJobParams,
    response: {
      200: 'FineTuningJob',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Cancel fine-tuning',
      description: 'Immediately cancel a fine-tune job.\n',
      operationId: 'cancelFineTuningJob',
    },
  })
  .get('/fine_tuning/jobs/:fine_tuning_job_id/checkpoints', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: FineTuningModel.listFineTuningJobCheckpointsParams,
    query: FineTuningModel.listFineTuningJobCheckpointsQuery,
    response: {
      200: 'ListFineTuningJobCheckpointsResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning checkpoints',
      description: 'List checkpoints for a fine-tuning job.\n',
      operationId: 'listFineTuningJobCheckpoints',
    },
  })
  .get('/fine_tuning/jobs/:fine_tuning_job_id/events', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: FineTuningModel.listFineTuningEventsParams,
    query: FineTuningModel.listFineTuningEventsQuery,
    response: {
      200: 'ListFineTuningJobEventsResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning events',
      description: 'Get status updates for a fine-tuning job.\n',
      operationId: 'listFineTuningEvents',
    },
  })
  .post('/fine_tuning/jobs/:fine_tuning_job_id/pause', ({ params }) => { throw new Error('Not implemented') }, {
    params: FineTuningModel.pauseFineTuningJobParams,
    response: {
      200: 'FineTuningJob',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Pause fine-tuning',
      description: 'Pause a fine-tune job.\n',
      operationId: 'pauseFineTuningJob',
    },
  })
  .post('/fine_tuning/jobs/:fine_tuning_job_id/resume', ({ params }) => { throw new Error('Not implemented') }, {
    params: FineTuningModel.resumeFineTuningJobParams,
    response: {
      200: 'FineTuningJob',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Fine-tuning'],
      summary: 'Resume fine-tuning',
      description: 'Resume a fine-tune job.\n',
      operationId: 'resumeFineTuningJob',
    },
  })
