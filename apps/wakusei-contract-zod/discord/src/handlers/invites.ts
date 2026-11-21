import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getInvitesCode = os.getInvitesCode.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteInvitesCode = os.deleteInvitesCode.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getInvitesCodeTargetUsers = os.getInvitesCodeTargetUsers.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const putInvitesCodeTargetUsers = os.putInvitesCodeTargetUsers.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postInvitesCodeTargetUsersBulkAdd = os.postInvitesCodeTargetUsersBulkAdd.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postInvitesCodeTargetUsersBulkDelete = os.postInvitesCodeTargetUsersBulkDelete.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getInvitesCodeTargetUsersJobStatus = os.getInvitesCodeTargetUsersJobStatus.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const putInvitesCodeTargetUsersUserId = os.putInvitesCodeTargetUsersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteInvitesCodeTargetUsersUserId = os.deleteInvitesCodeTargetUsersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
