import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const vaultsRouter = t.router({
  getVaults: t.procedure
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        metadata: v.optional(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
        status: v.optional(VaultStatusFilterParamSchema),
      }),
    )
    .output(v.pipe(VaultListResourceSchema, v.description('A page of vaults.')))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaults: t.procedure
    .input(CreateVaultParamsSchema)
    .output(VaultResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultId: t.procedure
    .input(v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
    .output(VaultResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVaultsVaultId: t.procedure
    .input(v.object({ vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
    .output(DeletedVaultResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultIdCredentials: t.procedure
    .input(
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        metadata: v.optional(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
        status: v.optional(VaultStatusFilterParamSchema),
      }),
    )
    .output(
      v.pipe(VaultCredentialListResourceSchema, v.description('A page of credentials in a vault.')),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultIdCredentials: t.procedure
    .input(
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        name: v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1048576)),
          v.description(
            'The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.',
          ),
        ),
        auth: v.pipe(
          CreateVaultCredentialAuthParamSchema,
          v.description('The authentication method and write-only secret values to store.'),
        ),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(VaultCredentialResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        auth: v.optional(
          v.pipe(
            RotateVaultCredentialAuthParamSchema,
            v.description(
              "Replacement values for the credential's existing authentication method.",
            ),
          ),
        ),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
      v.object({
        vault_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        credential_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(DeletedVaultCredentialResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
