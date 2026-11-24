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
