import { treaty } from '@elysiajs/eden'
import type { app } from '../index'

const origin = import.meta.env.VITE_API_URL!

export const client = treaty<typeof app>(origin)
