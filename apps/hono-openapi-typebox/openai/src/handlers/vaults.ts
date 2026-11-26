import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ListOrderParamSchema,
  ErrorResponse2Schema,
  VaultStatusFilterParamSchema,
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

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VaultListResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          metadata: Type.Optional(
            Type.Record(Type.String(), Type.String({ minLength: 0, maxLength: 512 }), {
              minProperties: 0,
              maxProperties: 16,
              propertyNames: Type.String({ minLength: 1, maxLength: 64 }),
            }),
          ),
          status: Type.Optional(VaultStatusFilterParamSchema),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VaultResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateVaultParamsSchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VaultResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VaultResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(UpdateVaultParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedVaultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(VaultCredentialListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          metadata: Type.Optional(
            Type.Record(Type.String(), Type.String({ minLength: 0, maxLength: 512 }), {
              minProperties: 0,
              maxProperties: 16,
              propertyNames: Type.String({ minLength: 1, maxLength: 64 }),
            }),
          ),
          status: Type.Optional(VaultStatusFilterParamSchema),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(VaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(CreateVaultCredentialParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(VaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          vault_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          credential_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(VaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          vault_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          credential_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(RotateVaultCredentialParamsSchema)),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedVaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          vault_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          credential_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
