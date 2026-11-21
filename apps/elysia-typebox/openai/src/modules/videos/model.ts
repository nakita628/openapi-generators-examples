import { t, type UnwrapSchema } from 'elysia'
import { OrderEnumSchema, VideoContentVariantSchema } from '../../components/schemas'

export const VideosModel = {
  ListVideosQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(OrderEnumSchema),
    after: t.Optional(
      t.String({
        description: 'Identifier for the last item from the previous pagination request',
      }),
    ),
  }),
  GetVideoCharacterParams: t.Object({ character_id: t.String({ example: 'char_123' }) }),
  GetVideoParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
  DeleteVideoParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
  RetrieveVideoContentParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
  RetrieveVideoContentQuery: t.Object({ variant: t.Optional(VideoContentVariantSchema) }),
  RetrieveVideoContentResponse200: t.String(),
  CreateVideoRemixParams: t.Object({ video_id: t.String({ example: 'video_123' }) }),
} as const

export type VideosModel = { [k in keyof typeof VideosModel]: UnwrapSchema<(typeof VideosModel)[k]> }
