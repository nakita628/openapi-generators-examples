import { t, type UnwrapSchema } from 'elysia'

export const VaultsModel = {
  listVaultsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(
      t.UnionEnum(['asc', 'desc'], {
        description: 'The order in which paginated resources are returned.',
        default: 'desc',
      }),
    ),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    metadata: t.Optional(
      t.Record(t.String(), t.String({ minLength: 0, maxLength: 512 }), {
        minProperties: 0,
        maxProperties: 16,
      }),
    ),
    status: t.Optional(
      t.Union(
        [
          t.UnionEnum(['active', 'archived'], {
            description: 'Whether a vault or credential is active or archived.',
            default: undefined,
          }),
          t.Array(
            t.UnionEnum(['active', 'archived'], {
              description: 'Whether a vault or credential is active or archived.',
              default: undefined,
            }),
            { minItems: 0, maxItems: 16384 },
          ),
        ],
        {
          description:
            'One or more lifecycle statuses to include when listing vaults or credentials.',
        },
      ),
    ),
  }),
  retrieveVaultParams: t.Object({ vault_id: t.String({ minLength: 0, maxLength: 1048576 }) }),
  updateVaultParams: t.Object({ vault_id: t.String({ minLength: 0, maxLength: 1048576 }) }),
  deleteVaultParams: t.Object({ vault_id: t.String({ minLength: 0, maxLength: 1048576 }) }),
  listVaultCredentialsParams: t.Object({
    vault_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listVaultCredentialsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(
      t.UnionEnum(['asc', 'desc'], {
        description: 'The order in which paginated resources are returned.',
        default: 'desc',
      }),
    ),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    metadata: t.Optional(
      t.Record(t.String(), t.String({ minLength: 0, maxLength: 512 }), {
        minProperties: 0,
        maxProperties: 16,
      }),
    ),
    status: t.Optional(
      t.Union(
        [
          t.UnionEnum(['active', 'archived'], {
            description: 'Whether a vault or credential is active or archived.',
            default: undefined,
          }),
          t.Array(
            t.UnionEnum(['active', 'archived'], {
              description: 'Whether a vault or credential is active or archived.',
              default: undefined,
            }),
            { minItems: 0, maxItems: 16384 },
          ),
        ],
        {
          description:
            'One or more lifecycle statuses to include when listing vaults or credentials.',
        },
      ),
    ),
  }),
  createVaultCredentialParams: t.Object({
    vault_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  retrieveVaultCredentialParams: t.Object({
    vault_id: t.String({ minLength: 0, maxLength: 1048576 }),
    credential_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  rotateVaultCredentialParams: t.Object({
    vault_id: t.String({ minLength: 0, maxLength: 1048576 }),
    credential_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  deleteVaultCredentialParams: t.Object({
    vault_id: t.String({ minLength: 0, maxLength: 1048576 }),
    credential_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
} as const

export type VaultsModel = { [k in keyof typeof VaultsModel]: UnwrapSchema<(typeof VaultsModel)[k]> }
