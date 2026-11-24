import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
    sValidator(
      'query',
      v.partial(
        v.object({
          FriendlyName: v.string(),
          Status: AccountEnumStatusSchema,
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts.json',
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:Sid.json',
    sValidator(
      'param',
      v.object({ Sid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:Sid.json',
    sValidator(
      'param',
      v.object({ Sid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)) }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description('Update the human-readable description of this Account'),
          ),
          Status: AccountEnumStatusSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          CustomerName: v.string(),
          FriendlyName: v.string(),
          EmergencyEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          IsoCountry: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        CustomerName: v.pipe(
          v.string(),
          v.description('The name to associate with the new address.'),
        ),
        Street: v.pipe(
          v.string(),
          v.description('The number and street address of the new address.'),
        ),
        City: v.pipe(v.string(), v.description('The city of the new address.')),
        Region: v.pipe(v.string(), v.description('The state or region of the new address.')),
        PostalCode: v.pipe(v.string(), v.description('The postal code of the new address.')),
        IsoCountry: v.pipe(v.string(), v.description('The ISO country code of the new address.')),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
            ),
          ),
        ),
        EmergencyEnabled: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to enable emergency calling on the new address. Can be: `true` or `false`.',
            ),
          ),
        ),
        AutoCorrectAddress: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
            ),
          ),
        ),
        StreetSecondary: v.optional(
          v.pipe(
            v.string(),
            v.description('The additional number and street address of the address.'),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
            ),
          ),
          CustomerName: v.pipe(
            v.string(),
            v.description('The name to associate with the address.'),
          ),
          Street: v.pipe(
            v.string(),
            v.description('The number and street address of the address.'),
          ),
          City: v.pipe(v.string(), v.description('The city of the address.')),
          Region: v.pipe(v.string(), v.description('The state or region of the address.')),
          PostalCode: v.pipe(v.string(), v.description('The postal code of the address.')),
          EmergencyEnabled: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to enable emergency calling on the address. Can be: `true` or `false`.',
            ),
          ),
          AutoCorrectAddress: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
            ),
          ),
          StreetSecondary: v.pipe(
            v.string(),
            v.description('The additional number and street address of the address.'),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          FriendlyName: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          ApiVersion: v.pipe(
            v.string(),
            v.description(
              "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version.",
            ),
          ),
          VoiceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the phone number assigned to this application receives a call.',
            ),
          ),
          VoiceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
            ),
          ),
          VoiceFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
          VoiceFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
          StatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
            ),
          ),
          VoiceCallerIdLookup: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
            ),
          ),
          SmsUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the phone number receives an incoming SMS message.',
            ),
          ),
          SmsMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
            ),
          ),
          SmsFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
            ),
          ),
          SmsFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
          SmsStatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using a POST method to send status information about SMS messages sent by the application.',
            ),
          ),
          MessageStatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using a POST method to send message status information to your application.',
            ),
          ),
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the new application. It can be up to 64 characters long.',
            ),
          ),
          PublicApplicationConnectEnabled: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
          ApiVersion: v.pipe(
            v.string(),
            v.description(
              "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version.",
            ),
          ),
          VoiceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the phone number assigned to this application receives a call.',
            ),
          ),
          VoiceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
            ),
          ),
          VoiceFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
          VoiceFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
          StatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
            ),
          ),
          VoiceCallerIdLookup: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
            ),
          ),
          SmsUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the phone number receives an incoming SMS message.',
            ),
          ),
          SmsMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
            ),
          ),
          SmsFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
            ),
          ),
          SmsFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
          SmsStatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility.',
            ),
          ),
          MessageStatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using a POST method to send message status information to your application.',
            ),
          ),
          PublicApplicationConnectEnabled: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConnectAppSid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          AreaCode: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          Contains: v.string(),
          SmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          MmsEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          VoiceEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeAllAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeLocalAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          ExcludeForeignAddressRequired: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          NearNumber: v.string(),
          NearLatLong: v.string(),
          Distance: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          InPostalCode: v.string(),
          InRegion: v.string(),
          InRateCenter: v.string(),
          InLata: v.string(),
          InLocality: v.string(),
          FaxEnabled: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Balance.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          To: v.string(),
          From: v.string(),
          ParentCallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Status: CallEnumStatusSchema,
          StartTime: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'StartTime<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'StartTime>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          EndTime: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'EndTime<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'EndTime>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        To: v.pipe(
          v.string(),
          v.description('The phone number, SIP address, or client identifier to call.'),
        ),
        From: v.pipe(
          v.string(),
          v.description(
            'The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number.',
          ),
        ),
        Method: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              "The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.",
            ),
          ),
        ),
        FallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
        ),
        FallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
            ),
          ),
        ),
        StatusCallbackEvent: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored.',
            ),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
        ),
        SendDigits: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored.",
            ),
          ),
        ),
        Timeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is `60` seconds and the maximum is `600` seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as `15` seconds, to hang up before reaching an answering machine or voicemail.',
            ),
          ),
        ),
        Record: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to record the call. Can be `true` to record the phone call, or `false` to not. The default is `false`. The `recording_url` is sent to the `status_callback` URL.',
            ),
          ),
        ),
        RecordingChannels: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call.',
            ),
          ),
        ),
        RecordingStatusCallback: v.optional(
          v.pipe(
            v.string(),
            v.description('The URL that we call when the recording is available to be accessed.'),
          ),
        ),
        RecordingStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
            ),
          ),
        ),
        RecordingConfigurationId: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The identifier of the configuration to be used when creating and processing the recording',
            ),
          ),
        ),
        SipAuthUsername: v.optional(
          v.pipe(
            v.string(),
            v.description('The username used to authenticate the caller making a SIP call.'),
          ),
        ),
        SipAuthPassword: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The password required to authenticate the user account specified in `sip_auth_username`.',
            ),
          ),
        ),
        MachineDetection: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
            ),
          ),
        ),
        MachineDetectionTimeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
            ),
          ),
        ),
        RecordingStatusCallbackEvent: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space.',
            ),
          ),
        ),
        Trim: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
            ),
          ),
        ),
        CallerId: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
            ),
          ),
        ),
        MachineDetectionSpeechThreshold: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
            ),
          ),
        ),
        MachineDetectionSpeechEndThreshold: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
            ),
          ),
        ),
        MachineDetectionSilenceTimeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
            ),
          ),
        ),
        AsyncAmd: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`.',
            ),
          ),
        ),
        AsyncAmdStatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
            ),
          ),
        ),
        AsyncAmdStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
            ),
          ),
        ),
        Passports: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
            ),
          ),
        ),
        Byoc: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^BY[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
            ),
          ),
        ),
        CallReason: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
            ),
          ),
        ),
        CallToken: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
            ),
          ),
        ),
        RecordingTrack: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
            ),
          ),
        ),
        TimeLimit: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
            ),
          ),
        ),
        ClientNotificationUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('The URL that we should use to deliver `push call notification`.'),
          ),
        ),
        Url: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
            ),
          ),
        ),
        Twiml: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters.',
            ),
          ),
        ),
        ApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Application resource that will handle the call, if the call will be handled by an application.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Url: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
            ),
          ),
          Method: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
          Status: CallEnumUpdateStatusSchema,
          FallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
          FallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
          StatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
            ),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            ),
          ),
          Twiml: v.pipe(
            v.string(),
            v.description(
              'TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive',
            ),
          ),
          TimeLimit: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Log: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          MessageDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'MessageDate<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'MessageDate>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          DateCreated: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateCreated<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateCreated>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          RecordingStatusCallbackEvent: v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.',
            ),
          ),
          RecordingStatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback).',
            ),
          ),
          RecordingStatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`.',
            ),
          ),
          Trim: v.pipe(
            v.string(),
            v.description(
              'Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not.',
            ),
          ),
          RecordingChannels: v.pipe(
            v.string(),
            v.description(
              'The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.',
            ),
          ),
          RecordingTrack: v.pipe(
            v.string(),
            v.description(
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
            ),
          ),
          RecordingConfigurationId: v.pipe(
            v.string(),
            v.description(
              'The identifier of the configuration to be used when creating and processing the recording',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Status: CallRecordingEnumStatusSchema,
        PauseBehavior: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Status: ConferenceEnumUpdateStatusSchema,
          AnnounceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
            ),
          ),
          AnnounceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          DateCreated: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateCreated<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateCreated>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          DateUpdated: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateUpdated<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateUpdated>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          FriendlyName: v.string(),
          Status: ConferenceEnumStatusSchema,
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          DateCreated: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateCreated<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'DateCreated>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Status: ConferenceRecordingEnumStatusSchema,
        PauseBehavior: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          AuthorizeRedirectUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
            ),
          ),
          CompanyName: v.pipe(
            v.string(),
            v.description('The company name to set for the Connect App.'),
          ),
          DeauthorizeCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description('The HTTP method to use when calling `deauthorize_callback_url`.'),
          ),
          DeauthorizeCallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.',
            ),
          ),
          Description: v.pipe(v.string(), v.description('A description of the Connect App.')),
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
          HomepageUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'A public URL where users can obtain more information about this Connect App.',
            ),
          ),
          Permissions: v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(ConnectAppEnumPermissionSchema),
            ),
            v.description(
              'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AddressSid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          AccountSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).',
            ),
          ),
          ApiVersion: v.pipe(
            v.string(),
            v.description(
              'The API version to use for incoming calls made to the phone number. The default is `2010-04-01`.',
            ),
          ),
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
            ),
          ),
          SmsApplicationSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
            ),
          ),
          SmsFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          SmsFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            ),
          ),
          SmsMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          SmsUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the phone number receives an incoming SMS message.',
            ),
          ),
          StatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          VoiceApplicationSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            ),
          ),
          VoiceCallerIdLookup: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
            ),
          ),
          VoiceFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          VoiceFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
          VoiceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          VoiceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            ),
          ),
          EmergencyStatus: IncomingPhoneNumberEnumEmergencyStatusSchema,
          EmergencyAddressSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the emergency address configuration to use for emergency calling from this phone number.',
            ),
          ),
          TrunkSid: v.pipe(
            v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            ),
          ),
          VoiceReceiveMode: IncomingPhoneNumberEnumVoiceReceiveModeSchema,
          IdentitySid: v.pipe(
            v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations.',
            ),
          ),
          AddressSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations.',
            ),
          ),
          BundleSid: v.pipe(
            v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          FriendlyName: v.string(),
          PhoneNumber: v.string(),
          Origin: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          ApiVersion: v.pipe(
            v.string(),
            v.description(
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            ),
          ),
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number.',
            ),
          ),
          SmsApplicationSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
            ),
          ),
          SmsFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          SmsFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            ),
          ),
          SmsMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          SmsUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the new phone number receives an incoming SMS message.',
            ),
          ),
          StatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          VoiceApplicationSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            ),
          ),
          VoiceCallerIdLookup: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
            ),
          ),
          VoiceFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          VoiceFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
          VoiceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          VoiceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            ),
          ),
          EmergencyStatus: IncomingPhoneNumberEnumEmergencyStatusSchema,
          EmergencyAddressSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            ),
          ),
          TrunkSid: v.pipe(
            v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            ),
          ),
          IdentitySid: v.pipe(
            v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
            ),
          ),
          AddressSid: v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            ),
          ),
          VoiceReceiveMode: IncomingPhoneNumberEnumVoiceReceiveModeSchema,
          BundleSid: v.pipe(
            v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            ),
          ),
          PhoneNumber: v.pipe(
            v.string(),
            v.description(
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
            ),
          ),
          AreaCode: v.pipe(
            v.string(),
            v.description(
              'The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only).',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        InstalledAddOnSid: v.pipe(
          v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          v.description('The SID that identifies the Add-on installation.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AssignedAddOnSid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AssignedAddOnSid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          FriendlyName: v.string(),
          PhoneNumber: v.string(),
          Origin: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        PhoneNumber: v.pipe(
          v.string(),
          v.description(
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          ),
        ),
        ApiVersion: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            ),
          ),
        ),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
            ),
          ),
        ),
        SmsApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
            ),
          ),
        ),
        SmsFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SmsFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            ),
          ),
        ),
        SmsMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SmsUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the new phone number receives an incoming SMS message.',
            ),
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            ),
          ),
        ),
        VoiceCallerIdLookup: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
            ),
          ),
        ),
        VoiceFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
        ),
        VoiceMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            ),
          ),
        ),
        IdentitySid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
            ),
          ),
        ),
        AddressSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            ),
          ),
        ),
        EmergencyStatus: v.optional(IncomingPhoneNumberLocalEnumEmergencyStatusSchema),
        EmergencyAddressSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            ),
          ),
        ),
        TrunkSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            ),
          ),
        ),
        VoiceReceiveMode: v.optional(IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema),
        BundleSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          FriendlyName: v.string(),
          PhoneNumber: v.string(),
          Origin: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        PhoneNumber: v.pipe(
          v.string(),
          v.description(
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          ),
        ),
        ApiVersion: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            ),
          ),
        ),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number.',
            ),
          ),
        ),
        SmsApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application.',
            ),
          ),
        ),
        SmsFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SmsFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            ),
          ),
        ),
        SmsMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SmsUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the new phone number receives an incoming SMS message.',
            ),
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            ),
          ),
        ),
        VoiceCallerIdLookup: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
            ),
          ),
        ),
        VoiceFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
        ),
        VoiceMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            ),
          ),
        ),
        IdentitySid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
            ),
          ),
        ),
        AddressSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            ),
          ),
        ),
        EmergencyStatus: v.optional(IncomingPhoneNumberMobileEnumEmergencyStatusSchema),
        EmergencyAddressSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            ),
          ),
        ),
        TrunkSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            ),
          ),
        ),
        VoiceReceiveMode: v.optional(IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema),
        BundleSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Beta: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          FriendlyName: v.string(),
          PhoneNumber: v.string(),
          Origin: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        PhoneNumber: v.pipe(
          v.string(),
          v.description(
            'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          ),
        ),
        ApiVersion: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            ),
          ),
        ),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
            ),
          ),
        ),
        SmsApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
            ),
          ),
        ),
        SmsFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SmsFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            ),
          ),
        ),
        SmsMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SmsUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when the new phone number receives an incoming SMS message.',
            ),
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            ),
          ),
        ),
        VoiceCallerIdLookup: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
            ),
          ),
        ),
        VoiceFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            ),
          ),
        ),
        VoiceMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        VoiceUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            ),
          ),
        ),
        IdentitySid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations.',
            ),
          ),
        ),
        AddressSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            ),
          ),
        ),
        EmergencyStatus: v.optional(IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema),
        EmergencyAddressSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            ),
          ),
        ),
        TrunkSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            ),
          ),
        ),
        VoiceReceiveMode: v.optional(IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema),
        BundleSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          DateCreated: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'DateCreated<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'DateCreated>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Url: v.pipe(
          v.pipe(v.string(), v.url()),
          v.description('The absolute URL of the Queue resource.'),
        ),
        Method: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          To: v.string(),
          From: v.string(),
          DateSent: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'DateSent<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'DateSent>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        To: v.pipe(
          v.string(),
          v.description(
            "The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.",
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). ',
            ),
          ),
        ),
        ApplicationSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              "The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored.",
            ),
          ),
        ),
        MaxPrice: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.finite(),
            ),
            v.description(
              '[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.',
            ),
          ),
        ),
        ProvideFeedback: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`.',
            ),
          ),
        ),
        Attempt: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'Total number of attempts made (including this request) to send the message regardless of the provider used',
            ),
          ),
        ),
        ValidityPeriod: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              "The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)",
            ),
          ),
        ),
        ForceDelivery: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description('Reserved'),
          ),
        ),
        ContentRetention: v.optional(MessageEnumContentRetentionSchema),
        AddressRetention: v.optional(MessageEnumAddressRetentionSchema),
        SmartEncoded: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`.',
            ),
          ),
        ),
        PersistentAction: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).',
            ),
          ),
        ),
        TrafficType: v.optional(MessageEnumTrafficTypeSchema),
        ShortenUrls: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided.',
            ),
          ),
        ),
        ScheduleType: v.optional(MessageEnumScheduleTypeSchema),
        SendAt: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
            v.description(
              'The time that Twilio will send the message. Must be in ISO 8601 format.',
            ),
          ),
        ),
        SendAsMms: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media.',
            ),
          ),
        ),
        ContentVariables: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used.",
            ),
          ),
        ),
        MessageIntent: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "Specifies the purpose or use case of the outbound communication. This parameter is used by Twilio's [Traffic Shaping](https://www.twilio.com/docs/messaging/features/traffic-shaping) and [Compliance Toolkit](https://www.twilio.com/docs/messaging/features/compliance-toolkit) products. Possible values include: `otp`, `notifications`, `marketing`, `fraud`, `security`, `customercare`, `delivery`, `education`, `polling`, `announcements`, and `events`.",
            ),
          ),
        ),
        RiskCheck: v.optional(MessageEnumRiskCheckSchema),
        From: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.",
            ),
          ),
        ),
        FallbackFrom: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message.',
            ),
          ),
        ),
        MessagingServiceSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^MG[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              "The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool.",
            ),
          ),
        ),
        Body: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).',
            ),
          ),
        ),
        MediaUrl: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.pipe(v.string(), v.url())),
            ),
            v.description(
              'The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.',
            ),
          ),
        ),
        ContentSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^HX[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              "For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources).",
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Body: v.pipe(
            v.string(),
            v.description(
              "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
            ),
          ),
          Status: MessageEnumUpdateStatusSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator('form', v.partial(v.object({ Outcome: MessageFeedbackEnumOutcomeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Log: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          MessageDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'MessageDate<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          'MessageDate>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PhoneNumber: v.string(),
          FriendlyName: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        PhoneNumber: v.pipe(
          v.string(),
          v.description(
            'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          ),
        ),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number.',
            ),
          ),
        ),
        CallDelay: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of seconds to delay before initiating the verification call. Can be an integer between `0` and `60`, inclusive. The default is `0`.',
            ),
          ),
        ),
        Extension: v.optional(
          v.pipe(
            v.string(),
            v.description('The digits to dial after connecting the verification call.'),
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information about the verification process to your application.',
            ),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Muted: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`.',
            ),
          ),
          Hold: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference.',
            ),
          ),
          HoldUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
            ),
          ),
          HoldMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`.',
            ),
          ),
          AnnounceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
            ),
          ),
          AnnounceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
          WaitUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
            ),
          ),
          WaitMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
            ),
          ),
          BeepOnExit: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`.',
            ),
          ),
          EndConferenceOnExit: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
            ),
          ),
          Coaching: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
            ),
          ),
          CallSidToCoach: v.pipe(
            v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Muted: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Hold: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          Coaching: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.string(),
      }),
    ),
    sValidator(
      'form',
      v.object({
        From: v.pipe(
          v.string(),
          v.description(
            'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.',
          ),
        ),
        To: v.pipe(
          v.string(),
          v.description(
            'The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified.',
          ),
        ),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `status_callback_method` to send status information to your application.',
            ),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`.',
            ),
          ),
        ),
        StatusCallbackEvent: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.',
            ),
          ),
        ),
        Label: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.',
            ),
          ),
        ),
        Timeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds.',
            ),
          ),
        ),
        Record: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`.',
            ),
          ),
        ),
        Muted: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`.',
            ),
          ),
        ),
        Beep: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`.',
            ),
          ),
        ),
        StartConferenceOnEnter: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
            ),
          ),
        ),
        EndConferenceOnExit: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
            ),
          ),
        ),
        WaitUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
            ),
          ),
        ),
        WaitMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
            ),
          ),
        ),
        EarlyMedia: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`.',
            ),
          ),
        ),
        MaxParticipants: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`.',
            ),
          ),
        ),
        ConferenceRecord: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`.',
            ),
          ),
        ),
        ConferenceTrim: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`.',
            ),
          ),
        ),
        ConferenceStatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored.',
            ),
          ),
        ),
        ConferenceStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        ConferenceStatusCallbackEvent: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              'The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.',
            ),
          ),
        ),
        RecordingChannels: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`.',
            ),
          ),
        ),
        RecordingStatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call using the `recording_status_callback_method` when the recording status changes.',
            ),
          ),
        ),
        RecordingStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        SipAuthUsername: v.optional(
          v.pipe(v.string(), v.description('The SIP username used for authentication.')),
        ),
        SipAuthPassword: v.optional(
          v.pipe(v.string(), v.description('The SIP password for authentication.')),
        ),
        Region: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`.',
            ),
          ),
        ),
        ConferenceRecordingStatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available.',
            ),
          ),
        ),
        ConferenceRecordingStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            ),
          ),
        ),
        RecordingStatusCallbackEvent: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              "The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.",
            ),
          ),
        ),
        ConferenceRecordingStatusCallbackEvent: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.string()),
            ),
            v.description(
              "The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`",
            ),
          ),
        ),
        Coaching: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
            ),
          ),
        ),
        CallSidToCoach: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
            ),
          ),
        ),
        JitterBufferSize: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`.",
            ),
          ),
        ),
        Byoc: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^BY[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
            ),
          ),
        ),
        CallerId: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint.',
            ),
          ),
        ),
        CallReason: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
            ),
          ),
        ),
        RecordingTrack: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio.',
            ),
          ),
        ),
        RecordingConfigurationId: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The identifier of the configuration to be used when creating and processing the recording',
            ),
          ),
        ),
        TimeLimit: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
            ),
          ),
        ),
        MachineDetection: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
            ),
          ),
        ),
        MachineDetectionTimeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
            ),
          ),
        ),
        MachineDetectionSpeechThreshold: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
            ),
          ),
        ),
        MachineDetectionSpeechEndThreshold: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
            ),
          ),
        ),
        MachineDetectionSilenceTimeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
            ),
          ),
        ),
        AmdStatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
            ),
          ),
        ),
        AmdStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
            ),
          ),
        ),
        Trim: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
            ),
          ),
        ),
        CallToken: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
            ),
          ),
        ),
        Passports: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
            ),
          ),
        ),
        ClientNotificationUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('The URL that we should use to deliver `push call notification`.'),
          ),
        ),
        CallerDisplayName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.',
            ),
          ),
        ),
        EmergencyCallerPosition: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The emergency caller\'s GPS coordinates in decimal degrees format.\nFormat: "latitude longitude" (space-separated)\n- Latitude: decimal degrees, range -90.0 to +90.0 (negative for South, positive for North)\n- Longitude: decimal degrees, range -180.0 to +180.0 (negative for West, positive for East)\n- Precision: up to 6 decimal places recommended for meter-level accuracy\n\nNote: If the value exceeds 150 characters, only the first 150 characters will be used.\n',
            ),
          ),
        ),
        EmergencyCallerLocation: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's physical location description within a building or facility.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            ),
          ),
        ),
        EmergencyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's organization or entity name.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            ),
          ),
        ),
        EmergencyAddress: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's street address including street number and street name.\n\nNote: If the value exceeds 60 characters, only the first 60 characters will be used.\n",
            ),
          ),
        ),
        EmergencyZipCode: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's postal code or ZIP code.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            ),
          ),
        ),
        EmergencyCity: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's city or municipality name.\nShould be the official city name as recognized by local authorities.\nUsed in combination with state and country for emergency call routing.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            ),
          ),
        ),
        EmergencyState: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's state or province.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            ),
          ),
        ),
        EmergencyCountry: v.optional(
          v.pipe(
            v.string(),
            v.description(
              "The emergency caller's country. Currently supported US and CA only.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        IdempotencyKey: v.pipe(
          v.string(),
          v.description(
            'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
          ),
        ),
        StatusCallback: v.pipe(
          v.pipe(v.string(), v.url()),
          v.description(
            'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback)',
          ),
        ),
        BankAccountType: v.optional(PaymentsEnumBankAccountTypeSchema),
        ChargeAmount: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.finite(),
            ),
            v.description(
              'A positive decimal value less than 1,000,000 to charge against the credit card or bank account. Default currency can be overwritten with `currency` field. Leave blank or set to 0 to tokenize.',
            ),
          ),
        ),
        Currency: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted.',
            ),
          ),
        ),
        Description: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions.',
            ),
          ),
        ),
        Input: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs.',
            ),
          ),
        ),
        MinPostalCodeLength: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'A positive integer that is used to validate the length of the `PostalCode` inputted by the user. User must enter this many digits.',
            ),
          ),
        ),
        Parameter: v.optional(
          v.pipe(
            v.any(),
            v.description(
              'A single-level JSON object used to pass custom parameters to payment processors. (Required for ACH payments). The information that has to be included here depends on the <Pay> Connector. [Read more](https://www.twilio.com/console/voice/pay-connectors).',
            ),
          ),
        ),
        PaymentConnector: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`.',
            ),
          ),
        ),
        PaymentMethod: v.optional(PaymentsEnumPaymentMethodSchema),
        PostalCode: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Indicates whether the credit card postal code (zip code) is a required piece of payment information that must be provided by the caller. The default is `true`.',
            ),
          ),
        ),
        SecurityCode: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Indicates whether the credit card security code is a required piece of payment information that must be provided by the caller. The default is `true`.',
            ),
          ),
        ),
        Timeout: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The number of seconds that <Pay> should wait for the caller to press a digit between each subsequent digit, after the first one, before moving on to validate the digits captured. The default is `5`, maximum is `600`.',
            ),
          ),
        ),
        TokenType: v.optional(PaymentsEnumTokenTypeSchema),
        ValidCardTypes: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex`',
            ),
          ),
        ),
        RequireMatchingInputs: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`.',
            ),
          ),
        ),
        Confirmation: v.optional(
          v.pipe(
            v.picklist(['true', 'false']),
            v.description(
              'Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        IdempotencyKey: v.pipe(
          v.string(),
          v.description(
            'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
          ),
        ),
        StatusCallback: v.pipe(
          v.pipe(v.string(), v.url()),
          v.description(
            'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests.',
          ),
        ),
        Capture: v.optional(PaymentsEnumCaptureSchema),
        Status: v.optional(PaymentsEnumStatusSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
            ),
          ),
          MaxSize: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        FriendlyName: v.pipe(
          v.string(),
          v.description(
            'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
          ),
        ),
        MaxSize: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Name: v.pipe(
            v.string(),
            v.description(
              'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
            ),
          ),
          Track: RealtimeTranscriptionEnumTrackSchema,
          StatusCallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('Absolute URL of the status callback.'),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description('The http method for the status_callback (one of GET, POST).'),
          ),
          InboundTrackLabel: v.pipe(
            v.string(),
            v.description('Friendly name given to the Inbound Track'),
          ),
          OutboundTrackLabel: v.pipe(
            v.string(),
            v.description('Friendly name given to the Outbound Track'),
          ),
          PartialResults: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description('Indicates if partial results are going to be sent to the customer'),
          ),
          LanguageCode: v.pipe(
            v.string(),
            v.description(
              'Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format',
            ),
          ),
          TranscriptionEngine: v.pipe(
            v.string(),
            v.description(
              'Definition of the transcription engine to be used, among those supported by Twilio',
            ),
          ),
          ProfanityFilter: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks',
            ),
          ),
          SpeechModel: v.pipe(
            v.string(),
            v.description(
              'Recognition model used by the transcription engine, among those supported by the provider',
            ),
          ),
          Hints: v.pipe(
            v.string(),
            v.description(
              'A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them.',
            ),
          ),
          EnableAutomaticPunctuation: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description('The provider will add punctuation to recognition result'),
          ),
          IntelligenceService: v.pipe(
            v.string(),
            v.description(
              'The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators',
            ),
          ),
          ConversationConfiguration: v.pipe(
            v.string(),
            v.description(
              'The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service',
            ),
          ),
          ConversationId: v.pipe(
            v.string(),
            v.description(
              'The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service',
            ),
          ),
          TranscriptionConfigurationId: v.pipe(
            v.string(),
            v.description(
              'The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go.',
            ),
          ),
          EnableProviderData: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description('Whether the callback includes raw provider data.'),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    ),
    sValidator('form', v.object({ Status: RealtimeTranscriptionEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          IncludeSoftDeleted: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          DateCreated: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'DateCreated<': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          'DateCreated>': v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
          IncludeSoftDeleted: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PayloadSid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code.',
            ),
          ),
          ApiVersion: v.pipe(
            v.string(),
            v.description(
              'The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`.',
            ),
          ),
          SmsUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL we should call when receiving an incoming SMS message to this short code.',
            ),
          ),
          SmsMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`.',
            ),
          ),
          SmsFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
            ),
          ),
          SmsFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          FriendlyName: v.string(),
          ShortCode: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(v.object({ FriendlyName: v.pipe(v.string(), v.description('')) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        CredentialListSid: v.pipe(
          v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
          v.description('The SID of the CredentialList resource to map to the SIP domain.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        IpAccessControlListSid: v.pipe(
          v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
          v.description('The SID of the IpAccessControlList resource to map to the SIP domain.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        CredentialListSid: v.pipe(
          v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
          v.description('The SID of the CredentialList resource to map to the SIP domain.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Username: v.pipe(
          v.string(),
          v.description(
            "The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.",
          ),
        ),
        Password: v.pipe(
          v.string(),
          v.description(
            'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Password: v.pipe(
            v.string(),
            v.description(
              'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        FriendlyName: v.pipe(
          v.string(),
          v.description(
            'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        FriendlyName: v.pipe(
          v.string(),
          v.description(
            'A human readable descriptive text for a CredentialList, up to 64 characters long.',
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        CredentialListSid: v.pipe(
          v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
          v.description(
            'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        DomainName: v.pipe(
          v.string(),
          v.description(
            'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
          ),
        ),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        ),
        VoiceUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('The URL we should when the domain receives a call.'),
          ),
        ),
        VoiceMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
            ),
          ),
        ),
        VoiceFallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`.',
            ),
          ),
        ),
        VoiceFallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
        ),
        VoiceStatusCallbackUrl: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to pass status parameters (such as call ended) to your application.',
            ),
          ),
        ),
        VoiceStatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
            ),
          ),
        ),
        SipRegistration: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
            ),
          ),
        ),
        EmergencyCallingEnabled: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
            ),
          ),
        ),
        Secure: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
            ),
          ),
        ),
        ByocTrunkSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^BY[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
            ),
          ),
        ),
        EmergencyCallerSid: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
            ),
          ),
          VoiceFallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            ),
          ),
          VoiceFallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`.',
            ),
          ),
          VoiceMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description('The HTTP method we should use to call `voice_url`'),
          ),
          VoiceStatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
            ),
          ),
          VoiceStatusCallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description(
              'The URL that we should call to pass status parameters (such as call ended) to your application.',
            ),
          ),
          VoiceUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('The URL we should call when the domain receives a call.'),
          ),
          SipRegistration: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
            ),
          ),
          DomainName: v.pipe(
            v.string(),
            v.description(
              'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
            ),
          ),
          EmergencyCallingEnabled: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
            ),
          ),
          Secure: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
            v.description(
              'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
            ),
          ),
          ByocTrunkSid: v.pipe(
            v.pipe(v.string(), v.regex(/^BY[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
            ),
          ),
          EmergencyCallerSid: v.pipe(
            v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
            v.description(
              'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        FriendlyName: v.pipe(
          v.string(),
          v.description(
            'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        FriendlyName: v.pipe(
          v.string(),
          v.description('A human readable descriptive text, up to 255 characters long.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        IpAccessControlListSid: v.pipe(
          v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
          v.description('The unique id of the IP access control list to map to the SIP domain.'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        IpAccessControlListSid: v.pipe(
          v.string(),
          v.regex(/^AL[0-9a-fA-F]{32}$/),
          v.codePoints(34),
        ),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        IpAccessControlListSid: v.pipe(
          v.string(),
          v.regex(/^AL[0-9a-fA-F]{32}$/),
          v.codePoints(34),
        ),
      }),
    ),
    sValidator(
      'form',
      v.object({
        FriendlyName: v.pipe(
          v.string(),
          v.description(
            'A human readable descriptive text for this resource, up to 255 characters long.',
          ),
        ),
        IpAddress: v.pipe(
          v.string(),
          v.description(
            'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
          ),
        ),
        CidrPrefixLength: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        IpAccessControlListSid: v.pipe(
          v.string(),
          v.regex(/^AL[0-9a-fA-F]{32}$/),
          v.codePoints(34),
        ),
        Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        IpAccessControlListSid: v.pipe(
          v.string(),
          v.regex(/^AL[0-9a-fA-F]{32}$/),
          v.codePoints(34),
        ),
        Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          IpAddress: v.pipe(
            v.string(),
            v.description(
              'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
            ),
          ),
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A human readable descriptive text for this resource, up to 255 characters long.',
            ),
          ),
          CidrPrefixLength: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        IpAccessControlListSid: v.pipe(
          v.string(),
          v.regex(/^AL[0-9a-fA-F]{32}$/),
          v.codePoints(34),
        ),
        Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Name: v.pipe(
            v.string(),
            v.description(
              'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
            ),
          ),
          ConnectorName: v.pipe(
            v.string(),
            v.description(
              'Unique name used when configuring the connector via Marketplace Add-on.',
            ),
          ),
          Track: SiprecEnumTrackSchema,
          StatusCallback: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('Absolute URL of the status callback.'),
          ),
          StatusCallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description('The http method for the status_callback (one of GET, POST).'),
          ),
          'Parameter1.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter1.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter2.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter2.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter3.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter3.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter4.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter4.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter5.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter5.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter6.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter6.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter7.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter7.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter8.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter8.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter9.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter9.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter10.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter10.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter11.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter11.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter12.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter12.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter13.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter13.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter14.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter14.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter15.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter15.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter16.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter16.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter17.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter17.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter18.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter18.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter19.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter19.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter20.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter20.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter21.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter21.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter22.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter22.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter23.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter23.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter24.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter24.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter25.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter25.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter26.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter26.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter27.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter27.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter28.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter28.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter29.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter29.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter30.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter30.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter31.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter31.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter32.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter32.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter33.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter33.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter34.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter34.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter35.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter35.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter36.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter36.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter37.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter37.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter38.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter38.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter39.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter39.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter40.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter40.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter41.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter41.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter42.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter42.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter43.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter43.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter44.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter44.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter45.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter45.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter46.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter46.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter47.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter47.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter48.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter48.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter49.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter49.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter50.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter50.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter51.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter51.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter52.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter52.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter53.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter53.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter54.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter54.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter55.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter55.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter56.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter56.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter57.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter57.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter58.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter58.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter59.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter59.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter60.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter60.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter61.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter61.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter62.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter62.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter63.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter63.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter64.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter64.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter65.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter65.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter66.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter66.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter67.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter67.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter68.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter68.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter69.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter69.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter70.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter70.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter71.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter71.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter72.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter72.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter73.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter73.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter74.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter74.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter75.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter75.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter76.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter76.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter77.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter77.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter78.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter78.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter79.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter79.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter80.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter80.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter81.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter81.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter82.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter82.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter83.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter83.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter84.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter84.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter85.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter85.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter86.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter86.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter87.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter87.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter88.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter88.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter89.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter89.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter90.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter90.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter91.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter91.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter92.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter92.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter93.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter93.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter94.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter94.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter95.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter95.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter96.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter96.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter97.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter97.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter98.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter98.Value': v.pipe(v.string(), v.description('Parameter value')),
          'Parameter99.Name': v.pipe(v.string(), v.description('Parameter name')),
          'Parameter99.Value': v.pipe(v.string(), v.description('Parameter value')),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    ),
    sValidator('form', v.object({ Status: SiprecEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Url: v.pipe(
          v.pipe(v.string(), v.url()),
          v.description('Relative or absolute URL where WebSocket connection will be established.'),
        ),
        Name: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
            ),
          ),
        ),
        Track: v.optional(StreamEnumTrackSchema),
        StatusCallback: v.optional(
          v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('Absolute URL to which Twilio sends status callback HTTP requests.'),
          ),
        ),
        StatusCallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`.',
            ),
          ),
        ),
        'Parameter1.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter1.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter2.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter2.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter3.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter3.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter4.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter4.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter5.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter5.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter6.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter6.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter7.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter7.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter8.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter8.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter9.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter9.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter10.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter10.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter11.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter11.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter12.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter12.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter13.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter13.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter14.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter14.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter15.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter15.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter16.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter16.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter17.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter17.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter18.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter18.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter19.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter19.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter20.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter20.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter21.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter21.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter22.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter22.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter23.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter23.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter24.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter24.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter25.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter25.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter26.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter26.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter27.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter27.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter28.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter28.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter29.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter29.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter30.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter30.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter31.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter31.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter32.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter32.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter33.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter33.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter34.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter34.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter35.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter35.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter36.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter36.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter37.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter37.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter38.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter38.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter39.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter39.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter40.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter40.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter41.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter41.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter42.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter42.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter43.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter43.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter44.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter44.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter45.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter45.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter46.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter46.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter47.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter47.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter48.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter48.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter49.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter49.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter50.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter50.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter51.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter51.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter52.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter52.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter53.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter53.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter54.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter54.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter55.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter55.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter56.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter56.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter57.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter57.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter58.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter58.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter59.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter59.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter60.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter60.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter61.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter61.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter62.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter62.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter63.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter63.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter64.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter64.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter65.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter65.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter66.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter66.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter67.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter67.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter68.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter68.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter69.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter69.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter70.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter70.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter71.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter71.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter72.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter72.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter73.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter73.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter74.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter74.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter75.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter75.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter76.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter76.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter77.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter77.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter78.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter78.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter79.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter79.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter80.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter80.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter81.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter81.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter82.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter82.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter83.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter83.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter84.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter84.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter85.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter85.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter86.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter86.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter87.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter87.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter88.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter88.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter89.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter89.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter90.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter90.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter91.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter91.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter92.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter92.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter93.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter93.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter94.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter94.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter95.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter95.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter96.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter96.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter97.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter97.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter98.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter98.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
        'Parameter99.Name': v.optional(v.pipe(v.string(), v.description('Parameter name'))),
        'Parameter99.Value': v.optional(v.pipe(v.string(), v.description('Parameter value'))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    ),
    sValidator('form', v.object({ Status: StreamEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Tokens.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          Ttl: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            v.description(
              'The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours).',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Category: v.string(),
          StartDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          EndDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
          IncludeSubaccounts: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.partial(
        v.object({
          CallbackMethod: v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
            ),
          ),
          CallbackUrl: v.pipe(
            v.pipe(v.string(), v.url()),
            v.description('The URL we should call using `callback_method` when the trigger fires.'),
          ),
          FriendlyName: v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          Recurring: UsageTriggerEnumRecurringSchema,
          TriggerBy: UsageTriggerEnumTriggerFieldSchema,
          UsageCategory: v.string(),
          PageSize: v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
          ),
          PageToken: v.string(),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        CallbackUrl: v.pipe(
          v.pipe(v.string(), v.url()),
          v.description('The URL we should call using `callback_method` when the trigger fires.'),
        ),
        TriggerValue: v.pipe(
          v.string(),
          v.description(
            'The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`.',
          ),
        ),
        UsageCategory: v.pipe(
          v.string(),
          v.description(
            'The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value.',
          ),
        ),
        CallbackMethod: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
            ),
          ),
        ),
        FriendlyName: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            ),
          ),
        ),
        Recurring: v.optional(UsageTriggerEnumRecurringSchema),
        TriggerBy: v.optional(UsageTriggerEnumTriggerFieldSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Content: v.pipe(
          v.string(),
          v.description('The User Defined Message in the form of URL-encoded JSON string.'),
        ),
        IdempotencyKey: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    sValidator(
      'form',
      v.object({
        Callback: v.pipe(
          v.pipe(v.string(), v.url()),
          v.description(
            'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
          ),
        ),
        IdempotencyKey: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
            ),
          ),
        ),
        Method: v.optional(
          v.pipe(
            v.picklist(['GET', 'POST']),
            v.description(
              'The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    sValidator(
      'param',
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^ZY[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
