import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postFineTuningAlphaGradersRun = os.postFineTuningAlphaGradersRun.handler(
  async ({ input }) => {},
)
export const postFineTuningAlphaGradersValidate = os.postFineTuningAlphaGradersValidate.handler(
  async ({ input }) => {},
)
export const getFineTuningCheckpointsFineTunedModelCheckpointPermissions =
  os.getFineTuningCheckpointsFineTunedModelCheckpointPermissions.handler(async ({ input }) => {})
export const postFineTuningCheckpointsFineTunedModelCheckpointPermissions =
  os.postFineTuningCheckpointsFineTunedModelCheckpointPermissions.handler(async ({ input }) => {})
export const deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId =
  os.deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId.handler(
    async ({ input }) => {},
  )
export const getFineTuningJobs = os.getFineTuningJobs.handler(async ({ input }) => {})
export const postFineTuningJobs = os.postFineTuningJobs.handler(async ({ input }) => {})
export const getFineTuningJobsFineTuningJobId = os.getFineTuningJobsFineTuningJobId.handler(
  async ({ input }) => {},
)
export const postFineTuningJobsFineTuningJobIdCancel =
  os.postFineTuningJobsFineTuningJobIdCancel.handler(async ({ input }) => {})
export const getFineTuningJobsFineTuningJobIdCheckpoints =
  os.getFineTuningJobsFineTuningJobIdCheckpoints.handler(async ({ input }) => {})
export const getFineTuningJobsFineTuningJobIdEvents =
  os.getFineTuningJobsFineTuningJobIdEvents.handler(async ({ input }) => {})
export const postFineTuningJobsFineTuningJobIdPause =
  os.postFineTuningJobsFineTuningJobIdPause.handler(async ({ input }) => {})
export const postFineTuningJobsFineTuningJobIdResume =
  os.postFineTuningJobsFineTuningJobIdResume.handler(async ({ input }) => {})
