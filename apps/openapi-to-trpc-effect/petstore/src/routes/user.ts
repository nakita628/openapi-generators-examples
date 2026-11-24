import { initTRPC, TRPCError } from '@trpc/server'
import { Schema, SchemaTransformation } from 'effect'
import { UserSchema } from '../components'

const t = initTRPC.create()

export const userRouter = t.router({
  postUser: t.procedure
    .input(Schema.toStandardSchemaV1(UserSchema))
    .output(Schema.toStandardSchemaV1(UserSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUserCreateWithList: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Array(UserSchema)))
    .output(Schema.toStandardSchemaV1(UserSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogin: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          username: Schema.optionalKey(Schema.String),
          password: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.String))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUserLogout: t.procedure.query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getUserUsername: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String })))
    .output(Schema.toStandardSchemaV1(UserSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUserUsername: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          username: Schema.String,
          id: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
              )
              .annotate({ jsonSchemaExamples: [10] }),
          ),
          firstName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optionalKey(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optionalKey(
            Schema.Number.check(Schema.isInt32()).annotate({
              description: 'User Status',
              jsonSchemaExamples: [1],
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUserUsername: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
