import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
    .input(z.object({ status: z.enum(['available', 'pending', 'sold']).default('available') }))
    .output(z.array(PetSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetFindByTags: t.procedure
    .input(z.object({ tags: z.array(z.string()) }))
    .output(z.array(PetSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPetPetId: t.procedure
    .input(
      z.object({
        petId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .output(PetSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetId: t.procedure
    .input(
      z.object({
        petId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
        name: z.string().exactOptional(),
        status: z.string().exactOptional(),
      }),
    )
    .output(PetSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePetPetId: t.procedure
    .input(
      z.object({
        petId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPetPetIdUploadImage: t.procedure
    .input(
      z.object({
        petId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
        additionalMetadata: z.string().exactOptional(),
      }),
    )
    .output(ApiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
