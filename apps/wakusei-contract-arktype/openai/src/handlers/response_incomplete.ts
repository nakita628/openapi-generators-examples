import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postResponseIncomplete = os.postResponseIncomplete.handler(async ({ input }) => {})
