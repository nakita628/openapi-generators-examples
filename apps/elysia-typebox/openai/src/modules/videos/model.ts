import { t, type UnwrapSchema } from 'elysia'

export const VideosModel = {
  ListVideosQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(
      t.String({
        description: 'Identifier for the last item from the previous pagination request',
      }),
    ),
  }),
  CreateVideoCharacterBody: t.Form(
    {
      video: t.File({ description: 'Video file used to create a character.' }),
      name: t.String({
        minLength: 1,
        maxLength: 80,
        description: 'Display name for this API character.',
      }),
    },
    {
      title: 'Create character request',
      description: 'Parameters for creating a character from an uploaded video.',
    },
  ),
  GetVideoCharacterParams: t.Object({ character_id: t.String({ example: 'char_123' }) }),
  GetVideoParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
  DeleteVideoParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
  RetrieveVideoContentParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
  RetrieveVideoContentQuery: t.Object({
    variant: t.Optional(t.UnionEnum(['video', 'thumbnail', 'spritesheet'], { default: undefined })),
  }),
  RetrieveVideoContentResponse200: t.String(),
  CreateVideoRemixParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
} as const

export type VideosModel = { [k in keyof typeof VideosModel]: UnwrapSchema<(typeof VideosModel)[k]> }
