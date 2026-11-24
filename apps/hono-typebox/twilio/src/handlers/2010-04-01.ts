import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  AccountEnumStatusSchema,
  CallEnumStatusSchema,
  CallEnumUpdateStatusSchema,
  CallRecordingEnumStatusSchema,
  ConferenceEnumStatusSchema,
  ConferenceEnumUpdateStatusSchema,
  ConferenceRecordingEnumStatusSchema,
  ConnectAppEnumPermissionSchema,
  IncomingPhoneNumberEnumEmergencyStatusSchema,
  IncomingPhoneNumberEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
  IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
  IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
  IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
  MessageEnumUpdateStatusSchema,
  MessageEnumContentRetentionSchema,
  MessageEnumAddressRetentionSchema,
  MessageEnumTrafficTypeSchema,
  MessageEnumScheduleTypeSchema,
  MessageEnumRiskCheckSchema,
  MessageFeedbackEnumOutcomeSchema,
  PaymentsEnumPaymentMethodSchema,
  PaymentsEnumBankAccountTypeSchema,
  PaymentsEnumTokenTypeSchema,
  PaymentsEnumCaptureSchema,
  PaymentsEnumStatusSchema,
  RealtimeTranscriptionEnumTrackSchema,
  RealtimeTranscriptionEnumUpdateStatusSchema,
  SiprecEnumTrackSchema,
  SiprecEnumUpdateStatusSchema,
  StreamEnumTrackSchema,
  StreamEnumUpdateStatusSchema,
  UsageTriggerEnumRecurringSchema,
  UsageTriggerEnumTriggerFieldSchema,
} from '../components'

export const _20100401Handler = new Hono()
  .get(
    '/2010-04-01/Accounts.json',
    tbValidator(
      'query',
      Type.Object({
        FriendlyName: Type.Optional(Type.String()),
        Status: Type.Optional(AccountEnumStatusSchema),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts.json',
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        Sid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        Sid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({ description: 'Update the human-readable description of this Account' }),
        ),
        Status: Type.Optional(AccountEnumStatusSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        CustomerName: Type.Optional(Type.String()),
        FriendlyName: Type.Optional(Type.String()),
        EmergencyEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        IsoCountry: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        CustomerName: Type.String({ description: 'The name to associate with the new address.' }),
        Street: Type.String({ description: 'The number and street address of the new address.' }),
        City: Type.String({ description: 'The city of the new address.' }),
        Region: Type.String({ description: 'The state or region of the new address.' }),
        PostalCode: Type.String({ description: 'The postal code of the new address.' }),
        IsoCountry: Type.String({ description: 'The ISO country code of the new address.' }),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
          }),
        ),
        EmergencyEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        AutoCorrectAddress: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        StreetSecondary: Type.Optional(
          Type.String({ description: 'The additional number and street address of the address.' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
          }),
        ),
        CustomerName: Type.Optional(
          Type.String({ description: 'The name to associate with the address.' }),
        ),
        Street: Type.Optional(
          Type.String({ description: 'The number and street address of the address.' }),
        ),
        City: Type.Optional(Type.String({ description: 'The city of the address.' })),
        Region: Type.Optional(Type.String({ description: 'The state or region of the address.' })),
        PostalCode: Type.Optional(Type.String({ description: 'The postal code of the address.' })),
        EmergencyEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        AutoCorrectAddress: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        StreetSecondary: Type.Optional(
          Type.String({ description: 'The additional number and street address of the address.' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        FriendlyName: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        ApiVersion: Type.Optional(
          Type.String({
            description:
              "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version.",
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the phone number assigned to this application receives a call.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the phone number receives an incoming SMS message.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        SmsStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using a POST method to send status information about SMS messages sent by the application.',
          }),
        ),
        MessageStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using a POST method to send message status information to your application.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the new application. It can be up to 64 characters long.',
          }),
        ),
        PublicApplicationConnectEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
        ApiVersion: Type.Optional(
          Type.String({
            description:
              "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version.",
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the phone number assigned to this application receives a call.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the phone number receives an incoming SMS message.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        SmsStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility.',
          }),
        ),
        MessageStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using a POST method to send message status information to your application.',
          }),
        ),
        PublicApplicationConnectEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConnectAppSid: Type.String({
          pattern: '^CN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CountryCode: Type.String(),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        AreaCode: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Contains: Type.Optional(Type.String()),
        SmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MmsEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeAllAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeLocalAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ExcludeForeignAddressRequired: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        NearNumber: Type.Optional(Type.String()),
        NearLatLong: Type.Optional(Type.String()),
        Distance: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        InPostalCode: Type.Optional(Type.String()),
        InRegion: Type.Optional(Type.String()),
        InRateCenter: Type.Optional(Type.String()),
        InLata: Type.Optional(Type.String()),
        InLocality: Type.Optional(Type.String()),
        FaxEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Balance.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        To: Type.Optional(Type.String()),
        From: Type.Optional(Type.String()),
        ParentCallSid: Type.Optional(
          Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ),
        Status: Type.Optional(CallEnumStatusSchema),
        StartTime: Type.Optional(Type.String({ format: 'date-time' })),
        'StartTime<': Type.Optional(Type.String({ format: 'date-time' })),
        'StartTime>': Type.Optional(Type.String({ format: 'date-time' })),
        EndTime: Type.Optional(Type.String({ format: 'date-time' })),
        'EndTime<': Type.Optional(Type.String({ format: 'date-time' })),
        'EndTime>': Type.Optional(Type.String({ format: 'date-time' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        To: Type.String({
          description: 'The phone number, SIP address, or client identifier to call.',
        }),
        From: Type.String({
          description:
            'The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number.',
        }),
        Method: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              "The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.",
          }),
        ),
        FallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        FallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
          }),
        ),
        StatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        SendDigits: Type.Optional(
          Type.String({
            description:
              "The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored.",
          }),
        ),
        Timeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Record: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        RecordingChannels: Type.Optional(
          Type.String({
            description:
              'The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call.',
          }),
        ),
        RecordingStatusCallback: Type.Optional(
          Type.String({
            description: 'The URL that we call when the recording is available to be accessed.',
          }),
        ),
        RecordingStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          }),
        ),
        RecordingConfigurationId: Type.Optional(
          Type.String({
            description:
              'The identifier of the configuration to be used when creating and processing the recording',
          }),
        ),
        SipAuthUsername: Type.Optional(
          Type.String({
            description: 'The username used to authenticate the caller making a SIP call.',
          }),
        ),
        SipAuthPassword: Type.Optional(
          Type.String({
            description:
              'The password required to authenticate the user account specified in `sip_auth_username`.',
          }),
        ),
        MachineDetection: Type.Optional(
          Type.String({
            description:
              'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
          }),
        ),
        MachineDetectionTimeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        RecordingStatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space.',
          }),
        ),
        Trim: Type.Optional(
          Type.String({
            description:
              'Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
          }),
        ),
        CallerId: Type.Optional(
          Type.String({
            description:
              'The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
          }),
        ),
        MachineDetectionSpeechThreshold: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MachineDetectionSpeechEndThreshold: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MachineDetectionSilenceTimeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        AsyncAmd: Type.Optional(
          Type.String({
            description:
              'Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`.',
          }),
        ),
        AsyncAmdStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
          }),
        ),
        AsyncAmdStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          }),
        ),
        Passports: Type.Optional(
          Type.String({
            description:
              'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
          }),
        ),
        Byoc: Type.Optional(
          Type.String({
            pattern: '^BY[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
          }),
        ),
        CallReason: Type.Optional(
          Type.String({
            description:
              "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
          }),
        ),
        CallToken: Type.Optional(
          Type.String({
            description:
              "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
          }),
        ),
        RecordingTrack: Type.Optional(
          Type.String({
            description:
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
          }),
        ),
        TimeLimit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        ClientNotificationUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description: 'The URL that we should use to deliver `push call notification`.',
          }),
        ),
        Url: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
          }),
        ),
        Twiml: Type.Optional(
          Type.String({
            description:
              'TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters.',
          }),
        ),
        ApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Application resource that will handle the call, if the call will be handled by an application.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Url: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
          }),
        ),
        Method: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        Status: Type.Optional(CallEnumUpdateStatusSchema),
        FallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        FallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          }),
        ),
        Twiml: Type.Optional(
          Type.String({
            description:
              'TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive',
          }),
        ),
        TimeLimit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^NO[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Log: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MessageDate: Type.Optional(Type.String({ format: 'date' })),
        'MessageDate<': Type.Optional(Type.String({ format: 'date' })),
        'MessageDate>': Type.Optional(Type.String({ format: 'date' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        DateCreated: Type.Optional(Type.String({ format: 'date' })),
        'DateCreated<': Type.Optional(Type.String({ format: 'date' })),
        'DateCreated>': Type.Optional(Type.String({ format: 'date' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        RecordingStatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.',
          }),
        ),
        RecordingStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback).',
          }),
        ),
        RecordingStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`.',
          }),
        ),
        Trim: Type.Optional(
          Type.String({
            description:
              'Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not.',
          }),
        ),
        RecordingChannels: Type.Optional(
          Type.String({
            description:
              'The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.',
          }),
        ),
        RecordingTrack: Type.Optional(
          Type.String({
            description:
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
          }),
        ),
        RecordingConfigurationId: Type.Optional(
          Type.String({
            description:
              'The identifier of the configuration to be used when creating and processing the recording',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String(),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Status: CallRecordingEnumStatusSchema,
        PauseBehavior: Type.Optional(
          Type.String({
            description:
              'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String(),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Status: Type.Optional(ConferenceEnumUpdateStatusSchema),
        AnnounceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
          }),
        ),
        AnnounceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        DateCreated: Type.Optional(Type.String({ format: 'date' })),
        'DateCreated<': Type.Optional(Type.String({ format: 'date' })),
        'DateCreated>': Type.Optional(Type.String({ format: 'date' })),
        DateUpdated: Type.Optional(Type.String({ format: 'date' })),
        'DateUpdated<': Type.Optional(Type.String({ format: 'date' })),
        'DateUpdated>': Type.Optional(Type.String({ format: 'date' })),
        FriendlyName: Type.Optional(Type.String()),
        Status: Type.Optional(ConferenceEnumStatusSchema),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        DateCreated: Type.Optional(Type.String({ format: 'date' })),
        'DateCreated<': Type.Optional(Type.String({ format: 'date' })),
        'DateCreated>': Type.Optional(Type.String({ format: 'date' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String(),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Status: ConferenceRecordingEnumStatusSchema,
        PauseBehavior: Type.Optional(
          Type.String({
            description:
              'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        AuthorizeRedirectUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
          }),
        ),
        CompanyName: Type.Optional(
          Type.String({ description: 'The company name to set for the Connect App.' }),
        ),
        DeauthorizeCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description: 'The HTTP method to use when calling `deauthorize_callback_url`.',
          }),
        ),
        DeauthorizeCallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.',
          }),
        ),
        Description: Type.Optional(
          Type.String({ description: 'A description of the Connect App.' }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
        HomepageUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'A public URL where users can obtain more information about this Connect App.',
          }),
        ),
        Permissions: Type.Optional(
          Type.Array(ConnectAppEnumPermissionSchema, {
            description:
              'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AddressSid: Type.String({ pattern: '^AD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        AccountSid: Type.Optional(
          Type.String({
            pattern: '^AC[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).',
          }),
        ),
        ApiVersion: Type.Optional(
          Type.String({
            description:
              'The API version to use for incoming calls made to the phone number. The default is `2010-04-01`.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
          }),
        ),
        SmsApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the phone number receives an incoming SMS message.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          }),
        ),
        EmergencyStatus: Type.Optional(IncomingPhoneNumberEnumEmergencyStatusSchema),
        EmergencyAddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the emergency address configuration to use for emergency calling from this phone number.',
          }),
        ),
        TrunkSid: Type.Optional(
          Type.String({
            pattern: '^TK[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          }),
        ),
        VoiceReceiveMode: Type.Optional(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
        IdentitySid: Type.Optional(
          Type.String({
            pattern: '^RI[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations.',
          }),
        ),
        AddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations.',
          }),
        ),
        BundleSid: Type.Optional(
          Type.String({
            pattern: '^BU[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        FriendlyName: Type.Optional(Type.String()),
        PhoneNumber: Type.Optional(Type.String()),
        Origin: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        ApiVersion: Type.Optional(
          Type.String({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number.',
          }),
        ),
        SmsApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          }),
        ),
        EmergencyStatus: Type.Optional(IncomingPhoneNumberEnumEmergencyStatusSchema),
        EmergencyAddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          }),
        ),
        TrunkSid: Type.Optional(
          Type.String({
            pattern: '^TK[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          }),
        ),
        IdentitySid: Type.Optional(
          Type.String({
            pattern: '^RI[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
          }),
        ),
        AddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          }),
        ),
        VoiceReceiveMode: Type.Optional(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
        BundleSid: Type.Optional(
          Type.String({
            pattern: '^BU[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          }),
        ),
        PhoneNumber: Type.Optional(
          Type.String({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
        ),
        AreaCode: Type.Optional(
          Type.String({
            description:
              'The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only).',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ResourceSid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^XE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ResourceSid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^XE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ResourceSid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ResourceSid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        InstalledAddOnSid: Type.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID that identifies the Add-on installation.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ResourceSid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AssignedAddOnSid: Type.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^XF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ResourceSid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AssignedAddOnSid: Type.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        FriendlyName: Type.Optional(Type.String()),
        PhoneNumber: Type.Optional(Type.String()),
        Origin: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        PhoneNumber: Type.String({
          description:
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
        }),
        ApiVersion: Type.Optional(
          Type.String({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
          }),
        ),
        SmsApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          }),
        ),
        IdentitySid: Type.Optional(
          Type.String({
            pattern: '^RI[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
          }),
        ),
        AddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          }),
        ),
        EmergencyStatus: Type.Optional(IncomingPhoneNumberLocalEnumEmergencyStatusSchema),
        EmergencyAddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          }),
        ),
        TrunkSid: Type.Optional(
          Type.String({
            pattern: '^TK[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          }),
        ),
        VoiceReceiveMode: Type.Optional(IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema),
        BundleSid: Type.Optional(
          Type.String({
            pattern: '^BU[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        FriendlyName: Type.Optional(Type.String()),
        PhoneNumber: Type.Optional(Type.String()),
        Origin: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        PhoneNumber: Type.String({
          description:
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
        }),
        ApiVersion: Type.Optional(
          Type.String({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number.',
          }),
        ),
        SmsApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          }),
        ),
        IdentitySid: Type.Optional(
          Type.String({
            pattern: '^RI[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
          }),
        ),
        AddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          }),
        ),
        EmergencyStatus: Type.Optional(IncomingPhoneNumberMobileEnumEmergencyStatusSchema),
        EmergencyAddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          }),
        ),
        TrunkSid: Type.Optional(
          Type.String({
            pattern: '^TK[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          }),
        ),
        VoiceReceiveMode: Type.Optional(IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema),
        BundleSid: Type.Optional(
          Type.String({
            pattern: '^BU[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Beta: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        FriendlyName: Type.Optional(Type.String()),
        PhoneNumber: Type.Optional(Type.String()),
        Origin: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        PhoneNumber: Type.String({
          description:
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
        }),
        ApiVersion: Type.Optional(
          Type.String({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
          }),
        ),
        SmsApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          }),
        ),
        VoiceCallerIdLookup: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          }),
        ),
        IdentitySid: Type.Optional(
          Type.String({
            pattern: '^RI[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations.',
          }),
        ),
        AddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          }),
        ),
        EmergencyStatus: Type.Optional(IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema),
        EmergencyAddressSid: Type.Optional(
          Type.String({
            pattern: '^AD[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          }),
        ),
        TrunkSid: Type.Optional(
          Type.String({
            pattern: '^TK[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          }),
        ),
        VoiceReceiveMode: Type.Optional(IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema),
        BundleSid: Type.Optional(
          Type.String({
            pattern: '^BU[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        MessageSid: Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^ME[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        MessageSid: Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^ME[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        MessageSid: Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        DateCreated: Type.Optional(Type.String({ format: 'date-time' })),
        'DateCreated<': Type.Optional(Type.String({ format: 'date-time' })),
        'DateCreated>': Type.Optional(Type.String({ format: 'date-time' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        QueueSid: Type.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        QueueSid: Type.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String(),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Url: Type.String({ format: 'uri', description: 'The absolute URL of the Queue resource.' }),
        Method: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        QueueSid: Type.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        To: Type.Optional(Type.String()),
        From: Type.Optional(Type.String()),
        DateSent: Type.Optional(Type.String({ format: 'date-time' })),
        'DateSent<': Type.Optional(Type.String({ format: 'date-time' })),
        'DateSent>': Type.Optional(Type.String({ format: 'date-time' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        To: Type.String({
          description:
            "The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.",
        }),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). ',
          }),
        ),
        ApplicationSid: Type.Optional(
          Type.String({
            pattern: '^AP[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              "The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored.",
          }),
        ),
        MaxPrice: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        ProvideFeedback: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Attempt: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        ValidityPeriod: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        ForceDelivery: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ContentRetention: Type.Optional(MessageEnumContentRetentionSchema),
        AddressRetention: Type.Optional(MessageEnumAddressRetentionSchema),
        SmartEncoded: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PersistentAction: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).',
          }),
        ),
        TrafficType: Type.Optional(MessageEnumTrafficTypeSchema),
        ShortenUrls: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ScheduleType: Type.Optional(MessageEnumScheduleTypeSchema),
        SendAt: Type.Optional(
          Type.String({
            format: 'date-time',
            description: 'The time that Twilio will send the message. Must be in ISO 8601 format.',
          }),
        ),
        SendAsMms: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ContentVariables: Type.Optional(
          Type.String({
            description:
              "For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used.",
          }),
        ),
        MessageIntent: Type.Optional(
          Type.String({
            description:
              "Specifies the purpose or use case of the outbound communication. This parameter is used by Twilio's [Traffic Shaping](https://www.twilio.com/docs/messaging/features/traffic-shaping) and [Compliance Toolkit](https://www.twilio.com/docs/messaging/features/compliance-toolkit) products. Possible values include: `otp`, `notifications`, `marketing`, `fraud`, `security`, `customercare`, `delivery`, `education`, `polling`, `announcements`, and `events`.",
          }),
        ),
        RiskCheck: Type.Optional(MessageEnumRiskCheckSchema),
        From: Type.Optional(
          Type.String({
            description:
              "The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.",
          }),
        ),
        FallbackFrom: Type.Optional(
          Type.String({
            description:
              'A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message.',
          }),
        ),
        MessagingServiceSid: Type.Optional(
          Type.String({
            pattern: '^MG[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              "The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool.",
          }),
        ),
        Body: Type.Optional(
          Type.String({
            description:
              'The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).',
          }),
        ),
        MediaUrl: Type.Optional(
          Type.Array(Type.String({ format: 'uri' }), {
            description:
              'The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.',
          }),
        ),
        ContentSid: Type.Optional(
          Type.String({
            pattern: '^HX[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              "For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources).",
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Body: Type.Optional(
          Type.String({
            description:
              "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
          }),
        ),
        Status: Type.Optional(MessageEnumUpdateStatusSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^(SM|MM)[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        MessageSid: Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator('form', Type.Object({ Outcome: Type.Optional(MessageFeedbackEnumOutcomeSchema) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^NO[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Log: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MessageDate: Type.Optional(Type.String({ format: 'date' })),
        'MessageDate<': Type.Optional(Type.String({ format: 'date' })),
        'MessageDate>': Type.Optional(Type.String({ format: 'date' })),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PN[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PhoneNumber: Type.Optional(Type.String()),
        FriendlyName: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        PhoneNumber: Type.String({
          description:
            'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number.',
          }),
        ),
        CallDelay: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Extension: Type.Optional(
          Type.String({
            description: 'The digits to dial after connecting the verification call.',
          }),
        ),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information about the verification process to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        CallSid: Type.String(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        CallSid: Type.String(),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Muted: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Hold: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        HoldUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
          }),
        ),
        HoldMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`.',
          }),
        ),
        AnnounceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
          }),
        ),
        AnnounceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        WaitUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
          }),
        ),
        WaitMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
          }),
        ),
        BeepOnExit: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        EndConferenceOnExit: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Coaching: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        CallSidToCoach: Type.Optional(
          Type.String({
            pattern: '^CA[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        CallSid: Type.String(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Muted: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Hold: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Coaching: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ConferenceSid: Type.String(),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        From: Type.String({
          description:
            'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.',
        }),
        To: Type.String({
          description:
            'The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified.',
        }),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`.',
          }),
        ),
        StatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.',
          }),
        ),
        Label: Type.Optional(
          Type.String({
            description:
              'A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.',
          }),
        ),
        Timeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Record: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Muted: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Beep: Type.Optional(
          Type.String({
            description:
              'Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`.',
          }),
        ),
        StartConferenceOnEnter: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        EndConferenceOnExit: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        WaitUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
          }),
        ),
        WaitMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
          }),
        ),
        EarlyMedia: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        MaxParticipants: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        ConferenceRecord: Type.Optional(
          Type.String({
            description:
              'Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`.',
          }),
        ),
        ConferenceTrim: Type.Optional(
          Type.String({
            description:
              'Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`.',
          }),
        ),
        ConferenceStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored.',
          }),
        ),
        ConferenceStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        ConferenceStatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              'The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.',
          }),
        ),
        RecordingChannels: Type.Optional(
          Type.String({
            description:
              'The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`.',
          }),
        ),
        RecordingStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call using the `recording_status_callback_method` when the recording status changes.',
          }),
        ),
        RecordingStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        SipAuthUsername: Type.Optional(
          Type.String({ description: 'The SIP username used for authentication.' }),
        ),
        SipAuthPassword: Type.Optional(
          Type.String({ description: 'The SIP password for authentication.' }),
        ),
        Region: Type.Optional(
          Type.String({
            description:
              'The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`.',
          }),
        ),
        ConferenceRecordingStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available.',
          }),
        ),
        ConferenceRecordingStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          }),
        ),
        RecordingStatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              "The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.",
          }),
        ),
        ConferenceRecordingStatusCallbackEvent: Type.Optional(
          Type.Array(Type.String(), {
            description:
              "The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`",
          }),
        ),
        Coaching: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        CallSidToCoach: Type.Optional(
          Type.String({
            pattern: '^CA[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
          }),
        ),
        JitterBufferSize: Type.Optional(
          Type.String({
            description:
              "Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`.",
          }),
        ),
        Byoc: Type.Optional(
          Type.String({
            pattern: '^BY[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
          }),
        ),
        CallerId: Type.Optional(
          Type.String({
            description:
              'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint.',
          }),
        ),
        CallReason: Type.Optional(
          Type.String({
            description:
              "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
          }),
        ),
        RecordingTrack: Type.Optional(
          Type.String({
            description:
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio.',
          }),
        ),
        RecordingConfigurationId: Type.Optional(
          Type.String({
            description:
              'The identifier of the configuration to be used when creating and processing the recording',
          }),
        ),
        TimeLimit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MachineDetection: Type.Optional(
          Type.String({
            description:
              'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
          }),
        ),
        MachineDetectionTimeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MachineDetectionSpeechThreshold: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MachineDetectionSpeechEndThreshold: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        MachineDetectionSilenceTimeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        AmdStatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
          }),
        ),
        AmdStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          }),
        ),
        Trim: Type.Optional(
          Type.String({
            description:
              'Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
          }),
        ),
        CallToken: Type.Optional(
          Type.String({
            description:
              "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
          }),
        ),
        Passports: Type.Optional(
          Type.String({
            description:
              'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
          }),
        ),
        ClientNotificationUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description: 'The URL that we should use to deliver `push call notification`.',
          }),
        ),
        CallerDisplayName: Type.Optional(
          Type.String({
            description:
              'The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.',
          }),
        ),
        EmergencyCallerPosition: Type.Optional(
          Type.String({
            description:
              'The emergency caller\'s GPS coordinates in decimal degrees format.\nFormat: "latitude longitude" (space-separated)\n- Latitude: decimal degrees, range -90.0 to +90.0 (negative for South, positive for North)\n- Longitude: decimal degrees, range -180.0 to +180.0 (negative for West, positive for East)\n- Precision: up to 6 decimal places recommended for meter-level accuracy\n\nNote: If the value exceeds 150 characters, only the first 150 characters will be used.\n',
          }),
        ),
        EmergencyCallerLocation: Type.Optional(
          Type.String({
            description:
              "The emergency caller's physical location description within a building or facility.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          }),
        ),
        EmergencyName: Type.Optional(
          Type.String({
            description:
              "The emergency caller's organization or entity name.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          }),
        ),
        EmergencyAddress: Type.Optional(
          Type.String({
            description:
              "The emergency caller's street address including street number and street name.\n\nNote: If the value exceeds 60 characters, only the first 60 characters will be used.\n",
          }),
        ),
        EmergencyZipCode: Type.Optional(
          Type.String({
            description:
              "The emergency caller's postal code or ZIP code.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          }),
        ),
        EmergencyCity: Type.Optional(
          Type.String({
            description:
              "The emergency caller's city or municipality name.\nShould be the official city name as recognized by local authorities.\nUsed in combination with state and country for emergency call routing.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          }),
        ),
        EmergencyState: Type.Optional(
          Type.String({
            description:
              "The emergency caller's state or province.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          }),
        ),
        EmergencyCountry: Type.Optional(
          Type.String({
            description:
              "The emergency caller's country. Currently supported US and CA only.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        IdempotencyKey: Type.String({
          description:
            'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
        }),
        StatusCallback: Type.String({
          format: 'uri',
          description:
            'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback)',
        }),
        BankAccountType: Type.Optional(PaymentsEnumBankAccountTypeSchema),
        ChargeAmount: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Currency: Type.Optional(
          Type.String({
            description:
              'The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted.',
          }),
        ),
        Description: Type.Optional(
          Type.String({
            description:
              'The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions.',
          }),
        ),
        Input: Type.Optional(
          Type.String({
            description:
              'A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs.',
          }),
        ),
        MinPostalCodeLength: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Parameter: Type.Optional(
          Type.Any({
            description:
              'A single-level JSON object used to pass custom parameters to payment processors. (Required for ACH payments). The information that has to be included here depends on the <Pay> Connector. [Read more](https://www.twilio.com/console/voice/pay-connectors).',
          }),
        ),
        PaymentConnector: Type.Optional(
          Type.String({
            description:
              'This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`.',
          }),
        ),
        PaymentMethod: Type.Optional(PaymentsEnumPaymentMethodSchema),
        PostalCode: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        SecurityCode: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Timeout: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        TokenType: Type.Optional(PaymentsEnumTokenTypeSchema),
        ValidCardTypes: Type.Optional(
          Type.String({
            description:
              'Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex`',
          }),
        ),
        RequireMatchingInputs: Type.Optional(
          Type.String({
            description:
              'A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`.',
          }),
        ),
        Confirmation: Type.Optional(
          Type.Union([Type.Literal('true'), Type.Literal('false')], {
            description:
              'Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^PK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        IdempotencyKey: Type.String({
          description:
            'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
        }),
        StatusCallback: Type.String({
          format: 'uri',
          description:
            'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests.',
        }),
        Capture: Type.Optional(PaymentsEnumCaptureSchema),
        Status: Type.Optional(PaymentsEnumStatusSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
          }),
        ),
        MaxSize: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^QU[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.String({
          description:
            'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
        }),
        MaxSize: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Name: Type.Optional(
          Type.String({
            description:
              'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
          }),
        ),
        Track: Type.Optional(RealtimeTranscriptionEnumTrackSchema),
        StatusCallbackUrl: Type.Optional(
          Type.String({ format: 'uri', description: 'Absolute URL of the status callback.' }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description: 'The http method for the status_callback (one of GET, POST).',
          }),
        ),
        InboundTrackLabel: Type.Optional(
          Type.String({ description: 'Friendly name given to the Inbound Track' }),
        ),
        OutboundTrackLabel: Type.Optional(
          Type.String({ description: 'Friendly name given to the Outbound Track' }),
        ),
        PartialResults: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        LanguageCode: Type.Optional(
          Type.String({
            description:
              'Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format',
          }),
        ),
        TranscriptionEngine: Type.Optional(
          Type.String({
            description:
              'Definition of the transcription engine to be used, among those supported by Twilio',
          }),
        ),
        ProfanityFilter: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        SpeechModel: Type.Optional(
          Type.String({
            description:
              'Recognition model used by the transcription engine, among those supported by the provider',
          }),
        ),
        Hints: Type.Optional(
          Type.String({
            description:
              'A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them.',
          }),
        ),
        EnableAutomaticPunctuation: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        IntelligenceService: Type.Optional(
          Type.String({
            description:
              'The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators',
          }),
        ),
        ConversationConfiguration: Type.Optional(
          Type.String({
            description:
              'The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service',
          }),
        ),
        ConversationId: Type.Optional(
          Type.String({
            description:
              'The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service',
          }),
        ),
        TranscriptionConfigurationId: Type.Optional(
          Type.String({
            description:
              'The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go.',
          }),
        ),
        EnableProviderData: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String(),
      }),
    ),
    tbValidator('form', Type.Object({ Status: RealtimeTranscriptionEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        IncludeSoftDeleted: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        DateCreated: Type.Optional(Type.String({ format: 'date-time' })),
        'DateCreated<': Type.Optional(Type.String({ format: 'date-time' })),
        'DateCreated>': Type.Optional(Type.String({ format: 'date-time' })),
        CallSid: Type.Optional(
          Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ),
        ConferenceSid: Type.Optional(
          Type.String({ pattern: '^CF[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ),
        IncludeSoftDeleted: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^XR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AddOnResultSid: Type.String({
          pattern: '^XR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^XH[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AddOnResultSid: Type.String({
          pattern: '^XR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^XH[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AddOnResultSid: Type.String({
          pattern: '^XR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        ReferenceSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        AddOnResultSid: Type.String({
          pattern: '^XR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        PayloadSid: Type.String({ pattern: '^XH[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        RecordingSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        RecordingSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        RecordingSid: Type.String({ pattern: '^RE[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code.',
          }),
        ),
        ApiVersion: Type.Optional(
          Type.String({
            description:
              'The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`.',
          }),
        ),
        SmsUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL we should call when receiving an incoming SMS message to this short code.',
          }),
        ),
        SmsMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`.',
          }),
        ),
        SmsFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
          }),
        ),
        SmsFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        FriendlyName: Type.Optional(Type.String()),
        ShortCode: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({ FriendlyName: Type.Optional(Type.String({ description: '' })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the CredentialList resource to map to the SIP domain.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the IpAccessControlList resource to map to the SIP domain.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the CredentialList resource to map to the SIP domain.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Username: Type.String({
          description:
            "The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.",
        }),
        Password: Type.String({
          description:
            'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^CR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^CR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Password: Type.Optional(
          Type.String({
            description:
              'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^CR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.String({
          description:
            'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.String({
          description:
            'A human readable descriptive text for a CredentialList, up to 64 characters long.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        CredentialListSid: Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^CL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        DomainName: Type.String({
          description:
            'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
        }),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description: 'The URL we should when the domain receives a call.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`.',
          }),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceStatusCallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to pass status parameters (such as call ended) to your application.',
          }),
        ),
        VoiceStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        SipRegistration: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        EmergencyCallingEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Secure: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ByocTrunkSid: Type.Optional(
          Type.String({
            pattern: '^BY[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
          }),
        ),
        EmergencyCallerSid: Type.Optional(
          Type.String({
            pattern: '^PN[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
          }),
        ),
        VoiceFallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceFallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`.',
          }),
        ),
        VoiceMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description: 'The HTTP method we should use to call `voice_url`',
          }),
        ),
        VoiceStatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
          }),
        ),
        VoiceStatusCallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description:
              'The URL that we should call to pass status parameters (such as call ended) to your application.',
          }),
        ),
        VoiceUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description: 'The URL we should call when the domain receives a call.',
          }),
        ),
        SipRegistration: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        DomainName: Type.Optional(
          Type.String({
            description:
              'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
          }),
        ),
        EmergencyCallingEnabled: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        Secure: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        ByocTrunkSid: Type.Optional(
          Type.String({
            pattern: '^BY[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
          }),
        ),
        EmergencyCallerSid: Type.Optional(
          Type.String({
            pattern: '^PN[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.String({
          description:
            'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.String({
          description: 'A human readable descriptive text, up to 255 characters long.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^AL[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        DomainSid: Type.String({ pattern: '^SD[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique id of the IP access control list to map to the SIP domain.',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        FriendlyName: Type.String({
          description:
            'A human readable descriptive text for this resource, up to 255 characters long.',
        }),
        IpAddress: Type.String({
          description:
            'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
        }),
        CidrPrefixLength: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^IP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^IP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        IpAddress: Type.Optional(
          Type.String({
            description:
              'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A human readable descriptive text for this resource, up to 255 characters long.',
          }),
        ),
        CidrPrefixLength: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        IpAccessControlListSid: Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
        }),
        Sid: Type.String({ pattern: '^IP[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Name: Type.Optional(
          Type.String({
            description:
              'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
          }),
        ),
        ConnectorName: Type.Optional(
          Type.String({
            description: 'Unique name used when configuring the connector via Marketplace Add-on.',
          }),
        ),
        Track: Type.Optional(SiprecEnumTrackSchema),
        StatusCallback: Type.Optional(
          Type.String({ format: 'uri', description: 'Absolute URL of the status callback.' }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description: 'The http method for the status_callback (one of GET, POST).',
          }),
        ),
        'Parameter1.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter1.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter2.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter2.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter3.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter3.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter4.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter4.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter5.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter5.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter6.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter6.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter7.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter7.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter8.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter8.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter9.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter9.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter10.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter10.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter11.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter11.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter12.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter12.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter13.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter13.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter14.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter14.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter15.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter15.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter16.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter16.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter17.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter17.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter18.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter18.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter19.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter19.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter20.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter20.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter21.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter21.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter22.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter22.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter23.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter23.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter24.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter24.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter25.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter25.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter26.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter26.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter27.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter27.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter28.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter28.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter29.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter29.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter30.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter30.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter31.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter31.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter32.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter32.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter33.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter33.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter34.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter34.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter35.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter35.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter36.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter36.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter37.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter37.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter38.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter38.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter39.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter39.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter40.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter40.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter41.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter41.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter42.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter42.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter43.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter43.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter44.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter44.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter45.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter45.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter46.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter46.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter47.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter47.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter48.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter48.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter49.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter49.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter50.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter50.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter51.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter51.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter52.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter52.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter53.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter53.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter54.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter54.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter55.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter55.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter56.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter56.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter57.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter57.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter58.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter58.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter59.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter59.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter60.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter60.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter61.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter61.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter62.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter62.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter63.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter63.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter64.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter64.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter65.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter65.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter66.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter66.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter67.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter67.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter68.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter68.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter69.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter69.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter70.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter70.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter71.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter71.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter72.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter72.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter73.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter73.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter74.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter74.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter75.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter75.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter76.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter76.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter77.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter77.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter78.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter78.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter79.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter79.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter80.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter80.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter81.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter81.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter82.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter82.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter83.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter83.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter84.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter84.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter85.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter85.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter86.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter86.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter87.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter87.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter88.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter88.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter89.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter89.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter90.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter90.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter91.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter91.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter92.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter92.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter93.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter93.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter94.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter94.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter95.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter95.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter96.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter96.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter97.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter97.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter98.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter98.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter99.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter99.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String(),
      }),
    ),
    tbValidator('form', Type.Object({ Status: SiprecEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Url: Type.String({
          format: 'uri',
          description: 'Relative or absolute URL where WebSocket connection will be established.',
        }),
        Name: Type.Optional(
          Type.String({
            description:
              'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
          }),
        ),
        Track: Type.Optional(StreamEnumTrackSchema),
        StatusCallback: Type.Optional(
          Type.String({
            format: 'uri',
            description: 'Absolute URL to which Twilio sends status callback HTTP requests.',
          }),
        ),
        StatusCallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`.',
          }),
        ),
        'Parameter1.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter1.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter2.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter2.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter3.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter3.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter4.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter4.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter5.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter5.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter6.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter6.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter7.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter7.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter8.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter8.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter9.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter9.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter10.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter10.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter11.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter11.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter12.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter12.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter13.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter13.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter14.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter14.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter15.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter15.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter16.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter16.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter17.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter17.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter18.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter18.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter19.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter19.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter20.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter20.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter21.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter21.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter22.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter22.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter23.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter23.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter24.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter24.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter25.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter25.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter26.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter26.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter27.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter27.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter28.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter28.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter29.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter29.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter30.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter30.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter31.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter31.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter32.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter32.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter33.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter33.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter34.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter34.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter35.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter35.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter36.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter36.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter37.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter37.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter38.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter38.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter39.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter39.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter40.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter40.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter41.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter41.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter42.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter42.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter43.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter43.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter44.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter44.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter45.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter45.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter46.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter46.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter47.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter47.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter48.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter48.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter49.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter49.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter50.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter50.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter51.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter51.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter52.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter52.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter53.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter53.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter54.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter54.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter55.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter55.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter56.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter56.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter57.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter57.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter58.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter58.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter59.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter59.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter60.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter60.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter61.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter61.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter62.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter62.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter63.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter63.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter64.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter64.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter65.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter65.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter66.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter66.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter67.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter67.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter68.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter68.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter69.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter69.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter70.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter70.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter71.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter71.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter72.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter72.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter73.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter73.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter74.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter74.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter75.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter75.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter76.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter76.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter77.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter77.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter78.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter78.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter79.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter79.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter80.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter80.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter81.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter81.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter82.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter82.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter83.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter83.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter84.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter84.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter85.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter85.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter86.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter86.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter87.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter87.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter88.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter88.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter89.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter89.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter90.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter90.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter91.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter91.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter92.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter92.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter93.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter93.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter94.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter94.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter95.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter95.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter96.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter96.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter97.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter97.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter98.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter98.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
        'Parameter99.Name': Type.Optional(Type.String({ description: 'Parameter name' })),
        'Parameter99.Value': Type.Optional(Type.String({ description: 'Parameter value' })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String(),
      }),
    ),
    tbValidator('form', Type.Object({ Status: StreamEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Tokens.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Ttl: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^TR[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Category: Type.Optional(Type.String()),
        StartDate: Type.Optional(Type.String({ format: 'date' })),
        EndDate: Type.Optional(Type.String({ format: 'date' })),
        IncludeSubaccounts: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^UT[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^UT[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        CallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
          }),
        ),
        CallbackUrl: Type.Optional(
          Type.String({
            format: 'uri',
            description: 'The URL we should call using `callback_method` when the trigger fires.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^UT[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        Recurring: Type.Optional(UsageTriggerEnumRecurringSchema),
        TriggerBy: Type.Optional(UsageTriggerEnumTriggerFieldSchema),
        UsageCategory: Type.Optional(Type.String()),
        PageSize: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        Page: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
              (value) => Number(value) >= 0,
              () => 'must be >= 0',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        PageToken: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        CallbackUrl: Type.String({
          format: 'uri',
          description: 'The URL we should call using `callback_method` when the trigger fires.',
        }),
        TriggerValue: Type.String({
          description:
            'The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`.',
        }),
        UsageCategory: Type.String({
          description:
            'The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value.',
        }),
        CallbackMethod: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
          }),
        ),
        FriendlyName: Type.Optional(
          Type.String({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          }),
        ),
        Recurring: Type.Optional(UsageTriggerEnumRecurringSchema),
        TriggerBy: Type.Optional(UsageTriggerEnumTriggerFieldSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Content: Type.String({
          description: 'The User Defined Message in the form of URL-encoded JSON string.',
        }),
        IdempotencyKey: Type.Optional(
          Type.String({
            description:
              'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    tbValidator(
      'form',
      Type.Object({
        Callback: Type.String({
          format: 'uri',
          description:
            'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
        }),
        IdempotencyKey: Type.Optional(
          Type.String({
            description:
              'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
          }),
        ),
        Method: Type.Optional(
          Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
            description:
              'The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    tbValidator(
      'param',
      Type.Object({
        AccountSid: Type.String({ pattern: '^AC[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        CallSid: Type.String({ pattern: '^CA[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Sid: Type.String({ pattern: '^ZY[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
