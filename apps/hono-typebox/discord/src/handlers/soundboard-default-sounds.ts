import { Hono } from 'hono'

export const soundboardDefaultSoundsHandler = new Hono().get(
  '/soundboard-default-sounds',
  (c) => {},
)
