import { type } from 'arktype'

export const AccountEnumStatusSchema = type("'active' | 'suspended' | 'closed'").describe(
  'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
)

export type AccountEnumStatusSchema = typeof AccountEnumStatusSchema.infer

export const AccountEnumTypeSchema = type("'Trial' | 'Full'").describe(
  "The type of this account. Either `Trial` or `Full` if it's been upgraded",
)

export type AccountEnumTypeSchema = typeof AccountEnumTypeSchema.infer

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

export type ApiV2010AccountSchema = typeof ApiV2010AccountSchema.infer

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

export type ApiV2010AccountAddressSchema = typeof ApiV2010AccountAddressSchema.infer

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

export type ApiV2010AccountApplicationSchema = typeof ApiV2010AccountApplicationSchema.infer

export const AuthorizedConnectAppEnumPermissionSchema = type("'get-all' | 'post-all'").describe(
  'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
)

export type AuthorizedConnectAppEnumPermissionSchema =
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

export type ApiV2010AccountAuthorizedConnectAppSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountrySchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema =
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

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema =
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

export type ApiV2010AccountBalanceSchema = typeof ApiV2010AccountBalanceSchema.infer

export const CallEnumStatusSchema = type(
  "'queued' | 'ringing' | 'in-progress' | 'completed' | 'busy' | 'failed' | 'no-answer' | 'canceled'",
).describe(
  'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
)

export type CallEnumStatusSchema = typeof CallEnumStatusSchema.infer

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

export type ApiV2010AccountCallSchema = typeof ApiV2010AccountCallSchema.infer

export const CallEnumEventSchema = type("'initiated' | 'ringing' | 'answered' | 'completed'")

export type CallEnumEventSchema = typeof CallEnumEventSchema.infer

export const CallEnumUpdateStatusSchema = type("'canceled' | 'completed'")

export type CallEnumUpdateStatusSchema = typeof CallEnumUpdateStatusSchema.infer

export const ApiV2010AccountCallCallEventSchema = type({
  'request?': type('unknown | null').describe(
    'Contains a dictionary representing the request of the call.',
  ),
  'response?': type('unknown | null').describe(
    'Contains a dictionary representing the call response, including a list of the call events.',
  ),
})

export type ApiV2010AccountCallCallEventSchema = typeof ApiV2010AccountCallCallEventSchema.infer

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

export type ApiV2010AccountCallCallNotificationSchema =
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

export type ApiV2010AccountCallCallNotificationInstanceSchema =
  typeof ApiV2010AccountCallCallNotificationInstanceSchema.infer

export const CallRecordingEnumStatusSchema = type(
  "'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'",
).describe(
  'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
)

export type CallRecordingEnumStatusSchema = typeof CallRecordingEnumStatusSchema.infer

export const CallRecordingEnumSourceSchema = type(
  "'DialVerb' | 'Conference' | 'OutboundAPI' | 'Trunking' | 'RecordVerb' | 'StartCallRecordingAPI' | 'StartConferenceRecordingAPI'",
).describe(
  'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
)

export type CallRecordingEnumSourceSchema = typeof CallRecordingEnumSourceSchema.infer

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

export type ApiV2010AccountCallCallRecordingSchema =
  typeof ApiV2010AccountCallCallRecordingSchema.infer

export const ConferenceEnumStatusSchema = type("'init' | 'in-progress' | 'completed'").describe(
  'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
)

export type ConferenceEnumStatusSchema = typeof ConferenceEnumStatusSchema.infer

export const ConferenceEnumReasonConferenceEndedSchema = type(
  "'conference-ended-via-api' | 'participant-with-end-conference-on-exit-left' | 'participant-with-end-conference-on-exit-kicked' | 'last-participant-kicked' | 'last-participant-left'",
).describe(
  'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
)

export type ConferenceEnumReasonConferenceEndedSchema =
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

export type ApiV2010AccountConferenceSchema = typeof ApiV2010AccountConferenceSchema.infer

export const ConferenceEnumUpdateStatusSchema = type("'completed'")

export type ConferenceEnumUpdateStatusSchema = typeof ConferenceEnumUpdateStatusSchema.infer

export const ConferenceRecordingEnumStatusSchema = type(
  "'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'",
).describe(
  'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
)

export type ConferenceRecordingEnumStatusSchema = typeof ConferenceRecordingEnumStatusSchema.infer

export const ConferenceRecordingEnumSourceSchema = type(
  "'DialVerb' | 'Conference' | 'OutboundAPI' | 'Trunking' | 'RecordVerb' | 'StartCallRecordingAPI' | 'StartConferenceRecordingAPI'",
).describe(
  'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
)

export type ConferenceRecordingEnumSourceSchema = typeof ConferenceRecordingEnumSourceSchema.infer

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

export type ApiV2010AccountConferenceConferenceRecordingSchema =
  typeof ApiV2010AccountConferenceConferenceRecordingSchema.infer

export const ConnectAppEnumPermissionSchema = type("'get-all' | 'post-all'").describe(
  'The set of permissions that your ConnectApp requests.',
)

export type ConnectAppEnumPermissionSchema = typeof ConnectAppEnumPermissionSchema.infer

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

export type ApiV2010AccountConnectAppSchema = typeof ApiV2010AccountConnectAppSchema.infer

export const DependentPhoneNumberEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type DependentPhoneNumberEnumAddressRequirementSchema =
  typeof DependentPhoneNumberEnumAddressRequirementSchema.infer

export const DependentPhoneNumberEnumEmergencyStatusSchema = type("'Active' | 'Inactive'").describe(
  'Whether the phone number is enabled for emergency calling.',
)

export type DependentPhoneNumberEnumEmergencyStatusSchema =
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

export type ApiV2010AccountAddressDependentPhoneNumberSchema =
  typeof ApiV2010AccountAddressDependentPhoneNumberSchema.infer

export const IncomingPhoneNumberEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberEnumAddressRequirementSchema =
  typeof IncomingPhoneNumberEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberEnumVoiceReceiveModeSchema =
  typeof IncomingPhoneNumberEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberEnumEmergencyStatusSchema = type("'Active' | 'Inactive'").describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberEnumEmergencyStatusSchema =
  typeof IncomingPhoneNumberEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberEnumEmergencyAddressStatusSchema =
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

export type ApiV2010AccountIncomingPhoneNumberSchema =
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

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema =
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

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema.infer

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberLocalEnumAddressRequirementSchema =
  typeof IncomingPhoneNumberLocalEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema =
  typeof IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = type(
  "'Active' | 'Inactive'",
).describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberLocalEnumEmergencyStatusSchema =
  typeof IncomingPhoneNumberLocalEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema =
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

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema.infer

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberMobileEnumAddressRequirementSchema =
  typeof IncomingPhoneNumberMobileEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema =
  typeof IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = type(
  "'Active' | 'Inactive'",
).describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberMobileEnumEmergencyStatusSchema =
  typeof IncomingPhoneNumberMobileEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema =
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

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema =
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema.infer

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = type(
  "'none' | 'any' | 'local' | 'foreign'",
).describe(
  'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
)

export type IncomingPhoneNumberTollFreeEnumAddressRequirementSchema =
  typeof IncomingPhoneNumberTollFreeEnumAddressRequirementSchema.infer

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = type("'voice' | 'fax'")

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema =
  typeof IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema.infer

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = type(
  "'Active' | 'Inactive'",
).describe(
  'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
)

export type IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema =
  typeof IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema.infer

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = type(
  "'registered' | 'unregistered' | 'pending-registration' | 'registration-failure' | 'pending-unregistration' | 'unregistration-failure'",
).describe(
  'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
)

export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema =
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

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema =
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

export type ApiV2010AccountKeySchema = typeof ApiV2010AccountKeySchema.infer

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

export type ApiV2010AccountMessageMediaSchema = typeof ApiV2010AccountMessageMediaSchema.infer

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

export type ApiV2010AccountQueueMemberSchema = typeof ApiV2010AccountQueueMemberSchema.infer

export const MessageEnumDirectionSchema = type(
  "'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply'",
).describe(
  'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
)

export type MessageEnumDirectionSchema = typeof MessageEnumDirectionSchema.infer

export const MessageEnumStatusSchema = type(
  "'queued' | 'sending' | 'sent' | 'failed' | 'delivered' | 'undelivered' | 'receiving' | 'received' | 'accepted' | 'scheduled' | 'read' | 'partially_delivered' | 'canceled'",
).describe(
  'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
)

export type MessageEnumStatusSchema = typeof MessageEnumStatusSchema.infer

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

export type ApiV2010AccountMessageSchema = typeof ApiV2010AccountMessageSchema.infer

export const MessageEnumUpdateStatusSchema = type("'canceled'")

export type MessageEnumUpdateStatusSchema = typeof MessageEnumUpdateStatusSchema.infer

export const MessageEnumContentRetentionSchema = type("'retain' | 'discard'").describe(
  'Determines if the message content can be stored or redacted based on privacy settings',
)

export type MessageEnumContentRetentionSchema = typeof MessageEnumContentRetentionSchema.infer

export const MessageEnumAddressRetentionSchema = type("'retain' | 'obfuscate'").describe(
  'Determines if the address can be stored or obfuscated based on privacy settings',
)

export type MessageEnumAddressRetentionSchema = typeof MessageEnumAddressRetentionSchema.infer

export const MessageEnumTrafficTypeSchema = type("'free'")

export type MessageEnumTrafficTypeSchema = typeof MessageEnumTrafficTypeSchema.infer

export const MessageEnumScheduleTypeSchema = type("'fixed'").describe(
  'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
)

export type MessageEnumScheduleTypeSchema = typeof MessageEnumScheduleTypeSchema.infer

export const MessageEnumRiskCheckSchema = type("'enable' | 'disable'").describe(
  'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
)

export type MessageEnumRiskCheckSchema = typeof MessageEnumRiskCheckSchema.infer

export const MessageFeedbackEnumOutcomeSchema = type("'confirmed' | 'unconfirmed'").describe(
  'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
)

export type MessageFeedbackEnumOutcomeSchema = typeof MessageFeedbackEnumOutcomeSchema.infer

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

export type ApiV2010AccountMessageMessageFeedbackSchema =
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

export type ApiV2010AccountNewKeySchema = typeof ApiV2010AccountNewKeySchema.infer

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

export type ApiV2010AccountNewSigningKeySchema = typeof ApiV2010AccountNewSigningKeySchema.infer

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

export type ApiV2010AccountNotificationSchema = typeof ApiV2010AccountNotificationSchema.infer

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

export type ApiV2010AccountNotificationInstanceSchema =
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

export type ApiV2010AccountOutgoingCallerIdSchema =
  typeof ApiV2010AccountOutgoingCallerIdSchema.infer

export const ParticipantEnumStatusSchema = type(
  "'queued' | 'connecting' | 'ringing' | 'connected' | 'complete' | 'failed'",
).describe(
  "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
)

export type ParticipantEnumStatusSchema = typeof ParticipantEnumStatusSchema.infer

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

export type ApiV2010AccountConferenceParticipantSchema =
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

export type ApiV2010AccountCallPaymentsSchema = typeof ApiV2010AccountCallPaymentsSchema.infer

export const PaymentsEnumPaymentMethodSchema = type("'credit-card' | 'ach-debit'").describe(
  'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
)

export type PaymentsEnumPaymentMethodSchema = typeof PaymentsEnumPaymentMethodSchema.infer

export const PaymentsEnumBankAccountTypeSchema = type(
  "'consumer-checking' | 'consumer-savings' | 'commercial-checking'",
).describe(
  'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
)

export type PaymentsEnumBankAccountTypeSchema = typeof PaymentsEnumBankAccountTypeSchema.infer

export const PaymentsEnumTokenTypeSchema = type(
  "'one-time' | 'reusable' | 'payment-method'",
).describe(
  'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
)

export type PaymentsEnumTokenTypeSchema = typeof PaymentsEnumTokenTypeSchema.infer

export const PaymentsEnumCaptureSchema = type(
  "'payment-card-number' | 'expiration-date' | 'security-code' | 'postal-code' | 'bank-routing-number' | 'bank-account-number' | 'payment-card-number-matcher' | 'expiration-date-matcher' | 'security-code-matcher' | 'postal-code-matcher'",
).describe(
  'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
)

export type PaymentsEnumCaptureSchema = typeof PaymentsEnumCaptureSchema.infer

export const PaymentsEnumStatusSchema = type("'complete' | 'cancel'").describe(
  'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
)

export type PaymentsEnumStatusSchema = typeof PaymentsEnumStatusSchema.infer

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

export type ApiV2010AccountQueueSchema = typeof ApiV2010AccountQueueSchema.infer

export const RealtimeTranscriptionEnumStatusSchema = type("'in-progress' | 'stopped'").describe(
  'The status - one of `stopped`, `in-flight`',
)

export type RealtimeTranscriptionEnumStatusSchema =
  typeof RealtimeTranscriptionEnumStatusSchema.infer

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

export type ApiV2010AccountCallRealtimeTranscriptionSchema =
  typeof ApiV2010AccountCallRealtimeTranscriptionSchema.infer

export const RealtimeTranscriptionEnumTrackSchema = type(
  "'inbound_track' | 'outbound_track' | 'both_tracks'",
).describe('One of `inbound_track`, `outbound_track`, `both_tracks`.')

export type RealtimeTranscriptionEnumTrackSchema = typeof RealtimeTranscriptionEnumTrackSchema.infer

export const RealtimeTranscriptionEnumUpdateStatusSchema = type("'stopped'")

export type RealtimeTranscriptionEnumUpdateStatusSchema =
  typeof RealtimeTranscriptionEnumUpdateStatusSchema.infer

export const RecordingEnumStatusSchema = type(
  "'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent' | 'deleted'",
).describe(
  'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
)

export type RecordingEnumStatusSchema = typeof RecordingEnumStatusSchema.infer

export const RecordingEnumSourceSchema = type(
  "'DialVerb' | 'Conference' | 'OutboundAPI' | 'Trunking' | 'RecordVerb' | 'StartCallRecordingAPI' | 'StartConferenceRecordingAPI'",
).describe(
  'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
)

export type RecordingEnumSourceSchema = typeof RecordingEnumSourceSchema.infer

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

export type ApiV2010AccountRecordingSchema = typeof ApiV2010AccountRecordingSchema.infer

export const RecordingAddOnResultEnumStatusSchema = type(
  "'canceled' | 'completed' | 'deleted' | 'failed' | 'in-progress' | 'init' | 'processing' | 'queued'",
).describe(
  'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
)

export type RecordingAddOnResultEnumStatusSchema = typeof RecordingAddOnResultEnumStatusSchema.infer

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

export type ApiV2010AccountRecordingRecordingAddOnResultSchema =
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

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema =
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema.infer

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  type({
    'redirect_to?': type('string.url | null').describe(
      'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
    ),
  })

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema.infer

export const RecordingTranscriptionEnumStatusSchema = type(
  "'in-progress' | 'completed' | 'failed'",
).describe('The status of the transcription. Can be: `in-progress`, `completed`, `failed`.')

export type RecordingTranscriptionEnumStatusSchema =
  typeof RecordingTranscriptionEnumStatusSchema.infer

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

export type ApiV2010AccountRecordingRecordingTranscriptionSchema =
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

export type ApiV2010AccountShortCodeSchema = typeof ApiV2010AccountShortCodeSchema.infer

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

export type ApiV2010AccountSigningKeySchema = typeof ApiV2010AccountSigningKeySchema.infer

export const ApiV2010AccountSipSchema = type({})

export type ApiV2010AccountSipSchema = typeof ApiV2010AccountSipSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSchema = type({})

export type ApiV2010AccountSipSipDomainSipAuthSchema =
  typeof ApiV2010AccountSipSipDomainSipAuthSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = type({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema =
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

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
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

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema.infer

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = type({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema =
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

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
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

export type ApiV2010AccountSipSipCredentialListSipCredentialSchema =
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

export type ApiV2010AccountSipSipCredentialListSchema =
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

export type ApiV2010AccountSipSipDomainSipCredentialListMappingSchema =
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

export type ApiV2010AccountSipSipDomainSchema = typeof ApiV2010AccountSipSipDomainSchema.infer

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

export type ApiV2010AccountSipSipIpAccessControlListSchema =
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

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema =
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

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema =
  typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema.infer

export const SiprecEnumStatusSchema = type("'in-progress' | 'stopped'").describe(
  'The status - one of `stopped`, `in-progress`',
)

export type SiprecEnumStatusSchema = typeof SiprecEnumStatusSchema.infer

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

export type ApiV2010AccountCallSiprecSchema = typeof ApiV2010AccountCallSiprecSchema.infer

export const SiprecEnumTrackSchema = type(
  "'inbound_track' | 'outbound_track' | 'both_tracks'",
).describe('One of `inbound_track`, `outbound_track`, `both_tracks`.')

export type SiprecEnumTrackSchema = typeof SiprecEnumTrackSchema.infer

export const SiprecEnumUpdateStatusSchema = type("'stopped'")

export type SiprecEnumUpdateStatusSchema = typeof SiprecEnumUpdateStatusSchema.infer

export const SmsFeedbackEnumOutcomeSchema = type(
  "'confirmed' | 'unconfirmed' | 'received' | 'not-received' | 'delayed'",
)

export type SmsFeedbackEnumOutcomeSchema = typeof SmsFeedbackEnumOutcomeSchema.infer

export const SmsMessageEnumStatusSchema = type(
  "'queued' | 'sending' | 'sent' | 'failed' | 'delivered' | 'undelivered' | 'receiving' | 'received' | 'accepted' | 'scheduled' | 'read' | 'partially_delivered' | 'canceled'",
)

export type SmsMessageEnumStatusSchema = typeof SmsMessageEnumStatusSchema.infer

export const SmsMessageEnumUpdateStatusSchema = type("'canceled'")

export type SmsMessageEnumUpdateStatusSchema = typeof SmsMessageEnumUpdateStatusSchema.infer

export const SmsMessageEnumDirectionSchema = type(
  "'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply'",
)

export type SmsMessageEnumDirectionSchema = typeof SmsMessageEnumDirectionSchema.infer

export const StreamEnumStatusSchema = type("'in-progress' | 'stopped'").describe(
  'The status of the Stream. Possible values are `stopped` and `in-progress`.',
)

export type StreamEnumStatusSchema = typeof StreamEnumStatusSchema.infer

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

export type ApiV2010AccountCallStreamSchema = typeof ApiV2010AccountCallStreamSchema.infer

export const StreamEnumTrackSchema = type(
  "'inbound_track' | 'outbound_track' | 'both_tracks'",
).describe(
  'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
)

export type StreamEnumTrackSchema = typeof StreamEnumTrackSchema.infer

export const StreamEnumUpdateStatusSchema = type("'stopped'")

export type StreamEnumUpdateStatusSchema = typeof StreamEnumUpdateStatusSchema.infer

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

export type ApiV2010AccountTokenSchema = typeof ApiV2010AccountTokenSchema.infer

export const TranscriptionEnumStatusSchema = type(
  "'in-progress' | 'completed' | 'failed'",
).describe('The status of the transcription. Can be: `in-progress`, `completed`, `failed`.')

export type TranscriptionEnumStatusSchema = typeof TranscriptionEnumStatusSchema.infer

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

export type ApiV2010AccountTranscriptionSchema = typeof ApiV2010AccountTranscriptionSchema.infer

export const ApiV2010AccountUsageSchema = type({})

export type ApiV2010AccountUsageSchema = typeof ApiV2010AccountUsageSchema.infer

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

export type ApiV2010AccountUsageUsageRecordSchema =
  typeof ApiV2010AccountUsageUsageRecordSchema.infer

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

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordDailySchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema =
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

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema =
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema.infer

export const UsageTriggerEnumRecurringSchema = type(
  "'daily' | 'monthly' | 'yearly' | 'alltime'",
).describe(
  'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
)

export type UsageTriggerEnumRecurringSchema = typeof UsageTriggerEnumRecurringSchema.infer

export const UsageTriggerEnumTriggerFieldSchema = type("'count' | 'usage' | 'price'").describe(
  'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
)

export type UsageTriggerEnumTriggerFieldSchema = typeof UsageTriggerEnumTriggerFieldSchema.infer

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

export type ApiV2010AccountUsageUsageTriggerSchema =
  typeof ApiV2010AccountUsageUsageTriggerSchema.infer

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

export type ApiV2010AccountCallUserDefinedMessageSchema =
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

export type ApiV2010AccountCallUserDefinedMessageSubscriptionSchema =
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

export type ApiV2010AccountValidationRequestSchema =
  typeof ApiV2010AccountValidationRequestSchema.infer

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

export type ApiV2010AccountOutgoingCallerIdSmsVerificationSchema =
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

export type ApiV2010AccountOutgoingCallerIdVerificationCheckSchema =
  typeof ApiV2010AccountOutgoingCallerIdVerificationCheckSchema.infer
