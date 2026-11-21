import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(
      v.object({ status: v.optional(v.picklist(['available', 'pending', 'sold']), 'available') }),
    )
    .output(v.array(PetSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetFindByTags: t.procedure
    .input(v.object({ tags: v.array(v.string()) }))
    .output(v.array(PetSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetPetId: t.procedure
    .input(
      v.object({
        petId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    )
    .output(PetSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetId: t.procedure
    .input(
      v.object({
        petId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        name: v.optional(v.string()),
        status: v.optional(v.string()),
      }),
    )
    .output(PetSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePetPetId: t.procedure
    .input(
      v.object({
        petId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetIdUploadImage: t.procedure
    .input(
      v.object({
        petId: v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        additionalMetadata: v.optional(v.string()),
      }),
    )
    .output(ApiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
