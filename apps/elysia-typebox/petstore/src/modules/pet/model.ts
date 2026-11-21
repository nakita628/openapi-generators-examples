import { t, type UnwrapSchema } from 'elysia'
import { PetSchema } from '../../components/schemas'

export const PetModel = {
  findPetsByStatusQuery: t.Object({
    status: t.UnionEnum(['available', 'pending', 'sold'], { default: 'available' }),
  }),
  findPetsByStatusResponse200: t.Array(PetSchema),
  findPetsByTagsQuery: t.Object({ tags: t.Array(t.String()) }),
  findPetsByTagsResponse200: t.Array(PetSchema),
  getPetByIdParams: t.Object({ petId: t.Integer({ format: 'int64', maximum: 9007199254740991 }) }),
  updatePetWithFormParams: t.Object({
    petId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
  updatePetWithFormQuery: t.Object({
    name: t.Optional(t.String()),
    status: t.Optional(t.String()),
  }),
  deletePetParams: t.Object({ petId: t.Integer({ format: 'int64', maximum: 9007199254740991 }) }),
  deletePetHeaders: t.Object({ api_key: t.Optional(t.String()) }),
  uploadFileParams: t.Object({ petId: t.Integer({ format: 'int64', maximum: 9007199254740991 }) }),
  uploadFileQuery: t.Object({ additionalMetadata: t.Optional(t.String()) }),
  uploadFileBody: t.Uint8Array(),
} as const

export type PetModel = { [k in keyof typeof PetModel]: UnwrapSchema<(typeof PetModel)[k]> }
