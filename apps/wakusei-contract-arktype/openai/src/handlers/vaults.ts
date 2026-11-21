import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getVaults = os.getVaults.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVaults = os.postVaults.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVaultsVaultId = os.getVaultsVaultId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVaultsVaultId = os.postVaultsVaultId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteVaultsVaultId = os.deleteVaultsVaultId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVaultsVaultIdCredentials = os.getVaultsVaultIdCredentials.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postVaultsVaultIdCredentials = os.postVaultsVaultIdCredentials.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getVaultsVaultIdCredentialsCredentialId =
  os.getVaultsVaultIdCredentialsCredentialId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVaultsVaultIdCredentialsCredentialId =
  os.postVaultsVaultIdCredentialsCredentialId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteVaultsVaultIdCredentialsCredentialId =
  os.deleteVaultsVaultIdCredentialsCredentialId.handler(async ({ input }) => { throw new Error('Not implemented') })
