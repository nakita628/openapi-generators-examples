import { treaty } from '@elysiajs/eden'
import type { app } from '../index'

export const client = treaty<typeof app>(import.meta.env.VITE_API_URL!)
