import { t, type UnwrapSchema } from 'elysia'

export const V2Model = {
  addUserIdsToAudienceBody: t.Form(
    {
      audienceGroupId: t.Optional(
        t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'The audience ID.' }),
      ),
      uploadDescription: t.Optional(
        t.String({ description: 'The description to register with the job' }),
      ),
      file: t.File({
        description:
          'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
      }),
    },
    { description: 'Request of the addUserIdsToAudience' },
  ),
  createAudienceForUploadingUserIdsBody: t.Form(
    {
      description: t.Optional(
        t.String({
          maxLength: 120,
          description:
            "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
        }),
      ),
      isIfaAudience: t.Optional(
        t.BooleanString({
          description:
            'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
        }),
      ),
      uploadDescription: t.Optional(
        t.String({
          description: 'The description to register for the job (in `jobs[].description`).\n',
        }),
      ),
      file: t.File({
        description:
          'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
      }),
    },
    { description: 'Request for createAudienceForUploadingUserIds' },
  ),
  updateAudienceGroupDescriptionParams: t.Object({
    audienceGroupId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
  getAudienceDataParams: t.Object({
    audienceGroupId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
  deleteAudienceGroupParams: t.Object({
    audienceGroupId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
  getAudienceGroupsQuery: t.Object({
    page: t.Integer({ format: 'int64', minimum: 1, maximum: 9007199254740991 }),
    description: t.Optional(t.String()),
    status: t.Optional(
      t.UnionEnum(['IN_PROGRESS', 'READY', 'FAILED', 'EXPIRED', 'INACTIVE', 'ACTIVATING'], {
        description: 'Status',
        default: undefined,
      }),
    ),
    size: t.Optional(t.Integer({ format: 'int64', maximum: 40, example: 20 })),
    includesExternalPublicGroups: t.Optional(t.Boolean({ example: true })),
    createRoute: t.Optional(
      t.UnionEnum(['OA_MANAGER', 'MESSAGING_API', 'POINT_AD', 'AD_MANAGER'], {
        description:
          'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
        default: undefined,
      }),
    ),
  }),
  getSharedAudienceDataParams: t.Object({
    audienceGroupId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
  getSharedAudienceGroupsQuery: t.Object({
    page: t.Integer({ format: 'int64', minimum: 1, maximum: 9007199254740991 }),
    description: t.Optional(t.String()),
    status: t.Optional(
      t.UnionEnum(['IN_PROGRESS', 'READY', 'FAILED', 'EXPIRED', 'INACTIVE', 'ACTIVATING'], {
        description: 'Status',
        default: undefined,
      }),
    ),
    size: t.Optional(t.Integer({ format: 'int64', maximum: 40, example: 20 })),
    createRoute: t.Optional(
      t.UnionEnum(['OA_MANAGER', 'MESSAGING_API', 'POINT_AD', 'AD_MANAGER'], {
        description:
          'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
        default: undefined,
      }),
    ),
    includesOwnedAudienceGroups: t.Optional(t.Boolean({ default: false })),
  }),
} as const

export type V2Model = { [k in keyof typeof V2Model]: UnwrapSchema<(typeof V2Model)[k]> }
