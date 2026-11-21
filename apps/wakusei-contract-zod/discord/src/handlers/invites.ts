import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getInvitesCode = os.getInvitesCode.handler(async ({ input }) => {})
export const deleteInvitesCode = os.deleteInvitesCode.handler(async ({ input }) => {})
export const getInvitesCodeTargetUsers = os.getInvitesCodeTargetUsers.handler(
  async ({ input }) => {},
)
export const putInvitesCodeTargetUsers = os.putInvitesCodeTargetUsers.handler(
  async ({ input }) => {},
)
export const postInvitesCodeTargetUsersBulkAdd = os.postInvitesCodeTargetUsersBulkAdd.handler(
  async ({ input }) => {},
)
export const postInvitesCodeTargetUsersBulkDelete = os.postInvitesCodeTargetUsersBulkDelete.handler(
  async ({ input }) => {},
)
export const getInvitesCodeTargetUsersJobStatus = os.getInvitesCodeTargetUsersJobStatus.handler(
  async ({ input }) => {},
)
export const putInvitesCodeTargetUsersUserId = os.putInvitesCodeTargetUsersUserId.handler(
  async ({ input }) => {},
)
export const deleteInvitesCodeTargetUsersUserId = os.deleteInvitesCodeTargetUsersUserId.handler(
  async ({ input }) => {},
)
