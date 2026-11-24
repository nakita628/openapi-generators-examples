import { defineHandler } from 'hono/factory'
import { type } from 'arktype'

export const AccountEnumStatusSchema = type("'active' | 'suspended' | 'closed'").describe(
  'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
)

export type AccountEnumStatus = typeof AccountEnumStatusSchema.infer

export const AccountEnumTypeSchema = type("'Trial' | 'Full'").describe(
  "The type of this account. Either `Trial` or `Full` if it's been upgraded",
)

export type AccountEnumType = typeof AccountEnumTypeSchema.infer

export const ApiV2010AccountSchema = type({
  'auth_token?': type('string | null').describe(
    'The authorization token for this account. This token should be kept a secret, so no sharing.',
  ),
  'date_created?': type('string | null').describe(
    'The date that this account was created, in GMT in RFC 2822 format',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this account was last updated, in GMT in RFC 2822 format.',
  ),
  'friendly_name?': type('string | null').describe(
    'A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.',
  ),
  'owner_account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      "The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid.",
    ),
  'sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'status?': AccountEnumStatusSchema,
  'subresource_uris?': type(type({}))
    .or('null')
    .describe('A Map of various subresources available for the given Account Instance'),
  'type?': AccountEnumTypeSchema,
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`',
  ),
})

export type ApiV2010Account = typeof ApiV2010AccountSchema.infer

export const ApiV2010AccountAddressSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource.',
    ),
  'city?': type('string | null').describe('The city in which the address is located.'),
  'customer_name?': type('string | null').describe(
    'The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'iso_country?': type('string | null').describe('The ISO country code of the address.'),
  'postal_code?': type('string | null').describe('The postal code of the address.'),
  'region?': type('string | null').describe('The state or region of the address.'),
  'sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Address resource.'),
  'street?': type('string | null').describe('The number and street address of the address.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'emergency_enabled?': type('boolean | null').describe(
    'Whether emergency calling has been enabled on this number.',
  ),
  'validated?': type('boolean | null').describe(
    "Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid.",
  ),
  'verified?': type('boolean | null').describe(
    "Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid.",
  ),
  'street_secondary?': type('string | null').describe(
    'The additional number and street address of the address.',
  ),
})

export type ApiV2010AccountAddress = typeof ApiV2010AccountAddressSchema.infer

export const ApiV2010AccountApplicationSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource.',
    ),
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'message_status_callback?': type('string.url | null').describe(
    'The URL we call using a POST method to send message status information to your application.',
  ),
  'sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Application resource.'),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_status_callback?': type('string.url | null').describe(
    'The URL we call using a POST method to send status information to your application about SMS messages that refer to the application.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives an incoming SMS message.',
  ),
  'status_callback?': type('string.url | null').describe(
    'The URL we call using the `status_callback_method` to send status information to your application.',
  ),
  'status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'voice_caller_id_lookup?': type('boolean | null').describe(
    "Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call when the phone number assigned to this application receives a call.',
  ),
  'public_application_connect_enabled?': type('boolean | null').describe(
    'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
  ),
})

export type ApiV2010AccountApplication = typeof ApiV2010AccountApplicationSchema.infer

export const AuthorizedConnectAppEnumPermissionSchema = type("'get-all' | 'post-all'").describe(
  'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
)

export type AuthorizedConnectAppEnumPermission =
  typeof AuthorizedConnectAppEnumPermissionSchema.infer

export const ApiV2010AccountAuthorizedConnectAppSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource.',
    ),
  'connect_app_company_name?': type('string | null').describe(
    'The company name set for the Connect App.',
  ),
  'connect_app_description?': type('string | null').describe(
    'A detailed description of the Connect App.',
  ),
  'connect_app_friendly_name?': type('string | null').describe('The name of the Connect App.'),
  'connect_app_homepage_url?': type('string.url | null').describe(
    'The public URL for the Connect App.',
  ),
  'connect_app_sid?': type(
    type('string')
      .and(/^CN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID that we assigned to the Connect App.'),
  'permissions?': type(type(AuthorizedConnectAppEnumPermissionSchema).array())
    .or('null')
    .describe(
      'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountAuthorizedConnectApp =
  typeof ApiV2010AccountAuthorizedConnectAppSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountrySchema = type({
  'country_code?': type('string | null').describe(
    'The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country.',
  ),
  'country?': type('string | null').describe('The name of the country.'),
  'uri?': type('string.url | null').describe(
    'The URI of the Country resource, relative to `https://api.twilio.com`.',
  ),
  'beta?': type('boolean | null').describe(
    'Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountry =
  typeof ApiV2010AccountAvailablePhoneNumberCountrySchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema = type({
  'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'lata?': type('string | null').describe(
    'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'locality?': type('string | null').describe(
    "The locality or city of this phone number's location.",
  ),
  'rate_center?': type('string | null').describe(
    'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'latitude?': type('number | null').describe(
    "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'longitude?': type('number | null').describe(
    "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'region?': type('string | null').describe(
    "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'postal_code?': type('string | null').describe(
    "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'iso_country?': type('string | null').describe(
    'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
  ),
  'address_requirements?': type('string | null').describe(
    "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
  type({
    'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
    'phone_number?': type('string | null').describe(
      'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    ),
    'lata?': type('string | null').describe(
      'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
    ),
    'locality?': type('string | null').describe(
      "The locality or city of this phone number's location.",
    ),
    'rate_center?': type('string | null').describe(
      'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
    ),
    'latitude?': type('number | null').describe(
      "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    ),
    'longitude?': type('number | null').describe(
      "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    ),
    'region?': type('string | null').describe(
      "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
    ),
    'postal_code?': type('string | null').describe(
      "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
    ),
    'iso_country?': type('string | null').describe(
      'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
    ),
    'address_requirements?': type('string | null').describe(
      "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
    ),
    'beta?': type('boolean | null').describe(
      'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    ),
    'capabilities?': type(
      type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
    )
      .or('null')
      .describe(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema = type({
  'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'lata?': type('string | null').describe(
    'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'locality?': type('string | null').describe(
    "The locality or city of this phone number's location.",
  ),
  'rate_center?': type('string | null').describe(
    'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'latitude?': type('number | null').describe(
    "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'longitude?': type('number | null').describe(
    "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'region?': type('string | null').describe(
    "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'postal_code?': type('string | null').describe(
    "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'iso_country?': type('string | null').describe(
    'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
  ),
  'address_requirements?': type('string | null').describe(
    "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema = type({
  'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'lata?': type('string | null').describe(
    'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'locality?': type('string | null').describe(
    "The locality or city of this phone number's location.",
  ),
  'rate_center?': type('string | null').describe(
    'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'latitude?': type('number | null').describe(
    "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'longitude?': type('number | null').describe(
    "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'region?': type('string | null').describe(
    "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'postal_code?': type('string | null').describe(
    "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'iso_country?': type('string | null').describe(
    'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
  ),
  'address_requirements?': type('string | null').describe(
    "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema = type({
  'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'lata?': type('string | null').describe(
    'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'locality?': type('string | null').describe(
    "The locality or city of this phone number's location.",
  ),
  'rate_center?': type('string | null').describe(
    'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'latitude?': type('number | null').describe(
    "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'longitude?': type('number | null').describe(
    "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'region?': type('string | null').describe(
    "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'postal_code?': type('string | null').describe(
    "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'iso_country?': type('string | null').describe(
    'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
  ),
  'address_requirements?': type('string | null').describe(
    "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema = type({
  'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'lata?': type('string | null').describe(
    'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'locality?': type('string | null').describe(
    "The locality or city of this phone number's location.",
  ),
  'rate_center?': type('string | null').describe(
    'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'latitude?': type('number | null').describe(
    "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'longitude?': type('number | null').describe(
    "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'region?': type('string | null').describe(
    "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'postal_code?': type('string | null').describe(
    "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'iso_country?': type('string | null').describe(
    'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
  ),
  'address_requirements?': type('string | null').describe(
    "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema.infer

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema = type({
  'friendly_name?': type('string | null').describe('A formatted version of the phone number.'),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'lata?': type('string | null').describe(
    'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'locality?': type('string | null').describe(
    "The locality or city of this phone number's location.",
  ),
  'rate_center?': type('string | null').describe(
    'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
  ),
  'latitude?': type('number | null').describe(
    "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'longitude?': type('number | null').describe(
    "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'region?': type('string | null').describe(
    "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'postal_code?': type('string | null').describe(
    "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
  ),
  'iso_country?': type('string | null').describe(
    'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
  ),
  'address_requirements?': type('string | null').describe(
    "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip =
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema.infer

export const ApiV2010AccountBalanceSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique SID identifier of the Account.'),
  'balance?': type('string | null').describe(
    'The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
  ),
  'currency?': type('string | null').describe('The units of currency for the account balance'),
})

export type ApiV2010AccountBalance = typeof ApiV2010AccountBalanceSchema.infer

export const CallEnumStatusSchema = type(
  "'queued' | 'ringing' | 'in-progress' | 'completed' | 'busy' | 'failed' | 'no-answer' | 'canceled'",
).describe(
  'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
)

export type CallEnumStatus = typeof CallEnumStatusSchema.infer

export const ApiV2010AccountCallSchema = type({
  'sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that we created to identify this Call resource.'),
  'date_created?': type('string | null').describe(
    'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'parent_call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID that identifies the call that created this leg.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource.',
    ),
  'to?': type('string | null').describe(
    'The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
  ),
  'to_formatted?': type('string | null').describe(
    'The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
  ),
  'from?': type('string | null').describe(
    'The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
  ),
  'from_formatted?': type('string | null').describe(
    'The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
  ),
  'phone_number_sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed.',
    ),
  'status?': CallEnumStatusSchema,
  'start_time?': type('string | null').describe(
    'The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed.',
  ),
  'end_time?': type('string | null').describe(
    'The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully.',
  ),
  'duration?': type('string | null').describe(
    'The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.',
  ),
  'price?': type('string | null').describe(
    'The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls.',
  ),
  'direction?': type('string | null').describe(
    'A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN.',
  ),
  'answered_by?': type('string | null').describe(
    'Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise.',
  ),
  'api_version?': type('string | null').describe('The API version used to create the call.'),
  'forwarded_from?': type('string | null').describe(
    'The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty.',
  ),
  'group_sid?': type(
    type('string')
      .and(/^GP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The Group SID associated with this call. If no Group is associated with the call, the field is empty.',
    ),
  'caller_name?': type('string | null').describe(
    "The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty.",
  ),
  'queue_time?': type('string | null').describe(
    'The wait time in milliseconds before the call is placed.',
  ),
  'stir_verstat?': type('string | null').describe(
    'The STIR/SHAKEN verification status of the call, for example `TN-Validation-Passed-A`. Empty if the incoming call had no STIR/SHAKEN information.',
  ),
  'trunk_sid?': type(
    type('string')
      .and(/^TK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated.',
    ),
  'uri?': type('string | null').describe(
    'The URI of this resource, relative to `https://api.twilio.com`.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`.',
    ),
})

export type ApiV2010AccountCall = typeof ApiV2010AccountCallSchema.infer

export const CallEnumEventSchema = type("'initiated' | 'ringing' | 'answered' | 'completed'")

export type CallEnumEvent = typeof CallEnumEventSchema.infer

export const CallEnumUpdateStatusSchema = type("'canceled' | 'completed'")

export type CallEnumUpdateStatus = typeof CallEnumUpdateStatusSchema.infer

export const ApiV2010AccountCallCallEventSchema = type({
  'request?': type('unknown | null').describe(
    'Contains a dictionary representing the request of the call.',
  ),
  'response?': type('unknown | null').describe(
    'Contains a dictionary representing the call response, including a list of the call events.',
  ),
})

export type ApiV2010AccountCallCallEvent = typeof ApiV2010AccountCallCallEventSchema.infer

export const ApiV2010AccountCallCallNotificationSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
    ),
  'api_version?': type('string | null').describe(
    'The API version used to create the Call Notification resource.',
  ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'error_code?': type('string | null').describe(
    'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'log?': type('string | null').describe(
    'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
  ),
  'message_date?': type('string | null').describe(
    'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
  ),
  'message_text?': type('string | null').describe('The text of the notification.'),
  'more_info?': type('string.url | null').describe(
    'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'request_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
  ),
  'request_url?': type('string.url | null').describe(
    'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
  ),
  'sid?': type(
    type('string')
      .and(/^NO[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Call Notification resource.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountCallCallNotification =
  typeof ApiV2010AccountCallCallNotificationSchema.infer

export const ApiV2010AccountCallCallNotificationInstanceSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
    ),
  'api_version?': type('string | null').describe(
    'The API version used to create the Call Notification resource.',
  ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'error_code?': type('string | null').describe(
    'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'log?': type('string | null').describe(
    'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
  ),
  'message_date?': type('string | null').describe(
    'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
  ),
  'message_text?': type('string | null').describe('The text of the notification.'),
  'more_info?': type('string.url | null').describe(
    'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'request_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
  ),
  'request_url?': type('string.url | null').describe(
    'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
  ),
  'request_variables?': type('string | null').describe(
    'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
  ),
  'response_body?': type('string | null').describe('The HTTP body returned by your server.'),
  'response_headers?': type('string | null').describe('The HTTP headers returned by your server.'),
  'sid?': type(
    type('string')
      .and(/^NO[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Call Notification resource.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountCallCallNotificationInstance =
  typeof ApiV2010AccountCallCallNotificationInstanceSchema.infer

export const CallRecordingEnumStatusSchema = type(
  "'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'",
).describe(
  'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
)

export type CallRecordingEnumStatus = typeof CallRecordingEnumStatusSchema.infer

export const CallRecordingEnumSourceSchema = type(
  "'DialVerb' | 'Conference' | 'OutboundAPI' | 'Trunking' | 'RecordVerb' | 'StartCallRecordingAPI' | 'StartConferenceRecordingAPI'",
).describe(
  'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
)

export type CallRecordingEnumSource = typeof CallRecordingEnumSourceSchema.infer

export const ApiV2010AccountCallCallRecordingSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
    ),
  'api_version?': type('string | null').describe('The API version used to make the recording.'),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with.',
    ),
  'conference_sid?': type(
    type('string')
      .and(/^CF[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'start_time?': type('string | null').describe(
    'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'duration?': type('string | null').describe('The length of the recording in seconds.'),
  'sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Recording resource.'),
  'price?': type('number | null').describe(
    'The one-time cost of creating the recording in the `price_unit` currency.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'encryption_details?': type('unknown | null').describe(
    'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency used in the `price` property. Example: `USD`.',
  ),
  'status?': CallRecordingEnumStatusSchema,
  'channels?': type('number.integer').describe(
    'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
  ),
  'source?': CallRecordingEnumSourceSchema,
  'error_code?': type('number.integer | null').describe(
    'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
  ),
  'track?': type('string | null').describe(
    'The recorded track. Can be: `inbound`, `outbound`, or `both`.',
  ),
})

export type ApiV2010AccountCallCallRecording = typeof ApiV2010AccountCallCallRecordingSchema.infer

export const ConferenceEnumStatusSchema = type("'init' | 'in-progress' | 'completed'").describe(
  'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
)

export type ConferenceEnumStatus = typeof ConferenceEnumStatusSchema.infer

export const ConferenceEnumReasonConferenceEndedSchema = type(
  "'conference-ended-via-api' | 'participant-with-end-conference-on-exit-left' | 'participant-with-end-conference-on-exit-kicked' | 'last-participant-kicked' | 'last-participant-left'",
).describe(
  'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
)

export type ConferenceEnumReasonConferenceEnded =
  typeof ConferenceEnumReasonConferenceEndedSchema.infer

export const ApiV2010AccountConferenceSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'api_version?': type('string | null').describe('The API version used to create this conference.'),
  'friendly_name?': type('string | null').describe(
    'A string that you assigned to describe this conference room. Maximum length is 128 characters.',
  ),
  'region?': type('string | null').describe(
    'A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants.',
  ),
  'sid?': type(
    type('string')
      .and(/^CF[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique, Twilio-provided string used to identify this Conference resource.'),
  'status?': ConferenceEnumStatusSchema,
  'uri?': type('string | null').describe(
    'The URI of this resource, relative to `https://api.twilio.com`.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs relative to `https://api.twilio.com`.',
    ),
  'reason_conference_ended?': ConferenceEnumReasonConferenceEndedSchema,
  'call_sid_ending_conference?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The call SID that caused the conference to end.'),
})

export type ApiV2010AccountConference = typeof ApiV2010AccountConferenceSchema.infer

export const ConferenceEnumUpdateStatusSchema = type("'completed'")

export type ConferenceEnumUpdateStatus = typeof ConferenceEnumUpdateStatusSchema.infer

export const ConferenceRecordingEnumStatusSchema = type(
  "'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'",
).describe(
  'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
)

export type ConferenceRecordingEnumStatus = typeof ConferenceRecordingEnumStatusSchema.infer

export const ConferenceRecordingEnumSourceSchema = type(
  "'DialVerb' | 'Conference' | 'OutboundAPI' | 'Trunking' | 'RecordVerb' | 'StartCallRecordingAPI' | 'StartConferenceRecordingAPI'",
).describe(
  'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
)

export type ConferenceRecordingEnumSource = typeof ConferenceRecordingEnumSourceSchema.infer

export const ApiV2010AccountConferenceConferenceRecordingSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the recording.'),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with.',
    ),
  'conference_sid?': type(
    type('string')
      .and(/^CF[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The Conference SID that identifies the conference associated with the recording.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'start_time?': type('string | null').describe(
    'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'duration?': type('string | null').describe('The length of the recording in seconds.'),
  'sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique string that that we created to identify the Conference Recording resource.',
    ),
  'price?': type('string | null').describe(
    'The one-time cost of creating the recording in the `price_unit` currency.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency used in the `price` property. Example: `USD`.',
  ),
  'status?': ConferenceRecordingEnumStatusSchema,
  'channels?': type('number.integer').describe(
    'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
  ),
  'source?': ConferenceRecordingEnumSourceSchema,
  'error_code?': type('number.integer | null').describe(
    'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
  ),
  'encryption_details?': type('unknown | null').describe(
    'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountConferenceConferenceRecording =
  typeof ApiV2010AccountConferenceConferenceRecordingSchema.infer

export const ConnectAppEnumPermissionSchema = type("'get-all' | 'post-all'").describe(
  'The set of permissions that your ConnectApp requests.',
)

export type ConnectAppEnumPermission = typeof ConnectAppEnumPermissionSchema.infer

export const ApiV2010AccountConnectAppSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource.',
    ),
  'authorize_redirect_url?': type('string.url | null').describe(
    'The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
  ),
  'company_name?': type('string | null').describe('The company name set for the Connect App.'),
  'deauthorize_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `deauthorize_callback_url`.',
  ),
  'deauthorize_callback_url?': type('string.url | null').describe(
    'The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.',
  ),
  'description?': type('string | null').describe('The description of the Connect App.'),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'homepage_url?': type('string.url | null').describe(
    'The public URL where users can obtain more information about this Connect App.',
  ),
  'permissions?': type(type(ConnectAppEnumPermissionSchema).array())
    .or('null')
    .describe('The set of permissions that your ConnectApp requests.'),
  'sid?': type(
    type('string')
      .and(/^CN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the ConnectApp resource.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountConnectApp = typeof ApiV2010AccountConnectAppSchema.infer

export const DependentPhoneNumberEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type DependentPhoneNumberEnumAddressRequirement =
  typeof DependentPhoneNumberEnumAddressRequirementSchema.infer

export const DependentPhoneNumberEnumEmergencyStatusSchema = type("'Active' | 'Inactive'").describe(
  'Whether the phone number is enabled for emergency calling.',
)

export type DependentPhoneNumberEnumEmergencyStatus =
  typeof DependentPhoneNumberEnumEmergencyStatusSchema.infer

export const ApiV2010AccountAddressDependentPhoneNumberSchema = type({
  'sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique string that that we created to identify the DependentPhoneNumber resource.',
    ),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource.',
    ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
  ),
  'voice_caller_id_lookup?': type('boolean | null').describe(
    "Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each.",
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives an incoming SMS message.',
  ),
  'address_requirements?': DependentPhoneNumberEnumAddressRequirementSchema,
  'capabilities?': type('unknown | null').describe(
    'The set of Boolean properties that indicates whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
  ),
  'status_callback?': type('string.url | null').describe(
    'The URL we call using the `status_callback_method` to send status information to your application.',
  ),
  'status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
  ),
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session.',
  ),
  'sms_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    ),
  'voice_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    ),
  'trunk_sid?': type(
    type('string')
      .and(/^TK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    ),
  'emergency_status?': DependentPhoneNumberEnumEmergencyStatusSchema,
  'emergency_address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the emergency address configuration that we use for emergency calling from the phone number.',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountAddressDependentPhoneNumber =
  typeof ApiV2010AccountAddressDependentPhoneNumberSchema.infer

export const IncomingPhoneNumberEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberEnumAddressRequirement =
  typeof IncomingPhoneNumberEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberEnumVoiceReceiveMode =
  typeof IncomingPhoneNumberEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberEnumEmergencyStatusSchema = type("'Active' | 'Inactive'").describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberEnumEmergencyStatus =
  typeof IncomingPhoneNumberEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberEnumEmergencyAddressStatus =
  typeof IncomingPhoneNumberEnumEmergencyAddressStatusSchema.infer

export const ApiV2010AccountIncomingPhoneNumberSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource.',
    ),
  'address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Address resource associated with the phone number.'),
  'address_requirements?': IncomingPhoneNumberEnumAddressRequirementSchema,
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session.',
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'identity_sid?': type(
    type('string')
      .and(/^RI[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    ),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'origin?': type('string | null').describe(
    "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
  ),
  'sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique string that that we created to identify this IncomingPhoneNumber resource.',
    ),
  'sms_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    ),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives an incoming SMS message.',
  ),
  'status_callback?': type('string.url | null').describe(
    'The URL we call using the `status_callback_method` to send status information to your application.',
  ),
  'status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
  ),
  'trunk_sid?': type(
    type('string')
      .and(/^TK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'voice_receive_mode?': IncomingPhoneNumberEnumVoiceReceiveModeSchema,
  'voice_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    ),
  'voice_caller_id_lookup?': type('boolean | null').describe(
    "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
  ),
  'emergency_status?': IncomingPhoneNumberEnumEmergencyStatusSchema,
  'emergency_address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    ),
  'emergency_address_status?': IncomingPhoneNumberEnumEmergencyAddressStatusSchema,
  'bundle_sid?': type(
    type('string')
      .and(/^BU[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    ),
  'status?': 'string | null',
  'type?': type('string | null').describe('The phone number type.'),
})

export type ApiV2010AccountIncomingPhoneNumber =
  typeof ApiV2010AccountIncomingPhoneNumberSchema.infer

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema = type({
  'sid?': type(
    type('string')
      .and(/^XE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    ),
  'resource_sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Phone Number to which the Add-on is assigned.'),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'description?': type('string | null').describe(
    'A short description of the functionality that the Add-on provides.',
  ),
  'configuration?': type('unknown | null').describe(
    'A JSON string that represents the current configuration of this Add-on installation.',
  ),
  'unique_name?': type('string | null').describe(
    "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe('A list of related resources identified by their relative URIs.'),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema.infer

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  type({
    'sid?': type(
      type('string')
        .and(/^XF[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe('The unique string that that we created to identify the resource.'),
    'account_sid?': type(
      type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      ),
    'resource_sid?': type(
      type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe('The SID of the Phone Number to which the Add-on is assigned.'),
    'assigned_add_on_sid?': type(
      type('string')
        .and(/^XE[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe('The SID that uniquely identifies the assigned Add-on installation.'),
    'friendly_name?': type('string | null').describe(
      'The string that you assigned to describe the resource.',
    ),
    'product_name?': type('string | null').describe(
      'A string that you assigned to describe the Product this Extension is used within.',
    ),
    'unique_name?': type('string | null').describe(
      "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
    ),
    'uri?': type('string | null').describe(
      'The URI of the resource, relative to `https://api.twilio.com`.',
    ),
    'enabled?': type('boolean | null').describe('Whether the Extension will be invoked.'),
  })

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema.infer

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberLocalEnumAddressRequirement =
  typeof IncomingPhoneNumberLocalEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberLocalEnumVoiceReceiveMode =
  typeof IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = type(
  "'Active' | 'Inactive'",
).describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberLocalEnumEmergencyStatus =
  typeof IncomingPhoneNumberLocalEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberLocalEnumEmergencyAddressStatus =
  typeof IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema.infer

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    ),
  'address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Address resource associated with the phone number.'),
  'address_requirements?': IncomingPhoneNumberLocalEnumAddressRequirementSchema,
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session.',
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'identity_sid?': type(
    type('string')
      .and(/^RI[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    ),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'origin?': type('string | null').describe(
    "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
  ),
  'sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the resource.'),
  'sms_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    ),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives an incoming SMS message.',
  ),
  'status_callback?': type('string.url | null').describe(
    'The URL we call using the `status_callback_method` to send status information to your application.',
  ),
  'status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
  ),
  'trunk_sid?': type(
    type('string')
      .and(/^TK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'voice_receive_mode?': IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
  'voice_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    ),
  'voice_caller_id_lookup?': type('boolean | null').describe(
    "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
  ),
  'emergency_status?': IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
  'emergency_address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    ),
  'emergency_address_status?': IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema,
  'bundle_sid?': type(
    type('string')
      .and(/^BU[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    ),
  'status?': 'string | null',
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema.infer

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberMobileEnumAddressRequirement =
  typeof IncomingPhoneNumberMobileEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberMobileEnumVoiceReceiveMode =
  typeof IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = type(
  "'Active' | 'Inactive'",
).describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberMobileEnumEmergencyStatus =
  typeof IncomingPhoneNumberMobileEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberMobileEnumEmergencyAddressStatus =
  typeof IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema.infer

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    ),
  'address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Address resource associated with the phone number.'),
  'address_requirements?': IncomingPhoneNumberMobileEnumAddressRequirementSchema,
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session.',
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'identity_sid?': type(
    type('string')
      .and(/^RI[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    ),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'origin?': type('string | null').describe(
    "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
  ),
  'sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the resource.'),
  'sms_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    ),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives an incoming SMS message.',
  ),
  'status_callback?': type('string.url | null').describe(
    'The URL we call using the `status_callback_method` to send status information to your application.',
  ),
  'status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
  ),
  'trunk_sid?': type(
    type('string')
      .and(/^TK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'voice_receive_mode?': IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
  'voice_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    ),
  'voice_caller_id_lookup?': type('boolean | null').describe(
    "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
  ),
  'emergency_status?': IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
  'emergency_address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    ),
  'emergency_address_status?': IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema,
  'bundle_sid?': type(
    type('string')
      .and(/^BU[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    ),
  'status?': 'string | null',
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema.infer

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberTollFreeEnumAddressRequirement =
  typeof IncomingPhoneNumberTollFreeEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveMode =
  typeof IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = type(
  "'Active' | 'Inactive'",
).describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberTollFreeEnumEmergencyStatus =
  typeof IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus =
  typeof IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema.infer

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    ),
  'address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Address resource associated with the phone number.'),
  'address_requirements?': IncomingPhoneNumberTollFreeEnumAddressRequirementSchema,
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session.',
  ),
  'beta?': type('boolean | null').describe(
    'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
  ),
  'capabilities?': type(
    type({ 'mms?': 'boolean', 'sms?': 'boolean', 'voice?': 'boolean', 'fax?': 'boolean' }),
  )
    .or('null')
    .describe(
      'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'identity_sid?': type(
    type('string')
      .and(/^RI[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    ),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'origin?': type('string | null').describe(
    "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
  ),
  'sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the resource.'),
  'sms_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    ),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives an incoming SMS message.',
  ),
  'status_callback?': type('string.url | null').describe(
    'The URL we call using the `status_callback_method` to send status information to your application.',
  ),
  'status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
  ),
  'trunk_sid?': type(
    type('string')
      .and(/^TK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'voice_receive_mode?': IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
  'voice_application_sid?': type(
    type('string')
      .and(/^AP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    ),
  'voice_caller_id_lookup?': type('boolean | null').describe(
    "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
  ),
  'emergency_status?': IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
  'emergency_address_sid?': type(
    type('string')
      .and(/^AD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    ),
  'emergency_address_status?': IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema,
  'bundle_sid?': type(
    type('string')
      .and(/^BU[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    ),
  'status?': 'string | null',
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema.infer

export const ApiV2010AccountKeySchema = type({
  'sid?': type(
    type('string')
      .and(/^SK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Key resource.'),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
})

export type ApiV2010AccountKey = typeof ApiV2010AccountKeySchema.infer

export const ApiV2010AccountMessageMediaSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource.',
    ),
  'content_type?': type('string | null').describe(
    'The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'parent_sid?': type(
    type('string')
      .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Message resource that is associated with this Media resource.'),
  'sid?': type(
    type('string')
      .and(/^ME[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that identifies this Media resource.'),
  'uri?': type('string | null').describe(
    'The URI of this Media resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountMessageMedia = typeof ApiV2010AccountMessageMediaSchema.infer

export const ApiV2010AccountQueueMemberSchema = type({
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with.',
    ),
  'date_enqueued?': type('string | null').describe(
    'The date that the member was enqueued, given in RFC 2822 format.',
  ),
  'position?': type('number.integer').describe("This member's current position in the queue."),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'wait_time?': type('number.integer').describe(
    'The number of seconds the member has been in the queue.',
  ),
  'queue_sid?': type(
    type('string')
      .and(/^QU[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Queue the member is in.'),
})

export type ApiV2010AccountQueueMember = typeof ApiV2010AccountQueueMemberSchema.infer

export const MessageEnumDirectionSchema = type(
  "'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply'",
).describe(
  'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
)

export type MessageEnumDirection = typeof MessageEnumDirectionSchema.infer

export const MessageEnumStatusSchema = type(
  "'queued' | 'sending' | 'sent' | 'failed' | 'delivered' | 'undelivered' | 'receiving' | 'received' | 'accepted' | 'scheduled' | 'read' | 'partially_delivered' | 'canceled'",
).describe(
  'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
)

export type MessageEnumStatus = typeof MessageEnumStatusSchema.infer

export const ApiV2010AccountMessageSchema = type({
  'body?': type('string | null').describe('The text content of the message'),
  'num_segments?': type('string | null').describe(
    "The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned.",
  ),
  'direction?': MessageEnumDirectionSchema,
  'from?': type('string | null').describe(
    "The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.",
  ),
  'to?': type('string | null').describe(
    "The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)",
  ),
  'date_updated?': type('string | null').describe(
    'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated',
  ),
  'price?': type('string | null').describe(
    'The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details.',
  ),
  'error_message?': type('string | null').describe(
    'The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the Message resource, relative to `https://api.twilio.com`.',
  ),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource',
    ),
  'num_media?': type('string | null').describe(
    'The number of media files associated with the Message resource.',
  ),
  'status?': MessageEnumStatusSchema,
  'messaging_service_sid?': type(
    type('string')
      .and(/^MG[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used.',
    ),
  'sid?': type(
    type('string')
      .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique, Twilio-provided string that identifies the Message resource.'),
  'date_sent?': type('string | null').describe(
    'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.',
  ),
  'date_created?': type('string | null').describe(
    'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created',
  ),
  'error_code?': type('number.integer | null').describe(
    'The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
  ),
  'api_version?': type('string | null').describe('The API version used to process the Message'),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs relative to `https://api.twilio.com`',
    ),
})

export type ApiV2010AccountMessage = typeof ApiV2010AccountMessageSchema.infer

export const MessageEnumUpdateStatusSchema = type("'canceled'")

export type MessageEnumUpdateStatus = typeof MessageEnumUpdateStatusSchema.infer

export const MessageEnumContentRetentionSchema = type("'retain' | 'discard'").describe(
  'Determines if the message content can be stored or redacted based on privacy settings',
)

export type MessageEnumContentRetention = typeof MessageEnumContentRetentionSchema.infer

export const MessageEnumAddressRetentionSchema = type("'retain' | 'obfuscate'").describe(
  'Determines if the address can be stored or obfuscated based on privacy settings',
)

export type MessageEnumAddressRetention = typeof MessageEnumAddressRetentionSchema.infer

export const MessageEnumTrafficTypeSchema = type("'free'")

export type MessageEnumTrafficType = typeof MessageEnumTrafficTypeSchema.infer

export const MessageEnumScheduleTypeSchema = type("'fixed'").describe(
  'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
)

export type MessageEnumScheduleType = typeof MessageEnumScheduleTypeSchema.infer

export const MessageEnumRiskCheckSchema = type("'enable' | 'disable'").describe(
  'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
)

export type MessageEnumRiskCheck = typeof MessageEnumRiskCheckSchema.infer

export const MessageFeedbackEnumOutcomeSchema = type("'confirmed' | 'unconfirmed'").describe(
  'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
)

export type MessageFeedbackEnumOutcome = typeof MessageFeedbackEnumOutcomeSchema.infer

export const ApiV2010AccountMessageMessageFeedbackSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource.',
    ),
  'message_sid?': type(
    type('string')
      .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Message resource associated with this MessageFeedback resource.'),
  'outcome?': MessageFeedbackEnumOutcomeSchema,
  'date_created?': type('string | null').describe(
    'The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountMessageMessageFeedback =
  typeof ApiV2010AccountMessageMessageFeedbackSchema.infer

export const ApiV2010AccountNewKeySchema = type({
  'sid?': type(
    type('string')
      .and(/^SK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API.',
    ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'secret?': type('string | null').describe(
    'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
  ),
})

export type ApiV2010AccountNewKey = typeof ApiV2010AccountNewKeySchema.infer

export const ApiV2010AccountNewSigningKeySchema = type({
  'sid?': type(
    type('string')
      .and(/^SK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the NewSigningKey resource.'),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'secret?': type('string | null').describe(
    'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
  ),
})

export type ApiV2010AccountNewSigningKey = typeof ApiV2010AccountNewSigningKeySchema.infer

export const ApiV2010AccountNotificationSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
    ),
  'api_version?': type('string | null').describe(
    "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
  ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'error_code?': type('string | null').describe(
    'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'log?': type('string | null').describe(
    'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
  ),
  'message_date?': type('string | null').describe(
    'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
  ),
  'message_text?': type('string | null').describe('The text of the notification.'),
  'more_info?': type('string.url | null').describe(
    'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'request_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
  ),
  'request_url?': type('string.url | null').describe(
    'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
  ),
  'sid?': type(
    type('string')
      .and(/^NO[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Notification resource.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountNotification = typeof ApiV2010AccountNotificationSchema.infer

export const ApiV2010AccountNotificationInstanceSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
    ),
  'api_version?': type('string | null').describe(
    "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
  ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'error_code?': type('string | null').describe(
    'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'log?': type('string | null').describe(
    'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
  ),
  'message_date?': type('string | null').describe(
    'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
  ),
  'message_text?': type('string | null').describe('The text of the notification.'),
  'more_info?': type('string.url | null').describe(
    'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
  ),
  'request_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
  ),
  'request_url?': type('string.url | null').describe(
    'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
  ),
  'request_variables?': type('string | null').describe(
    'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
  ),
  'response_body?': type('string | null').describe('The HTTP body returned by your server.'),
  'response_headers?': type('string | null').describe('The HTTP headers returned by your server.'),
  'sid?': type(
    type('string')
      .and(/^NO[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Notification resource.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountNotificationInstance =
  typeof ApiV2010AccountNotificationInstanceSchema.infer

export const ApiV2010AccountOutgoingCallerIdSchema = type({
  'sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the OutgoingCallerId resource.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource.',
    ),
  'phone_number?': type('string | null').describe(
    'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountOutgoingCallerId = typeof ApiV2010AccountOutgoingCallerIdSchema.infer

export const ParticipantEnumStatusSchema = type(
  "'queued' | 'connecting' | 'ringing' | 'connected' | 'complete' | 'failed'",
).describe(
  "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
)

export type ParticipantEnumStatus = typeof ParticipantEnumStatusSchema.infer

export const ApiV2010AccountConferenceParticipantSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with.',
    ),
  'label?': type('string | null').describe(
    'The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.',
  ),
  'call_sid_to_coach?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
    ),
  'coaching?': type('boolean | null').describe(
    'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
  ),
  'conference_sid?': type(
    type('string')
      .and(/^CF[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the conference the participant is in.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'end_conference_on_exit?': type('boolean | null').describe(
    'Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves.',
  ),
  'muted?': type('boolean | null').describe(
    'Whether the participant is muted. Can be `true` or `false`.',
  ),
  'hold?': type('boolean | null').describe(
    'Whether the participant is on hold. Can be `true` or `false`.',
  ),
  'start_conference_on_enter?': type('boolean | null').describe(
    'Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
  ),
  'status?': ParticipantEnumStatusSchema,
  'queue_time?': type('string | null').describe(
    "The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.",
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountConferenceParticipant =
  typeof ApiV2010AccountConferenceParticipantSchema.infer

export const ApiV2010AccountCallPaymentsSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF.',
    ),
  'sid?': type(
    type('string')
      .and(/^PK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Payments resource.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountCallPayments = typeof ApiV2010AccountCallPaymentsSchema.infer

export const PaymentsEnumPaymentMethodSchema = type("'credit-card' | 'ach-debit'").describe(
  'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
)

export type PaymentsEnumPaymentMethod = typeof PaymentsEnumPaymentMethodSchema.infer

export const PaymentsEnumBankAccountTypeSchema = type(
  "'consumer-checking' | 'consumer-savings' | 'commercial-checking'",
).describe(
  'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
)

export type PaymentsEnumBankAccountType = typeof PaymentsEnumBankAccountTypeSchema.infer

export const PaymentsEnumTokenTypeSchema = type(
  "'one-time' | 'reusable' | 'payment-method'",
).describe(
  'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
)

export type PaymentsEnumTokenType = typeof PaymentsEnumTokenTypeSchema.infer

export const PaymentsEnumCaptureSchema = type(
  "'payment-card-number' | 'expiration-date' | 'security-code' | 'postal-code' | 'bank-routing-number' | 'bank-account-number' | 'payment-card-number-matcher' | 'expiration-date-matcher' | 'security-code-matcher' | 'postal-code-matcher'",
).describe(
  'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
)

export type PaymentsEnumCapture = typeof PaymentsEnumCaptureSchema.infer

export const PaymentsEnumStatusSchema = type("'complete' | 'cancel'").describe(
  'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
)

export type PaymentsEnumStatus = typeof PaymentsEnumStatusSchema.infer

export const ApiV2010AccountQueueSchema = type({
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'current_size?': type('number.integer').describe('The number of calls currently in the queue.'),
  'friendly_name?': type('string | null').describe(
    'A string that you assigned to describe this resource.',
  ),
  'uri?': type('string | null').describe(
    'The URI of this resource, relative to `https://api.twilio.com`.',
  ),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource.',
    ),
  'average_wait_time?': type('number.integer').describe(
    ' The average wait time in seconds of the members in this queue. This is calculated at the time of the request.',
  ),
  'sid?': type(
    type('string')
      .and(/^QU[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify this Queue resource.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'max_size?': type('number.integer').describe(
    ' The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.',
  ),
})

export type ApiV2010AccountQueue = typeof ApiV2010AccountQueueSchema.infer

export const RealtimeTranscriptionEnumStatusSchema = type("'in-progress' | 'stopped'").describe(
  'The status - one of `stopped`, `in-flight`',
)

export type RealtimeTranscriptionEnumStatus = typeof RealtimeTranscriptionEnumStatusSchema.infer

export const ApiV2010AccountCallRealtimeTranscriptionSchema = type({
  'sid?': type(
    type('string')
      .and(/^GT[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Transcription resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.',
    ),
  'name?': type('string | null').describe(
    'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
  ),
  'status?': RealtimeTranscriptionEnumStatusSchema,
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'uri?': 'string | null',
})

export type ApiV2010AccountCallRealtimeTranscription =
  typeof ApiV2010AccountCallRealtimeTranscriptionSchema.infer

export const RealtimeTranscriptionEnumTrackSchema = type(
  "'inbound_track' | 'outbound_track' | 'both_tracks'",
).describe('One of `inbound_track`, `outbound_track`, `both_tracks`.')

export type RealtimeTranscriptionEnumTrack = typeof RealtimeTranscriptionEnumTrackSchema.infer

export const RealtimeTranscriptionEnumUpdateStatusSchema = type("'stopped'")

export type RealtimeTranscriptionEnumUpdateStatus =
  typeof RealtimeTranscriptionEnumUpdateStatusSchema.infer

export const RecordingEnumStatusSchema = type(
  "'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent' | 'deleted'",
).describe(
  'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
)

export type RecordingEnumStatus = typeof RecordingEnumStatusSchema.infer

export const RecordingEnumSourceSchema = type(
  "'DialVerb' | 'Conference' | 'OutboundAPI' | 'Trunking' | 'RecordVerb' | 'StartCallRecordingAPI' | 'StartConferenceRecordingAPI'",
).describe(
  'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
)

export type RecordingEnumSource = typeof RecordingEnumSourceSchema.infer

export const ApiV2010AccountRecordingSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
    ),
  'api_version?': type('string | null').describe('The API version used during the recording.'),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call.',
    ),
  'conference_sid?': type(
    type('string')
      .and(/^CF[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'start_time?': type('string | null').describe(
    'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'duration?': type('string | null').describe('The length of the recording in seconds.'),
  'sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Recording resource.'),
  'price?': type('string | null').describe(
    'The one-time cost of creating the recording in the `price_unit` currency.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency used in the `price` property. Example: `USD`.',
  ),
  'status?': RecordingEnumStatusSchema,
  'channels?': type('number.integer | null').describe(
    'The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file).',
  ),
  'source?': RecordingEnumSourceSchema,
  'error_code?': type('number.integer | null').describe(
    'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'encryption_details?': type('unknown | null').describe(
    'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe('A list of related resources identified by their relative URIs.'),
  'media_url?': type('string.url | null').describe(
    'The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file.',
  ),
})

export type ApiV2010AccountRecording = typeof ApiV2010AccountRecordingSchema.infer

export const RecordingAddOnResultEnumStatusSchema = type(
  "'canceled' | 'completed' | 'deleted' | 'failed' | 'in-progress' | 'init' | 'processing' | 'queued'",
).describe(
  'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
)

export type RecordingAddOnResultEnumStatus = typeof RecordingAddOnResultEnumStatusSchema.infer

export const ApiV2010AccountRecordingRecordingAddOnResultSchema = type({
  'sid?': type(
    type('string')
      .and(/^XR[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique string that that we created to identify the Recording AddOnResult resource.',
    ),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource.',
    ),
  'status?': RecordingAddOnResultEnumStatusSchema,
  'add_on_sid?': type(
    type('string')
      .and(/^XB[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Add-on to which the result belongs.'),
  'add_on_configuration_sid?': type(
    type('string')
      .and(/^XE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Add-on configuration.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_completed?': type('string | null').describe(
    'The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'reference_sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the recording to which the AddOnResult resource belongs.'),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe('A list of related resources identified by their relative URIs.'),
})

export type ApiV2010AccountRecordingRecordingAddOnResult =
  typeof ApiV2010AccountRecordingRecordingAddOnResultSchema.infer

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema = type({
  'sid?': type(
    type('string')
      .and(/^XH[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique string that that we created to identify the Recording AddOnResult Payload resource.',
    ),
  'add_on_result_sid?': type(
    type('string')
      .and(/^XR[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the AddOnResult to which the payload belongs.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource.',
    ),
  'label?': type('string | null').describe(
    'The string provided by the vendor that describes the payload.',
  ),
  'add_on_sid?': type(
    type('string')
      .and(/^XB[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Add-on to which the result belongs.'),
  'add_on_configuration_sid?': type(
    type('string')
      .and(/^XE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Add-on configuration.'),
  'content_type?': type('string | null').describe('The MIME type of the payload.'),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'reference_sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the recording to which the AddOnResult resource that contains the payload belongs.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe('A list of related resources identified by their relative URIs.'),
})

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload =
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema.infer

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  type({
    'redirect_to?': type('string.url | null').describe(
      'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
    ),
  })

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData =
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema.infer

export const RecordingTranscriptionEnumStatusSchema = type(
  "'in-progress' | 'completed' | 'failed'",
).describe('The status of the transcription. Can be: `in-progress`, `completed`, `failed`.')

export type RecordingTranscriptionEnumStatus = typeof RecordingTranscriptionEnumStatusSchema.infer

export const ApiV2010AccountRecordingRecordingTranscriptionSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
    ),
  'api_version?': type('string | null').describe(
    'The API version used to create the transcription.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'duration?': type('string | null').describe('The duration of the transcribed audio in seconds.'),
  'price?': type('number | null').describe(
    'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
  ),
  'recording_sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
    ),
  'sid?': type(
    type('string')
      .and(/^TR[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Transcription resource.'),
  'status?': RecordingTranscriptionEnumStatusSchema,
  'transcription_text?': type('string | null').describe('The text content of the transcription.'),
  'type?': type('string | null').describe('The transcription type.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountRecordingRecordingTranscription =
  typeof ApiV2010AccountRecordingRecordingTranscriptionSchema.infer

export const ApiV2010AccountShortCodeSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource.',
    ),
  'api_version?': type('string | null').describe(
    'The API version used to start a new TwiML session when an SMS message is sent to this short code.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code.',
  ),
  'short_code?': type('string | null').describe('The short code. e.g., 894546.'),
  'sid?': type(
    type('string')
      .and(/^SC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify this ShortCode resource.'),
  'sms_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'sms_fallback_url?': type('string.url | null').describe(
    'The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
  ),
  'sms_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`.',
  ),
  'sms_url?': type('string.url | null').describe(
    'The URL we call when receiving an incoming SMS message to this short code.',
  ),
  'uri?': type('string | null').describe(
    'The URI of this resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountShortCode = typeof ApiV2010AccountShortCodeSchema.infer

export const ApiV2010AccountSigningKeySchema = type({
  'sid?': type(
    type('string')
      .and(/^SK[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  ).or('null'),
  'friendly_name?': 'string | null',
  'date_created?': 'string | null',
  'date_updated?': 'string | null',
})

export type ApiV2010AccountSigningKey = typeof ApiV2010AccountSigningKeySchema.infer

export const ApiV2010AccountSipSchema = type({})

export type ApiV2010AccountSip = typeof ApiV2010AccountSipSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSchema = type({})

export type ApiV2010AccountSipSipDomainSipAuth =
  typeof ApiV2010AccountSipSipDomainSipAuthSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = type({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCalls =
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
  type({
    'account_sid?': type(
      type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
      ),
    'date_created?': type('string | null').describe(
      'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    ),
    'date_updated?': type('string | null').describe(
      'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    ),
    'friendly_name?': type('string | null').describe(
      'The string that you assigned to describe the resource.',
    ),
    'sid?': type(
      type('string')
        .and(/^CL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The unique string that that we created to identify the CredentialListMapping resource.',
      ),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping =
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  type({
    'account_sid?': type(
      type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource.',
      ),
    'date_created?': type('string | null').describe(
      'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    ),
    'date_updated?': type('string | null').describe(
      'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    ),
    'friendly_name?': type('string | null').describe(
      'The string that you assigned to describe the resource.',
    ),
    'sid?': type(
      type('string')
        .and(/^AL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The unique string that that we created to identify the IpAccessControlListMapping resource.',
      ),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping =
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = type({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrations =
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
  type({
    'account_sid?': type(
      type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
      ),
    'date_created?': type('string | null').describe(
      'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    ),
    'date_updated?': type('string | null').describe(
      'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    ),
    'friendly_name?': type('string | null').describe(
      'The string that you assigned to describe the resource.',
    ),
    'sid?': type(
      type('string')
        .and(/^CL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    )
      .or('null')
      .describe(
        'The unique string that that we created to identify the CredentialListMapping resource.',
      ),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping =
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema.infer

export const ApiV2010AccountSipSipCredentialListSipCredentialSchema = type({
  'sid?': type(
    type('string')
      .and(/^CR[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique id of the Account that is responsible for this resource.'),
  'credential_list_sid?': type(
    type('string')
      .and(/^CL[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique id that identifies the credential list that includes this credential.'),
  'username?': type('string | null').describe('The username for this credential.'),
  'date_created?': type('string | null').describe(
    'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`',
  ),
})

export type ApiV2010AccountSipSipCredentialListSipCredential =
  typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema.infer

export const ApiV2010AccountSipSipCredentialListSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
    ),
  'date_created?': type('string | null').describe(
    'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
  ),
  'sid?': type(
    type('string')
      .and(/^CL[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe('A list of credentials associated with this credential list.'),
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountSipSipCredentialList =
  typeof ApiV2010AccountSipSipCredentialListSchema.infer

export const ApiV2010AccountSipSipDomainSipCredentialListMappingSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique id of the Account that is responsible for this resource.'),
  'date_created?': type('string | null').describe(
    'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'domain_sid?': type(
    type('string')
      .and(/^SD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that is created to identify the SipDomain resource.'),
  'friendly_name?': type('string | null').describe(
    'A human readable descriptive text for this resource, up to 64 characters long.',
  ),
  'sid?': type(
    type('string')
      .and(/^CL[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`',
  ),
})

export type ApiV2010AccountSipSipDomainSipCredentialListMapping =
  typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema.infer

export const ApiV2010AccountSipSipDomainSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource.',
    ),
  'api_version?': type('string | null').describe('The API version used to process the call.'),
  'auth_type?': type('string | null').describe(
    'The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'domain_name?': type('string | null').describe(
    'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'sid?': type(
    type('string')
      .and(/^SD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the SipDomain resource.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'voice_fallback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
  ),
  'voice_fallback_url?': type('string.url | null').describe(
    'The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`.',
  ),
  'voice_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
  ),
  'voice_status_callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`.',
  ),
  'voice_status_callback_url?': type('string.url | null').describe(
    'The URL that we call to pass status parameters (such as call ended) to your application.',
  ),
  'voice_url?': type('string.url | null').describe(
    'The URL we call using the `voice_method` when the domain receives a call.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.',
    ),
  'sip_registration?': type('boolean | null').describe(
    'Whether to allow SIP Endpoints to register with the domain to receive calls.',
  ),
  'emergency_calling_enabled?': type('boolean | null').describe(
    'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
  ),
  'secure?': type('boolean | null').describe(
    'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
  ),
  'byoc_trunk_sid?': type(
    type('string')
      .and(/^BY[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
    ),
  'emergency_caller_sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
    ),
})

export type ApiV2010AccountSipSipDomain = typeof ApiV2010AccountSipSipDomainSchema.infer

export const ApiV2010AccountSipSipIpAccessControlListSchema = type({
  'sid?': type(
    type('string')
      .and(/^AL[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
    ),
  'friendly_name?': type('string | null').describe(
    'A human readable descriptive text, up to 255 characters long.',
  ),
  'date_created?': type('string | null').describe(
    'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of the IpAddress resources associated with this IP access control list resource.',
    ),
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`',
  ),
})

export type ApiV2010AccountSipSipIpAccessControlList =
  typeof ApiV2010AccountSipSipIpAccessControlListSchema.infer

export const ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique id of the Account that is responsible for this resource.'),
  'date_created?': type('string | null').describe(
    'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'domain_sid?': type(
    type('string')
      .and(/^SD[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that is created to identify the SipDomain resource.'),
  'friendly_name?': type('string | null').describe(
    'A human readable descriptive text for this resource, up to 64 characters long.',
  ),
  'sid?': type(
    type('string')
      .and(/^AL[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`',
  ),
})

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMapping =
  typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema.infer

export const ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema = type({
  'sid?': type(
    type('string')
      .and(/^IP[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('A 34 character string that uniquely identifies this resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique id of the Account that is responsible for this resource.'),
  'friendly_name?': type('string | null').describe(
    'A human readable descriptive text for this resource, up to 255 characters long.',
  ),
  'ip_address?': type('string | null').describe(
    'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
  ),
  'cidr_prefix_length?': type('number.integer').describe(
    'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
  ),
  'ip_access_control_list_sid?': type(
    type('string')
      .and(/^AL[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique id of the IpAccessControlList resource that includes this resource.'),
  'date_created?': type('string | null').describe(
    'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI for this resource, relative to `https://api.twilio.com`',
  ),
})

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddress =
  typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema.infer

export const SiprecEnumStatusSchema = type("'in-progress' | 'stopped'").describe(
  'The status - one of `stopped`, `in-progress`',
)

export type SiprecEnumStatus = typeof SiprecEnumStatusSchema.infer

export const ApiV2010AccountCallSiprecSchema = type({
  'sid?': type(
    type('string')
      .and(/^SR[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Siprec resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.',
    ),
  'name?': type('string | null').describe(
    'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
  ),
  'status?': SiprecEnumStatusSchema,
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountCallSiprec = typeof ApiV2010AccountCallSiprecSchema.infer

export const SiprecEnumTrackSchema = type(
  "'inbound_track' | 'outbound_track' | 'both_tracks'",
).describe('One of `inbound_track`, `outbound_track`, `both_tracks`.')

export type SiprecEnumTrack = typeof SiprecEnumTrackSchema.infer

export const SiprecEnumUpdateStatusSchema = type("'stopped'")

export type SiprecEnumUpdateStatus = typeof SiprecEnumUpdateStatusSchema.infer

export const SmsFeedbackEnumOutcomeSchema = type(
  "'confirmed' | 'unconfirmed' | 'received' | 'not-received' | 'delayed'",
)

export type SmsFeedbackEnumOutcome = typeof SmsFeedbackEnumOutcomeSchema.infer

export const SmsMessageEnumStatusSchema = type(
  "'queued' | 'sending' | 'sent' | 'failed' | 'delivered' | 'undelivered' | 'receiving' | 'received' | 'accepted' | 'scheduled' | 'read' | 'partially_delivered' | 'canceled'",
)

export type SmsMessageEnumStatus = typeof SmsMessageEnumStatusSchema.infer

export const SmsMessageEnumUpdateStatusSchema = type("'canceled'")

export type SmsMessageEnumUpdateStatus = typeof SmsMessageEnumUpdateStatusSchema.infer

export const SmsMessageEnumDirectionSchema = type(
  "'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply'",
)

export type SmsMessageEnumDirection = typeof SmsMessageEnumDirectionSchema.infer

export const StreamEnumStatusSchema = type("'in-progress' | 'stopped'").describe(
  'The status of the Stream. Possible values are `stopped` and `in-progress`.',
)

export type StreamEnumStatus = typeof StreamEnumStatusSchema.infer

export const ApiV2010AccountCallStreamSchema = type({
  'sid?': type(
    type('string')
      .and(/^MZ[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the Stream resource.'),
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.',
    ),
  'name?': type('string | null').describe(
    'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
  ),
  'status?': StreamEnumStatusSchema,
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountCallStream = typeof ApiV2010AccountCallStreamSchema.infer

export const StreamEnumTrackSchema = type(
  "'inbound_track' | 'outbound_track' | 'both_tracks'",
).describe(
  'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
)

export type StreamEnumTrack = typeof StreamEnumTrackSchema.infer

export const StreamEnumUpdateStatusSchema = type("'stopped'")

export type StreamEnumUpdateStatus = typeof StreamEnumUpdateStatusSchema.infer

export const ApiV2010AccountTokenSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource.',
    ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'ice_servers?': type(
    type(
      type({ 'credential?': 'string', 'username?': 'string', 'url?': 'string', 'urls?': 'string' }),
    ).array(),
  )
    .or('null')
    .describe('An array representing the ephemeral credentials and the STUN and TURN server URIs.'),
  'password?': type('string | null').describe(
    'The temporary password that the username will use when authenticating with Twilio.',
  ),
  'ttl?': type('string | null').describe(
    'The duration in seconds for which the username and password are valid.',
  ),
  'username?': type('string | null').describe(
    'The temporary username that uniquely identifies a Token.',
  ),
})

export type ApiV2010AccountToken = typeof ApiV2010AccountTokenSchema.infer

export const TranscriptionEnumStatusSchema = type(
  "'in-progress' | 'completed' | 'failed'",
).describe('The status of the transcription. Can be: `in-progress`, `completed`, `failed`.')

export type TranscriptionEnumStatus = typeof TranscriptionEnumStatusSchema.infer

export const ApiV2010AccountTranscriptionSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
    ),
  'api_version?': type('string | null').describe(
    'The API version used to create the transcription.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'duration?': type('string | null').describe('The duration of the transcribed audio in seconds.'),
  'price?': type('number | null').describe(
    'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
  ),
  'recording_sid?': type(
    type('string')
      .and(/^RE[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
    ),
  'sid?': type(
    type('string')
      .and(/^TR[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the Transcription resource.'),
  'status?': TranscriptionEnumStatusSchema,
  'transcription_text?': type('string | null').describe('The text content of the transcription.'),
  'type?': type('string | null').describe('The transcription type. Can only be: `fast`.'),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountTranscription = typeof ApiV2010AccountTranscriptionSchema.infer

export const ApiV2010AccountUsageSchema = type({})

export type ApiV2010AccountUsage = typeof ApiV2010AccountUsageSchema.infer

export const ApiV2010AccountUsageUsageRecordSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecord = typeof ApiV2010AccountUsageUsageRecordSchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTime =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordDailySchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordDaily =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordDailySchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonth =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthly =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonth =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordToday =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordYearly =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema.infer

export const ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'as_of?': type('string | null').describe(
    'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
  ),
  'category?': type('string | null').describe(
    'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'count?': type('string | null').describe(
    'The number of usage events, such as the number of calls.',
  ),
  'count_unit?': type('string | null').describe(
    'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
  ),
  'description?': type('string | null').describe(
    'A plain-language description of the usage category.',
  ),
  'end_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'price?': type('number | null').describe(
    'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
  ),
  'price_unit?': type('string | null').describe(
    'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
  ),
  'start_date?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
    ),
  )
    .or('null')
    .describe(
      'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    ),
  'subresource_uris?': type(type({}))
    .or('null')
    .describe(
      'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage?': type('string | null').describe(
    'The amount used to bill usage and measured in units described in `usage_unit`.',
  ),
  'usage_unit?': type('string | null').describe(
    'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterday =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema.infer

export const UsageTriggerEnumRecurringSchema = type(
  "'daily' | 'monthly' | 'yearly' | 'alltime'",
).describe(
  'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
)

export type UsageTriggerEnumRecurring = typeof UsageTriggerEnumRecurringSchema.infer

export const UsageTriggerEnumTriggerFieldSchema = type("'count' | 'usage' | 'price'").describe(
  'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
)

export type UsageTriggerEnumTriggerField = typeof UsageTriggerEnumTriggerFieldSchema.infer

export const ApiV2010AccountUsageUsageTriggerSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.',
    ),
  'api_version?': type('string | null').describe('The API version used to create the resource.'),
  'callback_method?': type("'GET' | 'POST' | null").describe(
    'The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.',
  ),
  'callback_url?': type('string.url | null').describe(
    'The URL we call using the `callback_method` when the trigger fires.',
  ),
  'current_value?': type('string | null').describe(
    'The current value of the field the trigger is watching.',
  ),
  'date_created?': type('string | null').describe(
    'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_fired?': type('string | null').describe(
    'The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'date_updated?': type('string | null').describe(
    'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
  ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the trigger.',
  ),
  'recurring?': UsageTriggerEnumRecurringSchema,
  'sid?': type(
    type('string')
      .and(/^UT[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The unique string that that we created to identify the UsageTrigger resource.'),
  'trigger_by?': UsageTriggerEnumTriggerFieldSchema,
  'trigger_value?': type('string | null').describe(
    'The value at which the trigger will fire.  Must be a positive, numeric value.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the resource, relative to `https://api.twilio.com`.',
  ),
  'usage_category?': type('string | null').describe(
    'The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
  ),
  'usage_record_uri?': type('string | null').describe(
    'The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountUsageUsageTrigger = typeof ApiV2010AccountUsageUsageTriggerSchema.infer

export const ApiV2010AccountCallUserDefinedMessageSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with.',
    ),
  'sid?': type(
    type('string')
      .and(/^KX[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID that uniquely identifies this User Defined Message.'),
  'date_created?': type('string | null').describe(
    'The date that this User Defined Message was created, given in RFC 2822 format.',
  ),
})

export type ApiV2010AccountCallUserDefinedMessage =
  typeof ApiV2010AccountCallUserDefinedMessageSchema.infer

export const ApiV2010AccountCallUserDefinedMessageSubscriptionSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.',
    ),
  'sid?': type(
    type('string')
      .and(/^ZY[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID that uniquely identifies this User Defined Message Subscription.'),
  'date_created?': type('string | null').describe(
    'The date that this User Defined Message Subscription was created, given in RFC 2822 format.',
  ),
  'uri?': type('string | null').describe(
    'The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.',
  ),
})

export type ApiV2010AccountCallUserDefinedMessageSubscription =
  typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema.infer

export const ApiV2010AccountValidationRequestSchema = type({
  'account_sid?': type(
    type('string')
      .and(/^AC[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID.',
    ),
  'call_sid?': type(
    type('string')
      .and(/^CA[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe(
      'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with.',
    ),
  'friendly_name?': type('string | null').describe(
    'The string that you assigned to describe the resource.',
  ),
  'phone_number?': type('string | null').describe(
    'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
  ),
  'validation_code?': type('string | null').describe(
    'The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called.',
  ),
})

export type ApiV2010AccountValidationRequest = typeof ApiV2010AccountValidationRequestSchema.infer

export const ApiV2010AccountOutgoingCallerIdSmsVerificationSchema = type({
  'phone_number?': type('string | null').describe(
    'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
  ),
  'verification_sid?': type('string | null').describe(
    'The SID that uniquely identifies the verification.',
  ),
  'send_code_attempts?': type(
    type(
      type({
        'attempt_sid?': type('string').describe('The SID of the verification attempt.'),
        'time?': type('string').describe('The date and time of the attempt in ISO 8601 format.'),
      }),
    ).array(),
  )
    .or('null')
    .describe(
      'An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID.',
    ),
})

export type ApiV2010AccountOutgoingCallerIdSmsVerification =
  typeof ApiV2010AccountOutgoingCallerIdSmsVerificationSchema.infer

export const ApiV2010AccountOutgoingCallerIdVerificationCheckSchema = type({
  'phone_number?': type('string | null').describe(
    'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
  ),
  'verification_sid?': type('string | null').describe(
    'The SID that uniquely identifies the verification.',
  ),
  'status?': type('string | null').describe(
    'The status of the verification. Can be: `pending`, `approved`, or `failed`.',
  ),
  'caller_id_sid?': type(
    type('string')
      .and(/^PN[0-9a-fA-F]{32}$/)
      .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
  )
    .or('null')
    .describe('The SID of the OutgoingCallerId resource created when verification is approved.'),
})

export type ApiV2010AccountOutgoingCallerIdVerificationCheck =
  typeof ApiV2010AccountOutgoingCallerIdVerificationCheckSchema.infer

export const AccountSidAuthTokenSecurityScheme = { scheme: 'basic', type: 'http' }

export const get20100401AccountsJsonHandler = defineHandler({
  query: {
    '~standard': type({
      'FriendlyName?': 'string',
      'Status?': AccountEnumStatusSchema,
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'accounts?': type(ApiV2010AccountSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsJsonHandler = defineHandler({
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSchema['~standard'] },
})

export const get20100401AccountsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      Sid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSchema['~standard'] },
})

export const post20100401AccountsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      Sid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'Update the human-readable description of this Account',
      ),
      'Status?': AccountEnumStatusSchema,
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSchema['~standard'] },
})

export const get20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'CustomerName?': 'string',
      'FriendlyName?': 'string',
      'EmergencyEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'IsoCountry?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'addresses?': type(ApiV2010AccountAddressSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      CustomerName: type('string').describe('The name to associate with the new address.'),
      Street: type('string').describe('The number and street address of the new address.'),
      City: type('string').describe('The city of the new address.'),
      Region: type('string').describe('The state or region of the new address.'),
      PostalCode: type('string').describe('The postal code of the new address.'),
      IsoCountry: type('string').describe('The ISO country code of the new address.'),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
      ),
      'EmergencyEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to enable emergency calling on the new address. Can be: `true` or `false`.',
        ),
      'AutoCorrectAddress?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
        ),
      'StreetSecondary?': type('string').describe(
        'The additional number and street address of the address.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountAddressSchema['~standard'] },
})

export const get20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountAddressSchema['~standard'] },
})

export const post20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
      ),
      'CustomerName?': type('string').describe('The name to associate with the address.'),
      'Street?': type('string').describe('The number and street address of the address.'),
      'City?': type('string').describe('The city of the address.'),
      'Region?': type('string').describe('The state or region of the address.'),
      'PostalCode?': type('string').describe('The postal code of the address.'),
      'EmergencyEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe('Whether to enable emergency calling on the address. Can be: `true` or `false`.'),
      'AutoCorrectAddress?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
        ),
      'StreetSecondary?': type('string').describe(
        'The additional number and street address of the address.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountAddressSchema['~standard'] },
})

export const delete20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'FriendlyName?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'applications?': type(ApiV2010AccountApplicationSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'ApiVersion?': type('string').describe(
        "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version.",
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL we should call when the phone number assigned to this application receives a call.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
      ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
        ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the phone number receives an incoming SMS message.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
      ),
      'SmsStatusCallback?': type('string.url').describe(
        'The URL we should call using a POST method to send status information about SMS messages sent by the application.',
      ),
      'MessageStatusCallback?': type('string.url').describe(
        'The URL we should call using a POST method to send message status information to your application.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the new application. It can be up to 64 characters long.',
      ),
      'PublicApplicationConnectEnabled?': type(
        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
      )
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountApplicationSchema['~standard'] },
})

export const get20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountApplicationSchema['~standard'] },
})

export const post20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
      'ApiVersion?': type('string').describe(
        "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version.",
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL we should call when the phone number assigned to this application receives a call.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
      ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
        ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the phone number receives an incoming SMS message.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
      ),
      'SmsStatusCallback?': type('string.url').describe(
        'Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility.',
      ),
      'MessageStatusCallback?': type('string.url').describe(
        'The URL we should call using a POST method to send message status information to your application.',
      ),
      'PublicApplicationConnectEnabled?': type(
        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
      )
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountApplicationSchema['~standard'] },
})

export const delete20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConnectAppSid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountAuthorizedConnectAppSchema['~standard'] },
  })

export const get20100401AccountsAccountSidAuthorizedConnectAppsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'authorized_connect_apps?': type(ApiV2010AccountAuthorizedConnectAppSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'countries?': type(ApiV2010AccountAvailablePhoneNumberCountrySchema).array(),
      'uri?': 'string.url | null',
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountAvailablePhoneNumberCountrySchema['~standard'] },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      })['~standard'],
    },
    query: {
      '~standard': type({
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': 'string',
        'SmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'MmsEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'VoiceEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'ExcludeAllAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeLocalAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'ExcludeForeignAddressRequired?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidBalanceJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountBalanceSchema['~standard'] },
})

export const get20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'To?': 'string',
      'From?': 'string',
      'ParentCallSid?': type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      'Status?': CallEnumStatusSchema,
      'StartTime?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'StartTime<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'StartTime>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'EndTime?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'EndTime<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'EndTime>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'calls?': type(ApiV2010AccountCallSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      To: type('string').describe('The phone number, SIP address, or client identifier to call.'),
      From: type('string').describe(
        'The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number.',
      ),
      'Method?': type("'GET' | 'POST'").describe(
        "The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.",
      ),
      'FallbackUrl?': type('string.url').describe(
        'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'FallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
      ),
      'StatusCallbackEvent?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]')
        .describe(
          'The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored.',
        ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'SendDigits?': type('string').describe(
        "The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored.",
      ),
      'Timeout?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is `60` seconds and the maximum is `600` seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as `15` seconds, to hang up before reaching an answering machine or voicemail.',
        ),
      'Record?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to record the call. Can be `true` to record the phone call, or `false` to not. The default is `false`. The `recording_url` is sent to the `status_callback` URL.',
        ),
      'RecordingChannels?': type('string').describe(
        'The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call.',
      ),
      'RecordingStatusCallback?': type('string').describe(
        'The URL that we call when the recording is available to be accessed.',
      ),
      'RecordingStatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
      ),
      'RecordingConfigurationId?': type('string').describe(
        'The identifier of the configuration to be used when creating and processing the recording',
      ),
      'SipAuthUsername?': type('string').describe(
        'The username used to authenticate the caller making a SIP call.',
      ),
      'SipAuthPassword?': type('string').describe(
        'The password required to authenticate the user account specified in `sip_auth_username`.',
      ),
      'MachineDetection?': type('string').describe(
        'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
      ),
      'MachineDetectionTimeout?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
        ),
      'RecordingStatusCallbackEvent?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]')
        .describe(
          'The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space.',
        ),
      'Trim?': type('string').describe(
        'Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
      ),
      'CallerId?': type('string').describe(
        'The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
      ),
      'MachineDetectionSpeechThreshold?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
        ),
      'MachineDetectionSpeechEndThreshold?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
        ),
      'MachineDetectionSilenceTimeout?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
        ),
      'AsyncAmd?': type('string').describe(
        'Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`.',
      ),
      'AsyncAmdStatusCallback?': type('string.url').describe(
        'The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
      ),
      'AsyncAmdStatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
      ),
      'Passports?': type('string').describe(
        'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
      ),
      'Byoc?': type('string')
        .and(/^BY[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
        ),
      'CallReason?': type('string').describe(
        "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
      ),
      'CallToken?': type('string').describe(
        "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
      ),
      'RecordingTrack?': type('string').describe(
        'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
      ),
      'TimeLimit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
        ),
      'ClientNotificationUrl?': type('string.url').describe(
        'The URL that we should use to deliver `push call notification`.',
      ),
      'Url?': type('string.url').describe(
        'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
      ),
      'Twiml?': type('string').describe(
        'TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters.',
      ),
      'ApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Application resource that will handle the call, if the call will be handled by an application.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallSchema['~standard'] },
})

export const get20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'Url?': type('string.url').describe(
        'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
      ),
      'Method?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'Status?': CallEnumUpdateStatusSchema,
      'FallbackUrl?': type('string.url').describe(
        'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'FallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
      ),
      'Twiml?': type('string').describe(
        'TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive',
      ),
      'TimeLimit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallSchema['~standard'] },
})

export const delete20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidCallsCallSidEventsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'events?': type(ApiV2010AccountCallCallEventSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^NO[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallCallNotificationInstanceSchema['~standard'] },
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Log?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'MessageDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'MessageDate<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'MessageDate>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'notifications?': type(ApiV2010AccountCallCallNotificationSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'DateCreated?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateCreated<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateCreated>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'recordings?': type(ApiV2010AccountCallCallRecordingSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'RecordingStatusCallbackEvent?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]')
        .describe(
          'The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.',
        ),
      'RecordingStatusCallback?': type('string.url').describe(
        'The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback).',
      ),
      'RecordingStatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`.',
      ),
      'Trim?': type('string').describe(
        'Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not.',
      ),
      'RecordingChannels?': type('string').describe(
        'The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.',
      ),
      'RecordingTrack?': type('string').describe(
        'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
      ),
      'RecordingConfigurationId?': type('string').describe(
        'The identifier of the configuration to be used when creating and processing the recording',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallCallRecordingSchema['~standard'] },
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^RE[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallCallRecordingSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: 'string',
    })['~standard'],
  },
  form: {
    '~standard': type({
      Status: CallRecordingEnumStatusSchema,
      'PauseBehavior?': type('string').describe(
        'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallCallRecordingSchema['~standard'] },
})

export const delete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^RE[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CF[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountConferenceSchema['~standard'] },
})

export const post20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: 'string',
    })['~standard'],
  },
  form: {
    '~standard': type({
      'Status?': ConferenceEnumUpdateStatusSchema,
      'AnnounceUrl?': type('string.url').describe(
        'The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
      ),
      'AnnounceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountConferenceSchema['~standard'] },
})

export const get20100401AccountsAccountSidConferencesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'DateCreated?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateCreated<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateCreated>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateUpdated?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateUpdated<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'DateUpdated>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'FriendlyName?': 'string',
      'Status?': ConferenceEnumStatusSchema,
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'conferences?': type(ApiV2010AccountConferenceSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'DateCreated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountConferenceConferenceRecordingSchema).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountConferenceConferenceRecordingSchema['~standard'] },
  })

export const post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      })['~standard'],
    },
    form: {
      '~standard': type({
        Status: ConferenceRecordingEnumStatusSchema,
        'PauseBehavior?': type('string').describe(
          'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
        ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountConferenceConferenceRecordingSchema['~standard'] },
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountConnectAppSchema['~standard'] },
})

export const post20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'AuthorizeRedirectUrl?': type('string.url').describe(
        'The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
      ),
      'CompanyName?': type('string').describe('The company name to set for the Connect App.'),
      'DeauthorizeCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method to use when calling `deauthorize_callback_url`.',
      ),
      'DeauthorizeCallbackUrl?': type('string.url').describe(
        'The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.',
      ),
      'Description?': type('string').describe('A description of the Connect App.'),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
      'HomepageUrl?': type('string.url').describe(
        'A public URL where users can obtain more information about this Connect App.',
      ),
      'Permissions?': type('unknown')
        .pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(ConnectAppEnumPermissionSchema).array(),
        )
        .describe(
          'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountConnectAppSchema['~standard'] },
})

export const delete20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidConnectAppsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'connect_apps?': type(ApiV2010AccountConnectAppSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddressSid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'dependent_phone_numbers?': type(ApiV2010AccountAddressDependentPhoneNumberSchema).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountIncomingPhoneNumberSchema['~standard'] },
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'AccountSid?': type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).',
        ),
      'ApiVersion?': type('string').describe(
        'The API version to use for incoming calls made to the phone number. The default is `2010-04-01`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
      ),
      'SmsApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
        ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the phone number receives an incoming SMS message.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
      'EmergencyStatus?': IncomingPhoneNumberEnumEmergencyStatusSchema,
      'EmergencyAddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the emergency address configuration to use for emergency calling from this phone number.',
        ),
      'TrunkSid?': type('string')
        .and(/^TK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        ),
      'VoiceReceiveMode?': IncomingPhoneNumberEnumVoiceReceiveModeSchema,
      'IdentitySid?': type('string')
        .and(/^RI[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations.',
        ),
      'AddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations.',
        ),
      'BundleSid?': type('string')
        .and(/^BU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountIncomingPhoneNumberSchema['~standard'] },
})

export const delete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'FriendlyName?': 'string',
      'PhoneNumber?': 'string',
      'Origin?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'incoming_phone_numbers?': type(ApiV2010AccountIncomingPhoneNumberSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'ApiVersion?': type('string').describe(
        'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number.',
      ),
      'SmsApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
        ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the new phone number receives an incoming SMS message.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
      'EmergencyStatus?': IncomingPhoneNumberEnumEmergencyStatusSchema,
      'EmergencyAddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        ),
      'TrunkSid?': type('string')
        .and(/^TK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        ),
      'IdentitySid?': type('string')
        .and(/^RI[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
        ),
      'AddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        ),
      'VoiceReceiveMode?': IncomingPhoneNumberEnumVoiceReceiveModeSchema,
      'BundleSid?': type('string')
        .and(/^BU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        ),
      'PhoneNumber?': type('string').describe(
        'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      ),
      'AreaCode?': type('string').describe(
        'The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only).',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountIncomingPhoneNumberSchema['~standard'] },
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema['~standard'],
    },
  })

export const delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'assigned_add_ons?': type(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
        ).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        InstalledAddOnSid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe('The SID that identifies the Add-on installation.'),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema['~standard'],
    },
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AssignedAddOnSid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema[
          '~standard'
        ],
    },
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AssignedAddOnSid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'extensions?': type(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'FriendlyName?': 'string',
      'PhoneNumber?': 'string',
      'Origin?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'incoming_phone_numbers?': type(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
      ).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      PhoneNumber: type('string').describe(
        'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      ),
      'ApiVersion?': type('string').describe(
        'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
      ),
      'SmsApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
        ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the new phone number receives an incoming SMS message.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
      'IdentitySid?': type('string')
        .and(/^RI[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
        ),
      'AddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        ),
      'EmergencyStatus?': IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
      'EmergencyAddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        ),
      'TrunkSid?': type('string')
        .and(/^TK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        ),
      'VoiceReceiveMode?': IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
      'BundleSid?': type('string')
        .and(/^BU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        ),
    })['~standard'],
  },
  response: {
    '~standard': ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema['~standard'],
  },
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'FriendlyName?': 'string',
      'PhoneNumber?': 'string',
      'Origin?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'incoming_phone_numbers?': type(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
      ).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      PhoneNumber: type('string').describe(
        'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      ),
      'ApiVersion?': type('string').describe(
        'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number.',
      ),
      'SmsApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application.',
        ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the new phone number receives an incoming SMS message.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
      'IdentitySid?': type('string')
        .and(/^RI[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
        ),
      'AddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        ),
      'EmergencyStatus?': IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
      'EmergencyAddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        ),
      'TrunkSid?': type('string')
        .and(/^TK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        ),
      'VoiceReceiveMode?': IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
      'BundleSid?': type('string')
        .and(/^BU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        ),
    })['~standard'],
  },
  response: {
    '~standard': ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema['~standard'],
  },
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'FriendlyName?': 'string',
      'PhoneNumber?': 'string',
      'Origin?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'incoming_phone_numbers?': type(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
      ).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      PhoneNumber: type('string').describe(
        'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
      ),
      'ApiVersion?': type('string').describe(
        'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
      ),
      'SmsApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when the new phone number receives an incoming SMS message.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        ),
      'VoiceCallerIdLookup?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
        ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
      'IdentitySid?': type('string')
        .and(/^RI[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations.',
        ),
      'AddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
        ),
      'EmergencyStatus?': IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
      'EmergencyAddressSid?': type('string')
        .and(/^AD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
        ),
      'TrunkSid?': type('string')
        .and(/^TK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        ),
      'VoiceReceiveMode?': IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
      'BundleSid?': type('string')
        .and(/^BU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        ),
    })['~standard'],
  },
  response: {
    '~standard': ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema['~standard'],
  },
})

export const get20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountKeySchema['~standard'] },
})

export const post20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountKeySchema['~standard'] },
})

export const delete20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'keys?': type(ApiV2010AccountKeySchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountNewKeySchema['~standard'] },
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      MessageSid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^ME[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountMessageMediaSchema['~standard'] },
})

export const delete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      MessageSid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^ME[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      MessageSid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'DateCreated?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'DateCreated<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'DateCreated>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'media_list?': type(ApiV2010AccountMessageMediaSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      QueueSid: type('string')
        .and(/^QU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: 'string',
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountQueueMemberSchema['~standard'] },
})

export const post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      QueueSid: type('string')
        .and(/^QU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: 'string',
    })['~standard'],
  },
  form: {
    '~standard': type({
      Url: type('string.url').describe('The absolute URL of the Queue resource.'),
      'Method?': type("'GET' | 'POST'").describe(
        'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountQueueMemberSchema['~standard'] },
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      QueueSid: type('string')
        .and(/^QU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'queue_members?': type(ApiV2010AccountQueueMemberSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'To?': 'string',
      'From?': 'string',
      'DateSent?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'DateSent<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'DateSent>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'messages?': type(ApiV2010AccountMessageSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      To: type('string').describe(
        "The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.",
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). ',
      ),
      'ApplicationSid?': type('string')
        .and(/^AP[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          "The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored.",
        ),
      'MaxPrice?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
            ? Number(data)
            : Number.NaN
          return Number.isFinite(value) ? value : ctx.error('a number')
        })
        .describe('[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.'),
      'ProvideFeedback?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`.',
        ),
      'Attempt?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'Total number of attempts made (including this request) to send the message regardless of the provider used',
        ),
      'ValidityPeriod?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          "The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)",
        ),
      'ForceDelivery?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe('Reserved'),
      'ContentRetention?': MessageEnumContentRetentionSchema,
      'AddressRetention?': MessageEnumAddressRetentionSchema,
      'SmartEncoded?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`.',
        ),
      'PersistentAction?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]')
        .describe(
          'Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).',
        ),
      'TrafficType?': MessageEnumTrafficTypeSchema,
      'ShortenUrls?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided.',
        ),
      'ScheduleType?': MessageEnumScheduleTypeSchema,
      'SendAt?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ).describe('The time that Twilio will send the message. Must be in ISO 8601 format.'),
      'SendAsMms?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media.',
        ),
      'ContentVariables?': type('string').describe(
        "For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used.",
      ),
      'MessageIntent?': type('string').describe(
        "Specifies the purpose or use case of the outbound communication. This parameter is used by Twilio's [Traffic Shaping](https://www.twilio.com/docs/messaging/features/traffic-shaping) and [Compliance Toolkit](https://www.twilio.com/docs/messaging/features/compliance-toolkit) products. Possible values include: `otp`, `notifications`, `marketing`, `fraud`, `security`, `customercare`, `delivery`, `education`, `polling`, `announcements`, and `events`.",
      ),
      'RiskCheck?': MessageEnumRiskCheckSchema,
      'From?': type('string').describe(
        "The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.",
      ),
      'FallbackFrom?': type('string').describe(
        'A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message.',
      ),
      'MessagingServiceSid?': type('string')
        .and(/^MG[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          "The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool.",
        ),
      'Body?': type('string').describe(
        'The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).',
      ),
      'MediaUrl?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string.url[]')
        .describe(
          'The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.',
        ),
      'ContentSid?': type('string')
        .and(/^HX[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          "For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources).",
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountMessageSchema['~standard'] },
})

export const get20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountMessageSchema['~standard'] },
})

export const post20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'Body?': type('string').describe(
        "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
      ),
      'Status?': MessageEnumUpdateStatusSchema,
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountMessageSchema['~standard'] },
})

export const delete20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidMessagesMessageSidFeedbackJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      MessageSid: type('string')
        .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: { '~standard': type({ 'Outcome?': MessageFeedbackEnumOutcomeSchema })['~standard'] },
  response: { '~standard': ApiV2010AccountMessageMessageFeedbackSchema['~standard'] },
})

export const get20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'signing_keys?': type(ApiV2010AccountSigningKeySchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountNewSigningKeySchema['~standard'] },
})

export const get20100401AccountsAccountSidNotificationsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^NO[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountNotificationInstanceSchema['~standard'] },
})

export const get20100401AccountsAccountSidNotificationsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Log?': type('string').pipe((data, ctx) => {
        const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'MessageDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'MessageDate<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'MessageDate>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'notifications?': type(ApiV2010AccountNotificationSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountOutgoingCallerIdSchema['~standard'] },
})

export const post20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountOutgoingCallerIdSchema['~standard'] },
})

export const delete20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PhoneNumber?': 'string',
      'FriendlyName?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'outgoing_caller_ids?': type(ApiV2010AccountOutgoingCallerIdSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      PhoneNumber: type('string').describe(
        'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number.',
      ),
      'CallDelay?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The number of seconds to delay before initiating the verification call. Can be an integer between `0` and `60`, inclusive. The default is `0`.',
        ),
      'Extension?': type('string').describe(
        'The digits to dial after connecting the verification call.',
      ),
      'StatusCallback?': type('string.url').describe(
        'The URL we should call using the `status_callback_method` to send status information about the verification process to your application.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountValidationRequestSchema['~standard'] },
})

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountConferenceParticipantSchema['~standard'] },
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      })['~standard'],
    },
    form: {
      '~standard': type({
        'Muted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`.',
          ),
        'Hold?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference.',
          ),
        'HoldUrl?': type('string.url').describe(
          'The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
        ),
        'HoldMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`.',
        ),
        'AnnounceUrl?': type('string.url').describe(
          'The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
        ),
        'AnnounceMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`.',
        ),
        'WaitUrl?': type('string.url').describe(
          "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
        ),
        'WaitMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
        ),
        'BeepOnExit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`.',
          ),
        'EndConferenceOnExit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
          ),
        'Coaching?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
          ),
        'CallSidToCoach?': type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe(
            'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
          ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountConferenceParticipantSchema['~standard'] },
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'Muted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'Hold?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'Coaching?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'participants?': type(ApiV2010AccountConferenceParticipantSchema).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: 'string',
      })['~standard'],
    },
    form: {
      '~standard': type({
        From: type('string').describe(
          'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.',
        ),
        To: type('string').describe(
          'The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified.',
        ),
        'StatusCallback?': type('string.url').describe(
          'The URL we should call using the `status_callback_method` to send status information to your application.',
        ),
        'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`.',
        ),
        'StatusCallbackEvent?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]')
          .describe(
            'The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.',
          ),
        'Label?': type('string').describe(
          'A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.',
        ),
        'Timeout?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds.',
          ),
        'Record?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`.',
          ),
        'Muted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`.',
          ),
        'Beep?': type('string').describe(
          'Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`.',
        ),
        'StartConferenceOnEnter?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
          ),
        'EndConferenceOnExit?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
          ),
        'WaitUrl?': type('string.url').describe(
          "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
        ),
        'WaitMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
        ),
        'EarlyMedia?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`.',
          ),
        'MaxParticipants?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`.',
          ),
        'ConferenceRecord?': type('string').describe(
          'Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`.',
        ),
        'ConferenceTrim?': type('string').describe(
          'Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`.',
        ),
        'ConferenceStatusCallback?': type('string.url').describe(
          'The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored.',
        ),
        'ConferenceStatusCallbackMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
        ),
        'ConferenceStatusCallbackEvent?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]')
          .describe(
            'The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.',
          ),
        'RecordingChannels?': type('string').describe(
          'The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`.',
        ),
        'RecordingStatusCallback?': type('string.url').describe(
          'The URL that we should call using the `recording_status_callback_method` when the recording status changes.',
        ),
        'RecordingStatusCallbackMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
        ),
        'SipAuthUsername?': type('string').describe('The SIP username used for authentication.'),
        'SipAuthPassword?': type('string').describe('The SIP password for authentication.'),
        'Region?': type('string').describe(
          'The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`.',
        ),
        'ConferenceRecordingStatusCallback?': type('string.url').describe(
          'The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available.',
        ),
        'ConferenceRecordingStatusCallbackMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
        ),
        'RecordingStatusCallbackEvent?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]')
          .describe(
            "The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.",
          ),
        'ConferenceRecordingStatusCallbackEvent?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]')
          .describe(
            "The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`",
          ),
        'Coaching?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe(
            'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
          ),
        'CallSidToCoach?': type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe(
            'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
          ),
        'JitterBufferSize?': type('string').describe(
          "Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`.",
        ),
        'Byoc?': type('string')
          .and(/^BY[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe(
            'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
          ),
        'CallerId?': type('string').describe(
          'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint.',
        ),
        'CallReason?': type('string').describe(
          "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
        ),
        'RecordingTrack?': type('string').describe(
          'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio.',
        ),
        'RecordingConfigurationId?': type('string').describe(
          'The identifier of the configuration to be used when creating and processing the recording',
        ),
        'TimeLimit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
          ),
        'MachineDetection?': type('string').describe(
          'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
        ),
        'MachineDetectionTimeout?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
          ),
        'MachineDetectionSpeechThreshold?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
          ),
        'MachineDetectionSpeechEndThreshold?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
          ),
        'MachineDetectionSilenceTimeout?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
          ),
        'AmdStatusCallback?': type('string.url').describe(
          'The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
        ),
        'AmdStatusCallbackMethod?': type("'GET' | 'POST'").describe(
          'The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
        ),
        'Trim?': type('string').describe(
          'Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
        ),
        'CallToken?': type('string').describe(
          "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
        ),
        'Passports?': type('string').describe(
          'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
        ),
        'ClientNotificationUrl?': type('string.url').describe(
          'The URL that we should use to deliver `push call notification`.',
        ),
        'CallerDisplayName?': type('string').describe(
          'The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.',
        ),
        'EmergencyCallerPosition?': type('string').describe(
          'The emergency caller\'s GPS coordinates in decimal degrees format.\nFormat: "latitude longitude" (space-separated)\n- Latitude: decimal degrees, range -90.0 to +90.0 (negative for South, positive for North)\n- Longitude: decimal degrees, range -180.0 to +180.0 (negative for West, positive for East)\n- Precision: up to 6 decimal places recommended for meter-level accuracy\n\nNote: If the value exceeds 150 characters, only the first 150 characters will be used.\n',
        ),
        'EmergencyCallerLocation?': type('string').describe(
          "The emergency caller's physical location description within a building or facility.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        ),
        'EmergencyName?': type('string').describe(
          "The emergency caller's organization or entity name.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        ),
        'EmergencyAddress?': type('string').describe(
          "The emergency caller's street address including street number and street name.\n\nNote: If the value exceeds 60 characters, only the first 60 characters will be used.\n",
        ),
        'EmergencyZipCode?': type('string').describe(
          "The emergency caller's postal code or ZIP code.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        ),
        'EmergencyCity?': type('string').describe(
          "The emergency caller's city or municipality name.\nShould be the official city name as recognized by local authorities.\nUsed in combination with state and country for emergency call routing.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        ),
        'EmergencyState?': type('string').describe(
          "The emergency caller's state or province.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        ),
        'EmergencyCountry?': type('string').describe(
          "The emergency caller's country. Currently supported US and CA only.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
        ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountConferenceParticipantSchema['~standard'] },
  })

export const post20100401AccountsAccountSidCallsCallSidPaymentsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      IdempotencyKey: type('string').describe(
        'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
      ),
      StatusCallback: type('string.url').describe(
        'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback)',
      ),
      'BankAccountType?': PaymentsEnumBankAccountTypeSchema,
      'ChargeAmount?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
            ? Number(data)
            : Number.NaN
          return Number.isFinite(value) ? value : ctx.error('a number')
        })
        .describe(
          'A positive decimal value less than 1,000,000 to charge against the credit card or bank account. Default currency can be overwritten with `currency` field. Leave blank or set to 0 to tokenize.',
        ),
      'Currency?': type('string').describe(
        'The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted.',
      ),
      'Description?': type('string').describe(
        'The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions.',
      ),
      'Input?': type('string').describe(
        'A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs.',
      ),
      'MinPostalCodeLength?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'A positive integer that is used to validate the length of the `PostalCode` inputted by the user. User must enter this many digits.',
        ),
      'Parameter?': type('unknown').describe(
        'A single-level JSON object used to pass custom parameters to payment processors. (Required for ACH payments). The information that has to be included here depends on the <Pay> Connector. [Read more](https://www.twilio.com/console/voice/pay-connectors).',
      ),
      'PaymentConnector?': type('string').describe(
        'This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`.',
      ),
      'PaymentMethod?': PaymentsEnumPaymentMethodSchema,
      'PostalCode?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Indicates whether the credit card postal code (zip code) is a required piece of payment information that must be provided by the caller. The default is `true`.',
        ),
      'SecurityCode?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Indicates whether the credit card security code is a required piece of payment information that must be provided by the caller. The default is `true`.',
        ),
      'Timeout?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The number of seconds that <Pay> should wait for the caller to press a digit between each subsequent digit, after the first one, before moving on to validate the digits captured. The default is `5`, maximum is `600`.',
        ),
      'TokenType?': PaymentsEnumTokenTypeSchema,
      'ValidCardTypes?': type('string').describe(
        'Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex`',
      ),
      'RequireMatchingInputs?': type('string').describe(
        'A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`.',
      ),
      'Confirmation?': type("'true' | 'false'").describe(
        'Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallPaymentsSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidPaymentsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^PK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      IdempotencyKey: type('string').describe(
        'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
      ),
      StatusCallback: type('string.url').describe(
        'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests.',
      ),
      'Capture?': PaymentsEnumCaptureSchema,
      'Status?': PaymentsEnumStatusSchema,
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallPaymentsSchema['~standard'] },
})

export const get20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^QU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountQueueSchema['~standard'] },
})

export const post20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^QU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
      ),
      'MaxSize?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountQueueSchema['~standard'] },
})

export const delete20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^QU[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'queues?': type(ApiV2010AccountQueueSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      FriendlyName: type('string').describe(
        'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
      ),
      'MaxSize?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountQueueSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'Name?': type('string').describe(
        'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
      ),
      'Track?': RealtimeTranscriptionEnumTrackSchema,
      'StatusCallbackUrl?': type('string.url').describe('Absolute URL of the status callback.'),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The http method for the status_callback (one of GET, POST).',
      ),
      'InboundTrackLabel?': type('string').describe('Friendly name given to the Inbound Track'),
      'OutboundTrackLabel?': type('string').describe('Friendly name given to the Outbound Track'),
      'PartialResults?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe('Indicates if partial results are going to be sent to the customer'),
      'LanguageCode?': type('string').describe(
        'Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format',
      ),
      'TranscriptionEngine?': type('string').describe(
        'Definition of the transcription engine to be used, among those supported by Twilio',
      ),
      'ProfanityFilter?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks',
        ),
      'SpeechModel?': type('string').describe(
        'Recognition model used by the transcription engine, among those supported by the provider',
      ),
      'Hints?': type('string').describe(
        'A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them.',
      ),
      'EnableAutomaticPunctuation?': type(
        /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
      )
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe('The provider will add punctuation to recognition result'),
      'IntelligenceService?': type('string').describe(
        'The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators',
      ),
      'ConversationConfiguration?': type('string').describe(
        'The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service',
      ),
      'ConversationId?': type('string').describe(
        'The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service',
      ),
      'TranscriptionConfigurationId?': type('string').describe(
        'The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go.',
      ),
      'EnableProviderData?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe('Whether the callback includes raw provider data.'),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallRealtimeTranscriptionSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonHandler = defineHandler(
  {
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      })['~standard'],
    },
    form: {
      '~standard': type({ Status: RealtimeTranscriptionEnumUpdateStatusSchema })['~standard'],
    },
    response: { '~standard': ApiV2010AccountCallRealtimeTranscriptionSchema['~standard'] },
  },
)

export const get20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^RE[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'IncludeSoftDeleted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountRecordingSchema['~standard'] },
})

export const delete20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^RE[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidRecordingsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'DateCreated?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'DateCreated<?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'DateCreated>?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'CallSid?': type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      'ConferenceSid?': type('string')
        .and(/^CF[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      'IncludeSoftDeleted?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'recordings?': type(ApiV2010AccountRecordingSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountRecordingRecordingAddOnResultSchema['~standard'] },
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'add_on_results?': type(ApiV2010AccountRecordingRecordingAddOnResultSchema).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddOnResultSid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XH[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema['~standard'],
    },
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddOnResultSid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XH[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddOnResultSid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'payloads?': type(
          ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
        ).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddOnResultSid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        PayloadSid: type('string')
          .and(/^XH[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountRecordingRecordingTranscriptionSchema['~standard'] },
  })

export const delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'transcriptions?': type(ApiV2010AccountRecordingRecordingTranscriptionSchema).array(),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountShortCodeSchema['~standard'] },
})

export const post20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code.',
      ),
      'ApiVersion?': type('string').describe(
        'The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`.',
      ),
      'SmsUrl?': type('string.url').describe(
        'The URL we should call when receiving an incoming SMS message to this short code.',
      ),
      'SmsMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`.',
      ),
      'SmsFallbackUrl?': type('string.url').describe(
        'The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
      'SmsFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountShortCodeSchema['~standard'] },
})

export const get20100401AccountsAccountSidSMSShortCodesJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'FriendlyName?': 'string',
      'ShortCode?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'short_codes?': type(ApiV2010AccountShortCodeSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSigningKeySchema['~standard'] },
})

export const post20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: { '~standard': type({ 'FriendlyName?': type('string').describe('') })['~standard'] },
  response: { '~standard': ApiV2010AccountSigningKeySchema['~standard'] },
})

export const delete20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SK[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'contents?': type(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
        ).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe('The SID of the CredentialList resource to map to the SIP domain.'),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema[
          '~standard'
        ],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema[
          '~standard'
        ],
    },
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'contents?': type(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
        ).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe('The SID of the IpAccessControlList resource to map to the SIP domain.'),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema[
          '~standard'
        ],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema[
          '~standard'
        ],
    },
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'contents?': type(
          ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
        ).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe('The SID of the CredentialList resource to map to the SIP domain.'),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema[
          '~standard'
        ],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard':
        ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema[
          '~standard'
        ],
    },
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credentials?': type(ApiV2010AccountSipSipCredentialListSipCredentialSchema).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        Username: type('string').describe(
          "The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.",
        ),
        Password: type('string').describe(
          'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
        ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountSipSipCredentialListSipCredentialSchema['~standard'] },
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountSipSipCredentialListSipCredentialSchema['~standard'] },
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        'Password?': type('string').describe(
          'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
        ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountSipSipCredentialListSipCredentialSchema['~standard'] },
  })

export const delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'credential_lists?': type(ApiV2010AccountSipSipCredentialListSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      FriendlyName: type('string').describe(
        'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipCredentialListSchema['~standard'] },
})

export const get20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipCredentialListSchema['~standard'] },
})

export const post20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      FriendlyName: type('string').describe(
        'A human readable descriptive text for a CredentialList, up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipCredentialListSchema['~standard'] },
})

export const delete20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^CL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credential_list_mappings?': type(
          ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
        ).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe(
            'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
          ),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipDomainSipCredentialListMappingSchema['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipDomainSipCredentialListMappingSchema['~standard'],
    },
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'domains?': type(ApiV2010AccountSipSipDomainSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      DomainName: type('string').describe(
        'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL we should when the domain receives a call.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`.',
      ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
      'VoiceStatusCallbackUrl?': type('string.url').describe(
        'The URL that we should call to pass status parameters (such as call ended) to your application.',
      ),
      'VoiceStatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
      ),
      'SipRegistration?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
        ),
      'EmergencyCallingEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
        ),
      'Secure?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
        ),
      'ByocTrunkSid?': type('string')
        .and(/^BY[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
        ),
      'EmergencyCallerSid?': type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipDomainSchema['~standard'] },
})

export const get20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipDomainSchema['~standard'] },
})

export const post20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'FriendlyName?': type('string').describe(
        'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
      ),
      'VoiceFallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
      'VoiceFallbackUrl?': type('string.url').describe(
        'The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`.',
      ),
      'VoiceMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_url`',
      ),
      'VoiceStatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
      ),
      'VoiceStatusCallbackUrl?': type('string.url').describe(
        'The URL that we should call to pass status parameters (such as call ended) to your application.',
      ),
      'VoiceUrl?': type('string.url').describe(
        'The URL we should call when the domain receives a call.',
      ),
      'SipRegistration?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
        ),
      'DomainName?': type('string').describe(
        'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
      ),
      'EmergencyCallingEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
        ),
      'Secure?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
        ),
      'ByocTrunkSid?': type('string')
        .and(/^BY[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
        ),
      'EmergencyCallerSid?': type('string')
        .and(/^PN[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
        .describe(
          'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipDomainSchema['~standard'] },
})

export const delete20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^SD[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'ip_access_control_lists?': type(ApiV2010AccountSipSipIpAccessControlListSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      FriendlyName: type('string').describe(
        'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipIpAccessControlListSchema['~standard'] },
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipIpAccessControlListSchema['~standard'] },
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      FriendlyName: type('string').describe(
        'A human readable descriptive text, up to 255 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountSipSipIpAccessControlListSchema['~standard'] },
})

export const delete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^AL[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema['~standard'],
    },
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'ip_access_control_list_mappings?': type(
          ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
        ).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters'))
          .describe('The unique id of the IP access control list to map to the SIP domain.'),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    query: {
      '~standard': type({
        'PageSize?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0'),
        'PageToken?': 'string',
      })['~standard'],
    },
    response: {
      '~standard': type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'ip_addresses?': type(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema).array(),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        FriendlyName: type('string').describe(
          'A human readable descriptive text for this resource, up to 255 characters long.',
        ),
        IpAddress: type('string').describe(
          'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
        ),
        'CidrPrefixLength?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
          ),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema['~standard'],
    },
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^IP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema['~standard'],
    },
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^IP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        'IpAddress?': type('string').describe(
          'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
        ),
        'FriendlyName?': type('string').describe(
          'A human readable descriptive text for this resource, up to 255 characters long.',
        ),
        'CidrPrefixLength?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
          ),
      })['~standard'],
    },
    response: {
      '~standard': ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema['~standard'],
    },
  })

export const delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^IP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })

export const post20100401AccountsAccountSidCallsCallSidSiprecJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'Name?': type('string').describe(
        'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
      ),
      'ConnectorName?': type('string').describe(
        'Unique name used when configuring the connector via Marketplace Add-on.',
      ),
      'Track?': SiprecEnumTrackSchema,
      'StatusCallback?': type('string.url').describe('Absolute URL of the status callback.'),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The http method for the status_callback (one of GET, POST).',
      ),
      'Parameter1.Name?': type('string').describe('Parameter name'),
      'Parameter1.Value?': type('string').describe('Parameter value'),
      'Parameter2.Name?': type('string').describe('Parameter name'),
      'Parameter2.Value?': type('string').describe('Parameter value'),
      'Parameter3.Name?': type('string').describe('Parameter name'),
      'Parameter3.Value?': type('string').describe('Parameter value'),
      'Parameter4.Name?': type('string').describe('Parameter name'),
      'Parameter4.Value?': type('string').describe('Parameter value'),
      'Parameter5.Name?': type('string').describe('Parameter name'),
      'Parameter5.Value?': type('string').describe('Parameter value'),
      'Parameter6.Name?': type('string').describe('Parameter name'),
      'Parameter6.Value?': type('string').describe('Parameter value'),
      'Parameter7.Name?': type('string').describe('Parameter name'),
      'Parameter7.Value?': type('string').describe('Parameter value'),
      'Parameter8.Name?': type('string').describe('Parameter name'),
      'Parameter8.Value?': type('string').describe('Parameter value'),
      'Parameter9.Name?': type('string').describe('Parameter name'),
      'Parameter9.Value?': type('string').describe('Parameter value'),
      'Parameter10.Name?': type('string').describe('Parameter name'),
      'Parameter10.Value?': type('string').describe('Parameter value'),
      'Parameter11.Name?': type('string').describe('Parameter name'),
      'Parameter11.Value?': type('string').describe('Parameter value'),
      'Parameter12.Name?': type('string').describe('Parameter name'),
      'Parameter12.Value?': type('string').describe('Parameter value'),
      'Parameter13.Name?': type('string').describe('Parameter name'),
      'Parameter13.Value?': type('string').describe('Parameter value'),
      'Parameter14.Name?': type('string').describe('Parameter name'),
      'Parameter14.Value?': type('string').describe('Parameter value'),
      'Parameter15.Name?': type('string').describe('Parameter name'),
      'Parameter15.Value?': type('string').describe('Parameter value'),
      'Parameter16.Name?': type('string').describe('Parameter name'),
      'Parameter16.Value?': type('string').describe('Parameter value'),
      'Parameter17.Name?': type('string').describe('Parameter name'),
      'Parameter17.Value?': type('string').describe('Parameter value'),
      'Parameter18.Name?': type('string').describe('Parameter name'),
      'Parameter18.Value?': type('string').describe('Parameter value'),
      'Parameter19.Name?': type('string').describe('Parameter name'),
      'Parameter19.Value?': type('string').describe('Parameter value'),
      'Parameter20.Name?': type('string').describe('Parameter name'),
      'Parameter20.Value?': type('string').describe('Parameter value'),
      'Parameter21.Name?': type('string').describe('Parameter name'),
      'Parameter21.Value?': type('string').describe('Parameter value'),
      'Parameter22.Name?': type('string').describe('Parameter name'),
      'Parameter22.Value?': type('string').describe('Parameter value'),
      'Parameter23.Name?': type('string').describe('Parameter name'),
      'Parameter23.Value?': type('string').describe('Parameter value'),
      'Parameter24.Name?': type('string').describe('Parameter name'),
      'Parameter24.Value?': type('string').describe('Parameter value'),
      'Parameter25.Name?': type('string').describe('Parameter name'),
      'Parameter25.Value?': type('string').describe('Parameter value'),
      'Parameter26.Name?': type('string').describe('Parameter name'),
      'Parameter26.Value?': type('string').describe('Parameter value'),
      'Parameter27.Name?': type('string').describe('Parameter name'),
      'Parameter27.Value?': type('string').describe('Parameter value'),
      'Parameter28.Name?': type('string').describe('Parameter name'),
      'Parameter28.Value?': type('string').describe('Parameter value'),
      'Parameter29.Name?': type('string').describe('Parameter name'),
      'Parameter29.Value?': type('string').describe('Parameter value'),
      'Parameter30.Name?': type('string').describe('Parameter name'),
      'Parameter30.Value?': type('string').describe('Parameter value'),
      'Parameter31.Name?': type('string').describe('Parameter name'),
      'Parameter31.Value?': type('string').describe('Parameter value'),
      'Parameter32.Name?': type('string').describe('Parameter name'),
      'Parameter32.Value?': type('string').describe('Parameter value'),
      'Parameter33.Name?': type('string').describe('Parameter name'),
      'Parameter33.Value?': type('string').describe('Parameter value'),
      'Parameter34.Name?': type('string').describe('Parameter name'),
      'Parameter34.Value?': type('string').describe('Parameter value'),
      'Parameter35.Name?': type('string').describe('Parameter name'),
      'Parameter35.Value?': type('string').describe('Parameter value'),
      'Parameter36.Name?': type('string').describe('Parameter name'),
      'Parameter36.Value?': type('string').describe('Parameter value'),
      'Parameter37.Name?': type('string').describe('Parameter name'),
      'Parameter37.Value?': type('string').describe('Parameter value'),
      'Parameter38.Name?': type('string').describe('Parameter name'),
      'Parameter38.Value?': type('string').describe('Parameter value'),
      'Parameter39.Name?': type('string').describe('Parameter name'),
      'Parameter39.Value?': type('string').describe('Parameter value'),
      'Parameter40.Name?': type('string').describe('Parameter name'),
      'Parameter40.Value?': type('string').describe('Parameter value'),
      'Parameter41.Name?': type('string').describe('Parameter name'),
      'Parameter41.Value?': type('string').describe('Parameter value'),
      'Parameter42.Name?': type('string').describe('Parameter name'),
      'Parameter42.Value?': type('string').describe('Parameter value'),
      'Parameter43.Name?': type('string').describe('Parameter name'),
      'Parameter43.Value?': type('string').describe('Parameter value'),
      'Parameter44.Name?': type('string').describe('Parameter name'),
      'Parameter44.Value?': type('string').describe('Parameter value'),
      'Parameter45.Name?': type('string').describe('Parameter name'),
      'Parameter45.Value?': type('string').describe('Parameter value'),
      'Parameter46.Name?': type('string').describe('Parameter name'),
      'Parameter46.Value?': type('string').describe('Parameter value'),
      'Parameter47.Name?': type('string').describe('Parameter name'),
      'Parameter47.Value?': type('string').describe('Parameter value'),
      'Parameter48.Name?': type('string').describe('Parameter name'),
      'Parameter48.Value?': type('string').describe('Parameter value'),
      'Parameter49.Name?': type('string').describe('Parameter name'),
      'Parameter49.Value?': type('string').describe('Parameter value'),
      'Parameter50.Name?': type('string').describe('Parameter name'),
      'Parameter50.Value?': type('string').describe('Parameter value'),
      'Parameter51.Name?': type('string').describe('Parameter name'),
      'Parameter51.Value?': type('string').describe('Parameter value'),
      'Parameter52.Name?': type('string').describe('Parameter name'),
      'Parameter52.Value?': type('string').describe('Parameter value'),
      'Parameter53.Name?': type('string').describe('Parameter name'),
      'Parameter53.Value?': type('string').describe('Parameter value'),
      'Parameter54.Name?': type('string').describe('Parameter name'),
      'Parameter54.Value?': type('string').describe('Parameter value'),
      'Parameter55.Name?': type('string').describe('Parameter name'),
      'Parameter55.Value?': type('string').describe('Parameter value'),
      'Parameter56.Name?': type('string').describe('Parameter name'),
      'Parameter56.Value?': type('string').describe('Parameter value'),
      'Parameter57.Name?': type('string').describe('Parameter name'),
      'Parameter57.Value?': type('string').describe('Parameter value'),
      'Parameter58.Name?': type('string').describe('Parameter name'),
      'Parameter58.Value?': type('string').describe('Parameter value'),
      'Parameter59.Name?': type('string').describe('Parameter name'),
      'Parameter59.Value?': type('string').describe('Parameter value'),
      'Parameter60.Name?': type('string').describe('Parameter name'),
      'Parameter60.Value?': type('string').describe('Parameter value'),
      'Parameter61.Name?': type('string').describe('Parameter name'),
      'Parameter61.Value?': type('string').describe('Parameter value'),
      'Parameter62.Name?': type('string').describe('Parameter name'),
      'Parameter62.Value?': type('string').describe('Parameter value'),
      'Parameter63.Name?': type('string').describe('Parameter name'),
      'Parameter63.Value?': type('string').describe('Parameter value'),
      'Parameter64.Name?': type('string').describe('Parameter name'),
      'Parameter64.Value?': type('string').describe('Parameter value'),
      'Parameter65.Name?': type('string').describe('Parameter name'),
      'Parameter65.Value?': type('string').describe('Parameter value'),
      'Parameter66.Name?': type('string').describe('Parameter name'),
      'Parameter66.Value?': type('string').describe('Parameter value'),
      'Parameter67.Name?': type('string').describe('Parameter name'),
      'Parameter67.Value?': type('string').describe('Parameter value'),
      'Parameter68.Name?': type('string').describe('Parameter name'),
      'Parameter68.Value?': type('string').describe('Parameter value'),
      'Parameter69.Name?': type('string').describe('Parameter name'),
      'Parameter69.Value?': type('string').describe('Parameter value'),
      'Parameter70.Name?': type('string').describe('Parameter name'),
      'Parameter70.Value?': type('string').describe('Parameter value'),
      'Parameter71.Name?': type('string').describe('Parameter name'),
      'Parameter71.Value?': type('string').describe('Parameter value'),
      'Parameter72.Name?': type('string').describe('Parameter name'),
      'Parameter72.Value?': type('string').describe('Parameter value'),
      'Parameter73.Name?': type('string').describe('Parameter name'),
      'Parameter73.Value?': type('string').describe('Parameter value'),
      'Parameter74.Name?': type('string').describe('Parameter name'),
      'Parameter74.Value?': type('string').describe('Parameter value'),
      'Parameter75.Name?': type('string').describe('Parameter name'),
      'Parameter75.Value?': type('string').describe('Parameter value'),
      'Parameter76.Name?': type('string').describe('Parameter name'),
      'Parameter76.Value?': type('string').describe('Parameter value'),
      'Parameter77.Name?': type('string').describe('Parameter name'),
      'Parameter77.Value?': type('string').describe('Parameter value'),
      'Parameter78.Name?': type('string').describe('Parameter name'),
      'Parameter78.Value?': type('string').describe('Parameter value'),
      'Parameter79.Name?': type('string').describe('Parameter name'),
      'Parameter79.Value?': type('string').describe('Parameter value'),
      'Parameter80.Name?': type('string').describe('Parameter name'),
      'Parameter80.Value?': type('string').describe('Parameter value'),
      'Parameter81.Name?': type('string').describe('Parameter name'),
      'Parameter81.Value?': type('string').describe('Parameter value'),
      'Parameter82.Name?': type('string').describe('Parameter name'),
      'Parameter82.Value?': type('string').describe('Parameter value'),
      'Parameter83.Name?': type('string').describe('Parameter name'),
      'Parameter83.Value?': type('string').describe('Parameter value'),
      'Parameter84.Name?': type('string').describe('Parameter name'),
      'Parameter84.Value?': type('string').describe('Parameter value'),
      'Parameter85.Name?': type('string').describe('Parameter name'),
      'Parameter85.Value?': type('string').describe('Parameter value'),
      'Parameter86.Name?': type('string').describe('Parameter name'),
      'Parameter86.Value?': type('string').describe('Parameter value'),
      'Parameter87.Name?': type('string').describe('Parameter name'),
      'Parameter87.Value?': type('string').describe('Parameter value'),
      'Parameter88.Name?': type('string').describe('Parameter name'),
      'Parameter88.Value?': type('string').describe('Parameter value'),
      'Parameter89.Name?': type('string').describe('Parameter name'),
      'Parameter89.Value?': type('string').describe('Parameter value'),
      'Parameter90.Name?': type('string').describe('Parameter name'),
      'Parameter90.Value?': type('string').describe('Parameter value'),
      'Parameter91.Name?': type('string').describe('Parameter name'),
      'Parameter91.Value?': type('string').describe('Parameter value'),
      'Parameter92.Name?': type('string').describe('Parameter name'),
      'Parameter92.Value?': type('string').describe('Parameter value'),
      'Parameter93.Name?': type('string').describe('Parameter name'),
      'Parameter93.Value?': type('string').describe('Parameter value'),
      'Parameter94.Name?': type('string').describe('Parameter name'),
      'Parameter94.Value?': type('string').describe('Parameter value'),
      'Parameter95.Name?': type('string').describe('Parameter name'),
      'Parameter95.Value?': type('string').describe('Parameter value'),
      'Parameter96.Name?': type('string').describe('Parameter name'),
      'Parameter96.Value?': type('string').describe('Parameter value'),
      'Parameter97.Name?': type('string').describe('Parameter name'),
      'Parameter97.Value?': type('string').describe('Parameter value'),
      'Parameter98.Name?': type('string').describe('Parameter name'),
      'Parameter98.Value?': type('string').describe('Parameter value'),
      'Parameter99.Name?': type('string').describe('Parameter name'),
      'Parameter99.Value?': type('string').describe('Parameter value'),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallSiprecSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidSiprecSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: 'string',
    })['~standard'],
  },
  form: { '~standard': type({ Status: SiprecEnumUpdateStatusSchema })['~standard'] },
  response: { '~standard': ApiV2010AccountCallSiprecSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidStreamsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      Url: type('string.url').describe(
        'Relative or absolute URL where WebSocket connection will be established.',
      ),
      'Name?': type('string').describe(
        'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
      ),
      'Track?': StreamEnumTrackSchema,
      'StatusCallback?': type('string.url').describe(
        'Absolute URL to which Twilio sends status callback HTTP requests.',
      ),
      'StatusCallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`.',
      ),
      'Parameter1.Name?': type('string').describe('Parameter name'),
      'Parameter1.Value?': type('string').describe('Parameter value'),
      'Parameter2.Name?': type('string').describe('Parameter name'),
      'Parameter2.Value?': type('string').describe('Parameter value'),
      'Parameter3.Name?': type('string').describe('Parameter name'),
      'Parameter3.Value?': type('string').describe('Parameter value'),
      'Parameter4.Name?': type('string').describe('Parameter name'),
      'Parameter4.Value?': type('string').describe('Parameter value'),
      'Parameter5.Name?': type('string').describe('Parameter name'),
      'Parameter5.Value?': type('string').describe('Parameter value'),
      'Parameter6.Name?': type('string').describe('Parameter name'),
      'Parameter6.Value?': type('string').describe('Parameter value'),
      'Parameter7.Name?': type('string').describe('Parameter name'),
      'Parameter7.Value?': type('string').describe('Parameter value'),
      'Parameter8.Name?': type('string').describe('Parameter name'),
      'Parameter8.Value?': type('string').describe('Parameter value'),
      'Parameter9.Name?': type('string').describe('Parameter name'),
      'Parameter9.Value?': type('string').describe('Parameter value'),
      'Parameter10.Name?': type('string').describe('Parameter name'),
      'Parameter10.Value?': type('string').describe('Parameter value'),
      'Parameter11.Name?': type('string').describe('Parameter name'),
      'Parameter11.Value?': type('string').describe('Parameter value'),
      'Parameter12.Name?': type('string').describe('Parameter name'),
      'Parameter12.Value?': type('string').describe('Parameter value'),
      'Parameter13.Name?': type('string').describe('Parameter name'),
      'Parameter13.Value?': type('string').describe('Parameter value'),
      'Parameter14.Name?': type('string').describe('Parameter name'),
      'Parameter14.Value?': type('string').describe('Parameter value'),
      'Parameter15.Name?': type('string').describe('Parameter name'),
      'Parameter15.Value?': type('string').describe('Parameter value'),
      'Parameter16.Name?': type('string').describe('Parameter name'),
      'Parameter16.Value?': type('string').describe('Parameter value'),
      'Parameter17.Name?': type('string').describe('Parameter name'),
      'Parameter17.Value?': type('string').describe('Parameter value'),
      'Parameter18.Name?': type('string').describe('Parameter name'),
      'Parameter18.Value?': type('string').describe('Parameter value'),
      'Parameter19.Name?': type('string').describe('Parameter name'),
      'Parameter19.Value?': type('string').describe('Parameter value'),
      'Parameter20.Name?': type('string').describe('Parameter name'),
      'Parameter20.Value?': type('string').describe('Parameter value'),
      'Parameter21.Name?': type('string').describe('Parameter name'),
      'Parameter21.Value?': type('string').describe('Parameter value'),
      'Parameter22.Name?': type('string').describe('Parameter name'),
      'Parameter22.Value?': type('string').describe('Parameter value'),
      'Parameter23.Name?': type('string').describe('Parameter name'),
      'Parameter23.Value?': type('string').describe('Parameter value'),
      'Parameter24.Name?': type('string').describe('Parameter name'),
      'Parameter24.Value?': type('string').describe('Parameter value'),
      'Parameter25.Name?': type('string').describe('Parameter name'),
      'Parameter25.Value?': type('string').describe('Parameter value'),
      'Parameter26.Name?': type('string').describe('Parameter name'),
      'Parameter26.Value?': type('string').describe('Parameter value'),
      'Parameter27.Name?': type('string').describe('Parameter name'),
      'Parameter27.Value?': type('string').describe('Parameter value'),
      'Parameter28.Name?': type('string').describe('Parameter name'),
      'Parameter28.Value?': type('string').describe('Parameter value'),
      'Parameter29.Name?': type('string').describe('Parameter name'),
      'Parameter29.Value?': type('string').describe('Parameter value'),
      'Parameter30.Name?': type('string').describe('Parameter name'),
      'Parameter30.Value?': type('string').describe('Parameter value'),
      'Parameter31.Name?': type('string').describe('Parameter name'),
      'Parameter31.Value?': type('string').describe('Parameter value'),
      'Parameter32.Name?': type('string').describe('Parameter name'),
      'Parameter32.Value?': type('string').describe('Parameter value'),
      'Parameter33.Name?': type('string').describe('Parameter name'),
      'Parameter33.Value?': type('string').describe('Parameter value'),
      'Parameter34.Name?': type('string').describe('Parameter name'),
      'Parameter34.Value?': type('string').describe('Parameter value'),
      'Parameter35.Name?': type('string').describe('Parameter name'),
      'Parameter35.Value?': type('string').describe('Parameter value'),
      'Parameter36.Name?': type('string').describe('Parameter name'),
      'Parameter36.Value?': type('string').describe('Parameter value'),
      'Parameter37.Name?': type('string').describe('Parameter name'),
      'Parameter37.Value?': type('string').describe('Parameter value'),
      'Parameter38.Name?': type('string').describe('Parameter name'),
      'Parameter38.Value?': type('string').describe('Parameter value'),
      'Parameter39.Name?': type('string').describe('Parameter name'),
      'Parameter39.Value?': type('string').describe('Parameter value'),
      'Parameter40.Name?': type('string').describe('Parameter name'),
      'Parameter40.Value?': type('string').describe('Parameter value'),
      'Parameter41.Name?': type('string').describe('Parameter name'),
      'Parameter41.Value?': type('string').describe('Parameter value'),
      'Parameter42.Name?': type('string').describe('Parameter name'),
      'Parameter42.Value?': type('string').describe('Parameter value'),
      'Parameter43.Name?': type('string').describe('Parameter name'),
      'Parameter43.Value?': type('string').describe('Parameter value'),
      'Parameter44.Name?': type('string').describe('Parameter name'),
      'Parameter44.Value?': type('string').describe('Parameter value'),
      'Parameter45.Name?': type('string').describe('Parameter name'),
      'Parameter45.Value?': type('string').describe('Parameter value'),
      'Parameter46.Name?': type('string').describe('Parameter name'),
      'Parameter46.Value?': type('string').describe('Parameter value'),
      'Parameter47.Name?': type('string').describe('Parameter name'),
      'Parameter47.Value?': type('string').describe('Parameter value'),
      'Parameter48.Name?': type('string').describe('Parameter name'),
      'Parameter48.Value?': type('string').describe('Parameter value'),
      'Parameter49.Name?': type('string').describe('Parameter name'),
      'Parameter49.Value?': type('string').describe('Parameter value'),
      'Parameter50.Name?': type('string').describe('Parameter name'),
      'Parameter50.Value?': type('string').describe('Parameter value'),
      'Parameter51.Name?': type('string').describe('Parameter name'),
      'Parameter51.Value?': type('string').describe('Parameter value'),
      'Parameter52.Name?': type('string').describe('Parameter name'),
      'Parameter52.Value?': type('string').describe('Parameter value'),
      'Parameter53.Name?': type('string').describe('Parameter name'),
      'Parameter53.Value?': type('string').describe('Parameter value'),
      'Parameter54.Name?': type('string').describe('Parameter name'),
      'Parameter54.Value?': type('string').describe('Parameter value'),
      'Parameter55.Name?': type('string').describe('Parameter name'),
      'Parameter55.Value?': type('string').describe('Parameter value'),
      'Parameter56.Name?': type('string').describe('Parameter name'),
      'Parameter56.Value?': type('string').describe('Parameter value'),
      'Parameter57.Name?': type('string').describe('Parameter name'),
      'Parameter57.Value?': type('string').describe('Parameter value'),
      'Parameter58.Name?': type('string').describe('Parameter name'),
      'Parameter58.Value?': type('string').describe('Parameter value'),
      'Parameter59.Name?': type('string').describe('Parameter name'),
      'Parameter59.Value?': type('string').describe('Parameter value'),
      'Parameter60.Name?': type('string').describe('Parameter name'),
      'Parameter60.Value?': type('string').describe('Parameter value'),
      'Parameter61.Name?': type('string').describe('Parameter name'),
      'Parameter61.Value?': type('string').describe('Parameter value'),
      'Parameter62.Name?': type('string').describe('Parameter name'),
      'Parameter62.Value?': type('string').describe('Parameter value'),
      'Parameter63.Name?': type('string').describe('Parameter name'),
      'Parameter63.Value?': type('string').describe('Parameter value'),
      'Parameter64.Name?': type('string').describe('Parameter name'),
      'Parameter64.Value?': type('string').describe('Parameter value'),
      'Parameter65.Name?': type('string').describe('Parameter name'),
      'Parameter65.Value?': type('string').describe('Parameter value'),
      'Parameter66.Name?': type('string').describe('Parameter name'),
      'Parameter66.Value?': type('string').describe('Parameter value'),
      'Parameter67.Name?': type('string').describe('Parameter name'),
      'Parameter67.Value?': type('string').describe('Parameter value'),
      'Parameter68.Name?': type('string').describe('Parameter name'),
      'Parameter68.Value?': type('string').describe('Parameter value'),
      'Parameter69.Name?': type('string').describe('Parameter name'),
      'Parameter69.Value?': type('string').describe('Parameter value'),
      'Parameter70.Name?': type('string').describe('Parameter name'),
      'Parameter70.Value?': type('string').describe('Parameter value'),
      'Parameter71.Name?': type('string').describe('Parameter name'),
      'Parameter71.Value?': type('string').describe('Parameter value'),
      'Parameter72.Name?': type('string').describe('Parameter name'),
      'Parameter72.Value?': type('string').describe('Parameter value'),
      'Parameter73.Name?': type('string').describe('Parameter name'),
      'Parameter73.Value?': type('string').describe('Parameter value'),
      'Parameter74.Name?': type('string').describe('Parameter name'),
      'Parameter74.Value?': type('string').describe('Parameter value'),
      'Parameter75.Name?': type('string').describe('Parameter name'),
      'Parameter75.Value?': type('string').describe('Parameter value'),
      'Parameter76.Name?': type('string').describe('Parameter name'),
      'Parameter76.Value?': type('string').describe('Parameter value'),
      'Parameter77.Name?': type('string').describe('Parameter name'),
      'Parameter77.Value?': type('string').describe('Parameter value'),
      'Parameter78.Name?': type('string').describe('Parameter name'),
      'Parameter78.Value?': type('string').describe('Parameter value'),
      'Parameter79.Name?': type('string').describe('Parameter name'),
      'Parameter79.Value?': type('string').describe('Parameter value'),
      'Parameter80.Name?': type('string').describe('Parameter name'),
      'Parameter80.Value?': type('string').describe('Parameter value'),
      'Parameter81.Name?': type('string').describe('Parameter name'),
      'Parameter81.Value?': type('string').describe('Parameter value'),
      'Parameter82.Name?': type('string').describe('Parameter name'),
      'Parameter82.Value?': type('string').describe('Parameter value'),
      'Parameter83.Name?': type('string').describe('Parameter name'),
      'Parameter83.Value?': type('string').describe('Parameter value'),
      'Parameter84.Name?': type('string').describe('Parameter name'),
      'Parameter84.Value?': type('string').describe('Parameter value'),
      'Parameter85.Name?': type('string').describe('Parameter name'),
      'Parameter85.Value?': type('string').describe('Parameter value'),
      'Parameter86.Name?': type('string').describe('Parameter name'),
      'Parameter86.Value?': type('string').describe('Parameter value'),
      'Parameter87.Name?': type('string').describe('Parameter name'),
      'Parameter87.Value?': type('string').describe('Parameter value'),
      'Parameter88.Name?': type('string').describe('Parameter name'),
      'Parameter88.Value?': type('string').describe('Parameter value'),
      'Parameter89.Name?': type('string').describe('Parameter name'),
      'Parameter89.Value?': type('string').describe('Parameter value'),
      'Parameter90.Name?': type('string').describe('Parameter name'),
      'Parameter90.Value?': type('string').describe('Parameter value'),
      'Parameter91.Name?': type('string').describe('Parameter name'),
      'Parameter91.Value?': type('string').describe('Parameter value'),
      'Parameter92.Name?': type('string').describe('Parameter name'),
      'Parameter92.Value?': type('string').describe('Parameter value'),
      'Parameter93.Name?': type('string').describe('Parameter name'),
      'Parameter93.Value?': type('string').describe('Parameter value'),
      'Parameter94.Name?': type('string').describe('Parameter name'),
      'Parameter94.Value?': type('string').describe('Parameter value'),
      'Parameter95.Name?': type('string').describe('Parameter name'),
      'Parameter95.Value?': type('string').describe('Parameter value'),
      'Parameter96.Name?': type('string').describe('Parameter name'),
      'Parameter96.Value?': type('string').describe('Parameter value'),
      'Parameter97.Name?': type('string').describe('Parameter name'),
      'Parameter97.Value?': type('string').describe('Parameter value'),
      'Parameter98.Name?': type('string').describe('Parameter name'),
      'Parameter98.Value?': type('string').describe('Parameter value'),
      'Parameter99.Name?': type('string').describe('Parameter name'),
      'Parameter99.Value?': type('string').describe('Parameter value'),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountCallStreamSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidStreamsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      CallSid: type('string')
        .and(/^CA[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: 'string',
    })['~standard'],
  },
  form: { '~standard': type({ Status: StreamEnumUpdateStatusSchema })['~standard'] },
  response: { '~standard': ApiV2010AccountCallStreamSchema['~standard'] },
})

export const post20100401AccountsAccountSidTokensJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'Ttl?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe(
          'The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours).',
        ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountTokenSchema['~standard'] },
})

export const get20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^TR[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountTranscriptionSchema['~standard'] },
})

export const delete20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^TR[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidTranscriptionsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'transcriptions?': type(ApiV2010AccountTranscriptionSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsAllTimeJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsDailyJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsLastMonthJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsMonthlyJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsThisMonthJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsTodayJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsYearlyJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageRecordsYesterdayJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Category?': 'string',
      'StartDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'EndDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
      ),
      'IncludeSubaccounts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema).array(),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^UT[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountUsageUsageTriggerSchema['~standard'] },
})

export const post20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^UT[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      'CallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
      ),
      'CallbackUrl?': type('string.url').describe(
        'The URL we should call using `callback_method` when the trigger fires.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountUsageUsageTriggerSchema['~standard'] },
})

export const delete20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      Sid: type('string')
        .and(/^UT[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
})

export const get20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  query: {
    '~standard': type({
      'Recurring?': UsageTriggerEnumRecurringSchema,
      'TriggerBy?': UsageTriggerEnumTriggerFieldSchema,
      'UsageCategory?': 'string',
      'PageSize?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
        .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
      'Page?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'PageToken?': 'string',
    })['~standard'],
  },
  response: {
    '~standard': type({
      'end?': 'number.integer',
      'first_page_uri?': 'string.url',
      'next_page_uri?': 'string.url | null',
      'page?': 'number.integer',
      'page_size?': 'number.integer',
      'previous_page_uri?': 'string.url | null',
      'start?': 'number.integer',
      'uri?': 'string.url',
      'usage_triggers?': type(ApiV2010AccountUsageUsageTriggerSchema).array(),
    })['~standard'],
  },
})

export const post20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: {
    '~standard': type({
      AccountSid: type('string')
        .and(/^AC[0-9a-fA-F]{32}$/)
        .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
    })['~standard'],
  },
  form: {
    '~standard': type({
      CallbackUrl: type('string.url').describe(
        'The URL we should call using `callback_method` when the trigger fires.',
      ),
      TriggerValue: type('string').describe(
        'The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`.',
      ),
      UsageCategory: type('string').describe(
        'The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value.',
      ),
      'CallbackMethod?': type("'GET' | 'POST'").describe(
        'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
      ),
      'FriendlyName?': type('string').describe(
        'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      ),
      'Recurring?': UsageTriggerEnumRecurringSchema,
      'TriggerBy?': UsageTriggerEnumTriggerFieldSchema,
    })['~standard'],
  },
  response: { '~standard': ApiV2010AccountUsageUsageTriggerSchema['~standard'] },
})

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        Content: type('string').describe(
          'The User Defined Message in the form of URL-encoded JSON string.',
        ),
        'IdempotencyKey?': type('string').describe(
          'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
        ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountCallUserDefinedMessageSchema['~standard'] },
  })

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
    form: {
      '~standard': type({
        Callback: type('string.url').describe(
          'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
        ),
        'IdempotencyKey?': type('string').describe(
          'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
        ),
        'Method?': type("'GET' | 'POST'").describe(
          'The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.',
        ),
      })['~standard'],
    },
    response: { '~standard': ApiV2010AccountCallUserDefinedMessageSubscriptionSchema['~standard'] },
  })

export const delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonHandler =
  defineHandler({
    param: {
      '~standard': type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ZY[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      })['~standard'],
    },
  })
