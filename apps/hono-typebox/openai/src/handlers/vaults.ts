import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  ListOrderParamSchema,
  VaultStatusFilterParamSchema,
  CreateVaultParamsSchema,
  UpdateVaultParamsSchema,
  CreateVaultCredentialParamsSchema,
  RotateVaultCredentialParamsSchema,
} from '../components'

export const vaultsHandler = new Hono()
  .get(
    '/vaults',
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .post('/vaults', tbValidator('json', CreateVaultParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/vaults/:vault_id',
    tbValidator(
      'param',
      Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id',
    tbValidator(
      'param',
      Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', UpdateVaultParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vaults/:vault_id',
    tbValidator(
      'param',
      Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id/credentials',
    tbValidator(
      'param',
      Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id/credentials',
    tbValidator(
      'param',
      Type.Object({ vault_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', CreateVaultCredentialParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    tbValidator(
      'param',
      Type.Object({
        vault_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        credential_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    tbValidator(
      'param',
      Type.Object({
        vault_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        credential_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    tbValidator('json', RotateVaultCredentialParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    tbValidator(
      'param',
      Type.Object({
        vault_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        credential_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
