import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata =
  os.putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const postPartnerSdkProvisionalAccountsUnmerge =
  os.postPartnerSdkProvisionalAccountsUnmerge.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postPartnerSdkProvisionalAccountsUnmergeBot =
  os.postPartnerSdkProvisionalAccountsUnmergeBot.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postPartnerSdkToken = os.postPartnerSdkToken.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postPartnerSdkTokenBot = os.postPartnerSdkTokenBot.handler(async ({ input }) => { throw new Error('Not implemented') })
