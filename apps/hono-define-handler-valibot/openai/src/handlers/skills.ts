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
    getSkillsHandler(async (c, { query }) => {}),
  )
  .post(
    '/skills',
    postSkillsHandler(async (c, { form, json }) => {}),
  )
  .get(
    '/skills/:skill_id',
    getSkillsSkillIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/skills/:skill_id',
    postSkillsSkillIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/skills/:skill_id',
    deleteSkillsSkillIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/skills/:skill_id/content',
    getSkillsSkillIdContentHandler(async (c, { param }) => {}),
  )
  .get(
    '/skills/:skill_id/versions',
    getSkillsSkillIdVersionsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/skills/:skill_id/versions',
    postSkillsSkillIdVersionsHandler(async (c, { param, form, json }) => {}),
  )
  .get(
    '/skills/:skill_id/versions/:version',
    getSkillsSkillIdVersionsVersionHandler(async (c, { param }) => {}),
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    deleteSkillsSkillIdVersionsVersionHandler(async (c, { param }) => {}),
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    getSkillsSkillIdVersionsVersionContentHandler(async (c, { param }) => {}),
  )
