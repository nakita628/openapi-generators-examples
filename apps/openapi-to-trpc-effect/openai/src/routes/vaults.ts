import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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

const t = initTRPC.create()

export const vaultsRouter = t.router({
  getVaults: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
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
          status: Schema.optional(VaultStatusFilterParamSchema),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        VaultListResourceSchema.annotate({ description: 'A page of vaults.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaults: t.procedure
    .input(Schema.toStandardSchemaV1(CreateVaultParamsSchema))
    .output(Schema.toStandardSchemaV1(VaultResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultId: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(VaultResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultId: t.procedure
    .input(
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
            ).annotate({
              description:
                'Replaces all metadata. Omit to leave unchanged, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
            }),
          ),
          name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 1048576, {
                  expected: 'a string of at most 1048576 characters',
                }),
              ),
            ).annotate({
              description:
                'A replacement name. Omit to leave unchanged, or pass null to clear it. The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VaultResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVaultsVaultId: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(DeletedVaultResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultIdCredentials: t.procedure
    .input(
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
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
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
          status: Schema.optional(VaultStatusFilterParamSchema),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        VaultCredentialListResourceSchema.annotate({
          description: 'A page of credentials in a vault.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultIdCredentials: t.procedure
    .input(
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
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ).annotate({
            description:
              'The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
          }),
          auth: CreateVaultCredentialAuthParamSchema.annotate({
            description: 'The authentication method and write-only secret values to store.',
          }),
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
            ).annotate({
              description:
                'Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters. Defaults to an empty map.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VaultCredentialResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(VaultCredentialResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
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
          auth: Schema.optional(
            RotateVaultCredentialAuthParamSchema.annotate({
              description:
                "Replacement values for the credential's existing authentication method.",
            }),
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
            ).annotate({
              description:
                'Replaces all metadata. Omit to preserve it, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VaultCredentialResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(DeletedVaultCredentialResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
