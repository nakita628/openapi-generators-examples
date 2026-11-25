import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  CreateAudienceGroupRequestSchema,
  AddAudienceToAudienceGroupRequestSchema,
  CreateClickBasedAudienceGroupRequestSchema,
  CreateImpBasedAudienceGroupRequestSchema,
  UpdateAudienceGroupDescriptionRequestSchema,
  AudienceGroupStatusSchema,
  AudienceGroupCreateRouteSchema,
} from '../components'

export const v2Handler = new Hono()
  .put(
    '/v2/bot/audienceGroup/upload',
    sValidator('json', AddAudienceToAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload',
    sValidator('json', CreateAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/upload/byFile',
    sValidator(
      'form',
      type({
        'audienceGroupId?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .describe('The audience ID.'),
        'uploadDescription?': type('string').describe('The description to register with the job'),
        file: type('File').describe(
          'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
        ),
      }).describe('Request of the addUserIdsToAudience'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    sValidator(
      'form',
      type({
        'description?': type('string')
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
          .describe(
            "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
          ),
        'isIfaAudience?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
          ),
        'uploadDescription?': type('string').describe(
          'The description to register for the job (in `jobs[].description`).\n',
        ),
        file: type('File').describe(
          'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
        ),
      }).describe('Request for createAudienceForUploadingUserIds'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/click',
    sValidator('json', CreateClickBasedAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/imp',
    sValidator('json', CreateImpBasedAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/:audienceGroupId/updateDescription',
    sValidator(
      'param',
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    sValidator('json', UpdateAudienceGroupDescriptionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator(
      'param',
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator(
      'param',
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/list',
    sValidator(
      'query',
      type({
        page: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
        'description?': 'string',
        'status?': AudienceGroupStatusSchema,
        'size?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data <= 40n || ctx.mustBe('at most 40')),
        'includesExternalPublicGroups?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'createRoute?': AudienceGroupCreateRouteSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    sValidator(
      'param',
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    sValidator(
      'query',
      type({
        page: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
        'description?': 'string',
        'status?': AudienceGroupStatusSchema,
        'size?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data <= 40n || ctx.mustBe('at most 40')),
        'createRoute?': AudienceGroupCreateRouteSchema,
        'includesOwnedAudienceGroups?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
