import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        metadata: v.optional(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
        status: v.optional(
          v.pipe(
            v.union([
              VaultStatusParamSchema,
              v.pipe(
                v.unknown(),
                v.transform((input) =>
                  input === undefined || Array.isArray(input) ? input : [input],
                ),
                v.array(VaultStatusParamSchema),
                v.minLength(0),
                v.maxLength(16384),
              ),
            ]),
            v.description(
              'One or more lifecycle statuses to include when listing vaults or credentials.',
            ),
          ),
        ),
      }),
    ),
    (c) => {},
  )
  .post('/vaults', sValidator('json', CreateVaultParamsSchema), (c) => {})
  .get(
    '/vaults/:vault_id',
    sValidator(
      'param',
      v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id',
    sValidator(
      'param',
      v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator('json', UpdateVaultParamsSchema),
    (c) => {},
  )
  .delete(
    '/vaults/:vault_id',
    sValidator(
      'param',
      v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => {},
  )
  .get(
    '/vaults/:vault_id/credentials',
    sValidator(
      'param',
      v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        metadata: v.optional(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
        status: v.optional(
          v.pipe(
            v.union([
              VaultStatusParamSchema,
              v.pipe(
                v.unknown(),
                v.transform((input) =>
                  input === undefined || Array.isArray(input) ? input : [input],
                ),
                v.array(VaultStatusParamSchema),
                v.minLength(0),
                v.maxLength(16384),
              ),
            ]),
            v.description(
              'One or more lifecycle statuses to include when listing vaults or credentials.',
            ),
          ),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id/credentials',
    sValidator(
      'param',
      v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator('json', CreateVaultCredentialParamsSchema),
    (c) => {},
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator('json', RotateVaultCredentialParamsSchema),
    (c) => {},
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => {},
  )
