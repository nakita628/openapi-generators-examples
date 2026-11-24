import { treaty } from '@elysiajs/eden'
import type { app } from '../index'

function normalizeOrigin(origin: string) {
  if (!origin) return origin
  const url = origin.includes('://')
    ? origin
    : `${['localhost', '127.0.0.1', '0.0.0.0'].some((host) => origin.includes(host)) ? 'http' : 'https'}://${origin}`
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export const clientOrigin = normalizeOrigin(import.meta.env.VITE_API_URL!)

export const client = treaty<typeof app>(clientOrigin)
