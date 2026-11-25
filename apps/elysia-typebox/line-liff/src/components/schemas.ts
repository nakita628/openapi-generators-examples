import { t } from 'elysia'

export const LiffViewSchema = t.Object(
  {
    type: t.UnionEnum(['compact', 'tall', 'full'], {
      description:
        'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
      default: undefined,
    }),
    url: t.String({
      format: 'uri',
      description:
        "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
    }),
    moduleMode: t.Optional(
      t.Boolean({
        description:
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
      }),
    ),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export const LiffFeaturesSchema = t.Object(
  {
    ble: t.Optional(
      t.Boolean({
        description:
          '`true` if the LIFF app supports Bluetooth® Low Energy for LINE Things. `false` otherwise.\n',
      }),
    ),
    qrCode: t.Optional(
      t.Boolean({
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

export const LiffScopeSchema = t.UnionEnum(['openid', 'email', 'profile', 'chat_message.write'], {
  description:
    'Array of scopes required for some LIFF SDK methods to function.\nThe default value is `["profile", "chat_message.write"]`.\n\n',
  default: undefined,
})

export const LiffBotPromptSchema = t.UnionEnum(['normal', 'aggressive', 'none'], {
  description:
    "Specify the setting for bot link feature with one of the following values:\n\n`normal`: Display the option to add the LINE Official Account as a friend in the channel consent screen.\n`aggressive`: Display a screen with the option to add the LINE Official Account as a friend after the channel consent screen.\n`none`: Don't display the option to add the LINE Official Account as a friend.\n  The default value is none.\n",
  default: undefined,
})

export const AddLiffAppRequestSchema = t.Object(
  {
    view: LiffViewSchema,
    description: t.Optional(
      t.String({
        description:
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
      }),
    ),
    features: t.Optional(LiffFeaturesSchema),
    permanentLinkPattern: t.Optional(
      t.String({
        description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
      }),
    ),
    scope: t.Optional(t.Array(LiffScopeSchema)),
    botPrompt: t.Optional(LiffBotPromptSchema),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export const UpdateLiffViewSchema = t.Object(
  {
    type: t.Optional(
      t.UnionEnum(['compact', 'tall', 'full'], {
        description:
          'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
        default: undefined,
      }),
    ),
    url: t.Optional(
      t.String({
        format: 'uri',
        description:
          "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
      }),
    ),
    moduleMode: t.Optional(
      t.Boolean({
        description:
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
      }),
    ),
  },
  {
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#update-liff-app' },
  },
)

export const AddLiffAppResponseSchema = t.Object(
  { liffId: t.String() },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export const UpdateLiffAppRequestSchema = t.Object(
  {
    view: t.Optional(UpdateLiffViewSchema),
    description: t.Optional(
      t.String({
        description:
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
      }),
    ),
    features: t.Optional(LiffFeaturesSchema),
    permanentLinkPattern: t.Optional(
      t.String({
        description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
      }),
    ),
    scope: t.Optional(t.Array(LiffScopeSchema)),
    botPrompt: t.Optional(LiffBotPromptSchema),
  },
  { externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' } },
)

export const LiffAppSchema = t.Object(
  {
    liffId: t.Optional(t.String({ description: 'LIFF app ID' })),
    view: t.Optional(LiffViewSchema),
    description: t.Optional(t.String({ description: 'Name of the LIFF app' })),
    features: t.Optional(LiffFeaturesSchema),
    permanentLinkPattern: t.Optional(
      t.String({
        description: 'How additional information in LIFF URLs is handled. concat is returned.\n',
      }),
    ),
    scope: t.Optional(t.Array(LiffScopeSchema)),
    botPrompt: t.Optional(LiffBotPromptSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  },
)

export const GetAllLiffAppsResponseSchema = t.Object(
  { apps: t.Optional(t.Array(LiffAppSchema)) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  },
)
