import { t } from 'elysia'

export const RateLimitHeaderSchema = t.String({ examples: ['limit=10, remaining=0, reset=10'] })

export const RetryAfterHeaderSchema = t.String()
