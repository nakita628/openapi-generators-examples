import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postResponsesBetaTrue = os.postResponsesBetaTrue.handler(async ({ input }) => {})
