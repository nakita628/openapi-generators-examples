import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
    sValidator('json', Schema.toStandardSchemaV1(AddAudienceToAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload',
    sValidator('json', Schema.toStandardSchemaV1(CreateAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/upload/byFile',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ description: 'The audience ID.' }),
          ),
          uploadDescription: Schema.optionalKey(
            Schema.String.annotate({ description: 'The description to register with the job' }),
          ),
          file: Schema.instanceOf(File).annotate({
            description:
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
          }),
        }).annotate({ description: 'Request of the addUserIdsToAudience' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          description: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 120, {
                expected: 'a string of at most 120 characters',
              }),
            ).annotate({
              description:
                "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
            }),
          ),
          isIfaAudience: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
              }),
          ),
          uploadDescription: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The description to register for the job (in `jobs[].description`).\n',
            }),
          ),
          file: Schema.instanceOf(File).annotate({
            description:
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
          }),
        }).annotate({ description: 'Request for createAudienceForUploadingUserIds' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/click',
    sValidator('json', Schema.toStandardSchemaV1(CreateClickBasedAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/imp',
    sValidator('json', Schema.toStandardSchemaV1(CreateImpBasedAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/:audienceGroupId/updateDescription',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateAudienceGroupDescriptionRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/list',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          page: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
          ),
          description: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(AudienceGroupStatusSchema),
          size: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isLessThanOrEqualToBigInt(40n),
            ).annotate({ jsonSchemaExamples: [20] }),
          ),
          includesExternalPublicGroups: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({ jsonSchemaExamples: [true] }),
          ),
          createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          page: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
          ),
          description: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(AudienceGroupStatusSchema),
          size: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isLessThanOrEqualToBigInt(40n),
            ).annotate({ jsonSchemaExamples: [20] }),
          ),
          createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
          includesOwnedAudienceGroups: Schema.String.check(
            Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          )
            .pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
