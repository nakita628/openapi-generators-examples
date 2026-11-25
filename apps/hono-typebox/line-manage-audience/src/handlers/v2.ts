import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
    tbValidator('json', AddAudienceToAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload',
    tbValidator('json', CreateAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/upload/byFile',
    tbValidator(
      'form',
      Type.Object(
        {
          audienceGroupId: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          uploadDescription: Type.Optional(
            Type.String({ description: 'The description to register with the job' }),
          ),
          file: Type.String({
            description:
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
          }),
        },
        { description: 'Request of the addUserIdsToAudience' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    tbValidator(
      'form',
      Type.Object(
        {
          description: Type.Optional(
            Type.String({
              maxLength: 120,
              description:
                "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
            }),
          ),
          isIfaAudience: Type.Optional(
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          uploadDescription: Type.Optional(
            Type.String({
              description: 'The description to register for the job (in `jobs[].description`).\n',
            }),
          ),
          file: Type.String({
            description:
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
          }),
        },
        { description: 'Request for createAudienceForUploadingUserIds' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/click',
    tbValidator('json', CreateClickBasedAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/imp',
    tbValidator('json', CreateImpBasedAudienceGroupRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/:audienceGroupId/updateDescription',
    tbValidator(
      'param',
      Type.Object({
        audienceGroupId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
      }),
    ),
    tbValidator('json', UpdateAudienceGroupDescriptionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/:audienceGroupId',
    tbValidator(
      'param',
      Type.Object({
        audienceGroupId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    tbValidator(
      'param',
      Type.Object({
        audienceGroupId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/list',
    tbValidator(
      'query',
      Type.Object({
        page: Codec(
          Type.Refine(
            Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
            (value) => Number(value) >= 1,
            () => 'must be >= 1',
          ),
        )
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        description: Type.Optional(Type.String()),
        status: Type.Optional(AudienceGroupStatusSchema),
        size: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) <= 40,
              () => 'must be <= 40',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        includesExternalPublicGroups: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        createRoute: Type.Optional(AudienceGroupCreateRouteSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    tbValidator(
      'param',
      Type.Object({
        audienceGroupId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    tbValidator(
      'query',
      Type.Object({
        page: Codec(
          Type.Refine(
            Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
            (value) => Number(value) >= 1,
            () => 'must be >= 1',
          ),
        )
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        description: Type.Optional(Type.String()),
        status: Type.Optional(AudienceGroupStatusSchema),
        size: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) <= 40,
              () => 'must be <= 40',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        createRoute: Type.Optional(AudienceGroupCreateRouteSchema),
        includesOwnedAudienceGroups: Type.Optional(
          Codec(
            Type.String({
              pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
              default: 'false',
            }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
