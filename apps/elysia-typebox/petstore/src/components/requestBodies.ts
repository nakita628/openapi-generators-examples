import { t } from 'elysia'
import { PetSchema, UserSchema } from './schemas'

export const PetRequestBodySchema = PetSchema

export const UserArrayRequestBodySchema = t.Array(UserSchema)
