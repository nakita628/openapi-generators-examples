import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getSkills = os.getSkills.handler(async ({ input }) => {})
export const postSkills = os.postSkills.handler(async ({ input }) => {})
export const getSkillsSkillId = os.getSkillsSkillId.handler(async ({ input }) => {})
export const postSkillsSkillId = os.postSkillsSkillId.handler(async ({ input }) => {})
export const deleteSkillsSkillId = os.deleteSkillsSkillId.handler(async ({ input }) => {})
export const getSkillsSkillIdContent = os.getSkillsSkillIdContent.handler(async ({ input }) => {})
export const getSkillsSkillIdVersions = os.getSkillsSkillIdVersions.handler(async ({ input }) => {})
export const postSkillsSkillIdVersions = os.postSkillsSkillIdVersions.handler(
  async ({ input }) => {},
)
export const getSkillsSkillIdVersionsVersion = os.getSkillsSkillIdVersionsVersion.handler(
  async ({ input }) => {},
)
export const deleteSkillsSkillIdVersionsVersion = os.deleteSkillsSkillIdVersionsVersion.handler(
  async ({ input }) => {},
)
export const getSkillsSkillIdVersionsVersionContent =
  os.getSkillsSkillIdVersionsVersionContent.handler(async ({ input }) => {})
