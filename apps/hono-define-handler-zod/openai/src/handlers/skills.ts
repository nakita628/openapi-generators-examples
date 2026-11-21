import { Hono } from 'hono'
import {
  getSkillsHandler,
  postSkillsHandler,
  getSkillsSkillIdHandler,
  postSkillsSkillIdHandler,
  deleteSkillsSkillIdHandler,
  getSkillsSkillIdContentHandler,
  getSkillsSkillIdVersionsHandler,
  postSkillsSkillIdVersionsHandler,
  getSkillsSkillIdVersionsVersionHandler,
  deleteSkillsSkillIdVersionsVersionHandler,
  getSkillsSkillIdVersionsVersionContentHandler,
} from '../routes'

export const skillsHandler = new Hono()
  .get(
    '/skills',
    getSkillsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/skills',
    postSkillsHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/skills/:skill_id',
    getSkillsSkillIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/skills/:skill_id',
    postSkillsSkillIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/skills/:skill_id',
    deleteSkillsSkillIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/skills/:skill_id/content',
    getSkillsSkillIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/skills/:skill_id/versions',
    getSkillsSkillIdVersionsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/skills/:skill_id/versions',
    postSkillsSkillIdVersionsHandler(async (c, { param, form, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/skills/:skill_id/versions/:version',
    getSkillsSkillIdVersionsVersionHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    deleteSkillsSkillIdVersionsVersionHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    getSkillsSkillIdVersionsVersionContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
