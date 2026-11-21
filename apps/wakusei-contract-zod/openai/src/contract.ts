import { oc } from '@orpc/contract'
import * as z from 'zod'
import {
  AdminApiKeyCreateResponseSchema,
  AdminApiKeySchema,
  AgentEnvironmentListResourceSchema,
  AgentListResourceSchema,
  AgentResourceSchema,
  ApiKeyListSchema,
  AssignedRoleDetailsSchema,
  AssistantObjectSchema,
  AssistantSupportedModelsSchema,
  AssistantToolsCodeSchema,
  AssistantToolsFileSearchSchema,
  AssistantToolsFileSearchTypeOnlySchema,
  AssistantToolsFunctionSchema,
  AssistantsApiResponseFormatOptionSchema,
  AssistantsApiToolChoiceOptionSchema,
  AudioTranscriptionSchema,
  AuditLogEventTypeSchema,
  AutomationInvocationResourceSchema,
  AutomationResourceSchema,
  AutomationTargetParamSchema,
  BatchSchema,
  BetaCompactResourceSchema,
  BetaCompactResponseMethodPublicBodySchema,
  BetaCreateResponseSchema,
  BetaIncludeEnumSchema,
  BetaResponseItemListSchema,
  BetaResponseSchema,
  BetaTokenCountsBodySchema,
  BetaTokenCountsResourceSchema,
  CertificateSchema,
  ChatCompletionDeletedSchema,
  ChatCompletionListSchema,
  ChatCompletionMessageListSchema,
  ChatSessionResourceSchema,
  ChunkingStrategyRequestParamSchema,
  CompactResourceSchema,
  CompactResponseMethodPublicBodySchema,
  CompactionParamSchema,
  ComparisonFilterSchema,
  CompoundFilterSchema,
  ContainerFileListResourceSchema,
  ContainerFileResourceSchema,
  ContainerListResourceSchema,
  ContainerResourceSchema,
  ConversationItemListSchema,
  ConversationItemSchema,
  ConversationResourceSchema,
  CreateAgentEnvironmentParamsSchema,
  CreateAgentParamsSchema,
  CreateAgentSessionParamsSchema,
  CreateAssistantRequestSchema,
  CreateAutomationParamsSchema,
  CreateBatchRequestSchema,
  CreateCSAMModerationResponseSchema,
  CreateChatCompletionRequestSchema,
  CreateChatCompletionResponseSchema,
  CreateChatSessionBodySchema,
  CreateCompletionRequestSchema,
  CreateCompletionResponseSchema,
  CreateContainerBodySchema,
  CreateConversationBodySchema,
  CreateEmbeddingRequestSchema,
  CreateEmbeddingResponseSchema,
  CreateEnvironmentTemplateParamsSchema,
  CreateEvalCompletionsRunDataSourceSchema,
  CreateEvalJsonlRunDataSourceSchema,
  CreateEvalRequestSchema,
  CreateEvalResponsesRunDataSourceSchema,
  CreateExternalStorageBodySchema,
  CreateFineTuningJobRequestSchema,
  CreateGroupBodySchema,
  CreateImageRequestSchema,
  CreateMessageRequestSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
  CreatePlatformWorkloadIdentityProviderBodySchema,
  CreateResponseSchema,
  CreateSkillBodySchema,
  CreateSpeechRequestSchema,
  CreateSpendAlertBodySchema,
  CreateThreadAndRunRequestSchema,
  CreateThreadRequestSchema,
  CreateTranscriptionResponseDiarizedJsonSchema,
  CreateTranscriptionResponseJsonSchema,
  CreateTranscriptionResponseVerboseJsonSchema,
  CreateTranslationResponseJsonSchema,
  CreateTranslationResponseVerboseJsonSchema,
  CreateUploadRequestSchema,
  CreateVaultCredentialAuthParamSchema,
  CreateVaultParamsSchema,
  CreateVectorStoreFileRequestSchema,
  CreateVectorStoreRequestSchema,
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendJsonBodySchema,
  CreateVideoJsonBodySchema,
  CreateVoicePromptRequestSchema,
  DecisionRequestSchema,
  DecisionResponseSchema,
  DecisionsUsageBucketWidthSchema,
  DecisionsUsageGroupBySchema,
  DefaultPermissionsParamSchema,
  DeleteAssistantResponseSchema,
  DeleteCertificateResponseSchema,
  DeleteFileResponseSchema,
  DeleteFineTuningCheckpointPermissionResponseSchema,
  DeleteMessageResponseSchema,
  DeleteModelResponseSchema,
  DeleteThreadResponseSchema,
  DeleteVectorStoreFileResponseSchema,
  DeleteVectorStoreResponseSchema,
  DeletedAgentResourceSchema,
  DeletedAutomationResourceSchema,
  DeletedConversationResourceSchema,
  DeletedEnvironmentTemplateResourceSchema,
  DeletedRoleAssignmentResourceSchema,
  DeletedSessionArtifactResourceSchema,
  DeletedSessionResourceSchema,
  DeletedSkillResourceSchema,
  DeletedSkillVersionResourceSchema,
  DeletedThreadResourceSchema,
  DeletedVaultCredentialResourceSchema,
  DeletedVaultResourceSchema,
  DeletedVideoResourceSchema,
  DeletedWebhookEndpointResourceSchema,
  DesktopParamSchema,
  DiscoveryVerificationParamSchema,
  EditImageBodyJsonParamSchema,
  EnvironmentFileListResourceSchema,
  EnvironmentFileResourceSchema,
  EnvironmentPackagesParamSchema,
  EnvironmentTemplateListResourceSchema,
  EnvironmentTemplateResourceSchema,
  EnvironmentTypeParamSchema,
  EvalListSchema,
  EvalRunListSchema,
  EvalRunOutputItemListSchema,
  EvalRunOutputItemSchema,
  EvalRunSchema,
  EvalSchema,
  ExperimentalConfigOverridesParamSchema,
  ExternalKeyPurposeSchema,
  ExternalKeyResourceSchema,
  ExternalStorageDeletedResourceSchema,
  ExternalStorageListResourceSchema,
  ExternalStorageOrderSchema,
  ExternalStorageResponseSchema,
  FineTuningJobSchema,
  GroupDeletedResourceSchema,
  GroupListResourceSchema,
  GroupMemberUserSchema,
  GroupResourceWithSuccessSchema,
  GroupResponseSchema,
  GroupRoleAssignmentSchema,
  GroupUserAssignmentSchema,
  GroupUserDeletedResourceSchema,
  HostedEnvironmentFileParamSchema,
  HostedPluginParamSchema,
  HostedSkillParamSchema,
  HostedToolPermissionUpdateSchema,
  ImagesResponseSchema,
  IncludeEnumSchema,
  InputItemSchema,
  InviteDeleteResponseSchema,
  InviteListResponseSchema,
  InviteRequestSchema,
  InviteSchema,
  ListAssistantsResponseSchema,
  ListAuditLogsResponseSchema,
  ListBatchesResponseSchema,
  ListCertificatesResponseSchema,
  ListExternalKeysResourceSchema,
  ListFilesResponseSchema,
  ListFineTuningCheckpointPermissionResponseSchema,
  ListFineTuningJobCheckpointsResponseSchema,
  ListFineTuningJobEventsResponseSchema,
  ListMessagesResponseSchema,
  ListModelsResponseSchema,
  ListOrderParamSchema,
  ListPaginatedFineTuningJobsResponseSchema,
  ListProjectCertificatesResponseSchema,
  ListRunStepsResponseSchema,
  ListRunsResponseSchema,
  ListVectorStoreFilesResponseSchema,
  ListVectorStoresResponseSchema,
  LiveCallAcceptSessionSchema,
  LiveCreateResponseSchema,
  LiveMediaSessionForkParamsSchema,
  LiveSessionCreateRequestSchema,
  LiveSessionCreateResponseSchema,
  LiveWebRTCTransportSchema,
  MCPToolSchema,
  MessageContentImageFileObjectSchema,
  MessageContentImageUrlObjectSchema,
  MessageObjectSchema,
  MessageRequestContentTextObjectSchema,
  MetadataSchema,
  ModelSchema,
  MultiAgentConfigCurrentParamSchema,
  NetworkPolicyParamSchema,
  OpenAIFileSchema,
  OrderEnumSchema,
  OrganizationCertificateActivationResponseSchema,
  OrganizationCertificateDeactivationResponseSchema,
  OrganizationDataRetentionSchema,
  OrganizationProjectCertificateActivationResponseSchema,
  OrganizationProjectCertificateDeactivationResponseSchema,
  OrganizationSpendAlertDeletedResourceSchema,
  OrganizationSpendAlertListResourceSchema,
  OrganizationSpendAlertSchema,
  OrganizationSpendLimitDeletedResourceSchema,
  OrganizationSpendLimitResourceSchema,
  ParallelToolCallsSchema,
  PersistedAgentToolConfigParamSchema,
  PlatformFederationRuleDeletedResourceSchema,
  PlatformFederationRuleListResourceSchema,
  PlatformFederationRuleSchema,
  PlatformProviderDeletedResourceSchema,
  PlatformProviderListResourceSchema,
  PlatformProviderSchema,
  ProjectApiKeyDeleteResponseSchema,
  ProjectApiKeyListResponseSchema,
  ProjectApiKeySchema,
  ProjectCreateRequestSchema,
  ProjectDataRetentionSchema,
  ProjectDefaultServiceTierSchema,
  ProjectEventTypeEnumSchema,
  ProjectGroupDeletedResourceSchema,
  ProjectGroupListResourceSchema,
  ProjectGroupSchema,
  ProjectHostedToolPermissionsSchema,
  ProjectListResponseSchema,
  ProjectModelPermissionsDeleteResponseSchema,
  ProjectModelPermissionsSchema,
  ProjectOptionalServiceTierSchema,
  ProjectRateLimitListResponseSchema,
  ProjectRateLimitSchema,
  ProjectSchema,
  ProjectServiceAccountCreateResponseSchema,
  ProjectServiceAccountDeleteResponseSchema,
  ProjectServiceAccountListResponseSchema,
  ProjectServiceAccountSchema,
  ProjectServiceTierSettingsResourceSchema,
  ProjectSpendAlertDeletedResourceSchema,
  ProjectSpendAlertListResourceSchema,
  ProjectSpendAlertSchema,
  ProjectSpendLimitDeletedResourceSchema,
  ProjectSpendLimitResourceSchema,
  ProjectUserDeleteResponseSchema,
  ProjectUserListResponseSchema,
  ProjectUserSchema,
  PromptCacheOptionsParam2Schema,
  PromptSchema,
  ProvenanceResourceSchema,
  PublicCreateEndpointBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicDecisionsUsageResponseResourceSchema,
  PublicEnvironmentResourceSchema,
  PublicRoleListResourceSchema,
  RealtimeAudioFormatsSchema,
  RealtimeCreateClientSecretRequestSchema,
  RealtimeCreateClientSecretResponseSchema,
  RealtimeFunctionToolSchema,
  RealtimeReasoningSchema,
  RealtimeSessionCreateRequestSchema,
  RealtimeSessionCreateResponseSchema,
  RealtimeTranscriptionSessionCreateRequestSchema,
  RealtimeTranscriptionSessionCreateResponseSchema,
  RealtimeTranslationClientSecretCreateRequestSchema,
  RealtimeTranslationClientSecretCreateResponseSchema,
  RealtimeTruncationSchema,
  RealtimeTurnDetectionSchema,
  ReasoningEffortSchema,
  ReasoningParamSchema,
  ResponseItemListSchema,
  ResponseSchema,
  RestrictedPermissionsParamSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  RoleSchema,
  RotateVaultCredentialAuthParamSchema,
  RunGraderRequestSchema,
  RunGraderResponseSchema,
  RunObjectSchema,
  RunStepObjectSchema,
  SafetyAlertResourceSchema,
  SafetyCaseResourceSchema,
  ServiceAccountApiKeyBodySchema,
  ServiceTierParamSchema,
  SessionArtifactListResourceSchema,
  SessionArtifactResourceSchema,
  SessionBudgetControlParamsSchema,
  SessionInputParamSchema,
  SessionItemListResourceSchema,
  SessionListResourceSchema,
  SessionResourceSchema,
  SessionReviewParamSchema,
  SessionTraceListResourceSchema,
  SessionTurnListResourceSchema,
  SetupCommandParamSchema,
  SkillListResourceSchema,
  SkillResourceSchema,
  SkillVersionListResourceSchema,
  SkillVersionResourceSchema,
  SpendAlertNotificationChannelSchema,
  SpendLimitEmailNotificationChannelParamsSchema,
  SubagentResourceSchema,
  TargetUriSchema,
  TextParamSchema,
  ThreadItemListResourceSchema,
  ThreadListResourceSchema,
  ThreadObjectSchema,
  ThreadResourceSchema,
  ToggleCertificatesRequestSchema,
  TokenCountsBodySchema,
  TokenCountsResourceSchema,
  ToolChoiceFunctionSchema,
  ToolChoiceMCPSchema,
  ToolChoiceOptionsSchema,
  TransformationParamSchema,
  TruncationObjectSchema,
  TurnResourceSchema,
  UpdateOrganizationDataRetentionBodySchema,
  UpdateOrganizationSpendLimitBodySchema,
  UpdateSessionAgentParamSchema,
  UploadCertificateRequestSchema,
  UploadPartSchema,
  UploadSchema,
  UploadedJwksVerificationParamSchema,
  UsageResponseSchema,
  UserDeleteResponseSchema,
  UserListResourceSchema,
  UserListResponseSchema,
  UserRoleAssignmentSchema,
  UserSchema,
  V1OrganizationExternalKeysPostRequestSchema,
  ValidateExternalKeyResourceSchema,
  ValidateGraderRequestSchema,
  ValidateGraderResponseSchema,
  VaultCredentialListResourceSchema,
  VaultCredentialResourceSchema,
  VaultListResourceSchema,
  VaultResourceSchema,
  VaultStatusFilterParamSchema,
  VectorStoreExpirationAfterSchema,
  VectorStoreFileAttributesSchema,
  VectorStoreFileBatchObjectSchema,
  VectorStoreFileContentResponseSchema,
  VectorStoreFileObjectSchema,
  VectorStoreObjectSchema,
  VectorStoreSearchResultsPageSchema,
  VideoCharacterResourceSchema,
  VideoContentVariantSchema,
  VideoListResourceSchema,
  VideoResourceSchema,
  VoiceConsentDeletedResourceSchema,
  VoiceConsentListResourceSchema,
  VoiceConsentResourceSchema,
  VoiceDeletedResourceSchema,
  VoiceIdsOrCustomVoiceSchema,
  VoiceResourceSchema,
  WebhookAgentEnvironmentExpiredSchema,
  WebhookAgentEnvironmentFailedSchema,
  WebhookAgentEnvironmentReadySchema,
  WebhookAgentEnvironmentSuspendedSchema,
  WebhookAgentSessionActionRequiredSchema,
  WebhookAgentSessionCreatedSchema,
  WebhookAgentSessionFailedSchema,
  WebhookAgentSessionIdleSchema,
  WebhookAgentSessionInProgressSchema,
  WebhookBatchCancelledSchema,
  WebhookBatchCompletedSchema,
  WebhookBatchExpiredSchema,
  WebhookBatchFailedSchema,
  WebhookEndpointBodySchema,
  WebhookEndpointListResourceSchema,
  WebhookEndpointTestResultResourceSchema,
  WebhookEndpointWithSecretResourceSchema,
  WebhookEvalRunCanceledSchema,
  WebhookEvalRunFailedSchema,
  WebhookEvalRunSucceededSchema,
  WebhookEventTypeListResourceSchema,
  WebhookFineTuningJobCancelledSchema,
  WebhookFineTuningJobFailedSchema,
  WebhookFineTuningJobSucceededSchema,
  WebhookLiveCallIncomingSchema,
  WebhookLiveTransportConnectedSchema,
  WebhookLiveTransportIncomingSchema,
  WebhookRealtimeCallIncomingSchema,
  WebhookResponseCancelledSchema,
  WebhookResponseCompletedSchema,
  WebhookResponseFailedSchema,
  WebhookResponseIncompleteSchema,
  WebhookSafetyAlertCreatedSchema,
  WebhookSafetyDeactivationIssuedSchema,
  WebhookSafetyOrgAlertCreatedSchema,
  WebhookSafetyWarningIssuedSchema,
} from './components'

export const contract = {
  getAssistants: oc
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
    .output(ListAssistantsResponseSchema),
  postAssistants: oc
    .route({
      method: 'POST',
      path: '/assistants',
      tags: ['Assistants'],
      summary: 'Create assistant',
      description: 'Create an assistant with a model and instructions.',
      deprecated: true,
    })
    .input(CreateAssistantRequestSchema)
    .output(AssistantObjectSchema),
  getAssistantsAssistantId: oc
    .route({
      method: 'GET',
      path: '/assistants/{assistant_id}',
      tags: ['Assistants'],
      summary: 'Retrieve assistant',
      description: 'Retrieves an assistant.',
      deprecated: true,
    })
    .input(z.object({ assistant_id: z.string() }))
    .output(AssistantObjectSchema),
  postAssistantsAssistantId: oc
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
    .output(AssistantObjectSchema),
  deleteAssistantsAssistantId: oc
    .route({
      method: 'DELETE',
      path: '/assistants/{assistant_id}',
      tags: ['Assistants'],
      summary: 'Delete assistant',
      description: 'Delete an assistant.',
      deprecated: true,
    })
    .input(z.object({ assistant_id: z.string() }))
    .output(DeleteAssistantResponseSchema),
  postAudioSpeech: oc
    .route({
      method: 'POST',
      path: '/audio/speech',
      tags: ['Audio'],
      summary: 'Create speech',
      description:
        'Generates audio from the input text.\n\nReturns the audio file content, or a stream of audio events.\n\nThe `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, `gpt-4o-mini-tts-2025-03-20`, and\n`gpt-4o-mini-tts-2025-12-15` models are deprecated and scheduled to shut down\non January 6, 2027. These examples use the existing Speech API; for new\nintegrations, migrate to `gpt-realtime-2.1-mini` through the\n[Realtime API](https://developers.openai.com/api/docs/guides/realtime). See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations) for migration details.\n',
    })
    .input(CreateSpeechRequestSchema),
  postAudioTranscriptions: oc
    .route({
      method: 'POST',
      path: '/audio/transcriptions',
      tags: ['Audio'],
      summary: 'Create transcription',
      description:
        'Transcribes audio into the input language.\n\nReturns a transcription object in `json`, `diarized_json`, or `verbose_json`\nformat, plain text in `text`, `srt`, or `vtt` format, or a stream of\ntranscript events. Supported formats depend on the model.\n',
    })
    .output(
      z.union([
        CreateTranscriptionResponseJsonSchema,
        CreateTranscriptionResponseDiarizedJsonSchema,
        CreateTranscriptionResponseVerboseJsonSchema,
      ]),
    ),
  postAudioTranslations: oc
    .route({
      method: 'POST',
      path: '/audio/translations',
      tags: ['Audio'],
      summary: 'Create translation',
      description:
        'Translates audio into English.\n\nThis endpoint supports only `whisper-1`. The endpoint and model are deprecated\nand scheduled to shut down on February 26, 2027. Migrate to\n`/v1/realtime/translations`, which requires a separate integration. See the\n[deprecation schedule](https://developers.openai.com/api/docs/deprecations)\nfor details.\n',
      deprecated: true,
    })
    .output(
      z.xor([CreateTranslationResponseJsonSchema, CreateTranslationResponseVerboseJsonSchema]),
    ),
  getAudioVoiceConsents: oc
    .route({
      method: 'GET',
      path: '/audio/voice_consents',
      tags: ['Audio'],
      summary: 'List voice consents',
      description: 'Returns a list of voice consent recordings.',
    })
    .input(
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
    )
    .output(VoiceConsentListResourceSchema),
  postAudioVoiceConsents: oc
    .route({
      method: 'POST',
      path: '/audio/voice_consents',
      tags: ['Audio'],
      summary: 'Create voice consent',
      description: 'Upload a voice consent recording.',
    })
    .output(VoiceConsentResourceSchema),
  getAudioVoiceConsentsConsentId: oc
    .route({
      method: 'GET',
      path: '/audio/voice_consents/{consent_id}',
      tags: ['Audio'],
      summary: 'Retrieve voice consent',
      description: 'Retrieves a voice consent recording.',
    })
    .input(z.object({ consent_id: z.string() }))
    .output(VoiceConsentResourceSchema),
  postAudioVoiceConsentsConsentId: oc
    .route({
      method: 'POST',
      path: '/audio/voice_consents/{consent_id}',
      tags: ['Audio'],
      summary: 'Update voice consent',
      description: 'Updates a voice consent recording (metadata only).',
    })
    .input(
      z.object({
        consent_id: z.string(),
        name: z.string().meta({ description: 'The updated label for this consent recording.' }),
      }),
    )
    .output(VoiceConsentResourceSchema),
  deleteAudioVoiceConsentsConsentId: oc
    .route({
      method: 'DELETE',
      path: '/audio/voice_consents/{consent_id}',
      tags: ['Audio'],
      summary: 'Delete voice consent',
      description: 'Deletes a voice consent recording.',
    })
    .input(z.object({ consent_id: z.string() }))
    .output(VoiceConsentDeletedResourceSchema),
  postAudioVoices: oc
    .route({
      method: 'POST',
      path: '/audio/voices',
      tags: ['Audio'],
      summary: 'Create voice',
      description:
        'Creates a voice from a text prompt or from a consent recording and an audio sample.\n\nFor prompt-based creation, send `type: "prompt"` with a `name` and `prompt` as JSON or multipart form data. For creation from an audio sample, send `type: "audio_sample"` with a `name`, `audio_sample`, and `consent` recording ID as multipart form data. The type defaults to `audio_sample` when omitted.\n\nReturns the saved voice\'s metadata. Voices created from text prompts are supported only in Live, not in Realtime or the speech endpoint. The response does not include preview audio.\n',
    })
    .input(CreateVoicePromptRequestSchema)
    .output(VoiceResourceSchema),
  deleteAudioVoicesVoiceId: oc
    .route({
      method: 'DELETE',
      path: '/audio/voices/{voice_id}',
      tags: ['Audio'],
      summary: 'Delete voice',
      description:
        "Deletes a voice created from a text prompt or an audio sample.\n\nRequires voice write permission and access to the voice's project. Access to voices created from recordings is limited to eligible customers. See the [custom voices guide](https://developers.openai.com/api/docs/guides/custom-voices).\n\nDeleting a voice does not delete its consent recording. Deleting an already deleted voice returns a 404 error.\n",
    })
    .input(z.object({ voice_id: z.string() }))
    .output(VoiceDeletedResourceSchema),
  getBatches: oc
    .route({
      method: 'GET',
      path: '/batches',
      tags: ['Batch'],
      summary: 'List batches',
      description: "List your organization's batches.",
      successDescription: 'Batch listed successfully.',
    })
    .input(
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
    )
    .output(ListBatchesResponseSchema),
  postBatches: oc
    .route({
      method: 'POST',
      path: '/batches',
      tags: ['Batch'],
      summary: 'Create batch',
      description: 'Creates and executes a batch from an uploaded file of requests',
      successDescription: 'Batch created successfully.',
    })
    .input(CreateBatchRequestSchema)
    .output(BatchSchema),
  getBatchesBatchId: oc
    .route({
      method: 'GET',
      path: '/batches/{batch_id}',
      tags: ['Batch'],
      summary: 'Retrieve batch',
      description: 'Retrieves a batch.',
      successDescription: 'Batch retrieved successfully.',
    })
    .input(z.object({ batch_id: z.string() }))
    .output(BatchSchema),
  postBatchesBatchIdCancel: oc
    .route({
      method: 'POST',
      path: '/batches/{batch_id}/cancel',
      tags: ['Batch'],
      summary: 'Cancel batch',
      description:
        'Cancels an in-progress batch. The batch will be in status `cancelling` for up to 10 minutes, before changing to `cancelled`, where it will have partial results (if any) available in the output file.',
      successDescription: "Batch is cancelling. Returns the cancelling batch's details.",
    })
    .input(z.object({ batch_id: z.string() }))
    .output(BatchSchema),
  getChatCompletions: oc
    .route({
      method: 'GET',
      path: '/chat/completions',
      tags: ['Chat'],
      summary: 'List Chat Completions',
      description:
        'List stored Chat Completions. Only Chat Completions that have been stored\nwith the `store` parameter set to `true` will be returned.\n',
      successDescription: 'A list of Chat Completions',
    })
    .input(
      z.object({
        model: z.string().exactOptional(),
        metadata: MetadataSchema.exactOptional(),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(ChatCompletionListSchema),
  postChatCompletions: oc
    .route({
      method: 'POST',
      path: '/chat/completions',
      tags: ['Chat'],
      summary: 'Create chat completion',
      description:
        '**Starting a new project?** We recommend trying [Responses](https://developers.openai.com/api/reference/resources/responses)\nto take advantage of the latest OpenAI platform features. Compare\n[Chat Completions with Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses?api-mode=responses).\n\n---\n\nCreates a model response for the given chat conversation. Learn more in the\n[text generation](https://developers.openai.com/api/docs/guides/text), [vision](https://developers.openai.com/api/docs/guides/images-vision),\nand [audio](https://developers.openai.com/api/docs/guides/audio) guides.\n\nParameter support can differ depending on the model used to generate the\nresponse, particularly for newer reasoning models. Parameters that are only\nsupported for reasoning models are noted below. For the current state of\nunsupported parameters in reasoning models,\n[refer to the reasoning guide](https://developers.openai.com/api/docs/guides/reasoning).\n\nReturns a chat completion object, or a streamed sequence of chat completion\nchunk objects if the request is streamed.\n',
      successDescription:
        'Returns a Chat Completion object for a non-streaming request.\n\nIf `stream` is `true`, returns server-sent events (`text/event-stream`).\nSuccessful chunk frames contain a JSON Chat Completion chunk matching\n`CreateChatCompletionStreamResponse`. On normal completion, the final\nframe is:\n\n```text\ndata: [DONE]\n\n```\n\nThe final frame ends with a blank line. `[DONE]` is literal text, not a\nJSON chunk, and this frame has no `event: done` field.\n\nIf a failure occurs after streaming has started, a data frame may\ncontain a JSON object with an `error` field instead of a completion\nchunk. The streaming schema describes successful JSON chunks, not\nerror frames or the completion marker. An interrupted stream may end\nwithout the marker.\n',
    })
    .input(CreateChatCompletionRequestSchema)
    .output(CreateChatCompletionResponseSchema),
  getChatCompletionsCompletionId: oc
    .route({
      method: 'GET',
      path: '/chat/completions/{completion_id}',
      tags: ['Chat'],
      summary: 'Get chat completion',
      description:
        'Get a stored chat completion. Only Chat Completions that have been created\nwith the `store` parameter set to `true` will be returned.\n',
      successDescription: 'A chat completion',
    })
    .input(z.object({ completion_id: z.string() }))
    .output(CreateChatCompletionResponseSchema),
  postChatCompletionsCompletionId: oc
    .route({
      method: 'POST',
      path: '/chat/completions/{completion_id}',
      tags: ['Chat'],
      summary: 'Update chat completion',
      description:
        'Modify a stored chat completion. Only Chat Completions that have been\ncreated with the `store` parameter set to `true` can be modified. Currently,\nthe only supported modification is to update the `metadata` field.\n',
      successDescription: 'A chat completion',
    })
    .input(z.object({ completion_id: z.string(), metadata: MetadataSchema }))
    .output(CreateChatCompletionResponseSchema),
  deleteChatCompletionsCompletionId: oc
    .route({
      method: 'DELETE',
      path: '/chat/completions/{completion_id}',
      tags: ['Chat'],
      summary: 'Delete chat completion',
      description:
        'Delete a stored chat completion. Only Chat Completions that have been\ncreated with the `store` parameter set to `true` can be deleted.\n',
      successDescription: 'The chat completion was deleted successfully.',
    })
    .input(z.object({ completion_id: z.string() }))
    .output(ChatCompletionDeletedSchema),
  getChatCompletionsCompletionIdMessages: oc
    .route({
      method: 'GET',
      path: '/chat/completions/{completion_id}/messages',
      tags: ['Chat'],
      summary: 'Get chat messages',
      description:
        'Get the messages in a stored chat completion. Only Chat Completions that\nhave been created with the `store` parameter set to `true` will be\nreturned.\n',
      successDescription: 'A list of messages',
    })
    .input(
      z.object({
        completion_id: z.string(),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(ChatCompletionMessageListSchema),
  postCompletions: oc
    .route({
      method: 'POST',
      path: '/completions',
      tags: ['Completions'],
      summary: 'Create completion',
      description:
        'Creates a completion for the provided prompt and parameters.\n\nReturns a completion object, or a sequence of completion objects if the request is streamed.\n',
    })
    .input(CreateCompletionRequestSchema)
    .output(CreateCompletionResponseSchema),
  getContainers: oc
    .route({
      method: 'GET',
      path: '/containers',
      summary: 'List containers',
      description: 'List Containers',
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        name: z.string().exactOptional(),
      }),
    )
    .output(ContainerListResourceSchema),
  postContainers: oc
    .route({
      method: 'POST',
      path: '/containers',
      summary: 'Create container',
      description: 'Create Container',
      successDescription: 'Success',
    })
    .input(CreateContainerBodySchema)
    .output(ContainerResourceSchema),
  getContainersContainerId: oc
    .route({
      method: 'GET',
      path: '/containers/{container_id}',
      summary: 'Retrieve container',
      description: 'Retrieve Container',
      successDescription: 'Success',
    })
    .input(z.object({ container_id: z.string() }))
    .output(ContainerResourceSchema),
  deleteContainersContainerId: oc
    .route({
      method: 'DELETE',
      path: '/containers/{container_id}',
      summary: 'Delete a container',
      description: 'Delete Container',
    })
    .input(z.object({ container_id: z.string() }))
    .output(
      z.object({ object: z.literal('container.deleted'), deleted: z.boolean(), id: z.string() }),
    ),
  getContainersContainerIdFiles: oc
    .route({
      method: 'GET',
      path: '/containers/{container_id}/files',
      summary: 'List container files',
      description: 'List Container files',
      successDescription: 'Success',
    })
    .input(
      z.object({
        container_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ContainerFileListResourceSchema),
  postContainersContainerIdFiles: oc
    .route({
      method: 'POST',
      path: '/containers/{container_id}/files',
      summary: 'Create container file',
      description:
        'Create a Container File\n\nYou can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.\n',
      successDescription: 'Success',
    })
    .input(
      z.object({
        container_id: z.string(),
        file_id: z.string().meta({ description: 'Name of the file to create.' }).exactOptional(),
        file: z
          .file()
          .meta({ description: 'The File object (not file name) to be uploaded.\n' })
          .exactOptional(),
      }),
    )
    .output(ContainerFileResourceSchema),
  getContainersContainerIdFilesFileId: oc
    .route({
      method: 'GET',
      path: '/containers/{container_id}/files/{file_id}',
      summary: 'Retrieve container file',
      description: 'Retrieve Container File',
      successDescription: 'Success',
    })
    .input(z.object({ container_id: z.string(), file_id: z.string() }))
    .output(ContainerFileResourceSchema),
  deleteContainersContainerIdFilesFileId: oc
    .route({
      method: 'DELETE',
      path: '/containers/{container_id}/files/{file_id}',
      summary: 'Delete a container file',
      description: 'Delete Container File',
    })
    .input(z.object({ container_id: z.string(), file_id: z.string() }))
    .output(
      z.object({
        object: z.literal('container.file.deleted'),
        deleted: z.boolean(),
        id: z.string(),
      }),
    ),
  getContainersContainerIdFilesFileIdContent: oc
    .route({
      method: 'GET',
      path: '/containers/{container_id}/files/{file_id}/content',
      summary: 'Retrieve container file content',
      description: 'Retrieve Container File Content',
      successDescription: 'Success',
    })
    .input(z.object({ container_id: z.string(), file_id: z.string() })),
  getConversationsConversationIdItems: oc
    .route({
      method: 'GET',
      path: '/conversations/{conversation_id}/items',
      tags: ['Conversations'],
      summary: 'List items',
      description: 'List all items for a conversation with the given ID.',
    })
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    )
    .output(ConversationItemListSchema),
  postConversationsConversationIdItems: oc
    .route({
      method: 'POST',
      path: '/conversations/{conversation_id}/items',
      tags: ['Conversations'],
      summary: 'Create items',
      description: 'Create items in a conversation with the given ID.',
    })
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
        items: z
          .array(InputItemSchema)
          .max(20)
          .meta({
            description:
              'The items to add to the conversation. You may add up to 20 items at a time.\n',
          }),
      }),
    )
    .output(ConversationItemListSchema),
  getConversationsConversationIdItemsItemId: oc
    .route({
      method: 'GET',
      path: '/conversations/{conversation_id}/items/{item_id}',
      tags: ['Conversations'],
      summary: 'Retrieve an item',
      description: 'Get a single item from a conversation with the given IDs.',
    })
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        item_id: z.string().meta({ examples: ['msg_abc'] }),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    )
    .output(ConversationItemSchema),
  deleteConversationsConversationIdItemsItemId: oc
    .route({
      method: 'DELETE',
      path: '/conversations/{conversation_id}/items/{item_id}',
      tags: ['Conversations'],
      summary: 'Delete an item',
      description: 'Delete an item from a conversation with the given IDs.',
    })
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        item_id: z.string().meta({ examples: ['msg_abc'] }),
      }),
    )
    .output(ConversationResourceSchema),
  postEmbeddings: oc
    .route({
      method: 'POST',
      path: '/embeddings',
      tags: ['Embeddings'],
      summary: 'Create embeddings',
      description: 'Creates an embedding vector representing the input text.',
    })
    .input(CreateEmbeddingRequestSchema)
    .output(CreateEmbeddingResponseSchema),
  getEvals: oc
    .route({
      method: 'GET',
      path: '/evals',
      tags: ['Evals'],
      summary: 'List evals',
      description: 'List evaluations for a project.\n',
      successDescription: 'A list of evals',
    })
    .input(
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        order_by: z.enum(['created_at', 'updated_at']).default('created_at').exactOptional(),
      }),
    )
    .output(EvalListSchema),
  postEvals: oc
    .route({
      method: 'POST',
      path: '/evals',
      tags: ['Evals'],
      summary: 'Create eval',
      description:
        "Create the structure of an evaluation that can be used to test a model's performance.\nAn evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources.\nFor more information, see the [Evals guide](https://developers.openai.com/api/docs/guides/evals).\n",
      successStatus: 201,
    })
    .input(CreateEvalRequestSchema)
    .output(EvalSchema),
  getEvalsEvalId: oc
    .route({
      method: 'GET',
      path: '/evals/{eval_id}',
      tags: ['Evals'],
      summary: 'Get an eval',
      description: 'Get an evaluation by ID.\n',
      successDescription: 'The evaluation',
    })
    .input(z.object({ eval_id: z.string() }))
    .output(EvalSchema),
  postEvalsEvalId: oc
    .route({
      method: 'POST',
      path: '/evals/{eval_id}',
      tags: ['Evals'],
      summary: 'Update an eval',
      description: 'Update certain properties of an evaluation.\n',
      successDescription: 'The updated evaluation',
    })
    .input(
      z.object({
        eval_id: z.string(),
        name: z.string().meta({ description: 'Rename the evaluation.' }).exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(EvalSchema),
  deleteEvalsEvalId: oc
    .route({
      method: 'DELETE',
      path: '/evals/{eval_id}',
      tags: ['Evals'],
      summary: 'Delete an eval',
      description: 'Delete an evaluation.\n',
      successDescription: 'Successfully deleted the evaluation.',
    })
    .input(z.object({ eval_id: z.string() }))
    .output(
      z.object({
        object: z.string().meta({ examples: ['eval.deleted'] }),
        deleted: z.boolean().meta({ examples: [true] }),
        eval_id: z.string().meta({ examples: ['eval_abc123'] }),
      }),
    ),
  getEvalsEvalIdRuns: oc
    .route({
      method: 'GET',
      path: '/evals/{eval_id}/runs',
      tags: ['Evals'],
      summary: 'Get eval runs',
      description: 'Get a list of runs for an evaluation.\n',
      successDescription: 'A list of runs for the evaluation',
    })
    .input(
      z.object({
        eval_id: z.string(),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        status: z
          .enum(['queued', 'in_progress', 'completed', 'canceled', 'failed'])
          .exactOptional(),
      }),
    )
    .output(EvalRunListSchema),
  postEvalsEvalIdRuns: oc
    .route({
      method: 'POST',
      path: '/evals/{eval_id}/runs',
      tags: ['Evals'],
      summary: 'Create eval run',
      description:
        'Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.\n',
      successStatus: 201,
      successDescription: 'Successfully created a run for the evaluation',
    })
    .input(
      z.object({
        eval_id: z.string(),
        name: z.string().meta({ description: 'The name of the run.' }).exactOptional(),
        metadata: MetadataSchema.exactOptional(),
        data_source: z
          .xor([
            CreateEvalJsonlRunDataSourceSchema,
            CreateEvalCompletionsRunDataSourceSchema,
            CreateEvalResponsesRunDataSourceSchema,
          ])
          .meta({ description: "Details about the run's data source." }),
      }),
    )
    .output(EvalRunSchema),
  getEvalsEvalIdRunsRunId: oc
    .route({
      method: 'GET',
      path: '/evals/{eval_id}/runs/{run_id}',
      tags: ['Evals'],
      summary: 'Get an eval run',
      description: 'Get an evaluation run by ID.\n',
      successDescription: 'The evaluation run',
    })
    .input(z.object({ eval_id: z.string(), run_id: z.string() }))
    .output(EvalRunSchema),
  deleteEvalsEvalIdRunsRunId: oc
    .route({
      method: 'DELETE',
      path: '/evals/{eval_id}/runs/{run_id}',
      tags: ['Evals'],
      summary: 'Delete eval run',
      description: 'Delete an eval run.\n',
      successDescription: 'Successfully deleted the eval run',
    })
    .input(z.object({ eval_id: z.string(), run_id: z.string() }))
    .output(
      z.object({
        object: z
          .string()
          .meta({ examples: ['eval.run.deleted'] })
          .exactOptional(),
        deleted: z
          .boolean()
          .meta({ examples: [true] })
          .exactOptional(),
        run_id: z
          .string()
          .meta({ examples: ['evalrun_677469f564d48190807532a852da3afb'] })
          .exactOptional(),
      }),
    ),
  postEvalsEvalIdRunsRunIdCancel: oc
    .route({
      method: 'POST',
      path: '/evals/{eval_id}/runs/{run_id}/cancel',
      tags: ['Evals'],
      summary: 'Cancel eval run',
      description: 'Cancel an ongoing evaluation run.\n',
      successDescription: 'The canceled eval run object',
    })
    .input(z.object({ eval_id: z.string(), run_id: z.string() }))
    .output(EvalRunSchema),
  getEvalsEvalIdRunsRunIdOutputItems: oc
    .route({
      method: 'GET',
      path: '/evals/{eval_id}/runs/{run_id}/output_items',
      tags: ['Evals'],
      summary: 'Get eval run output items',
      description: 'Get a list of output items for an evaluation run.\n',
      successDescription: 'A list of output items for the evaluation run',
    })
    .input(
      z.object({
        eval_id: z.string(),
        run_id: z.string(),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        status: z.enum(['fail', 'pass']).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(EvalRunOutputItemListSchema),
  getEvalsEvalIdRunsRunIdOutputItemsOutputItemId: oc
    .route({
      method: 'GET',
      path: '/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}',
      tags: ['Evals'],
      summary: 'Get an output item of an eval run',
      description: 'Get an evaluation run output item by ID.\n',
      successDescription: 'The evaluation run output item',
    })
    .input(z.object({ eval_id: z.string(), run_id: z.string(), output_item_id: z.string() }))
    .output(EvalRunOutputItemSchema),
  getFiles: oc
    .route({
      method: 'GET',
      path: '/files',
      tags: ['Files'],
      summary: 'List files',
      description: 'Returns a list of files.',
    })
    .input(
      z.object({
        purpose: z.string().exactOptional(),
        limit: z.coerce.number().int().default(10000).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ListFilesResponseSchema),
  postFiles: oc
    .route({
      method: 'POST',
      path: '/files',
      tags: ['Files'],
      summary: 'Upload file',
      description:
        'Upload a file that can be used across various endpoints. Individual files\ncan be up to 512 MB, and each project can store up to 2.5 TB of files in\ntotal. There is no organization-wide storage limit. Uploads to this\nendpoint are rate-limited to 1,000 requests per minute per authenticated\nuser.\n\n- The Assistants API supports files up to 2 million tokens and of specific\n  file types. See the [Assistants Tools guide](https://developers.openai.com/api/docs/guides/tools) for\n  details.\n- The Fine-tuning API only supports `.jsonl` files. The input also has\n  certain required formats for fine-tuning\n  [chat](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) or\n  [completions](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) models.\n- The Batch API only supports `.jsonl` files up to 200 MB in size. The input\n  also has a specific required\n  [format](https://developers.openai.com/api/docs/guides/batch#1-prepare-your-batch-file).\n- For Retrieval or `file_search` ingestion, upload files here first. If\n  you need to attach multiple uploaded files to the same vector store, use\n  [`/vector_stores/{vector_store_id}/file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create)\n  instead of attaching them one by one. Vector store attachment has separate\n  limits from file upload, including 2,000 attached files per minute per\n  organization.\n\nPlease [contact us](https://help.openai.com/) if you need to increase these\nstorage limits.\n',
    })
    .output(OpenAIFileSchema),
  getFilesFileId: oc
    .route({
      method: 'GET',
      path: '/files/{file_id}',
      tags: ['Files'],
      summary: 'Retrieve file',
      description: 'Returns information about a specific file.',
    })
    .input(z.object({ file_id: z.string() }))
    .output(OpenAIFileSchema),
  deleteFilesFileId: oc
    .route({
      method: 'DELETE',
      path: '/files/{file_id}',
      tags: ['Files'],
      summary: 'Delete file',
      description: 'Delete a file and remove it from all vector stores.',
    })
    .input(z.object({ file_id: z.string() }))
    .output(DeleteFileResponseSchema),
  getFilesFileIdContent: oc
    .route({
      method: 'GET',
      path: '/files/{file_id}/content',
      tags: ['Files'],
      summary: 'Retrieve file content',
      description: 'Returns a response containing the contents of the specified file.',
    })
    .input(z.object({ file_id: z.string() })),
  postFineTuningAlphaGradersRun: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/alpha/graders/run',
      tags: ['Fine-tuning'],
      summary: 'Run grader',
      description: 'Run a grader.\n',
    })
    .input(RunGraderRequestSchema)
    .output(RunGraderResponseSchema),
  postFineTuningAlphaGradersValidate: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/alpha/graders/validate',
      tags: ['Fine-tuning'],
      summary: 'Validate grader',
      description: 'Validate a grader.\n',
    })
    .input(ValidateGraderRequestSchema)
    .output(ValidateGraderResponseSchema),
  getFineTuningCheckpointsFineTunedModelCheckpointPermissions: oc
    .route({
      method: 'GET',
      path: '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
      tags: ['Fine-tuning'],
      summary: 'List checkpoint permissions',
      description:
        '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.\n',
    })
    .input(
      z.object({
        fine_tuned_model_checkpoint: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        project_id: z.string().exactOptional(),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(10).exactOptional(),
        order: z.enum(['ascending', 'descending']).default('descending').exactOptional(),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema),
  postFineTuningCheckpointsFineTunedModelCheckpointPermissions: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
      tags: ['Fine-tuning'],
      summary: 'Create checkpoint permissions',
      description:
        '**NOTE:** Calling this endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nThis enables organization owners to share fine-tuned models with other projects in their organization.\n',
    })
    .input(
      z.object({
        fine_tuned_model_checkpoint: z
          .string()
          .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        project_ids: z
          .array(z.string())
          .meta({ description: 'The project identifiers to grant access to.' }),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema),
  deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId: oc
    .route({
      method: 'DELETE',
      path: '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}',
      tags: ['Fine-tuning'],
      summary: 'Delete checkpoint permission',
      description:
        '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.\n',
    })
    .input(
      z.object({
        fine_tuned_model_checkpoint: z
          .string()
          .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        permission_id: z.string().meta({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
      }),
    )
    .output(DeleteFineTuningCheckpointPermissionResponseSchema),
  getFineTuningJobs: oc
    .route({
      method: 'GET',
      path: '/fine_tuning/jobs',
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning jobs',
      description: "List your organization's fine-tuning jobs\n",
    })
    .input(
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        metadata: z
          .preprocess(
            (val) => {
              if (typeof val !== 'object' || val === null || Array.isArray(val)) return val
              const out = Object.entries(val).reduce<{ [k: string]: unknown }>(
                (acc, [key, value]) => {
                  const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                  return name === undefined ? acc : { ...acc, [name]: value }
                },
                {},
              )
              return Object.keys(out).length > 0 ? out : val
            },
            z.preprocess(
              (val) => (val === 'null' ? null : val),
              z.record(z.string(), z.string()).nullable(),
            ),
          )
          .exactOptional(),
      }),
    )
    .output(ListPaginatedFineTuningJobsResponseSchema),
  postFineTuningJobs: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/jobs',
      tags: ['Fine-tuning'],
      summary: 'Create fine-tuning job',
      description:
        'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\n\nResponse includes details of the enqueued job including job status and the name of the fine-tuned models once complete.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
    })
    .input(CreateFineTuningJobRequestSchema)
    .output(FineTuningJobSchema),
  getFineTuningJobsFineTuningJobId: oc
    .route({
      method: 'GET',
      path: '/fine_tuning/jobs/{fine_tuning_job_id}',
      tags: ['Fine-tuning'],
      summary: 'Retrieve fine-tuning job',
      description:
        'Get info about a fine-tuning job.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
    })
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema),
  postFineTuningJobsFineTuningJobIdCancel: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/jobs/{fine_tuning_job_id}/cancel',
      tags: ['Fine-tuning'],
      summary: 'Cancel fine-tuning',
      description: 'Immediately cancel a fine-tune job.\n',
    })
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema),
  getFineTuningJobsFineTuningJobIdCheckpoints: oc
    .route({
      method: 'GET',
      path: '/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints',
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning checkpoints',
      description: 'List checkpoints for a fine-tuning job.\n',
    })
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(10).exactOptional(),
      }),
    )
    .output(ListFineTuningJobCheckpointsResponseSchema),
  getFineTuningJobsFineTuningJobIdEvents: oc
    .route({
      method: 'GET',
      path: '/fine_tuning/jobs/{fine_tuning_job_id}/events',
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning events',
      description: 'Get status updates for a fine-tuning job.\n',
    })
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
    )
    .output(ListFineTuningJobEventsResponseSchema),
  postFineTuningJobsFineTuningJobIdPause: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/jobs/{fine_tuning_job_id}/pause',
      tags: ['Fine-tuning'],
      summary: 'Pause fine-tuning',
      description: 'Pause a fine-tune job.\n',
    })
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema),
  postFineTuningJobsFineTuningJobIdResume: oc
    .route({
      method: 'POST',
      path: '/fine_tuning/jobs/{fine_tuning_job_id}/resume',
      tags: ['Fine-tuning'],
      summary: 'Resume fine-tuning',
      description: 'Resume a fine-tune job.\n',
    })
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema),
  postImagesEdits: oc
    .route({
      method: 'POST',
      path: '/images/edits',
      tags: ['Images'],
      summary: 'Create image edit',
      description:
        'Creates an edited or extended image given one or more source images and a prompt. This endpoint supports GPT Image models.',
    })
    .input(EditImageBodyJsonParamSchema)
    .output(ImagesResponseSchema),
  postImagesGenerations: oc
    .route({
      method: 'POST',
      path: '/images/generations',
      tags: ['Images'],
      summary: 'Create image',
      description:
        'Creates an image given a prompt using a GPT Image model. [Learn more](https://developers.openai.com/api/docs/guides/images-vision).\n',
    })
    .input(CreateImageRequestSchema)
    .output(ImagesResponseSchema),
  postImagesVariations: oc
    .route({
      method: 'POST',
      path: '/images/variations',
      tags: ['Images'],
      summary: 'Create image variation',
      description:
        'This endpoint is retired and no longer available. Use the image edits endpoint with a GPT Image model and a prompt to create a variation of an image. The request and response schemas below describe the legacy contract.',
      deprecated: true,
    })
    .output(ImagesResponseSchema),
  postLiveSessions: oc
    .route({
      method: 'POST',
      path: '/live/sessions',
      tags: ['Live'],
      summary: 'Create session',
      description:
        'Create a Live WebRTC session or place an outbound SIP call. Start with the\n[Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) for session configuration\nand [Telephony and SIP](https://developers.openai.com/api/docs/guides/voice-sip?api=live#place-an-outbound-call)\nfor trunk setup and call monitoring.\n\nSet transport.type to `webrtc` and supply an SDP offer, or set it to `sip`\nand supply an E.164 destination and trunk credentials.\nRinging is limited to 3 minutes and connected calls to 2 hours; these limits\nare not configurable in the request.\n\nReturns `201 Created` after session initialization. WebRTC responses include an\nSDP answer. SIP responses do not wait for the callee to answer. Attach a\nsideband connection using session.id to monitor SIP call progress.\n\nEach SIP request creates a new call. If a request times out or the connection\nfails, retry with caution: the original request may have succeeded, and a\nretry can place another call.',
      successStatus: 201,
      successDescription:
        'Returns 201 Created with a WebRTC answer or an initialized outbound SIP session. A SIP response does not mean the callee has answered.',
    })
    .input(LiveSessionCreateRequestSchema)
    .output(LiveSessionCreateResponseSchema),
  postLiveSessionsSessionIdAccept: oc
    .route({
      method: 'POST',
      path: '/live/sessions/{session_id}/accept',
      tags: ['Live'],
      summary: 'Accept call',
      description:
        'Accept an incoming SIP call. Supply session with type live, the model, and startup configuration. Before accepting calls, follow the [Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) to write frontend conversation instructions and a separate backend prompt. SIP media format is negotiated; omit audio.format.',
      successDescription: 'Session accept request accepted.',
    })
    .input(z.object({ session_id: z.string(), session: LiveCallAcceptSessionSchema })),
  postLiveSessionsSessionIdFork: oc
    .route({
      method: 'POST',
      path: '/live/sessions/{session_id}/fork',
      tags: ['Live'],
      summary: 'Fork session',
      description: 'Fork a stored Live session onto a new WebRTC connection.',
      successStatus: 201,
      successDescription: 'Forked Live session created with a WebRTC answer.',
    })
    .input(
      z.object({
        session_id: z.string(),
        session: LiveMediaSessionForkParamsSchema.exactOptional(),
        transport: LiveWebRTCTransportSchema,
      }),
    )
    .output(LiveCreateResponseSchema),
  postLiveSessionsSessionIdHangup: oc
    .route({
      method: 'POST',
      path: '/live/sessions/{session_id}/hangup',
      tags: ['Live'],
      summary: 'Hang up session',
      description: 'End a SIP call identified by session_id.',
      successDescription: 'Session hangup request accepted.',
    })
    .input(z.object({ session_id: z.string() })),
  postLiveSessionsSessionIdRefer: oc
    .route({
      method: 'POST',
      path: '/live/sessions/{session_id}/refer',
      tags: ['Live'],
      summary: 'Transfer call',
      description:
        'Transfer a SIP call to another destination. Supply a nonblank target_uri for the SIP Refer-To header.',
      successDescription: 'Session refer request accepted.',
    })
    .input(z.object({ session_id: z.string(), target_uri: TargetUriSchema })),
  postLiveSessionsSessionIdReject: oc
    .route({
      method: 'POST',
      path: '/live/sessions/{session_id}/reject',
      tags: ['Live'],
      summary: 'Reject call',
      description:
        'Reject an incoming SIP call. Send a required SIP rejection status_code between 300 and 699.',
      successDescription: 'Session reject request accepted.',
    })
    .input(
      z.object({
        session_id: z.string(),
        status_code: z
          .int()
          .min(300)
          .max(699)
          .meta({
            description: 'SIP rejection status sent to the caller. This field is required.',
            examples: [486],
          }),
      }),
    ),
  getModels: oc
    .route({
      method: 'GET',
      path: '/models',
      tags: ['Models'],
      summary: 'List models',
      description:
        'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
    })
    .output(ListModelsResponseSchema),
  getModelsModel: oc
    .route({
      method: 'GET',
      path: '/models/{model}',
      tags: ['Models'],
      summary: 'Retrieve model',
      description:
        'Retrieves a model instance, providing basic information about the model such as the owner and permissioning.',
    })
    .input(z.object({ model: z.string().meta({ examples: ['gpt-6.2-astra'] }) }))
    .output(ModelSchema),
  deleteModelsModel: oc
    .route({
      method: 'DELETE',
      path: '/models/{model}',
      tags: ['Models'],
      summary: 'Delete a fine-tuned model',
      description:
        'Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.',
    })
    .input(
      z.object({
        model: z.string().meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
      }),
    )
    .output(DeleteModelResponseSchema),
  postModerations: oc
    .route({
      method: 'POST',
      path: '/moderations',
      tags: ['Moderations'],
      summary: 'Create moderation',
      description:
        'Classifies if text and/or image inputs are potentially harmful. Learn\nmore in the [moderation guide](https://developers.openai.com/api/docs/guides/moderation).\n',
    })
    .input(CreateModerationRequestSchema)
    .output(z.xor([CreateModerationResponseSchema, CreateCSAMModerationResponseSchema])),
  getOrganizationAdminApiKeys: oc
    .route({
      method: 'GET',
      path: '/organization/admin_api_keys',
      summary: 'List all organization and project API keys.',
      description: 'List organization API keys',
      successDescription: 'A list of organization API keys.',
    })
    .input(
      z.object({
        after: z
          .string()
          .nullable()
          .meta({
            description: 'Return keys with IDs that come after this ID in the pagination order.',
          })
          .exactOptional(),
        order: z
          .enum(['asc', 'desc'])
          .default('asc')
          .meta({ description: 'Order results by creation time, ascending or descending.' })
          .exactOptional(),
        limit: z.coerce
          .number()
          .int()
          .default(20)
          .meta({ description: 'Maximum number of keys to return.' })
          .exactOptional(),
      }),
    )
    .output(ApiKeyListSchema),
  postOrganizationAdminApiKeys: oc
    .route({
      method: 'POST',
      path: '/organization/admin_api_keys',
      summary: 'Create admin API key',
      description: 'Create an organization admin API key',
      successDescription: 'The newly created admin API key.',
    })
    .input(
      z.object({
        name: z.string().meta({ examples: ['New Admin Key'] }),
        expires_in_seconds: z
          .int()
          .min(1)
          .max(31536000)
          .meta({
            description:
              'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
            examples: [2592000],
          })
          .exactOptional(),
      }),
    )
    .output(AdminApiKeyCreateResponseSchema),
  getOrganizationAdminApiKeysKeyId: oc
    .route({
      method: 'GET',
      path: '/organization/admin_api_keys/{key_id}',
      summary: 'Retrieve admin API key',
      description: 'Retrieve a single organization API key',
      successDescription: 'Details of the requested API key.',
    })
    .input(z.object({ key_id: z.string().meta({ description: 'The ID of the API key.' }) }))
    .output(AdminApiKeySchema),
  deleteOrganizationAdminApiKeysKeyId: oc
    .route({
      method: 'DELETE',
      path: '/organization/admin_api_keys/{key_id}',
      summary: 'Delete admin API key',
      description: 'Delete an organization admin API key',
      successDescription: 'Confirmation that the API key was deleted.',
    })
    .input(
      z.object({
        key_id: z.string().meta({ description: 'The ID of the API key to be deleted.' }),
      }),
    )
    .output(
      z.object({
        id: z.string().meta({ examples: ['key_abc'] }),
        object: z
          .literal('organization.admin_api_key.deleted')
          .meta({ examples: ['organization.admin_api_key.deleted'] }),
        deleted: z.boolean().meta({ examples: [true] }),
      }),
    ),
  getOrganizationAuditLogs: oc
    .route({
      method: 'GET',
      path: '/organization/audit_logs',
      tags: ['Audit Logs'],
      summary: 'List audit logs',
      description: 'List user actions and configuration changes within this organization.',
      successDescription: 'Audit logs listed successfully.',
    })
    .input(
      z.object({
        effective_at: z
          .object({
            gt: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
              })
              .exactOptional(),
            gte: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
              })
              .exactOptional(),
            lt: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is less than this value.',
              })
              .exactOptional(),
            lte: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
              })
              .exactOptional(),
          })
          .exactOptional(),
        'project_ids[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        'event_types[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(AuditLogEventTypeSchema),
          )
          .exactOptional(),
        'actor_ids[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        'actor_emails[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        'resource_ids[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        tenant_only: z.stringbool().default(false).exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ListAuditLogsResponseSchema),
  getOrganizationCertificates: oc
    .route({
      method: 'GET',
      path: '/organization/certificates',
      tags: ['Certificates'],
      summary: 'List organization certificates',
      description: 'List uploaded certificates for this organization.',
      successDescription: 'Certificates listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    )
    .output(ListCertificatesResponseSchema),
  postOrganizationCertificates: oc
    .route({
      method: 'POST',
      path: '/organization/certificates',
      tags: ['Certificates'],
      summary: 'Upload certificate',
      description:
        'Upload a certificate to the organization. This does **not** automatically activate the certificate.\n\nOrganizations can upload up to 50 certificates.\n',
      successDescription: 'Certificate uploaded successfully.',
    })
    .input(UploadCertificateRequestSchema)
    .output(CertificateSchema),
  postOrganizationCertificatesActivate: oc
    .route({
      method: 'POST',
      path: '/organization/certificates/activate',
      tags: ['Certificates'],
      summary: 'Activate certificates for organization',
      description:
        'Activate certificates at the organization level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
      successDescription: 'Certificates activated successfully.',
    })
    .input(ToggleCertificatesRequestSchema)
    .output(OrganizationCertificateActivationResponseSchema),
  postOrganizationCertificatesDeactivate: oc
    .route({
      method: 'POST',
      path: '/organization/certificates/deactivate',
      tags: ['Certificates'],
      summary: 'Deactivate certificates for organization',
      description:
        'Deactivate certificates at the organization level.\n\nYou can atomically and idempotently deactivate up to 10 certificates at a time.\n',
      successDescription: 'Certificates deactivated successfully.',
    })
    .input(ToggleCertificatesRequestSchema)
    .output(OrganizationCertificateDeactivationResponseSchema),
  getOrganizationCertificatesCertificateId: oc
    .route({
      method: 'GET',
      path: '/organization/certificates/{certificate_id}',
      tags: ['Certificates'],
      summary: 'Get certificate',
      description:
        'Get a certificate that has been uploaded to the organization.\n\nYou can get a certificate regardless of whether it is active or not.\n',
      successDescription: 'Certificate retrieved successfully.',
    })
    .input(
      z.object({
        certificate_id: z.string(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('content')),
          )
          .exactOptional(),
      }),
    )
    .output(CertificateSchema),
  postOrganizationCertificatesCertificateId: oc
    .route({
      method: 'POST',
      path: '/organization/certificates/{certificate_id}',
      tags: ['Certificates'],
      summary: 'Modify certificate',
      description: 'Modify a certificate. Note that only the name can be modified.\n',
      successDescription: 'Certificate modified successfully.',
    })
    .input(
      z.object({
        certificate_id: z.string(),
        name: z
          .string()
          .meta({ description: 'The updated name for the certificate' })
          .exactOptional(),
      }),
    )
    .output(CertificateSchema),
  deleteOrganizationCertificatesCertificateId: oc
    .route({
      method: 'DELETE',
      path: '/organization/certificates/{certificate_id}',
      tags: ['Certificates'],
      summary: 'Delete certificate',
      description:
        'Delete a certificate from the organization.\n\nThe certificate must be inactive for the organization and all projects.\n',
      successDescription: 'Certificate deleted successfully.',
    })
    .input(z.object({ certificate_id: z.string() }))
    .output(DeleteCertificateResponseSchema),
  getOrganizationCosts: oc
    .route({
      method: 'GET',
      path: '/organization/costs',
      tags: ['Usage'],
      summary: 'Costs',
      description: 'Get costs details for the organization.',
      successDescription: 'Costs data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.literal('1d').default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        line_items: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().default(7).exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationDataRetention: oc
    .route({
      method: 'GET',
      path: '/organization/data_retention',
      tags: ['Data retention'],
      summary: 'Retrieve organization data retention',
      description: 'Retrieves organization data retention controls.',
      successDescription: 'Organization data retention controls retrieved successfully.',
    })
    .output(OrganizationDataRetentionSchema),
  postOrganizationDataRetention: oc
    .route({
      method: 'POST',
      path: '/organization/data_retention',
      tags: ['Data retention'],
      summary: 'Update organization data retention',
      description: 'Updates organization data retention controls.',
      successDescription: 'Organization data retention controls updated successfully.',
    })
    .input(UpdateOrganizationDataRetentionBodySchema)
    .output(OrganizationDataRetentionSchema),
  getOrganizationGroups: oc
    .route({
      method: 'GET',
      path: '/organization/groups',
      tags: ['Groups'],
      summary: 'List groups',
      description: 'Lists all groups in the organization.',
      successDescription: 'Groups listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).default(100).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(GroupListResourceSchema),
  postOrganizationGroups: oc
    .route({
      method: 'POST',
      path: '/organization/groups',
      tags: ['Groups'],
      summary: 'Create group',
      description: 'Creates a new group in the organization.',
      successDescription: 'Group created successfully.',
    })
    .input(CreateGroupBodySchema)
    .output(GroupResponseSchema),
  getOrganizationGroupsGroupId: oc
    .route({
      method: 'GET',
      path: '/organization/groups/{group_id}',
      tags: ['Groups'],
      summary: 'Retrieve group',
      description: 'Retrieves a group.',
      successDescription: 'Group retrieved successfully.',
    })
    .input(z.object({ group_id: z.string() }))
    .output(GroupResponseSchema),
  postOrganizationGroupsGroupId: oc
    .route({
      method: 'POST',
      path: '/organization/groups/{group_id}',
      tags: ['Groups'],
      summary: 'Update group',
      description: "Updates a group's information.",
      successDescription: 'Group updated successfully.',
    })
    .input(
      z.object({
        group_id: z.string(),
        name: z.string().min(1).max(255).meta({ description: 'New display name for the group.' }),
      }),
    )
    .output(GroupResourceWithSuccessSchema),
  deleteOrganizationGroupsGroupId: oc
    .route({
      method: 'DELETE',
      path: '/organization/groups/{group_id}',
      tags: ['Groups'],
      summary: 'Delete group',
      description: 'Deletes a group from the organization.',
      successDescription: 'Group deleted successfully.',
    })
    .input(z.object({ group_id: z.string() }))
    .output(GroupDeletedResourceSchema),
  getOrganizationGroupsGroupIdRoles: oc
    .route({
      method: 'GET',
      path: '/organization/groups/{group_id}/roles',
      tags: ['Group organization role assignments'],
      summary: 'List group organization role assignments',
      description: 'Lists the organization roles assigned to a group within the organization.',
      successDescription: 'Group organization role assignments listed successfully.',
    })
    .input(
      z.object({
        group_id: z.string(),
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema),
  postOrganizationGroupsGroupIdRoles: oc
    .route({
      method: 'POST',
      path: '/organization/groups/{group_id}/roles',
      tags: ['Group organization role assignments'],
      summary: 'Assign organization role to group',
      description: 'Assigns an organization role to a group within the organization.',
      successDescription: 'Organization role assigned to the group successfully.',
    })
    .input(
      z.object({
        group_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(GroupRoleAssignmentSchema),
  getOrganizationGroupsGroupIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/organization/groups/{group_id}/roles/{role_id}',
      tags: ['Group organization role assignments'],
      summary: 'Retrieve group organization role',
      description: 'Retrieves an organization role assigned to a group.',
      successDescription: 'Organization role retrieved for the group successfully.',
    })
    .input(z.object({ group_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema),
  deleteOrganizationGroupsGroupIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/organization/groups/{group_id}/roles/{role_id}',
      tags: ['Group organization role assignments'],
      summary: 'Unassign organization role from group',
      description: 'Unassigns an organization role from a group within the organization.',
      successDescription: 'Organization role unassigned from the group successfully.',
    })
    .input(z.object({ group_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema),
  getOrganizationGroupsGroupIdUsers: oc
    .route({
      method: 'GET',
      path: '/organization/groups/{group_id}/users',
      tags: ['Group users'],
      summary: 'List group users',
      description: 'Lists the users assigned to a group.',
      successDescription: 'Group users listed successfully.',
    })
    .input(
      z.object({
        group_id: z.string(),
        limit: z.coerce.number().int().min(0).max(1000).default(100).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    )
    .output(UserListResourceSchema),
  postOrganizationGroupsGroupIdUsers: oc
    .route({
      method: 'POST',
      path: '/organization/groups/{group_id}/users',
      tags: ['Group users'],
      summary: 'Add group user',
      description: 'Adds a user to a group.',
      successDescription: 'User added to the group successfully.',
    })
    .input(
      z.object({
        group_id: z.string(),
        user_id: z.string().meta({ description: 'Identifier of the user to add to the group.' }),
      }),
    )
    .output(GroupUserAssignmentSchema),
  getOrganizationGroupsGroupIdUsersUserId: oc
    .route({
      method: 'GET',
      path: '/organization/groups/{group_id}/users/{user_id}',
      tags: ['Group users'],
      summary: 'Retrieve group user',
      description: 'Retrieves a user in a group.',
      successDescription: 'User retrieved from the group successfully.',
    })
    .input(z.object({ group_id: z.string(), user_id: z.string() }))
    .output(GroupMemberUserSchema),
  deleteOrganizationGroupsGroupIdUsersUserId: oc
    .route({
      method: 'DELETE',
      path: '/organization/groups/{group_id}/users/{user_id}',
      tags: ['Group users'],
      summary: 'Remove group user',
      description: 'Removes a user from a group.',
      successDescription: 'User removed from the group successfully.',
    })
    .input(z.object({ group_id: z.string(), user_id: z.string() }))
    .output(GroupUserDeletedResourceSchema),
  getOrganizationInvites: oc
    .route({
      method: 'GET',
      path: '/organization/invites',
      tags: ['Invites'],
      summary: 'List invites',
      description: 'Returns a list of invites in the organization.',
      successDescription: 'Invites listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(InviteListResponseSchema),
  postOrganizationInvites: oc
    .route({
      method: 'POST',
      path: '/organization/invites',
      tags: ['Invites'],
      summary: 'Create invite',
      description:
        'Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.',
      successDescription: 'User invited successfully.',
    })
    .input(InviteRequestSchema)
    .output(InviteSchema),
  getOrganizationInvitesInviteId: oc
    .route({
      method: 'GET',
      path: '/organization/invites/{invite_id}',
      tags: ['Invites'],
      summary: 'Retrieve invite',
      description: 'Retrieves an invite.',
      successDescription: 'Invite retrieved successfully.',
    })
    .input(z.object({ invite_id: z.string() }))
    .output(InviteSchema),
  deleteOrganizationInvitesInviteId: oc
    .route({
      method: 'DELETE',
      path: '/organization/invites/{invite_id}',
      tags: ['Invites'],
      summary: 'Delete invite',
      description:
        'Delete an invite. If the invite has already been accepted, it cannot be deleted.',
      successDescription: 'Invite deleted successfully.',
    })
    .input(z.object({ invite_id: z.string() }))
    .output(InviteDeleteResponseSchema),
  getOrganizationProjects: oc
    .route({
      method: 'GET',
      path: '/organization/projects',
      tags: ['Projects'],
      summary: 'List projects',
      description: 'Returns a list of projects.',
      successDescription: 'Projects listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        include_archived: z.stringbool().default(false).exactOptional(),
      }),
    )
    .output(ProjectListResponseSchema),
  postOrganizationProjects: oc
    .route({
      method: 'POST',
      path: '/organization/projects',
      tags: ['Projects'],
      summary: 'Create project',
      description:
        'Create a new project in the organization. Projects can be created and archived, but cannot be deleted.',
      successDescription: 'Project created successfully.',
    })
    .input(ProjectCreateRequestSchema)
    .output(ProjectSchema),
  getOrganizationProjectsProjectId: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}',
      tags: ['Projects'],
      summary: 'Retrieve project',
      description: 'Retrieves a project.',
      successDescription: 'Project retrieved successfully.',
    })
    .input(z.object({ project_id: z.string() }))
    .output(ProjectSchema),
  postOrganizationProjectsProjectId: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}',
      tags: ['Projects'],
      summary: 'Modify project',
      description: 'Modifies a project in the organization.',
      successDescription: 'Project updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        name: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'The updated name of the project, this name appears in reports.' })
          .exactOptional(),
        external_key_id: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'External key ID to associate with the project.' })
          .exactOptional(),
        geography: z
          .union([z.string(), z.null().nullable()])
          .meta({
            description:
              'Geography for the project.\nDeprecated: use `residency` when creating a project to configure data residency. This field is retained for backward compatibility.',
            deprecated: true,
          })
          .exactOptional(),
      }),
    )
    .output(ProjectSchema),
  getOrganizationProjectsProjectIdApiKeys: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/api_keys',
      tags: ['Projects'],
      summary: 'List project API keys',
      description: 'Returns a list of API keys in the project.',
      successDescription: 'Project API keys listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        owner_project_access: z.enum(['active', 'inactive', 'any']).exactOptional(),
      }),
    )
    .output(ProjectApiKeyListResponseSchema),
  getOrganizationProjectsProjectIdApiKeysApiKeyId: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
      tags: ['Projects'],
      summary: 'Retrieve project API key',
      description: 'Retrieves an API key in the project.',
      successDescription: 'Project API key retrieved successfully.',
    })
    .input(z.object({ project_id: z.string(), api_key_id: z.string() }))
    .output(ProjectApiKeySchema),
  postOrganizationProjectsProjectIdApiKeysApiKeyId: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
      tags: ['Projects'],
      summary: 'Update project API key',
      description:
        'Updates the scopes and/or expiration of an existing API key in the project, including a\nservice-account-owned key. Requires permission to write project API keys.\n\nProvide at least one of `scopes` or `expires_in_seconds`. Omitted fields stay\nunchanged; neither field accepts `null`. Both changes are saved together.\n\n`scopes` replaces the key\'s scope restrictions using the same scope identifiers\nas the dashboard. An empty array means All permissions, subject to the owner\'s\neffective access; it does not mean no access. Use `["api.all.read"]` for read-only\naccess or specific scopes such as `["api.files.read"]` for restricted access.\nThis does not change user or service-account roles or grant admin permissions.\nScope changes follow the same authentication-cache propagation as dashboard edits.\n\nProvide `expires_in_seconds` to set the expiration relative to this request.\nThe value must satisfy the organization\'s and project\'s expiry policies.\nExpired keys cannot be updated. Retrying resets the expiration relative to\nthe new request. The response contains only the redacted key, not its secret.\n',
      successDescription: 'Project API key updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        api_key_id: z.string(),
        expires_in_seconds: z
          .int()
          .min(1)
          .max(31536000)
          .meta({
            description:
              'Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.',
          })
          .exactOptional(),
        scopes: z
          .array(z.string())
          .meta({
            description:
              'Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner\'s effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner\'s roles or grant administrative permissions.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectApiKeySchema),
  deleteOrganizationProjectsProjectIdApiKeysApiKeyId: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
      tags: ['Projects'],
      summary: 'Delete project API key',
      description:
        'Deletes an API key from the project, including keys owned by service accounts.\n\nRequires permission to write project API keys. Deleting a service-account key\ndoes not delete the service account or its other keys.\n\nReturns confirmation of the key deletion.\n',
      successDescription: 'Project API key deleted successfully.',
    })
    .input(z.object({ project_id: z.string(), api_key_id: z.string() }))
    .output(ProjectApiKeyDeleteResponseSchema),
  postOrganizationProjectsProjectIdArchive: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/archive',
      tags: ['Projects'],
      summary: 'Archive project',
      description:
        'Archives a project in the organization. Archived projects cannot be used or updated.',
      successDescription: 'Project archived successfully.',
    })
    .input(z.object({ project_id: z.string() }))
    .output(ProjectSchema),
  getOrganizationProjectsProjectIdCertificates: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/certificates',
      tags: ['Certificates'],
      summary: 'List project certificates',
      description: 'List certificates for this project.',
      successDescription: 'Certificates listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    )
    .output(ListProjectCertificatesResponseSchema),
  postOrganizationProjectsProjectIdCertificatesActivate: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/certificates/activate',
      tags: ['Certificates'],
      summary: 'Activate certificates for project',
      description:
        'Activate certificates at the project level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
      successDescription: 'Certificates activated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        certificate_ids: z
          .array(z.string().meta({ examples: ['cert_abc'] }))
          .min(1)
          .max(10),
      }),
    )
    .output(OrganizationProjectCertificateActivationResponseSchema),
  postOrganizationProjectsProjectIdCertificatesDeactivate: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/certificates/deactivate',
      tags: ['Certificates'],
      summary: 'Deactivate certificates for project',
      description:
        'Deactivate certificates at the project level. You can atomically and \nidempotently deactivate up to 10 certificates at a time.\n',
      successDescription: 'Certificates deactivated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        certificate_ids: z
          .array(z.string().meta({ examples: ['cert_abc'] }))
          .min(1)
          .max(10),
      }),
    )
    .output(OrganizationProjectCertificateDeactivationResponseSchema),
  getOrganizationProjectsProjectIdDataRetention: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/data_retention',
      tags: ['Data retention'],
      summary: 'Retrieve project data retention',
      description: 'Retrieves project data retention controls.',
      successDescription: 'Project data retention controls retrieved successfully.',
    })
    .input(z.object({ project_id: z.string() }))
    .output(ProjectDataRetentionSchema),
  postOrganizationProjectsProjectIdDataRetention: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/data_retention',
      tags: ['Data retention'],
      summary: 'Update project data retention',
      description: 'Updates project data retention controls.',
      successDescription: 'Project data retention controls updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        retention_type: z
          .enum([
            'organization_default',
            'none',
            'zero_data_retention',
            'modified_abuse_monitoring',
            'enhanced_zero_data_retention',
            'enhanced_modified_abuse_monitoring',
          ])
          .meta({ description: 'The desired project data retention type.' }),
      }),
    )
    .output(ProjectDataRetentionSchema),
  getOrganizationProjectsProjectIdGroups: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/groups',
      tags: ['Project groups'],
      summary: 'List project groups',
      description: 'Lists the groups that have access to a project.',
      successDescription: 'Project groups listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().min(0).max(100).default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(ProjectGroupListResourceSchema),
  postOrganizationProjectsProjectIdGroups: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/groups',
      tags: ['Project groups'],
      summary: 'Add project group',
      description: 'Grants a group access to a project.',
      successDescription: 'Group granted access to the project successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        group_id: z
          .string()
          .meta({ description: 'Identifier of the group to add to the project.' }),
        role: z
          .string()
          .meta({ description: 'Identifier of the project role to grant to the group.' }),
      }),
    )
    .output(ProjectGroupSchema),
  getOrganizationProjectsProjectIdGroupsGroupId: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/groups/{group_id}',
      tags: ['Project groups'],
      summary: 'Retrieve project group',
      description: "Retrieves a project's group.",
      successDescription: 'Project group retrieved successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        group_id: z.string(),
        group_type: z.enum(['group', 'tenant_group']).default('group').exactOptional(),
      }),
    )
    .output(ProjectGroupSchema),
  deleteOrganizationProjectsProjectIdGroupsGroupId: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/groups/{group_id}',
      tags: ['Project groups'],
      summary: 'Remove project group',
      description: "Revokes a group's access to a project.",
      successDescription: 'Group removed from the project successfully.',
    })
    .input(z.object({ project_id: z.string(), group_id: z.string() }))
    .output(ProjectGroupDeletedResourceSchema),
  getOrganizationProjectsProjectIdHostedToolPermissions: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/hosted_tool_permissions',
      tags: ['Hosted tools'],
      summary: 'Retrieve project hosted tool permissions',
      description: 'Returns hosted tool permissions for a project.',
      successDescription: 'Project hosted tool permissions retrieved successfully.',
    })
    .input(z.object({ project_id: z.string() }))
    .output(ProjectHostedToolPermissionsSchema),
  postOrganizationProjectsProjectIdHostedToolPermissions: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/hosted_tool_permissions',
      tags: ['Hosted tools'],
      summary: 'Modify project hosted tool permissions',
      description: 'Updates hosted tool permissions for a project.',
      successDescription: 'Project hosted tool permissions updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        file_search: z
          .union([HostedToolPermissionUpdateSchema, z.null().nullable()])
          .meta({ description: 'The file search permission update.' })
          .exactOptional(),
        web_search: z
          .union([HostedToolPermissionUpdateSchema, z.null().nullable()])
          .meta({ description: 'The web search permission update.' })
          .exactOptional(),
        image_generation: z
          .union([HostedToolPermissionUpdateSchema, z.null().nullable()])
          .meta({ description: 'The image generation permission update.' })
          .exactOptional(),
        mcp: z
          .union([HostedToolPermissionUpdateSchema, z.null().nullable()])
          .meta({ description: 'The MCP permission update.' })
          .exactOptional(),
        code_interpreter: z
          .union([HostedToolPermissionUpdateSchema, z.null().nullable()])
          .meta({ description: 'The code interpreter permission update.' })
          .exactOptional(),
      }),
    )
    .output(ProjectHostedToolPermissionsSchema),
  getOrganizationProjectsProjectIdModelPermissions: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/model_permissions',
      tags: ['Projects'],
      summary: 'Retrieve project model permissions',
      description: 'Returns model permissions for a project.',
      successDescription: 'Project model permissions retrieved successfully.',
    })
    .input(z.object({ project_id: z.string() }))
    .output(ProjectModelPermissionsSchema),
  postOrganizationProjectsProjectIdModelPermissions: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/model_permissions',
      tags: ['Projects'],
      summary: 'Modify project model permissions',
      description: 'Updates model permissions for a project.',
      successDescription: 'Project model permissions updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        mode: z
          .enum(['allow_list', 'deny_list'])
          .meta({ description: 'The model permissions mode to apply.' }),
        model_ids: z
          .array(z.string())
          .meta({ description: 'The model IDs included in this permissions policy.' }),
      }),
    )
    .output(ProjectModelPermissionsSchema),
  deleteOrganizationProjectsProjectIdModelPermissions: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/model_permissions',
      tags: ['Projects'],
      summary: 'Delete project model permissions',
      description: 'Deletes model permissions for a project.',
      successDescription: 'Project model permissions deleted successfully.',
    })
    .input(z.object({ project_id: z.string() }))
    .output(ProjectModelPermissionsDeleteResponseSchema),
  getOrganizationProjectsProjectIdRateLimits: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/rate_limits',
      tags: ['Projects'],
      summary: 'List project rate limits',
      description: 'Returns the rate limits per model for a project.',
      successDescription: 'Project rate limits listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().default(100).exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ProjectRateLimitListResponseSchema),
  postOrganizationProjectsProjectIdRateLimitsRateLimitId: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/rate_limits/{rate_limit_id}',
      tags: ['Projects'],
      summary: 'Modify project rate limit',
      description: 'Updates a project rate limit.',
      successDescription: 'Project rate limit updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        rate_limit_id: z.string(),
        max_requests_per_1_minute: z
          .int()
          .meta({ description: 'The maximum requests per minute.' })
          .exactOptional(),
        max_tokens_per_1_minute: z
          .int()
          .meta({ description: 'The maximum tokens per minute.' })
          .exactOptional(),
        max_images_per_1_minute: z
          .int()
          .meta({ description: 'The maximum images per minute. Only relevant for certain models.' })
          .exactOptional(),
        max_audio_megabytes_per_1_minute: z
          .int()
          .meta({
            description:
              'The maximum audio megabytes per minute. Only relevant for certain models.',
          })
          .exactOptional(),
        max_requests_per_1_day: z
          .int()
          .meta({ description: 'The maximum requests per day. Only relevant for certain models.' })
          .exactOptional(),
        batch_1_day_max_input_tokens: z
          .int()
          .meta({
            description:
              'The maximum batch input tokens per day. Only relevant for certain models.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectRateLimitSchema),
  getOrganizationProjectsProjectIdServiceAccounts: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/service_accounts',
      tags: ['Projects'],
      summary: 'List project service accounts',
      description: 'Returns a list of service accounts in the project.',
      successDescription: 'Project service accounts listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ProjectServiceAccountListResponseSchema),
  postOrganizationProjectsProjectIdServiceAccounts: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/service_accounts',
      tags: ['Projects'],
      summary: 'Create project service account',
      description:
        'Creates a new service account in the project. By default, this also returns an unredacted API key for the service account.',
      successDescription: 'Project service account created successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        name: z.string().meta({ description: 'The name of the service account being created.' }),
        create_service_account_only: z
          .union([
            z
              .boolean()
              .meta({
                description: 'Create the service account without default roles or an API key.',
              }),
            z.null().nullable(),
          ])
          .exactOptional(),
        expires_in_seconds: z
          .union([z.int().min(1).max(31536000), z.null().nullable()])
          .meta({
            description:
              'Number of seconds until the initial API key expires. If omitted or null, the key does not expire unless the effective organization or project policy requires an expiration. When a policy sets a maximum lifetime, this value must be provided and must not exceed that limit. A non-null value cannot be used when `create_service_account_only` is true.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectServiceAccountCreateResponseSchema),
  getOrganizationProjectsProjectIdServiceAccountsServiceAccountId: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
      tags: ['Projects'],
      summary: 'Retrieve project service account',
      description: 'Retrieves a service account in the project.',
      successDescription: 'Project service account retrieved successfully.',
    })
    .input(z.object({ project_id: z.string(), service_account_id: z.string() }))
    .output(ProjectServiceAccountSchema),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountId: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
      tags: ['Projects'],
      summary: 'Update project service account',
      description: 'Updates a service account in the project.',
      successDescription: 'Project service account updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        service_account_id: z.string(),
        name: z.string().meta({ description: 'The updated service account name.' }).exactOptional(),
        role: z
          .enum(['member', 'owner'])
          .meta({ description: 'The updated service account role.' })
          .exactOptional(),
      }),
    )
    .output(ProjectServiceAccountSchema),
  deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
      tags: ['Projects'],
      summary: 'Delete project service account',
      description:
        'Deletes a service account from the project.\n\nReturns confirmation of service account deletion, or an error if the project\nis archived (archived projects have no service accounts).\n',
      successDescription: 'Project service account deleted successfully.',
    })
    .input(z.object({ project_id: z.string(), service_account_id: z.string() }))
    .output(ProjectServiceAccountDeleteResponseSchema),
  getOrganizationProjectsProjectIdSpendAlerts: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/spend_alerts',
      tags: ['Spend alerts'],
      summary: 'List project spend alerts',
      description: 'Lists project spend alerts.',
      successDescription: 'Project spend alerts listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ProjectSpendAlertListResourceSchema),
  postOrganizationProjectsProjectIdSpendAlerts: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/spend_alerts',
      tags: ['Spend alerts'],
      summary: 'Create project spend alert',
      description: 'Creates a project spend alert.',
      successDescription: 'Project spend alert created successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        threshold_amount: z
          .int()
          .min(0)
          .meta({ description: 'The alert threshold amount, in cents.' }),
        currency: z.literal('USD').meta({ description: 'The currency for the threshold amount.' }),
        interval: z
          .literal('month')
          .meta({ description: 'The time interval for evaluating spend against the threshold.' }),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema),
  getOrganizationProjectsProjectIdSpendAlertsAlertId: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
      tags: ['Spend alerts'],
      summary: 'Retrieve project spend alert',
      description: 'Retrieves a project spend alert.',
      successDescription: 'Project spend alert retrieved successfully.',
    })
    .input(z.object({ project_id: z.string(), alert_id: z.string() }))
    .output(ProjectSpendAlertSchema),
  postOrganizationProjectsProjectIdSpendAlertsAlertId: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
      tags: ['Spend alerts'],
      summary: 'Update project spend alert',
      description: 'Updates a project spend alert.',
      successDescription: 'Project spend alert updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        alert_id: z.string(),
        threshold_amount: z
          .int()
          .min(0)
          .meta({ description: 'The alert threshold amount, in cents.' }),
        currency: z.literal('USD').meta({ description: 'The currency for the threshold amount.' }),
        interval: z
          .literal('month')
          .meta({ description: 'The time interval for evaluating spend against the threshold.' }),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema),
  deleteOrganizationProjectsProjectIdSpendAlertsAlertId: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
      tags: ['Spend alerts'],
      summary: 'Delete project spend alert',
      description: 'Deletes a project spend alert.',
      successDescription: 'Project spend alert deleted successfully.',
    })
    .input(z.object({ project_id: z.string(), alert_id: z.string() }))
    .output(ProjectSpendAlertDeletedResourceSchema),
  getOrganizationProjectsProjectIdUsers: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/users',
      tags: ['Projects'],
      summary: 'List project users',
      description: 'Returns a list of users in the project.',
      successDescription: 'Project users listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ProjectUserListResponseSchema),
  postOrganizationProjectsProjectIdUsers: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/users',
      tags: ['Projects'],
      summary: 'Create project user',
      description:
        'Adds a user to the project. Users must already be members of the organization to be added to a project.',
      successDescription: 'User added to project successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        user_id: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'The ID of the user.' })
          .exactOptional(),
        email: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'Email of the user to add.' })
          .exactOptional(),
        role: z.string().meta({ description: '`owner` or `member`' }),
      }),
    )
    .output(ProjectUserSchema),
  getOrganizationProjectsProjectIdUsersUserId: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/users/{user_id}',
      tags: ['Projects'],
      summary: 'Retrieve project user',
      description: 'Retrieves a user in the project.',
      successDescription: 'Project user retrieved successfully.',
    })
    .input(z.object({ project_id: z.string(), user_id: z.string() }))
    .output(ProjectUserSchema),
  postOrganizationProjectsProjectIdUsersUserId: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/users/{user_id}',
      tags: ['Projects'],
      summary: 'Modify project user',
      description: "Modifies a user's role in the project.",
      successDescription: "Project user's role updated successfully.",
    })
    .input(
      z.object({
        project_id: z.string(),
        user_id: z.string(),
        role: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: '`owner` or `member`' })
          .exactOptional(),
      }),
    )
    .output(ProjectUserSchema),
  deleteOrganizationProjectsProjectIdUsersUserId: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/users/{user_id}',
      tags: ['Projects'],
      summary: 'Delete project user',
      description:
        'Deletes a user from the project.\n\nReturns confirmation of project user deletion, or an error if the project is\narchived (archived projects have no users).\n',
      successDescription: 'Project user deleted successfully.',
    })
    .input(z.object({ project_id: z.string(), user_id: z.string() }))
    .output(ProjectUserDeleteResponseSchema),
  getOrganizationRoles: oc
    .route({
      method: 'GET',
      path: '/organization/roles',
      tags: ['Roles'],
      summary: 'List organization roles',
      description: 'Lists the roles configured for the organization.',
      successDescription: 'Roles listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).default(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(PublicRoleListResourceSchema),
  postOrganizationRoles: oc
    .route({
      method: 'POST',
      path: '/organization/roles',
      tags: ['Roles'],
      summary: 'Create organization role',
      description: 'Creates a custom role for the organization.',
      successDescription: 'Role created successfully.',
    })
    .input(PublicCreateOrganizationRoleBodySchema)
    .output(RoleSchema),
  getOrganizationRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/organization/roles/{role_id}',
      tags: ['Roles'],
      summary: 'Retrieve organization role',
      description: 'Retrieves an organization role.',
      successDescription: 'Role retrieved successfully.',
    })
    .input(z.object({ role_id: z.string() }))
    .output(RoleSchema),
  postOrganizationRolesRoleId: oc
    .route({
      method: 'POST',
      path: '/organization/roles/{role_id}',
      tags: ['Roles'],
      summary: 'Update organization role',
      description: 'Updates an existing organization role.',
      successDescription: 'Role updated successfully.',
    })
    .input(
      z.object({
        role_id: z.string(),
        permissions: z
          .union([z.array(z.string()), z.null().nullable()])
          .meta({ description: 'Updated set of permissions for the role.' })
          .exactOptional(),
        description: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'New description for the role.' })
          .exactOptional(),
        role_name: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'New name for the role.' })
          .exactOptional(),
      }),
    )
    .output(RoleSchema),
  deleteOrganizationRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/organization/roles/{role_id}',
      tags: ['Roles'],
      summary: 'Delete organization role',
      description: 'Deletes a custom role from the organization.',
      successDescription: 'Role deleted successfully.',
    })
    .input(z.object({ role_id: z.string() }))
    .output(RoleDeletedResourceSchema),
  getOrganizationSpendAlerts: oc
    .route({
      method: 'GET',
      path: '/organization/spend_alerts',
      tags: ['Spend alerts'],
      summary: 'List organization spend alerts',
      description: 'Lists organization spend alerts.',
      successDescription: 'Organization spend alerts listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(OrganizationSpendAlertListResourceSchema),
  postOrganizationSpendAlerts: oc
    .route({
      method: 'POST',
      path: '/organization/spend_alerts',
      tags: ['Spend alerts'],
      summary: 'Create organization spend alert',
      description: 'Creates an organization spend alert.',
      successDescription: 'Organization spend alert created successfully.',
    })
    .input(CreateSpendAlertBodySchema)
    .output(OrganizationSpendAlertSchema),
  getOrganizationSpendAlertsAlertId: oc
    .route({
      method: 'GET',
      path: '/organization/spend_alerts/{alert_id}',
      tags: ['Spend alerts'],
      summary: 'Retrieve organization spend alert',
      description: 'Retrieves an organization spend alert.',
      successDescription: 'Organization spend alert retrieved successfully.',
    })
    .input(z.object({ alert_id: z.string() }))
    .output(OrganizationSpendAlertSchema),
  postOrganizationSpendAlertsAlertId: oc
    .route({
      method: 'POST',
      path: '/organization/spend_alerts/{alert_id}',
      tags: ['Spend alerts'],
      summary: 'Update organization spend alert',
      description: 'Updates an organization spend alert.',
      successDescription: 'Organization spend alert updated successfully.',
    })
    .input(
      z.object({
        alert_id: z.string(),
        threshold_amount: z
          .int()
          .min(0)
          .meta({ description: 'The alert threshold amount, in cents.' }),
        currency: z.literal('USD').meta({ description: 'The currency for the threshold amount.' }),
        interval: z
          .literal('month')
          .meta({ description: 'The time interval for evaluating spend against the threshold.' }),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(OrganizationSpendAlertSchema),
  deleteOrganizationSpendAlertsAlertId: oc
    .route({
      method: 'DELETE',
      path: '/organization/spend_alerts/{alert_id}',
      tags: ['Spend alerts'],
      summary: 'Delete organization spend alert',
      description: 'Deletes an organization spend alert.',
      successDescription: 'Organization spend alert deleted successfully.',
    })
    .input(z.object({ alert_id: z.string() }))
    .output(OrganizationSpendAlertDeletedResourceSchema),
  getOrganizationUsageAudioSpeeches: oc
    .route({
      method: 'GET',
      path: '/organization/usage/audio_speeches',
      tags: ['Usage'],
      summary: 'Audio speeches',
      description: 'Get audio speeches usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageAudioTranscriptions: oc
    .route({
      method: 'GET',
      path: '/organization/usage/audio_transcriptions',
      tags: ['Usage'],
      summary: 'Audio transcriptions',
      description: 'Get audio transcriptions usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageCodeInterpreterSessions: oc
    .route({
      method: 'GET',
      path: '/organization/usage/code_interpreter_sessions',
      tags: ['Usage'],
      summary: 'Code interpreter sessions',
      description: 'Get code interpreter sessions usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('project_id')),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageCompletions: oc
    .route({
      method: 'GET',
      path: '/organization/usage/completions',
      tags: ['Usage'],
      summary: 'Completions',
      description: 'Get completions usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        batch: z.stringbool().exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.enum([
                'project_id',
                'user_id',
                'api_key_id',
                'model',
                'batch',
                'service_tier',
                'api_source',
              ]),
            ),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageEmbeddings: oc
    .route({
      method: 'GET',
      path: '/organization/usage/embeddings',
      tags: ['Usage'],
      summary: 'Embeddings',
      description: 'Get embeddings usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageFileSearchCalls: oc
    .route({
      method: 'GET',
      path: '/organization/usage/file_search_calls',
      tags: ['Usage'],
      summary: 'File search calls',
      description: 'Get file search calls usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        vector_store_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'vector_store_id'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageImages: oc
    .route({
      method: 'GET',
      path: '/organization/usage/images',
      tags: ['Usage'],
      summary: 'Images',
      description: 'Get images usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        sources: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['image.generation', 'image.edit', 'image.variation'])),
          )
          .exactOptional(),
        sizes: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792'])),
          )
          .exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageModerations: oc
    .route({
      method: 'GET',
      path: '/organization/usage/moderations',
      tags: ['Usage'],
      summary: 'Moderations',
      description: 'Get moderations usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageVectorStores: oc
    .route({
      method: 'GET',
      path: '/organization/usage/vector_stores',
      tags: ['Usage'],
      summary: 'Vector stores',
      description: 'Get vector stores usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('project_id')),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsageWebSearchCalls: oc
    .route({
      method: 'GET',
      path: '/organization/usage/web_search_calls',
      tags: ['Usage'],
      summary: 'Web search calls',
      description: 'Get web search calls usage details for the organization.',
      successDescription: 'Usage data retrieved successfully.',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        context_levels: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['low', 'medium', 'high'])),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.enum([
                'project_id',
                'user_id',
                'api_key_id',
                'model',
                'context_level',
                'api_source',
              ]),
            ),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema),
  getOrganizationUsers: oc
    .route({
      method: 'GET',
      path: '/organization/users',
      tags: ['Users'],
      summary: 'List users',
      description: 'Lists all of the users in the organization.',
      successDescription: 'Users listed successfully.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        emails: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
      }),
    )
    .output(UserListResponseSchema),
  getOrganizationUsersUserId: oc
    .route({
      method: 'GET',
      path: '/organization/users/{user_id}',
      tags: ['Users'],
      summary: 'Retrieve user',
      description: 'Retrieves a user by their identifier.',
      successDescription: 'User retrieved successfully.',
    })
    .input(z.object({ user_id: z.string() }))
    .output(UserSchema),
  postOrganizationUsersUserId: oc
    .route({
      method: 'POST',
      path: '/organization/users/{user_id}',
      tags: ['Users'],
      summary: 'Modify user',
      description: "Modifies a user's role in the organization.",
      successDescription: 'User role updated successfully.',
    })
    .input(
      z.object({
        user_id: z.string(),
        role: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: '`owner` or `reader`' })
          .exactOptional(),
        role_id: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'Role ID to assign to the user.' })
          .exactOptional(),
        technical_level: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'Technical level metadata.' })
          .exactOptional(),
        developer_persona: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'Developer persona metadata.' })
          .exactOptional(),
      }),
    )
    .output(UserSchema),
  deleteOrganizationUsersUserId: oc
    .route({
      method: 'DELETE',
      path: '/organization/users/{user_id}',
      tags: ['Users'],
      summary: 'Delete user',
      description: 'Deletes a user from the organization.',
      successDescription: 'User deleted successfully.',
    })
    .input(z.object({ user_id: z.string() }))
    .output(UserDeleteResponseSchema),
  getOrganizationUsersUserIdRoles: oc
    .route({
      method: 'GET',
      path: '/organization/users/{user_id}/roles',
      tags: ['User organization role assignments'],
      summary: 'List user organization role assignments',
      description: 'Lists the organization roles assigned to a user within the organization.',
      successDescription: 'User organization role assignments listed successfully.',
    })
    .input(
      z.object({
        user_id: z.string(),
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema),
  postOrganizationUsersUserIdRoles: oc
    .route({
      method: 'POST',
      path: '/organization/users/{user_id}/roles',
      tags: ['User organization role assignments'],
      summary: 'Assign organization role to user',
      description: 'Assigns an organization role to a user within the organization.',
      successDescription: 'Organization role assigned to the user successfully.',
    })
    .input(
      z.object({
        user_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(UserRoleAssignmentSchema),
  getOrganizationUsersUserIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/organization/users/{user_id}/roles/{role_id}',
      tags: ['User organization role assignments'],
      summary: 'Retrieve user organization role',
      description: 'Retrieves an organization role assigned to a user.',
      successDescription: 'Organization role retrieved for the user successfully.',
    })
    .input(z.object({ user_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema),
  deleteOrganizationUsersUserIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/organization/users/{user_id}/roles/{role_id}',
      tags: ['User organization role assignments'],
      summary: 'Unassign organization role from user',
      description: 'Unassigns an organization role from a user within the organization.',
      successDescription: 'Organization role unassigned from the user successfully.',
    })
    .input(z.object({ user_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema),
  getProjectsProjectIdGroupsGroupIdRoles: oc
    .route({
      method: 'GET',
      path: '/projects/{project_id}/groups/{group_id}/roles',
      tags: ['Project group role assignments'],
      summary: 'List project group role assignments',
      description: 'Lists the project roles assigned to a group within a project.',
      successDescription: 'Project group role assignments listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        group_id: z.string(),
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema),
  postProjectsProjectIdGroupsGroupIdRoles: oc
    .route({
      method: 'POST',
      path: '/projects/{project_id}/groups/{group_id}/roles',
      tags: ['Project group role assignments'],
      summary: 'Assign project role to group',
      description: 'Assigns a project role to a group within a project.',
      successDescription: 'Project role assigned to the group successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        group_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(GroupRoleAssignmentSchema),
  getProjectsProjectIdGroupsGroupIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
      tags: ['Project group role assignments'],
      summary: 'Retrieve project group role',
      description: 'Retrieves a project role assigned to a group.',
      successDescription: 'Project role retrieved for the group successfully.',
    })
    .input(z.object({ project_id: z.string(), group_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema),
  deleteProjectsProjectIdGroupsGroupIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
      tags: ['Project group role assignments'],
      summary: 'Unassign project role from group',
      description: 'Unassigns a project role from a group within a project.',
      successDescription: 'Project role unassigned from the group successfully.',
    })
    .input(z.object({ project_id: z.string(), group_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema),
  getProjectsProjectIdRoles: oc
    .route({
      method: 'GET',
      path: '/projects/{project_id}/roles',
      tags: ['Roles'],
      summary: 'List project roles',
      description: 'Lists the roles configured for a project.',
      successDescription: 'Project roles listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        limit: z.coerce.number().int().min(0).max(1000).default(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(PublicRoleListResourceSchema),
  postProjectsProjectIdRoles: oc
    .route({
      method: 'POST',
      path: '/projects/{project_id}/roles',
      tags: ['Roles'],
      summary: 'Create project role',
      description: 'Creates a custom role for a project.',
      successDescription: 'Project role created successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        role_name: z.string().meta({ description: 'Unique name for the role.' }),
        permissions: z.array(z.string()).meta({ description: 'Permissions to grant to the role.' }),
        description: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'Optional description of the role.' })
          .exactOptional(),
      }),
    )
    .output(RoleSchema),
  getProjectsProjectIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/projects/{project_id}/roles/{role_id}',
      tags: ['Roles'],
      summary: 'Retrieve project role',
      description: 'Retrieves a project role.',
      successDescription: 'Project role retrieved successfully.',
    })
    .input(z.object({ project_id: z.string(), role_id: z.string() }))
    .output(RoleSchema),
  postProjectsProjectIdRolesRoleId: oc
    .route({
      method: 'POST',
      path: '/projects/{project_id}/roles/{role_id}',
      tags: ['Roles'],
      summary: 'Update project role',
      description: 'Updates an existing project role.',
      successDescription: 'Project role updated successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        role_id: z.string(),
        permissions: z
          .union([z.array(z.string()), z.null().nullable()])
          .meta({ description: 'Updated set of permissions for the role.' })
          .exactOptional(),
        description: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'New description for the role.' })
          .exactOptional(),
        role_name: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'New name for the role.' })
          .exactOptional(),
      }),
    )
    .output(RoleSchema),
  deleteProjectsProjectIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/projects/{project_id}/roles/{role_id}',
      tags: ['Roles'],
      summary: 'Delete project role',
      description: 'Deletes a custom role from a project.',
      successDescription: 'Project role deleted successfully.',
    })
    .input(z.object({ project_id: z.string(), role_id: z.string() }))
    .output(RoleDeletedResourceSchema),
  getProjectsProjectIdUsersUserIdRoles: oc
    .route({
      method: 'GET',
      path: '/projects/{project_id}/users/{user_id}/roles',
      tags: ['Project user role assignments'],
      summary: 'List project user role assignments',
      description: 'Lists the project roles assigned to a user within a project.',
      successDescription: 'Project user role assignments listed successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        user_id: z.string(),
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema),
  postProjectsProjectIdUsersUserIdRoles: oc
    .route({
      method: 'POST',
      path: '/projects/{project_id}/users/{user_id}/roles',
      tags: ['Project user role assignments'],
      summary: 'Assign project role to user',
      description: 'Assigns a project role to a user within a project.',
      successDescription: 'Project role assigned to the user successfully.',
    })
    .input(
      z.object({
        project_id: z.string(),
        user_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(UserRoleAssignmentSchema),
  getProjectsProjectIdUsersUserIdRolesRoleId: oc
    .route({
      method: 'GET',
      path: '/projects/{project_id}/users/{user_id}/roles/{role_id}',
      tags: ['Project user role assignments'],
      summary: 'Retrieve project user role',
      description: 'Retrieves a project role assigned to a user.',
      successDescription: 'Project role retrieved for the user successfully.',
    })
    .input(z.object({ project_id: z.string(), user_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema),
  deleteProjectsProjectIdUsersUserIdRolesRoleId: oc
    .route({
      method: 'DELETE',
      path: '/projects/{project_id}/users/{user_id}/roles/{role_id}',
      tags: ['Project user role assignments'],
      summary: 'Unassign project role from user',
      description: 'Unassigns a project role from a user within a project.',
      successDescription: 'Project role unassigned from the user successfully.',
    })
    .input(z.object({ project_id: z.string(), user_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema),
  postRealtimeCalls: oc.route({
    method: 'POST',
    path: '/realtime/calls',
    tags: ['Realtime'],
    summary: 'Create call',
    description:
      'Create a new Realtime API call over WebRTC and receive the SDP answer needed\nto complete the peer connection.',
    successStatus: 201,
    successDescription: 'Realtime call created successfully.',
  }),
  postRealtimeCallsCallIdAccept: oc
    .route({
      method: 'POST',
      path: '/realtime/calls/{call_id}/accept',
      tags: ['Realtime'],
      summary: 'Accept call',
      description:
        'Accept an incoming SIP call and configure the realtime session that will\nhandle it.',
      successDescription: 'Call accepted successfully.',
    })
    .input(
      z.object({
        call_id: z.string(),
        type: z
          .literal('realtime')
          .meta({
            description: 'The type of session to create. Always `realtime` for the Realtime API.\n',
          }),
        output_modalities: z
          .array(z.enum(['text', 'audio']))
          .default(['audio'])
          .meta({
            description:
              'The set of modalities the model can respond with. It defaults to `["audio"]`, indicating\nthat the model will respond with audio plus a transcript. `["text"]` can be used to make\nthe model respond with text only. It is not possible to request both `text` and `audio` at the same time.\n',
          })
          .exactOptional(),
        model: z
          .union([
            z.string(),
            z.enum([
              'gpt-realtime',
              'gpt-realtime-1.5',
              'gpt-realtime-2',
              'gpt-realtime-2.1',
              'gpt-realtime-2.1-mini',
              'gpt-realtime-2025-08-28',
              'gpt-4o-realtime-preview',
              'gpt-4o-realtime-preview-2024-10-01',
              'gpt-4o-realtime-preview-2024-12-17',
              'gpt-4o-realtime-preview-2025-06-03',
              'gpt-4o-mini-realtime-preview',
              'gpt-4o-mini-realtime-preview-2024-12-17',
              'gpt-realtime-mini',
              'gpt-realtime-mini-2025-10-06',
              'gpt-realtime-mini-2025-12-15',
              'gpt-audio-1.5',
              'gpt-audio-mini',
              'gpt-audio-mini-2025-10-06',
              'gpt-audio-mini-2025-12-15',
            ]),
          ])
          .meta({
            description: 'The Realtime model used for this session.\n',
            examples: ['gpt-realtime-2.1'],
          })
          .exactOptional(),
        instructions: z
          .string()
          .meta({
            description:
              'The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.\n\nNote that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.\n',
          })
          .exactOptional(),
        audio: z
          .object({
            input: z
              .object({
                format: RealtimeAudioFormatsSchema.meta({
                  description: 'The format of the input audio.',
                }).exactOptional(),
                transcription: AudioTranscriptionSchema.meta({
                  description:
                    'Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.\n',
                }).exactOptional(),
                noise_reduction: z
                  .any()
                  .refine(
                    (val) =>
                      !Array.isArray(val) &&
                      typeof val !== 'string' &&
                      typeof val !== 'number' &&
                      typeof val !== 'boolean',
                  )
                  .meta({
                    description:
                      'When you supply a `noise_reduction` object, you must set `type` to `near_field` or `far_field`.\nSet `noise_reduction` to `null` to turn off input audio noise reduction.\nNoise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.\nFiltering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.\n',
                  })
                  .exactOptional(),
                turn_detection: RealtimeTurnDetectionSchema.exactOptional(),
              })
              .exactOptional(),
            output: z
              .object({
                format: RealtimeAudioFormatsSchema.meta({
                  description: 'The format of the output audio.',
                }).exactOptional(),
                voice: VoiceIdsOrCustomVoiceSchema.default('alloy')
                  .meta({
                    description:
                      'The voice the model uses to respond. Supported built-in voices are\n`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`,\n`marin`, and `cedar`. You may also provide a custom voice object with\nan `id`, for example `{ "id": "voice_1234" }`. Voice cannot be changed\nduring the session once the model has responded with audio at least once.\nCustom voices must be created from audio samples. Voices created from text prompts are supported only in Live.\nWe recommend `marin` and `cedar` for best quality.\n',
                  })
                  .exactOptional(),
                speed: z
                  .number()
                  .min(0.25)
                  .max(1.5)
                  .default(1)
                  .meta({
                    description:
                      "The speed of the model's spoken response as a multiple of the original speed.\n1.0 is the default speed. 0.25 is the minimum speed. 1.5 is the maximum speed. This value can only be changed in between model turns, not while a response is in progress.\n\nThis parameter is a post-processing adjustment to the audio after it is generated, it's\nalso possible to prompt the model to speak faster or slower.\n",
                  })
                  .exactOptional(),
              })
              .exactOptional(),
          })
          .meta({ description: 'Configuration for input and output audio.\n' })
          .exactOptional(),
        include: z
          .array(z.literal('item.input_audio_transcription.logprobs'))
          .meta({
            description:
              'Additional fields to include in server outputs.\n\n`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.\n',
          })
          .exactOptional(),
        tracing: z
          .xor([
            z
              .literal('auto')
              .default('auto')
              .meta({
                description:
                  'Enables tracing and sets default values for tracing configuration options. Always `auto`.\n',
              }),
            z
              .object({
                workflow_name: z
                  .string()
                  .meta({
                    description:
                      'The name of the workflow to attach to this trace. This is used to\nname the trace in the Traces Dashboard.\n',
                  })
                  .exactOptional(),
                group_id: z
                  .string()
                  .meta({
                    description:
                      'The group id to attach to this trace to enable filtering and\ngrouping in the Traces Dashboard.\n',
                  })
                  .exactOptional(),
                metadata: z
                  .object({})
                  .meta({
                    description:
                      'The arbitrary metadata to attach to this trace to enable\nfiltering in the Traces Dashboard.\n',
                  })
                  .exactOptional(),
              })
              .meta({ description: 'Granular configuration for tracing.\n' }),
            z.null().nullable(),
          ])
          .meta({
            description:
              'Realtime API can write session traces to the [Traces Dashboard](https://platform.openai.com/logs?api=traces). Set to null to disable tracing. Once\ntracing is enabled for a session, the configuration cannot be modified.\n\n`auto` will create a trace for the session with default values for the\nworkflow name, group id, and metadata.\n',
          })
          .exactOptional(),
        tools: z
          .array(z.xor([RealtimeFunctionToolSchema, MCPToolSchema]))
          .meta({ description: 'Tools available to the model.' })
          .exactOptional(),
        tool_choice: z
          .xor([ToolChoiceOptionsSchema, ToolChoiceFunctionSchema, ToolChoiceMCPSchema])
          .default('auto')
          .meta({
            description:
              'How the model chooses tools. Provide one of the string modes or force a specific\nfunction/MCP tool.\n',
          })
          .exactOptional(),
        parallel_tool_calls: z
          .boolean()
          .meta({
            description:
              'Whether the model may call multiple tools in parallel. Only supported by\nreasoning Realtime models such as `gpt-realtime-2`.\n',
          })
          .exactOptional(),
        reasoning: RealtimeReasoningSchema.exactOptional(),
        max_output_tokens: z
          .xor([z.int(), z.literal('inf')])
          .meta({
            description:
              'Maximum number of output tokens for a single assistant response,\ninclusive of tool calls. Provide an integer between 1 and 4096 to\nlimit output tokens, or `inf` for the maximum available tokens for a\ngiven model. Defaults to `inf`.\n',
          })
          .exactOptional(),
        truncation: RealtimeTruncationSchema.exactOptional(),
        prompt: PromptSchema.exactOptional(),
      }),
    ),
  postRealtimeCallsCallIdHangup: oc
    .route({
      method: 'POST',
      path: '/realtime/calls/{call_id}/hangup',
      tags: ['Realtime'],
      summary: 'Hang up call',
      description: 'End an active Realtime API call, whether it was initiated over SIP or\nWebRTC.',
      successDescription: 'Call hangup initiated successfully.',
    })
    .input(z.object({ call_id: z.string() })),
  postRealtimeCallsCallIdRefer: oc
    .route({
      method: 'POST',
      path: '/realtime/calls/{call_id}/refer',
      tags: ['Realtime'],
      summary: 'Refer call',
      description: 'Transfer an active SIP call to a new destination using the SIP REFER verb.',
      successDescription: 'Call referred successfully.',
    })
    .input(
      z.object({
        call_id: z.string(),
        target_uri: z
          .string()
          .meta({
            description:
              'URI that should appear in the SIP Refer-To header. Supports values like\n`tel:+14155550123` or `sip:agent@example.com`.',
            examples: ['tel:+14155550123'],
          }),
      }),
    ),
  postRealtimeCallsCallIdReject: oc
    .route({
      method: 'POST',
      path: '/realtime/calls/{call_id}/reject',
      tags: ['Realtime'],
      summary: 'Reject call',
      description: 'Decline an incoming SIP call by returning a SIP status code to the caller.',
      successDescription: 'Call rejected successfully.',
    })
    .input(
      z.object({
        call_id: z.string(),
        status_code: z
          .int()
          .meta({
            description:
              'SIP response code to send back to the caller. Defaults to `603` (Decline)\nwhen omitted.',
            examples: [486],
          })
          .exactOptional(),
      }),
    ),
  postRealtimeClientSecrets: oc
    .route({
      method: 'POST',
      path: '/realtime/client_secrets',
      tags: ['Realtime'],
      summary: 'Create client secret',
      description:
        'Create a Realtime client secret with an associated session configuration.\n\nClient secrets are short-lived tokens that can be passed to a client app,\nsuch as a web frontend or mobile client, which grants access to the Realtime API without\nleaking your main API key. You can configure a custom TTL for each client secret.\n\nYou can also attach session configuration options to the client secret, which will be\napplied to any sessions created using that client secret, but these can also be overridden\nby the client connection.\n\n[Learn more about authentication with client secrets over WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc).\n\nReturns the created client secret and the effective session object. The client secret is a string that looks like `ek_1234`.\n',
      successDescription: 'Client secret created successfully.',
    })
    .input(RealtimeCreateClientSecretRequestSchema)
    .output(RealtimeCreateClientSecretResponseSchema),
  postRealtimeSessions: oc
    .route({
      method: 'POST',
      path: '/realtime/sessions',
      tags: ['Realtime'],
      summary: 'Create session',
      description:
        'Create an ephemeral API token for use in client-side applications with the\nRealtime API. Can be configured with the same session parameters as the\n`session.update` client event.\n\nIt responds with a session object, plus a `client_secret` key which contains\na usable ephemeral API token that can be used to authenticate browser clients\nfor the Realtime API.\n\nReturns the created Realtime session object, plus an ephemeral key.\n',
      successDescription: 'Session created successfully.',
    })
    .input(RealtimeSessionCreateRequestSchema)
    .output(RealtimeSessionCreateResponseSchema),
  postRealtimeTranscriptionSessions: oc
    .route({
      method: 'POST',
      path: '/realtime/transcription_sessions',
      tags: ['Realtime'],
      summary: 'Create transcription session',
      description:
        'Create an ephemeral API token for use in client-side applications with the\nRealtime API specifically for realtime transcriptions. \nCan be configured with the same session parameters as the `transcription_session.update` client event.\n\nIt responds with a session object, plus a `client_secret` key which contains\na usable ephemeral API token that can be used to authenticate browser clients\nfor the Realtime API.\n\nReturns the created Realtime transcription session object, plus an ephemeral key.\n',
      successDescription: 'Session created successfully.',
    })
    .input(RealtimeTranscriptionSessionCreateRequestSchema)
    .output(RealtimeTranscriptionSessionCreateResponseSchema),
  postRealtimeTranslationsClientSecrets: oc
    .route({
      method: 'POST',
      path: '/realtime/translations/client_secrets',
      tags: ['Realtime'],
      summary: 'Create translation client secret',
      description:
        'Create a Realtime translation client secret with an associated translation session configuration.\n\nClient secrets are short-lived tokens that can be passed to a client app,\nsuch as a web frontend or mobile client, which grants access to the Realtime\nTranslation API without leaking your main API key. You can configure a custom\nTTL for each client secret.\n\nReturns the created client secret and the effective translation session object.\nThe client secret is a string that looks like `ek_1234`.\n',
      successDescription: 'Translation client secret created successfully.',
    })
    .input(RealtimeTranslationClientSecretCreateRequestSchema)
    .output(RealtimeTranslationClientSecretCreateResponseSchema),
  postResponses: oc
    .route({
      method: 'POST',
      path: '/responses',
      tags: ['Responses'],
      summary: 'Create a model response',
      description:
        "Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or\n[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)\nor [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call\nyour own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in\n[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)\nor [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data\nas input for the model's response.\n",
    })
    .input(CreateResponseSchema)
    .output(ResponseSchema),
  getResponsesResponseId: oc
    .route({
      method: 'GET',
      path: '/responses/{response_id}',
      tags: ['Responses'],
      summary: 'Get a model response',
      description: 'Retrieves a model response with the given ID.\n',
    })
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
        stream: z.stringbool().exactOptional(),
        starting_after: z.coerce.number().int().exactOptional(),
        include_obfuscation: z.stringbool().exactOptional(),
      }),
    )
    .output(ResponseSchema),
  deleteResponsesResponseId: oc
    .route({
      method: 'DELETE',
      path: '/responses/{response_id}',
      tags: ['Responses'],
      summary: 'Delete a model response',
      description: 'Deletes a model response with the given ID.\n',
    })
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(
      z.object({
        object: z.literal('response.deleted').default('response.deleted'),
        deleted: z.boolean(),
        id: z.string(),
      }),
    ),
  postResponsesResponseIdCancel: oc
    .route({
      method: 'POST',
      path: '/responses/{response_id}/cancel',
      tags: ['Responses'],
      summary: 'Cancel a response',
      description:
        'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
    })
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(ResponseSchema),
  getResponsesResponseIdInputItems: oc
    .route({
      method: 'GET',
      path: '/responses/{response_id}/input_items',
      tags: ['Responses'],
      summary: 'List input items',
      description: 'Returns a list of input items for a given response.',
    })
    .input(
      z.object({
        response_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    )
    .output(ResponseItemListSchema),
  postThreads: oc
    .route({
      method: 'POST',
      path: '/threads',
      tags: ['Assistants'],
      summary: 'Create thread',
      description: 'Create a thread.',
    })
    .input(CreateThreadRequestSchema)
    .output(ThreadObjectSchema),
  postThreadsRuns: oc
    .route({
      method: 'POST',
      path: '/threads/runs',
      tags: ['Assistants'],
      summary: 'Create thread and run',
      description: 'Create a thread and run it in one request.',
    })
    .input(CreateThreadAndRunRequestSchema)
    .output(RunObjectSchema),
  getThreadsThreadId: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}',
      tags: ['Assistants'],
      summary: 'Retrieve thread',
      description: 'Retrieves a thread.',
    })
    .input(z.object({ thread_id: z.string() }))
    .output(ThreadObjectSchema),
  postThreadsThreadId: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}',
      tags: ['Assistants'],
      summary: 'Modify thread',
      description: 'Modifies a thread.',
    })
    .input(
      z.object({
        thread_id: z.string(),
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
                          'A list of [file](https://developers.openai.com/api/reference/resources/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.\n',
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
                          'The [vector store](https://developers.openai.com/api/reference/resources/vector_stores) attached to this thread. There can be a maximum of 1 vector store attached to the thread.\n',
                      })
                      .exactOptional(),
                  })
                  .exactOptional(),
              })
              .meta({
                description:
                  "A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.\n",
              }),
            z.null().nullable(),
          ])
          .exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(ThreadObjectSchema),
  deleteThreadsThreadId: oc
    .route({
      method: 'DELETE',
      path: '/threads/{thread_id}',
      tags: ['Assistants'],
      summary: 'Delete thread',
      description: 'Delete a thread.',
    })
    .input(z.object({ thread_id: z.string() }))
    .output(DeleteThreadResponseSchema),
  getThreadsThreadIdMessages: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}/messages',
      tags: ['Assistants'],
      summary: 'List messages',
      description: 'Returns a list of messages for a given thread.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        run_id: z.string().exactOptional(),
      }),
    )
    .output(ListMessagesResponseSchema),
  postThreadsThreadIdMessages: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}/messages',
      tags: ['Assistants'],
      summary: 'Create message',
      description: 'Create a message.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        role: z
          .enum(['user', 'assistant'])
          .meta({
            description:
              'The role of the entity that is creating the message. Allowed values include:\n- `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.\n- `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.\n',
          }),
        content: z.xor([
          z.string().meta({ description: 'The text contents of the message.' }),
          z
            .array(
              z.xor([
                MessageContentImageFileObjectSchema,
                MessageContentImageUrlObjectSchema,
                MessageRequestContentTextObjectSchema,
              ]),
            )
            .min(1)
            .meta({
              description:
                'An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://developers.openai.com/api/docs/models).',
            }),
        ]),
        attachments: z
          .union([
            z
              .array(
                z.object({
                  file_id: z
                    .string()
                    .meta({ description: 'The ID of the file to attach to the message.' })
                    .exactOptional(),
                  tools: z
                    .array(
                      z.xor([AssistantToolsCodeSchema, AssistantToolsFileSearchTypeOnlySchema]),
                    )
                    .meta({ description: 'The tools to add this file to.' })
                    .exactOptional(),
                }),
              )
              .meta({
                description:
                  'A list of files attached to the message, and the tools they should be added to.',
              }),
            z.null().nullable(),
          ])
          .exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(MessageObjectSchema),
  getThreadsThreadIdMessagesMessageId: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}/messages/{message_id}',
      tags: ['Assistants'],
      summary: 'Retrieve message',
      description: 'Retrieve a message.',
    })
    .input(z.object({ thread_id: z.string(), message_id: z.string() }))
    .output(MessageObjectSchema),
  postThreadsThreadIdMessagesMessageId: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}/messages/{message_id}',
      tags: ['Assistants'],
      summary: 'Modify message',
      description: 'Modifies a message.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        message_id: z.string(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(MessageObjectSchema),
  deleteThreadsThreadIdMessagesMessageId: oc
    .route({
      method: 'DELETE',
      path: '/threads/{thread_id}/messages/{message_id}',
      tags: ['Assistants'],
      summary: 'Delete message',
      description: 'Deletes a message.',
    })
    .input(z.object({ thread_id: z.string(), message_id: z.string() }))
    .output(DeleteMessageResponseSchema),
  getThreadsThreadIdRuns: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}/runs',
      tags: ['Assistants'],
      summary: 'List runs',
      description: 'Returns a list of runs belonging to a thread.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ListRunsResponseSchema),
  postThreadsThreadIdRuns: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}/runs',
      tags: ['Assistants'],
      summary: 'Create run',
      description: 'Create a run.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        'include[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
          )
          .exactOptional(),
        assistant_id: z
          .string()
          .meta({
            description:
              'The ID of the [assistant](https://developers.openai.com/api/docs/assistants/migration) to use to execute this run.',
          }),
        model: z
          .union([z.string(), AssistantSupportedModelsSchema, z.null().nullable()])
          .meta({
            description:
              'The ID of the [Model](https://developers.openai.com/api/reference/resources/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.',
            examples: ['gpt-4.1'],
          })
          .exactOptional(),
        reasoning_effort: ReasoningEffortSchema.exactOptional(),
        instructions: z
          .string()
          .nullable()
          .meta({
            description:
              'Overrides the [instructions](https://developers.openai.com/api/docs/assistants/migration) of the assistant. This is useful for modifying the behavior on a per-run basis.',
          })
          .exactOptional(),
        additional_instructions: z
          .string()
          .nullable()
          .meta({
            description:
              'Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.',
          })
          .exactOptional(),
        additional_messages: z
          .array(CreateMessageRequestSchema)
          .nullable()
          .meta({ description: 'Adds additional messages to the thread before creating the run.' })
          .exactOptional(),
        tools: z
          .array(
            z.xor([
              AssistantToolsCodeSchema,
              AssistantToolsFileSearchSchema,
              AssistantToolsFunctionSchema,
            ]),
          )
          .max(20)
          .nullable()
          .meta({
            description:
              'Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.',
          })
          .exactOptional(),
        metadata: MetadataSchema.exactOptional(),
        temperature: z
          .number()
          .min(0)
          .max(2)
          .nullable()
          .default(1)
          .meta({
            description:
              'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n',
            examples: [1],
          })
          .exactOptional(),
        top_p: z
          .number()
          .min(0)
          .max(1)
          .nullable()
          .default(1)
          .meta({
            description:
              'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.\n',
            examples: [1],
          })
          .exactOptional(),
        stream: z
          .boolean()
          .nullable()
          .meta({
            description:
              'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
          })
          .exactOptional(),
        max_prompt_tokens: z
          .int()
          .min(256)
          .nullable()
          .meta({
            description:
              'The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
          })
          .exactOptional(),
        max_completion_tokens: z
          .int()
          .min(256)
          .nullable()
          .meta({
            description:
              'The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.\n',
          })
          .exactOptional(),
        truncation_strategy: TruncationObjectSchema.nullable().exactOptional(),
        tool_choice: AssistantsApiToolChoiceOptionSchema.nullable().exactOptional(),
        parallel_tool_calls: ParallelToolCallsSchema.exactOptional(),
        response_format: AssistantsApiResponseFormatOptionSchema.exactOptional(),
      }),
    )
    .output(RunObjectSchema),
  getThreadsThreadIdRunsRunId: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}/runs/{run_id}',
      tags: ['Assistants'],
      summary: 'Retrieve run',
      description: 'Retrieves a run.',
    })
    .input(z.object({ thread_id: z.string(), run_id: z.string() }))
    .output(RunObjectSchema),
  postThreadsThreadIdRunsRunId: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}/runs/{run_id}',
      tags: ['Assistants'],
      summary: 'Modify run',
      description: 'Modifies a run.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        run_id: z.string(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(RunObjectSchema),
  postThreadsThreadIdRunsRunIdCancel: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}/runs/{run_id}/cancel',
      tags: ['Assistants'],
      summary: 'Cancel a run',
      description: 'Cancels a run that is `in_progress`.',
    })
    .input(z.object({ thread_id: z.string(), run_id: z.string() }))
    .output(RunObjectSchema),
  getThreadsThreadIdRunsRunIdSteps: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}/runs/{run_id}/steps',
      tags: ['Assistants'],
      summary: 'List run steps',
      description: 'Returns a list of run steps belonging to a run.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        run_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        'include[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
          )
          .exactOptional(),
      }),
    )
    .output(ListRunStepsResponseSchema),
  getThreadsThreadIdRunsRunIdStepsStepId: oc
    .route({
      method: 'GET',
      path: '/threads/{thread_id}/runs/{run_id}/steps/{step_id}',
      tags: ['Assistants'],
      summary: 'Retrieve run step',
      description: 'Retrieves a run step.',
    })
    .input(
      z.object({
        thread_id: z.string(),
        run_id: z.string(),
        step_id: z.string(),
        'include[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
          )
          .exactOptional(),
      }),
    )
    .output(RunStepObjectSchema),
  postThreadsThreadIdRunsRunIdSubmitToolOutputs: oc
    .route({
      method: 'POST',
      path: '/threads/{thread_id}/runs/{run_id}/submit_tool_outputs',
      tags: ['Assistants'],
      summary: 'Submit tool outputs to run',
      description:
        'When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they\'re all completed. All outputs must be submitted in a single request.\n',
    })
    .input(
      z.object({
        thread_id: z.string(),
        run_id: z.string(),
        tool_outputs: z
          .array(
            z.object({
              tool_call_id: z
                .string()
                .meta({
                  description:
                    'The ID of the tool call in the `required_action` object within the run object the output is being submitted for.',
                })
                .exactOptional(),
              output: z
                .string()
                .meta({
                  description: 'The output of the tool call to be submitted to continue the run.',
                })
                .exactOptional(),
            }),
          )
          .meta({ description: 'A list of tools for which the outputs are being submitted.' }),
        stream: z
          .union([
            z
              .boolean()
              .meta({
                description:
                  'If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.\n',
              }),
            z.null().nullable(),
          ])
          .exactOptional(),
      }),
    )
    .output(RunObjectSchema),
  postUploads: oc
    .route({
      method: 'POST',
      path: '/uploads',
      tags: ['Uploads'],
      summary: 'Create upload',
      description:
        'Creates an intermediate [Upload](https://developers.openai.com/api/reference/resources/uploads) object\nthat you can add [Parts](https://developers.openai.com/api/reference/resources/uploads/subresources/parts) to.\nCurrently, an Upload can accept at most 8 GB in total and expires after an\nhour after you create it.\n\nOnce you complete the Upload, we will create a\n[File](https://developers.openai.com/api/reference/resources/files) object that contains all the parts\nyou uploaded. This File is usable in the rest of our platform as a regular\nFile object.\n\nFor certain `purpose` values, the correct `mime_type` must be specified.\nPlease refer to documentation for the\n[supported MIME types for your use case](https://developers.openai.com/api/docs/guides/tools-file-search#supported-files).\n\nFor guidance on the proper filename extensions for each purpose, please\nfollow the documentation on [creating a\nFile](https://developers.openai.com/api/reference/resources/files/methods/create).\n\nReturns the Upload object with status `pending`.\n',
    })
    .input(CreateUploadRequestSchema)
    .output(UploadSchema),
  postUploadsUploadIdCancel: oc
    .route({
      method: 'POST',
      path: '/uploads/{upload_id}/cancel',
      tags: ['Uploads'],
      summary: 'Cancel upload',
      description:
        'Cancels the Upload. No Parts may be added after an Upload is cancelled.\n\nReturns the Upload object with status `cancelled`.\n',
    })
    .input(z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) }))
    .output(UploadSchema),
  postUploadsUploadIdComplete: oc
    .route({
      method: 'POST',
      path: '/uploads/{upload_id}/complete',
      tags: ['Uploads'],
      summary: 'Complete upload',
      description:
        'Completes the [Upload](https://developers.openai.com/api/reference/resources/uploads).\n\nWithin the returned Upload object, there is a nested [File](https://developers.openai.com/api/reference/resources/files) object that is ready to use in the rest of the platform.\n\nYou can specify the order of the Parts by passing in an ordered list of the Part IDs.\n\nThe number of bytes uploaded upon completion must match the number of bytes initially specified when creating the Upload object. No Parts may be added after an Upload is completed.\nReturns the Upload object with status `completed`, including an additional `file` property containing the created usable File object.\n',
    })
    .input(
      z.object({
        upload_id: z.string().meta({ examples: ['upload_abc123'] }),
        part_ids: z.array(z.string()).meta({ description: 'The ordered list of Part IDs.\n' }),
        md5: z
          .string()
          .meta({
            description:
              'The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.\n',
          })
          .exactOptional(),
      }),
    )
    .output(UploadSchema),
  postUploadsUploadIdParts: oc
    .route({
      method: 'POST',
      path: '/uploads/{upload_id}/parts',
      tags: ['Uploads'],
      summary: 'Add upload part',
      description:
        'Adds a [Part](https://developers.openai.com/api/reference/resources/uploads/subresources/parts) to an [Upload](https://developers.openai.com/api/reference/resources/uploads) object. A Part represents a chunk of bytes from the file you are trying to upload.\n\nEach Part can be at most 64 MB, and you can add Parts until you hit the Upload maximum of 8 GB.\n\nIt is possible to add multiple Parts in parallel. You can decide the intended order of the Parts when you [complete the Upload](https://developers.openai.com/api/reference/resources/uploads/methods/complete).\n',
    })
    .input(z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) }))
    .output(UploadPartSchema),
  getVectorStores: oc
    .route({
      method: 'GET',
      path: '/vector_stores',
      tags: ['Vector stores'],
      summary: 'List vector stores',
      description: 'Returns a list of vector stores.',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ListVectorStoresResponseSchema),
  postVectorStores: oc
    .route({
      method: 'POST',
      path: '/vector_stores',
      tags: ['Vector stores'],
      summary: 'Create vector store',
      description: 'Create a vector store.',
    })
    .input(CreateVectorStoreRequestSchema)
    .output(VectorStoreObjectSchema),
  getVectorStoresVectorStoreId: oc
    .route({
      method: 'GET',
      path: '/vector_stores/{vector_store_id}',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store',
      description: 'Retrieves a vector store.',
    })
    .input(z.object({ vector_store_id: z.string() }))
    .output(VectorStoreObjectSchema),
  postVectorStoresVectorStoreId: oc
    .route({
      method: 'POST',
      path: '/vector_stores/{vector_store_id}',
      tags: ['Vector stores'],
      summary: 'Modify vector store',
      description: 'Modifies a vector store.',
    })
    .input(
      z.object({
        vector_store_id: z.string(),
        name: z
          .string()
          .nullable()
          .meta({ description: 'The name of the vector store.' })
          .exactOptional(),
        expires_after: VectorStoreExpirationAfterSchema.nullable().exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(VectorStoreObjectSchema),
  deleteVectorStoresVectorStoreId: oc
    .route({
      method: 'DELETE',
      path: '/vector_stores/{vector_store_id}',
      tags: ['Vector stores'],
      summary: 'Delete vector store',
      description: 'Delete a vector store.',
    })
    .input(z.object({ vector_store_id: z.string() }))
    .output(DeleteVectorStoreResponseSchema),
  postVectorStoresVectorStoreIdFileBatches: oc
    .route({
      method: 'POST',
      path: '/vector_stores/{vector_store_id}/file_batches',
      tags: ['Vector stores'],
      summary: 'Create vector store file batch',
      description: 'Create a vector store file batch.',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_ids: z
          .array(z.string())
          .min(1)
          .max(2000)
          .meta({
            description:
              'A list of [File](https://developers.openai.com/api/reference/resources/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files. If `attributes` or `chunking_strategy` are provided, they will be applied to all files in the batch. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `files`.',
          })
          .exactOptional(),
        files: z
          .array(CreateVectorStoreFileRequestSchema)
          .min(1)
          .max(2000)
          .meta({
            description:
              'A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. This endpoint is recommended for multi-file ingestion and helps reduce per-vector-store write request pressure. Mutually exclusive with `file_ids`.',
          })
          .exactOptional(),
        chunking_strategy: ChunkingStrategyRequestParamSchema.exactOptional(),
        attributes: VectorStoreFileAttributesSchema.exactOptional(),
      }),
    )
    .output(VectorStoreFileBatchObjectSchema),
  getVectorStoresVectorStoreIdFileBatchesBatchId: oc
    .route({
      method: 'GET',
      path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file batch',
      description: 'Retrieves a vector store file batch.',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        batch_id: z.string().meta({ examples: ['vsfb_abc123'] }),
      }),
    )
    .output(VectorStoreFileBatchObjectSchema),
  postVectorStoresVectorStoreIdFileBatchesBatchIdCancel: oc
    .route({
      method: 'POST',
      path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel',
      tags: ['Vector stores'],
      summary: 'Cancel vector store file batch',
      description:
        'Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.',
    })
    .input(z.object({ vector_store_id: z.string(), batch_id: z.string() }))
    .output(VectorStoreFileBatchObjectSchema),
  getVectorStoresVectorStoreIdFileBatchesBatchIdFiles: oc
    .route({
      method: 'GET',
      path: '/vector_stores/{vector_store_id}/file_batches/{batch_id}/files',
      tags: ['Vector stores'],
      summary: 'List vector store files in a batch',
      description: 'Returns a list of vector store files in a batch.',
    })
    .input(
      z.object({
        vector_store_id: z.string(),
        batch_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).exactOptional(),
      }),
    )
    .output(ListVectorStoreFilesResponseSchema),
  getVectorStoresVectorStoreIdFiles: oc
    .route({
      method: 'GET',
      path: '/vector_stores/{vector_store_id}/files',
      tags: ['Vector stores'],
      summary: 'List vector store files',
      description: 'Returns a list of vector store files.',
    })
    .input(
      z.object({
        vector_store_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        filter: z.enum(['in_progress', 'completed', 'failed', 'cancelled']).exactOptional(),
      }),
    )
    .output(ListVectorStoreFilesResponseSchema),
  postVectorStoresVectorStoreIdFiles: oc
    .route({
      method: 'POST',
      path: '/vector_stores/{vector_store_id}/files',
      tags: ['Vector stores'],
      summary: 'Create vector store file',
      description:
        'Create a vector store file by attaching a [File](https://developers.openai.com/api/reference/resources/files) to a [vector store](https://developers.openai.com/api/reference/resources/vector_stores).',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z
          .string()
          .meta({
            description:
              'A [File](https://developers.openai.com/api/reference/resources/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. For multi-file ingestion, we recommend [`file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create) to minimize per-vector-store write requests.',
          }),
        chunking_strategy: ChunkingStrategyRequestParamSchema.exactOptional(),
        attributes: VectorStoreFileAttributesSchema.exactOptional(),
      }),
    )
    .output(VectorStoreFileObjectSchema),
  getVectorStoresVectorStoreIdFilesFileId: oc
    .route({
      method: 'GET',
      path: '/vector_stores/{vector_store_id}/files/{file_id}',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file',
      description: 'Retrieves a vector store file.',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    )
    .output(VectorStoreFileObjectSchema),
  postVectorStoresVectorStoreIdFilesFileId: oc
    .route({
      method: 'POST',
      path: '/vector_stores/{vector_store_id}/files/{file_id}',
      tags: ['Vector stores'],
      summary: 'Update vector store file attributes',
      description: 'Update attributes on a vector store file.',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
        attributes: VectorStoreFileAttributesSchema,
      }),
    )
    .output(VectorStoreFileObjectSchema),
  deleteVectorStoresVectorStoreIdFilesFileId: oc
    .route({
      method: 'DELETE',
      path: '/vector_stores/{vector_store_id}/files/{file_id}',
      tags: ['Vector stores'],
      summary: 'Delete vector store file',
      description:
        'Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://developers.openai.com/api/reference/resources/files/methods/delete) endpoint.',
    })
    .input(z.object({ vector_store_id: z.string(), file_id: z.string() }))
    .output(DeleteVectorStoreFileResponseSchema),
  getVectorStoresVectorStoreIdFilesFileIdContent: oc
    .route({
      method: 'GET',
      path: '/vector_stores/{vector_store_id}/files/{file_id}/content',
      tags: ['Vector stores'],
      summary: 'Retrieve vector store file content',
      description: 'Retrieve the parsed contents of a vector store file.',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        file_id: z.string().meta({ examples: ['file-abc123'] }),
      }),
    )
    .output(VectorStoreFileContentResponseSchema),
  postVectorStoresVectorStoreIdSearch: oc
    .route({
      method: 'POST',
      path: '/vector_stores/{vector_store_id}/search',
      tags: ['Vector stores'],
      summary: 'Search vector store',
      description:
        'Search a vector store for relevant chunks based on a query and file attributes filter.',
    })
    .input(
      z.object({
        vector_store_id: z.string().meta({ examples: ['vs_abc123'] }),
        query: z
          .xor([
            z.string(),
            z.array(z.string().meta({ description: 'A list of queries to search for.' })),
          ])
          .meta({ description: 'A query string for a search' }),
        rewrite_query: z
          .boolean()
          .default(false)
          .meta({ description: 'Whether to rewrite the natural language query for vector search.' })
          .exactOptional(),
        max_num_results: z
          .int()
          .min(1)
          .max(50)
          .default(10)
          .meta({
            description:
              'The maximum number of results to return. This number should be between 1 and 50 inclusive.',
          })
          .exactOptional(),
        filters: z
          .xor([ComparisonFilterSchema, CompoundFilterSchema])
          .meta({ description: 'A filter to apply based on file attributes.' })
          .exactOptional(),
        ranking_options: z
          .strictObject({
            ranker: z
              .enum(['none', 'auto', 'default-2024-11-15'])
              .default('auto')
              .meta({
                description:
                  'Enable re-ranking; set to `none` to disable, which can help reduce latency.',
              })
              .exactOptional(),
            score_threshold: z.number().min(0).max(1).default(0).exactOptional(),
          })
          .meta({ description: 'Ranking options for search.' })
          .exactOptional(),
      }),
    )
    .output(VectorStoreSearchResultsPageSchema),
  postConversations: oc
    .route({
      method: 'POST',
      path: '/conversations',
      tags: ['Conversations'],
      summary: 'Create a conversation',
      description: 'Create a conversation.',
      successDescription: 'Success',
    })
    .input(CreateConversationBodySchema)
    .output(ConversationResourceSchema),
  getConversationsConversationId: oc
    .route({
      method: 'GET',
      path: '/conversations/{conversation_id}',
      tags: ['Conversations'],
      summary: 'Retrieve a conversation',
      description: 'Get a conversation',
      successDescription: 'Success',
    })
    .input(z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) }))
    .output(ConversationResourceSchema),
  postConversationsConversationId: oc
    .route({
      method: 'POST',
      path: '/conversations/{conversation_id}',
      tags: ['Conversations'],
      summary: 'Update a conversation',
      description: 'Update a conversation',
      successDescription: 'Success',
    })
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        metadata: MetadataSchema,
      }),
    )
    .output(ConversationResourceSchema),
  deleteConversationsConversationId: oc
    .route({
      method: 'DELETE',
      path: '/conversations/{conversation_id}',
      tags: ['Conversations'],
      summary: 'Delete a conversation',
      description: 'Delete a conversation. Items in the conversation will not be deleted.',
      successDescription: 'Success',
    })
    .input(z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) }))
    .output(DeletedConversationResourceSchema),
  getSafetyCasesId: oc
    .route({
      method: 'GET',
      path: '/safety/cases/{id}',
      summary: 'Get safety case',
      description: 'Get a safety case by ID.',
      successDescription: 'Success',
    })
    .input(z.object({ id: z.string().max(128).meta({ description: 'Safety case ID' }) }))
    .output(SafetyCaseResourceSchema),
  getSafetyAlertsId: oc
    .route({
      method: 'GET',
      path: '/safety/alerts/{id}',
      summary: 'Get project safety alert',
      description: 'Get a safety alert belonging to the authenticated API project.',
      successDescription: 'Success',
    })
    .input(z.object({ id: z.string().max(38).meta({ description: 'Project safety alert ID' }) }))
    .output(SafetyAlertResourceSchema),
  getOrganizationExternalKeys: oc
    .route({
      method: 'GET',
      path: '/organization/external_keys',
      summary: "List the external key configs registered on the user's organization",
      description: "List the external key configs registered on the user's organization",
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .union([
            z.string(),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        purpose: ExternalKeyPurposeSchema.exactOptional(),
      }),
    )
    .output(ListExternalKeysResourceSchema),
  postOrganizationExternalKeys: oc
    .route({
      method: 'POST',
      path: '/organization/external_keys',
      summary: 'Add an external key config for an organization',
      description: 'Add an external key config for an organization',
      successDescription: 'Success',
    })
    .input(V1OrganizationExternalKeysPostRequestSchema)
    .output(ExternalKeyResourceSchema),
  getOrganizationExternalKeysExternalKeyId: oc
    .route({
      method: 'GET',
      path: '/organization/external_keys/{external_key_id}',
      summary: 'Retrieve an external key registration',
      description: "Retrieve a stored external key registration for the user's organization.",
      successDescription: 'Success',
    })
    .input(z.object({ external_key_id: z.string() }))
    .output(ExternalKeyResourceSchema),
  deleteOrganizationExternalKeysExternalKeyId: oc
    .route({
      method: 'DELETE',
      path: '/organization/external_keys/{external_key_id}',
      summary: "Delete an external key config for the user's organization",
      description: "Delete an external key config for the user's organization",
      successDescription: 'Success',
    })
    .input(z.object({ external_key_id: z.string() }))
    .output(ExternalKeyResourceSchema),
  postOrganizationExternalKeysExternalKeyIdValidate: oc
    .route({
      method: 'POST',
      path: '/organization/external_keys/{external_key_id}/validate',
      summary: "Validate an external key config for the user's organization",
      description: "Validate an external key config for the user's organization",
      successDescription: 'Success',
    })
    .input(z.object({ external_key_id: z.string() }))
    .output(ValidateExternalKeyResourceSchema),
  getLiveSessionsSessionIdContent: oc
    .route({
      method: 'GET',
      path: '/live/sessions/{session_id}/content',
      tags: ['Live'],
      summary: 'Download recording',
      description: 'Get Live session content',
      successDescription:
        'Stored session recording. Input audio is in the left channel and output audio is in the right channel.',
    })
    .input(
      z.object({
        session_id: z
          .string()
          .regex(/^live_[A-Za-z0-9_-]{1,128}$/)
          .meta({
            description:
              'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
          }),
      }),
    ),
  getOrganizationWorkloadIdentityProviders: oc
    .route({
      method: 'GET',
      path: '/organization/workload_identity_providers',
      summary: 'List Platform workload identity providers',
      description: "List OIDC providers in the authenticated Admin API key's organization.",
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        order: z
          .union([z.literal('asc').default('asc'), z.literal('desc').default('desc')])
          .exactOptional(),
        after: z.string().min(1).exactOptional(),
      }),
    )
    .output(PlatformProviderListResourceSchema),
  postOrganizationWorkloadIdentityProviders: oc
    .route({
      method: 'POST',
      path: '/organization/workload_identity_providers',
      summary: 'Create Platform workload identity provider',
      description: 'Register an OIDC provider for keyless project service-account authentication.',
      successDescription: 'Success',
    })
    .input(CreatePlatformWorkloadIdentityProviderBodySchema)
    .output(PlatformProviderSchema),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: oc
    .route({
      method: 'GET',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
      summary: 'Retrieve Platform workload identity provider',
      description: 'Retrieve an OIDC provider in the authenticated organization.',
      successDescription: 'Success',
    })
    .input(z.object({ workload_identity_provider_id: z.string().min(1) }))
    .output(PlatformProviderSchema),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: oc
    .route({
      method: 'POST',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
      summary: 'Update Platform workload identity provider',
      description: 'Update supplied provider fields, preserving omitted fields.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        workload_identity_provider_id: z.string().min(1),
        name: z.string().min(1).exactOptional(),
        issuer: z.string().min(1).exactOptional(),
        audience: z.string().min(1).exactOptional(),
        verification: z
          .xor([DiscoveryVerificationParamSchema, UploadedJwksVerificationParamSchema])
          .exactOptional(),
        description: z.union([z.string(), z.null().nullable()]).exactOptional(),
        attribute_transformations: z.array(TransformationParamSchema).max(20).exactOptional(),
        enabled: z.boolean().exactOptional(),
      }),
    )
    .output(PlatformProviderSchema),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: oc
    .route({
      method: 'DELETE',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
      summary: 'Delete Platform workload identity provider',
      description: 'Delete a provider after deleting all its federation rules.',
      successDescription: 'Success',
    })
    .input(z.object({ workload_identity_provider_id: z.string().min(1) }))
    .output(PlatformProviderDeletedResourceSchema),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: oc
    .route({
      method: 'GET',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
      summary: 'List Platform workload identity federation rules',
      description: "List the provider's federation rules to project service accounts.",
      successDescription: 'Success',
    })
    .input(
      z.object({
        workload_identity_provider_id: z.string().min(1),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        order: z
          .union([z.literal('asc').default('asc'), z.literal('desc').default('desc')])
          .exactOptional(),
        after: z.string().min(1).exactOptional(),
        service_account_id: z.string().min(1).exactOptional(),
      }),
    )
    .output(PlatformFederationRuleListResourceSchema),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: oc
    .route({
      method: 'POST',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
      summary: 'Create Platform workload identity federation rule',
      description: 'Bind verified token attributes to an existing project service account.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        workload_identity_provider_id: z.string().min(1),
        project_id: z.string().min(1),
        service_account_id: z.string().min(1),
        name: z.string().exactOptional(),
        description: z.string().exactOptional(),
        attribute_matchers: z.record(
          z.string(),
          z.xor([z.string(), z.boolean(), z.union([z.int(), z.number()])]),
        ),
        permissions: z
          .xor([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema])
          .exactOptional(),
        enabled: z.boolean().exactOptional(),
      }),
    )
    .output(PlatformFederationRuleSchema),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    oc
      .route({
        method: 'GET',
        path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
        summary: 'Retrieve Platform workload identity federation rule',
        description:
          'Retrieve a federation rule owned by the authenticated organization and provider.',
        successDescription: 'Success',
      })
      .input(
        z.object({
          workload_identity_provider_id: z.string().min(1),
          workload_identity_federation_rule_id: z.string().min(1),
        }),
      )
      .output(PlatformFederationRuleSchema),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    oc
      .route({
        method: 'POST',
        path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
        summary: 'Update Platform workload identity federation rule',
        description: 'Update supplied matcher, permission, metadata, or enabled fields.',
        successDescription: 'Success',
      })
      .input(
        z.object({
          workload_identity_provider_id: z.string().min(1),
          workload_identity_federation_rule_id: z.string().min(1),
          name: z.union([z.string(), z.null().nullable()]).exactOptional(),
          description: z.union([z.string(), z.null().nullable()]).exactOptional(),
          attribute_matchers: z
            .record(z.string(), z.xor([z.string(), z.boolean(), z.union([z.int(), z.number()])]))
            .exactOptional(),
          permissions: z
            .xor([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema])
            .exactOptional(),
          enabled: z.boolean().exactOptional(),
        }),
      )
      .output(PlatformFederationRuleSchema),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    oc
      .route({
        method: 'DELETE',
        path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
        summary: 'Delete Platform workload identity federation rule',
        description: 'Delete a federation rule to a project service account.',
        successDescription: 'Success',
      })
      .input(
        z.object({
          workload_identity_provider_id: z.string().min(1),
          workload_identity_federation_rule_id: z.string().min(1),
        }),
      )
      .output(PlatformFederationRuleDeletedResourceSchema),
  getOrganizationUsageDecisions: oc
    .route({
      method: 'GET',
      path: '/organization/usage/decisions',
      summary: 'Decisions',
      description: 'Get Decisions API usage details for the organization.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.coerce.number().int(),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        bucket_width: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([DecisionsUsageBucketWidthSchema])
                  .meta({
                    description:
                      'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        limit: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.coerce.number().int(),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        page: z
          .union([
            z
              .string()
              .meta({
                description:
                  'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
              }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these projects.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(DecisionsUsageGroupBySchema),
                    ),
                  ])
                  .meta({
                    description:
                      'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these users.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these API keys.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these models.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        batch: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.stringbool(),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
      }),
    )
    .output(PublicDecisionsUsageResponseResourceSchema),
  getOrganizationExternalStorage: oc
    .route({
      method: 'GET',
      path: '/organization/external_storage',
      summary: 'List external storage configurations',
      description: "List the organization's customer-managed external storage configurations.",
      successDescription: 'Success',
    })
    .input(
      z.object({
        project_id: z
          .union([
            z.string().meta({ examples: ['proj_123'] }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        after: z
          .union([
            z
              .string()
              .meta({ description: 'Return external storage configurations after this ID.' }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        order: ExternalStorageOrderSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
    )
    .output(ExternalStorageListResourceSchema),
  postOrganizationExternalStorage: oc
    .route({
      method: 'POST',
      path: '/organization/external_storage',
      summary: 'Create an external storage configuration',
      description: 'Register one customer-managed external storage configuration.',
      successDescription: 'Success',
    })
    .input(CreateExternalStorageBodySchema)
    .output(ExternalStorageResponseSchema),
  getOrganizationExternalStorageExternalStorageId: oc
    .route({
      method: 'GET',
      path: '/organization/external_storage/{external_storage_id}',
      summary: 'Get an external storage configuration',
      description: 'Get one customer-managed external storage configuration.',
      successDescription: 'Success',
    })
    .input(z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }))
    .output(ExternalStorageResponseSchema),
  deleteOrganizationExternalStorageExternalStorageId: oc
    .route({
      method: 'DELETE',
      path: '/organization/external_storage/{external_storage_id}',
      summary: 'Delete an external storage configuration',
      description:
        "Disconnect a customer-managed external storage configuration. Removing the project's last configuration restores organization-default retention if customer-managed retention was active. Repeating a deletion also completes any interrupted retention update. Cloud storage is unchanged.",
      successDescription: 'Success',
    })
    .input(z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }))
    .output(ExternalStorageDeletedResourceSchema),
  postOrganizationExternalStorageExternalStorageIdValidate: oc
    .route({
      method: 'POST',
      path: '/organization/external_storage/{external_storage_id}/validate',
      summary: 'Validate an external storage configuration',
      description: 'Validate one customer-managed external storage configuration.',
      successDescription: 'Success',
    })
    .input(z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }))
    .output(ExternalStorageResponseSchema),
  getOrganizationSpendLimit: oc
    .route({
      method: 'GET',
      path: '/organization/spend_limit',
      summary: 'Get organization spend limit',
      description: "Get the organization's hard spend limit.",
      successDescription: 'Hard spend limit retrieved successfully.',
    })
    .output(OrganizationSpendLimitResourceSchema),
  postOrganizationSpendLimit: oc
    .route({
      method: 'POST',
      path: '/organization/spend_limit',
      summary: 'Update organization spend limit',
      description: "Create or replace the organization's hard spend limit.",
      successDescription: 'Hard spend limit created or replaced successfully.',
    })
    .input(UpdateOrganizationSpendLimitBodySchema)
    .output(OrganizationSpendLimitResourceSchema),
  deleteOrganizationSpendLimit: oc
    .route({
      method: 'DELETE',
      path: '/organization/spend_limit',
      summary: 'Delete organization spend limit',
      description: "Delete the organization's hard spend limit.",
      successDescription: 'Hard spend limit deleted successfully.',
    })
    .output(OrganizationSpendLimitDeletedResourceSchema),
  getOrganizationProjectsProjectIdSpendLimit: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/spend_limit',
      summary: 'Get project spend limit',
      description: "Get a project's hard spend limit.",
      successDescription: 'Hard spend limit retrieved successfully.',
    })
    .input(z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) }))
    .output(ProjectSpendLimitResourceSchema),
  postOrganizationProjectsProjectIdSpendLimit: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/spend_limit',
      summary: 'Update project spend limit',
      description: "Create or replace a project's hard spend limit.",
      successDescription: 'Hard spend limit created or replaced successfully.',
    })
    .input(
      z.object({
        project_id: z.string().meta({ examples: ['proj_123'] }),
        threshold_amount: z
          .int()
          .min(1)
          .meta({ description: 'The hard spend limit amount, in cents.' }),
        currency: z
          .literal('USD')
          .meta({
            description:
              'The currency for the threshold amount. Currently, only `USD` is supported.',
          }),
        interval: z
          .literal('month')
          .meta({
            description:
              'The time interval for evaluating spend against the threshold. Currently, only `month` is supported.',
          }),
        notification_channel: z
          .union([
            SpendLimitEmailNotificationChannelParamsSchema.meta({
              description:
                'Configure email notifications when the spend limit is reached. Leave this out to keep the current settings, or send null to reset to owner-only notifications.',
            }),
            z.null().nullable(),
          ])
          .exactOptional(),
      }),
    )
    .output(ProjectSpendLimitResourceSchema),
  deleteOrganizationProjectsProjectIdSpendLimit: oc
    .route({
      method: 'DELETE',
      path: '/organization/projects/{project_id}/spend_limit',
      summary: 'Delete project spend limit',
      description: "Delete a project's hard spend limit.",
      successDescription: 'Hard spend limit deleted successfully.',
    })
    .input(z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) }))
    .output(ProjectSpendLimitDeletedResourceSchema),
  getOrganizationProjectsProjectIdServiceTierSettings: oc
    .route({
      method: 'GET',
      path: '/organization/projects/{project_id}/service_tier_settings',
      summary: 'Retrieve project service tier settings',
      description: 'Retrieve the configured default and enabled service tiers for a project.',
      successDescription: 'Success',
    })
    .input(z.object({ project_id: z.string().meta({ description: 'The ID of the project' }) }))
    .output(ProjectServiceTierSettingsResourceSchema),
  postOrganizationProjectsProjectIdServiceTierSettings: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/service_tier_settings',
      summary: 'Update project service tier settings',
      description:
        'Update the default or enabled service tiers atomically. Supply at least one field. Omitted fields keep their current values.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        project_id: z.string().meta({ description: 'The ID of the project' }),
        default: ProjectDefaultServiceTierSchema.exactOptional(),
        enabled_tiers: z
          .xor([z.literal('all').default('all'), z.array(ProjectOptionalServiceTierSchema)])
          .meta({
            description:
              'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectServiceTierSettingsResourceSchema),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys: oc
    .route({
      method: 'POST',
      path: '/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys',
      summary: 'Create an API key for a service account',
      description: 'Creates an API key for a service account in the project.',
      successDescription: 'Service account API key created successfully.',
    })
    .input(
      z.object({
        project_id: z.string().meta({ description: 'The ID of the project.' }),
        service_account_id: z.string().meta({ description: 'The ID of the service account.' }),
        name: z.string().meta({ description: 'API key name.' }).exactOptional(),
        scopes: z
          .array(z.string().meta({ description: 'API key scope.' }))
          .meta({ description: 'API key scopes.' })
          .exactOptional(),
        expires_in_seconds: z
          .union([
            z
              .int()
              .min(1)
              .max(31536000)
              .meta({ description: 'Number of seconds until the API key expires.' }),
            z.null().nullable(),
          ])
          .exactOptional(),
      }),
    )
    .output(ServiceAccountApiKeyBodySchema),
  postContentProvenanceChecks: oc
    .route({
      method: 'POST',
      path: '/content_provenance_checks',
      summary: 'Create content provenance check',
      description:
        "Check whether an image or audio file contains known OpenAI provenance signals. [Learn more about content provenance](https://developers.openai.com/api/docs/guides/content-provenance).\n\nIf `not_detected`, it means the tool did not find supported signals in the uploaded file. The content could still have been generated by OpenAI if the metadata was stripped or has evidence of tampering, the watermark was degraded, it comes from a legacy generation model, or it was created before provenance signals were available. Content could also still be AI-generated by another company's model, which the tool currently does not detect.",
      successDescription: 'Success',
    })
    .output(ProvenanceResourceSchema),
  getVideos: oc
    .route({
      method: 'GET',
      path: '/videos',
      tags: ['Videos'],
      summary: 'List videos',
      description: 'List recently generated videos for the current project.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
      }),
    )
    .output(VideoListResourceSchema),
  postVideos: oc
    .route({
      method: 'POST',
      path: '/videos',
      tags: ['Videos'],
      summary: 'Create a video',
      description: 'Create a new video generation job from a prompt and optional reference assets.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(CreateVideoJsonBodySchema)
    .output(VideoResourceSchema),
  postVideosCharacters: oc
    .route({
      method: 'POST',
      path: '/videos/characters',
      tags: ['Videos'],
      summary: 'Create a character',
      description: 'Create a character from an uploaded video.',
      deprecated: true,
      successDescription: 'Success',
    })
    .output(VideoCharacterResourceSchema),
  getVideosCharactersCharacterId: oc
    .route({
      method: 'GET',
      path: '/videos/characters/{character_id}',
      tags: ['Videos'],
      summary: 'Retrieve a character',
      description: 'Fetch a character.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(z.object({ character_id: z.string().meta({ examples: ['char_123'] }) }))
    .output(VideoCharacterResourceSchema),
  postVideosEdits: oc
    .route({
      method: 'POST',
      path: '/videos/edits',
      tags: ['Videos'],
      summary: 'Create a video edit',
      description:
        'Create a new video generation job by editing a source video or existing generated video.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(CreateVideoEditJsonBodySchema)
    .output(VideoResourceSchema),
  postVideosExtensions: oc
    .route({
      method: 'POST',
      path: '/videos/extensions',
      tags: ['Videos'],
      summary: 'Create a video extension',
      description: 'Create an extension of a completed video.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(CreateVideoExtendJsonBodySchema)
    .output(VideoResourceSchema),
  getVideosVideoId: oc
    .route({
      method: 'GET',
      path: '/videos/{video_id}',
      tags: ['Videos'],
      summary: 'Retrieve a video',
      description: 'Fetch the latest metadata for a generated video.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(z.object({ video_id: z.string().meta({ examples: ['video_123'] }) }))
    .output(VideoResourceSchema),
  deleteVideosVideoId: oc
    .route({
      method: 'DELETE',
      path: '/videos/{video_id}',
      tags: ['Videos'],
      summary: 'Delete a video',
      description: 'Permanently delete a completed or failed video and its stored assets.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(z.object({ video_id: z.string().meta({ examples: ['video_123'] }) }))
    .output(DeletedVideoResourceSchema),
  getVideosVideoIdContent: oc
    .route({
      method: 'GET',
      path: '/videos/{video_id}/content',
      tags: ['Videos'],
      summary: 'Download video content',
      description:
        'Download the generated video bytes or a derived preview asset.\n\nStreams the rendered video content for the specified video job.',
      deprecated: true,
      successDescription: 'The video bytes or preview asset that matches the requested variant.',
    })
    .input(
      z.object({
        video_id: z.string().meta({ examples: ['video_123'] }),
        variant: VideoContentVariantSchema.exactOptional(),
      }),
    )
    .output(z.string()),
  postVideosVideoIdRemix: oc
    .route({
      method: 'POST',
      path: '/videos/{video_id}/remix',
      tags: ['Videos'],
      summary: 'Create a video remix',
      description: 'Create a remix of a completed video using a refreshed prompt.',
      deprecated: true,
      successDescription: 'Success',
    })
    .input(
      z.object({
        video_id: z.string().meta({ examples: ['video_123'] }),
        prompt: z
          .string()
          .min(1)
          .max(32000)
          .meta({ description: 'Updated text prompt that directs the remix generation.' }),
      }),
    )
    .output(VideoResourceSchema),
  postResponsesInputTokens: oc
    .route({
      method: 'POST',
      path: '/responses/input_tokens',
      tags: ['Responses'],
      summary: 'Get input token counts',
      description:
        'Returns input token counts of the request.\n\nReturns an object with `object` set to `response.input_tokens` and an `input_tokens` count.',
      successDescription: 'Success',
    })
    .input(TokenCountsBodySchema)
    .output(TokenCountsResourceSchema),
  postResponsesCompact: oc
    .route({
      method: 'POST',
      path: '/responses/compact',
      tags: ['Responses'],
      summary: 'Compact conversation',
      description:
        'Compact a conversation. Returns a compacted response object.\n\nLearn when and how to compact long-running conversations in the [conversation state guide](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window). For ZDR-compatible compaction details, see [Compaction (advanced)](https://developers.openai.com/api/docs/guides/conversation-state#compaction-advanced).',
      successDescription: 'Success',
    })
    .input(CompactResponseMethodPublicBodySchema)
    .output(CompactResourceSchema),
  getSkills: oc
    .route({
      method: 'GET',
      path: '/skills',
      tags: ['Skills'],
      summary: 'List Skills',
      description: 'List all skills for the current project.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
      }),
    )
    .output(SkillListResourceSchema),
  postSkills: oc
    .route({
      method: 'POST',
      path: '/skills',
      tags: ['Skills'],
      summary: 'Create Skill',
      description: 'Create a new skill.',
      successDescription: 'Success',
    })
    .input(CreateSkillBodySchema)
    .output(SkillResourceSchema),
  getSkillsSkillId: oc
    .route({
      method: 'GET',
      path: '/skills/{skill_id}',
      tags: ['Skills'],
      summary: 'Get Skill',
      description: 'Get a skill by its ID.',
      successDescription: 'Success',
    })
    .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
    .output(SkillResourceSchema),
  postSkillsSkillId: oc
    .route({
      method: 'POST',
      path: '/skills/{skill_id}',
      tags: ['Skills'],
      summary: 'Update Skill Default Version',
      description: 'Update the default version pointer for a skill.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        default_version: z
          .string()
          .meta({ description: 'The skill version number to set as default.' }),
      }),
    )
    .output(SkillResourceSchema),
  deleteSkillsSkillId: oc
    .route({
      method: 'DELETE',
      path: '/skills/{skill_id}',
      tags: ['Skills'],
      summary: 'Delete Skill',
      description: 'Delete a skill by its ID.',
      successDescription: 'Success',
    })
    .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
    .output(DeletedSkillResourceSchema),
  getSkillsSkillIdContent: oc
    .route({
      method: 'GET',
      path: '/skills/{skill_id}/content',
      tags: ['Skills'],
      summary: 'Get Skill Content',
      description: 'Download a skill zip bundle by its ID.',
      successDescription: 'The skill zip bundle.',
    })
    .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
    .output(z.string()),
  getSkillsSkillIdVersions: oc
    .route({
      method: 'GET',
      path: '/skills/{skill_id}/versions',
      tags: ['Skills'],
      summary: 'List Skill Versions',
      description: 'List skill versions for a skill.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({ examples: ['skillver_123'] })
          .exactOptional(),
      }),
    )
    .output(SkillVersionListResourceSchema),
  postSkillsSkillIdVersions: oc
    .route({
      method: 'POST',
      path: '/skills/{skill_id}/versions',
      tags: ['Skills'],
      summary: 'Create Skill Version',
      description: 'Create a new immutable skill version.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        files: z.xor([
          z
            .array(z.file())
            .max(500)
            .meta({
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
          z.file().meta({ description: 'Skill zip file to upload.' }),
        ]),
        default: z
          .boolean()
          .meta({ description: 'Whether to set this version as the default.' })
          .exactOptional(),
      }),
    )
    .output(SkillVersionResourceSchema),
  getSkillsSkillIdVersionsVersion: oc
    .route({
      method: 'GET',
      path: '/skills/{skill_id}/versions/{version}',
      tags: ['Skills'],
      summary: 'Get Skill Version',
      description: 'Get a specific skill version.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The version number to retrieve.' }),
      }),
    )
    .output(SkillVersionResourceSchema),
  deleteSkillsSkillIdVersionsVersion: oc
    .route({
      method: 'DELETE',
      path: '/skills/{skill_id}/versions/{version}',
      tags: ['Skills'],
      summary: 'Delete Skill Version',
      description: 'Delete a skill version.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    )
    .output(DeletedSkillVersionResourceSchema),
  getSkillsSkillIdVersionsVersionContent: oc
    .route({
      method: 'GET',
      path: '/skills/{skill_id}/versions/{version}/content',
      tags: ['Skills'],
      summary: 'Get Skill Version Content',
      description: 'Download a skill version zip bundle.',
      successDescription: 'The skill zip bundle.',
    })
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    )
    .output(z.string()),
  postChatkitSessionsSessionIdCancel: oc
    .route({
      method: 'POST',
      path: '/chatkit/sessions/{session_id}/cancel',
      summary: 'Cancel a ChatKit session',
      description:
        'Cancel an active ChatKit session and return its most recent metadata.\n\nCancelling prevents new requests from using the issued client secret.',
      successDescription: 'Success',
    })
    .input(z.object({ session_id: z.string().meta({ examples: ['cksess_123'] }) }))
    .output(ChatSessionResourceSchema),
  postChatkitSessions: oc
    .route({
      method: 'POST',
      path: '/chatkit/sessions',
      summary: 'Create a ChatKit session',
      description: 'Create a ChatKit session.',
      successDescription: 'Success',
    })
    .input(CreateChatSessionBodySchema)
    .output(ChatSessionResourceSchema),
  getChatkitThreadsThreadIdItems: oc
    .route({
      method: 'GET',
      path: '/chatkit/threads/{thread_id}/items',
      summary: 'List ChatKit thread items',
      description: 'List items that belong to a ChatKit thread.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        thread_id: z.string().meta({ examples: ['cthr_123'] }),
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          })
          .exactOptional(),
        before: z
          .string()
          .meta({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          })
          .exactOptional(),
      }),
    )
    .output(ThreadItemListResourceSchema),
  getChatkitThreadsThreadId: oc
    .route({
      method: 'GET',
      path: '/chatkit/threads/{thread_id}',
      summary: 'Retrieve a ChatKit thread',
      description: 'Retrieve a ChatKit thread by its identifier.',
      successDescription: 'Success',
    })
    .input(z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) }))
    .output(ThreadResourceSchema),
  deleteChatkitThreadsThreadId: oc
    .route({
      method: 'DELETE',
      path: '/chatkit/threads/{thread_id}',
      summary: 'Delete a ChatKit thread',
      description: 'Delete a ChatKit thread along with its items and stored attachments.',
      successDescription: 'Success',
    })
    .input(z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) }))
    .output(DeletedThreadResourceSchema),
  getChatkitThreads: oc
    .route({
      method: 'GET',
      path: '/chatkit/threads',
      summary: 'List ChatKit threads',
      description: 'List ChatKit threads with optional pagination and user filters.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          })
          .exactOptional(),
        before: z
          .string()
          .meta({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          })
          .exactOptional(),
        user: z
          .string()
          .min(1)
          .max(512)
          .meta({
            description:
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
          })
          .exactOptional(),
      }),
    )
    .output(ThreadListResourceSchema),
  postDecisions: oc
    .route({
      method: 'POST',
      path: '/decisions',
      tags: ['Decisions'],
      summary: 'Create a decision',
      description:
        'Use this endpoint to quickly answer classification or scoring questions about some input. You can ask multiple questions in one request.',
      successDescription: 'The answers and token usage.',
    })
    .input(DecisionRequestSchema)
    .output(DecisionResponseSchema),
  getAgentsAutomations: oc
    .route({
      method: 'GET',
      path: '/agents/automations',
      tags: ['Agents'],
      summary: 'List automations',
      description: 'Lists project-owned automations, optionally filtered by target session.',
      successDescription: 'The automations.',
    })
    .input(
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        session_id: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      z
        .strictObject({
          object: z
            .literal('list')
            .default('list')
            .meta({ description: 'The object type, which is always `list`.' }),
          data: z
            .array(AutomationResourceSchema)
            .min(0)
            .max(2000)
            .meta({
              description: 'The resources returned in this page, in the requested sort order.',
            }),
          first_id: z
            .string()
            .min(0)
            .nullable()
            .meta({
              description:
                'The ID of the first resource in `data`, or `null` if the page is empty.',
            }),
          last_id: z
            .string()
            .min(0)
            .nullable()
            .meta({
              description:
                'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
            }),
          has_more: z
            .boolean()
            .meta({ description: 'Whether there are more resources to retrieve after this page.' }),
        })
        .meta({
          description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
        }),
    ),
  postAgentsAutomations: oc
    .route({
      method: 'POST',
      path: '/agents/automations',
      tags: ['Agents'],
      summary: 'Create an automation',
      description: 'Saves an active automation without invoking it immediately.',
      successStatus: 201,
      successDescription: 'The created automation.',
    })
    .input(CreateAutomationParamsSchema)
    .output(AutomationResourceSchema),
  getAgentsAutomationsAutomationId: oc
    .route({
      method: 'GET',
      path: '/agents/automations/{automation_id}',
      tags: ['Agents'],
      summary: 'Get an automation',
      description: 'Retrieves a project-owned automation.',
      successDescription: 'Successful response.',
    })
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationResourceSchema),
  postAgentsAutomationsAutomationId: oc
    .route({
      method: 'POST',
      path: '/agents/automations/{automation_id}',
      tags: ['Agents'],
      summary: 'Update an automation',
      description: 'Updates supplied fields; target and metadata replace the whole field.',
      successDescription: 'Successful response.',
    })
    .input(
      z.object({
        automation_id: z.string().min(0).max(1048576),
        name: z.string().min(1).max(256).exactOptional(),
        target: AutomationTargetParamSchema.exactOptional(),
        metadata: z
          .record(z.string(), z.string().min(0).max(512))
          .meta({ description: 'Replaces all metadata; omit to leave unchanged.' })
          .exactOptional(),
        expression: z
          .string()
          .min(1)
          .max(256)
          .meta({ description: 'Only accepted for periodic automations.' })
          .exactOptional(),
        timezone: z
          .string()
          .min(1)
          .max(128)
          .meta({ description: 'Only accepted for periodic automations.' })
          .exactOptional(),
        run_at: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64())
          .meta({
            description:
              'A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.',
          })
          .exactOptional(),
      }),
    )
    .output(AutomationResourceSchema),
  deleteAgentsAutomationsAutomationId: oc
    .route({
      method: 'DELETE',
      path: '/agents/automations/{automation_id}',
      tags: ['Agents'],
      summary: 'Delete an automation',
      description:
        'Deletes the automation and prevents future invocations without deleting its target session.',
      successDescription: 'Successful response.',
    })
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(DeletedAutomationResourceSchema),
  postAgentsAutomationsAutomationIdPause: oc
    .route({
      method: 'POST',
      path: '/agents/automations/{automation_id}/pause',
      tags: ['Agents'],
      summary: 'Pause an automation',
      description: 'Pauses future scheduled delivery without stopping an active session.',
      successDescription: 'Successful response.',
    })
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationResourceSchema),
  postAgentsAutomationsAutomationIdResume: oc
    .route({
      method: 'POST',
      path: '/agents/automations/{automation_id}/resume',
      tags: ['Agents'],
      summary: 'Resume an automation',
      description:
        'Resumes scheduled delivery; one-time automations without a pending invocation require a future run_at.',
      successDescription: 'Successful response.',
    })
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationResourceSchema),
  getAgentsAutomationsAutomationIdInvocations: oc
    .route({
      method: 'GET',
      path: '/agents/automations/{automation_id}/invocations',
      tags: ['Agents'],
      summary: 'List automation invocations',
      description: 'Lists delivery records for a project-owned automation.',
      successDescription: 'The invocation history.',
    })
    .input(
      z.object({
        automation_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      z
        .strictObject({
          object: z
            .literal('list')
            .default('list')
            .meta({ description: 'The object type, which is always `list`.' }),
          data: z
            .array(AutomationInvocationResourceSchema)
            .min(0)
            .max(2000)
            .meta({
              description: 'The resources returned in this page, in the requested sort order.',
            }),
          first_id: z
            .string()
            .min(0)
            .nullable()
            .meta({
              description:
                'The ID of the first resource in `data`, or `null` if the page is empty.',
            }),
          last_id: z
            .string()
            .min(0)
            .nullable()
            .meta({
              description:
                'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
            }),
          has_more: z
            .boolean()
            .meta({ description: 'Whether there are more resources to retrieve after this page.' }),
        })
        .meta({
          description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
        }),
    ),
  postAgentsAutomationsAutomationIdInvocations: oc
    .route({
      method: 'POST',
      path: '/agents/automations/{automation_id}/invocations',
      tags: ['Agents'],
      summary: 'Invoke an automation',
      description: 'Queues a manual delivery without changing the saved schedule.',
      successDescription: 'The queued invocation.',
    })
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationInvocationResourceSchema),
  getAgentsAutomationsAutomationIdInvocationsInvocationId: oc
    .route({
      method: 'GET',
      path: '/agents/automations/{automation_id}/invocations/{invocation_id}',
      tags: ['Agents'],
      summary: 'Get an automation invocation',
      description: 'Retrieves a delivery record for a project-owned automation.',
      successDescription: 'The invocation.',
    })
    .input(
      z.object({
        automation_id: z.string().min(0).max(1048576),
        invocation_id: z.string().min(0).max(1048576),
      }),
    )
    .output(AutomationInvocationResourceSchema),
  getAgentsEnvironments: oc
    .route({
      method: 'GET',
      path: '/agents/environments',
      tags: ['Agents'],
      summary: 'List agent environments',
      description:
        'Lists OpenAI-hosted environments owned by the authenticated principal. Requires access to the prewarming beta.',
      successDescription: 'A page of owned environments.',
    })
    .input(
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        type: EnvironmentTypeParamSchema.exactOptional(),
      }),
    )
    .output(AgentEnvironmentListResourceSchema),
  postAgentsEnvironments: oc
    .route({
      method: 'POST',
      path: '/agents/environments',
      tags: ['Agents'],
      summary: 'Create an agent environment',
      description:
        'Creates an OpenAI-hosted environment before creating a session. Requires access to the prewarming beta.',
      successStatus: 201,
      successDescription: 'The created OpenAI-hosted environment.',
    })
    .input(CreateAgentEnvironmentParamsSchema)
    .output(PublicEnvironmentResourceSchema),
  getAgentsEnvironmentsEnvironmentId: oc
    .route({
      method: 'GET',
      path: '/agents/environments/{environment_id}',
      tags: ['Agents'],
      summary: 'Retrieve an agent environment',
      description:
        "Retrieves an execution environment's connection status and safe installed metadata. See [environment lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle).",
      successDescription: 'The requested environment.',
    })
    .input(z.object({ environment_id: z.string().min(0).max(1048576) }))
    .output(PublicEnvironmentResourceSchema),
  getAgentsEnvironmentsEnvironmentIdFiles: oc
    .route({
      method: 'GET',
      path: '/agents/environments/{environment_id}/files',
      tags: ['Agents'],
      summary: 'List agent environment files',
      description:
        'Lists live files on a connected execution environment with optional directory filtering and opaque cursor pagination. See [environment files](https://developers.openai.com/api/docs/guides/agents-api/environments/files).',
      successDescription: 'A page of live environment files.',
    })
    .input(
      z.object({
        environment_id: z.string().min(0).max(1048576),
        path: z.string().min(0).max(1048576).nullable().exactOptional(),
        limit: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).nullable(),
          )
          .exactOptional(),
        order: ListOrderParamSchema.exactOptional(),
        page: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(EnvironmentFileListResourceSchema),
  postAgentsEnvironmentsEnvironmentIdFiles: oc
    .route({
      method: 'POST',
      path: '/agents/environments/{environment_id}/files',
      tags: ['Agents'],
      summary: 'Write an agent environment file',
      description:
        'Copies inline bytes or a Files API file into a connected execution environment, replacing an existing regular file at the same path. Upload between turns and wait for success before starting the next turn. See [environment files](https://developers.openai.com/api/docs/guides/agents-api/environments/files).',
      successStatus: 201,
      successDescription: 'The written live environment file.',
    })
    .input(z.object({ environment_id: z.string().min(0).max(1048576) }))
    .output(EnvironmentFileResourceSchema),
  getAgentsSessionsSessionIdSubagents: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/subagents',
      tags: ['Agents'],
      summary: 'List session subagents',
      description:
        'Lists subagents in a session, including nested and closed subagents. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      successDescription: 'The requested subagents.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      z
        .strictObject({
          object: z
            .literal('list')
            .default('list')
            .meta({ description: 'The object type, which is always `list`.' }),
          data: z
            .array(SubagentResourceSchema)
            .min(0)
            .max(2000)
            .meta({
              description: 'The resources returned in this page, in the requested sort order.',
            }),
          first_id: z
            .string()
            .min(0)
            .nullable()
            .meta({
              description:
                'The ID of the first resource in `data`, or `null` if the page is empty.',
            }),
          last_id: z
            .string()
            .min(0)
            .nullable()
            .meta({
              description:
                'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
            }),
          has_more: z
            .boolean()
            .meta({ description: 'Whether there are more resources to retrieve after this page.' }),
        })
        .meta({
          description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
        }),
    ),
  getAgentsSessionsSessionIdSubagentsSubagentId: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/subagents/{subagent_id}',
      tags: ['Agents'],
      summary: 'Retrieve a session subagent',
      description:
        'Retrieves a subagent belonging to this session. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      successDescription: 'The requested subagent.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
      }),
    )
    .output(SubagentResourceSchema),
  getAgentsSessionsSessionIdSubagentsSubagentIdItems: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/subagents/{subagent_id}/items',
      tags: ['Agents'],
      summary: 'List subagent items',
      description:
        "Lists this subagent's own items across all of its turns. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).",
      successDescription: 'The requested subagent history.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurns: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/subagents/{subagent_id}/turns',
      tags: ['Agents'],
      summary: 'List subagent turns',
      description:
        'Lists all turns of this subagent, including turns after a resume. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      successDescription: 'The requested subagent history.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionTurnListResourceSchema),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}',
      tags: ['Agents'],
      summary: 'Retrieve a subagent turn',
      description:
        'Retrieves a turn belonging to this subagent. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      successDescription: 'The requested subagent history.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    )
    .output(TurnResourceSchema),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}/items',
      tags: ['Agents'],
      summary: 'List subagent turn items',
      description:
        'Lists items belonging to one turn of this subagent. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      successDescription: 'The requested subagent history.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema),
  getAgents: oc
    .route({
      method: 'GET',
      path: '/agents',
      tags: ['Agents'],
      summary: 'List agents',
      description:
        'Lists reusable agents in the current project. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      successDescription: 'A page of agents.',
    })
    .input(
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(AgentListResourceSchema),
  postAgents: oc
    .route({
      method: 'POST',
      path: '/agents',
      tags: ['Agents'],
      summary: 'Create an agent',
      description:
        'Creates a reusable agent without storing credentials. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      successStatus: 201,
      successDescription: 'The created agent.',
    })
    .input(CreateAgentParamsSchema)
    .output(AgentResourceSchema),
  getAgentsAgentId: oc
    .route({
      method: 'GET',
      path: '/agents/{agent_id}',
      tags: ['Agents'],
      summary: 'Retrieve an agent',
      description:
        'Retrieves a reusable agent by ID. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      successDescription: 'The requested agent.',
    })
    .input(z.object({ agent_id: z.string().min(0).max(1048576) }))
    .output(AgentResourceSchema),
  postAgentsAgentId: oc
    .route({
      method: 'POST',
      path: '/agents/{agent_id}',
      tags: ['Agents'],
      summary: 'Update an agent',
      description:
        'Updates a reusable agent. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      successDescription: 'The updated agent.',
    })
    .input(
      z.object({
        agent_id: z.string().min(0).max(1048576),
        experimental: ExperimentalConfigOverridesParamSchema.exactOptional(),
        model: z
          .string()
          .min(0)
          .max(1048576)
          .meta({
            description: 'The model to use for the agent. The requested model name is preserved.',
          })
          .exactOptional(),
        reasoning: z
          .union([ReasoningParamSchema, z.null().nullable()])
          .meta({
            description:
              "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
          })
          .exactOptional(),
        text: z
          .union([TextParamSchema, z.null().nullable()])
          .meta({ description: 'Configuration for text generated by the agent.' })
          .exactOptional(),
        service_tier: z
          .union([ServiceTierParamSchema, z.null().nullable()])
          .meta({ description: 'The service tier used for model requests.' })
          .exactOptional(),
        instructions: z
          .string()
          .min(0)
          .max(1048576)
          .nullable()
          .meta({
            description:
              "Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.",
          })
          .exactOptional(),
        multi_agent: z
          .union([MultiAgentConfigCurrentParamSchema, z.null().nullable()])
          .meta({ description: 'Configuration for creating and coordinating subagents.' })
          .exactOptional(),
        compaction: z
          .union([CompactionParamSchema, z.null().nullable()])
          .meta({
            description:
              'Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object uses blocking compaction.',
          })
          .exactOptional(),
        metadata: z
          .record(z.string(), z.string().min(0).max(512))
          .nullable()
          .meta({
            description:
              'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          })
          .exactOptional(),
        name: z
          .string()
          .min(0)
          .max(128)
          .nullable()
          .meta({
            description: 'A replacement name. Omit to leave unchanged, or pass null to clear it.',
          })
          .exactOptional(),
        tools: z
          .array(PersistedAgentToolConfigParamSchema)
          .min(0)
          .max(2000)
          .nullable()
          .meta({
            description:
              'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
          })
          .exactOptional(),
      }),
    )
    .output(AgentResourceSchema),
  deleteAgentsAgentId: oc
    .route({
      method: 'DELETE',
      path: '/agents/{agent_id}',
      tags: ['Agents'],
      summary: 'Delete an agent',
      description:
        'Deletes a reusable agent. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      successDescription: 'The deleted agent.',
    })
    .input(z.object({ agent_id: z.string().min(0).max(1048576) }))
    .output(DeletedAgentResourceSchema),
  getAgentsEnvironmentsTemplates: oc
    .route({
      method: 'GET',
      path: '/agents/environments/templates',
      tags: ['Agents'],
      summary: 'List agent environment templates',
      description:
        'Lists reusable environment templates without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      successDescription: 'A page of environment templates.',
    })
    .input(
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(EnvironmentTemplateListResourceSchema),
  postAgentsEnvironmentsTemplates: oc
    .route({
      method: 'POST',
      path: '/agents/environments/templates',
      tags: ['Agents'],
      summary: 'Create an agent environment template',
      description:
        'Creates reusable environment configuration without returning confidential setup commands or environment values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      successStatus: 201,
      successDescription: 'The created environment template.',
    })
    .input(CreateEnvironmentTemplateParamsSchema)
    .output(EnvironmentTemplateResourceSchema),
  getAgentsEnvironmentsTemplatesEnvironmentTemplateId: oc
    .route({
      method: 'GET',
      path: '/agents/environments/templates/{environment_template_id}',
      tags: ['Agents'],
      summary: 'Retrieve an agent environment template',
      description:
        'Retrieves reusable environment configuration without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      successDescription: 'The requested environment template.',
    })
    .input(z.object({ environment_template_id: z.string().min(0).max(1048576) }))
    .output(EnvironmentTemplateResourceSchema),
  postAgentsEnvironmentsTemplatesEnvironmentTemplateId: oc
    .route({
      method: 'POST',
      path: '/agents/environments/templates/{environment_template_id}',
      tags: ['Agents'],
      summary: 'Update an agent environment template',
      description:
        'Updates reusable environment configuration without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      successDescription: 'The updated environment template.',
    })
    .input(
      z.object({
        environment_template_id: z.string().min(0).max(1048576),
        name: z
          .string()
          .min(1)
          .max(256)
          .nullable()
          .meta({
            description: 'A replacement human-readable display name, or `null` to clear the name.',
          })
          .exactOptional(),
        packages: z
          .union([EnvironmentPackagesParamSchema, z.null().nullable()])
          .meta({ description: 'Packages installed before the runtime network policy applies.' })
          .exactOptional(),
        setup_commands: z
          .array(SetupCommandParamSchema)
          .min(0)
          .max(16)
          .nullable()
          .meta({
            description:
              'Replacement confidential setup commands, never included in returned resources.',
          })
          .exactOptional(),
        network: z
          .union([NetworkPolicyParamSchema, z.null().nullable()])
          .meta({
            description:
              'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
          })
          .exactOptional(),
        desktop: z
          .union([DesktopParamSchema, z.null().nullable()])
          .meta({
            description: 'Replacement desktop configuration, or null to disable the desktop.',
          })
          .exactOptional(),
        env: z
          .record(z.string(), z.string().min(0).max(1048576))
          .nullable()
          .meta({ description: 'Replacement confidential environment values.' })
          .exactOptional(),
        capability_directories: z
          .array(z.string().min(0).max(1048576))
          .min(0)
          .max(16384)
          .nullable()
          .meta({ description: 'Directories that expose capabilities to the agent.' })
          .exactOptional(),
        skills: z
          .array(HostedSkillParamSchema)
          .min(0)
          .max(200)
          .nullable()
          .meta({ description: 'Replacement skill configuration installed for each new session.' })
          .exactOptional(),
        plugins: z
          .array(HostedPluginParamSchema)
          .min(0)
          .max(32)
          .nullable()
          .meta({ description: 'Replacement plugin configuration installed for each new session.' })
          .exactOptional(),
        files: z
          .array(HostedEnvironmentFileParamSchema)
          .min(0)
          .max(50)
          .nullable()
          .meta({
            description: 'Replacement file configuration materialized for each new session.',
          })
          .exactOptional(),
      }),
    )
    .output(EnvironmentTemplateResourceSchema),
  deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId: oc
    .route({
      method: 'DELETE',
      path: '/agents/environments/templates/{environment_template_id}',
      tags: ['Agents'],
      summary: 'Delete an agent environment template',
      description:
        'Deletes reusable environment configuration and all confidential template inputs. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      successDescription: 'The deleted environment template.',
    })
    .input(z.object({ environment_template_id: z.string().min(0).max(1048576) }))
    .output(DeletedEnvironmentTemplateResourceSchema),
  getAgentsSessions: oc
    .route({
      method: 'GET',
      path: '/agents/sessions',
      tags: ['Agents'],
      summary: 'List agent sessions',
      description:
        'Lists managed agent sessions using ID-based pagination and the requested sort order. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      successDescription: 'A page of sessions.',
    })
    .input(
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        agent_id: z.string().min(0).max(1048576).exactOptional(),
        metadata: z
          .preprocess(
            (val) => {
              if (typeof val !== 'object' || val === null || Array.isArray(val)) return val
              const out = Object.entries(val).reduce<{ [k: string]: unknown }>(
                (acc, [key, value]) => {
                  const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                  return name === undefined ? acc : { ...acc, [name]: value }
                },
                {},
              )
              return Object.keys(out).length > 0 ? out : val
            },
            z.record(z.string(), z.string().min(0).max(512)),
          )
          .exactOptional(),
      }),
    )
    .output(SessionListResourceSchema),
  postAgentsSessions: oc
    .route({
      method: 'POST',
      path: '/agents/sessions',
      tags: ['Agents'],
      summary: 'Create an agent session',
      description:
        'Creates a managed agent session, optionally submits initial input, and returns the session or streams its events when stream is true. See [running sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions).',
      successStatus: 201,
      successDescription: 'The created session or its event stream.',
    })
    .input(CreateAgentSessionParamsSchema)
    .output(SessionResourceSchema),
  getAgentsSessionsSessionId: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}',
      tags: ['Agents'],
      summary: 'Retrieve an agent session',
      description:
        'Retrieves the current state of a managed agent session. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      successDescription: 'The requested session.',
    })
    .input(z.object({ session_id: z.string().min(0).max(1048576) }))
    .output(SessionResourceSchema),
  postAgentsSessionsSessionId: oc
    .route({
      method: 'POST',
      path: '/agents/sessions/{session_id}',
      tags: ['Agents'],
      summary: 'Update an agent session',
      description:
        'Updates session tools, vaults, metadata, model, reasoning effort, service tier, or the default prompt cache lifetime. Model settings apply to subsequent turns. Omitted fields are unchanged. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      successDescription: 'The updated session.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        prompt_cache_options: z
          .union([PromptCacheOptionsParam2Schema, z.null().nullable()])
          .meta({
            description:
              'Default prompt cache lifetime for future turns. Send null to clear the session default.',
          })
          .exactOptional(),
        vault_ids: z
          .array(z.string().min(0).max(1048576))
          .min(0)
          .max(16384)
          .nullable()
          .meta({
            description:
              "Replaces the session's referenced vaults. Omit to retain them; null or [] clears them.",
          })
          .exactOptional(),
        review: SessionReviewParamSchema.exactOptional(),
        spend_control: z
          .union([SessionBudgetControlParamsSchema, z.null().nullable()])
          .meta({
            description:
              'Omit to retain the limit; null or a null limit removes it without resetting spend.',
          })
          .exactOptional(),
        agent: UpdateSessionAgentParamSchema.exactOptional(),
        metadata: z
          .record(z.string(), z.string().min(0).max(512))
          .nullable()
          .meta({
            description:
              'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          })
          .exactOptional(),
      }),
    )
    .output(SessionResourceSchema),
  deleteAgentsSessionsSessionId: oc
    .route({
      method: 'DELETE',
      path: '/agents/sessions/{session_id}',
      tags: ['Agents'],
      summary: 'Delete an agent session',
      description:
        'Removes a managed agent session from the public API and returns a deletion confirmation. If backend execution has ended, deletion can cancel a still-open public turn and abandon unpublished outputs. Running execution must be cancelled first. Physical cleanup may continue asynchronously. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      successDescription: 'The deleted session.',
    })
    .input(z.object({ session_id: z.string().min(0).max(1048576) }))
    .output(DeletedSessionResourceSchema),
  getAgentsSessionsSessionIdArtifacts: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/artifacts',
      tags: ['Agents'],
      summary: 'List agent session artifacts',
      description:
        'Lists immutable artifacts published by completed hosted session turns. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      successDescription: 'A page of durable session artifacts.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        environment_id: z.string().min(0).max(1048576).nullable().exactOptional(),
      }),
    )
    .output(SessionArtifactListResourceSchema),
  getAgentsSessionsSessionIdArtifactsArtifactId: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/artifacts/{artifact_id}',
      tags: ['Agents'],
      summary: 'Retrieve an agent session artifact',
      description:
        'Retrieves immutable metadata for one durable session artifact. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      successDescription: 'The requested session artifact.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    )
    .output(SessionArtifactResourceSchema),
  deleteAgentsSessionsSessionIdArtifactsArtifactId: oc
    .route({
      method: 'DELETE',
      path: '/agents/sessions/{session_id}/artifacts/{artifact_id}',
      tags: ['Agents'],
      summary: 'Delete an agent session artifact',
      description:
        'Deletes an immutable session artifact without deleting its live environment file or original Files API object. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      successDescription: 'The deleted session artifact.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    )
    .output(DeletedSessionArtifactResourceSchema),
  getAgentsSessionsSessionIdArtifactsArtifactIdContent: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/artifacts/{artifact_id}/content',
      tags: ['Agents'],
      summary: 'Retrieve agent session artifact content',
      description:
        'Downloads immutable session artifact bytes after the execution environment expires. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      successDescription: 'The immutable artifact contents.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    ),
  getAgentsSessionsSessionIdEvents: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/events',
      tags: ['Agents'],
      summary: 'Stream agent session events',
      description:
        'Streams live events for an agent session. See [session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).',
      successDescription: 'A live stream of session events.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        include_obfuscation: z.stringbool().default(true).exactOptional(),
      }),
    ),
  postAgentsSessionsSessionIdEvents: oc
    .route({
      method: 'POST',
      path: '/agents/sessions/{session_id}/events',
      tags: ['Agents'],
      summary: 'Create agent session input events',
      description:
        'Submits message, cancellation, tool-result, or computer-use approval-response events to a managed agent session. Cancellation can recover a still-open turn whose backend execution has ended by marking it cancelled and abandoning unpublished outputs. Saved results, published files, and existing terminal outcomes are preserved. HTTP 202 confirms acceptance, not durable completion. See [session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).',
      successStatus: 202,
      successDescription: 'The events were accepted.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        events: z
          .array(SessionInputParamSchema)
          .min(0)
          .max(16384)
          .meta({ description: 'The input events to submit to the session.' }),
      }),
    ),
  getAgentsSessionsSessionIdItems: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/items',
      tags: ['Agents'],
      summary: 'List agent session items',
      description:
        "Lists items produced by the session's root agent, including its interactions with subagents. Each subagent has its own item history. See [inspecting agent output](https://developers.openai.com/api/docs/guides/agents-api/observability).",
      successDescription: 'A page of session items.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema),
  getAgentsSessionsSessionIdTraces: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/traces',
      tags: ['Agents'],
      summary: 'List agent session traces',
      description:
        'Lists published root-turn traces as OTLP JSON, ordered by turn creation time and ID. Unpublished traces are skipped. Each page returns data available when read; it does not wait for late traces. Pages may contain fewer traces than requested to fit the 16 MiB response limit. When `has_more` is true, pass `last_id` as `after` to continue. If the first trace exceeds 16 MiB before conversion or cannot fit on a page by itself, the API returns a `trace_too_large` error.',
      successDescription: 'A page of published session traces.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionTraceListResourceSchema),
  getAgentsSessionsSessionIdTurns: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/turns',
      tags: ['Agents'],
      summary: 'List agent session turns',
      description:
        'Lists turns by creation time and turn ID. The after cursor is exclusive in the selected order. See [session turns](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).',
      successDescription: 'A page of session turns.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionTurnListResourceSchema),
  getAgentsSessionsSessionIdTurnsTurnId: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/turns/{turn_id}',
      tags: ['Agents'],
      summary: 'Retrieve an agent session turn',
      description:
        "Retrieves a turn's current status, timestamps, usage, and error. Returns 404 if the turn does not belong to the session. See [session turns](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).",
      successDescription: 'The requested turn.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    )
    .output(TurnResourceSchema),
  getAgentsSessionsSessionIdTurnsTurnIdItems: oc
    .route({
      method: 'GET',
      path: '/agents/sessions/{session_id}/turns/{turn_id}/items',
      tags: ['Agents'],
      summary: 'List agent session turn items',
      description:
        'Lists items belonging to one root-agent turn, including its interactions with subagents. See [inspecting agent output](https://developers.openai.com/api/docs/guides/agents-api/observability).',
      successDescription: 'A page of session turn items.',
    })
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema),
  getVaults: oc
    .route({
      method: 'GET',
      path: '/vaults',
      tags: ['Vaults'],
      summary: 'List vaults',
      description:
        'Lists vaults using ID-based pagination. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'A page of vaults.',
    })
    .input(
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        metadata: z
          .preprocess(
            (val) => {
              if (typeof val !== 'object' || val === null || Array.isArray(val)) return val
              const out = Object.entries(val).reduce<{ [k: string]: unknown }>(
                (acc, [key, value]) => {
                  const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                  return name === undefined ? acc : { ...acc, [name]: value }
                },
                {},
              )
              return Object.keys(out).length > 0 ? out : val
            },
            z.record(z.string(), z.string().min(0).max(512)),
          )
          .exactOptional(),
        status: VaultStatusFilterParamSchema.exactOptional(),
      }),
    )
    .output(VaultListResourceSchema),
  postVaults: oc
    .route({
      method: 'POST',
      path: '/vaults',
      tags: ['Vaults'],
      summary: 'Create a vault',
      description:
        'Creates a vault for the current project. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successStatus: 201,
      successDescription: 'The created vault.',
    })
    .input(CreateVaultParamsSchema)
    .output(VaultResourceSchema),
  getVaultsVaultId: oc
    .route({
      method: 'GET',
      path: '/vaults/{vault_id}',
      tags: ['Vaults'],
      summary: 'Retrieve a vault',
      description:
        'Retrieves a vault by its ID. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'The requested vault.',
    })
    .input(z.object({ vault_id: z.string().min(0).max(1048576) }))
    .output(VaultResourceSchema),
  postVaultsVaultId: oc
    .route({
      method: 'POST',
      path: '/vaults/{vault_id}',
      tags: ['Vaults'],
      summary: 'Update a vault',
      description:
        'Updates the name or metadata of an active vault. Omitted fields remain unchanged. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'The updated vault.',
    })
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        metadata: z
          .record(z.string(), z.string().min(0).max(512))
          .meta({
            description:
              'Replaces all metadata. Omit to leave unchanged, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          })
          .exactOptional(),
        name: z
          .string()
          .min(1)
          .max(1048576)
          .nullable()
          .meta({
            description:
              'A replacement name. Omit to leave unchanged, or pass null to clear it. The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
          })
          .exactOptional(),
      }),
    )
    .output(VaultResourceSchema),
  deleteVaultsVaultId: oc
    .route({
      method: 'DELETE',
      path: '/vaults/{vault_id}',
      tags: ['Vaults'],
      summary: 'Delete a vault',
      description:
        'Deletes a vault and all its credentials. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'The deleted vault.',
    })
    .input(z.object({ vault_id: z.string().min(0).max(1048576) }))
    .output(DeletedVaultResourceSchema),
  getVaultsVaultIdCredentials: oc
    .route({
      method: 'GET',
      path: '/vaults/{vault_id}/credentials',
      tags: ['Vaults'],
      summary: 'List vault credentials',
      description:
        "Lists a vault's credentials using ID-based pagination without returning secret values. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).",
      successDescription: 'A page of vault credentials.',
    })
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        metadata: z
          .preprocess(
            (val) => {
              if (typeof val !== 'object' || val === null || Array.isArray(val)) return val
              const out = Object.entries(val).reduce<{ [k: string]: unknown }>(
                (acc, [key, value]) => {
                  const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                  return name === undefined ? acc : { ...acc, [name]: value }
                },
                {},
              )
              return Object.keys(out).length > 0 ? out : val
            },
            z.record(z.string(), z.string().min(0).max(512)),
          )
          .exactOptional(),
        status: VaultStatusFilterParamSchema.exactOptional(),
      }),
    )
    .output(VaultCredentialListResourceSchema),
  postVaultsVaultIdCredentials: oc
    .route({
      method: 'POST',
      path: '/vaults/{vault_id}/credentials',
      tags: ['Vaults'],
      summary: 'Create a vault credential',
      description:
        'Creates a vault credential. Secret values are write-only and are never returned. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successStatus: 201,
      successDescription: 'The created vault credential without secret values.',
    })
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        name: z
          .string()
          .min(1)
          .max(1048576)
          .meta({
            description:
              'The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
          }),
        auth: CreateVaultCredentialAuthParamSchema,
        metadata: z
          .record(z.string(), z.string().min(0).max(512))
          .meta({
            description:
              'Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters. Defaults to an empty map.',
          })
          .exactOptional(),
      }),
    )
    .output(VaultCredentialResourceSchema),
  getVaultsVaultIdCredentialsCredentialId: oc
    .route({
      method: 'GET',
      path: '/vaults/{vault_id}/credentials/{credential_id}',
      tags: ['Vaults'],
      summary: 'Retrieve a vault credential',
      description:
        'Retrieves vault credential metadata without returning secret values. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'The requested vault credential without secret values.',
    })
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    )
    .output(VaultCredentialResourceSchema),
  postVaultsVaultIdCredentialsCredentialId: oc
    .route({
      method: 'POST',
      path: '/vaults/{vault_id}/credentials/{credential_id}',
      tags: ['Vaults'],
      summary: 'Update a vault credential',
      description:
        'Updates credential metadata or rotates its write-only secret. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'The updated vault credential without secret values.',
    })
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
        auth: RotateVaultCredentialAuthParamSchema.exactOptional(),
        metadata: z
          .record(z.string(), z.string().min(0).max(512))
          .meta({
            description:
              'Replaces all metadata. Omit to preserve it, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          })
          .exactOptional(),
      }),
    )
    .output(VaultCredentialResourceSchema),
  deleteVaultsVaultIdCredentialsCredentialId: oc
    .route({
      method: 'DELETE',
      path: '/vaults/{vault_id}/credentials/{credential_id}',
      tags: ['Vaults'],
      summary: 'Delete a vault credential',
      description:
        'Deletes a vault credential. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      successDescription: 'The deleted vault credential.',
    })
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    )
    .output(DeletedVaultCredentialResourceSchema),
  getWebhookEndpoints: oc
    .route({
      method: 'GET',
      path: '/webhook_endpoints',
      summary: 'List Webhook Endpoints',
      description: 'Returns webhook endpoints for the authenticated project in newest-first order.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        after: z
          .union([
            z.string().meta({ examples: ['whe_123'] }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
      }),
    )
    .output(WebhookEndpointListResourceSchema),
  postWebhookEndpoints: oc
    .route({
      method: 'POST',
      path: '/webhook_endpoints',
      summary: 'Create Webhook Endpoint',
      description: 'Creates a webhook endpoint for the authenticated project.',
      successDescription: 'Success',
    })
    .input(PublicCreateEndpointBodySchema)
    .output(WebhookEndpointWithSecretResourceSchema),
  getWebhookEndpointsWebhookEndpointId: oc
    .route({
      method: 'GET',
      path: '/webhook_endpoints/{webhook_endpoint_id}',
      summary: 'Retrieve Webhook Endpoint',
      description: 'Retrieves a webhook endpoint for the authenticated project.',
      successDescription: 'Success',
    })
    .input(z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }))
    .output(WebhookEndpointBodySchema),
  postWebhookEndpointsWebhookEndpointId: oc
    .route({
      method: 'POST',
      path: '/webhook_endpoints/{webhook_endpoint_id}',
      summary: 'Update Webhook Endpoint',
      description: 'Updates a webhook endpoint for the authenticated project.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
        name: z
          .string()
          .min(1)
          .max(256)
          .meta({ description: 'A new human-readable name for the webhook endpoint.' })
          .exactOptional(),
        url: z
          .string()
          .regex(/^https:\/\//)
          .max(2048)
          .meta({ description: 'A new HTTPS URL that receives webhook deliveries.' })
          .exactOptional(),
        event_types: z
          .array(ProjectEventTypeEnumSchema)
          .min(1)
          .meta({ description: 'The complete set of event types that should trigger deliveries.' })
          .exactOptional(),
      }),
    )
    .output(WebhookEndpointBodySchema),
  deleteWebhookEndpointsWebhookEndpointId: oc
    .route({
      method: 'DELETE',
      path: '/webhook_endpoints/{webhook_endpoint_id}',
      summary: 'Delete Webhook Endpoint',
      description: 'Deletes a webhook endpoint for the authenticated project.',
      successDescription: 'Success',
    })
    .input(z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }))
    .output(DeletedWebhookEndpointResourceSchema),
  postWebhookEndpointsWebhookEndpointIdRotateSecret: oc
    .route({
      method: 'POST',
      path: '/webhook_endpoints/{webhook_endpoint_id}/rotate_secret',
      summary: 'Rotate Webhook Endpoint Signing Secret',
      description:
        'Rotates the signing secret for a webhook endpoint in the authenticated project.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
        keep_old_secret_active_for_24_hours: z
          .boolean()
          .meta({
            description:
              'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
          })
          .exactOptional(),
      }),
    )
    .output(WebhookEndpointWithSecretResourceSchema),
  postWebhookEndpointsWebhookEndpointIdTest: oc
    .route({
      method: 'POST',
      path: '/webhook_endpoints/{webhook_endpoint_id}/test',
      summary: 'Test Webhook Endpoint',
      description: 'Sends a sample event to a webhook endpoint for the authenticated project.',
      successDescription: 'Success',
    })
    .input(
      z.object({
        webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
        event_type: ProjectEventTypeEnumSchema,
      }),
    )
    .output(WebhookEndpointTestResultResourceSchema),
  getWebhookEventTypes: oc
    .route({
      method: 'GET',
      path: '/webhook_event_types',
      summary: 'List Webhook Event Types',
      description: 'Returns webhook event types visible to the authenticated project.',
      successDescription: 'Success',
    })
    .output(WebhookEventTypeListResourceSchema),
  postResponsesBetaTrue: oc
    .route({
      method: 'POST',
      path: '/responses?beta=true',
      tags: ['Responses'],
      summary: 'Create a model response',
      description:
        "Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or\n[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)\nor [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call\nyour own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in\n[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)\nor [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data\nas input for the model's response.\n",
    })
    .input(BetaCreateResponseSchema)
    .output(BetaResponseSchema),
  getResponsesResponseIdBetaTrue: oc
    .route({
      method: 'GET',
      path: '/responses/{response_id}?beta=true',
      tags: ['Responses'],
      summary: 'Get a model response',
      description: 'Retrieves a model response with the given ID.\n',
    })
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(BetaIncludeEnumSchema),
          )
          .exactOptional(),
        stream: z.stringbool().exactOptional(),
        starting_after: z.coerce.number().int().exactOptional(),
        include_obfuscation: z.stringbool().exactOptional(),
      }),
    )
    .output(BetaResponseSchema),
  deleteResponsesResponseIdBetaTrue: oc
    .route({
      method: 'DELETE',
      path: '/responses/{response_id}?beta=true',
      tags: ['Responses'],
      summary: 'Delete a model response',
      description: 'Deletes a model response with the given ID.\n',
    })
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(
      z.object({
        object: z.literal('response.deleted').default('response.deleted'),
        deleted: z.boolean(),
        id: z.string(),
      }),
    ),
  postResponsesResponseIdCancelBetaTrue: oc
    .route({
      method: 'POST',
      path: '/responses/{response_id}/cancel?beta=true',
      tags: ['Responses'],
      summary: 'Cancel a response',
      description:
        'Cancels a model response with the given ID. Only responses created with\nthe `background` parameter set to `true` can be cancelled.\n[Learn more](https://developers.openai.com/api/docs/guides/background).\n',
    })
    .input(
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    )
    .output(BetaResponseSchema),
  postResponsesCompactBetaTrue: oc
    .route({
      method: 'POST',
      path: '/responses/compact?beta=true',
      tags: ['Responses'],
      summary: 'Compact conversation',
      description:
        'Compact a conversation. Returns a compacted response object.\n\nLearn when and how to compact long-running conversations in the [conversation state guide](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window). For ZDR-compatible compaction details, see [Compaction (advanced)](https://developers.openai.com/api/docs/guides/conversation-state#compaction-advanced).',
      successDescription: 'Success',
    })
    .input(BetaCompactResponseMethodPublicBodySchema)
    .output(BetaCompactResourceSchema),
  getResponsesResponseIdInputItemsBetaTrue: oc
    .route({
      method: 'GET',
      path: '/responses/{response_id}/input_items?beta=true',
      tags: ['Responses'],
      summary: 'List input items',
      description: 'Returns a list of input items for a given response.',
    })
    .input(
      z.object({
        response_id: z.string(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(BetaIncludeEnumSchema),
          )
          .exactOptional(),
      }),
    )
    .output(BetaResponseItemListSchema),
  postResponsesInputTokensBetaTrue: oc
    .route({
      method: 'POST',
      path: '/responses/input_tokens?beta=true',
      tags: ['Responses'],
      summary: 'Get input token counts',
      description:
        'Returns input token counts of the request.\n\nReturns an object with `object` set to `response.input_tokens` and an `input_tokens` count.',
      successDescription: 'Success',
    })
    .input(BetaTokenCountsBodySchema)
    .output(BetaTokenCountsResourceSchema),
  postAgentEnvironmentExpired: oc
    .route({
      method: 'POST',
      path: '/agent_environment_expired',
      description:
        'Sent when an agent environment expires and can no longer resume from a snapshot.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentEnvironmentExpiredSchema),
  postAgentEnvironmentFailed: oc
    .route({
      method: 'POST',
      path: '/agent_environment_failed',
      description:
        'Sent when setup fails for a prewarmed OpenAI-hosted environment before it is attached to a session.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentEnvironmentFailedSchema),
  postAgentEnvironmentReady: oc
    .route({
      method: 'POST',
      path: '/agent_environment_ready',
      description:
        'Sent when a prewarmed OpenAI-hosted environment finishes setup before being attached to a session.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentEnvironmentReadySchema),
  postAgentEnvironmentSuspended: oc
    .route({
      method: 'POST',
      path: '/agent_environment_suspended',
      description: 'Sent when an agent environment is suspended and can resume from a snapshot.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentEnvironmentSuspendedSchema),
  postAgentSessionActionRequired: oc
    .route({
      method: 'POST',
      path: '/agent_session_action_required',
      description:
        'Sent when an agent session requires an action. Retrieve the session for action details.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentSessionActionRequiredSchema),
  postAgentSessionCreated: oc
    .route({
      method: 'POST',
      path: '/agent_session_created',
      description: 'Sent when an agent session is created.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentSessionCreatedSchema),
  postAgentSessionFailed: oc
    .route({
      method: 'POST',
      path: '/agent_session_failed',
      description: 'Sent when an agent session fails.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentSessionFailedSchema),
  postAgentSessionIdle: oc
    .route({
      method: 'POST',
      path: '/agent_session_idle',
      description: 'Sent when an agent session becomes idle.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentSessionIdleSchema),
  postAgentSessionInProgress: oc
    .route({
      method: 'POST',
      path: '/agent_session_in_progress',
      description: 'Sent when an agent session enters the in-progress state.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookAgentSessionInProgressSchema),
  postBatchCancelled: oc
    .route({
      method: 'POST',
      path: '/batch_cancelled',
      description: 'Sent when a batch has been cancelled.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookBatchCancelledSchema),
  postBatchCompleted: oc
    .route({
      method: 'POST',
      path: '/batch_completed',
      description: 'Sent when a batch has completed processing.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookBatchCompletedSchema),
  postBatchExpired: oc
    .route({
      method: 'POST',
      path: '/batch_expired',
      description: 'Sent when a batch has expired before completion.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookBatchExpiredSchema),
  postBatchFailed: oc
    .route({
      method: 'POST',
      path: '/batch_failed',
      description: 'Sent when a batch has failed.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookBatchFailedSchema),
  postEvalRunCanceled: oc
    .route({
      method: 'POST',
      path: '/eval_run_canceled',
      description: 'Sent when an eval run has been canceled.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookEvalRunCanceledSchema),
  postEvalRunFailed: oc
    .route({
      method: 'POST',
      path: '/eval_run_failed',
      description: 'Sent when an eval run has failed.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookEvalRunFailedSchema),
  postEvalRunSucceeded: oc
    .route({
      method: 'POST',
      path: '/eval_run_succeeded',
      description: 'Sent when an eval run has succeeded.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookEvalRunSucceededSchema),
  postFineTuningJobCancelled: oc
    .route({
      method: 'POST',
      path: '/fine_tuning_job_cancelled',
      description: 'Sent when a fine-tuning job has been cancelled.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookFineTuningJobCancelledSchema),
  postFineTuningJobFailed: oc
    .route({
      method: 'POST',
      path: '/fine_tuning_job_failed',
      description: 'Sent when a fine-tuning job has failed.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookFineTuningJobFailedSchema),
  postFineTuningJobSucceeded: oc
    .route({
      method: 'POST',
      path: '/fine_tuning_job_succeeded',
      description: 'Sent when a fine-tuning job has succeeded.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookFineTuningJobSucceededSchema),
  postLiveCallIncoming: oc
    .route({
      method: 'POST',
      path: '/live_call_incoming',
      description:
        'Deprecated: use `live.transport.incoming`. Retained only for existing subscriptions.\nSent when an incoming API SIP session is available for Live acceptance.\n',
      deprecated: true,
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookLiveCallIncomingSchema),
  postLiveTransportConnected: oc
    .route({
      method: 'POST',
      path: '/live_transport_connected',
      description:
        'Sent when a direct Live WebRTC session is created or an Instant Connect session activates.',
      successDescription: 'Acknowledges delivery after the endpoint has recorded the work.',
    })
    .input(WebhookLiveTransportConnectedSchema),
  postLiveTransportIncoming: oc
    .route({
      method: 'POST',
      path: '/live_transport_incoming',
      description: 'Sent when an incoming API SIP session is available for Live acceptance.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookLiveTransportIncomingSchema),
  postRealtimeCallIncoming: oc
    .route({
      method: 'POST',
      path: '/realtime_call_incoming',
      description: 'Sent when an incoming API SIP session is available for Realtime acceptance.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
    })
    .input(WebhookRealtimeCallIncomingSchema),
  postResponseCancelled: oc
    .route({
      method: 'POST',
      path: '/response_cancelled',
      description: 'Sent when a background response has been cancelled.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookResponseCancelledSchema),
  postResponseCompleted: oc
    .route({
      method: 'POST',
      path: '/response_completed',
      description: 'Sent when a background response has completed successfully.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
    })
    .input(WebhookResponseCompletedSchema),
  postResponseFailed: oc
    .route({
      method: 'POST',
      path: '/response_failed',
      description: 'Sent when a background response has failed.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookResponseFailedSchema),
  postResponseIncomplete: oc
    .route({
      method: 'POST',
      path: '/response_incomplete',
      description: 'Sent when a background response is incomplete.\n',
      successDescription:
        'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
    })
    .input(WebhookResponseIncompleteSchema),
  postSafetyAlertCreated: oc
    .route({
      method: 'POST',
      path: '/safety_alert_created',
      description:
        'Sent when an approved safety alert is available for an API project.\nRetrieve the alert with a project API key granted `api.safety.alerts.read`.\n',
      successDescription:
        'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
    })
    .input(WebhookSafetyAlertCreatedSchema),
  postSafetyDeactivationIssued: oc
    .route({
      method: 'POST',
      path: '/safety_deactivation_issued',
      description:
        'Sent when a deactivation is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
      successDescription:
        'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
    })
    .input(WebhookSafetyDeactivationIssuedSchema),
  postSafetyOrgAlertCreated: oc
    .route({
      method: 'POST',
      path: '/safety_org_alert_created',
      description:
        "Sent when an approved safety alert is available for an enterprise workspace.\nRetrieve the alert from `https://api.chatgpt.com/v1/safety/alerts/{id}` with\nan administrator API key for the workspace's backing organization granted\n`chatgpt.enterprise.safety_alerts.read`.\n",
      successDescription:
        'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
    })
    .input(WebhookSafetyOrgAlertCreatedSchema),
  postSafetyWarningIssued: oc
    .route({
      method: 'POST',
      path: '/safety_warning_issued',
      description:
        'Sent when a warning is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
      successDescription:
        'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
    })
    .input(WebhookSafetyWarningIssuedSchema),
}
