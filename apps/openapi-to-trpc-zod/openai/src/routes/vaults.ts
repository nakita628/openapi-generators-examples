import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const vaultsRouter = t.router({
  getVaults: t.procedure
    .input(
      z.object({
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        metadata: z.record(z.string(), z.string().min(0).max(512)).exactOptional(),
        status: VaultStatusFilterParamSchema.exactOptional(),
      }),
    )
    .output(VaultListResourceSchema.meta({ description: 'A page of vaults.' }))
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
    .input(z.object({ vault_id: z.string().min(0).max(1048576) }))
    .output(VaultResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVaultsVaultId: t.procedure
    .input(z.object({ vault_id: z.string().min(0).max(1048576) }))
    .output(DeletedVaultResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultIdCredentials: t.procedure
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        metadata: z.record(z.string(), z.string().min(0).max(512)).exactOptional(),
        status: VaultStatusFilterParamSchema.exactOptional(),
      }),
    )
    .output(
      VaultCredentialListResourceSchema.meta({ description: 'A page of credentials in a vault.' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultIdCredentials: t.procedure
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
        auth: CreateVaultCredentialAuthParamSchema.meta({
          description: 'The authentication method and write-only secret values to store.',
        }),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    )
    .output(VaultCredentialResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
        auth: RotateVaultCredentialAuthParamSchema.meta({
          description: "Replacement values for the credential's existing authentication method.",
        }).exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteVaultsVaultIdCredentialsCredentialId: t.procedure
    .input(
      z.object({
        vault_id: z.string().min(0).max(1048576),
        credential_id: z.string().min(0).max(1048576),
      }),
    )
    .output(DeletedVaultCredentialResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
