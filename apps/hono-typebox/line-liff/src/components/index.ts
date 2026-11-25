import { Type, type Static } from 'typebox'

export const LiffViewSchema = Type.Object(
  {
    type: Type.Union([Type.Literal('compact'), Type.Literal('tall'), Type.Literal('full')], {
      description:
        'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
    }),
    url: Type.String({
      format: 'uri',
      description:
        "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
    }),
    moduleMode: Type.Optional(
      Type.Boolean({
        description:
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
      }),
    ),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export type LiffView = Static<typeof LiffViewSchema>

export const LiffFeaturesSchema = Type.Object(
  {
    ble: Type.Optional(
      Type.Boolean({
        description:
          '`true` if the LIFF app supports Bluetooth® Low Energy for LINE Things. `false` otherwise.\n',
      }),
    ),
    qrCode: Type.Optional(
      Type.Boolean({
        description:
          '`true` to use the 2D code reader in the LIFF app. false otherwise. The default value is `false`.\n',
        default: false,
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  },
)

export type LiffFeatures = Static<typeof LiffFeaturesSchema>

export const LiffScopeSchema = Type.Union(
  [
    Type.Literal('openid'),
    Type.Literal('email'),
    Type.Literal('profile'),
    Type.Literal('chat_message.write'),
  ],
  {
    description:
      'Array of scopes required for some LIFF SDK methods to function.\nThe default value is `["profile", "chat_message.write"]`.\n\n',
  },
)

export type LiffScope = Static<typeof LiffScopeSchema>

export const LiffBotPromptSchema = Type.Union(
  [Type.Literal('normal'), Type.Literal('aggressive'), Type.Literal('none')],
  {
    description:
      "Specify the setting for bot link feature with one of the following values:\n\n`normal`: Display the option to add the LINE Official Account as a friend in the channel consent screen.\n`aggressive`: Display a screen with the option to add the LINE Official Account as a friend after the channel consent screen.\n`none`: Don't display the option to add the LINE Official Account as a friend.\n  The default value is none.\n",
  },
)

export type LiffBotPrompt = Static<typeof LiffBotPromptSchema>

export const AddLiffAppRequestSchema = Type.Object(
  {
    view: LiffViewSchema,
    description: Type.Optional(
      Type.String({
        description:
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
      }),
    ),
    features: Type.Optional(LiffFeaturesSchema),
    permanentLinkPattern: Type.Optional(
      Type.String({
        description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
      }),
    ),
    scope: Type.Optional(Type.Array(LiffScopeSchema)),
    botPrompt: Type.Optional(LiffBotPromptSchema),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export type AddLiffAppRequest = Static<typeof AddLiffAppRequestSchema>

export const UpdateLiffViewSchema = Type.Object(
  {
    type: Type.Optional(
      Type.Union([Type.Literal('compact'), Type.Literal('tall'), Type.Literal('full')], {
        description:
          'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
      }),
    ),
    url: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
      }),
    ),
    moduleMode: Type.Optional(
      Type.Boolean({
        description:
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
      }),
    ),
  },
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#update-liff-app' },
  },
)

export type UpdateLiffView = Static<typeof UpdateLiffViewSchema>

export const AddLiffAppResponseSchema = Type.Object(
  { liffId: Type.String() },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export type AddLiffAppResponse = Static<typeof AddLiffAppResponseSchema>

export const UpdateLiffAppRequestSchema = Type.Object(
  {
    view: Type.Optional(UpdateLiffViewSchema),
    description: Type.Optional(
      Type.String({
        description:
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
      }),
    ),
    features: Type.Optional(LiffFeaturesSchema),
    permanentLinkPattern: Type.Optional(
      Type.String({
        description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
      }),
    ),
    scope: Type.Optional(Type.Array(LiffScopeSchema)),
    botPrompt: Type.Optional(LiffBotPromptSchema),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export type UpdateLiffAppRequest = Static<typeof UpdateLiffAppRequestSchema>

export const LiffAppSchema = Type.Object(
  {
    liffId: Type.Optional(Type.String({ description: 'LIFF app ID' })),
    view: Type.Optional(LiffViewSchema),
    description: Type.Optional(Type.String({ description: 'Name of the LIFF app' })),
    features: Type.Optional(LiffFeaturesSchema),
    permanentLinkPattern: Type.Optional(
      Type.String({
        description: 'How additional information in LIFF URLs is handled. concat is returned.\n',
      }),
    ),
    scope: Type.Optional(Type.Array(LiffScopeSchema)),
    botPrompt: Type.Optional(LiffBotPromptSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  },
)

export type LiffApp = Static<typeof LiffAppSchema>

export const GetAllLiffAppsResponseSchema = Type.Object(
  { apps: Type.Optional(Type.Array(LiffAppSchema)) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  },
)

export type GetAllLiffAppsResponse = Static<typeof GetAllLiffAppsResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
