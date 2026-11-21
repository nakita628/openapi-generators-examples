import { os } from '@orpc/server'
import * as z from 'zod'
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
  .input(z.object({ vault_id: z.string().min(0).max(1048576) }))
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
  .input(z.object({ vault_id: z.string().min(0).max(1048576) }))
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
    z.object({
      vault_id: z.string().min(0).max(1048576),
      credential_id: z.string().min(0).max(1048576),
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
    z.object({
      vault_id: z.string().min(0).max(1048576),
      credential_id: z.string().min(0).max(1048576),
    }),
  )
  .output(DeletedVaultCredentialResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
