import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  CreateVaultCredentialAuthParamSchema,
  CreateVaultParamsSchema,
  DeletedVaultCredentialResourceSchema,
  DeletedVaultResourceSchema,
  ListOrderParamSchema,
  RotateVaultCredentialAuthParamSchema,
  VaultCredentialListResourceSchema,
  VaultCredentialResourceSchema,
  VaultListResourceSchema,
  VaultResourceSchema,
  VaultStatusFilterParamSchema,
} from '../components'

export const getVaults = os
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
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      metadata: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
      ),
      status: v.optional(VaultStatusFilterParamSchema),
    }),
  )
  .output(VaultListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVaults = os
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
  .output(VaultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVaultsVaultId = os
  .route({
    method: 'GET',
    path: '/vaults/{vault_id}',
    tags: ['Vaults'],
    summary: 'Retrieve a vault',
    description:
      'Retrieves a vault by its ID. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
    successDescription: 'The requested vault.',
  })
  .input(v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
  .output(VaultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVaultsVaultId = os
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
    v.object({
      vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      metadata: v.optional(
        v.pipe(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
          v.description(
            'Replaces all metadata. Omit to leave unchanged, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          ),
        ),
      ),
      name: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1048576))),
          v.description(
            'A replacement name. Omit to leave unchanged, or pass null to clear it. The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
          ),
        ),
      ),
    }),
  )
  .output(VaultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteVaultsVaultId = os
  .route({
    method: 'DELETE',
    path: '/vaults/{vault_id}',
    tags: ['Vaults'],
    summary: 'Delete a vault',
    description:
      'Deletes a vault and all its credentials. See [vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults).',
    successDescription: 'The deleted vault.',
  })
  .input(v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
  .output(DeletedVaultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVaultsVaultIdCredentials = os
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
    v.object({
      vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      metadata: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
      ),
      status: v.optional(VaultStatusFilterParamSchema),
    }),
  )
  .output(VaultCredentialListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVaultsVaultIdCredentials = os
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
    v.object({
      vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      name: v.pipe(
        v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1048576)),
        v.description(
          'The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
        ),
      ),
      auth: CreateVaultCredentialAuthParamSchema,
      metadata: v.optional(
        v.pipe(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
          v.description(
            'Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters. Defaults to an empty map.',
          ),
        ),
      ),
    }),
  )
  .output(VaultCredentialResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVaultsVaultIdCredentialsCredentialId = os
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
    v.object({
      vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(VaultCredentialResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVaultsVaultIdCredentialsCredentialId = os
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
    v.object({
      vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      auth: v.optional(RotateVaultCredentialAuthParamSchema),
      metadata: v.optional(
        v.pipe(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
          v.description(
            'Replaces all metadata. Omit to preserve it, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          ),
        ),
      ),
    }),
  )
  .output(VaultCredentialResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteVaultsVaultIdCredentialsCredentialId = os
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
    v.object({
      vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(DeletedVaultCredentialResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
