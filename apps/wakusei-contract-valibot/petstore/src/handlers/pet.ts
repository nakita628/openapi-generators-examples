import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postPet = os.postPet.handler(async ({ input }) => {})
export const putPet = os.putPet.handler(async ({ input }) => {})
export const getPetFindByStatus = os.getPetFindByStatus.handler(async ({ input }) => {})
export const getPetFindByTags = os.getPetFindByTags.handler(async ({ input }) => {})
export const getPetPetId = os.getPetPetId.handler(async ({ input }) => {})
export const postPetPetId = os.postPetPetId.handler(async ({ input }) => {})
export const deletePetPetId = os.deletePetPetId.handler(async ({ input }) => {})
export const postPetPetIdUploadImage = os.postPetPetIdUploadImage.handler(async ({ input }) => {})
