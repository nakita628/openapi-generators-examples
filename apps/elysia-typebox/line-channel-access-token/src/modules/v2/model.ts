import { t, type UnwrapSchema } from 'elysia'

export const V2Model = {
  issueChannelTokenBody: t.Object(
    {
      grant_type: t.String({ example: 'client_credentials', description: '`client_credentials`' }),
      client_id: t.String({ description: 'Channel ID.' }),
      client_secret: t.String({ description: 'Channel secret.' }),
    },
    { description: 'Request of the issueChannelToken' },
  ),
  verifyChannelTokenBody: t.Object(
    {
      access_token: t.String({ description: 'A short-lived or long-lived channel access token.' }),
    },
    { description: 'request of the verifyChannelToken' },
  ),
  revokeChannelTokenBody: t.Object(
    {
      access_token: t.String({ description: 'A short-lived or long-lived channel access token.' }),
    },
    { description: 'Request of the revokeChannelToken.' },
  ),
} as const

export type V2Model = { [k in keyof typeof V2Model]: UnwrapSchema<(typeof V2Model)[k]> }
