import { t, type UnwrapSchema } from 'elysia'

export const ContentProvenanceChecksModel = {
  CreatecontentprovenancecheckBody: t.Form({
    file: t.File({
      description:
        'The image or audio file to check for supported OpenAI provenance signals. Supported image formats are PNG, JPEG, WebP, and GIF (including animated GIFs).',
    }),
  }),
} as const

export type ContentProvenanceChecksModel = {
  [k in keyof typeof ContentProvenanceChecksModel]: UnwrapSchema<
    (typeof ContentProvenanceChecksModel)[k]
  >
}
