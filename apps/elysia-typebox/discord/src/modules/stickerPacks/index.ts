import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  InnerErrorsSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
  StickerFormatTypesSchema,
  StickerPackCollectionResponseSchema,
  StickerPackResponseSchema,
  StickerTypesSchema,
} from '../../components/schemas'
import { StickerPacksModel } from './model'

export const stickerPacks = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    InnerErrors: InnerErrorsSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
    StandardStickerResponse: StandardStickerResponseSchema,
    StickerFormatTypes: StickerFormatTypesSchema,
    StickerPackCollectionResponse: StickerPackCollectionResponseSchema,
    StickerPackResponse: StickerPackResponseSchema,
    StickerTypes: StickerTypesSchema,
  })
  .get('/sticker-packs', () => {}, {
    response: {
      200: 'StickerPackCollectionResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'list_sticker_packs', security: [{}, { BotToken: [] }] },
  })
  .get('/sticker-packs/:pack_id', ({ params }) => {}, {
    params: StickerPacksModel.get_sticker_packParams,
    response: { 200: 'StickerPackResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'get_sticker_pack', security: [{ BotToken: [] }] },
  })
