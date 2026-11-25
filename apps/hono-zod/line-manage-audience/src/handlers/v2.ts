import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
      z
        .object({
          audienceGroupId: z.coerce
            .bigint()
            .pipe(z.int64())
            .meta({ description: 'The audience ID.' })
            .exactOptional(),
          uploadDescription: z
            .string()
            .meta({ description: 'The description to register with the job' })
            .exactOptional(),
          file: z
            .file()
            .meta({
              description:
                'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
            }),
        })
        .meta({ description: 'Request of the addUserIdsToAudience' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    sValidator(
      'form',
      z
        .object({
          description: z
            .string()
            .max(120)
            .meta({
              description:
                "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
            })
            .exactOptional(),
          isIfaAudience: z
            .stringbool()
            .meta({
              description:
                'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
            })
            .exactOptional(),
          uploadDescription: z
            .string()
            .meta({
              description: 'The description to register for the job (in `jobs[].description`).\n',
            })
            .exactOptional(),
          file: z
            .file()
            .meta({
              description:
                'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
            }),
        })
        .meta({ description: 'Request for createAudienceForUploadingUserIds' }),
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
    sValidator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
    sValidator('json', UpdateAudienceGroupDescriptionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/list',
    sValidator(
      'query',
      z.object({
        page: z.coerce.bigint().pipe(z.int64().min(1n)),
        description: z.string().exactOptional(),
        status: AudienceGroupStatusSchema.exactOptional(),
        size: z.coerce
          .bigint()
          .pipe(z.int64().max(40n))
          .meta({ examples: [20] })
          .exactOptional(),
        includesExternalPublicGroups: z
          .stringbool()
          .meta({ examples: [true] })
          .exactOptional(),
        createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    sValidator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    sValidator(
      'query',
      z.object({
        page: z.coerce.bigint().pipe(z.int64().min(1n)),
        description: z.string().exactOptional(),
        status: AudienceGroupStatusSchema.exactOptional(),
        size: z.coerce
          .bigint()
          .pipe(z.int64().max(40n))
          .meta({ examples: [20] })
          .exactOptional(),
        createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
        includesOwnedAudienceGroups: z.stringbool().default(false).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
