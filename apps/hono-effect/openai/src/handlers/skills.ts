import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import {
  OrderEnumSchema,
  CreateSkillBodySchema,
  SetDefaultSkillVersionBodySchema,
  CreateSkillVersionBodySchema,
} from '../components'

export const skillsHandler = new Hono()
  .get(
    '/skills',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/skills',
    sValidator('json', Schema.toStandardSchemaV1(CreateSkillBodySchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          files: Schema.Union([
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.instanceOf(File)).check(Schema.isMaxLength(500))),
            ).annotate({
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
            Schema.instanceOf(File).annotate({ description: 'Skill zip file to upload.' }),
          ]),
        }).annotate({
          description:
            'Uploads a skill either as a directory (multipart `files[]`) or as a single zip file.',
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/skills/:skill_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(SetDefaultSkillVersionBodySchema)),
    (c) => {},
  )
  .delete(
    '/skills/:skill_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/versions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['skillver_123'] })),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/skills/:skill_id/versions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateSkillVersionBodySchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          files: Schema.Union([
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.instanceOf(File)).check(Schema.isMaxLength(500))),
            ).annotate({
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
            Schema.instanceOf(File).annotate({ description: 'Skill zip file to upload.' }),
          ]),
          default: Schema.optional(
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
              .annotate({ description: 'Whether to set this version as the default.' }),
          ),
        }).annotate({ description: 'Uploads a new immutable version of a skill.' }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The version number to retrieve.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The skill version number.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The skill version number.' }),
        }),
      ),
    ),
    (c) => {},
  )
