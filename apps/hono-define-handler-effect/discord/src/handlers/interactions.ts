import { Hono } from 'hono'
import { postInteractionsInteractionIdInteractionTokenCallbackHandler } from '../routes'

export const interactionsHandler = new Hono().post(
  '/interactions/:interaction_id/:interaction_token/callback',
  postInteractionsInteractionIdInteractionTokenCallbackHandler(
    async (c, { param, query, form, json }) => { throw new Error('Not implemented') },
  ),
)
