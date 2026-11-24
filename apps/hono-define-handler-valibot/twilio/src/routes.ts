import { defineHandler } from 'hono/factory'
import * as v from 'valibot'

export const AccountEnumStatusSchema = v.pipe(
  v.picklist(['active', 'suspended', 'closed']),
  v.description(
    'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
  ),
)

export type AccountEnumStatus = v.InferOutput<typeof AccountEnumStatusSchema>

export const AccountEnumTypeSchema = v.pipe(
  v.picklist(['Trial', 'Full']),
  v.description("The type of this account. Either `Trial` or `Full` if it's been upgraded"),
)

export type AccountEnumType = v.InferOutput<typeof AccountEnumTypeSchema>

export const ApiV2010AccountSchema = v.partial(
  v.object({
    auth_token: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The authorization token for this account. This token should be kept a secret, so no sharing.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description('The date that this account was created, in GMT in RFC 2822 format'),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description('The date that this account was last updated, in GMT in RFC 2822 format.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.',
      ),
    ),
    owner_account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        "The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid.",
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
    status: AccountEnumStatusSchema,
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description('A Map of various subresources available for the given Account Instance'),
    ),
    type: AccountEnumTypeSchema,
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`'),
    ),
  }),
)

export type ApiV2010Account = v.InferOutput<typeof ApiV2010AccountSchema>

export const ApiV2010AccountAddressSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource.',
      ),
    ),
    city: v.pipe(
      v.nullable(v.string()),
      v.description('The city in which the address is located.'),
    ),
    customer_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    iso_country: v.pipe(
      v.nullable(v.string()),
      v.description('The ISO country code of the address.'),
    ),
    postal_code: v.pipe(v.nullable(v.string()), v.description('The postal code of the address.')),
    region: v.pipe(v.nullable(v.string()), v.description('The state or region of the address.')),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the Address resource.'),
    ),
    street: v.pipe(
      v.nullable(v.string()),
      v.description('The number and street address of the address.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    emergency_enabled: v.pipe(
      v.nullable(v.boolean()),
      v.description('Whether emergency calling has been enabled on this number.'),
    ),
    validated: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid.",
      ),
    ),
    verified: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid.",
      ),
    ),
    street_secondary: v.pipe(
      v.nullable(v.string()),
      v.description('The additional number and street address of the address.'),
    ),
  }),
)

export type ApiV2010AccountAddress = v.InferOutput<typeof ApiV2010AccountAddressSchema>

export const ApiV2010AccountApplicationSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to start a new TwiML session.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    message_status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using a POST method to send message status information to your application.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the Application resource.'),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.'),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using a POST method to send status information to your application about SMS messages that refer to the application.',
      ),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when the phone number receives an incoming SMS message.'),
    ),
    status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `status_callback_method` to send status information to your application.',
      ),
    ),
    status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    voice_caller_id_lookup: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
      ),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call when the phone number assigned to this application receives a call.',
      ),
    ),
    public_application_connect_enabled: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
      ),
    ),
  }),
)

export type ApiV2010AccountApplication = v.InferOutput<typeof ApiV2010AccountApplicationSchema>

export const AuthorizedConnectAppEnumPermissionSchema = v.pipe(
  v.picklist(['get-all', 'post-all']),
  v.description(
    'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
  ),
)

export type AuthorizedConnectAppEnumPermission = v.InferOutput<
  typeof AuthorizedConnectAppEnumPermissionSchema
>

export const ApiV2010AccountAuthorizedConnectAppSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource.',
      ),
    ),
    connect_app_company_name: v.pipe(
      v.nullable(v.string()),
      v.description('The company name set for the Connect App.'),
    ),
    connect_app_description: v.pipe(
      v.nullable(v.string()),
      v.description('A detailed description of the Connect App.'),
    ),
    connect_app_friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The name of the Connect App.'),
    ),
    connect_app_homepage_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The public URL for the Connect App.'),
    ),
    connect_app_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID that we assigned to the Connect App.'),
    ),
    permissions: v.pipe(
      v.nullable(v.array(AuthorizedConnectAppEnumPermissionSchema)),
      v.description(
        'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountAuthorizedConnectApp = v.InferOutput<
  typeof ApiV2010AccountAuthorizedConnectAppSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountrySchema = v.partial(
  v.object({
    country_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country.',
      ),
    ),
    country: v.pipe(v.nullable(v.string()), v.description('The name of the country.')),
    uri: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URI of the Country resource, relative to `https://api.twilio.com`.'),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`.',
      ),
    ),
  }),
)

export type ApiV2010AccountAvailablePhoneNumberCountry = v.InferOutput<
  typeof ApiV2010AccountAvailablePhoneNumberCountrySchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema = v.partial(
  v.object({
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('A formatted version of the phone number.'),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    lata: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      ),
    ),
    locality: v.pipe(
      v.nullable(v.string()),
      v.description("The locality or city of this phone number's location."),
    ),
    rate_center: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      ),
    ),
    latitude: v.pipe(
      v.nullable(v.number()),
      v.description(
        "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    longitude: v.pipe(
      v.nullable(v.number()),
      v.description(
        "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    region: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    postal_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    iso_country: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      ),
    ),
    address_requirements: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      ),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
  }),
)

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal = v.InferOutput<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
  v.partial(
    v.object({
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('A formatted version of the phone number.'),
      ),
      phone_number: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        ),
      ),
      lata: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      locality: v.pipe(
        v.nullable(v.string()),
        v.description("The locality or city of this phone number's location."),
      ),
      rate_center: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      latitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      longitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      region: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      postal_code: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      iso_country: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        ),
      ),
      address_requirements: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        ),
      ),
      beta: v.pipe(
        v.nullable(v.boolean()),
        v.description(
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        ),
      ),
      capabilities: v.pipe(
        v.nullable(
          v.partial(
            v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
          ),
        ),
        v.description(
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        ),
      ),
    }),
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine =
  v.InferOutput<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema = v.partial(
  v.object({
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('A formatted version of the phone number.'),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    lata: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      ),
    ),
    locality: v.pipe(
      v.nullable(v.string()),
      v.description("The locality or city of this phone number's location."),
    ),
    rate_center: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      ),
    ),
    latitude: v.pipe(
      v.nullable(v.number()),
      v.description(
        "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    longitude: v.pipe(
      v.nullable(v.number()),
      v.description(
        "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    region: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    postal_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    iso_country: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      ),
    ),
    address_requirements: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      ),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
  }),
)

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile = v.InferOutput<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema =
  v.partial(
    v.object({
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('A formatted version of the phone number.'),
      ),
      phone_number: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        ),
      ),
      lata: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      locality: v.pipe(
        v.nullable(v.string()),
        v.description("The locality or city of this phone number's location."),
      ),
      rate_center: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      latitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      longitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      region: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      postal_code: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      iso_country: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        ),
      ),
      address_requirements: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        ),
      ),
      beta: v.pipe(
        v.nullable(v.boolean()),
        v.description(
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        ),
      ),
      capabilities: v.pipe(
        v.nullable(
          v.partial(
            v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
          ),
        ),
        v.description(
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        ),
      ),
    }),
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational = v.InferOutput<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema =
  v.partial(
    v.object({
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('A formatted version of the phone number.'),
      ),
      phone_number: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        ),
      ),
      lata: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      locality: v.pipe(
        v.nullable(v.string()),
        v.description("The locality or city of this phone number's location."),
      ),
      rate_center: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      latitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      longitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      region: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      postal_code: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      iso_country: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        ),
      ),
      address_requirements: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        ),
      ),
      beta: v.pipe(
        v.nullable(v.boolean()),
        v.description(
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        ),
      ),
      capabilities: v.pipe(
        v.nullable(
          v.partial(
            v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
          ),
        ),
        v.description(
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        ),
      ),
    }),
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost =
  v.InferOutput<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema =
  v.partial(
    v.object({
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('A formatted version of the phone number.'),
      ),
      phone_number: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        ),
      ),
      lata: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      locality: v.pipe(
        v.nullable(v.string()),
        v.description("The locality or city of this phone number's location."),
      ),
      rate_center: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        ),
      ),
      latitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      longitude: v.pipe(
        v.nullable(v.number()),
        v.description(
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      region: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      postal_code: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        ),
      ),
      iso_country: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        ),
      ),
      address_requirements: v.pipe(
        v.nullable(v.string()),
        v.description(
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        ),
      ),
      beta: v.pipe(
        v.nullable(v.boolean()),
        v.description(
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        ),
      ),
      capabilities: v.pipe(
        v.nullable(
          v.partial(
            v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
          ),
        ),
        v.description(
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        ),
      ),
    }),
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree = v.InferOutput<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema = v.partial(
  v.object({
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('A formatted version of the phone number.'),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    lata: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      ),
    ),
    locality: v.pipe(
      v.nullable(v.string()),
      v.description("The locality or city of this phone number's location."),
    ),
    rate_center: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      ),
    ),
    latitude: v.pipe(
      v.nullable(v.number()),
      v.description(
        "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    longitude: v.pipe(
      v.nullable(v.number()),
      v.description(
        "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    region: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    postal_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      ),
    ),
    iso_country: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      ),
    ),
    address_requirements: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      ),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
  }),
)

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip = v.InferOutput<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema
>

export const ApiV2010AccountBalanceSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique SID identifier of the Account.'),
    ),
    balance: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
      ),
    ),
    currency: v.pipe(
      v.nullable(v.string()),
      v.description('The units of currency for the account balance'),
    ),
  }),
)

export type ApiV2010AccountBalance = v.InferOutput<typeof ApiV2010AccountBalanceSchema>

export const CallEnumStatusSchema = v.pipe(
  v.picklist([
    'queued',
    'ringing',
    'in-progress',
    'completed',
    'busy',
    'failed',
    'no-answer',
    'canceled',
  ]),
  v.description(
    'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
  ),
)

export type CallEnumStatus = v.InferOutput<typeof CallEnumStatusSchema>

export const ApiV2010AccountCallSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that we created to identify this Call resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    parent_call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID that identifies the call that created this leg.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource.',
      ),
    ),
    to: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
      ),
    ),
    to_formatted: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
      ),
    ),
    from: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
      ),
    ),
    from_formatted: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
      ),
    ),
    phone_number_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed.',
      ),
    ),
    status: CallEnumStatusSchema,
    start_time: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed.',
      ),
    ),
    end_time: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully.',
      ),
    ),
    duration: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls.',
      ),
    ),
    direction: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN.',
      ),
    ),
    answered_by: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the call.'),
    ),
    forwarded_from: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty.',
      ),
    ),
    group_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^GP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The Group SID associated with this call. If no Group is associated with the call, the field is empty.',
      ),
    ),
    caller_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty.",
      ),
    ),
    queue_time: v.pipe(
      v.nullable(v.string()),
      v.description('The wait time in milliseconds before the call is placed.'),
    ),
    stir_verstat: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The STIR/SHAKEN verification status of the call, for example `TN-Validation-Passed-A`. Empty if the incoming call had no STIR/SHAKEN information.',
      ),
    ),
    trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of this resource, relative to `https://api.twilio.com`.'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`.',
      ),
    ),
  }),
)

export type ApiV2010AccountCall = v.InferOutput<typeof ApiV2010AccountCallSchema>

export const CallEnumEventSchema = v.picklist(['initiated', 'ringing', 'answered', 'completed'])

export type CallEnumEvent = v.InferOutput<typeof CallEnumEventSchema>

export const CallEnumUpdateStatusSchema = v.picklist(['canceled', 'completed'])

export type CallEnumUpdateStatus = v.InferOutput<typeof CallEnumUpdateStatusSchema>

export const ApiV2010AccountCallCallEventSchema = v.partial(
  v.object({
    request: v.pipe(
      v.nullable(v.any()),
      v.description('Contains a dictionary representing the request of the call.'),
    ),
    response: v.pipe(
      v.nullable(v.any()),
      v.description(
        'Contains a dictionary representing the call response, including a list of the call events.',
      ),
    ),
  }),
)

export type ApiV2010AccountCallCallEvent = v.InferOutput<typeof ApiV2010AccountCallCallEventSchema>

export const ApiV2010AccountCallCallNotificationSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the Call Notification resource.'),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    error_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    log: v.pipe(
      v.nullable(v.string()),
      v.description(
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      ),
    ),
    message_date: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      ),
    ),
    message_text: v.pipe(v.nullable(v.string()), v.description('The text of the notification.')),
    more_info: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    request_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
      ),
    ),
    request_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Call Notification resource.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountCallCallNotification = v.InferOutput<
  typeof ApiV2010AccountCallCallNotificationSchema
>

export const ApiV2010AccountCallCallNotificationInstanceSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the Call Notification resource.'),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    error_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    log: v.pipe(
      v.nullable(v.string()),
      v.description(
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      ),
    ),
    message_date: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      ),
    ),
    message_text: v.pipe(v.nullable(v.string()), v.description('The text of the notification.')),
    more_info: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    request_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
      ),
    ),
    request_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      ),
    ),
    request_variables: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
      ),
    ),
    response_body: v.pipe(
      v.nullable(v.string()),
      v.description('The HTTP body returned by your server.'),
    ),
    response_headers: v.pipe(
      v.nullable(v.string()),
      v.description('The HTTP headers returned by your server.'),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Call Notification resource.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountCallCallNotificationInstance = v.InferOutput<
  typeof ApiV2010AccountCallCallNotificationInstanceSchema
>

export const CallRecordingEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent']),
  v.description(
    'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  ),
)

export type CallRecordingEnumStatus = v.InferOutput<typeof CallRecordingEnumStatusSchema>

export const CallRecordingEnumSourceSchema = v.pipe(
  v.picklist([
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ]),
  v.description(
    'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
  ),
)

export type CallRecordingEnumSource = v.InferOutput<typeof CallRecordingEnumSourceSchema>

export const ApiV2010AccountCallCallRecordingSchema = v.object({
  account_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
      ),
    ),
  ),
  api_version: v.optional(
    v.pipe(v.nullable(v.string()), v.description('The API version used to make the recording.')),
  ),
  call_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with.',
      ),
    ),
  ),
  conference_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
      ),
    ),
  ),
  date_created: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  ),
  date_updated: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  ),
  start_time: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
  ),
  duration: v.optional(
    v.pipe(v.nullable(v.string()), v.description('The length of the recording in seconds.')),
  ),
  sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the Recording resource.'),
    ),
  ),
  price: v.optional(
    v.pipe(
      v.nullable(v.number()),
      v.description('The one-time cost of creating the recording in the `price_unit` currency.'),
    ),
  ),
  uri: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  ),
  encryption_details: v.optional(
    v.pipe(
      v.nullable(v.any()),
      v.description(
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
      ),
    ),
  ),
  price_unit: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The currency used in the `price` property. Example: `USD`.'),
    ),
  ),
  status: v.optional(CallRecordingEnumStatusSchema),
  channels: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description(
      'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
    ),
  ),
  source: v.optional(CallRecordingEnumSourceSchema),
  error_code: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer())),
      v.description(
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
      ),
    ),
  ),
  track: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The recorded track. Can be: `inbound`, `outbound`, or `both`.'),
    ),
  ),
})

export type ApiV2010AccountCallCallRecording = v.InferOutput<
  typeof ApiV2010AccountCallCallRecordingSchema
>

export const ConferenceEnumStatusSchema = v.pipe(
  v.picklist(['init', 'in-progress', 'completed']),
  v.description('The status of this conference. Can be: `init`, `in-progress`, or `completed`.'),
)

export type ConferenceEnumStatus = v.InferOutput<typeof ConferenceEnumStatusSchema>

export const ConferenceEnumReasonConferenceEndedSchema = v.pipe(
  v.picklist([
    'conference-ended-via-api',
    'participant-with-end-conference-on-exit-left',
    'participant-with-end-conference-on-exit-kicked',
    'last-participant-kicked',
    'last-participant-left',
  ]),
  v.description(
    'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
  ),
)

export type ConferenceEnumReasonConferenceEnded = v.InferOutput<
  typeof ConferenceEnumReasonConferenceEndedSchema
>

export const ApiV2010AccountConferenceSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create this conference.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A string that you assigned to describe this conference room. Maximum length is 128 characters.',
      ),
    ),
    region: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique, Twilio-provided string used to identify this Conference resource.',
      ),
    ),
    status: ConferenceEnumStatusSchema,
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of this resource, relative to `https://api.twilio.com`.'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs relative to `https://api.twilio.com`.',
      ),
    ),
    reason_conference_ended: ConferenceEnumReasonConferenceEndedSchema,
    call_sid_ending_conference: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The call SID that caused the conference to end.'),
    ),
  }),
)

export type ApiV2010AccountConference = v.InferOutput<typeof ApiV2010AccountConferenceSchema>

export const ConferenceEnumUpdateStatusSchema = v.literal('completed')

export type ConferenceEnumUpdateStatus = v.InferOutput<typeof ConferenceEnumUpdateStatusSchema>

export const ConferenceRecordingEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent']),
  v.description(
    'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  ),
)

export type ConferenceRecordingEnumStatus = v.InferOutput<
  typeof ConferenceRecordingEnumStatusSchema
>

export const ConferenceRecordingEnumSourceSchema = v.pipe(
  v.picklist([
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ]),
  v.description(
    'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
  ),
)

export type ConferenceRecordingEnumSource = v.InferOutput<
  typeof ConferenceRecordingEnumSourceSchema
>

export const ApiV2010AccountConferenceConferenceRecordingSchema = v.object({
  account_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource.',
      ),
    ),
  ),
  api_version: v.optional(
    v.pipe(v.nullable(v.string()), v.description('The API version used to create the recording.')),
  ),
  call_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with.',
      ),
    ),
  ),
  conference_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The Conference SID that identifies the conference associated with the recording.',
      ),
    ),
  ),
  date_created: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  ),
  date_updated: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  ),
  start_time: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
  ),
  duration: v.optional(
    v.pipe(v.nullable(v.string()), v.description('The length of the recording in seconds.')),
  ),
  sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Conference Recording resource.',
      ),
    ),
  ),
  price: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The one-time cost of creating the recording in the `price_unit` currency.'),
    ),
  ),
  price_unit: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The currency used in the `price` property. Example: `USD`.'),
    ),
  ),
  status: v.optional(ConferenceRecordingEnumStatusSchema),
  channels: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description(
      'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
    ),
  ),
  source: v.optional(ConferenceRecordingEnumSourceSchema),
  error_code: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer())),
      v.description(
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
      ),
    ),
  ),
  encryption_details: v.optional(
    v.pipe(
      v.nullable(v.any()),
      v.description(
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
      ),
    ),
  ),
  uri: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  ),
})

export type ApiV2010AccountConferenceConferenceRecording = v.InferOutput<
  typeof ApiV2010AccountConferenceConferenceRecordingSchema
>

export const ConnectAppEnumPermissionSchema = v.pipe(
  v.picklist(['get-all', 'post-all']),
  v.description('The set of permissions that your ConnectApp requests.'),
)

export type ConnectAppEnumPermission = v.InferOutput<typeof ConnectAppEnumPermissionSchema>

export const ApiV2010AccountConnectAppSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource.',
      ),
    ),
    authorize_redirect_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
      ),
    ),
    company_name: v.pipe(
      v.nullable(v.string()),
      v.description('The company name set for the Connect App.'),
    ),
    deauthorize_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `deauthorize_callback_url`.'),
    ),
    deauthorize_callback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('The description of the Connect App.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    homepage_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The public URL where users can obtain more information about this Connect App.',
      ),
    ),
    permissions: v.pipe(
      v.nullable(v.array(ConnectAppEnumPermissionSchema)),
      v.description('The set of permissions that your ConnectApp requests.'),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the ConnectApp resource.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountConnectApp = v.InferOutput<typeof ApiV2010AccountConnectAppSchema>

export const DependentPhoneNumberEnumAddressRequirementSchema = v.pipe(
  v.picklist(['none', 'any', 'local', 'foreign']),
  v.description(
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  ),
)

export type DependentPhoneNumberEnumAddressRequirement = v.InferOutput<
  typeof DependentPhoneNumberEnumAddressRequirementSchema
>

export const DependentPhoneNumberEnumEmergencyStatusSchema = v.pipe(
  v.picklist(['Active', 'Inactive']),
  v.description('Whether the phone number is enabled for emergency calling.'),
)

export type DependentPhoneNumberEnumEmergencyStatus = v.InferOutput<
  typeof DependentPhoneNumberEnumEmergencyStatusSchema
>

export const ApiV2010AccountAddressDependentPhoneNumberSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the DependentPhoneNumber resource.',
      ),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
    ),
    voice_caller_id_lookup: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each.",
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.'),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when the phone number receives an incoming SMS message.'),
    ),
    address_requirements: DependentPhoneNumberEnumAddressRequirementSchema,
    capabilities: v.pipe(
      v.nullable(v.any()),
      v.description(
        'The set of Boolean properties that indicates whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
    status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `status_callback_method` to send status information to your application.',
      ),
    ),
    status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.'),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to start a new TwiML session.'),
    ),
    sms_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      ),
    ),
    voice_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      ),
    ),
    trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      ),
    ),
    emergency_status: DependentPhoneNumberEnumEmergencyStatusSchema,
    emergency_address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the emergency address configuration that we use for emergency calling from the phone number.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountAddressDependentPhoneNumber = v.InferOutput<
  typeof ApiV2010AccountAddressDependentPhoneNumberSchema
>

export const IncomingPhoneNumberEnumAddressRequirementSchema = v.pipe(
  v.picklist(['none', 'any', 'local', 'foreign']),
  v.description(
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  ),
)

export type IncomingPhoneNumberEnumAddressRequirement = v.InferOutput<
  typeof IncomingPhoneNumberEnumAddressRequirementSchema
>

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = v.picklist(['voice', 'fax'])

export type IncomingPhoneNumberEnumVoiceReceiveMode = v.InferOutput<
  typeof IncomingPhoneNumberEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberEnumEmergencyStatusSchema = v.pipe(
  v.picklist(['Active', 'Inactive']),
  v.description(
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  ),
)

export type IncomingPhoneNumberEnumEmergencyStatus = v.InferOutput<
  typeof IncomingPhoneNumberEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = v.pipe(
  v.picklist([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ]),
  v.description(
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  ),
)

export type IncomingPhoneNumberEnumEmergencyAddressStatus = v.InferOutput<
  typeof IncomingPhoneNumberEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource.',
      ),
    ),
    address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Address resource associated with the phone number.'),
    ),
    address_requirements: IncomingPhoneNumberEnumAddressRequirementSchema,
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to start a new TwiML session.'),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    identity_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      ),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    origin: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify this IncomingPhoneNumber resource.',
      ),
    ),
    sms_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      ),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.'),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when the phone number receives an incoming SMS message.'),
    ),
    status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `status_callback_method` to send status information to your application.',
      ),
    ),
    status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.'),
    ),
    trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    voice_receive_mode: IncomingPhoneNumberEnumVoiceReceiveModeSchema,
    voice_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      ),
    ),
    voice_caller_id_lookup: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      ),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
    ),
    emergency_status: IncomingPhoneNumberEnumEmergencyStatusSchema,
    emergency_address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      ),
    ),
    emergency_address_status: IncomingPhoneNumberEnumEmergencyAddressStatusSchema,
    bundle_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      ),
    ),
    status: v.nullable(v.string()),
    type: v.pipe(v.nullable(v.string()), v.description('The phone number type.')),
  }),
)

export type ApiV2010AccountIncomingPhoneNumber = v.InferOutput<
  typeof ApiV2010AccountIncomingPhoneNumberSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      ),
    ),
    resource_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Phone Number to which the Add-on is assigned.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A short description of the functionality that the Add-on provides.'),
    ),
    configuration: v.pipe(
      v.nullable(v.any()),
      v.description(
        'A JSON string that represents the current configuration of this Add-on installation.',
      ),
    ),
    unique_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description('A list of related resources identified by their relative URIs.'),
    ),
  }),
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn = v.InferOutput<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  v.partial(
    v.object({
      sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^XF[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description('The unique string that that we created to identify the resource.'),
      ),
      account_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
        ),
      ),
      resource_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description('The SID of the Phone Number to which the Add-on is assigned.'),
      ),
      assigned_add_on_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description('The SID that uniquely identifies the assigned Add-on installation.'),
      ),
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('The string that you assigned to describe the resource.'),
      ),
      product_name: v.pipe(
        v.nullable(v.string()),
        v.description(
          'A string that you assigned to describe the Product this Extension is used within.',
        ),
      ),
      unique_name: v.pipe(
        v.nullable(v.string()),
        v.description(
          "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
        ),
      ),
      uri: v.pipe(
        v.nullable(v.string()),
        v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
      ),
      enabled: v.pipe(
        v.nullable(v.boolean()),
        v.description('Whether the Extension will be invoked.'),
      ),
    }),
  )

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension =
  v.InferOutput<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = v.pipe(
  v.picklist(['none', 'any', 'local', 'foreign']),
  v.description(
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  ),
)

export type IncomingPhoneNumberLocalEnumAddressRequirement = v.InferOutput<
  typeof IncomingPhoneNumberLocalEnumAddressRequirementSchema
>

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = v.picklist(['voice', 'fax'])

export type IncomingPhoneNumberLocalEnumVoiceReceiveMode = v.InferOutput<
  typeof IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = v.pipe(
  v.picklist(['Active', 'Inactive']),
  v.description(
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  ),
)

export type IncomingPhoneNumberLocalEnumEmergencyStatus = v.InferOutput<
  typeof IncomingPhoneNumberLocalEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = v.pipe(
  v.picklist([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ]),
  v.description(
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  ),
)

export type IncomingPhoneNumberLocalEnumEmergencyAddressStatus = v.InferOutput<
  typeof IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      ),
    ),
    address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Address resource associated with the phone number.'),
    ),
    address_requirements: IncomingPhoneNumberLocalEnumAddressRequirementSchema,
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to start a new TwiML session.'),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    identity_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      ),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    origin: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the resource.'),
    ),
    sms_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      ),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.'),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when the phone number receives an incoming SMS message.'),
    ),
    status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `status_callback_method` to send status information to your application.',
      ),
    ),
    status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.'),
    ),
    trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    voice_receive_mode: IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
    voice_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      ),
    ),
    voice_caller_id_lookup: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      ),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
    ),
    emergency_status: IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
    emergency_address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      ),
    ),
    emergency_address_status: IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema,
    bundle_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      ),
    ),
    status: v.nullable(v.string()),
  }),
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal = v.InferOutput<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema
>

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = v.pipe(
  v.picklist(['none', 'any', 'local', 'foreign']),
  v.description(
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  ),
)

export type IncomingPhoneNumberMobileEnumAddressRequirement = v.InferOutput<
  typeof IncomingPhoneNumberMobileEnumAddressRequirementSchema
>

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = v.picklist(['voice', 'fax'])

export type IncomingPhoneNumberMobileEnumVoiceReceiveMode = v.InferOutput<
  typeof IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = v.pipe(
  v.picklist(['Active', 'Inactive']),
  v.description(
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  ),
)

export type IncomingPhoneNumberMobileEnumEmergencyStatus = v.InferOutput<
  typeof IncomingPhoneNumberMobileEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = v.pipe(
  v.picklist([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ]),
  v.description(
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  ),
)

export type IncomingPhoneNumberMobileEnumEmergencyAddressStatus = v.InferOutput<
  typeof IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      ),
    ),
    address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Address resource associated with the phone number.'),
    ),
    address_requirements: IncomingPhoneNumberMobileEnumAddressRequirementSchema,
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to start a new TwiML session.'),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    identity_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      ),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    origin: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the resource.'),
    ),
    sms_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      ),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.'),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when the phone number receives an incoming SMS message.'),
    ),
    status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `status_callback_method` to send status information to your application.',
      ),
    ),
    status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.'),
    ),
    trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    voice_receive_mode: IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
    voice_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      ),
    ),
    voice_caller_id_lookup: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      ),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
    ),
    emergency_status: IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
    emergency_address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      ),
    ),
    emergency_address_status: IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema,
    bundle_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      ),
    ),
    status: v.nullable(v.string()),
  }),
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile = v.InferOutput<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema
>

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = v.pipe(
  v.picklist(['none', 'any', 'local', 'foreign']),
  v.description(
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  ),
)

export type IncomingPhoneNumberTollFreeEnumAddressRequirement = v.InferOutput<
  typeof IncomingPhoneNumberTollFreeEnumAddressRequirementSchema
>

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = v.picklist(['voice', 'fax'])

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveMode = v.InferOutput<
  typeof IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = v.pipe(
  v.picklist(['Active', 'Inactive']),
  v.description(
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  ),
)

export type IncomingPhoneNumberTollFreeEnumEmergencyStatus = v.InferOutput<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = v.pipe(
  v.picklist([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ]),
  v.description(
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  ),
)

export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus = v.InferOutput<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      ),
    ),
    address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Address resource associated with the phone number.'),
    ),
    address_requirements: IncomingPhoneNumberTollFreeEnumAddressRequirementSchema,
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to start a new TwiML session.'),
    ),
    beta: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      ),
    ),
    capabilities: v.pipe(
      v.nullable(
        v.partial(
          v.object({ mms: v.boolean(), sms: v.boolean(), voice: v.boolean(), fax: v.boolean() }),
        ),
      ),
      v.description(
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    identity_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RI[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      ),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    origin: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the resource.'),
    ),
    sms_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      ),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.'),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when the phone number receives an incoming SMS message.'),
    ),
    status_callback: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call using the `status_callback_method` to send status information to your application.',
      ),
    ),
    status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.'),
    ),
    trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    voice_receive_mode: IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
    voice_application_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      ),
    ),
    voice_caller_id_lookup: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      ),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      ),
    ),
    emergency_status: IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
    emergency_address_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      ),
    ),
    emergency_address_status: IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema,
    bundle_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^BU[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      ),
    ),
    status: v.nullable(v.string()),
  }),
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree = v.InferOutput<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema
>

export const ApiV2010AccountKeySchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the Key resource.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  }),
)

export type ApiV2010AccountKey = v.InferOutput<typeof ApiV2010AccountKeySchema>

export const ApiV2010AccountMessageMediaSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource.',
      ),
    ),
    content_type: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    parent_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Message resource that is associated with this Media resource.'),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that identifies this Media resource.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of this Media resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountMessageMedia = v.InferOutput<typeof ApiV2010AccountMessageMediaSchema>

export const ApiV2010AccountQueueMemberSchema = v.object({
  call_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with.',
      ),
    ),
  ),
  date_enqueued: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The date that the member was enqueued, given in RFC 2822 format.'),
    ),
  ),
  position: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description("This member's current position in the queue."),
  ),
  uri: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  ),
  wait_time: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description('The number of seconds the member has been in the queue.'),
  ),
  queue_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Queue the member is in.'),
    ),
  ),
})

export type ApiV2010AccountQueueMember = v.InferOutput<typeof ApiV2010AccountQueueMemberSchema>

export const MessageEnumDirectionSchema = v.pipe(
  v.picklist(['inbound', 'outbound-api', 'outbound-call', 'outbound-reply']),
  v.description(
    'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
  ),
)

export type MessageEnumDirection = v.InferOutput<typeof MessageEnumDirectionSchema>

export const MessageEnumStatusSchema = v.pipe(
  v.picklist([
    'queued',
    'sending',
    'sent',
    'failed',
    'delivered',
    'undelivered',
    'receiving',
    'received',
    'accepted',
    'scheduled',
    'read',
    'partially_delivered',
    'canceled',
  ]),
  v.description(
    'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
  ),
)

export type MessageEnumStatus = v.InferOutput<typeof MessageEnumStatusSchema>

export const ApiV2010AccountMessageSchema = v.partial(
  v.object({
    body: v.pipe(v.nullable(v.string()), v.description('The text content of the message')),
    num_segments: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned.",
      ),
    ),
    direction: MessageEnumDirectionSchema,
    from: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.",
      ),
    ),
    to: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)",
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated',
      ),
    ),
    price: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details.',
      ),
    ),
    error_message: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the Message resource, relative to `https://api.twilio.com`.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource',
      ),
    ),
    num_media: v.pipe(
      v.nullable(v.string()),
      v.description('The number of media files associated with the Message resource.'),
    ),
    status: MessageEnumStatusSchema,
    messaging_service_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^MG[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique, Twilio-provided string that identifies the Message resource.'),
    ),
    date_sent: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created',
      ),
    ),
    error_code: v.pipe(
      v.nullable(v.pipe(v.number(), v.integer())),
      v.description(
        'The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to process the Message'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs relative to `https://api.twilio.com`',
      ),
    ),
  }),
)

export type ApiV2010AccountMessage = v.InferOutput<typeof ApiV2010AccountMessageSchema>

export const MessageEnumUpdateStatusSchema = v.literal('canceled')

export type MessageEnumUpdateStatus = v.InferOutput<typeof MessageEnumUpdateStatusSchema>

export const MessageEnumContentRetentionSchema = v.pipe(
  v.picklist(['retain', 'discard']),
  v.description(
    'Determines if the message content can be stored or redacted based on privacy settings',
  ),
)

export type MessageEnumContentRetention = v.InferOutput<typeof MessageEnumContentRetentionSchema>

export const MessageEnumAddressRetentionSchema = v.pipe(
  v.picklist(['retain', 'obfuscate']),
  v.description('Determines if the address can be stored or obfuscated based on privacy settings'),
)

export type MessageEnumAddressRetention = v.InferOutput<typeof MessageEnumAddressRetentionSchema>

export const MessageEnumTrafficTypeSchema = v.literal('free')

export type MessageEnumTrafficType = v.InferOutput<typeof MessageEnumTrafficTypeSchema>

export const MessageEnumScheduleTypeSchema = v.pipe(
  v.literal('fixed'),
  v.description(
    'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
  ),
)

export type MessageEnumScheduleType = v.InferOutput<typeof MessageEnumScheduleTypeSchema>

export const MessageEnumRiskCheckSchema = v.pipe(
  v.picklist(['enable', 'disable']),
  v.description(
    'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
  ),
)

export type MessageEnumRiskCheck = v.InferOutput<typeof MessageEnumRiskCheckSchema>

export const MessageFeedbackEnumOutcomeSchema = v.pipe(
  v.picklist(['confirmed', 'unconfirmed']),
  v.description(
    'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
  ),
)

export type MessageFeedbackEnumOutcome = v.InferOutput<typeof MessageFeedbackEnumOutcomeSchema>

export const ApiV2010AccountMessageMessageFeedbackSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource.',
      ),
    ),
    message_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the Message resource associated with this MessageFeedback resource.',
      ),
    ),
    outcome: MessageFeedbackEnumOutcomeSchema,
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountMessageMessageFeedback = v.InferOutput<
  typeof ApiV2010AccountMessageMessageFeedbackSchema
>

export const ApiV2010AccountNewKeySchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    secret: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
      ),
    ),
  }),
)

export type ApiV2010AccountNewKey = v.InferOutput<typeof ApiV2010AccountNewKeySchema>

export const ApiV2010AccountNewSigningKeySchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the NewSigningKey resource.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    secret: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
      ),
    ),
  }),
)

export type ApiV2010AccountNewSigningKey = v.InferOutput<typeof ApiV2010AccountNewSigningKeySchema>

export const ApiV2010AccountNotificationSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    error_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    log: v.pipe(
      v.nullable(v.string()),
      v.description(
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      ),
    ),
    message_date: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      ),
    ),
    message_text: v.pipe(v.nullable(v.string()), v.description('The text of the notification.')),
    more_info: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    request_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
      ),
    ),
    request_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Notification resource.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountNotification = v.InferOutput<typeof ApiV2010AccountNotificationSchema>

export const ApiV2010AccountNotificationInstanceSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    error_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    log: v.pipe(
      v.nullable(v.string()),
      v.description(
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      ),
    ),
    message_date: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      ),
    ),
    message_text: v.pipe(v.nullable(v.string()), v.description('The text of the notification.')),
    more_info: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      ),
    ),
    request_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
      ),
    ),
    request_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      ),
    ),
    request_variables: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
      ),
    ),
    response_body: v.pipe(
      v.nullable(v.string()),
      v.description('The HTTP body returned by your server.'),
    ),
    response_headers: v.pipe(
      v.nullable(v.string()),
      v.description('The HTTP headers returned by your server.'),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Notification resource.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountNotificationInstance = v.InferOutput<
  typeof ApiV2010AccountNotificationInstanceSchema
>

export const ApiV2010AccountOutgoingCallerIdSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the OutgoingCallerId resource.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource.',
      ),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountOutgoingCallerId = v.InferOutput<
  typeof ApiV2010AccountOutgoingCallerIdSchema
>

export const ParticipantEnumStatusSchema = v.pipe(
  v.picklist(['queued', 'connecting', 'ringing', 'connected', 'complete', 'failed']),
  v.description(
    "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
  ),
)

export type ParticipantEnumStatus = v.InferOutput<typeof ParticipantEnumStatusSchema>

export const ApiV2010AccountConferenceParticipantSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with.',
      ),
    ),
    label: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.',
      ),
    ),
    call_sid_to_coach: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
      ),
    ),
    coaching: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
      ),
    ),
    conference_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the conference the participant is in.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    end_conference_on_exit: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves.',
      ),
    ),
    muted: v.pipe(
      v.nullable(v.boolean()),
      v.description('Whether the participant is muted. Can be `true` or `false`.'),
    ),
    hold: v.pipe(
      v.nullable(v.boolean()),
      v.description('Whether the participant is on hold. Can be `true` or `false`.'),
    ),
    start_conference_on_enter: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
      ),
    ),
    status: ParticipantEnumStatusSchema,
    queue_time: v.pipe(
      v.nullable(v.string()),
      v.description(
        "The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.",
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountConferenceParticipant = v.InferOutput<
  typeof ApiV2010AccountConferenceParticipantSchema
>

export const ApiV2010AccountCallPaymentsSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PK[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Payments resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountCallPayments = v.InferOutput<typeof ApiV2010AccountCallPaymentsSchema>

export const PaymentsEnumPaymentMethodSchema = v.pipe(
  v.picklist(['credit-card', 'ach-debit']),
  v.description(
    'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
  ),
)

export type PaymentsEnumPaymentMethod = v.InferOutput<typeof PaymentsEnumPaymentMethodSchema>

export const PaymentsEnumBankAccountTypeSchema = v.pipe(
  v.picklist(['consumer-checking', 'consumer-savings', 'commercial-checking']),
  v.description(
    'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
  ),
)

export type PaymentsEnumBankAccountType = v.InferOutput<typeof PaymentsEnumBankAccountTypeSchema>

export const PaymentsEnumTokenTypeSchema = v.pipe(
  v.picklist(['one-time', 'reusable', 'payment-method']),
  v.description(
    'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
  ),
)

export type PaymentsEnumTokenType = v.InferOutput<typeof PaymentsEnumTokenTypeSchema>

export const PaymentsEnumCaptureSchema = v.pipe(
  v.picklist([
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
  ]),
  v.description(
    'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
  ),
)

export type PaymentsEnumCapture = v.InferOutput<typeof PaymentsEnumCaptureSchema>

export const PaymentsEnumStatusSchema = v.pipe(
  v.picklist(['complete', 'cancel']),
  v.description(
    'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
  ),
)

export type PaymentsEnumStatus = v.InferOutput<typeof PaymentsEnumStatusSchema>

export const ApiV2010AccountQueueSchema = v.object({
  date_updated: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  ),
  current_size: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description('The number of calls currently in the queue.'),
  ),
  friendly_name: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('A string that you assigned to describe this resource.'),
    ),
  ),
  uri: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The URI of this resource, relative to `https://api.twilio.com`.'),
    ),
  ),
  account_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource.',
      ),
    ),
  ),
  average_wait_time: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description(
      ' The average wait time in seconds of the members in this queue. This is calculated at the time of the request.',
    ),
  ),
  sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify this Queue resource.'),
    ),
  ),
  date_created: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
  ),
  max_size: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description(
      ' The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.',
    ),
  ),
})

export type ApiV2010AccountQueue = v.InferOutput<typeof ApiV2010AccountQueueSchema>

export const RealtimeTranscriptionEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'stopped']),
  v.description('The status - one of `stopped`, `in-flight`'),
)

export type RealtimeTranscriptionEnumStatus = v.InferOutput<
  typeof RealtimeTranscriptionEnumStatusSchema
>

export const ApiV2010AccountCallRealtimeTranscriptionSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^GT[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Transcription resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.',
      ),
    ),
    name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
      ),
    ),
    status: RealtimeTranscriptionEnumStatusSchema,
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    uri: v.nullable(v.string()),
  }),
)

export type ApiV2010AccountCallRealtimeTranscription = v.InferOutput<
  typeof ApiV2010AccountCallRealtimeTranscriptionSchema
>

export const RealtimeTranscriptionEnumTrackSchema = v.pipe(
  v.picklist(['inbound_track', 'outbound_track', 'both_tracks']),
  v.description('One of `inbound_track`, `outbound_track`, `both_tracks`.'),
)

export type RealtimeTranscriptionEnumTrack = v.InferOutput<
  typeof RealtimeTranscriptionEnumTrackSchema
>

export const RealtimeTranscriptionEnumUpdateStatusSchema = v.literal('stopped')

export type RealtimeTranscriptionEnumUpdateStatus = v.InferOutput<
  typeof RealtimeTranscriptionEnumUpdateStatusSchema
>

export const RecordingEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent', 'deleted']),
  v.description(
    'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  ),
)

export type RecordingEnumStatus = v.InferOutput<typeof RecordingEnumStatusSchema>

export const RecordingEnumSourceSchema = v.pipe(
  v.picklist([
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ]),
  v.description(
    'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
  ),
)

export type RecordingEnumSource = v.InferOutput<typeof RecordingEnumSourceSchema>

export const ApiV2010AccountRecordingSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used during the recording.'),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call.',
      ),
    ),
    conference_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    start_time: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    duration: v.pipe(
      v.nullable(v.string()),
      v.description('The length of the recording in seconds.'),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the Recording resource.'),
    ),
    price: v.pipe(
      v.nullable(v.string()),
      v.description('The one-time cost of creating the recording in the `price_unit` currency.'),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description('The currency used in the `price` property. Example: `USD`.'),
    ),
    status: RecordingEnumStatusSchema,
    channels: v.pipe(
      v.nullable(v.pipe(v.number(), v.integer())),
      v.description(
        'The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file).',
      ),
    ),
    source: RecordingEnumSourceSchema,
    error_code: v.pipe(
      v.nullable(v.pipe(v.number(), v.integer())),
      v.description(
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    encryption_details: v.pipe(
      v.nullable(v.any()),
      v.description(
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description('A list of related resources identified by their relative URIs.'),
    ),
    media_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file.',
      ),
    ),
  }),
)

export type ApiV2010AccountRecording = v.InferOutput<typeof ApiV2010AccountRecordingSchema>

export const RecordingAddOnResultEnumStatusSchema = v.pipe(
  v.picklist([
    'canceled',
    'completed',
    'deleted',
    'failed',
    'in-progress',
    'init',
    'processing',
    'queued',
  ]),
  v.description(
    'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
  ),
)

export type RecordingAddOnResultEnumStatus = v.InferOutput<
  typeof RecordingAddOnResultEnumStatusSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Recording AddOnResult resource.',
      ),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource.',
      ),
    ),
    status: RecordingAddOnResultEnumStatusSchema,
    add_on_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^XB[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Add-on to which the result belongs.'),
    ),
    add_on_configuration_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Add-on configuration.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_completed: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    reference_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the recording to which the AddOnResult resource belongs.'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description('A list of related resources identified by their relative URIs.'),
    ),
  }),
)

export type ApiV2010AccountRecordingRecordingAddOnResult = v.InferOutput<
  typeof ApiV2010AccountRecordingRecordingAddOnResultSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema =
  v.partial(
    v.object({
      sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The unique string that that we created to identify the Recording AddOnResult Payload resource.',
        ),
      ),
      add_on_result_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description('The SID of the AddOnResult to which the payload belongs.'),
      ),
      account_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource.',
        ),
      ),
      label: v.pipe(
        v.nullable(v.string()),
        v.description('The string provided by the vendor that describes the payload.'),
      ),
      add_on_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^XB[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description('The SID of the Add-on to which the result belongs.'),
      ),
      add_on_configuration_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description('The SID of the Add-on configuration.'),
      ),
      content_type: v.pipe(v.nullable(v.string()), v.description('The MIME type of the payload.')),
      date_created: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      date_updated: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      reference_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The SID of the recording to which the AddOnResult resource that contains the payload belongs.',
        ),
      ),
      subresource_uris: v.pipe(
        v.nullable(v.object({})),
        v.description('A list of related resources identified by their relative URIs.'),
      ),
    }),
  )

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload = v.InferOutput<
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  v.partial(
    v.object({
      redirect_to: v.pipe(
        v.nullable(v.pipe(v.string(), v.url())),
        v.description(
          'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
        ),
      ),
    }),
  )

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData =
  v.InferOutput<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema
  >

export const RecordingTranscriptionEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'completed', 'failed']),
  v.description('The status of the transcription. Can be: `in-progress`, `completed`, `failed`.'),
)

export type RecordingTranscriptionEnumStatus = v.InferOutput<
  typeof RecordingTranscriptionEnumStatusSchema
>

export const ApiV2010AccountRecordingRecordingTranscriptionSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the transcription.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    duration: v.pipe(
      v.nullable(v.string()),
      v.description('The duration of the transcribed audio in seconds.'),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
      ),
    ),
    recording_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Transcription resource.',
      ),
    ),
    status: RecordingTranscriptionEnumStatusSchema,
    transcription_text: v.pipe(
      v.nullable(v.string()),
      v.description('The text content of the transcription.'),
    ),
    type: v.pipe(v.nullable(v.string()), v.description('The transcription type.')),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountRecordingRecordingTranscription = v.InferOutput<
  typeof ApiV2010AccountRecordingRecordingTranscriptionSchema
>

export const ApiV2010AccountShortCodeSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The API version used to start a new TwiML session when an SMS message is sent to this short code.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code.',
      ),
    ),
    short_code: v.pipe(v.nullable(v.string()), v.description('The short code. e.g., 894546.')),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify this ShortCode resource.'),
    ),
    sms_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    sms_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
      ),
    ),
    sms_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`.'),
    ),
    sms_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call when receiving an incoming SMS message to this short code.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of this resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountShortCode = v.InferOutput<typeof ApiV2010AccountShortCodeSchema>

export const ApiV2010AccountSigningKeySchema = v.partial(
  v.object({
    sid: v.nullable(v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34))),
    friendly_name: v.nullable(v.string()),
    date_created: v.nullable(v.string()),
    date_updated: v.nullable(v.string()),
  }),
)

export type ApiV2010AccountSigningKey = v.InferOutput<typeof ApiV2010AccountSigningKeySchema>

export const ApiV2010AccountSipSchema = v.partial(v.object({}))

export type ApiV2010AccountSip = v.InferOutput<typeof ApiV2010AccountSipSchema>

export const ApiV2010AccountSipSipDomainSipAuthSchema = v.partial(v.object({}))

export type ApiV2010AccountSipSipDomainSipAuth = v.InferOutput<
  typeof ApiV2010AccountSipSipDomainSipAuthSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = v.partial(v.object({}))

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCalls = v.InferOutput<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
  v.partial(
    v.object({
      account_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
        ),
      ),
      date_created: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      date_updated: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('The string that you assigned to describe the resource.'),
      ),
      sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The unique string that that we created to identify the CredentialListMapping resource.',
        ),
      ),
    }),
  )

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping =
  v.InferOutput<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  v.partial(
    v.object({
      account_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource.',
        ),
      ),
      date_created: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      date_updated: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('The string that you assigned to describe the resource.'),
      ),
      sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The unique string that that we created to identify the IpAccessControlListMapping resource.',
        ),
      ),
    }),
  )

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping =
  v.InferOutput<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = v.partial(v.object({}))

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrations = v.InferOutput<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
  v.partial(
    v.object({
      account_sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
        ),
      ),
      date_created: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      date_updated: v.pipe(
        v.nullable(v.string()),
        v.description(
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        ),
      ),
      friendly_name: v.pipe(
        v.nullable(v.string()),
        v.description('The string that you assigned to describe the resource.'),
      ),
      sid: v.pipe(
        v.nullable(v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34))),
        v.description(
          'The unique string that that we created to identify the CredentialListMapping resource.',
        ),
      ),
    }),
  )

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping =
  v.InferOutput<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipCredentialListSipCredentialSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique id of the Account that is responsible for this resource.'),
    ),
    credential_list_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique id that identifies the credential list that includes this credential.',
      ),
    ),
    username: v.pipe(v.nullable(v.string()), v.description('The username for this credential.')),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`'),
    ),
  }),
)

export type ApiV2010AccountSipSipCredentialListSipCredential = v.InferOutput<
  typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema
>

export const ApiV2010AccountSipSipCredentialListSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description('A list of credentials associated with this credential list.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountSipSipCredentialList = v.InferOutput<
  typeof ApiV2010AccountSipSipCredentialListSchema
>

export const ApiV2010AccountSipSipDomainSipCredentialListMappingSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique id of the Account that is responsible for this resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    domain_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that is created to identify the SipDomain resource.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A human readable descriptive text for this resource, up to 64 characters long.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`'),
    ),
  }),
)

export type ApiV2010AccountSipSipDomainSipCredentialListMapping = v.InferOutput<
  typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema
>

export const ApiV2010AccountSipSipDomainSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to process the call.'),
    ),
    auth_type: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    domain_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that that we created to identify the SipDomain resource.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    voice_fallback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
      ),
    ),
    voice_fallback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`.',
      ),
    ),
    voice_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.'),
    ),
    voice_status_callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description(
        'The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`.',
      ),
    ),
    voice_status_callback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description(
        'The URL that we call to pass status parameters (such as call ended) to your application.',
      ),
    ),
    voice_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call using the `voice_method` when the domain receives a call.'),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.',
      ),
    ),
    sip_registration: v.pipe(
      v.nullable(v.boolean()),
      v.description('Whether to allow SIP Endpoints to register with the domain to receive calls.'),
    ),
    emergency_calling_enabled: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
      ),
    ),
    secure: v.pipe(
      v.nullable(v.boolean()),
      v.description(
        'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
      ),
    ),
    byoc_trunk_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^BY[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
      ),
    ),
    emergency_caller_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
      ),
    ),
  }),
)

export type ApiV2010AccountSipSipDomain = v.InferOutput<typeof ApiV2010AccountSipSipDomainSchema>

export const ApiV2010AccountSipSipIpAccessControlListSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('A human readable descriptive text, up to 255 characters long.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of the IpAddress resources associated with this IP access control list resource.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`'),
    ),
  }),
)

export type ApiV2010AccountSipSipIpAccessControlList = v.InferOutput<
  typeof ApiV2010AccountSipSipIpAccessControlListSchema
>

export const ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique id of the Account that is responsible for this resource.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
    domain_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique string that is created to identify the SipDomain resource.'),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'A human readable descriptive text for this resource, up to 64 characters long.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`'),
    ),
  }),
)

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMapping = v.InferOutput<
  typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema
>

export const ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema = v.object({
  sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('A 34 character string that uniquely identifies this resource.'),
    ),
  ),
  account_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The unique id of the Account that is responsible for this resource.'),
    ),
  ),
  friendly_name: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'A human readable descriptive text for this resource, up to 255 characters long.',
      ),
    ),
  ),
  ip_address: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
      ),
    ),
  ),
  cidr_prefix_length: v.pipe(
    v.optional(v.pipe(v.number(), v.integer()), 0),
    v.description(
      'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
    ),
  ),
  ip_access_control_list_sid: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique id of the IpAccessControlList resource that includes this resource.',
      ),
    ),
  ),
  date_created: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
  ),
  date_updated: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      ),
    ),
  ),
  uri: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description('The URI for this resource, relative to `https://api.twilio.com`'),
    ),
  ),
})

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddress = v.InferOutput<
  typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema
>

export const SiprecEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'stopped']),
  v.description('The status - one of `stopped`, `in-progress`'),
)

export type SiprecEnumStatus = v.InferOutput<typeof SiprecEnumStatusSchema>

export const ApiV2010AccountCallSiprecSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^SR[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Siprec resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.',
      ),
    ),
    name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
      ),
    ),
    status: SiprecEnumStatusSchema,
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountCallSiprec = v.InferOutput<typeof ApiV2010AccountCallSiprecSchema>

export const SiprecEnumTrackSchema = v.pipe(
  v.picklist(['inbound_track', 'outbound_track', 'both_tracks']),
  v.description('One of `inbound_track`, `outbound_track`, `both_tracks`.'),
)

export type SiprecEnumTrack = v.InferOutput<typeof SiprecEnumTrackSchema>

export const SiprecEnumUpdateStatusSchema = v.literal('stopped')

export type SiprecEnumUpdateStatus = v.InferOutput<typeof SiprecEnumUpdateStatusSchema>

export const SmsFeedbackEnumOutcomeSchema = v.picklist([
  'confirmed',
  'unconfirmed',
  'received',
  'not-received',
  'delayed',
])

export type SmsFeedbackEnumOutcome = v.InferOutput<typeof SmsFeedbackEnumOutcomeSchema>

export const SmsMessageEnumStatusSchema = v.picklist([
  'queued',
  'sending',
  'sent',
  'failed',
  'delivered',
  'undelivered',
  'receiving',
  'received',
  'accepted',
  'scheduled',
  'read',
  'partially_delivered',
  'canceled',
])

export type SmsMessageEnumStatus = v.InferOutput<typeof SmsMessageEnumStatusSchema>

export const SmsMessageEnumUpdateStatusSchema = v.literal('canceled')

export type SmsMessageEnumUpdateStatus = v.InferOutput<typeof SmsMessageEnumUpdateStatusSchema>

export const SmsMessageEnumDirectionSchema = v.picklist([
  'inbound',
  'outbound-api',
  'outbound-call',
  'outbound-reply',
])

export type SmsMessageEnumDirection = v.InferOutput<typeof SmsMessageEnumDirectionSchema>

export const StreamEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'stopped']),
  v.description('The status of the Stream. Possible values are `stopped` and `in-progress`.'),
)

export type StreamEnumStatus = v.InferOutput<typeof StreamEnumStatusSchema>

export const ApiV2010AccountCallStreamSchema = v.partial(
  v.object({
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^MZ[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID of the Stream resource.'),
    ),
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.',
      ),
    ),
    name: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
      ),
    ),
    status: StreamEnumStatusSchema,
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountCallStream = v.InferOutput<typeof ApiV2010AccountCallStreamSchema>

export const StreamEnumTrackSchema = v.pipe(
  v.picklist(['inbound_track', 'outbound_track', 'both_tracks']),
  v.description(
    'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
  ),
)

export type StreamEnumTrack = v.InferOutput<typeof StreamEnumTrackSchema>

export const StreamEnumUpdateStatusSchema = v.literal('stopped')

export type StreamEnumUpdateStatus = v.InferOutput<typeof StreamEnumUpdateStatusSchema>

export const ApiV2010AccountTokenSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource.',
      ),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    ice_servers: v.pipe(
      v.nullable(
        v.array(
          v.partial(
            v.object({
              credential: v.string(),
              username: v.string(),
              url: v.string(),
              urls: v.string(),
            }),
          ),
        ),
      ),
      v.description(
        'An array representing the ephemeral credentials and the STUN and TURN server URIs.',
      ),
    ),
    password: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The temporary password that the username will use when authenticating with Twilio.',
      ),
    ),
    ttl: v.pipe(
      v.nullable(v.string()),
      v.description('The duration in seconds for which the username and password are valid.'),
    ),
    username: v.pipe(
      v.nullable(v.string()),
      v.description('The temporary username that uniquely identifies a Token.'),
    ),
  }),
)

export type ApiV2010AccountToken = v.InferOutput<typeof ApiV2010AccountTokenSchema>

export const TranscriptionEnumStatusSchema = v.pipe(
  v.picklist(['in-progress', 'completed', 'failed']),
  v.description('The status of the transcription. Can be: `in-progress`, `completed`, `failed`.'),
)

export type TranscriptionEnumStatus = v.InferOutput<typeof TranscriptionEnumStatusSchema>

export const ApiV2010AccountTranscriptionSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the transcription.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    duration: v.pipe(
      v.nullable(v.string()),
      v.description('The duration of the transcribed audio in seconds.'),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
      ),
    ),
    recording_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the Transcription resource.',
      ),
    ),
    status: TranscriptionEnumStatusSchema,
    transcription_text: v.pipe(
      v.nullable(v.string()),
      v.description('The text content of the transcription.'),
    ),
    type: v.pipe(
      v.nullable(v.string()),
      v.description('The transcription type. Can only be: `fast`.'),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
  }),
)

export type ApiV2010AccountTranscription = v.InferOutput<typeof ApiV2010AccountTranscriptionSchema>

export const ApiV2010AccountUsageSchema = v.partial(v.object({}))

export type ApiV2010AccountUsage = v.InferOutput<typeof ApiV2010AccountUsageSchema>

export const ApiV2010AccountUsageUsageRecordSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecord = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTime = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordDailySchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordDaily = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordDailySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonth = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthly = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonth = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordToday = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordYearly = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    as_of: v.pipe(
      v.nullable(v.string()),
      v.description(
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      ),
    ),
    category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    count: v.pipe(
      v.nullable(v.string()),
      v.description('The number of usage events, such as the number of calls.'),
    ),
    count_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      ),
    ),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('A plain-language description of the usage category.'),
    ),
    end_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    price: v.pipe(
      v.nullable(v.number()),
      v.description(
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      ),
    ),
    price_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      ),
    ),
    start_date: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
          ),
        ),
      ),
      v.description(
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      ),
    ),
    subresource_uris: v.pipe(
      v.nullable(v.object({})),
      v.description(
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The amount used to bill usage and measured in units described in `usage_unit`.',
      ),
    ),
    usage_unit: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterday = v.InferOutput<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema
>

export const UsageTriggerEnumRecurringSchema = v.pipe(
  v.picklist(['daily', 'monthly', 'yearly', 'alltime']),
  v.description(
    'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
  ),
)

export type UsageTriggerEnumRecurring = v.InferOutput<typeof UsageTriggerEnumRecurringSchema>

export const UsageTriggerEnumTriggerFieldSchema = v.pipe(
  v.picklist(['count', 'usage', 'price']),
  v.description(
    'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
  ),
)

export type UsageTriggerEnumTriggerField = v.InferOutput<typeof UsageTriggerEnumTriggerFieldSchema>

export const ApiV2010AccountUsageUsageTriggerSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.',
      ),
    ),
    api_version: v.pipe(
      v.nullable(v.string()),
      v.description('The API version used to create the resource.'),
    ),
    callback_method: v.pipe(
      v.nullable(v.picklist(['GET', 'POST'])),
      v.description('The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.'),
    ),
    callback_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url())),
      v.description('The URL we call using the `callback_method` when the trigger fires.'),
    ),
    current_value: v.pipe(
      v.nullable(v.string()),
      v.description('The current value of the field the trigger is watching.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_fired: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    date_updated: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the trigger.'),
    ),
    recurring: UsageTriggerEnumRecurringSchema,
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The unique string that that we created to identify the UsageTrigger resource.',
      ),
    ),
    trigger_by: UsageTriggerEnumTriggerFieldSchema,
    trigger_value: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The value at which the trigger will fire.  Must be a positive, numeric value.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description('The URI of the resource, relative to `https://api.twilio.com`.'),
    ),
    usage_category: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      ),
    ),
    usage_record_uri: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.',
      ),
    ),
  }),
)

export type ApiV2010AccountUsageUsageTrigger = v.InferOutput<
  typeof ApiV2010AccountUsageUsageTriggerSchema
>

export const ApiV2010AccountCallUserDefinedMessageSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^KX[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID that uniquely identifies this User Defined Message.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this User Defined Message was created, given in RFC 2822 format.',
      ),
    ),
  }),
)

export type ApiV2010AccountCallUserDefinedMessage = v.InferOutput<
  typeof ApiV2010AccountCallUserDefinedMessageSchema
>

export const ApiV2010AccountCallUserDefinedMessageSubscriptionSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.',
      ),
    ),
    sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^ZY[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description('The SID that uniquely identifies this User Defined Message Subscription.'),
    ),
    date_created: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The date that this User Defined Message Subscription was created, given in RFC 2822 format.',
      ),
    ),
    uri: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.',
      ),
    ),
  }),
)

export type ApiV2010AccountCallUserDefinedMessageSubscription = v.InferOutput<
  typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema
>

export const ApiV2010AccountValidationRequestSchema = v.partial(
  v.object({
    account_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID.',
      ),
    ),
    call_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with.',
      ),
    ),
    friendly_name: v.pipe(
      v.nullable(v.string()),
      v.description('The string that you assigned to describe the resource.'),
    ),
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      ),
    ),
    validation_code: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called.',
      ),
    ),
  }),
)

export type ApiV2010AccountValidationRequest = v.InferOutput<
  typeof ApiV2010AccountValidationRequestSchema
>

export const ApiV2010AccountOutgoingCallerIdSmsVerificationSchema = v.partial(
  v.object({
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
      ),
    ),
    verification_sid: v.pipe(
      v.nullable(v.string()),
      v.description('The SID that uniquely identifies the verification.'),
    ),
    send_code_attempts: v.pipe(
      v.nullable(
        v.array(
          v.partial(
            v.object({
              attempt_sid: v.pipe(
                v.string(),
                v.description('The SID of the verification attempt.'),
              ),
              time: v.pipe(
                v.string(),
                v.description('The date and time of the attempt in ISO 8601 format.'),
              ),
            }),
          ),
        ),
      ),
      v.description(
        'An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID.',
      ),
    ),
  }),
)

export type ApiV2010AccountOutgoingCallerIdSmsVerification = v.InferOutput<
  typeof ApiV2010AccountOutgoingCallerIdSmsVerificationSchema
>

export const ApiV2010AccountOutgoingCallerIdVerificationCheckSchema = v.partial(
  v.object({
    phone_number: v.pipe(
      v.nullable(v.string()),
      v.description(
        'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
      ),
    ),
    verification_sid: v.pipe(
      v.nullable(v.string()),
      v.description('The SID that uniquely identifies the verification.'),
    ),
    status: v.pipe(
      v.nullable(v.string()),
      v.description('The status of the verification. Can be: `pending`, `approved`, or `failed`.'),
    ),
    caller_id_sid: v.pipe(
      v.nullable(v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34))),
      v.description(
        'The SID of the OutgoingCallerId resource created when verification is approved.',
      ),
    ),
  }),
)

export type ApiV2010AccountOutgoingCallerIdVerificationCheck = v.InferOutput<
  typeof ApiV2010AccountOutgoingCallerIdVerificationCheckSchema
>

export const AccountSidAuthTokenSecurityScheme = { scheme: 'basic', type: 'http' }

export const get20100401AccountsJsonHandler = defineHandler({
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      accounts: v.array(ApiV2010AccountSchema),
    }),
  ),
})

export const post20100401AccountsJsonHandler = defineHandler({
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description(
          'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
        ),
      ),
    }),
  ),
  response: ApiV2010AccountSchema,
})

export const get20100401AccountsSidJsonHandler = defineHandler({
  param: v.object({ Sid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)) }),
  response: ApiV2010AccountSchema,
})

export const post20100401AccountsSidJsonHandler = defineHandler({
  param: v.object({ Sid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)) }),
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description('Update the human-readable description of this Account'),
      ),
      Status: AccountEnumStatusSchema,
    }),
  ),
  response: ApiV2010AccountSchema,
})

export const get20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      addresses: v.array(ApiV2010AccountAddressSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
    CustomerName: v.pipe(v.string(), v.description('The name to associate with the new address.')),
    Street: v.pipe(v.string(), v.description('The number and street address of the new address.')),
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
      v.pipe(v.string(), v.description('The additional number and street address of the address.')),
    ),
  }),
  response: ApiV2010AccountAddressSchema,
})

export const get20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountAddressSchema,
})

export const post20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description(
          'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
        ),
      ),
      CustomerName: v.pipe(v.string(), v.description('The name to associate with the address.')),
      Street: v.pipe(v.string(), v.description('The number and street address of the address.')),
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
  response: ApiV2010AccountAddressSchema,
})

export const delete20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      applications: v.array(ApiV2010AccountApplicationSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
        v.description('The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.'),
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
  response: ApiV2010AccountApplicationSchema,
})

export const get20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountApplicationSchema,
})

export const post20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
        v.description('The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.'),
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
  response: ApiV2010AccountApplicationSchema,
})

export const delete20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConnectAppSid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountAuthorizedConnectAppSchema,
  })

export const get20100401AccountsAccountSidAuthorizedConnectAppsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      authorized_connect_apps: v.array(ApiV2010AccountAuthorizedConnectAppSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      countries: v.array(ApiV2010AccountAvailablePhoneNumberCountrySchema),
      uri: v.nullable(v.pipe(v.string(), v.url())),
    }),
  ),
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    response: ApiV2010AccountAvailablePhoneNumberCountrySchema,
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CountryCode: v.string(),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        available_phone_numbers: v.array(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidBalanceJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountBalanceSchema,
})

export const get20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      calls: v.array(ApiV2010AccountCallSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
  response: ApiV2010AccountCallSchema,
})

export const get20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountCallSchema,
})

export const post20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountCallSchema,
})

export const delete20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidCallsCallSidEventsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      events: v.array(ApiV2010AccountCallCallEventSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountCallCallNotificationInstanceSchema,
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      notifications: v.array(ApiV2010AccountCallCallNotificationSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      recordings: v.array(ApiV2010AccountCallCallRecordingSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      RecordingStatusCallbackEvent: v.pipe(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
  response: ApiV2010AccountCallCallRecordingSchema,
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountCallCallRecordingSchema,
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.string(),
  }),
  form: v.object({
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
  response: ApiV2010AccountCallCallRecordingSchema,
})

export const delete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountConferenceSchema,
})

export const post20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.string(),
  }),
  form: v.partial(
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
  response: ApiV2010AccountConferenceSchema,
})

export const get20100401AccountsAccountSidConferencesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      conferences: v.array(ApiV2010AccountConferenceSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        recordings: v.array(ApiV2010AccountConferenceConferenceRecordingSchema),
      }),
    ),
  })

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountConferenceConferenceRecordingSchema,
  })

export const post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.string(),
    }),
    form: v.object({
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
    response: ApiV2010AccountConferenceConferenceRecordingSchema,
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountConnectAppSchema,
})

export const post20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(ConnectAppEnumPermissionSchema),
        ),
        v.description(
          'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
        ),
      ),
    }),
  ),
  response: ApiV2010AccountConnectAppSchema,
})

export const delete20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidConnectAppsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      connect_apps: v.array(ApiV2010AccountConnectAppSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AddressSid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        dependent_phone_numbers: v.array(ApiV2010AccountAddressDependentPhoneNumberSchema),
      }),
    ),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountIncomingPhoneNumberSchema,
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountIncomingPhoneNumberSchema,
})

export const delete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      incoming_phone_numbers: v.array(ApiV2010AccountIncomingPhoneNumberSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountIncomingPhoneNumberSchema,
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  })

export const delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        assigned_add_ons: v.array(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
      InstalledAddOnSid: v.pipe(
        v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        v.description('The SID that identifies the Add-on installation.'),
      ),
    }),
    response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AssignedAddOnSid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XF[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AssignedAddOnSid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        extensions: v.array(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      incoming_phone_numbers: v.array(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      incoming_phone_numbers: v.array(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      incoming_phone_numbers: v.array(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
})

export const get20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountKeySchema,
})

export const post20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description(
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        ),
      ),
    }),
  ),
  response: ApiV2010AccountKeySchema,
})

export const delete20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      keys: v.array(ApiV2010AccountKeySchema),
    }),
  ),
})

export const post20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description(
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        ),
      ),
    }),
  ),
  response: ApiV2010AccountNewKeySchema,
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountMessageMediaSchema,
})

export const delete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      media_list: v.array(ApiV2010AccountMessageMediaSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.string(),
  }),
  response: ApiV2010AccountQueueMemberSchema,
})

export const post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.string(),
  }),
  form: v.object({
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
  response: ApiV2010AccountQueueMemberSchema,
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      queue_members: v.array(ApiV2010AccountQueueMemberSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      messages: v.array(ApiV2010AccountMessageSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
        v.description('[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.'),
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
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
        v.description('The time that Twilio will send the message. Must be in ISO 8601 format.'),
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
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
  response: ApiV2010AccountMessageSchema,
})

export const get20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountMessageSchema,
})

export const post20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountMessageSchema,
})

export const delete20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const post20100401AccountsAccountSidMessagesMessageSidFeedbackJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(v.object({ Outcome: MessageFeedbackEnumOutcomeSchema })),
  response: ApiV2010AccountMessageMessageFeedbackSchema,
})

export const get20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      signing_keys: v.array(ApiV2010AccountSigningKeySchema),
    }),
  ),
})

export const post20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description(
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        ),
      ),
    }),
  ),
  response: ApiV2010AccountNewSigningKeySchema,
})

export const get20100401AccountsAccountSidNotificationsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountNotificationInstanceSchema,
})

export const get20100401AccountsAccountSidNotificationsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      notifications: v.array(ApiV2010AccountNotificationSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountOutgoingCallerIdSchema,
})

export const post20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      FriendlyName: v.pipe(
        v.string(),
        v.description(
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        ),
      ),
    }),
  ),
  response: ApiV2010AccountOutgoingCallerIdSchema,
})

export const delete20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      outgoing_caller_ids: v.array(ApiV2010AccountOutgoingCallerIdSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountValidationRequestSchema,
})

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.string(),
    }),
    response: ApiV2010AccountConferenceParticipantSchema,
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.string(),
    }),
    form: v.partial(
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
    response: ApiV2010AccountConferenceParticipantSchema,
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.string(),
    }),
  })

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        participants: v.array(ApiV2010AccountConferenceParticipantSchema),
      }),
    ),
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ConferenceSid: v.string(),
    }),
    form: v.object({
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
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
    response: ApiV2010AccountConferenceParticipantSchema,
  })

export const post20100401AccountsAccountSidCallsCallSidPaymentsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountCallPaymentsSchema,
})

export const post20100401AccountsAccountSidCallsCallSidPaymentsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^PK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountCallPaymentsSchema,
})

export const get20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountQueueSchema,
})

export const post20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountQueueSchema,
})

export const delete20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      queues: v.array(ApiV2010AccountQueueSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountQueueSchema,
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountCallRealtimeTranscriptionSchema,
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonHandler = defineHandler(
  {
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.string(),
    }),
    form: v.object({ Status: RealtimeTranscriptionEnumUpdateStatusSchema }),
    response: ApiV2010AccountCallRealtimeTranscriptionSchema,
  },
)

export const get20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
    v.object({
      IncludeSoftDeleted: v.pipe(
        v.string(),
        v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
        v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
      ),
    }),
  ),
  response: ApiV2010AccountRecordingSchema,
})

export const delete20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidRecordingsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      recordings: v.array(ApiV2010AccountRecordingSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountRecordingRecordingAddOnResultSchema,
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        add_on_results: v.array(ApiV2010AccountRecordingRecordingAddOnResultSchema),
      }),
    ),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        payloads: v.array(
          ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      PayloadSid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountRecordingRecordingTranscriptionSchema,
  })

export const delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        transcriptions: v.array(ApiV2010AccountRecordingRecordingTranscriptionSchema),
      }),
    ),
  })

export const get20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountShortCodeSchema,
})

export const post20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountShortCodeSchema,
})

export const get20100401AccountsAccountSidSMSShortCodesJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      short_codes: v.array(ApiV2010AccountShortCodeSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountSigningKeySchema,
})

export const post20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(v.object({ FriendlyName: v.pipe(v.string(), v.description('')) })),
  response: ApiV2010AccountSigningKeySchema,
})

export const delete20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        contents: v.array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
      CredentialListSid: v.pipe(
        v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        v.description('The SID of the CredentialList resource to map to the SIP domain.'),
      ),
    }),
    response: ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        contents: v.array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
      IpAccessControlListSid: v.pipe(
        v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        v.description('The SID of the IpAccessControlList resource to map to the SIP domain.'),
      ),
    }),
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        contents: v.array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
      CredentialListSid: v.pipe(
        v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        v.description('The SID of the CredentialList resource to map to the SIP domain.'),
      ),
    }),
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        credentials: v.array(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
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
    response: ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.partial(
      v.object({
        Password: v.pipe(
          v.string(),
          v.description(
            'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          ),
        ),
      }),
    ),
    response: ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  })

export const delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      credential_lists: v.array(ApiV2010AccountSipSipCredentialListSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
    FriendlyName: v.pipe(
      v.string(),
      v.description(
        'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      ),
    ),
  }),
  response: ApiV2010AccountSipSipCredentialListSchema,
})

export const get20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountSipSipCredentialListSchema,
})

export const post20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
    FriendlyName: v.pipe(
      v.string(),
      v.description(
        'A human readable descriptive text for a CredentialList, up to 64 characters long.',
      ),
    ),
  }),
  response: ApiV2010AccountSipSipCredentialListSchema,
})

export const delete20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        credential_list_mappings: v.array(
          ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
      CredentialListSid: v.pipe(
        v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        v.description(
          'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
        ),
      ),
    }),
    response: ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      domains: v.array(ApiV2010AccountSipSipDomainSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountSipSipDomainSchema,
})

export const get20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountSipSipDomainSchema,
})

export const post20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountSipSipDomainSchema,
})

export const delete20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      ip_access_control_lists: v.array(ApiV2010AccountSipSipIpAccessControlListSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
    FriendlyName: v.pipe(
      v.string(),
      v.description(
        'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
      ),
    ),
  }),
  response: ApiV2010AccountSipSipIpAccessControlListSchema,
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountSipSipIpAccessControlListSchema,
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
    FriendlyName: v.pipe(
      v.string(),
      v.description('A human readable descriptive text, up to 255 characters long.'),
    ),
  }),
  response: ApiV2010AccountSipSipIpAccessControlListSchema,
})

export const delete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        ip_access_control_list_mappings: v.array(
          ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
      IpAccessControlListSid: v.pipe(
        v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        v.description('The unique id of the IP access control list to map to the SIP domain.'),
      ),
    }),
    response: ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      IpAccessControlListSid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    query: v.partial(
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
    response: v.partial(
      v.object({
        end: v.pipe(v.number(), v.integer()),
        first_page_uri: v.pipe(v.string(), v.url()),
        next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        page: v.pipe(v.number(), v.integer()),
        page_size: v.pipe(v.number(), v.integer()),
        previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
        start: v.pipe(v.number(), v.integer()),
        uri: v.pipe(v.string(), v.url()),
        ip_addresses: v.array(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      IpAccessControlListSid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
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
    response: ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      IpAccessControlListSid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    response: ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      IpAccessControlListSid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.partial(
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
    response: ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  })

export const delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      IpAccessControlListSid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })

export const post20100401AccountsAccountSidCallsCallSidSiprecJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
    v.object({
      Name: v.pipe(
        v.string(),
        v.description(
          'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
        ),
      ),
      ConnectorName: v.pipe(
        v.string(),
        v.description('Unique name used when configuring the connector via Marketplace Add-on.'),
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
  response: ApiV2010AccountCallSiprecSchema,
})

export const post20100401AccountsAccountSidCallsCallSidSiprecSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.string(),
  }),
  form: v.object({ Status: SiprecEnumUpdateStatusSchema }),
  response: ApiV2010AccountCallSiprecSchema,
})

export const post20100401AccountsAccountSidCallsCallSidStreamsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountCallStreamSchema,
})

export const post20100401AccountsAccountSidCallsCallSidStreamsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.string(),
  }),
  form: v.object({ Status: StreamEnumUpdateStatusSchema }),
  response: ApiV2010AccountCallStreamSchema,
})

export const post20100401AccountsAccountSidTokensJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountTokenSchema,
})

export const get20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountTranscriptionSchema,
})

export const delete20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidTranscriptionsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      transcriptions: v.array(ApiV2010AccountTranscriptionSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsAllTimeJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsDailyJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsLastMonthJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsMonthlyJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsThisMonthJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsTodayJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsYearlyJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsYesterdayJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  response: ApiV2010AccountUsageUsageTriggerSchema,
})

export const post20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.partial(
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
  response: ApiV2010AccountUsageUsageTriggerSchema,
})

export const delete20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
    Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
})

export const get20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  query: v.partial(
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
  response: v.partial(
    v.object({
      end: v.pipe(v.number(), v.integer()),
      first_page_uri: v.pipe(v.string(), v.url()),
      next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      page: v.pipe(v.number(), v.integer()),
      page_size: v.pipe(v.number(), v.integer()),
      previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
      start: v.pipe(v.number(), v.integer()),
      uri: v.pipe(v.string(), v.url()),
      usage_triggers: v.array(ApiV2010AccountUsageUsageTriggerSchema),
    }),
  ),
})

export const post20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: v.object({
    AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
  }),
  form: v.object({
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
  response: ApiV2010AccountUsageUsageTriggerSchema,
})

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
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
    response: ApiV2010AccountCallUserDefinedMessageSchema,
  })

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
    form: v.object({
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
    response: ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  })

export const delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonHandler =
  defineHandler({
    param: v.object({
      AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      Sid: v.pipe(v.string(), v.regex(/^ZY[0-9a-fA-F]{32}$/), v.codePoints(34)),
    }),
  })
