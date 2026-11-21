import { Elysia } from 'elysia'
import {
  CreateMcpOauthRefreshParamSchema,
  CreateMcpOauthTokenEndpointAuthParamSchema,
  CreateMcpOauthTokenEndpointAuthParamClientSecretBasicSchema,
  CreateMcpOauthTokenEndpointAuthParamClientSecretPostSchema,
  CreateMcpOauthTokenEndpointAuthParamNoneSchema,
  CreateVaultCredentialAuthParamSchema,
  CreateVaultCredentialAuthParamEnvironmentVariableSchema,
  CreateVaultCredentialAuthParamMcpOauthSchema,
  CreateVaultCredentialAuthParamStaticBearerSchema,
  CreateVaultCredentialParamsSchema,
  CreateVaultParamsSchema,
  DeletedVaultCredentialResourceSchema,
  DeletedVaultResourceSchema,
  ErrorBodyResourceSchema,
  ErrorResponse2Schema,
  ListOrderParamSchema,
  McpOauthRefreshResourceSchema,
  McpOauthTokenEndpointAuthResourceSchema,
  McpOauthTokenEndpointAuthResourceClientSecretBasicSchema,
  McpOauthTokenEndpointAuthResourceClientSecretPostSchema,
  McpOauthTokenEndpointAuthResourceNoneSchema,
  RotateMcpOauthRefreshParamSchema,
  RotateMcpOauthTokenEndpointAuthParamSchema,
  RotateMcpOauthTokenEndpointAuthParamClientSecretBasicSchema,
  RotateMcpOauthTokenEndpointAuthParamClientSecretPostSchema,
  RotateVaultCredentialAuthParamSchema,
  RotateVaultCredentialAuthParamEnvironmentVariableSchema,
  RotateVaultCredentialAuthParamMcpOauthSchema,
  RotateVaultCredentialAuthParamStaticBearerSchema,
  RotateVaultCredentialParamsSchema,
  UpdateVaultParamsSchema,
  VaultCredentialAuthResourceSchema,
  VaultCredentialAuthResourceEnvironmentVariableSchema,
  VaultCredentialAuthResourceMcpOauthSchema,
  VaultCredentialAuthResourceStaticBearerSchema,
  VaultCredentialListResourceSchema,
  VaultCredentialNetworkingParamSchema,
  VaultCredentialNetworkingParamLimitedSchema,
  VaultCredentialNetworkingParamUnrestrictedSchema,
  VaultCredentialNetworkingResourceSchema,
  VaultCredentialNetworkingResourceLimitedSchema,
  VaultCredentialNetworkingResourceUnrestrictedSchema,
  VaultCredentialResourceSchema,
  VaultListResourceSchema,
  VaultResourceSchema,
  VaultStatusFilterParamSchema,
  VaultStatusParamSchema,
} from '../../components/schemas'
import { VaultsModel } from './model'

export const vaults = new Elysia()
  .model({
    CreateMcpOauthRefreshParam: CreateMcpOauthRefreshParamSchema,
    CreateMcpOauthTokenEndpointAuthParam: CreateMcpOauthTokenEndpointAuthParamSchema,
    CreateMcpOauthTokenEndpointAuthParamClientSecretBasic:
      CreateMcpOauthTokenEndpointAuthParamClientSecretBasicSchema,
    CreateMcpOauthTokenEndpointAuthParamClientSecretPost:
      CreateMcpOauthTokenEndpointAuthParamClientSecretPostSchema,
    CreateMcpOauthTokenEndpointAuthParamNone: CreateMcpOauthTokenEndpointAuthParamNoneSchema,
    CreateVaultCredentialAuthParam: CreateVaultCredentialAuthParamSchema,
    CreateVaultCredentialAuthParamEnvironmentVariable:
      CreateVaultCredentialAuthParamEnvironmentVariableSchema,
    CreateVaultCredentialAuthParamMcpOauth: CreateVaultCredentialAuthParamMcpOauthSchema,
    CreateVaultCredentialAuthParamStaticBearer: CreateVaultCredentialAuthParamStaticBearerSchema,
    CreateVaultCredentialParams: CreateVaultCredentialParamsSchema,
    CreateVaultParams: CreateVaultParamsSchema,
    DeletedVaultCredentialResource: DeletedVaultCredentialResourceSchema,
    DeletedVaultResource: DeletedVaultResourceSchema,
    ErrorBodyResource: ErrorBodyResourceSchema,
    ErrorResponse2: ErrorResponse2Schema,
    ListOrderParam: ListOrderParamSchema,
    McpOauthRefreshResource: McpOauthRefreshResourceSchema,
    McpOauthTokenEndpointAuthResource: McpOauthTokenEndpointAuthResourceSchema,
    McpOauthTokenEndpointAuthResourceClientSecretBasic:
      McpOauthTokenEndpointAuthResourceClientSecretBasicSchema,
    McpOauthTokenEndpointAuthResourceClientSecretPost:
      McpOauthTokenEndpointAuthResourceClientSecretPostSchema,
    McpOauthTokenEndpointAuthResourceNone: McpOauthTokenEndpointAuthResourceNoneSchema,
    RotateMcpOauthRefreshParam: RotateMcpOauthRefreshParamSchema,
    RotateMcpOauthTokenEndpointAuthParam: RotateMcpOauthTokenEndpointAuthParamSchema,
    RotateMcpOauthTokenEndpointAuthParamClientSecretBasic:
      RotateMcpOauthTokenEndpointAuthParamClientSecretBasicSchema,
    RotateMcpOauthTokenEndpointAuthParamClientSecretPost:
      RotateMcpOauthTokenEndpointAuthParamClientSecretPostSchema,
    RotateVaultCredentialAuthParam: RotateVaultCredentialAuthParamSchema,
    RotateVaultCredentialAuthParamEnvironmentVariable:
      RotateVaultCredentialAuthParamEnvironmentVariableSchema,
    RotateVaultCredentialAuthParamMcpOauth: RotateVaultCredentialAuthParamMcpOauthSchema,
    RotateVaultCredentialAuthParamStaticBearer: RotateVaultCredentialAuthParamStaticBearerSchema,
    RotateVaultCredentialParams: RotateVaultCredentialParamsSchema,
    UpdateVaultParams: UpdateVaultParamsSchema,
    VaultCredentialAuthResource: VaultCredentialAuthResourceSchema,
    VaultCredentialAuthResourceEnvironmentVariable:
      VaultCredentialAuthResourceEnvironmentVariableSchema,
    VaultCredentialAuthResourceMcpOauth: VaultCredentialAuthResourceMcpOauthSchema,
    VaultCredentialAuthResourceStaticBearer: VaultCredentialAuthResourceStaticBearerSchema,
    VaultCredentialListResource: VaultCredentialListResourceSchema,
    VaultCredentialNetworkingParam: VaultCredentialNetworkingParamSchema,
    VaultCredentialNetworkingParamLimited: VaultCredentialNetworkingParamLimitedSchema,
    VaultCredentialNetworkingParamUnrestricted: VaultCredentialNetworkingParamUnrestrictedSchema,
    VaultCredentialNetworkingResource: VaultCredentialNetworkingResourceSchema,
    VaultCredentialNetworkingResourceLimited: VaultCredentialNetworkingResourceLimitedSchema,
    VaultCredentialNetworkingResourceUnrestricted:
      VaultCredentialNetworkingResourceUnrestrictedSchema,
    VaultCredentialResource: VaultCredentialResourceSchema,
    VaultListResource: VaultListResourceSchema,
    VaultResource: VaultResourceSchema,
    VaultStatusFilterParam: VaultStatusFilterParamSchema,
    VaultStatusParam: VaultStatusParamSchema,
  })
  .get('/vaults', ({ query }) => {}, {
    query: VaultsModel.listVaultsQuery,
    response: {
      200: 'VaultListResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'List vaults',
      description:
        'Lists vaults using ID-based pagination. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'listVaults',
    },
  })
  .post('/vaults', ({ body }) => {}, {
    body: 'CreateVaultParams',
    response: {
      201: 'VaultResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Create a vault',
      description:
        'Creates a vault for the current project. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'createVault',
    },
  })
  .get('/vaults/:vault_id', ({ params }) => {}, {
    params: VaultsModel.retrieveVaultParams,
    response: {
      200: 'VaultResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Retrieve a vault',
      description:
        'Retrieves a vault by its ID. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'retrieveVault',
    },
  })
  .post('/vaults/:vault_id', ({ params, body }) => {}, {
    params: VaultsModel.updateVaultParams,
    body: 'UpdateVaultParams',
    response: {
      200: 'VaultResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Update a vault',
      description:
        'Updates the name or metadata of an active vault. Omitted fields remain unchanged. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'updateVault',
    },
  })
  .delete('/vaults/:vault_id', ({ params }) => {}, {
    params: VaultsModel.deleteVaultParams,
    response: {
      200: 'DeletedVaultResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Delete a vault',
      description:
        'Deletes a vault and all its credentials. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'deleteVault',
    },
  })
  .get('/vaults/:vault_id/credentials', ({ params, query }) => {}, {
    params: VaultsModel.listVaultCredentialsParams,
    query: VaultsModel.listVaultCredentialsQuery,
    response: {
      200: 'VaultCredentialListResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'List vault credentials',
      description:
        "Lists a vault's credentials using ID-based pagination without returning secret values. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).",
      operationId: 'listVaultCredentials',
    },
  })
  .post('/vaults/:vault_id/credentials', ({ params, body }) => {}, {
    params: VaultsModel.createVaultCredentialParams,
    body: 'CreateVaultCredentialParams',
    response: {
      201: 'VaultCredentialResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Create a vault credential',
      description:
        'Creates a vault credential. Secret values are write-only and are never returned. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'createVaultCredential',
    },
  })
  .get('/vaults/:vault_id/credentials/:credential_id', ({ params }) => {}, {
    params: VaultsModel.retrieveVaultCredentialParams,
    response: {
      200: 'VaultCredentialResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Retrieve a vault credential',
      description:
        'Retrieves vault credential metadata without returning secret values. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'retrieveVaultCredential',
    },
  })
  .post('/vaults/:vault_id/credentials/:credential_id', ({ params, body }) => {}, {
    params: VaultsModel.rotateVaultCredentialParams,
    body: 'RotateVaultCredentialParams',
    response: {
      200: 'VaultCredentialResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Update a vault credential',
      description:
        'Updates credential metadata or rotates its write-only secret. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'rotateVaultCredential',
    },
  })
  .delete('/vaults/:vault_id/credentials/:credential_id', ({ params }) => {}, {
    params: VaultsModel.deleteVaultCredentialParams,
    response: {
      200: 'DeletedVaultCredentialResource',
      400: 'ErrorResponse2',
      401: 'ErrorResponse2',
      403: 'ErrorResponse2',
      404: 'ErrorResponse2',
      409: 'ErrorResponse2',
      500: 'ErrorResponse2',
      503: 'ErrorResponse2',
    },
    detail: {
      tags: ['Vaults'],
      summary: 'Delete a vault credential',
      description:
        'Deletes a vault credential. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      operationId: 'deleteVaultCredential',
    },
  })
