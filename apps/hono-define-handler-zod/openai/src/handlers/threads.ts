import { Hono } from 'hono'
import {
  postThreadsHandler,
  postThreadsRunsHandler,
  getThreadsThreadIdHandler,
  postThreadsThreadIdHandler,
  deleteThreadsThreadIdHandler,
  getThreadsThreadIdMessagesHandler,
  postThreadsThreadIdMessagesHandler,
  getThreadsThreadIdMessagesMessageIdHandler,
  postThreadsThreadIdMessagesMessageIdHandler,
  deleteThreadsThreadIdMessagesMessageIdHandler,
  getThreadsThreadIdRunsHandler,
  postThreadsThreadIdRunsHandler,
  getThreadsThreadIdRunsRunIdHandler,
  postThreadsThreadIdRunsRunIdHandler,
  postThreadsThreadIdRunsRunIdCancelHandler,
  getThreadsThreadIdRunsRunIdStepsHandler,
  getThreadsThreadIdRunsRunIdStepsStepIdHandler,
  postThreadsThreadIdRunsRunIdSubmitToolOutputsHandler,
} from '../routes'

export const threadsHandler = new Hono()
  .post(
    '/threads',
    postThreadsHandler(async (c, { json }) => {}),
  )
  .post(
    '/threads/runs',
    postThreadsRunsHandler(async (c, { json }) => {}),
  )
  .get(
    '/threads/:thread_id',
    getThreadsThreadIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/threads/:thread_id',
    postThreadsThreadIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/threads/:thread_id',
    deleteThreadsThreadIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/threads/:thread_id/messages',
    getThreadsThreadIdMessagesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/threads/:thread_id/messages',
    postThreadsThreadIdMessagesHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    getThreadsThreadIdMessagesMessageIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    postThreadsThreadIdMessagesMessageIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    deleteThreadsThreadIdMessagesMessageIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/threads/:thread_id/runs',
    getThreadsThreadIdRunsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/threads/:thread_id/runs',
    postThreadsThreadIdRunsHandler(async (c, { param, query, json }) => {}),
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    getThreadsThreadIdRunsRunIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    postThreadsThreadIdRunsRunIdHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    postThreadsThreadIdRunsRunIdCancelHandler(async (c, { param }) => {}),
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    getThreadsThreadIdRunsRunIdStepsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    getThreadsThreadIdRunsRunIdStepsStepIdHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    postThreadsThreadIdRunsRunIdSubmitToolOutputsHandler(async (c, { param, json }) => {}),
  )
