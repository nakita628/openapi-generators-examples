import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getModels = os.getModels.handler(async ({ input }) => {})
export const getModelsModel = os.getModelsModel.handler(async ({ input }) => {})
export const deleteModelsModel = os.deleteModelsModel.handler(async ({ input }) => {})
