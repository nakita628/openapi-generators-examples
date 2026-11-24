import { oc } from '@orpc/contract'
import { type } from 'arktype'
import {
  AccountEnumStatusSchema,
  ApiV2010AccountAddressDependentPhoneNumberSchema,
  ApiV2010AccountAddressSchema,
  ApiV2010AccountApplicationSchema,
  ApiV2010AccountAuthorizedConnectAppSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
  ApiV2010AccountAvailablePhoneNumberCountrySchema,
  ApiV2010AccountBalanceSchema,
  ApiV2010AccountCallCallEventSchema,
  ApiV2010AccountCallCallNotificationInstanceSchema,
  ApiV2010AccountCallCallNotificationSchema,
  ApiV2010AccountCallCallRecordingSchema,
  ApiV2010AccountCallPaymentsSchema,
  ApiV2010AccountCallRealtimeTranscriptionSchema,
  ApiV2010AccountCallSchema,
  ApiV2010AccountCallSiprecSchema,
  ApiV2010AccountCallStreamSchema,
  ApiV2010AccountCallUserDefinedMessageSchema,
  ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  ApiV2010AccountConferenceConferenceRecordingSchema,
  ApiV2010AccountConferenceParticipantSchema,
  ApiV2010AccountConferenceSchema,
  ApiV2010AccountConnectAppSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ApiV2010AccountIncomingPhoneNumberSchema,
  ApiV2010AccountKeySchema,
  ApiV2010AccountMessageMediaSchema,
  ApiV2010AccountMessageMessageFeedbackSchema,
  ApiV2010AccountMessageSchema,
  ApiV2010AccountNewKeySchema,
  ApiV2010AccountNewSigningKeySchema,
  ApiV2010AccountNotificationInstanceSchema,
  ApiV2010AccountNotificationSchema,
  ApiV2010AccountOutgoingCallerIdSchema,
  ApiV2010AccountQueueMemberSchema,
  ApiV2010AccountQueueSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  ApiV2010AccountRecordingRecordingAddOnResultSchema,
  ApiV2010AccountRecordingRecordingTranscriptionSchema,
  ApiV2010AccountRecordingSchema,
  ApiV2010AccountSchema,
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
  ApiV2010AccountTokenSchema,
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
  ApiV2010AccountValidationRequestSchema,
  CallEnumStatusSchema,
  ConferenceEnumStatusSchema,
  UsageTriggerEnumRecurringSchema,
  UsageTriggerEnumTriggerFieldSchema,
} from './components'

export const contract = {
  get20100401AccountsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts.json',
      tags: ['Api20100401Account'],
      summary:
        'Retrieves a collection of Accounts belonging to the account used to make the request',
      description:
        'Retrieves a collection of Accounts belonging to the account used to make the request',
    })
    .input(
      type({
        'FriendlyName?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'accounts?': type(ApiV2010AccountSchema).array(),
      }),
    ),
  post20100401AccountsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts.json',
      tags: ['Api20100401Account'],
      summary: 'Create a new Twilio Subaccount from the account making the request',
      description: 'Create a new Twilio Subaccount from the account making the request',
      successStatus: 201,
    })
    .output(ApiV2010AccountSchema),
  get20100401AccountsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{Sid}.json',
      tags: ['Api20100401Account'],
      summary: 'Fetch the account specified by the provided Account Sid',
      description: 'Fetch the account specified by the provided Account Sid',
    })
    .input(
      type({
        Sid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSchema),
  post20100401AccountsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{Sid}.json',
      tags: ['Api20100401Account'],
      summary: 'Modify the properties of a given Account',
      description: 'Modify the properties of a given Account',
    })
    .input(
      type({
        Sid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSchema),
  get20100401AccountsAccountSidAddressesJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses.json',
      tags: ['Api20100401Address'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'CustomerName?': type('string'),
        'FriendlyName?': type('string'),
        'EmergencyEnabled?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'IsoCountry?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'addresses?': type(ApiV2010AccountAddressSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidAddressesJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses.json',
      tags: ['Api20100401Address'],
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAddressSchema),
  get20100401AccountsAccountSidAddressesSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
      tags: ['Api20100401Address'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAddressSchema),
  post20100401AccountsAccountSidAddressesSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
      tags: ['Api20100401Address'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAddressSchema),
  delete20100401AccountsAccountSidAddressesSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
      tags: ['Api20100401Address'],
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidApplicationsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Applications.json',
      tags: ['Api20100401Application'],
      summary:
        'Retrieve a list of applications representing an application within the requesting account',
      description:
        'Retrieve a list of applications representing an application within the requesting account',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'FriendlyName?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'applications?': type(ApiV2010AccountApplicationSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidApplicationsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Applications.json',
      tags: ['Api20100401Application'],
      summary: 'Create a new application within your account',
      description: 'Create a new application within your account',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountApplicationSchema),
  get20100401AccountsAccountSidApplicationsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
      tags: ['Api20100401Application'],
      summary: 'Fetch the application specified by the provided sid',
      description: 'Fetch the application specified by the provided sid',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountApplicationSchema),
  post20100401AccountsAccountSidApplicationsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
      tags: ['Api20100401Application'],
      summary: "Updates the application's properties",
      description: "Updates the application's properties",
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountApplicationSchema),
  delete20100401AccountsAccountSidApplicationsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
      tags: ['Api20100401Application'],
      summary: 'Delete the application by the specified application sid',
      description: 'Delete the application by the specified application sid',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json',
      tags: ['Api20100401AuthorizedConnectApp'],
      summary: 'Fetch an instance of an authorized-connect-app',
      description: 'Fetch an instance of an authorized-connect-app',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConnectAppSid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAuthorizedConnectAppSchema),
  get20100401AccountsAccountSidAuthorizedConnectAppsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json',
      tags: ['Api20100401AuthorizedConnectApp'],
      summary:
        'Retrieve a list of authorized-connect-apps belonging to the account used to make the request',
      description:
        'Retrieve a list of authorized-connect-apps belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'authorized_connect_apps?': type(ApiV2010AccountAuthorizedConnectAppSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json',
      tags: ['Api20100401AvailablePhoneNumberCountry'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'countries?': type(ApiV2010AccountAvailablePhoneNumberCountrySchema).array(),
        'uri?': 'string.url | null',
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json',
      tags: ['Api20100401AvailablePhoneNumberCountry'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
      }),
    )
    .output(ApiV2010AccountAvailablePhoneNumberCountrySchema),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json',
      tags: ['Api20100401Local'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json',
      tags: ['Api20100401MachineToMachine'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json',
      tags: ['Api20100401Mobile'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json',
      tags: ['Api20100401National'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json',
      tags: ['Api20100401SharedCost'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
      tags: ['Api20100401TollFree'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json',
      tags: ['Api20100401Voip'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: type('string'),
        'AreaCode?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'Contains?': type('string'),
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
        'NearNumber?': type('string'),
        'NearLatLong?': type('string'),
        'Distance?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'InPostalCode?': type('string'),
        'InRegion?': type('string'),
        'InRateCenter?': type('string'),
        'InLata?': type('string'),
        'InLocality?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidBalanceJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Balance.json',
      tags: ['Api20100401Balance'],
      summary:
        'Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
      description:
        'Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountBalanceSchema),
  get20100401AccountsAccountSidCallsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
      tags: ['Api20100401Call'],
      summary: 'Retrieves a collection of calls made to and from your account',
      description: 'Retrieves a collection of calls made to and from your account',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'To?': type('string'),
        'From?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'calls?': type(ApiV2010AccountCallSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidCallsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
      tags: ['Api20100401Call'],
      summary:
        'Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections',
      description:
        'Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSchema),
  get20100401AccountsAccountSidCallsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
      tags: ['Api20100401Call'],
      summary: 'Fetch the call specified by the provided Call SID',
      description: 'Fetch the call specified by the provided Call SID',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSchema),
  post20100401AccountsAccountSidCallsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
      tags: ['Api20100401Call'],
      summary: 'Initiates a call redirect or terminates a call',
      description: 'Initiates a call redirect or terminates a call',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSchema),
  delete20100401AccountsAccountSidCallsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
      tags: ['Api20100401Call'],
      summary:
        'Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.',
      description:
        'Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidCallsCallSidEventsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json',
      tags: ['Api20100401Event'],
      summary: 'Retrieve a list of all events for a call.',
      description: 'Retrieve a list of all events for a call.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'events?': type(ApiV2010AccountCallCallEventSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json',
      tags: ['Api20100401CallNotification'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^NO[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallCallNotificationInstanceSchema),
  get20100401AccountsAccountSidCallsCallSidNotificationsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json',
      tags: ['Api20100401CallNotification'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'notifications?': type(ApiV2010AccountCallCallNotificationSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidCallsCallSidRecordingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
      tags: ['Api20100401CallRecording'],
      summary: 'Retrieve a list of recordings belonging to the call used to make the request',
      description: 'Retrieve a list of recordings belonging to the call used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountCallCallRecordingSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidCallsCallSidRecordingsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
      tags: ['Api20100401CallRecording'],
      summary: 'Create a recording for the call',
      description: 'Create a recording for the call',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema),
  get20100401AccountsAccountSidCallsCallSidRecordingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
      tags: ['Api20100401CallRecording'],
      summary: 'Fetch an instance of a recording for a call',
      description: 'Fetch an instance of a recording for a call',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema),
  post20100401AccountsAccountSidCallsCallSidRecordingsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
      tags: ['Api20100401CallRecording'],
      summary:
        'Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.',
      description:
        'Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string'),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema),
  delete20100401AccountsAccountSidCallsCallSidRecordingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
      tags: ['Api20100401CallRecording'],
      summary: 'Delete a recording from your account',
      description: 'Delete a recording from your account',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidConferencesSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json',
      tags: ['Api20100401Conference'],
      summary: 'Fetch an instance of a conference',
      description: 'Fetch an instance of a conference',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConferenceSchema),
  post20100401AccountsAccountSidConferencesSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json',
      tags: ['Api20100401Conference'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string'),
      }),
    )
    .output(ApiV2010AccountConferenceSchema),
  get20100401AccountsAccountSidConferencesJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences.json',
      tags: ['Api20100401Conference'],
      summary: 'Retrieve a list of conferences belonging to the account used to make the request',
      description:
        'Retrieve a list of conferences belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'FriendlyName?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'conferences?': type(ApiV2010AccountConferenceSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json',
      tags: ['Api20100401ConferenceRecording'],
      summary: 'Retrieve a list of recordings belonging to the call used to make the request',
      description: 'Retrieve a list of recordings belonging to the call used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountConferenceConferenceRecordingSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
      tags: ['Api20100401ConferenceRecording'],
      summary: 'Fetch an instance of a recording for a call',
      description: 'Fetch an instance of a recording for a call',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConferenceConferenceRecordingSchema),
  post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
      tags: ['Api20100401ConferenceRecording'],
      summary:
        'Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.',
      description:
        'Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string'),
      }),
    )
    .output(ApiV2010AccountConferenceConferenceRecordingSchema),
  delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
      tags: ['Api20100401ConferenceRecording'],
      summary: 'Delete a recording from your account',
      description: 'Delete a recording from your account',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidConnectAppsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
      tags: ['Api20100401ConnectApp'],
      summary: 'Fetch an instance of a connect-app',
      description: 'Fetch an instance of a connect-app',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConnectAppSchema),
  post20100401AccountsAccountSidConnectAppsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
      tags: ['Api20100401ConnectApp'],
      summary: 'Update a connect-app with the specified parameters',
      description: 'Update a connect-app with the specified parameters',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConnectAppSchema),
  delete20100401AccountsAccountSidConnectAppsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
      tags: ['Api20100401ConnectApp'],
      summary: 'Delete an instance of a connect-app',
      description: 'Delete an instance of a connect-app',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidConnectAppsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/ConnectApps.json',
      tags: ['Api20100401ConnectApp'],
      summary: 'Retrieve a list of connect-apps belonging to the account used to make the request',
      description:
        'Retrieve a list of connect-apps belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'connect_apps?': type(ApiV2010AccountConnectAppSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json',
      tags: ['Api20100401DependentPhoneNumber'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddressSid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'dependent_phone_numbers?': type(ApiV2010AccountAddressDependentPhoneNumberSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidIncomingPhoneNumbersSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Fetch an incoming-phone-number belonging to the account used to make the request.',
      description:
        'Fetch an incoming-phone-number belonging to the account used to make the request.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema),
  post20100401AccountsAccountSidIncomingPhoneNumbersSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Update an incoming-phone-number instance.',
      description: 'Update an incoming-phone-number instance.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema),
  delete20100401AccountsAccountSidIncomingPhoneNumbersSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Delete a phone-numbers belonging to the account used to make the request.',
      description: 'Delete a phone-numbers belonging to the account used to make the request.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidIncomingPhoneNumbersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
      tags: ['Api20100401IncomingPhoneNumber'],
      summary:
        'Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.',
      description:
        'Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'FriendlyName?': type('string'),
        'PhoneNumber?': type('string'),
        'Origin?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'incoming_phone_numbers?': type(ApiV2010AccountIncomingPhoneNumberSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidIncomingPhoneNumbersJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Purchase a phone-number for the account.',
      description: 'Purchase a phone-number for the account.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
      tags: ['Api20100401AssignedAddOn'],
      summary: 'Fetch an instance of an Add-on installation currently assigned to this Number.',
      description: 'Fetch an instance of an Add-on installation currently assigned to this Number.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema),
  delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
      tags: ['Api20100401AssignedAddOn'],
      summary: 'Remove the assignment of an Add-on installation from the Number specified.',
      description: 'Remove the assignment of an Add-on installation from the Number specified.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
      tags: ['Api20100401AssignedAddOn'],
      summary: 'Retrieve a list of Add-on installations currently assigned to this Number.',
      description: 'Retrieve a list of Add-on installations currently assigned to this Number.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
      tags: ['Api20100401AssignedAddOn'],
      summary: 'Assign an Add-on installation to the Number specified.',
      description: 'Assign an Add-on installation to the Number specified.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson:
    oc
      .route({
        method: 'GET',
        path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json',
        tags: ['Api20100401AssignedAddOnExtension'],
        summary: 'Fetch an instance of an Extension for the Assigned Add-on.',
        description: 'Fetch an instance of an Extension for the Assigned Add-on.',
      })
      .input(
        type({
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
        }),
      )
      .output(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
      ),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson:
    oc
      .route({
        method: 'GET',
        path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json',
        tags: ['Api20100401AssignedAddOnExtension'],
        summary: 'Retrieve a list of Extensions for the Assigned Add-on.',
        description: 'Retrieve a list of Extensions for the Assigned Add-on.',
      })
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ResourceSid: type('string')
            .and(/^PN[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AssignedAddOnSid: type('string')
            .and(/^XE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
          'PageToken?': type('string'),
        }),
      )
      .output(
        type({
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
        }),
      ),
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
      tags: ['Api20100401IncomingPhoneNumberLocal'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'FriendlyName?': type('string'),
        'PhoneNumber?': type('string'),
        'Origin?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
      tags: ['Api20100401IncomingPhoneNumberLocal'],
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema),
  get20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
      tags: ['Api20100401IncomingPhoneNumberMobile'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'FriendlyName?': type('string'),
        'PhoneNumber?': type('string'),
        'Origin?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
      tags: ['Api20100401IncomingPhoneNumberMobile'],
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema),
  get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
      tags: ['Api20100401IncomingPhoneNumberTollFree'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'FriendlyName?': type('string'),
        'PhoneNumber?': type('string'),
        'Origin?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
      tags: ['Api20100401IncomingPhoneNumberTollFree'],
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema),
  get20100401AccountsAccountSidKeysSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json',
      tags: ['Api20100401Key'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountKeySchema),
  post20100401AccountsAccountSidKeysSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json',
      tags: ['Api20100401Key'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountKeySchema),
  delete20100401AccountsAccountSidKeysSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json',
      tags: ['Api20100401Key'],
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidKeysJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Keys.json',
      tags: ['Api20100401Key'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'keys?': type(ApiV2010AccountKeySchema).array(),
      }),
    ),
  post20100401AccountsAccountSidKeysJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Keys.json',
      tags: ['Api20100401NewKey'],
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountNewKeySchema),
  get20100401AccountsAccountSidMessagesMessageSidMediaSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
      tags: ['Api20100401MediaInstance'],
      summary: 'Fetch a single Media resource associated with a specific Message resource',
      description: 'Fetch a single Media resource associated with a specific Message resource',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ME[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageMediaSchema),
  delete20100401AccountsAccountSidMessagesMessageSidMediaSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
      tags: ['Api20100401MediaInstance'],
      summary: 'Delete the Media resource.',
      description: 'Delete the Media resource.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ME[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidMessagesMessageSidMediaJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json',
      tags: ['Api20100401Media'],
      summary: 'Read a list of Media resources associated with a specific Message resource',
      description: 'Read a list of Media resources associated with a specific Message resource',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'media_list?': type(ApiV2010AccountMessageMediaSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
      tags: ['Api20100401Member'],
      summary: 'Fetch a specific member from the queue',
      description: 'Fetch a specific member from the queue',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        QueueSid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string'),
      }),
    )
    .output(ApiV2010AccountQueueMemberSchema),
  post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
      tags: ['Api20100401Member'],
      summary:
        "Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL",
      description:
        "Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL",
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        QueueSid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string'),
      }),
    )
    .output(ApiV2010AccountQueueMemberSchema),
  get20100401AccountsAccountSidQueuesQueueSidMembersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json',
      tags: ['Api20100401Member'],
      summary: 'Retrieve the members of the queue',
      description: 'Retrieve the members of the queue',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        QueueSid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'queue_members?': type(ApiV2010AccountQueueMemberSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidMessagesJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
      tags: ['Api20100401Message'],
      summary: 'Retrieve a list of Message resources associated with a Twilio Account',
      description: 'Retrieve a list of Message resources associated with a Twilio Account',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'To?': type('string'),
        'From?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'messages?': type(ApiV2010AccountMessageSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidMessagesJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
      tags: ['Api20100401Message'],
      summary: 'Send a message',
      description: 'Send a message',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageSchema),
  get20100401AccountsAccountSidMessagesSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json',
      tags: ['Api20100401Message'],
      summary: 'Fetch a specific Message',
      description: 'Fetch a specific Message',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageSchema),
  post20100401AccountsAccountSidMessagesSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json',
      tags: ['Api20100401Message'],
      summary:
        'Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)',
      description:
        'Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageSchema),
  delete20100401AccountsAccountSidMessagesSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json',
      tags: ['Api20100401Message'],
      summary: 'Deletes a Message resource from your account',
      description: 'Deletes a Message resource from your account',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  post20100401AccountsAccountSidMessagesMessageSidFeedbackJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json',
      tags: ['Api20100401Feedback'],
      summary:
        'Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message',
      description:
        'Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageMessageFeedbackSchema),
  get20100401AccountsAccountSidSigningKeysJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json',
      tags: ['Api20100401SigningKey'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'signing_keys?': type(ApiV2010AccountSigningKeySchema).array(),
      }),
    ),
  post20100401AccountsAccountSidSigningKeysJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json',
      tags: ['Api20100401NewSigningKey'],
      summary: 'Create a new Signing Key for the account making the request.',
      description: 'Create a new Signing Key for the account making the request.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountNewSigningKeySchema),
  get20100401AccountsAccountSidNotificationsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json',
      tags: ['Api20100401Notification'],
      summary: 'Fetch a notification belonging to the account used to make the request',
      description: 'Fetch a notification belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^NO[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountNotificationInstanceSchema),
  get20100401AccountsAccountSidNotificationsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Notifications.json',
      tags: ['Api20100401Notification'],
      summary: 'Retrieve a list of notifications belonging to the account used to make the request',
      description:
        'Retrieve a list of notifications belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'notifications?': type(ApiV2010AccountNotificationSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidOutgoingCallerIdsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
      tags: ['Api20100401OutgoingCallerId'],
      summary: 'Fetch an outgoing-caller-id belonging to the account used to make the request',
      description: 'Fetch an outgoing-caller-id belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountOutgoingCallerIdSchema),
  post20100401AccountsAccountSidOutgoingCallerIdsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
      tags: ['Api20100401OutgoingCallerId'],
      summary: 'Updates the caller-id',
      description: 'Updates the caller-id',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountOutgoingCallerIdSchema),
  delete20100401AccountsAccountSidOutgoingCallerIdsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
      tags: ['Api20100401OutgoingCallerId'],
      summary: 'Delete the caller-id specified from the account',
      description: 'Delete the caller-id specified from the account',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidOutgoingCallerIdsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json',
      tags: ['Api20100401OutgoingCallerId'],
      summary:
        'Retrieve a list of outgoing-caller-ids belonging to the account used to make the request',
      description:
        'Retrieve a list of outgoing-caller-ids belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PhoneNumber?': type('string'),
        'FriendlyName?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'outgoing_caller_ids?': type(ApiV2010AccountOutgoingCallerIdSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidOutgoingCallerIdsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json',
      tags: ['Api20100401ValidationRequest'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountValidationRequestSchema),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
      tags: ['Api20100401Participant'],
      summary: 'Fetch an instance of a participant',
      description: 'Fetch an instance of a participant',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string'),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
      tags: ['Api20100401Participant'],
      summary: 'Update the properties of the participant',
      description: 'Update the properties of the participant',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string'),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema),
  delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
      tags: ['Api20100401Participant'],
      summary: 'Kick a participant from a given conference',
      description: 'Kick a participant from a given conference',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string'),
      }),
    ),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
      tags: ['Api20100401Participant'],
      summary: 'Retrieve a list of participants belonging to the account used to make the request',
      description:
        'Retrieve a list of participants belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'participants?': type(ApiV2010AccountConferenceParticipantSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
      tags: ['Api20100401Participant'],
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string'),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema),
  post20100401AccountsAccountSidCallsCallSidPaymentsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json',
      tags: ['Api20100401Payment'],
      summary: 'create an instance of payments. This will start a new payments session',
      description: 'create an instance of payments. This will start a new payments session',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallPaymentsSchema),
  post20100401AccountsAccountSidCallsCallSidPaymentsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json',
      tags: ['Api20100401Payment'],
      summary: 'update an instance of payments with different phases of payment flows.',
      description: 'update an instance of payments with different phases of payment flows.',
      successStatus: 202,
      successDescription: 'Accepted',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallPaymentsSchema),
  get20100401AccountsAccountSidQueuesSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json',
      tags: ['Api20100401Queue'],
      summary: 'Fetch an instance of a queue identified by the QueueSid',
      description: 'Fetch an instance of a queue identified by the QueueSid',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountQueueSchema),
  post20100401AccountsAccountSidQueuesSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json',
      tags: ['Api20100401Queue'],
      summary: 'Update the queue with the new parameters',
      description: 'Update the queue with the new parameters',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountQueueSchema),
  delete20100401AccountsAccountSidQueuesSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json',
      tags: ['Api20100401Queue'],
      summary: 'Remove an empty queue',
      description: 'Remove an empty queue',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidQueuesJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues.json',
      tags: ['Api20100401Queue'],
      summary: 'Retrieve a list of queues belonging to the account used to make the request',
      description: 'Retrieve a list of queues belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'queues?': type(ApiV2010AccountQueueSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidQueuesJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Queues.json',
      tags: ['Api20100401Queue'],
      summary: 'Create a queue',
      description: 'Create a queue',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountQueueSchema),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json',
      tags: ['Api20100401CallTranscription'],
      summary: 'Create a Transcription',
      description: 'Create a Transcription',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json',
      tags: ['Api20100401CallTranscription'],
      summary:
        'Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource',
      description:
        'Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string'),
      }),
    )
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema),
  get20100401AccountsAccountSidRecordingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
      tags: ['Api20100401Recording'],
      summary: 'Fetch an instance of a recording',
      description: 'Fetch an instance of a recording',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'IncludeSoftDeleted?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    )
    .output(ApiV2010AccountRecordingSchema),
  delete20100401AccountsAccountSidRecordingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
      tags: ['Api20100401Recording'],
      summary: 'Delete a recording from your account',
      description: 'Delete a recording from your account',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidRecordingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings.json',
      tags: ['Api20100401Recording'],
      summary: 'Retrieve a list of recordings belonging to the account used to make the request',
      description:
        'Retrieve a list of recordings belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'IncludeSoftDeleted?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountRecordingSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
      tags: ['Api20100401AddOnResult'],
      summary: 'Fetch an instance of an AddOnResult',
      description: 'Fetch an instance of an AddOnResult',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountRecordingRecordingAddOnResultSchema),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
      tags: ['Api20100401AddOnResult'],
      summary: 'Delete a result and purge all associated Payloads',
      description: 'Delete a result and purge all associated Payloads',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json',
      tags: ['Api20100401AddOnResult'],
      summary: 'Retrieve a list of results belonging to the recording',
      description: 'Retrieve a list of results belonging to the recording',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'add_on_results?': type(ApiV2010AccountRecordingRecordingAddOnResultSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
      tags: ['Api20100401Payload'],
      summary: 'Fetch an instance of a result payload',
      description: 'Fetch an instance of a result payload',
    })
    .input(
      type({
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
      }),
    )
    .output(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    oc
      .route({
        method: 'DELETE',
        path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
        tags: ['Api20100401Payload'],
        summary: 'Delete a payload from the result along with all associated Data',
        description: 'Delete a payload from the result along with all associated Data',
        successStatus: 204,
        successDescription: 'The resource was deleted successfully.',
      })
      .input(
        type({
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
        }),
      ),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json',
      tags: ['Api20100401Payload'],
      summary: 'Retrieve a list of payloads belonging to the AddOnResult',
      description: 'Retrieve a list of payloads belonging to the AddOnResult',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddOnResultSid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson:
    oc
      .route({
        method: 'GET',
        path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json',
        tags: ['Api20100401Data'],
        summary: 'Fetch an instance of a result payload',
        description: 'Fetch an instance of a result payload',
      })
      .input(
        type({
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
        }),
      ),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
      tags: ['Api20100401RecordingTranscription'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountRecordingRecordingTranscriptionSchema),
  delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
      tags: ['Api20100401RecordingTranscription'],
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json',
      tags: ['Api20100401RecordingTranscription'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'transcriptions?': type(ApiV2010AccountRecordingRecordingTranscriptionSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidSMSShortCodesSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
      tags: ['Api20100401ShortCode'],
      summary: 'Fetch an instance of a short code',
      description: 'Fetch an instance of a short code',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountShortCodeSchema),
  post20100401AccountsAccountSidSMSShortCodesSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
      tags: ['Api20100401ShortCode'],
      summary: 'Update a short code with the following parameters',
      description: 'Update a short code with the following parameters',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountShortCodeSchema),
  get20100401AccountsAccountSidSMSShortCodesJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json',
      tags: ['Api20100401ShortCode'],
      summary: 'Retrieve a list of short-codes belonging to the account used to make the request',
      description:
        'Retrieve a list of short-codes belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'FriendlyName?': type('string'),
        'ShortCode?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'short_codes?': type(ApiV2010AccountShortCodeSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidSigningKeysSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
      tags: ['Api20100401SigningKey'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSigningKeySchema),
  post20100401AccountsAccountSidSigningKeysSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
      tags: ['Api20100401SigningKey'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSigningKeySchema),
  delete20100401AccountsAccountSidSigningKeysSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
      tags: ['Api20100401SigningKey'],
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
      tags: ['Api20100401AuthCallsCredentialListMapping'],
      summary:
        'Retrieve a list of credential list mappings belonging to the domain used in the request',
      description:
        'Retrieve a list of credential list mappings belonging to the domain used in the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
      tags: ['Api20100401AuthCallsCredentialListMapping'],
      summary: 'Create a new credential list mapping resource',
      description: 'Create a new credential list mapping resource',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
      tags: ['Api20100401AuthCallsCredentialListMapping'],
      summary: 'Fetch a specific instance of a credential list mapping',
      description: 'Fetch a specific instance of a credential list mapping',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
      tags: ['Api20100401AuthCallsCredentialListMapping'],
      summary: 'Delete a credential list mapping from the requested domain',
      description: 'Delete a credential list mapping from the requested domain',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
      tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
      summary:
        'Retrieve a list of IP Access Control List mappings belonging to the domain used in the request',
      description:
        'Retrieve a list of IP Access Control List mappings belonging to the domain used in the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
      tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
      summary: 'Create a new IP Access Control List mapping',
      description: 'Create a new IP Access Control List mapping',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
      tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
      summary: 'Fetch a specific instance of an IP Access Control List mapping',
      description: 'Fetch a specific instance of an IP Access Control List mapping',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
    ),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
      tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
      summary: 'Delete an IP Access Control List mapping from the requested domain',
      description: 'Delete an IP Access Control List mapping from the requested domain',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
      tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
      summary:
        'Retrieve a list of credential list mappings belonging to the domain used in the request',
      description:
        'Retrieve a list of credential list mappings belonging to the domain used in the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
      tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
      summary: 'Create a new credential list mapping resource',
      description: 'Create a new credential list mapping resource',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
      tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
      summary: 'Fetch a specific instance of a credential list mapping',
      description: 'Fetch a specific instance of a credential list mapping',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
    ),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    oc
      .route({
        method: 'DELETE',
        path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
        tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
        summary: 'Delete a credential list mapping from the requested domain',
        description: 'Delete a credential list mapping from the requested domain',
        successStatus: 204,
        successDescription: 'The resource was deleted successfully.',
      })
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^CL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      ),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
      tags: ['Api20100401Credential'],
      summary: 'Retrieve a list of credentials.',
      description: 'Retrieve a list of credentials.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credentials?': type(ApiV2010AccountSipSipCredentialListSipCredentialSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
      tags: ['Api20100401Credential'],
      summary: 'Create a new credential resource.',
      description: 'Create a new credential resource.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
      tags: ['Api20100401Credential'],
      summary: 'Fetch a single credential.',
      description: 'Fetch a single credential.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
      tags: ['Api20100401Credential'],
      summary: 'Update a credential resource.',
      description: 'Update a credential resource.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
  delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
      tags: ['Api20100401Credential'],
      summary: 'Delete a credential resource.',
      description: 'Delete a credential resource.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPCredentialListsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
      tags: ['Api20100401CredentialList'],
      summary: 'Get All Credential Lists',
      description: 'Get All Credential Lists',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credential_lists?': type(ApiV2010AccountSipSipCredentialListSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidSIPCredentialListsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
      tags: ['Api20100401CredentialList'],
      summary: 'Create a Credential List',
      description: 'Create a Credential List',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema),
  get20100401AccountsAccountSidSIPCredentialListsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
      tags: ['Api20100401CredentialList'],
      summary: 'Get a Credential List',
      description: 'Get a Credential List',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema),
  post20100401AccountsAccountSidSIPCredentialListsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
      tags: ['Api20100401CredentialList'],
      summary: 'Update a Credential List',
      description: 'Update a Credential List',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema),
  delete20100401AccountsAccountSidSIPCredentialListsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
      tags: ['Api20100401CredentialList'],
      summary: 'Delete a Credential List',
      description: 'Delete a Credential List',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
      tags: ['Api20100401CredentialListMapping'],
      summary: 'Read multiple CredentialListMapping resources from an account.',
      description: 'Read multiple CredentialListMapping resources from an account.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
      tags: ['Api20100401CredentialListMapping'],
      summary: 'Create a CredentialListMapping resource for an account.',
      description: 'Create a CredentialListMapping resource for an account.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
      tags: ['Api20100401CredentialListMapping'],
      summary: 'Fetch a single CredentialListMapping resource from an account.',
      description: 'Fetch a single CredentialListMapping resource from an account.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema),
  delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
      tags: ['Api20100401CredentialListMapping'],
      summary: 'Delete a CredentialListMapping resource from an account.',
      description: 'Delete a CredentialListMapping resource from an account.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json',
      tags: ['Api20100401Domain'],
      summary: 'Retrieve a list of domains belonging to the account used to make the request',
      description: 'Retrieve a list of domains belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'domains?': type(ApiV2010AccountSipSipDomainSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidSIPDomainsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json',
      tags: ['Api20100401Domain'],
      summary: 'Create a new Domain',
      description: 'Create a new Domain',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema),
  get20100401AccountsAccountSidSIPDomainsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
      tags: ['Api20100401Domain'],
      summary: 'Fetch an instance of a Domain',
      description: 'Fetch an instance of a Domain',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema),
  post20100401AccountsAccountSidSIPDomainsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
      tags: ['Api20100401Domain'],
      summary: 'Update the attributes of a domain',
      description: 'Update the attributes of a domain',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema),
  delete20100401AccountsAccountSidSIPDomainsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
      tags: ['Api20100401Domain'],
      summary: 'Delete an instance of a Domain',
      description: 'Delete an instance of a Domain',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPIpAccessControlListsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
      tags: ['Api20100401IpAccessControlList'],
      summary:
        'Retrieve a list of IpAccessControlLists that belong to the account used to make the request',
      description:
        'Retrieve a list of IpAccessControlLists that belong to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'ip_access_control_lists?': type(ApiV2010AccountSipSipIpAccessControlListSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidSIPIpAccessControlListsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
      tags: ['Api20100401IpAccessControlList'],
      summary: 'Create a new IpAccessControlList resource',
      description: 'Create a new IpAccessControlList resource',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema),
  get20100401AccountsAccountSidSIPIpAccessControlListsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
      tags: ['Api20100401IpAccessControlList'],
      summary: 'Fetch a specific instance of an IpAccessControlList',
      description: 'Fetch a specific instance of an IpAccessControlList',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema),
  post20100401AccountsAccountSidSIPIpAccessControlListsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
      tags: ['Api20100401IpAccessControlList'],
      summary: 'Rename an IpAccessControlList',
      description: 'Rename an IpAccessControlList',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema),
  delete20100401AccountsAccountSidSIPIpAccessControlListsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
      tags: ['Api20100401IpAccessControlList'],
      summary: 'Delete an IpAccessControlList from the requested account',
      description: 'Delete an IpAccessControlList from the requested account',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
      tags: ['Api20100401IpAccessControlListMapping'],
      summary: 'Fetch an IpAccessControlListMapping resource.',
      description: 'Fetch an IpAccessControlListMapping resource.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema),
  delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
      tags: ['Api20100401IpAccessControlListMapping'],
      summary: 'Delete an IpAccessControlListMapping resource.',
      description: 'Delete an IpAccessControlListMapping resource.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
      tags: ['Api20100401IpAccessControlListMapping'],
      summary: 'Retrieve a list of IpAccessControlListMapping resources.',
      description: 'Retrieve a list of IpAccessControlListMapping resources.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
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
      }),
    ),
  post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
      tags: ['Api20100401IpAccessControlListMapping'],
      summary: 'Create a new IpAccessControlListMapping resource.',
      description: 'Create a new IpAccessControlListMapping resource.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
      tags: ['Api20100401SipIpAddress'],
      summary: 'Read multiple IpAddress resources.',
      description: 'Read multiple IpAddress resources.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'ip_addresses?': type(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
      tags: ['Api20100401SipIpAddress'],
      summary: 'Create a new IpAddress resource.',
      description: 'Create a new IpAddress resource.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
      tags: ['Api20100401SipIpAddress'],
      summary: 'Read one IpAddress resource.',
      description: 'Read one IpAddress resource.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^IP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
      tags: ['Api20100401SipIpAddress'],
      summary: 'Update an IpAddress resource.',
      description: 'Update an IpAddress resource.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        IpAccessControlListSid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^IP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
  delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    oc
      .route({
        method: 'DELETE',
        path: '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
        tags: ['Api20100401SipIpAddress'],
        summary: 'Delete an IpAddress resource.',
        description: 'Delete an IpAddress resource.',
        successStatus: 204,
        successDescription: 'The resource was deleted successfully.',
      })
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          IpAccessControlListSid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^IP[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      ),
  post20100401AccountsAccountSidCallsCallSidSiprecJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json',
      tags: ['Api20100401Siprec'],
      summary: 'Create a Siprec',
      description: 'Create a Siprec',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSiprecSchema),
  post20100401AccountsAccountSidCallsCallSidSiprecSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json',
      tags: ['Api20100401Siprec'],
      summary:
        'Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource',
      description:
        'Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string'),
      }),
    )
    .output(ApiV2010AccountCallSiprecSchema),
  post20100401AccountsAccountSidCallsCallSidStreamsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json',
      tags: ['Api20100401Stream'],
      summary: 'Create a Stream',
      description: 'Create a Stream',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallStreamSchema),
  post20100401AccountsAccountSidCallsCallSidStreamsSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json',
      tags: ['Api20100401Stream'],
      summary:
        'Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource',
      description:
        'Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string'),
      }),
    )
    .output(ApiV2010AccountCallStreamSchema),
  post20100401AccountsAccountSidTokensJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Tokens.json',
      tags: ['Api20100401Token'],
      summary: 'Create a new token for ICE servers',
      description: 'Create a new token for ICE servers',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountTokenSchema),
  get20100401AccountsAccountSidTranscriptionsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
      tags: ['Api20100401Transcription'],
      summary: 'Fetch an instance of a Transcription',
      description: 'Fetch an instance of a Transcription',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountTranscriptionSchema),
  delete20100401AccountsAccountSidTranscriptionsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
      tags: ['Api20100401Transcription'],
      summary: 'Delete a transcription from the account used to make the request',
      description: 'Delete a transcription from the account used to make the request',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidTranscriptionsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Transcriptions.json',
      tags: ['Api20100401Transcription'],
      summary:
        'Retrieve a list of transcriptions belonging to the account used to make the request',
      description:
        'Retrieve a list of transcriptions belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'transcriptions?': type(ApiV2010AccountTranscriptionSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records.json',
      tags: ['Api20100401Record'],
      summary: 'Retrieve a list of usage-records belonging to the account used to make the request',
      description:
        'Retrieve a list of usage-records belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsAllTimeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json',
      tags: ['Api20100401AllTime'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsDailyJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json',
      tags: ['Api20100401Daily'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsLastMonthJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json',
      tags: ['Api20100401LastMonth'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsMonthlyJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json',
      tags: ['Api20100401Monthly'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsThisMonthJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json',
      tags: ['Api20100401ThisMonth'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsTodayJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json',
      tags: ['Api20100401Today'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsYearlyJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json',
      tags: ['Api20100401Yearly'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsYesterdayJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json',
      tags: ['Api20100401Yesterday'],
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': type('string'),
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema).array(),
      }),
    ),
  get20100401AccountsAccountSidUsageTriggersSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
      tags: ['Api20100401Trigger'],
      summary: 'Fetch and instance of a usage-trigger',
      description: 'Fetch and instance of a usage-trigger',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^UT[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema),
  post20100401AccountsAccountSidUsageTriggersSidJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
      tags: ['Api20100401Trigger'],
      summary: 'Update an instance of a usage trigger',
      description: 'Update an instance of a usage trigger',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^UT[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema),
  delete20100401AccountsAccountSidUsageTriggersSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
      tags: ['Api20100401Trigger'],
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^UT[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
  get20100401AccountsAccountSidUsageTriggersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json',
      tags: ['Api20100401Trigger'],
      summary:
        'Retrieve a list of usage-triggers belonging to the account used to make the request',
      description:
        'Retrieve a list of usage-triggers belonging to the account used to make the request',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Recurring?': UsageTriggerEnumRecurringSchema,
        'TriggerBy?': UsageTriggerEnumTriggerFieldSchema,
        'UsageCategory?': type('string'),
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
        'PageToken?': type('string'),
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_triggers?': type(ApiV2010AccountUsageUsageTriggerSchema).array(),
      }),
    ),
  post20100401AccountsAccountSidUsageTriggersJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json',
      tags: ['Api20100401Trigger'],
      summary: 'Create a new UsageTrigger',
      description: 'Create a new UsageTrigger',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json',
      tags: ['Api20100401UserDefinedMessage'],
      summary: 'Create a new User Defined Message for the given Call SID.',
      description: 'Create a new User Defined Message for the given Call SID.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallUserDefinedMessageSchema),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json',
      tags: ['Api20100401UserDefinedMessageSubscription'],
      summary: 'Subscribe to User Defined Messages for a given Call SID.',
      description: 'Subscribe to User Defined Messages for a given Call SID.',
      successStatus: 201,
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallUserDefinedMessageSubscriptionSchema),
  delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson: oc
    .route({
      method: 'DELETE',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json',
      tags: ['Api20100401UserDefinedMessageSubscription'],
      summary: 'Delete a specific User Defined Message Subscription.',
      description: 'Delete a specific User Defined Message Subscription.',
      successStatus: 204,
      successDescription: 'The resource was deleted successfully.',
    })
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ZY[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    ),
}
