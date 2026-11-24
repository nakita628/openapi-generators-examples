import { oc } from '@orpc/contract'
import * as z from 'zod'
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
      z.object({
        FriendlyName: z.string().exactOptional(),
        Status: AccountEnumStatusSchema.exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        accounts: z.array(ApiV2010AccountSchema).exactOptional(),
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
      z.object({
        Sid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        Sid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CustomerName: z.string().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        EmergencyEnabled: z.stringbool().exactOptional(),
        IsoCountry: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        addresses: z.array(ApiV2010AccountAddressSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        FriendlyName: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        applications: z.array(ApiV2010AccountApplicationSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConnectAppSid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        authorized_connect_apps: z.array(ApiV2010AccountAuthorizedConnectAppSchema).exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json',
      tags: ['Api20100401AvailablePhoneNumberCountry'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        countries: z.array(ApiV2010AccountAvailablePhoneNumberCountrySchema).exactOptional(),
        uri: z.url().nullable().exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json',
      tags: ['Api20100401AvailablePhoneNumberCountry'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json',
      tags: ['Api20100401MachineToMachine'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
          )
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json',
      tags: ['Api20100401Mobile'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json',
      tags: ['Api20100401National'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json',
      tags: ['Api20100401SharedCost'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
      tags: ['Api20100401TollFree'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json',
      tags: ['Api20100401Voip'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        available_phone_numbers: z
          .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        To: z.string().exactOptional(),
        From: z.string().exactOptional(),
        ParentCallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34)
          .exactOptional(),
        Status: CallEnumStatusSchema.exactOptional(),
        StartTime: z.iso.datetime({ offset: true }).exactOptional(),
        'StartTime<': z.iso.datetime({ offset: true }).exactOptional(),
        'StartTime>': z.iso.datetime({ offset: true }).exactOptional(),
        EndTime: z.iso.datetime({ offset: true }).exactOptional(),
        'EndTime<': z.iso.datetime({ offset: true }).exactOptional(),
        'EndTime>': z.iso.datetime({ offset: true }).exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        calls: z.array(ApiV2010AccountCallSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        events: z.array(ApiV2010AccountCallCallEventSchema).exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json',
      tags: ['Api20100401CallNotification'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^NO[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Log: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        MessageDate: z.iso.date().exactOptional(),
        'MessageDate<': z.iso.date().exactOptional(),
        'MessageDate>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        notifications: z.array(ApiV2010AccountCallCallNotificationSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        DateCreated: z.iso.date().exactOptional(),
        'DateCreated<': z.iso.date().exactOptional(),
        'DateCreated>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        recordings: z.array(ApiV2010AccountCallCallRecordingSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DateCreated: z.iso.date().exactOptional(),
        'DateCreated<': z.iso.date().exactOptional(),
        'DateCreated>': z.iso.date().exactOptional(),
        DateUpdated: z.iso.date().exactOptional(),
        'DateUpdated<': z.iso.date().exactOptional(),
        'DateUpdated>': z.iso.date().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        Status: ConferenceEnumStatusSchema.exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        conferences: z.array(ApiV2010AccountConferenceSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        DateCreated: z.iso.date().exactOptional(),
        'DateCreated<': z.iso.date().exactOptional(),
        'DateCreated>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        recordings: z.array(ApiV2010AccountConferenceConferenceRecordingSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        connect_apps: z.array(ApiV2010AccountConnectAppSchema).exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json',
      tags: ['Api20100401DependentPhoneNumber'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        dependent_phone_numbers: z
          .array(ApiV2010AccountAddressDependentPhoneNumberSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        incoming_phone_numbers: z.array(ApiV2010AccountIncomingPhoneNumberSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        assigned_add_ons: z
          .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
        z.object({
          AccountSid: z
            .string()
            .regex(/^AC[0-9a-fA-F]{32}$/)
            .length(34),
          ResourceSid: z
            .string()
            .regex(/^PN[0-9a-fA-F]{32}$/)
            .length(34),
          AssignedAddOnSid: z
            .string()
            .regex(/^XE[0-9a-fA-F]{32}$/)
            .length(34),
          Sid: z
            .string()
            .regex(/^XF[0-9a-fA-F]{32}$/)
            .length(34),
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
        z.object({
          AccountSid: z
            .string()
            .regex(/^AC[0-9a-fA-F]{32}$/)
            .length(34),
          ResourceSid: z
            .string()
            .regex(/^PN[0-9a-fA-F]{32}$/)
            .length(34),
          AssignedAddOnSid: z
            .string()
            .regex(/^XE[0-9a-fA-F]{32}$/)
            .length(34),
          PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
          Page: z
            .preprocess(
              (val) =>
                typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
              z.number().int().min(0),
            )
            .exactOptional(),
          PageToken: z.string().exactOptional(),
        }),
      )
      .output(
        z.object({
          end: z.int().exactOptional(),
          first_page_uri: z.url().exactOptional(),
          next_page_uri: z.url().nullable().exactOptional(),
          page: z.int().exactOptional(),
          page_size: z.int().exactOptional(),
          previous_page_uri: z.url().nullable().exactOptional(),
          start: z.int().exactOptional(),
          uri: z.url().exactOptional(),
          extensions: z
            .array(
              ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
            )
            .exactOptional(),
        }),
      ),
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
      tags: ['Api20100401IncomingPhoneNumberLocal'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        incoming_phone_numbers: z
          .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        incoming_phone_numbers: z
          .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        incoming_phone_numbers: z
          .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
  get20100401AccountsAccountSidKeysJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Keys.json',
      tags: ['Api20100401Key'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        keys: z.array(ApiV2010AccountKeySchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^ME[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^ME[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
        DateCreated: z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated<': z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated>': z.iso.datetime({ offset: true }).exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        media_list: z.array(ApiV2010AccountMessageMediaSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        QueueSid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        QueueSid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        QueueSid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        queue_members: z.array(ApiV2010AccountQueueMemberSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        To: z.string().exactOptional(),
        From: z.string().exactOptional(),
        DateSent: z.iso.datetime({ offset: true }).exactOptional(),
        'DateSent<': z.iso.datetime({ offset: true }).exactOptional(),
        'DateSent>': z.iso.datetime({ offset: true }).exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        messages: z.array(ApiV2010AccountMessageSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        signing_keys: z.array(ApiV2010AccountSigningKeySchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^NO[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Log: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        MessageDate: z.iso.date().exactOptional(),
        'MessageDate<': z.iso.date().exactOptional(),
        'MessageDate>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        notifications: z.array(ApiV2010AccountNotificationSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PhoneNumber: z.string().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        outgoing_caller_ids: z.array(ApiV2010AccountOutgoingCallerIdSchema).exactOptional(),
      }),
    ),
  post20100401AccountsAccountSidOutgoingCallerIdsJson: oc
    .route({
      method: 'POST',
      path: '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json',
      tags: ['Api20100401ValidationRequest'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Muted: z.stringbool().exactOptional(),
        Hold: z.stringbool().exactOptional(),
        Coaching: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        participants: z.array(ApiV2010AccountConferenceParticipantSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PK[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        queues: z.array(ApiV2010AccountQueueSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        IncludeSoftDeleted: z.stringbool().exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DateCreated: z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated<': z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated>': z.iso.datetime({ offset: true }).exactOptional(),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34)
          .exactOptional(),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34)
          .exactOptional(),
        IncludeSoftDeleted: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        recordings: z.array(ApiV2010AccountRecordingSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        add_on_results: z.array(ApiV2010AccountRecordingRecordingAddOnResultSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        AddOnResultSid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XH[0-9a-fA-F]{32}$/)
          .length(34),
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
        z.object({
          AccountSid: z
            .string()
            .regex(/^AC[0-9a-fA-F]{32}$/)
            .length(34),
          ReferenceSid: z
            .string()
            .regex(/^RE[0-9a-fA-F]{32}$/)
            .length(34),
          AddOnResultSid: z
            .string()
            .regex(/^XR[0-9a-fA-F]{32}$/)
            .length(34),
          Sid: z
            .string()
            .regex(/^XH[0-9a-fA-F]{32}$/)
            .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        AddOnResultSid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        payloads: z
          .array(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema)
          .exactOptional(),
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
        z.object({
          AccountSid: z
            .string()
            .regex(/^AC[0-9a-fA-F]{32}$/)
            .length(34),
          ReferenceSid: z
            .string()
            .regex(/^RE[0-9a-fA-F]{32}$/)
            .length(34),
          AddOnResultSid: z
            .string()
            .regex(/^XR[0-9a-fA-F]{32}$/)
            .length(34),
          PayloadSid: z
            .string()
            .regex(/^XH[0-9a-fA-F]{32}$/)
            .length(34),
        }),
      ),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
      tags: ['Api20100401RecordingTranscription'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        RecordingSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        RecordingSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json',
      tags: ['Api20100401RecordingTranscription'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        RecordingSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        transcriptions: z
          .array(ApiV2010AccountRecordingRecordingTranscriptionSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        FriendlyName: z.string().exactOptional(),
        ShortCode: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        short_codes: z.array(ApiV2010AccountShortCodeSchema).exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidSigningKeysSidJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
      tags: ['Api20100401SigningKey'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        contents: z
          .array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
          )
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        contents: z
          .array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
          )
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        contents: z
          .array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
          )
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
        z.object({
          AccountSid: z
            .string()
            .regex(/^AC[0-9a-fA-F]{32}$/)
            .length(34),
          DomainSid: z
            .string()
            .regex(/^SD[0-9a-fA-F]{32}$/)
            .length(34),
          Sid: z
            .string()
            .regex(/^CL[0-9a-fA-F]{32}$/)
            .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        credentials: z
          .array(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        credential_lists: z.array(ApiV2010AccountSipSipCredentialListSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        credential_list_mappings: z
          .array(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        domains: z.array(ApiV2010AccountSipSipDomainSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        ip_access_control_lists: z
          .array(ApiV2010AccountSipSipIpAccessControlListSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        ip_access_control_list_mappings: z
          .array(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        ip_addresses: z
          .array(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^IP[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^IP[0-9a-fA-F]{32}$/)
          .length(34),
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
        z.object({
          AccountSid: z
            .string()
            .regex(/^AC[0-9a-fA-F]{32}$/)
            .length(34),
          IpAccessControlListSid: z
            .string()
            .regex(/^AL[0-9a-fA-F]{32}$/)
            .length(34),
          Sid: z
            .string()
            .regex(/^IP[0-9a-fA-F]{32}$/)
            .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        transcriptions: z.array(ApiV2010AccountTranscriptionSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z.array(ApiV2010AccountUsageUsageRecordSchema).exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsAllTimeJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json',
      tags: ['Api20100401AllTime'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsDailyJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json',
      tags: ['Api20100401Daily'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsLastMonthJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json',
      tags: ['Api20100401LastMonth'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsMonthlyJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json',
      tags: ['Api20100401Monthly'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsThisMonthJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json',
      tags: ['Api20100401ThisMonth'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsTodayJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json',
      tags: ['Api20100401Today'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsYearlyJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json',
      tags: ['Api20100401Yearly'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema)
          .exactOptional(),
      }),
    ),
  get20100401AccountsAccountSidUsageRecordsYesterdayJson: oc
    .route({
      method: 'GET',
      path: '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json',
      tags: ['Api20100401Yesterday'],
    })
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_records: z
          .array(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema)
          .exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^UT[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^UT[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^UT[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Recurring: UsageTriggerEnumRecurringSchema.exactOptional(),
        TriggerBy: UsageTriggerEnumTriggerFieldSchema.exactOptional(),
        UsageCategory: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        end: z.int().exactOptional(),
        first_page_uri: z.url().exactOptional(),
        next_page_uri: z.url().nullable().exactOptional(),
        page: z.int().exactOptional(),
        page_size: z.int().exactOptional(),
        previous_page_uri: z.url().nullable().exactOptional(),
        start: z.int().exactOptional(),
        uri: z.url().exactOptional(),
        usage_triggers: z.array(ApiV2010AccountUsageUsageTriggerSchema).exactOptional(),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
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
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^ZY[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
}
