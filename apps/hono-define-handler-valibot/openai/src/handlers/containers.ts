import { Hono } from 'hono'
import {
  getContainersHandler,
  postContainersHandler,
  getContainersContainerIdHandler,
  deleteContainersContainerIdHandler,
  getContainersContainerIdFilesHandler,
  postContainersContainerIdFilesHandler,
  getContainersContainerIdFilesFileIdHandler,
  deleteContainersContainerIdFilesFileIdHandler,
  getContainersContainerIdFilesFileIdContentHandler,
} from '../routes'

export const containersHandler = new Hono()
  .get(
    '/containers',
    getContainersHandler(async (c, { query }) => {}),
  )
  .post(
    '/containers',
    postContainersHandler(async (c, { json }) => {}),
  )
  .get(
    '/containers/:container_id',
    getContainersContainerIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/containers/:container_id',
    deleteContainersContainerIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/containers/:container_id/files',
    getContainersContainerIdFilesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/containers/:container_id/files',
    postContainersContainerIdFilesHandler(async (c, { param, form, json }) => {}),
  )
  .get(
    '/containers/:container_id/files/:file_id',
    getContainersContainerIdFilesFileIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    deleteContainersContainerIdFilesFileIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    getContainersContainerIdFilesFileIdContentHandler(async (c, { param }) => {}),
  )
