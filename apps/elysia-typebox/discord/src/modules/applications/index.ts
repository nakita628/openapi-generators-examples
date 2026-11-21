import { Elysia, t } from 'elysia'
import {
  ActionTypesSchema,
  ActivitiesAttachmentResponseSchema,
  ApplicationCommandAttachmentOptionSchema,
  ApplicationCommandAttachmentOptionResponseSchema,
  ApplicationCommandBooleanOptionSchema,
  ApplicationCommandBooleanOptionResponseSchema,
  ApplicationCommandChannelOptionSchema,
  ApplicationCommandChannelOptionResponseSchema,
  ApplicationCommandCreateRequestSchema,
  ApplicationCommandHandlerSchema,
  ApplicationCommandIntegerOptionSchema,
  ApplicationCommandIntegerOptionResponseSchema,
  ApplicationCommandMentionableOptionSchema,
  ApplicationCommandMentionableOptionResponseSchema,
  ApplicationCommandNumberOptionSchema,
  ApplicationCommandNumberOptionResponseSchema,
  ApplicationCommandOptionIntegerChoiceSchema,
  ApplicationCommandOptionIntegerChoiceResponseSchema,
  ApplicationCommandOptionNumberChoiceSchema,
  ApplicationCommandOptionNumberChoiceResponseSchema,
  ApplicationCommandOptionStringChoiceSchema,
  ApplicationCommandOptionStringChoiceResponseSchema,
  ApplicationCommandOptionTypeSchema,
  ApplicationCommandPatchRequestPartialSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandPermissionTypeSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandRoleOptionSchema,
  ApplicationCommandRoleOptionResponseSchema,
  ApplicationCommandStringOptionSchema,
  ApplicationCommandStringOptionResponseSchema,
  ApplicationCommandSubcommandGroupOptionSchema,
  ApplicationCommandSubcommandGroupOptionResponseSchema,
  ApplicationCommandSubcommandOptionSchema,
  ApplicationCommandSubcommandOptionResponseSchema,
  ApplicationCommandTypeSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationCommandUserOptionSchema,
  ApplicationCommandUserOptionResponseSchema,
  ApplicationEventWebhooksStatusSchema,
  ApplicationExplicitContentFilterTypesSchema,
  ApplicationFormPartialSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeConfigurationResponseSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationOAuth2InstallParamsResponseSchema,
  ApplicationResponseSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
  AttachmentResponseSchema,
  ChannelTypesSchema,
  CommandPermissionResponseSchema,
  CommandPermissionsResponseSchema,
  CreateEntitlementRequestDataSchema,
  EmbeddedActivityInstanceSchema,
  EmbeddedActivityLocationKindSchema,
  EmojiResponseSchema,
  EntitlementOwnerTypesSchema,
  EntitlementResponseSchema,
  EntitlementTenantFulfillmentStatusResponseSchema,
  EntitlementTypesSchema,
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  GuildChannelLocationSchema,
  InnerErrorsSchema,
  Int53TypeSchema,
  InteractionContextTypeSchema,
  ListApplicationEmojisResponseSchema,
  MetadataItemTypesSchema,
  NameplatePaletteSchema,
  OAuth2ScopesSchema,
  PrivateApplicationResponseSchema,
  PrivateChannelLocationSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
  TeamMemberResponseSchema,
  TeamMemberRolesSchema,
  TeamMembershipStatesSchema,
  TeamResponseSchema,
  UserAvatarDecorationResponseSchema,
  UserCollectiblesResponseSchema,
  UserNameplateResponseSchema,
  UserPrimaryGuildResponseSchema,
  UserResponseSchema,
} from '../../components/schemas'
import { ApplicationsModel } from './model'

export const applications = new Elysia()
  .model({
    ActionTypes: ActionTypesSchema,
    ActivitiesAttachmentResponse: ActivitiesAttachmentResponseSchema,
    ApplicationCommandAttachmentOption: ApplicationCommandAttachmentOptionSchema,
    ApplicationCommandAttachmentOptionResponse: ApplicationCommandAttachmentOptionResponseSchema,
    ApplicationCommandBooleanOption: ApplicationCommandBooleanOptionSchema,
    ApplicationCommandBooleanOptionResponse: ApplicationCommandBooleanOptionResponseSchema,
    ApplicationCommandChannelOption: ApplicationCommandChannelOptionSchema,
    ApplicationCommandChannelOptionResponse: ApplicationCommandChannelOptionResponseSchema,
    ApplicationCommandCreateRequest: ApplicationCommandCreateRequestSchema,
    ApplicationCommandHandler: ApplicationCommandHandlerSchema,
    ApplicationCommandIntegerOption: ApplicationCommandIntegerOptionSchema,
    ApplicationCommandIntegerOptionResponse: ApplicationCommandIntegerOptionResponseSchema,
    ApplicationCommandMentionableOption: ApplicationCommandMentionableOptionSchema,
    ApplicationCommandMentionableOptionResponse: ApplicationCommandMentionableOptionResponseSchema,
    ApplicationCommandNumberOption: ApplicationCommandNumberOptionSchema,
    ApplicationCommandNumberOptionResponse: ApplicationCommandNumberOptionResponseSchema,
    ApplicationCommandOptionIntegerChoice: ApplicationCommandOptionIntegerChoiceSchema,
    ApplicationCommandOptionIntegerChoiceResponse:
      ApplicationCommandOptionIntegerChoiceResponseSchema,
    ApplicationCommandOptionNumberChoice: ApplicationCommandOptionNumberChoiceSchema,
    ApplicationCommandOptionNumberChoiceResponse:
      ApplicationCommandOptionNumberChoiceResponseSchema,
    ApplicationCommandOptionStringChoice: ApplicationCommandOptionStringChoiceSchema,
    ApplicationCommandOptionStringChoiceResponse:
      ApplicationCommandOptionStringChoiceResponseSchema,
    ApplicationCommandOptionType: ApplicationCommandOptionTypeSchema,
    ApplicationCommandPatchRequestPartial: ApplicationCommandPatchRequestPartialSchema,
    ApplicationCommandPermission: ApplicationCommandPermissionSchema,
    ApplicationCommandPermissionType: ApplicationCommandPermissionTypeSchema,
    ApplicationCommandResponse: ApplicationCommandResponseSchema,
    ApplicationCommandRoleOption: ApplicationCommandRoleOptionSchema,
    ApplicationCommandRoleOptionResponse: ApplicationCommandRoleOptionResponseSchema,
    ApplicationCommandStringOption: ApplicationCommandStringOptionSchema,
    ApplicationCommandStringOptionResponse: ApplicationCommandStringOptionResponseSchema,
    ApplicationCommandSubcommandGroupOption: ApplicationCommandSubcommandGroupOptionSchema,
    ApplicationCommandSubcommandGroupOptionResponse:
      ApplicationCommandSubcommandGroupOptionResponseSchema,
    ApplicationCommandSubcommandOption: ApplicationCommandSubcommandOptionSchema,
    ApplicationCommandSubcommandOptionResponse: ApplicationCommandSubcommandOptionResponseSchema,
    ApplicationCommandType: ApplicationCommandTypeSchema,
    ApplicationCommandUpdateRequest: ApplicationCommandUpdateRequestSchema,
    ApplicationCommandUserOption: ApplicationCommandUserOptionSchema,
    ApplicationCommandUserOptionResponse: ApplicationCommandUserOptionResponseSchema,
    ApplicationEventWebhooksStatus: ApplicationEventWebhooksStatusSchema,
    ApplicationExplicitContentFilterTypes: ApplicationExplicitContentFilterTypesSchema,
    ApplicationFormPartial: ApplicationFormPartialSchema,
    ApplicationIntegrationType: ApplicationIntegrationTypeSchema,
    ApplicationIntegrationTypeConfiguration: ApplicationIntegrationTypeConfigurationSchema,
    ApplicationIntegrationTypeConfigurationResponse:
      ApplicationIntegrationTypeConfigurationResponseSchema,
    ApplicationOAuth2InstallParams: ApplicationOAuth2InstallParamsSchema,
    ApplicationOAuth2InstallParamsResponse: ApplicationOAuth2InstallParamsResponseSchema,
    ApplicationResponse: ApplicationResponseSchema,
    ApplicationRoleConnectionsMetadataItemRequest:
      ApplicationRoleConnectionsMetadataItemRequestSchema,
    ApplicationRoleConnectionsMetadataItemResponse:
      ApplicationRoleConnectionsMetadataItemResponseSchema,
    ApplicationTypes: ApplicationTypesSchema,
    AttachmentResponse: AttachmentResponseSchema,
    ChannelTypes: ChannelTypesSchema,
    CommandPermissionResponse: CommandPermissionResponseSchema,
    CommandPermissionsResponse: CommandPermissionsResponseSchema,
    CreateEntitlementRequestData: CreateEntitlementRequestDataSchema,
    EmbeddedActivityInstance: EmbeddedActivityInstanceSchema,
    EmbeddedActivityLocationKind: EmbeddedActivityLocationKindSchema,
    EmojiResponse: EmojiResponseSchema,
    EntitlementOwnerTypes: EntitlementOwnerTypesSchema,
    EntitlementResponse: EntitlementResponseSchema,
    EntitlementTenantFulfillmentStatusResponse: EntitlementTenantFulfillmentStatusResponseSchema,
    EntitlementTypes: EntitlementTypesSchema,
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    GuildChannelLocation: GuildChannelLocationSchema,
    InnerErrors: InnerErrorsSchema,
    Int53Type: Int53TypeSchema,
    InteractionContextType: InteractionContextTypeSchema,
    ListApplicationEmojisResponse: ListApplicationEmojisResponseSchema,
    MetadataItemTypes: MetadataItemTypesSchema,
    NameplatePalette: NameplatePaletteSchema,
    OAuth2Scopes: OAuth2ScopesSchema,
    PrivateApplicationResponse: PrivateApplicationResponseSchema,
    PrivateChannelLocation: PrivateChannelLocationSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
    TeamMemberResponse: TeamMemberResponseSchema,
    TeamMemberRoles: TeamMemberRolesSchema,
    TeamMembershipStates: TeamMembershipStatesSchema,
    TeamResponse: TeamResponseSchema,
    UserAvatarDecorationResponse: UserAvatarDecorationResponseSchema,
    UserCollectiblesResponse: UserCollectiblesResponseSchema,
    UserNameplateResponse: UserNameplateResponseSchema,
    UserPrimaryGuildResponse: UserPrimaryGuildResponseSchema,
    UserResponse: UserResponseSchema,
  })
  .get('/applications/@me', () => { throw new Error('Not implemented') }, {
    response: {
      200: 'PrivateApplicationResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'get_my_application', security: [{ BotToken: [] }] },
  })
  .patch('/applications/@me', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ApplicationFormPartial',
    response: {
      200: 'PrivateApplicationResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'update_my_application', security: [{ BotToken: [] }] },
  })
  .get('/applications/:application_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_applicationParams,
    response: {
      200: 'PrivateApplicationResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'get_application', security: [{ BotToken: [] }] },
  })
  .patch('/applications/:application_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.update_applicationParams,
    body: 'ApplicationFormPartial',
    response: {
      200: 'PrivateApplicationResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'update_application', security: [{ BotToken: [] }] },
  })
  .get('/applications/:application_id/activity-instances/:instance_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.applications_get_activity_instanceParams,
    response: {
      200: 'EmbeddedActivityInstance',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'applications_get_activity_instance',
      security: [{ BotToken: [] }],
    },
  })
  .post('/applications/:application_id/attachment', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.upload_application_attachmentParams,
    body: ApplicationsModel.upload_application_attachmentBody,
    response: {
      200: 'ActivitiesAttachmentResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'upload_application_attachment',
      security: [
        { BotToken: [] },
        {
          OAuth2: [
            'activities.invites.write',
            'activities.read',
            'activities.write',
            'applications.builds.read',
            'applications.builds.upload',
            'applications.commands',
            'applications.commands.permissions.update',
            'applications.commands.update',
            'applications.entitlements',
            'applications.store.update',
            'bot',
            'connections',
            'dm_channels.read',
            'email',
            'gdm.join',
            'guilds',
            'guilds.join',
            'guilds.members.read',
            'identify',
            'messages.read',
            'openid',
            'relationships.read',
            'role_connections.write',
            'rpc',
            'rpc.activities.write',
            'rpc.notifications.read',
            'rpc.screenshare.read',
            'rpc.screenshare.write',
            'rpc.video.read',
            'rpc.video.write',
            'rpc.voice.read',
            'rpc.voice.write',
            'voice',
            'webhook.incoming',
          ],
        },
      ],
    },
  })
  .get('/applications/:application_id/commands', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.list_application_commandsParams,
    query: ApplicationsModel.list_application_commandsQuery,
    response: {
      200: ApplicationsModel.list_application_commandsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'list_application_commands',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .put('/applications/:application_id/commands', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.bulk_set_application_commandsParams,
    body: ApplicationsModel.bulk_set_application_commandsBody,
    response: {
      200: ApplicationsModel.bulk_set_application_commandsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'bulk_set_application_commands',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .post('/applications/:application_id/commands', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.create_application_commandParams,
    body: 'ApplicationCommandCreateRequest',
    response: {
      200: 'ApplicationCommandResponse',
      201: 'ApplicationCommandResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'create_application_command',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .get('/applications/:application_id/commands/:command_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_application_commandParams,
    response: {
      200: 'ApplicationCommandResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_application_command',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .delete('/applications/:application_id/commands/:command_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.delete_application_commandParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'delete_application_command',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .patch('/applications/:application_id/commands/:command_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.update_application_commandParams,
    body: 'ApplicationCommandPatchRequestPartial',
    response: {
      200: 'ApplicationCommandResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'update_application_command',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .get('/applications/:application_id/emojis', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.list_application_emojisParams,
    response: {
      200: 'ListApplicationEmojisResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'list_application_emojis', security: [{ BotToken: [] }] },
  })
  .post('/applications/:application_id/emojis', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.create_application_emojiParams,
    body: ApplicationsModel.create_application_emojiBody,
    response: { 201: 'EmojiResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'create_application_emoji', security: [{ BotToken: [] }] },
  })
  .get('/applications/:application_id/emojis/:emoji_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_application_emojiParams,
    response: { 200: 'EmojiResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'get_application_emoji', security: [{ BotToken: [] }] },
  })
  .delete('/applications/:application_id/emojis/:emoji_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.delete_application_emojiParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'delete_application_emoji', security: [{ BotToken: [] }] },
  })
  .patch('/applications/:application_id/emojis/:emoji_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.update_application_emojiParams,
    body: ApplicationsModel.update_application_emojiBody,
    response: { 200: 'EmojiResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'update_application_emoji', security: [{ BotToken: [] }] },
  })
  .get('/applications/:application_id/entitlements', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_entitlementsParams,
    query: ApplicationsModel.get_entitlementsQuery,
    response: {
      200: ApplicationsModel.get_entitlementsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_entitlements',
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    },
  })
  .post('/applications/:application_id/entitlements', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.create_entitlementParams,
    body: 'CreateEntitlementRequestData',
    response: { 200: 'EntitlementResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'create_entitlement', security: [{ BotToken: [] }] },
  })
  .get('/applications/:application_id/entitlements/:entitlement_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_entitlementParams,
    response: { 200: 'EntitlementResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'get_entitlement',
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    },
  })
  .delete('/applications/:application_id/entitlements/:entitlement_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.delete_entitlementParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'delete_entitlement',
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    },
  })
  .post('/applications/:application_id/entitlements/:entitlement_id/consume', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.consume_entitlementParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'consume_entitlement',
      security: [{ BotToken: [] }, { OAuth2: ['applications.entitlements'] }],
    },
  })
  .get('/applications/:application_id/guilds/:guild_id/commands', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.list_guild_application_commandsParams,
    query: ApplicationsModel.list_guild_application_commandsQuery,
    response: {
      200: ApplicationsModel.list_guild_application_commandsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'list_guild_application_commands',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .put('/applications/:application_id/guilds/:guild_id/commands', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.bulk_set_guild_application_commandsParams,
    body: ApplicationsModel.bulk_set_guild_application_commandsBody,
    response: {
      200: ApplicationsModel.bulk_set_guild_application_commandsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'bulk_set_guild_application_commands',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .post('/applications/:application_id/guilds/:guild_id/commands', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.create_guild_application_commandParams,
    body: 'ApplicationCommandCreateRequest',
    response: {
      200: 'ApplicationCommandResponse',
      201: 'ApplicationCommandResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'create_guild_application_command',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .get('/applications/:application_id/guilds/:guild_id/commands/permissions', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.list_guild_application_command_permissionsParams,
    response: {
      200: ApplicationsModel.list_guild_application_command_permissionsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'list_guild_application_command_permissions',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
    },
  })
  .get('/applications/:application_id/guilds/:guild_id/commands/:command_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_guild_application_commandParams,
    response: {
      200: 'ApplicationCommandResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_guild_application_command',
      security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
    },
  })
  .delete(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: ApplicationsModel.delete_guild_application_commandParams,
      response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
      detail: {
        tags: [],
        operationId: 'delete_guild_application_command',
        security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
      },
    },
  )
  .patch(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: ApplicationsModel.update_guild_application_commandParams,
      body: 'ApplicationCommandPatchRequestPartial',
      response: {
        200: 'ApplicationCommandResponse',
        429: 'RatelimitedResponse',
        '4XX': 'ErrorResponse',
      },
      detail: {
        tags: [],
        operationId: 'update_guild_application_command',
        security: [{ BotToken: [] }, { OAuth2: ['applications.commands.update'] }],
      },
    },
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: ApplicationsModel.get_guild_application_command_permissionsParams,
      response: {
        200: 'CommandPermissionsResponse',
        429: 'RatelimitedResponse',
        '4XX': 'ErrorResponse',
      },
      detail: {
        tags: [],
        operationId: 'get_guild_application_command_permissions',
        security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
      },
    },
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: ApplicationsModel.set_guild_application_command_permissionsParams,
      body: ApplicationsModel.set_guild_application_command_permissionsBody,
      response: {
        200: 'CommandPermissionsResponse',
        429: 'RatelimitedResponse',
        '4XX': 'ErrorResponse',
      },
      detail: {
        tags: [],
        operationId: 'set_guild_application_command_permissions',
        security: [{ BotToken: [] }, { OAuth2: ['applications.commands.permissions.update'] }],
      },
    },
  )
  .get('/applications/:application_id/role-connections/metadata', ({ params }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.get_application_role_connections_metadataParams,
    response: {
      200: ApplicationsModel.get_application_role_connections_metadataResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_application_role_connections_metadata',
      security: [{ BotToken: [] }],
    },
  })
  .put('/applications/:application_id/role-connections/metadata', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ApplicationsModel.update_application_role_connections_metadataParams,
    body: ApplicationsModel.update_application_role_connections_metadataBody,
    response: {
      200: ApplicationsModel.update_application_role_connections_metadataResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'update_application_role_connections_metadata',
      security: [{ BotToken: [] }],
    },
  })
