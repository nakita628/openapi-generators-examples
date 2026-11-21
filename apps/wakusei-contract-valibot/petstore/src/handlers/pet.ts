import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postPet = os.postPet.handler(async ({ input }) => { throw new Error('Not implemented') })
export const putPet = os.putPet.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getPetFindByStatus = os.getPetFindByStatus.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getPetFindByTags = os.getPetFindByTags.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getPetPetId = os.getPetPetId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postPetPetId = os.postPetPetId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deletePetPetId = os.deletePetPetId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postPetPetIdUploadImage = os.postPetPetIdUploadImage.handler(async ({ input }) => { throw new Error('Not implemented') })
