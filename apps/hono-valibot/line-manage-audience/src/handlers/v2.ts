import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.pipe(
        v.object({
          audienceGroupId: v.optional(
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^-?\d+$/),
                v.transform((input) => BigInt(input)),
                v.minValue(-9223372036854775808n),
                v.maxValue(9223372036854775807n),
              ),
              v.description('The audience ID.'),
            ),
          ),
          uploadDescription: v.optional(
            v.pipe(v.string(), v.description('The description to register with the job')),
          ),
          file: v.pipe(
            v.file(),
            v.description(
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
            ),
          ),
        }),
        v.description('Request of the addUserIdsToAudience'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    sValidator(
      'form',
      v.pipe(
        v.object({
          description: v.optional(
            v.pipe(
              v.pipe(v.string(), v.maxCodePoints(120)),
              v.description(
                "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
              ),
            ),
          ),
          isIfaAudience: v.optional(
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              v.description(
                'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
              ),
            ),
          ),
          uploadDescription: v.optional(
            v.pipe(
              v.string(),
              v.description('The description to register for the job (in `jobs[].description`).\n'),
            ),
          ),
          file: v.pipe(
            v.file(),
            v.description(
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
            ),
          ),
        }),
        v.description('Request for createAudienceForUploadingUserIds'),
      ),
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
      v.object({
        audienceGroupId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
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
      v.object({
        audienceGroupId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator(
      'param',
      v.object({
        audienceGroupId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/list',
    sValidator(
      'query',
      v.object({
        page: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
        ),
        description: v.optional(v.string()),
        status: v.optional(AudienceGroupStatusSchema),
        size: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.maxValue(40n),
            ),
            v.metadata({ examples: [20] }),
          ),
        ),
        includesExternalPublicGroups: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.metadata({ examples: [true] }),
          ),
        ),
        createRoute: v.optional(AudienceGroupCreateRouteSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    sValidator(
      'param',
      v.object({
        audienceGroupId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    sValidator(
      'query',
      v.object({
        page: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
          v.minValue(1n),
        ),
        description: v.optional(v.string()),
        status: v.optional(AudienceGroupStatusSchema),
        size: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.maxValue(40n),
            ),
            v.metadata({ examples: [20] }),
          ),
        ),
        createRoute: v.optional(AudienceGroupCreateRouteSchema),
        includesOwnedAudienceGroups: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
