import { t } from 'elysia'

export const XRateLimitLimitHeaderSchema = t.Integer({ maximum: 9007199254740991 })

export const XRateLimitRemainingHeaderSchema = t.Integer({ maximum: 9007199254740991 })

export const XRateLimitResetHeaderSchema = t.Number()

export const XRateLimitResetAfterHeaderSchema = t.Number()

export const XRateLimitBucketHeaderSchema = t.String()
