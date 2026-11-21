import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      'limit?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
      'order?': ListOrderParamSchema,
      'after?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'metadata?': type('unknown').pipe(
        (data) => {
          if (typeof data !== 'object' || data === null || Array.isArray(data)) return data
          const out = Object.entries(data).reduce<{ [k: string]: unknown }>((acc, [key, value]) => {
            const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
            return name === undefined ? acc : { ...acc, [name]: value }
          }, {})
          return Object.keys(out).length > 0 ? out : data
        },
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
      ),
      'status?': VaultStatusFilterParamSchema,
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
  .input(
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'metadata?': type({
        '[string]': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
      }).describe(
        'Replaces all metadata. Omit to leave unchanged, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
      ),
      'name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      )
        .or('null')
        .describe(
          'A replacement name. Omit to leave unchanged, or pass null to clear it. The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
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
  .input(
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'limit?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
      'order?': ListOrderParamSchema,
      'after?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'metadata?': type('unknown').pipe(
        (data) => {
          if (typeof data !== 'object' || data === null || Array.isArray(data)) return data
          const out = Object.entries(data).reduce<{ [k: string]: unknown }>((acc, [key, value]) => {
            const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
            return name === undefined ? acc : { ...acc, [name]: value }
          }, {})
          return Object.keys(out).length > 0 ? out : data
        },
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
      ),
      'status?': VaultStatusFilterParamSchema,
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
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        )
        .describe(
          'The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
        ),
      auth: CreateVaultCredentialAuthParamSchema,
      'metadata?': type({
        '[string]': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
      }).describe(
        'Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters. Defaults to an empty map.',
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
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      credential_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      credential_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'auth?': RotateVaultCredentialAuthParamSchema,
      'metadata?': type({
        '[string]': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
      }).describe(
        'Replaces all metadata. Omit to preserve it, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
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
    type({
      vault_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      credential_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
  .output(DeletedVaultCredentialResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
