import { Hono } from 'hono'
import {
  putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataHandler,
  postPartnerSdkProvisionalAccountsUnmergeHandler,
  postPartnerSdkProvisionalAccountsUnmergeBotHandler,
  postPartnerSdkTokenHandler,
  postPartnerSdkTokenBotHandler,
} from '../routes'

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataHandler(
      async (c, { param, form, json }) => {},
    ),
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    postPartnerSdkProvisionalAccountsUnmergeHandler(async (c, { json }) => {}),
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    postPartnerSdkProvisionalAccountsUnmergeBotHandler(async (c, { json }) => {}),
  )
  .post(
    '/partner-sdk/token',
    postPartnerSdkTokenHandler(async (c, { json }) => {}),
  )
  .post(
    '/partner-sdk/token/bot',
    postPartnerSdkTokenBotHandler(async (c, { json }) => {}),
  )
