import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VaultListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          metadata: Schema.optional(
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
          status: Schema.optional(
            Schema.Union([
              VaultStatusParamSchema,
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(
                  Schema.Array(VaultStatusParamSchema).check(
                    Schema.isMinLength(0),
                    Schema.isMaxLength(16384),
                  ),
                ),
              ),
            ]).annotate({
              description:
                'One or more lifecycle statuses to include when listing vaults or credentials.',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VaultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateVaultParamsSchema)),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VaultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VaultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateVaultParamsSchema)),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(DeletedVaultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(VaultCredentialListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          metadata: Schema.optional(
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
          status: Schema.optional(
            Schema.Union([
              VaultStatusParamSchema,
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(
                  Schema.Array(VaultStatusParamSchema).check(
                    Schema.isMinLength(0),
                    Schema.isMaxLength(16384),
                  ),
                ),
              ),
            ]).annotate({
              description:
                'One or more lifecycle statuses to include when listing vaults or credentials.',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(VaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(CreateVaultCredentialParamsSchema)),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(VaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          credential_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(VaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          credential_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(RotateVaultCredentialParamsSchema)),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(DeletedVaultCredentialResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '404': {
          description: 'The requested vault or credential was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '409': {
          description: 'The request conflicted with the current vault state.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponse2Schema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          vault_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          credential_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
