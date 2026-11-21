import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  CreateMessageRequestSchema,
  CreateRunRequestSchema,
  CreateThreadAndRunRequestSchema,
  CreateThreadRequestSchema,
  ModifyMessageRequestSchema,
  ModifyRunRequestSchema,
  ModifyThreadRequestSchema,
  SubmitToolOutputsRunRequestSchema,
} from '../components'

export const threadsHandler = new Hono()
  .post(
    '/threads',
    sValidator('json', Schema.toStandardSchemaV1(CreateThreadRequestSchema)),
    (c) => {},
  )
  .post(
    '/threads/runs',
    sValidator('json', Schema.toStandardSchemaV1(CreateThreadAndRunRequestSchema)),
    (c) => {},
  )
  .get(
    '/threads/:thread_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/threads/:thread_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ModifyThreadRequestSchema)),
    (c) => {},
  )
  .delete(
    '/threads/:thread_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/messages',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
          run_id: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/messages',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateMessageRequestSchema)),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ModifyMessageRequestSchema)),
    (c) => {},
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'include[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateRunRequestSchema)),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ModifyRunRequestSchema)),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
          'include[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, run_id: Schema.String, step_id: Schema.String }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'include[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(SubmitToolOutputsRunRequestSchema)),
    (c) => {},
  )
