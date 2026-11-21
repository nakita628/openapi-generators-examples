import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
        'metadata?': type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
        'status?': type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              VaultStatusParamSchema,
              type('unknown').pipe(
                (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                type(type(VaultStatusParamSchema).array()).and(type('0 <= unknown[] <= 16384')),
              ),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            'One or more lifecycle statuses to include when listing vaults or credentials.',
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
      type({
        vault_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id',
    sValidator(
      'param',
      type({
        vault_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    sValidator('json', UpdateVaultParamsSchema),
    (c) => {},
  )
  .delete(
    '/vaults/:vault_id',
    sValidator(
      'param',
      type({
        vault_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/vaults/:vault_id/credentials',
    sValidator(
      'param',
      type({
        vault_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    sValidator(
      'query',
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
        'metadata?': type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
        'status?': type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              VaultStatusParamSchema,
              type('unknown').pipe(
                (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                type(type(VaultStatusParamSchema).array()).and(type('0 <= unknown[] <= 16384')),
              ),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            'One or more lifecycle statuses to include when listing vaults or credentials.',
          ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id/credentials',
    sValidator(
      'param',
      type({
        vault_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    sValidator('json', CreateVaultCredentialParamsSchema),
    (c) => {},
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
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
    ),
    (c) => {},
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
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
    ),
    sValidator('json', RotateVaultCredentialParamsSchema),
    (c) => {},
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
      'param',
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
    ),
    (c) => {},
  )
