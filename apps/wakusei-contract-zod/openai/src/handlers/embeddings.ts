import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postEmbeddings = os.postEmbeddings.handler(async ({ input }) => {})
