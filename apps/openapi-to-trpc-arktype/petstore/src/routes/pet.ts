import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { ApiResponseSchema, PetSchema } from '../components'

const t = initTRPC.create()

export const petRouter = t.router({
  putPet: t.procedure
    .input(PetSchema)
    .output(PetSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPet: t.procedure
    .input(PetSchema)
    .output(PetSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetFindByStatus: t.procedure
    .input(type({ status: "'available' | 'pending' | 'sold'" }))
    .output(type(PetSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetFindByTags: t.procedure
    .input(type({ tags: 'string[]' }))
    .output(type(PetSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetPetId: t.procedure
    .input(
      type({
        petId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .output(PetSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetId: t.procedure
    .input(
      type({
        petId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'name?': 'string',
        'status?': 'string',
      }),
    )
    .output(PetSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePetPetId: t.procedure
    .input(
      type({
        petId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetIdUploadImage: t.procedure
    .input(
      type({
        petId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'additionalMetadata?': 'string',
      }),
    )
    .output(ApiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
