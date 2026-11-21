import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getVaults = os.getVaults.handler(async ({ input }) => {})
export const postVaults = os.postVaults.handler(async ({ input }) => {})
export const getVaultsVaultId = os.getVaultsVaultId.handler(async ({ input }) => {})
export const postVaultsVaultId = os.postVaultsVaultId.handler(async ({ input }) => {})
export const deleteVaultsVaultId = os.deleteVaultsVaultId.handler(async ({ input }) => {})
export const getVaultsVaultIdCredentials = os.getVaultsVaultIdCredentials.handler(
  async ({ input }) => {},
)
export const postVaultsVaultIdCredentials = os.postVaultsVaultIdCredentials.handler(
  async ({ input }) => {},
)
export const getVaultsVaultIdCredentialsCredentialId =
  os.getVaultsVaultIdCredentialsCredentialId.handler(async ({ input }) => {})
export const postVaultsVaultIdCredentialsCredentialId =
  os.postVaultsVaultIdCredentialsCredentialId.handler(async ({ input }) => {})
export const deleteVaultsVaultIdCredentialsCredentialId =
  os.deleteVaultsVaultIdCredentialsCredentialId.handler(async ({ input }) => {})
