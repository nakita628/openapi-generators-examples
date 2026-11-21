import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults',
    sValidator('json', Schema.toStandardSchemaV1(CreateVaultParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id',
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id',
    sValidator(
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
    sValidator('json', Schema.toStandardSchemaV1(UpdateVaultParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vaults/:vault_id',
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id/credentials',
    sValidator(
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
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id/credentials',
    sValidator(
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
    sValidator('json', Schema.toStandardSchemaV1(CreateVaultCredentialParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
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
    sValidator('json', Schema.toStandardSchemaV1(RotateVaultCredentialParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    sValidator(
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
    (c) => { throw new Error('Not implemented') },
  )
