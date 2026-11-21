import { Hono } from 'hono'
import {
  getInvitesCodeHandler,
  deleteInvitesCodeHandler,
  getInvitesCodeTargetUsersHandler,
  putInvitesCodeTargetUsersHandler,
  postInvitesCodeTargetUsersBulkAddHandler,
  postInvitesCodeTargetUsersBulkDeleteHandler,
  getInvitesCodeTargetUsersJobStatusHandler,
  putInvitesCodeTargetUsersUserIdHandler,
  deleteInvitesCodeTargetUsersUserIdHandler,
} from '../routes'

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    getInvitesCodeHandler(async (c, { param, query }) => {}),
  )
  .delete(
    '/invites/:code',
    deleteInvitesCodeHandler(async (c, { param }) => {}),
  )
  .get(
    '/invites/:code/target-users',
    getInvitesCodeTargetUsersHandler(async (c, { param }) => {}),
  )
  .put(
    '/invites/:code/target-users',
    putInvitesCodeTargetUsersHandler(async (c, { param, form }) => {}),
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    postInvitesCodeTargetUsersBulkAddHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    postInvitesCodeTargetUsersBulkDeleteHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/invites/:code/target-users/job-status',
    getInvitesCodeTargetUsersJobStatusHandler(async (c, { param }) => {}),
  )
  .put(
    '/invites/:code/target-users/:user_id',
    putInvitesCodeTargetUsersUserIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    deleteInvitesCodeTargetUsersUserIdHandler(async (c, { param }) => {}),
  )
