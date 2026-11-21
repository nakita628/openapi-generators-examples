import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { ApiResponseSchema, PetSchema } from '../components'

const t = initTRPC.create()

export const petRouter = t.router({
  putPet: t.procedure
    .input(Schema.toStandardSchemaV1(PetSchema))
    .output(Schema.toStandardSchemaV1(PetSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPet: t.procedure
    .input(Schema.toStandardSchemaV1(PetSchema))
    .output(Schema.toStandardSchemaV1(PetSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetFindByStatus: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          status: Schema.Literals(['available', 'pending', 'sold']).pipe(
            Schema.withDecodingDefault(Effect.succeed('available')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(PetSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetFindByTags: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ tags: Schema.Array(Schema.String) })))
    .output(Schema.toStandardSchemaV1(Schema.Array(PetSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetPetId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.Union([
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
            ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PetSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.Union([
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
            ),
          name: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PetSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePetPetId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.Union([
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
            ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetIdUploadImage: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.Union([
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
            ),
          additionalMetadata: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApiResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
