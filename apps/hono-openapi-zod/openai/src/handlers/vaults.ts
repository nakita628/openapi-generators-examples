import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  ListOrderParamSchema,
  ErrorResponse2Schema,
  VaultStatusParamSchema,
  VaultResourceSchema,
  VaultListResourceSchema,
  CreateVaultParamsSchema,
  UpdateVaultParamsSchema,
  DeletedVaultResourceSchema,
  VaultCredentialResourceSchema,
  VaultCredentialListResourceSchema,
  CreateVaultCredentialParamsSchema,
  RotateVaultCredentialParamsSchema,
  DeletedVaultCredentialResourceSchema,
} from '../components'

export const vaultsHandler = new Hono()
  .get(
    '/vaults',
    describeRoute({
      operationId: 'listVaults',
      summary: 'List vaults',
      description:
        'Lists vaults using ID-based pagination. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'A page of vaults.',
          content: { 'application/json': { schema: resolver(VaultListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        metadata: z.record(z.string(), z.string().min(0).max(512)).exactOptional(),
        status: z
          .union([
            VaultStatusParamSchema,
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z.array(VaultStatusParamSchema).min(0).max(16384),
            ),
          ])
          .meta({
            description:
              'One or more lifecycle statuses to include when listing vaults or credentials.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults',
    describeRoute({
      operationId: 'createVault',
      summary: 'Create a vault',
      description:
        'Creates a vault for the current project. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '201': {
          description: 'The created vault.',
          content: { 'application/json': { schema: resolver(VaultResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('json', CreateVaultParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id',
    describeRoute({
      operationId: 'retrieveVault',
      summary: 'Retrieve a vault',
      description:
        'Retrieves a vault by its ID. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'The requested vault.',
          content: { 'application/json': { schema: resolver(VaultResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id',
    describeRoute({
      operationId: 'updateVault',
      summary: 'Update a vault',
      description:
        'Updates the name or metadata of an active vault. Omitted fields remain unchanged. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'The updated vault.',
          content: { 'application/json': { schema: resolver(VaultResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    validator('json', UpdateVaultParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vaults/:vault_id',
    describeRoute({
      operationId: 'deleteVault',
      summary: 'Delete a vault',
      description:
        'Deletes a vault and all its credentials. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'The deleted vault.',
          content: { 'application/json': { schema: resolver(DeletedVaultResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id/credentials',
    describeRoute({
      operationId: 'listVaultCredentials',
      summary: 'List vault credentials',
      description:
        "Lists a vault's credentials using ID-based pagination without returning secret values. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).",
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'A page of vault credentials.',
          content: { 'application/json': { schema: resolver(VaultCredentialListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    validator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        metadata: z.record(z.string(), z.string().min(0).max(512)).exactOptional(),
        status: z
          .union([
            VaultStatusParamSchema,
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z.array(VaultStatusParamSchema).min(0).max(16384),
            ),
          ])
          .meta({
            description:
              'One or more lifecycle statuses to include when listing vaults or credentials.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id/credentials',
    describeRoute({
      operationId: 'createVaultCredential',
      summary: 'Create a vault credential',
      description:
        'Creates a vault credential. Secret values are write-only and are never returned. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '201': {
          description: 'The created vault credential without secret values.',
          content: { 'application/json': { schema: resolver(VaultCredentialResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    validator('json', CreateVaultCredentialParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    describeRoute({
      operationId: 'retrieveVaultCredential',
      summary: 'Retrieve a vault credential',
      description:
        'Retrieves vault credential metadata without returning secret values. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'The requested vault credential without secret values.',
          content: { 'application/json': { schema: resolver(VaultCredentialResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    describeRoute({
      operationId: 'rotateVaultCredential',
      summary: 'Update a vault credential',
      description:
        'Updates credential metadata or rotates its write-only secret. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'The updated vault credential without secret values.',
          content: { 'application/json': { schema: resolver(VaultCredentialResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    ),
    validator('json', RotateVaultCredentialParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    describeRoute({
      operationId: 'deleteVaultCredential',
      summary: 'Delete a vault credential',
      description:
        'Deletes a vault credential. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
      tags: ['Vaults'],
      responses: {
        '200': {
          description: 'The deleted vault credential.',
          content: {
            'application/json': { schema: resolver(DeletedVaultCredentialResourceSchema) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
