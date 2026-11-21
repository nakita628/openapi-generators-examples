import { Elysia, t } from 'elysia'
import {
  AccountResponseSchema,
  ApplicationUserRoleConnectionResponseSchema,
  AvailableLocalesEnumSchema,
  BotAccountPatchRequestSchema,
  ChannelTypesSchema,
  ConnectedAccountGuildResponseSchema,
  ConnectedAccountIntegrationResponseSchema,
  ConnectedAccountProvidersSchema,
  ConnectedAccountResponseSchema,
  ConnectedAccountVisibilitySchema,
  CreatePrivateChannelRequestSchema,
  EntitlementResponseSchema,
  EntitlementTenantFulfillmentStatusResponseSchema,
  EntitlementTypesSchema,
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  GuildFeaturesSchema,
  InnerErrorsSchema,
  Int53TypeSchema,
  IntegrationTypesSchema,
  MyGuildResponseSchema,
  NameplatePaletteSchema,
  PremiumTypesSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
  UpdateApplicationUserRoleConnectionRequestSchema,
  UserAvatarDecorationResponseSchema,
  UserCollectiblesResponseSchema,
  UserNameplateResponseSchema,
  UserPIIResponseSchema,
  UserPrimaryGuildResponseSchema,
  UserResponseSchema,
} from '../../components/schemas'
import { UsersModel } from './model'

export const users = new Elysia()
  .model({
    AccountResponse: AccountResponseSchema,
    ApplicationUserRoleConnectionResponse: ApplicationUserRoleConnectionResponseSchema,
    AvailableLocalesEnum: AvailableLocalesEnumSchema,
    BotAccountPatchRequest: BotAccountPatchRequestSchema,
    ChannelTypes: ChannelTypesSchema,
    ConnectedAccountGuildResponse: ConnectedAccountGuildResponseSchema,
    ConnectedAccountIntegrationResponse: ConnectedAccountIntegrationResponseSchema,
    ConnectedAccountProviders: ConnectedAccountProvidersSchema,
    ConnectedAccountResponse: ConnectedAccountResponseSchema,
    ConnectedAccountVisibility: ConnectedAccountVisibilitySchema,
    CreatePrivateChannelRequest: CreatePrivateChannelRequestSchema,
    EntitlementResponse: EntitlementResponseSchema,
    EntitlementTenantFulfillmentStatusResponse: EntitlementTenantFulfillmentStatusResponseSchema,
    EntitlementTypes: EntitlementTypesSchema,
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    GuildFeatures: GuildFeaturesSchema,
    InnerErrors: InnerErrorsSchema,
    Int53Type: Int53TypeSchema,
    IntegrationTypes: IntegrationTypesSchema,
    MyGuildResponse: MyGuildResponseSchema,
    NameplatePalette: NameplatePaletteSchema,
    PremiumTypes: PremiumTypesSchema,
    PrivateChannelResponse: PrivateChannelResponseSchema,
    PrivateGroupChannelResponse: PrivateGroupChannelResponseSchema,
    PrivateGuildMemberResponse: PrivateGuildMemberResponseSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
    UpdateApplicationUserRoleConnectionRequest: UpdateApplicationUserRoleConnectionRequestSchema,
    UserAvatarDecorationResponse: UserAvatarDecorationResponseSchema,
    UserCollectiblesResponse: UserCollectiblesResponseSchema,
    UserNameplateResponse: UserNameplateResponseSchema,
    UserPIIResponse: UserPIIResponseSchema,
    UserPrimaryGuildResponse: UserPrimaryGuildResponseSchema,
    UserResponse: UserResponseSchema,
  })
  .get('/users/@me', () => {}, {
    response: { 200: 'UserPIIResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'get_my_user',
      security: [{ BotToken: [] }, { OAuth2: ['identify'] }],
    },
  })
  .patch('/users/@me', ({ body }) => {}, {
    body: 'BotAccountPatchRequest',
    response: { 200: 'UserPIIResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'update_my_user', security: [{ BotToken: [] }] },
  })
  .get('/users/@me/applications/:application_id/entitlements', ({ params, query }) => {}, {
    params: UsersModel.get_current_user_application_entitlementsParams,
    query: UsersModel.get_current_user_application_entitlementsQuery,
    response: {
      200: UsersModel.get_current_user_application_entitlementsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_current_user_application_entitlements',
      security: [
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
  .get('/users/@me/applications/:application_id/role-connection', ({ params }) => {}, {
    params: UsersModel.get_application_user_role_connectionParams,
    response: {
      200: 'ApplicationUserRoleConnectionResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_application_user_role_connection',
      security: [{ OAuth2: ['role_connections.write'] }],
    },
  })
  .put('/users/@me/applications/:application_id/role-connection', ({ params, body }) => {}, {
    params: UsersModel.update_application_user_role_connectionParams,
    body: 'UpdateApplicationUserRoleConnectionRequest',
    response: {
      200: 'ApplicationUserRoleConnectionResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'update_application_user_role_connection',
      security: [{ OAuth2: ['role_connections.write'] }],
    },
  })
  .delete('/users/@me/applications/:application_id/role-connection', ({ params }) => {}, {
    params: UsersModel.delete_application_user_role_connectionParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'delete_application_user_role_connection',
      security: [{ OAuth2: ['role_connections.write'] }],
    },
  })
  .post('/users/@me/channels', ({ body }) => {}, {
    body: 'CreatePrivateChannelRequest',
    response: {
      200: UsersModel.create_dmResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'create_dm', security: [{ BotToken: [] }] },
  })
  .get('/users/@me/connections', () => {}, {
    response: {
      200: UsersModel.list_my_connectionsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'list_my_connections',
      security: [{ BotToken: [] }, { OAuth2: ['connections'] }],
    },
  })
  .get('/users/@me/guilds', ({ query }) => {}, {
    query: UsersModel.list_my_guildsQuery,
    response: {
      200: UsersModel.list_my_guildsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'list_my_guilds',
      security: [{ BotToken: [] }, { OAuth2: ['guilds'] }],
    },
  })
  .delete('/users/@me/guilds/:guild_id', ({ params }) => {}, {
    params: UsersModel.leave_guildParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'leave_guild', security: [{ BotToken: [] }] },
  })
  .get('/users/@me/guilds/:guild_id/member', ({ params }) => {}, {
    params: UsersModel.get_my_guild_memberParams,
    response: {
      200: 'PrivateGuildMemberResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_my_guild_member',
      security: [{ OAuth2: ['guilds.members.read'] }],
    },
  })
  .get('/users/:user_id', ({ params }) => {}, {
    params: UsersModel.get_userParams,
    response: { 200: 'UserResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'get_user', security: [{ BotToken: [] }] },
  })
