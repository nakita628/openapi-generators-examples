import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata =
  os.putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata.handler(
    async ({ input }) => {},
  )
export const postPartnerSdkProvisionalAccountsUnmerge =
  os.postPartnerSdkProvisionalAccountsUnmerge.handler(async ({ input }) => {})
export const postPartnerSdkProvisionalAccountsUnmergeBot =
  os.postPartnerSdkProvisionalAccountsUnmergeBot.handler(async ({ input }) => {})
export const postPartnerSdkToken = os.postPartnerSdkToken.handler(async ({ input }) => {})
export const postPartnerSdkTokenBot = os.postPartnerSdkTokenBot.handler(async ({ input }) => {})
