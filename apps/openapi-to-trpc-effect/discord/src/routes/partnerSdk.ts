import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

const t = initTRPC.create()

export const partnerSdkRouter = t.router({
  putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id_1: SnowflakeTypeSchema,
          user_id_2: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          body: Schema.Record(
            Schema.String,
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 2000, {
                expected: 'a string of at most 2000 characters',
              }),
            ),
          ).annotate({ description: 'The moderation metadata attached to the message' }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmerge: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: SnowflakeTypeSchema,
          client_secret: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ),
          ),
          external_auth_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmergeBot: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_user_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1024, {
              expected: 'a string of at most 1024 characters',
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: SnowflakeTypeSchema,
          client_secret: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ),
          ),
          external_auth_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProvisionalTokenResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkTokenBot: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          provisional_user_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          external_user_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1024, {
              expected: 'a string of at most 1024 characters',
            }),
          ),
          preferred_global_name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProvisionalTokenResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
