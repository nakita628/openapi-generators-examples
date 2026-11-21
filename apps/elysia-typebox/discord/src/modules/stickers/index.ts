import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  GuildStickerResponseSchema,
  InnerErrorsSchema,
  Int53TypeSchema,
  NameplatePaletteSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
  StickerFormatTypesSchema,
  StickerTypesSchema,
  UserAvatarDecorationResponseSchema,
  UserCollectiblesResponseSchema,
  UserNameplateResponseSchema,
  UserPrimaryGuildResponseSchema,
  UserResponseSchema,
} from '../../components/schemas'
import { StickersModel } from './model'

export const stickers = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    GuildStickerResponse: GuildStickerResponseSchema,
    InnerErrors: InnerErrorsSchema,
    Int53Type: Int53TypeSchema,
    NameplatePalette: NameplatePaletteSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
    StandardStickerResponse: StandardStickerResponseSchema,
    StickerFormatTypes: StickerFormatTypesSchema,
    StickerTypes: StickerTypesSchema,
    UserAvatarDecorationResponse: UserAvatarDecorationResponseSchema,
    UserCollectiblesResponse: UserCollectiblesResponseSchema,
    UserNameplateResponse: UserNameplateResponseSchema,
    UserPrimaryGuildResponse: UserPrimaryGuildResponseSchema,
    UserResponse: UserResponseSchema,
  })
  .get('/stickers/:sticker_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: StickersModel.get_stickerParams,
    response: {
      200: StickersModel.get_stickerResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'get_sticker', security: [{ BotToken: [] }] },
  })
