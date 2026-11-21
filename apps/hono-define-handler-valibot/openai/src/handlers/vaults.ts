import { Hono } from 'hono'
import {
  getVaultsHandler,
  postVaultsHandler,
  getVaultsVaultIdHandler,
  postVaultsVaultIdHandler,
  deleteVaultsVaultIdHandler,
  getVaultsVaultIdCredentialsHandler,
  postVaultsVaultIdCredentialsHandler,
  getVaultsVaultIdCredentialsCredentialIdHandler,
  postVaultsVaultIdCredentialsCredentialIdHandler,
  deleteVaultsVaultIdCredentialsCredentialIdHandler,
} from '../routes'

export const vaultsHandler = new Hono()
  .get(
    '/vaults',
    getVaultsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vaults',
    postVaultsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vaults/:vault_id',
    getVaultsVaultIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vaults/:vault_id',
    postVaultsVaultIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/vaults/:vault_id',
    deleteVaultsVaultIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vaults/:vault_id/credentials',
    getVaultsVaultIdCredentialsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vaults/:vault_id/credentials',
    postVaultsVaultIdCredentialsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vaults/:vault_id/credentials/:credential_id',
    getVaultsVaultIdCredentialsCredentialIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vaults/:vault_id/credentials/:credential_id',
    postVaultsVaultIdCredentialsCredentialIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/vaults/:vault_id/credentials/:credential_id',
    deleteVaultsVaultIdCredentialsCredentialIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
