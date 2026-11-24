import { t, type UnwrapSchema } from 'elysia'
import {
  ApiV2010AccountSchema,
  ApiV2010AccountAddressSchema,
  ApiV2010AccountAddressDependentPhoneNumberSchema,
  ApiV2010AccountApplicationSchema,
  ApiV2010AccountAuthorizedConnectAppSchema,
  ApiV2010AccountAvailablePhoneNumberCountrySchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
  ApiV2010AccountCallSchema,
  ApiV2010AccountCallCallEventSchema,
  ApiV2010AccountCallCallNotificationSchema,
  ApiV2010AccountCallCallRecordingSchema,
  ApiV2010AccountConferenceSchema,
  ApiV2010AccountConferenceConferenceRecordingSchema,
  ApiV2010AccountConferenceParticipantSchema,
  ApiV2010AccountConnectAppSchema,
  ApiV2010AccountIncomingPhoneNumberSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ApiV2010AccountKeySchema,
  ApiV2010AccountMessageSchema,
  ApiV2010AccountMessageMediaSchema,
  ApiV2010AccountNotificationSchema,
  ApiV2010AccountOutgoingCallerIdSchema,
  ApiV2010AccountQueueSchema,
  ApiV2010AccountQueueMemberSchema,
  ApiV2010AccountRecordingSchema,
  ApiV2010AccountRecordingRecordingAddOnResultSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  ApiV2010AccountRecordingRecordingTranscriptionSchema,
  ApiV2010AccountShortCodeSchema,
  ApiV2010AccountSigningKeySchema,
  ApiV2010AccountSipSipCredentialListSchema,
  ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  ApiV2010AccountSipSipDomainSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipIpAccessControlListSchema,
  ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  ApiV2010AccountTranscriptionSchema,
  ApiV2010AccountUsageUsageRecordSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordDailySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema,
  ApiV2010AccountUsageUsageTriggerSchema,
} from '../../components/schemas'

export const _20100401Model = {
  ListAccountQuery: t.Object({
    FriendlyName: t.Optional(t.String()),
    Status: t.Optional(
      t.UnionEnum(['active', 'suspended', 'closed'], {
        description:
          'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
        default: undefined,
      }),
    ),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAccountResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      accounts: t.Optional(t.Array(ApiV2010AccountSchema)),
    },
    { title: 'ListAccountResponse' },
  ),
  CreateAccountBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
        }),
      ),
    },
    { title: 'CreateAccountRequest' },
  ),
  FetchAccountParams: t.Object({
    Sid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateAccountParams: t.Object({
    Sid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateAccountBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({ description: 'Update the human-readable description of this Account' }),
      ),
      Status: t.Optional(
        t.UnionEnum(['active', 'suspended', 'closed'], {
          description:
            'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
          default: undefined,
        }),
      ),
    },
    { title: 'UpdateAccountRequest' },
  ),
  UpdateAccountResponse409: t.Object({
    code: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'Twilio-specific error code',
      }),
    ),
    message: t.Optional(t.String({ description: 'Error message' })),
    more_info: t.Optional(t.String({ description: 'Link to Error Code References' })),
    status: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'HTTP response status code',
      }),
    ),
  }),
  ListAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListAddressQuery: t.Object({
    CustomerName: t.Optional(t.String()),
    FriendlyName: t.Optional(t.String()),
    EmergencyEnabled: t.Optional(t.Boolean()),
    IsoCountry: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAddressResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      addresses: t.Optional(t.Array(ApiV2010AccountAddressSchema)),
    },
    { title: 'ListAddressResponse' },
  ),
  CreateAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateAddressBody: t.Object(
    {
      CustomerName: t.String({ description: 'The name to associate with the new address.' }),
      Street: t.String({ description: 'The number and street address of the new address.' }),
      City: t.String({ description: 'The city of the new address.' }),
      Region: t.String({ description: 'The state or region of the new address.' }),
      PostalCode: t.String({ description: 'The postal code of the new address.' }),
      IsoCountry: t.String({ description: 'The ISO country code of the new address.' }),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
        }),
      ),
      EmergencyEnabled: t.Optional(
        t.BooleanString({
          description:
            'Whether to enable emergency calling on the new address. Can be: `true` or `false`.',
        }),
      ),
      AutoCorrectAddress: t.Optional(
        t.BooleanString({
          description:
            "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
        }),
      ),
      StreetSecondary: t.Optional(
        t.String({ description: 'The additional number and street address of the address.' }),
      ),
    },
    { title: 'CreateAddressRequest' },
  ),
  FetchAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateAddressBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
        }),
      ),
      CustomerName: t.Optional(
        t.String({ description: 'The name to associate with the address.' }),
      ),
      Street: t.Optional(
        t.String({ description: 'The number and street address of the address.' }),
      ),
      City: t.Optional(t.String({ description: 'The city of the address.' })),
      Region: t.Optional(t.String({ description: 'The state or region of the address.' })),
      PostalCode: t.Optional(t.String({ description: 'The postal code of the address.' })),
      EmergencyEnabled: t.Optional(
        t.BooleanString({
          description:
            'Whether to enable emergency calling on the address. Can be: `true` or `false`.',
        }),
      ),
      AutoCorrectAddress: t.Optional(
        t.BooleanString({
          description:
            "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
        }),
      ),
      StreetSecondary: t.Optional(
        t.String({ description: 'The additional number and street address of the address.' }),
      ),
    },
    { title: 'UpdateAddressRequest' },
  ),
  DeleteAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListApplicationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListApplicationQuery: t.Object({
    FriendlyName: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListApplicationResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      applications: t.Optional(t.Array(ApiV2010AccountApplicationSchema)),
    },
    { title: 'ListApplicationResponse' },
  ),
  CreateApplicationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateApplicationBody: t.Object(
    {
      ApiVersion: t.Optional(
        t.String({
          description:
            "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version.",
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the phone number assigned to this application receives a call.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the phone number receives an incoming SMS message.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description: 'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      SmsStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using a POST method to send status information about SMS messages sent by the application.',
        }),
      ),
      MessageStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using a POST method to send message status information to your application.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the new application. It can be up to 64 characters long.',
        }),
      ),
      PublicApplicationConnectEnabled: t.Optional(
        t.BooleanString({
          description:
            'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
        }),
      ),
    },
    { title: 'CreateApplicationRequest' },
  ),
  FetchApplicationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateApplicationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateApplicationBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
      ApiVersion: t.Optional(
        t.String({
          description:
            "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version.",
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the phone number assigned to this application receives a call.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the phone number receives an incoming SMS message.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description: 'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      SmsStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility.',
        }),
      ),
      MessageStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using a POST method to send message status information to your application.',
        }),
      ),
      PublicApplicationConnectEnabled: t.Optional(
        t.BooleanString({
          description:
            'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
        }),
      ),
    },
    { title: 'UpdateApplicationRequest' },
  ),
  DeleteApplicationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  FetchAuthorizedConnectAppParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConnectAppSid: t.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListAuthorizedConnectAppParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListAuthorizedConnectAppQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAuthorizedConnectAppResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      authorized_connect_apps: t.Optional(t.Array(ApiV2010AccountAuthorizedConnectAppSchema)),
    },
    { title: 'ListAuthorizedConnectAppResponse' },
  ),
  ListAvailablePhoneNumberCountryParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListAvailablePhoneNumberCountryQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberCountryResponse200: t.Object(
    {
      countries: t.Optional(t.Array(ApiV2010AccountAvailablePhoneNumberCountrySchema)),
      uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
    },
    { title: 'ListAvailablePhoneNumberCountryResponse' },
  ),
  FetchAvailablePhoneNumberCountryParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberLocalParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberLocalQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberLocalResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema),
      ),
    },
    { title: 'ListAvailablePhoneNumberLocalResponse' },
  ),
  ListAvailablePhoneNumberMachineToMachineParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberMachineToMachineQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberMachineToMachineResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
        ),
      ),
    },
    { title: 'ListAvailablePhoneNumberMachineToMachineResponse' },
  ),
  ListAvailablePhoneNumberMobileParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberMobileQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberMobileResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema),
      ),
    },
    { title: 'ListAvailablePhoneNumberMobileResponse' },
  ),
  ListAvailablePhoneNumberNationalParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberNationalQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberNationalResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema),
      ),
    },
    { title: 'ListAvailablePhoneNumberNationalResponse' },
  ),
  ListAvailablePhoneNumberSharedCostParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberSharedCostQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberSharedCostResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema),
      ),
    },
    { title: 'ListAvailablePhoneNumberSharedCostResponse' },
  ),
  ListAvailablePhoneNumberTollFreeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberTollFreeQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberTollFreeResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema),
      ),
    },
    { title: 'ListAvailablePhoneNumberTollFreeResponse' },
  ),
  ListAvailablePhoneNumberVoipParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CountryCode: t.String(),
  }),
  ListAvailablePhoneNumberVoipQuery: t.Object({
    AreaCode: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    Contains: t.Optional(t.String()),
    SmsEnabled: t.Optional(t.Boolean()),
    MmsEnabled: t.Optional(t.Boolean()),
    VoiceEnabled: t.Optional(t.Boolean()),
    ExcludeAllAddressRequired: t.Optional(t.Boolean()),
    ExcludeLocalAddressRequired: t.Optional(t.Boolean()),
    ExcludeForeignAddressRequired: t.Optional(t.Boolean()),
    Beta: t.Optional(t.Boolean()),
    NearNumber: t.Optional(t.String()),
    NearLatLong: t.Optional(t.String()),
    Distance: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    InPostalCode: t.Optional(t.String()),
    InRegion: t.Optional(t.String()),
    InRateCenter: t.Optional(t.String()),
    InLata: t.Optional(t.String()),
    InLocality: t.Optional(t.String()),
    FaxEnabled: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListAvailablePhoneNumberVoipResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      available_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema),
      ),
    },
    { title: 'ListAvailablePhoneNumberVoipResponse' },
  ),
  FetchBalanceParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallQuery: t.Object({
    To: t.Optional(t.String()),
    From: t.Optional(t.String()),
    ParentCallSid: t.Optional(
      t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ),
    Status: t.Optional(
      t.UnionEnum(
        [
          'queued',
          'ringing',
          'in-progress',
          'completed',
          'busy',
          'failed',
          'no-answer',
          'canceled',
        ],
        {
          description:
            'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
          default: undefined,
        },
      ),
    ),
    StartTime: t.Optional(t.Date()),
    'StartTime<': t.Optional(t.Date()),
    'StartTime>': t.Optional(t.Date()),
    EndTime: t.Optional(t.Date()),
    'EndTime<': t.Optional(t.Date()),
    'EndTime>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListCallResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      calls: t.Optional(t.Array(ApiV2010AccountCallSchema)),
    },
    { title: 'ListCallResponse' },
  ),
  CreateCallParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateCallBody: t.Object(
    {
      To: t.String({ description: 'The phone number, SIP address, or client identifier to call.' }),
      From: t.String({
        description:
          'The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number.',
      }),
      Method: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            "The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.",
          default: undefined,
        }),
      ),
      FallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
        }),
      ),
      FallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          default: undefined,
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
        }),
      ),
      StatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          default: undefined,
        }),
      ),
      SendDigits: t.Optional(
        t.String({
          description:
            "The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored.",
        }),
      ),
      Timeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is `60` seconds and the maximum is `600` seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as `15` seconds, to hang up before reaching an answering machine or voicemail.',
        }),
      ),
      Record: t.Optional(
        t.BooleanString({
          description:
            'Whether to record the call. Can be `true` to record the phone call, or `false` to not. The default is `false`. The `recording_url` is sent to the `status_callback` URL.',
        }),
      ),
      RecordingChannels: t.Optional(
        t.String({
          description:
            'The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call.',
        }),
      ),
      RecordingStatusCallback: t.Optional(
        t.String({
          description: 'The URL that we call when the recording is available to be accessed.',
        }),
      ),
      RecordingStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          default: undefined,
        }),
      ),
      RecordingConfigurationId: t.Optional(
        t.String({
          description:
            'The identifier of the configuration to be used when creating and processing the recording',
        }),
      ),
      SipAuthUsername: t.Optional(
        t.String({
          description: 'The username used to authenticate the caller making a SIP call.',
        }),
      ),
      SipAuthPassword: t.Optional(
        t.String({
          description:
            'The password required to authenticate the user account specified in `sip_auth_username`.',
        }),
      ),
      MachineDetection: t.Optional(
        t.String({
          description:
            'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
        }),
      ),
      MachineDetectionTimeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
        }),
      ),
      RecordingStatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space.',
        }),
      ),
      Trim: t.Optional(
        t.String({
          description:
            'Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
        }),
      ),
      CallerId: t.Optional(
        t.String({
          description:
            'The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
        }),
      ),
      MachineDetectionSpeechThreshold: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
        }),
      ),
      MachineDetectionSpeechEndThreshold: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
        }),
      ),
      MachineDetectionSilenceTimeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
        }),
      ),
      AsyncAmd: t.Optional(
        t.String({
          description:
            'Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`.',
        }),
      ),
      AsyncAmdStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
        }),
      ),
      AsyncAmdStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          default: undefined,
        }),
      ),
      Passports: t.Optional(
        t.String({
          description:
            'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
        }),
      ),
      Byoc: t.Optional(
        t.String({
          pattern: '^BY[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
        }),
      ),
      CallReason: t.Optional(
        t.String({
          description:
            "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
        }),
      ),
      CallToken: t.Optional(
        t.String({
          description:
            "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
        }),
      ),
      RecordingTrack: t.Optional(
        t.String({
          description:
            'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
        }),
      ),
      TimeLimit: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
        }),
      ),
      ClientNotificationUrl: t.Optional(
        t.String({
          format: 'uri',
          description: 'The URL that we should use to deliver `push call notification`.',
        }),
      ),
      Url: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
        }),
      ),
      Twiml: t.Optional(
        t.String({
          description:
            'TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters.',
        }),
      ),
      ApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Application resource that will handle the call, if the call will be handled by an application.',
        }),
      ),
    },
    { title: 'CreateCallRequest' },
  ),
  FetchCallParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateCallParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateCallBody: t.Object(
    {
      Url: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
        }),
      ),
      Method: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          default: undefined,
        }),
      ),
      Status: t.Optional(t.UnionEnum(['canceled', 'completed'], { default: undefined })),
      FallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
        }),
      ),
      FallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          default: undefined,
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          default: undefined,
        }),
      ),
      Twiml: t.Optional(
        t.String({
          description:
            'TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive',
        }),
      ),
      TimeLimit: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
        }),
      ),
    },
    { title: 'UpdateCallRequest' },
  ),
  DeleteCallParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallEventParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallEventQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListCallEventResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      events: t.Optional(t.Array(ApiV2010AccountCallCallEventSchema)),
    },
    { title: 'ListCallEventResponse' },
  ),
  FetchCallNotificationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^NO[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallNotificationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallNotificationQuery: t.Object({
    Log: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    MessageDate: t.Optional(t.Date()),
    'MessageDate<': t.Optional(t.Date()),
    'MessageDate>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListCallNotificationResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      notifications: t.Optional(t.Array(ApiV2010AccountCallCallNotificationSchema)),
    },
    { title: 'ListCallNotificationResponse' },
  ),
  ListCallRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListCallRecordingQuery: t.Object({
    DateCreated: t.Optional(t.Date()),
    'DateCreated<': t.Optional(t.Date()),
    'DateCreated>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListCallRecordingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      recordings: t.Optional(t.Array(ApiV2010AccountCallCallRecordingSchema)),
    },
    { title: 'ListCallRecordingResponse' },
  ),
  CreateCallRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateCallRecordingBody: t.Object(
    {
      RecordingStatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.',
        }),
      ),
      RecordingStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback).',
        }),
      ),
      RecordingStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`.',
          default: undefined,
        }),
      ),
      Trim: t.Optional(
        t.String({
          description:
            'Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not.',
        }),
      ),
      RecordingChannels: t.Optional(
        t.String({
          description:
            'The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.',
        }),
      ),
      RecordingTrack: t.Optional(
        t.String({
          description:
            'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
        }),
      ),
      RecordingConfigurationId: t.Optional(
        t.String({
          description:
            'The identifier of the configuration to be used when creating and processing the recording',
        }),
      ),
    },
    { title: 'CreateCallRecordingRequest' },
  ),
  FetchCallRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateCallRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String(),
  }),
  UpdateCallRecordingBody: t.Object(
    {
      Status: t.UnionEnum(
        ['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent'],
        {
          description:
            'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
          default: undefined,
        },
      ),
      PauseBehavior: t.Optional(
        t.String({
          description:
            'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
        }),
      ),
    },
    { title: 'UpdateCallRecordingRequest' },
  ),
  UpdateCallRecordingResponse408: t.Object({
    code: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'Twilio-specific error code',
      }),
    ),
    message: t.Optional(t.String({ description: 'Error message' })),
    more_info: t.Optional(t.String({ description: 'Link to Error Code References' })),
    status: t.Optional(
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'HTTP response status code',
      }),
    ),
  }),
  DeleteCallRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  FetchConferenceParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateConferenceParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String(),
  }),
  UpdateConferenceBody: t.Object(
    {
      Status: t.Optional(t.Literal('completed')),
      AnnounceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
        }),
      ),
      AnnounceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`',
          default: undefined,
        }),
      ),
    },
    { title: 'UpdateConferenceRequest' },
  ),
  ListConferenceParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListConferenceQuery: t.Object({
    DateCreated: t.Optional(t.Date()),
    'DateCreated<': t.Optional(t.Date()),
    'DateCreated>': t.Optional(t.Date()),
    DateUpdated: t.Optional(t.Date()),
    'DateUpdated<': t.Optional(t.Date()),
    'DateUpdated>': t.Optional(t.Date()),
    FriendlyName: t.Optional(t.String()),
    Status: t.Optional(
      t.UnionEnum(['init', 'in-progress', 'completed'], {
        description:
          'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
        default: undefined,
      }),
    ),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListConferenceResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      conferences: t.Optional(t.Array(ApiV2010AccountConferenceSchema)),
    },
    { title: 'ListConferenceResponse' },
  ),
  ListConferenceRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListConferenceRecordingQuery: t.Object({
    DateCreated: t.Optional(t.Date()),
    'DateCreated<': t.Optional(t.Date()),
    'DateCreated>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListConferenceRecordingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      recordings: t.Optional(t.Array(ApiV2010AccountConferenceConferenceRecordingSchema)),
    },
    { title: 'ListConferenceRecordingResponse' },
  ),
  FetchConferenceRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateConferenceRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String(),
  }),
  UpdateConferenceRecordingBody: t.Object(
    {
      Status: t.UnionEnum(
        ['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent'],
        {
          description:
            'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
          default: undefined,
        },
      ),
      PauseBehavior: t.Optional(
        t.String({
          description:
            'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
        }),
      ),
    },
    { title: 'UpdateConferenceRecordingRequest' },
  ),
  DeleteConferenceRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  FetchConnectAppParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateConnectAppParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateConnectAppBody: t.Object(
    {
      AuthorizeRedirectUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
        }),
      ),
      CompanyName: t.Optional(
        t.String({ description: 'The company name to set for the Connect App.' }),
      ),
      DeauthorizeCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description: 'The HTTP method to use when calling `deauthorize_callback_url`.',
          default: undefined,
        }),
      ),
      DeauthorizeCallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.',
        }),
      ),
      Description: t.Optional(t.String({ description: 'A description of the Connect App.' })),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
      HomepageUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'A public URL where users can obtain more information about this Connect App.',
        }),
      ),
      Permissions: t.Optional(
        t.ArrayQuery(
          t.UnionEnum(['get-all', 'post-all'], {
            description: 'The set of permissions that your ConnectApp requests.',
            default: undefined,
          }),
          {
            description:
              'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
          },
        ),
      ),
    },
    { title: 'UpdateConnectAppRequest' },
  ),
  DeleteConnectAppParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListConnectAppParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListConnectAppQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListConnectAppResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      connect_apps: t.Optional(t.Array(ApiV2010AccountConnectAppSchema)),
    },
    { title: 'ListConnectAppResponse' },
  ),
  ListDependentPhoneNumberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AddressSid: t.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListDependentPhoneNumberQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListDependentPhoneNumberResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      dependent_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountAddressDependentPhoneNumberSchema),
      ),
    },
    { title: 'ListDependentPhoneNumberResponse' },
  ),
  FetchIncomingPhoneNumberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateIncomingPhoneNumberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateIncomingPhoneNumberBody: t.Object(
    {
      AccountSid: t.Optional(
        t.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).',
        }),
      ),
      ApiVersion: t.Optional(
        t.String({
          description:
            'The API version to use for incoming calls made to the phone number. The default is `2010-04-01`.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
        }),
      ),
      SmsApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the phone number receives an incoming SMS message.',
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
      ),
      EmergencyStatus: t.Optional(
        t.UnionEnum(['Active', 'Inactive'], {
          description:
            'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
          default: undefined,
        }),
      ),
      EmergencyAddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration to use for emergency calling from this phone number.',
        }),
      ),
      TrunkSid: t.Optional(
        t.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
      ),
      VoiceReceiveMode: t.Optional(t.UnionEnum(['voice', 'fax'], { default: undefined })),
      IdentitySid: t.Optional(
        t.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations.',
        }),
      ),
      AddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations.',
        }),
      ),
      BundleSid: t.Optional(
        t.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
      ),
    },
    { title: 'UpdateIncomingPhoneNumberRequest' },
  ),
  DeleteIncomingPhoneNumberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberQuery: t.Object({
    Beta: t.Optional(t.Boolean()),
    FriendlyName: t.Optional(t.String()),
    PhoneNumber: t.Optional(t.String()),
    Origin: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListIncomingPhoneNumberResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      incoming_phone_numbers: t.Optional(t.Array(ApiV2010AccountIncomingPhoneNumberSchema)),
    },
    { title: 'ListIncomingPhoneNumberResponse' },
  ),
  CreateIncomingPhoneNumberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateIncomingPhoneNumberBody: t.Object(
    {
      ApiVersion: t.Optional(
        t.String({
          description:
            'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number.',
        }),
      ),
      SmsApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the new phone number receives an incoming SMS message.',
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
      ),
      EmergencyStatus: t.Optional(
        t.UnionEnum(['Active', 'Inactive'], {
          description:
            'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
          default: undefined,
        }),
      ),
      EmergencyAddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        }),
      ),
      TrunkSid: t.Optional(
        t.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
      ),
      IdentitySid: t.Optional(
        t.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
        }),
      ),
      AddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        }),
      ),
      VoiceReceiveMode: t.Optional(t.UnionEnum(['voice', 'fax'], { default: undefined })),
      BundleSid: t.Optional(
        t.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
      ),
      PhoneNumber: t.Optional(
        t.String({
          description:
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
        }),
      ),
      AreaCode: t.Optional(
        t.String({
          description:
            'The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only).',
        }),
      ),
    },
    { title: 'CreateIncomingPhoneNumberRequest' },
  ),
  FetchIncomingPhoneNumberAssignedAddOnParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ResourceSid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteIncomingPhoneNumberAssignedAddOnParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ResourceSid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberAssignedAddOnParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ResourceSid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberAssignedAddOnQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListIncomingPhoneNumberAssignedAddOnResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      assigned_add_ons: t.Optional(
        t.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema),
      ),
    },
    { title: 'ListIncomingPhoneNumberAssignedAddOnResponse' },
  ),
  CreateIncomingPhoneNumberAssignedAddOnParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ResourceSid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateIncomingPhoneNumberAssignedAddOnBody: t.Object(
    {
      InstalledAddOnSid: t.String({
        pattern: '^XE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID that identifies the Add-on installation.',
      }),
    },
    { title: 'CreateIncomingPhoneNumberAssignedAddOnRequest' },
  ),
  FetchIncomingPhoneNumberAssignedAddOnExtensionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ResourceSid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AssignedAddOnSid: t.String({ pattern: '^XE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberAssignedAddOnExtensionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ResourceSid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AssignedAddOnSid: t.String({ pattern: '^XE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberAssignedAddOnExtensionQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListIncomingPhoneNumberAssignedAddOnExtensionResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      extensions: t.Optional(
        t.Array(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
        ),
      ),
    },
    { title: 'ListIncomingPhoneNumberAssignedAddOnExtensionResponse' },
  ),
  ListIncomingPhoneNumberLocalParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberLocalQuery: t.Object({
    Beta: t.Optional(t.Boolean()),
    FriendlyName: t.Optional(t.String()),
    PhoneNumber: t.Optional(t.String()),
    Origin: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListIncomingPhoneNumberLocalResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      incoming_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema),
      ),
    },
    { title: 'ListIncomingPhoneNumberLocalResponse' },
  ),
  CreateIncomingPhoneNumberLocalParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateIncomingPhoneNumberLocalBody: t.Object(
    {
      PhoneNumber: t.String({
        description:
          'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      }),
      ApiVersion: t.Optional(
        t.String({
          description:
            'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
        }),
      ),
      SmsApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the new phone number receives an incoming SMS message.',
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
      ),
      IdentitySid: t.Optional(
        t.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
        }),
      ),
      AddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        }),
      ),
      EmergencyStatus: t.Optional(
        t.UnionEnum(['Active', 'Inactive'], {
          description:
            'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
          default: undefined,
        }),
      ),
      EmergencyAddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        }),
      ),
      TrunkSid: t.Optional(
        t.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
      ),
      VoiceReceiveMode: t.Optional(t.UnionEnum(['voice', 'fax'], { default: undefined })),
      BundleSid: t.Optional(
        t.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
      ),
    },
    { title: 'CreateIncomingPhoneNumberLocalRequest' },
  ),
  ListIncomingPhoneNumberMobileParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberMobileQuery: t.Object({
    Beta: t.Optional(t.Boolean()),
    FriendlyName: t.Optional(t.String()),
    PhoneNumber: t.Optional(t.String()),
    Origin: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListIncomingPhoneNumberMobileResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      incoming_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema),
      ),
    },
    { title: 'ListIncomingPhoneNumberMobileResponse' },
  ),
  CreateIncomingPhoneNumberMobileParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateIncomingPhoneNumberMobileBody: t.Object(
    {
      PhoneNumber: t.String({
        description:
          'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      }),
      ApiVersion: t.Optional(
        t.String({
          description:
            'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number.',
        }),
      ),
      SmsApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the new phone number receives an incoming SMS message.',
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
      ),
      IdentitySid: t.Optional(
        t.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
        }),
      ),
      AddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        }),
      ),
      EmergencyStatus: t.Optional(
        t.UnionEnum(['Active', 'Inactive'], {
          description:
            'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
          default: undefined,
        }),
      ),
      EmergencyAddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        }),
      ),
      TrunkSid: t.Optional(
        t.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
      ),
      VoiceReceiveMode: t.Optional(t.UnionEnum(['voice', 'fax'], { default: undefined })),
      BundleSid: t.Optional(
        t.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
      ),
    },
    { title: 'CreateIncomingPhoneNumberMobileRequest' },
  ),
  ListIncomingPhoneNumberTollFreeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListIncomingPhoneNumberTollFreeQuery: t.Object({
    Beta: t.Optional(t.Boolean()),
    FriendlyName: t.Optional(t.String()),
    PhoneNumber: t.Optional(t.String()),
    Origin: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListIncomingPhoneNumberTollFreeResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      incoming_phone_numbers: t.Optional(
        t.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema),
      ),
    },
    { title: 'ListIncomingPhoneNumberTollFreeResponse' },
  ),
  CreateIncomingPhoneNumberTollFreeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateIncomingPhoneNumberTollFreeBody: t.Object(
    {
      PhoneNumber: t.String({
        description:
          'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      }),
      ApiVersion: t.Optional(
        t.String({
          description:
            'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
        }),
      ),
      SmsApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when the new phone number receives an incoming SMS message.',
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
      ),
      VoiceCallerIdLookup: t.Optional(
        t.BooleanString({
          description:
            "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
      ),
      IdentitySid: t.Optional(
        t.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations.',
        }),
      ),
      AddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        }),
      ),
      EmergencyStatus: t.Optional(
        t.UnionEnum(['Active', 'Inactive'], {
          description:
            'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
          default: undefined,
        }),
      ),
      EmergencyAddressSid: t.Optional(
        t.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        }),
      ),
      TrunkSid: t.Optional(
        t.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
      ),
      VoiceReceiveMode: t.Optional(t.UnionEnum(['voice', 'fax'], { default: undefined })),
      BundleSid: t.Optional(
        t.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
      ),
    },
    { title: 'CreateIncomingPhoneNumberTollFreeRequest' },
  ),
  FetchKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateKeyBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    },
    { title: 'UpdateKeyRequest' },
  ),
  DeleteKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListKeyQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListKeyResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      keys: t.Optional(t.Array(ApiV2010AccountKeySchema)),
    },
    { title: 'ListKeyResponse' },
  ),
  CreateNewKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateNewKeyBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    },
    { title: 'CreateNewKeyRequest' },
  ),
  FetchMediaParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    MessageSid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^ME[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteMediaParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    MessageSid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^ME[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListMediaParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    MessageSid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListMediaQuery: t.Object({
    DateCreated: t.Optional(t.Date()),
    'DateCreated<': t.Optional(t.Date()),
    'DateCreated>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListMediaResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      media_list: t.Optional(t.Array(ApiV2010AccountMessageMediaSchema)),
    },
    { title: 'ListMediaResponse' },
  ),
  FetchMemberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    QueueSid: t.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String(),
  }),
  UpdateMemberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    QueueSid: t.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String(),
  }),
  UpdateMemberBody: t.Object(
    {
      Url: t.String({ format: 'uri', description: 'The absolute URL of the Queue resource.' }),
      Method: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
          default: undefined,
        }),
      ),
    },
    { title: 'UpdateMemberRequest' },
  ),
  ListMemberParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    QueueSid: t.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListMemberQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListMemberResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      queue_members: t.Optional(t.Array(ApiV2010AccountQueueMemberSchema)),
    },
    { title: 'ListMemberResponse' },
  ),
  ListMessageParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListMessageQuery: t.Object({
    To: t.Optional(t.String()),
    From: t.Optional(t.String()),
    DateSent: t.Optional(t.Date()),
    'DateSent<': t.Optional(t.Date()),
    'DateSent>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListMessageResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      messages: t.Optional(t.Array(ApiV2010AccountMessageSchema)),
    },
    { title: 'ListMessageResponse' },
  ),
  CreateMessageParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateMessageBody: t.Object(
    {
      To: t.String({
        description:
          "The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.",
      }),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). ',
        }),
      ),
      ApplicationSid: t.Optional(
        t.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            "The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored.",
        }),
      ),
      MaxPrice: t.Optional(
        t.Numeric({
          description: '[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.',
        }),
      ),
      ProvideFeedback: t.Optional(
        t.BooleanString({
          description:
            'Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`.',
        }),
      ),
      Attempt: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'Total number of attempts made (including this request) to send the message regardless of the provider used',
        }),
      ),
      ValidityPeriod: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            "The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)",
        }),
      ),
      ForceDelivery: t.Optional(t.BooleanString({ description: 'Reserved' })),
      ContentRetention: t.Optional(
        t.UnionEnum(['retain', 'discard'], {
          description:
            'Determines if the message content can be stored or redacted based on privacy settings',
          default: undefined,
        }),
      ),
      AddressRetention: t.Optional(
        t.UnionEnum(['retain', 'obfuscate'], {
          description:
            'Determines if the address can be stored or obfuscated based on privacy settings',
          default: undefined,
        }),
      ),
      SmartEncoded: t.Optional(
        t.BooleanString({
          description:
            'Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`.',
        }),
      ),
      PersistentAction: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).',
        }),
      ),
      TrafficType: t.Optional(t.Literal('free')),
      ShortenUrls: t.Optional(
        t.BooleanString({
          description:
            'For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided.',
        }),
      ),
      ScheduleType: t.Optional(
        t.Literal('fixed', {
          description:
            'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
        }),
      ),
      SendAt: t.Optional(
        t.Date({
          description: 'The time that Twilio will send the message. Must be in ISO 8601 format.',
        }),
      ),
      SendAsMms: t.Optional(
        t.BooleanString({
          description:
            'If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media.',
        }),
      ),
      ContentVariables: t.Optional(
        t.String({
          description:
            "For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used.",
        }),
      ),
      MessageIntent: t.Optional(
        t.String({
          description:
            "Specifies the purpose or use case of the outbound communication. This parameter is used by Twilio's [Traffic Shaping](https://www.twilio.com/docs/messaging/features/traffic-shaping) and [Compliance Toolkit](https://www.twilio.com/docs/messaging/features/compliance-toolkit) products. Possible values include: `otp`, `notifications`, `marketing`, `fraud`, `security`, `customercare`, `delivery`, `education`, `polling`, `announcements`, and `events`.",
        }),
      ),
      RiskCheck: t.Optional(
        t.UnionEnum(['enable', 'disable'], {
          description:
            'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
          default: undefined,
        }),
      ),
      From: t.Optional(
        t.String({
          description:
            "The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.",
        }),
      ),
      FallbackFrom: t.Optional(
        t.String({
          description:
            'A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message.',
        }),
      ),
      MessagingServiceSid: t.Optional(
        t.String({
          pattern: '^MG[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            "The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool.",
        }),
      ),
      Body: t.Optional(
        t.String({
          description:
            'The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).',
        }),
      ),
      MediaUrl: t.Optional(
        t.ArrayQuery(t.String({ format: 'uri' }), {
          description:
            'The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.',
        }),
      ),
      ContentSid: t.Optional(
        t.String({
          pattern: '^HX[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            "For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources).",
        }),
      ),
    },
    { title: 'CreateMessageRequest' },
  ),
  FetchMessageParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateMessageParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateMessageBody: t.Object(
    {
      Body: t.Optional(
        t.String({
          description:
            "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
        }),
      ),
      Status: t.Optional(t.Literal('canceled')),
    },
    { title: 'UpdateMessageRequest' },
  ),
  DeleteMessageParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateMessageFeedbackParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    MessageSid: t.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateMessageFeedbackBody: t.Object(
    {
      Outcome: t.Optional(
        t.UnionEnum(['confirmed', 'unconfirmed'], {
          description:
            'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
          default: undefined,
        }),
      ),
    },
    { title: 'CreateMessageFeedbackRequest' },
  ),
  ListSigningKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSigningKeyQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSigningKeyResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      signing_keys: t.Optional(t.Array(ApiV2010AccountSigningKeySchema)),
    },
    { title: 'ListSigningKeyResponse' },
  ),
  CreateNewSigningKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateNewSigningKeyBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    },
    { title: 'CreateNewSigningKeyRequest' },
  ),
  FetchNotificationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^NO[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListNotificationParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListNotificationQuery: t.Object({
    Log: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    MessageDate: t.Optional(t.Date()),
    'MessageDate<': t.Optional(t.Date()),
    'MessageDate>': t.Optional(t.Date()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListNotificationResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      notifications: t.Optional(t.Array(ApiV2010AccountNotificationSchema)),
    },
    { title: 'ListNotificationResponse' },
  ),
  FetchOutgoingCallerIdParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateOutgoingCallerIdParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateOutgoingCallerIdBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    },
    { title: 'UpdateOutgoingCallerIdRequest' },
  ),
  DeleteOutgoingCallerIdParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListOutgoingCallerIdParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListOutgoingCallerIdQuery: t.Object({
    PhoneNumber: t.Optional(t.String()),
    FriendlyName: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListOutgoingCallerIdResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      outgoing_caller_ids: t.Optional(t.Array(ApiV2010AccountOutgoingCallerIdSchema)),
    },
    { title: 'ListOutgoingCallerIdResponse' },
  ),
  CreateValidationRequestParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateValidationRequestBody: t.Object(
    {
      PhoneNumber: t.String({
        description:
          'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number.',
        }),
      ),
      CallDelay: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of seconds to delay before initiating the verification call. Can be an integer between `0` and `60`, inclusive. The default is `0`.',
        }),
      ),
      Extension: t.Optional(
        t.String({ description: 'The digits to dial after connecting the verification call.' }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information about the verification process to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`.',
          default: undefined,
        }),
      ),
    },
    { title: 'CreateValidationRequestRequest' },
  ),
  FetchParticipantParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String(),
  }),
  UpdateParticipantParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String(),
  }),
  UpdateParticipantBody: t.Object(
    {
      Muted: t.Optional(
        t.BooleanString({
          description:
            'Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`.',
        }),
      ),
      Hold: t.Optional(
        t.BooleanString({
          description:
            'Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference.',
        }),
      ),
      HoldUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
        }),
      ),
      HoldMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`.',
          default: undefined,
        }),
      ),
      AnnounceUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
        }),
      ),
      AnnounceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      WaitUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
        }),
      ),
      WaitMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
          default: undefined,
        }),
      ),
      BeepOnExit: t.Optional(
        t.BooleanString({
          description:
            'Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`.',
        }),
      ),
      EndConferenceOnExit: t.Optional(
        t.BooleanString({
          description:
            'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
        }),
      ),
      Coaching: t.Optional(
        t.BooleanString({
          description:
            'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
        }),
      ),
      CallSidToCoach: t.Optional(
        t.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
        }),
      ),
    },
    { title: 'UpdateParticipantRequest' },
  ),
  DeleteParticipantParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String(),
  }),
  ListParticipantParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListParticipantQuery: t.Object({
    Muted: t.Optional(t.Boolean()),
    Hold: t.Optional(t.Boolean()),
    Coaching: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListParticipantResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      participants: t.Optional(t.Array(ApiV2010AccountConferenceParticipantSchema)),
    },
    { title: 'ListParticipantResponse' },
  ),
  CreateParticipantParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ConferenceSid: t.String(),
  }),
  CreateParticipantBody: t.Object(
    {
      From: t.String({
        description:
          'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.',
      }),
      To: t.String({
        description:
          'The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified.',
      }),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `status_callback_method` to send status information to your application.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      StatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.',
        }),
      ),
      Label: t.Optional(
        t.String({
          description:
            'A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.',
        }),
      ),
      Timeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds.',
        }),
      ),
      Record: t.Optional(
        t.BooleanString({
          description:
            'Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`.',
        }),
      ),
      Muted: t.Optional(
        t.BooleanString({
          description:
            'Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`.',
        }),
      ),
      Beep: t.Optional(
        t.String({
          description:
            'Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`.',
        }),
      ),
      StartConferenceOnEnter: t.Optional(
        t.BooleanString({
          description:
            'Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
        }),
      ),
      EndConferenceOnExit: t.Optional(
        t.BooleanString({
          description:
            'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
        }),
      ),
      WaitUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
        }),
      ),
      WaitMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
          default: undefined,
        }),
      ),
      EarlyMedia: t.Optional(
        t.BooleanString({
          description:
            'Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`.',
        }),
      ),
      MaxParticipants: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`.',
        }),
      ),
      ConferenceRecord: t.Optional(
        t.String({
          description:
            'Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`.',
        }),
      ),
      ConferenceTrim: t.Optional(
        t.String({
          description:
            'Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`.',
        }),
      ),
      ConferenceStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored.',
        }),
      ),
      ConferenceStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      ConferenceStatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            'The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.',
        }),
      ),
      RecordingChannels: t.Optional(
        t.String({
          description:
            'The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`.',
        }),
      ),
      RecordingStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call using the `recording_status_callback_method` when the recording status changes.',
        }),
      ),
      RecordingStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      SipAuthUsername: t.Optional(
        t.String({ description: 'The SIP username used for authentication.' }),
      ),
      SipAuthPassword: t.Optional(
        t.String({ description: 'The SIP password for authentication.' }),
      ),
      Region: t.Optional(
        t.String({
          description:
            'The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`.',
        }),
      ),
      ConferenceRecordingStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available.',
        }),
      ),
      ConferenceRecordingStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          default: undefined,
        }),
      ),
      RecordingStatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            "The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.",
        }),
      ),
      ConferenceRecordingStatusCallbackEvent: t.Optional(
        t.ArrayQuery(t.String(), {
          description:
            "The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`",
        }),
      ),
      Coaching: t.Optional(
        t.BooleanString({
          description:
            'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
        }),
      ),
      CallSidToCoach: t.Optional(
        t.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
        }),
      ),
      JitterBufferSize: t.Optional(
        t.String({
          description:
            "Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`.",
        }),
      ),
      Byoc: t.Optional(
        t.String({
          pattern: '^BY[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
        }),
      ),
      CallerId: t.Optional(
        t.String({
          description:
            'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint.',
        }),
      ),
      CallReason: t.Optional(
        t.String({
          description:
            "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
        }),
      ),
      RecordingTrack: t.Optional(
        t.String({
          description:
            'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio.',
        }),
      ),
      RecordingConfigurationId: t.Optional(
        t.String({
          description:
            'The identifier of the configuration to be used when creating and processing the recording',
        }),
      ),
      TimeLimit: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
        }),
      ),
      MachineDetection: t.Optional(
        t.String({
          description:
            'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
        }),
      ),
      MachineDetectionTimeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
        }),
      ),
      MachineDetectionSpeechThreshold: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
        }),
      ),
      MachineDetectionSpeechEndThreshold: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
        }),
      ),
      MachineDetectionSilenceTimeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
        }),
      ),
      AmdStatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
        }),
      ),
      AmdStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          default: undefined,
        }),
      ),
      Trim: t.Optional(
        t.String({
          description:
            'Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
        }),
      ),
      CallToken: t.Optional(
        t.String({
          description:
            "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
        }),
      ),
      Passports: t.Optional(
        t.String({
          description:
            'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
        }),
      ),
      ClientNotificationUrl: t.Optional(
        t.String({
          format: 'uri',
          description: 'The URL that we should use to deliver `push call notification`.',
        }),
      ),
      CallerDisplayName: t.Optional(
        t.String({
          description:
            'The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.',
        }),
      ),
      EmergencyCallerPosition: t.Optional(
        t.String({
          description:
            'The emergency caller\'s GPS coordinates in decimal degrees format.\nFormat: "latitude longitude" (space-separated)\n- Latitude: decimal degrees, range -90.0 to +90.0 (negative for South, positive for North)\n- Longitude: decimal degrees, range -180.0 to +180.0 (negative for West, positive for East)\n- Precision: up to 6 decimal places recommended for meter-level accuracy\n\nNote: If the value exceeds 150 characters, only the first 150 characters will be used.\n',
        }),
      ),
      EmergencyCallerLocation: t.Optional(
        t.String({
          description:
            "The emergency caller's physical location description within a building or facility.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        }),
      ),
      EmergencyName: t.Optional(
        t.String({
          description:
            "The emergency caller's organization or entity name.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        }),
      ),
      EmergencyAddress: t.Optional(
        t.String({
          description:
            "The emergency caller's street address including street number and street name.\n\nNote: If the value exceeds 60 characters, only the first 60 characters will be used.\n",
        }),
      ),
      EmergencyZipCode: t.Optional(
        t.String({
          description:
            "The emergency caller's postal code or ZIP code.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        }),
      ),
      EmergencyCity: t.Optional(
        t.String({
          description:
            "The emergency caller's city or municipality name.\nShould be the official city name as recognized by local authorities.\nUsed in combination with state and country for emergency call routing.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        }),
      ),
      EmergencyState: t.Optional(
        t.String({
          description:
            "The emergency caller's state or province.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        }),
      ),
      EmergencyCountry: t.Optional(
        t.String({
          description:
            "The emergency caller's country. Currently supported US and CA only.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        }),
      ),
    },
    { title: 'CreateParticipantRequest' },
  ),
  CreatePaymentsParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreatePaymentsBody: t.Object(
    {
      IdempotencyKey: t.String({
        description:
          'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
      }),
      StatusCallback: t.String({
        format: 'uri',
        description:
          'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback)',
      }),
      BankAccountType: t.Optional(
        t.UnionEnum(['consumer-checking', 'consumer-savings', 'commercial-checking'], {
          description:
            'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
          default: undefined,
        }),
      ),
      ChargeAmount: t.Optional(
        t.Numeric({
          description:
            'A positive decimal value less than 1,000,000 to charge against the credit card or bank account. Default currency can be overwritten with `currency` field. Leave blank or set to 0 to tokenize.',
        }),
      ),
      Currency: t.Optional(
        t.String({
          description:
            'The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted.',
        }),
      ),
      Description: t.Optional(
        t.String({
          description:
            'The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions.',
        }),
      ),
      Input: t.Optional(
        t.String({
          description:
            'A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs.',
        }),
      ),
      MinPostalCodeLength: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'A positive integer that is used to validate the length of the `PostalCode` inputted by the user. User must enter this many digits.',
        }),
      ),
      Parameter: t.Optional(t.Unknown()),
      PaymentConnector: t.Optional(
        t.String({
          description:
            'This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`.',
        }),
      ),
      PaymentMethod: t.Optional(
        t.UnionEnum(['credit-card', 'ach-debit'], {
          description:
            'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
          default: undefined,
        }),
      ),
      PostalCode: t.Optional(
        t.BooleanString({
          description:
            'Indicates whether the credit card postal code (zip code) is a required piece of payment information that must be provided by the caller. The default is `true`.',
        }),
      ),
      SecurityCode: t.Optional(
        t.BooleanString({
          description:
            'Indicates whether the credit card security code is a required piece of payment information that must be provided by the caller. The default is `true`.',
        }),
      ),
      Timeout: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The number of seconds that <Pay> should wait for the caller to press a digit between each subsequent digit, after the first one, before moving on to validate the digits captured. The default is `5`, maximum is `600`.',
        }),
      ),
      TokenType: t.Optional(
        t.UnionEnum(['one-time', 'reusable', 'payment-method'], {
          description:
            'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
          default: undefined,
        }),
      ),
      ValidCardTypes: t.Optional(
        t.String({
          description:
            'Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex`',
        }),
      ),
      RequireMatchingInputs: t.Optional(
        t.String({
          description:
            'A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`.',
        }),
      ),
      Confirmation: t.Optional(
        t.UnionEnum(['true', 'false'], {
          description:
            'Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`.',
          default: undefined,
        }),
      ),
    },
    { title: 'CreatePaymentsRequest' },
  ),
  UpdatePaymentsParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^PK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdatePaymentsBody: t.Object(
    {
      IdempotencyKey: t.String({
        description:
          'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
      }),
      StatusCallback: t.String({
        format: 'uri',
        description:
          'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests.',
      }),
      Capture: t.Optional(
        t.UnionEnum(
          [
            'payment-card-number',
            'expiration-date',
            'security-code',
            'postal-code',
            'bank-routing-number',
            'bank-account-number',
            'payment-card-number-matcher',
            'expiration-date-matcher',
            'security-code-matcher',
            'postal-code-matcher',
          ],
          {
            description:
              'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
            default: undefined,
          },
        ),
      ),
      Status: t.Optional(
        t.UnionEnum(['complete', 'cancel'], {
          description:
            'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
          default: undefined,
        }),
      ),
    },
    { title: 'UpdatePaymentsRequest' },
  ),
  FetchQueueParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateQueueParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateQueueBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
        }),
      ),
      MaxSize: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
        }),
      ),
    },
    { title: 'UpdateQueueRequest' },
  ),
  DeleteQueueParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListQueueParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListQueueQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListQueueResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      queues: t.Optional(t.Array(ApiV2010AccountQueueSchema)),
    },
    { title: 'ListQueueResponse' },
  ),
  CreateQueueParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateQueueBody: t.Object(
    {
      FriendlyName: t.String({
        description:
          'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
      }),
      MaxSize: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
        }),
      ),
    },
    { title: 'CreateQueueRequest' },
  ),
  CreateRealtimeTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateRealtimeTranscriptionBody: t.Object(
    {
      Name: t.Optional(
        t.String({
          description:
            'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
        }),
      ),
      Track: t.Optional(
        t.UnionEnum(['inbound_track', 'outbound_track', 'both_tracks'], {
          description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.',
          default: undefined,
        }),
      ),
      StatusCallbackUrl: t.Optional(
        t.String({ format: 'uri', description: 'Absolute URL of the status callback.' }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description: 'The http method for the status_callback (one of GET, POST).',
          default: undefined,
        }),
      ),
      InboundTrackLabel: t.Optional(
        t.String({ description: 'Friendly name given to the Inbound Track' }),
      ),
      OutboundTrackLabel: t.Optional(
        t.String({ description: 'Friendly name given to the Outbound Track' }),
      ),
      PartialResults: t.Optional(
        t.BooleanString({
          description: 'Indicates if partial results are going to be sent to the customer',
        }),
      ),
      LanguageCode: t.Optional(
        t.String({
          description:
            'Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format',
        }),
      ),
      TranscriptionEngine: t.Optional(
        t.String({
          description:
            'Definition of the transcription engine to be used, among those supported by Twilio',
        }),
      ),
      ProfanityFilter: t.Optional(
        t.BooleanString({
          description:
            'indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks',
        }),
      ),
      SpeechModel: t.Optional(
        t.String({
          description:
            'Recognition model used by the transcription engine, among those supported by the provider',
        }),
      ),
      Hints: t.Optional(
        t.String({
          description:
            'A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them.',
        }),
      ),
      EnableAutomaticPunctuation: t.Optional(
        t.BooleanString({ description: 'The provider will add punctuation to recognition result' }),
      ),
      IntelligenceService: t.Optional(
        t.String({
          description:
            'The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators',
        }),
      ),
      ConversationConfiguration: t.Optional(
        t.String({
          description:
            'The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service',
        }),
      ),
      ConversationId: t.Optional(
        t.String({
          description:
            'The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service',
        }),
      ),
      TranscriptionConfigurationId: t.Optional(
        t.String({
          description:
            'The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go.',
        }),
      ),
      EnableProviderData: t.Optional(
        t.BooleanString({ description: 'Whether the callback includes raw provider data.' }),
      ),
    },
    { title: 'CreateRealtimeTranscriptionRequest' },
  ),
  UpdateRealtimeTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String(),
  }),
  UpdateRealtimeTranscriptionBody: t.Object(
    { Status: t.Literal('stopped') },
    { title: 'UpdateRealtimeTranscriptionRequest' },
  ),
  FetchRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  FetchRecordingQuery: t.Object({ IncludeSoftDeleted: t.Optional(t.Boolean()) }),
  DeleteRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingQuery: t.Object({
    DateCreated: t.Optional(t.Date()),
    'DateCreated<': t.Optional(t.Date()),
    'DateCreated>': t.Optional(t.Date()),
    CallSid: t.Optional(t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 })),
    ConferenceSid: t.Optional(
      t.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    ),
    IncludeSoftDeleted: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListRecordingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      recordings: t.Optional(t.Array(ApiV2010AccountRecordingSchema)),
    },
    { title: 'ListRecordingResponse' },
  ),
  FetchRecordingAddOnResultParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteRecordingAddOnResultParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingAddOnResultParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingAddOnResultQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListRecordingAddOnResultResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      add_on_results: t.Optional(t.Array(ApiV2010AccountRecordingRecordingAddOnResultSchema)),
    },
    { title: 'ListRecordingAddOnResultResponse' },
  ),
  FetchRecordingAddOnResultPayloadParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AddOnResultSid: t.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XH[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteRecordingAddOnResultPayloadParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AddOnResultSid: t.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^XH[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingAddOnResultPayloadParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AddOnResultSid: t.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingAddOnResultPayloadQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListRecordingAddOnResultPayloadResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      payloads: t.Optional(
        t.Array(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema),
      ),
    },
    { title: 'ListRecordingAddOnResultPayloadResponse' },
  ),
  FetchRecordingAddOnResultPayloadDataParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    AddOnResultSid: t.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    PayloadSid: t.String({ pattern: '^XH[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  FetchRecordingTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteRecordingTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    RecordingSid: t.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListRecordingTranscriptionQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListRecordingTranscriptionResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      transcriptions: t.Optional(t.Array(ApiV2010AccountRecordingRecordingTranscriptionSchema)),
    },
    { title: 'ListRecordingTranscriptionResponse' },
  ),
  FetchShortCodeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateShortCodeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateShortCodeBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code.',
        }),
      ),
      ApiVersion: t.Optional(
        t.String({
          description:
            'The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`.',
        }),
      ),
      SmsUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL we should call when receiving an incoming SMS message to this short code.',
        }),
      ),
      SmsMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      SmsFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
      ),
      SmsFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
    },
    { title: 'UpdateShortCodeRequest' },
  ),
  ListShortCodeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListShortCodeQuery: t.Object({
    FriendlyName: t.Optional(t.String()),
    ShortCode: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListShortCodeResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      short_codes: t.Optional(t.Array(ApiV2010AccountShortCodeSchema)),
    },
    { title: 'ListShortCodeResponse' },
  ),
  FetchSigningKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSigningKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSigningKeyBody: t.Object(
    { FriendlyName: t.Optional(t.String({ description: '' })) },
    { title: 'UpdateSigningKeyRequest' },
  ),
  DeleteSigningKeyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipAuthCallsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipAuthCallsCredentialListMappingQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipAuthCallsCredentialListMappingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      contents: t.Optional(
        t.Array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
        ),
      ),
    },
    { title: 'ListSipAuthCallsCredentialListMappingResponse' },
  ),
  CreateSipAuthCallsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipAuthCallsCredentialListMappingBody: t.Object(
    {
      CredentialListSid: t.String({
        pattern: '^CL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the CredentialList resource to map to the SIP domain.',
      }),
    },
    { title: 'CreateSipAuthCallsCredentialListMappingRequest' },
  ),
  FetchSipAuthCallsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteSipAuthCallsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipAuthCallsIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipAuthCallsIpAccessControlListMappingQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipAuthCallsIpAccessControlListMappingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      contents: t.Optional(
        t.Array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
        ),
      ),
    },
    { title: 'ListSipAuthCallsIpAccessControlListMappingResponse' },
  ),
  CreateSipAuthCallsIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipAuthCallsIpAccessControlListMappingBody: t.Object(
    {
      IpAccessControlListSid: t.String({
        pattern: '^AL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the IpAccessControlList resource to map to the SIP domain.',
      }),
    },
    { title: 'CreateSipAuthCallsIpAccessControlListMappingRequest' },
  ),
  FetchSipAuthCallsIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteSipAuthCallsIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipAuthRegistrationsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipAuthRegistrationsCredentialListMappingQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipAuthRegistrationsCredentialListMappingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      contents: t.Optional(
        t.Array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
        ),
      ),
    },
    { title: 'ListSipAuthRegistrationsCredentialListMappingResponse' },
  ),
  CreateSipAuthRegistrationsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipAuthRegistrationsCredentialListMappingBody: t.Object(
    {
      CredentialListSid: t.String({
        pattern: '^CL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the CredentialList resource to map to the SIP domain.',
      }),
    },
    { title: 'CreateSipAuthRegistrationsCredentialListMappingRequest' },
  ),
  FetchSipAuthRegistrationsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteSipAuthRegistrationsCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipCredentialParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CredentialListSid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipCredentialQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipCredentialResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      credentials: t.Optional(t.Array(ApiV2010AccountSipSipCredentialListSipCredentialSchema)),
    },
    { title: 'ListSipCredentialResponse' },
  ),
  CreateSipCredentialParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CredentialListSid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipCredentialBody: t.Object(
    {
      Username: t.String({
        description:
          "The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.",
      }),
      Password: t.String({
        description:
          'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
      }),
    },
    { title: 'CreateSipCredentialRequest' },
  ),
  FetchSipCredentialParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CredentialListSid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipCredentialParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CredentialListSid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipCredentialBody: t.Object(
    {
      Password: t.Optional(
        t.String({
          description:
            'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
        }),
      ),
    },
    { title: 'UpdateSipCredentialRequest' },
  ),
  DeleteSipCredentialParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CredentialListSid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipCredentialListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipCredentialListQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipCredentialListResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      credential_lists: t.Optional(t.Array(ApiV2010AccountSipSipCredentialListSchema)),
    },
    { title: 'ListSipCredentialListResponse' },
  ),
  CreateSipCredentialListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipCredentialListBody: t.Object(
    {
      FriendlyName: t.String({
        description:
          'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      }),
    },
    { title: 'CreateSipCredentialListRequest' },
  ),
  FetchSipCredentialListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipCredentialListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipCredentialListBody: t.Object(
    {
      FriendlyName: t.String({
        description:
          'A human readable descriptive text for a CredentialList, up to 64 characters long.',
      }),
    },
    { title: 'UpdateSipCredentialListRequest' },
  ),
  DeleteSipCredentialListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipCredentialListMappingQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipCredentialListMappingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      credential_list_mappings: t.Optional(
        t.Array(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema),
      ),
    },
    { title: 'ListSipCredentialListMappingResponse' },
  ),
  CreateSipCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipCredentialListMappingBody: t.Object(
    {
      CredentialListSid: t.String({
        pattern: '^CL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
      }),
    },
    { title: 'CreateSipCredentialListMappingRequest' },
  ),
  FetchSipCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteSipCredentialListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipDomainParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipDomainQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipDomainResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      domains: t.Optional(t.Array(ApiV2010AccountSipSipDomainSchema)),
    },
    { title: 'ListSipDomainResponse' },
  ),
  CreateSipDomainParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipDomainBody: t.Object(
    {
      DomainName: t.String({
        description:
          'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
      }),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description: 'The URL we should when the domain receives a call.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`.',
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceStatusCallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to pass status parameters (such as call ended) to your application.',
        }),
      ),
      VoiceStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      SipRegistration: t.Optional(
        t.BooleanString({
          description:
            'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
        }),
      ),
      EmergencyCallingEnabled: t.Optional(
        t.BooleanString({
          description:
            'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
        }),
      ),
      Secure: t.Optional(
        t.BooleanString({
          description:
            'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
        }),
      ),
      ByocTrunkSid: t.Optional(
        t.String({
          pattern: '^BY[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
        }),
      ),
      EmergencyCallerSid: t.Optional(
        t.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
        }),
      ),
    },
    { title: 'CreateSipDomainRequest' },
  ),
  FetchSipDomainParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipDomainParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipDomainBody: t.Object(
    {
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
        }),
      ),
      VoiceFallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceFallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`.',
        }),
      ),
      VoiceMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description: 'The HTTP method we should use to call `voice_url`',
          default: undefined,
        }),
      ),
      VoiceStatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
          default: undefined,
        }),
      ),
      VoiceStatusCallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description:
            'The URL that we should call to pass status parameters (such as call ended) to your application.',
        }),
      ),
      VoiceUrl: t.Optional(
        t.String({
          format: 'uri',
          description: 'The URL we should call when the domain receives a call.',
        }),
      ),
      SipRegistration: t.Optional(
        t.BooleanString({
          description:
            'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
        }),
      ),
      DomainName: t.Optional(
        t.String({
          description:
            'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
        }),
      ),
      EmergencyCallingEnabled: t.Optional(
        t.BooleanString({
          description:
            'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
        }),
      ),
      Secure: t.Optional(
        t.BooleanString({
          description:
            'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
        }),
      ),
      ByocTrunkSid: t.Optional(
        t.String({
          pattern: '^BY[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
        }),
      ),
      EmergencyCallerSid: t.Optional(
        t.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
        }),
      ),
    },
    { title: 'UpdateSipDomainRequest' },
  ),
  DeleteSipDomainParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipIpAccessControlListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipIpAccessControlListQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipIpAccessControlListResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      ip_access_control_lists: t.Optional(t.Array(ApiV2010AccountSipSipIpAccessControlListSchema)),
    },
    { title: 'ListSipIpAccessControlListResponse' },
  ),
  CreateSipIpAccessControlListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipIpAccessControlListBody: t.Object(
    {
      FriendlyName: t.String({
        description:
          'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
      }),
    },
    { title: 'CreateSipIpAccessControlListRequest' },
  ),
  FetchSipIpAccessControlListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipIpAccessControlListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipIpAccessControlListBody: t.Object(
    {
      FriendlyName: t.String({
        description: 'A human readable descriptive text, up to 255 characters long.',
      }),
    },
    { title: 'UpdateSipIpAccessControlListRequest' },
  ),
  DeleteSipIpAccessControlListParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  FetchSipIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteSipIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListSipIpAccessControlListMappingQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipIpAccessControlListMappingResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      ip_access_control_list_mappings: t.Optional(
        t.Array(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema),
      ),
    },
    { title: 'ListSipIpAccessControlListMappingResponse' },
  ),
  CreateSipIpAccessControlListMappingParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    DomainSid: t.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSipIpAccessControlListMappingBody: t.Object(
    {
      IpAccessControlListSid: t.String({
        pattern: '^AL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique id of the IP access control list to map to the SIP domain.',
      }),
    },
    { title: 'CreateSipIpAccessControlListMappingRequest' },
  ),
  ListSipIpAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    IpAccessControlListSid: t.String({
      pattern: '^AL[0-9a-fA-F]{32}$',
      minLength: 34,
      maxLength: 34,
    }),
  }),
  ListSipIpAddressQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListSipIpAddressResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      ip_addresses: t.Optional(t.Array(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)),
    },
    { title: 'ListSipIpAddressResponse' },
  ),
  CreateSipIpAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    IpAccessControlListSid: t.String({
      pattern: '^AL[0-9a-fA-F]{32}$',
      minLength: 34,
      maxLength: 34,
    }),
  }),
  CreateSipIpAddressBody: t.Object(
    {
      FriendlyName: t.String({
        description:
          'A human readable descriptive text for this resource, up to 255 characters long.',
      }),
      IpAddress: t.String({
        description:
          'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
      }),
      CidrPrefixLength: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
        }),
      ),
    },
    { title: 'CreateSipIpAddressRequest' },
  ),
  FetchSipIpAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    IpAccessControlListSid: t.String({
      pattern: '^AL[0-9a-fA-F]{32}$',
      minLength: 34,
      maxLength: 34,
    }),
    Sid: t.String({ pattern: '^IP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipIpAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    IpAccessControlListSid: t.String({
      pattern: '^AL[0-9a-fA-F]{32}$',
      minLength: 34,
      maxLength: 34,
    }),
    Sid: t.String({ pattern: '^IP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateSipIpAddressBody: t.Object(
    {
      IpAddress: t.Optional(
        t.String({
          description:
            'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A human readable descriptive text for this resource, up to 255 characters long.',
        }),
      ),
      CidrPrefixLength: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
        }),
      ),
    },
    { title: 'UpdateSipIpAddressRequest' },
  ),
  DeleteSipIpAddressParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    IpAccessControlListSid: t.String({
      pattern: '^AL[0-9a-fA-F]{32}$',
      minLength: 34,
      maxLength: 34,
    }),
    Sid: t.String({ pattern: '^IP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSiprecParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateSiprecBody: t.Object(
    {
      Name: t.Optional(
        t.String({
          description:
            'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
        }),
      ),
      ConnectorName: t.Optional(
        t.String({
          description: 'Unique name used when configuring the connector via Marketplace Add-on.',
        }),
      ),
      Track: t.Optional(
        t.UnionEnum(['inbound_track', 'outbound_track', 'both_tracks'], {
          description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.',
          default: undefined,
        }),
      ),
      StatusCallback: t.Optional(
        t.String({ format: 'uri', description: 'Absolute URL of the status callback.' }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description: 'The http method for the status_callback (one of GET, POST).',
          default: undefined,
        }),
      ),
      'Parameter1.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter1.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter2.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter2.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter3.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter3.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter4.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter4.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter5.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter5.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter6.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter6.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter7.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter7.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter8.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter8.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter9.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter9.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter10.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter10.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter11.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter11.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter12.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter12.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter13.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter13.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter14.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter14.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter15.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter15.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter16.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter16.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter17.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter17.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter18.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter18.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter19.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter19.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter20.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter20.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter21.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter21.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter22.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter22.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter23.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter23.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter24.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter24.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter25.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter25.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter26.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter26.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter27.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter27.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter28.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter28.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter29.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter29.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter30.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter30.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter31.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter31.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter32.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter32.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter33.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter33.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter34.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter34.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter35.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter35.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter36.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter36.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter37.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter37.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter38.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter38.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter39.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter39.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter40.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter40.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter41.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter41.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter42.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter42.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter43.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter43.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter44.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter44.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter45.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter45.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter46.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter46.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter47.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter47.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter48.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter48.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter49.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter49.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter50.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter50.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter51.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter51.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter52.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter52.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter53.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter53.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter54.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter54.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter55.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter55.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter56.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter56.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter57.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter57.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter58.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter58.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter59.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter59.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter60.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter60.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter61.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter61.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter62.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter62.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter63.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter63.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter64.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter64.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter65.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter65.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter66.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter66.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter67.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter67.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter68.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter68.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter69.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter69.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter70.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter70.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter71.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter71.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter72.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter72.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter73.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter73.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter74.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter74.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter75.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter75.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter76.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter76.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter77.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter77.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter78.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter78.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter79.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter79.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter80.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter80.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter81.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter81.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter82.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter82.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter83.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter83.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter84.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter84.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter85.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter85.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter86.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter86.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter87.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter87.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter88.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter88.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter89.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter89.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter90.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter90.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter91.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter91.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter92.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter92.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter93.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter93.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter94.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter94.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter95.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter95.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter96.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter96.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter97.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter97.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter98.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter98.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter99.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter99.Value': t.Optional(t.String({ description: 'Parameter value' })),
    },
    { title: 'CreateSiprecRequest' },
  ),
  UpdateSiprecParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String(),
  }),
  UpdateSiprecBody: t.Object({ Status: t.Literal('stopped') }, { title: 'UpdateSiprecRequest' }),
  CreateStreamParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateStreamBody: t.Object(
    {
      Url: t.String({
        format: 'uri',
        description: 'Relative or absolute URL where WebSocket connection will be established.',
      }),
      Name: t.Optional(
        t.String({
          description:
            'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
        }),
      ),
      Track: t.Optional(
        t.UnionEnum(['inbound_track', 'outbound_track', 'both_tracks'], {
          description:
            'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
          default: undefined,
        }),
      ),
      StatusCallback: t.Optional(
        t.String({
          format: 'uri',
          description: 'Absolute URL to which Twilio sends status callback HTTP requests.',
        }),
      ),
      StatusCallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`.',
          default: undefined,
        }),
      ),
      'Parameter1.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter1.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter2.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter2.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter3.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter3.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter4.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter4.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter5.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter5.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter6.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter6.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter7.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter7.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter8.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter8.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter9.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter9.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter10.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter10.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter11.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter11.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter12.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter12.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter13.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter13.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter14.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter14.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter15.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter15.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter16.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter16.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter17.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter17.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter18.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter18.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter19.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter19.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter20.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter20.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter21.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter21.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter22.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter22.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter23.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter23.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter24.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter24.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter25.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter25.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter26.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter26.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter27.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter27.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter28.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter28.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter29.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter29.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter30.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter30.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter31.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter31.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter32.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter32.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter33.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter33.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter34.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter34.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter35.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter35.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter36.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter36.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter37.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter37.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter38.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter38.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter39.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter39.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter40.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter40.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter41.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter41.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter42.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter42.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter43.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter43.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter44.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter44.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter45.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter45.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter46.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter46.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter47.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter47.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter48.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter48.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter49.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter49.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter50.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter50.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter51.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter51.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter52.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter52.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter53.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter53.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter54.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter54.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter55.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter55.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter56.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter56.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter57.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter57.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter58.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter58.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter59.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter59.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter60.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter60.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter61.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter61.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter62.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter62.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter63.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter63.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter64.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter64.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter65.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter65.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter66.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter66.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter67.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter67.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter68.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter68.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter69.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter69.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter70.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter70.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter71.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter71.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter72.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter72.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter73.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter73.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter74.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter74.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter75.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter75.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter76.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter76.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter77.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter77.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter78.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter78.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter79.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter79.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter80.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter80.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter81.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter81.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter82.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter82.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter83.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter83.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter84.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter84.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter85.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter85.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter86.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter86.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter87.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter87.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter88.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter88.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter89.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter89.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter90.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter90.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter91.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter91.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter92.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter92.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter93.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter93.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter94.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter94.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter95.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter95.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter96.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter96.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter97.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter97.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter98.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter98.Value': t.Optional(t.String({ description: 'Parameter value' })),
      'Parameter99.Name': t.Optional(t.String({ description: 'Parameter name' })),
      'Parameter99.Value': t.Optional(t.String({ description: 'Parameter value' })),
    },
    { title: 'CreateStreamRequest' },
  ),
  UpdateStreamParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String(),
  }),
  UpdateStreamBody: t.Object({ Status: t.Literal('stopped') }, { title: 'UpdateStreamRequest' }),
  CreateTokenParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateTokenBody: t.Object(
    {
      Ttl: t.Optional(
        t.Integer({
          maximum: 9007199254740991,
          description:
            'The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours).',
        }),
      ),
    },
    { title: 'CreateTokenRequest' },
  ),
  FetchTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  DeleteTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListTranscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListTranscriptionQuery: t.Object({
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListTranscriptionResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      transcriptions: t.Optional(t.Array(ApiV2010AccountTranscriptionSchema)),
    },
    { title: 'ListTranscriptionResponse' },
  ),
  ListUsageRecordParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordSchema)),
    },
    { title: 'ListUsageRecordResponse' },
  ),
  ListUsageRecordAllTimeParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordAllTimeQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordAllTimeResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema)),
    },
    { title: 'ListUsageRecordAllTimeResponse' },
  ),
  ListUsageRecordDailyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordDailyQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordDailyResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema)),
    },
    { title: 'ListUsageRecordDailyResponse' },
  ),
  ListUsageRecordLastMonthParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordLastMonthQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordLastMonthResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema)),
    },
    { title: 'ListUsageRecordLastMonthResponse' },
  ),
  ListUsageRecordMonthlyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordMonthlyQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordMonthlyResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema)),
    },
    { title: 'ListUsageRecordMonthlyResponse' },
  ),
  ListUsageRecordThisMonthParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordThisMonthQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordThisMonthResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema)),
    },
    { title: 'ListUsageRecordThisMonthResponse' },
  ),
  ListUsageRecordTodayParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordTodayQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordTodayResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema)),
    },
    { title: 'ListUsageRecordTodayResponse' },
  ),
  ListUsageRecordYearlyParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordYearlyQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordYearlyResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema)),
    },
    { title: 'ListUsageRecordYearlyResponse' },
  ),
  ListUsageRecordYesterdayParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageRecordYesterdayQuery: t.Object({
    Category: t.Optional(t.String()),
    StartDate: t.Optional(t.Date()),
    EndDate: t.Optional(t.Date()),
    IncludeSubaccounts: t.Optional(t.Boolean()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageRecordYesterdayResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_records: t.Optional(t.Array(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema)),
    },
    { title: 'ListUsageRecordYesterdayResponse' },
  ),
  FetchUsageTriggerParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^UT[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateUsageTriggerParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^UT[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  UpdateUsageTriggerBody: t.Object(
    {
      CallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
          default: undefined,
        }),
      ),
      CallbackUrl: t.Optional(
        t.String({
          format: 'uri',
          description: 'The URL we should call using `callback_method` when the trigger fires.',
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    },
    { title: 'UpdateUsageTriggerRequest' },
  ),
  DeleteUsageTriggerParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^UT[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageTriggerParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  ListUsageTriggerQuery: t.Object({
    Recurring: t.Optional(
      t.UnionEnum(['daily', 'monthly', 'yearly', 'alltime'], {
        description:
          'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
        default: undefined,
      }),
    ),
    TriggerBy: t.Optional(
      t.UnionEnum(['count', 'usage', 'price'], {
        description:
          'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
        default: undefined,
      }),
    ),
    UsageCategory: t.Optional(t.String()),
    PageSize: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 1000 })),
    Page: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    PageToken: t.Optional(t.String()),
  }),
  ListUsageTriggerResponse200: t.Object(
    {
      end: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      first_page_uri: t.Optional(t.String({ format: 'uri' })),
      next_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      page: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      page_size: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      previous_page_uri: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
      start: t.Optional(t.Integer({ maximum: 9007199254740991 })),
      uri: t.Optional(t.String({ format: 'uri' })),
      usage_triggers: t.Optional(t.Array(ApiV2010AccountUsageUsageTriggerSchema)),
    },
    { title: 'ListUsageTriggerResponse' },
  ),
  CreateUsageTriggerParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateUsageTriggerBody: t.Object(
    {
      CallbackUrl: t.String({
        format: 'uri',
        description: 'The URL we should call using `callback_method` when the trigger fires.',
      }),
      TriggerValue: t.String({
        description:
          'The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`.',
      }),
      UsageCategory: t.String({
        description:
          'The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value.',
      }),
      CallbackMethod: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
          default: undefined,
        }),
      ),
      FriendlyName: t.Optional(
        t.String({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
      Recurring: t.Optional(
        t.UnionEnum(['daily', 'monthly', 'yearly', 'alltime'], {
          description:
            'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
          default: undefined,
        }),
      ),
      TriggerBy: t.Optional(
        t.UnionEnum(['count', 'usage', 'price'], {
          description:
            'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
          default: undefined,
        }),
      ),
    },
    { title: 'CreateUsageTriggerRequest' },
  ),
  CreateUserDefinedMessageParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateUserDefinedMessageBody: t.Object(
    {
      Content: t.String({
        description: 'The User Defined Message in the form of URL-encoded JSON string.',
      }),
      IdempotencyKey: t.Optional(
        t.String({
          description:
            'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
        }),
      ),
    },
    { title: 'CreateUserDefinedMessageRequest' },
  ),
  CreateUserDefinedMessageSubscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
  CreateUserDefinedMessageSubscriptionBody: t.Object(
    {
      Callback: t.String({
        format: 'uri',
        description:
          'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
      }),
      IdempotencyKey: t.Optional(
        t.String({
          description:
            'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
        }),
      ),
      Method: t.Optional(
        t.UnionEnum(['GET', 'POST'], {
          description:
            'The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.',
          default: undefined,
        }),
      ),
    },
    { title: 'CreateUserDefinedMessageSubscriptionRequest' },
  ),
  DeleteUserDefinedMessageSubscriptionParams: t.Object({
    AccountSid: t.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    CallSid: t.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
    Sid: t.String({ pattern: '^ZY[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
  }),
} as const

export type _20100401Model = {
  [k in keyof typeof _20100401Model]: UnwrapSchema<(typeof _20100401Model)[k]>
}
