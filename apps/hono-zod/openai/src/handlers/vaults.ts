import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  ListOrderParamSchema,
  VaultStatusParamSchema,
  CreateVaultParamsSchema,
  UpdateVaultParamsSchema,
  CreateVaultCredentialParamsSchema,
  RotateVaultCredentialParamsSchema,
} from '../components'

export const vaultsHandler = new Hono()
  .get(
    '/vaults',
    sValidator(
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
    (c) => {},
  )
  .post('/vaults', sValidator('json', CreateVaultParamsSchema), (c) => {})
  .get(
    '/vaults/:vault_id',
    sValidator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id',
    sValidator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    sValidator('json', UpdateVaultParamsSchema),
    (c) => {},
  )
  .delete(
    '/vaults/:vault_id',
    sValidator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    (c) => {},
  )
  .get(
    '/vaults/:vault_id/credentials',
    sValidator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    sValidator(
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
    (c) => {},
  )
  .post(
    '/vaults/:vault_id/credentials',
    sValidator('param', z.object({ vault_id: z.string().min(0).max(1048576) })),
    sValidator('json', CreateVaultCredentialParamsSchema),
    (c) => {},
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    ),
    sValidator('json', RotateVaultCredentialParamsSchema),
    (c) => {},
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => {},
  )
