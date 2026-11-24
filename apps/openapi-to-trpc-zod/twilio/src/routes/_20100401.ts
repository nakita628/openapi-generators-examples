import { initTRPC, TRPCError } from '@trpc/server'
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
} from '../components'

const t = initTRPC.create()

export const _20100401Router = t.router({
  get20100401AccountsJson: t.procedure
    .input(
      z.object({
        FriendlyName: z.string().exactOptional(),
        Status: AccountEnumStatusSchema.exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsJson: t.procedure.output(ApiV2010AccountSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  get20100401AccountsSidJson: t.procedure
    .input(
      z.object({
        Sid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsSidJson: t.procedure
    .input(
      z.object({
        Sid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CustomerName: z.string().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        EmergencyEnabled: z.boolean().exactOptional(),
        IsoCountry: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesSidJson: t.procedure
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
    .output(ApiV2010AccountAddressSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesSidJson: t.procedure
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
    .output(ApiV2010AccountAddressSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidAddressesSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        FriendlyName: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsSidJson: t.procedure
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
    .output(ApiV2010AccountApplicationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsSidJson: t.procedure
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
    .output(ApiV2010AccountApplicationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidApplicationsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson: t.procedure
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
    .output(ApiV2010AccountAuthorizedConnectAppSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    )
    .output(
      z.object({
        countries: z.array(ApiV2010AccountAvailablePhoneNumberCountrySchema).exactOptional(),
        uri: z.url().nullable().exactOptional(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    )
    .output(ApiV2010AccountAvailablePhoneNumberCountrySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
        AreaCode: z.int().exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.boolean().exactOptional(),
        MmsEnabled: z.boolean().exactOptional(),
        VoiceEnabled: z.boolean().exactOptional(),
        ExcludeAllAddressRequired: z.boolean().exactOptional(),
        ExcludeLocalAddressRequired: z.boolean().exactOptional(),
        ExcludeForeignAddressRequired: z.boolean().exactOptional(),
        Beta: z.boolean().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z.int().exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidBalanceJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountBalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsSidJson: t.procedure
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
    .output(ApiV2010AccountCallSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsSidJson: t.procedure
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
    .output(ApiV2010AccountCallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidEventsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJson: t.procedure
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
    .output(ApiV2010AccountCallCallNotificationInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsJson: t.procedure
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
        Log: z.int().exactOptional(),
        MessageDate: z.iso.date().exactOptional(),
        'MessageDate<': z.iso.date().exactOptional(),
        'MessageDate>': z.iso.date().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
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
    .output(ApiV2010AccountCallCallRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
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
    .output(ApiV2010AccountCallCallRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
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
    .output(ApiV2010AccountCallCallRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesSidJson: t.procedure
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
    .output(ApiV2010AccountConferenceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    )
    .output(ApiV2010AccountConferenceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
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
    .output(ApiV2010AccountConferenceConferenceRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
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
    .output(ApiV2010AccountConferenceConferenceRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsSidJson: t.procedure
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
    .output(ApiV2010AccountConnectAppSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConnectAppsSidJson: t.procedure
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
    .output(ApiV2010AccountConnectAppSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConnectAppsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
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
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
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
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.boolean().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
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
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
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
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson:
    t.procedure
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson:
    t.procedure
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
          PageSize: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(1n).max(1000n))
            .exactOptional(),
          Page: z.int().min(0).exactOptional(),
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.boolean().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.boolean().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Beta: z.boolean().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysSidJson: t.procedure
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
    .output(ApiV2010AccountKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysSidJson: t.procedure
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
    .output(ApiV2010AccountKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidKeysSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountNewKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
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
    .output(ApiV2010AccountMessageMediaSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
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
    .output(ApiV2010AccountQueueMemberSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
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
    .output(ApiV2010AccountQueueMemberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesSidJson: t.procedure
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
    .output(ApiV2010AccountMessageSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesSidJson: t.procedure
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
    .output(ApiV2010AccountMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesMessageSidFeedbackJson: t.procedure
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
    .output(ApiV2010AccountMessageMessageFeedbackSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountNewSigningKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsSidJson: t.procedure
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
    .output(ApiV2010AccountNotificationInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Log: z.int().exactOptional(),
        MessageDate: z.iso.date().exactOptional(),
        'MessageDate<': z.iso.date().exactOptional(),
        'MessageDate>': z.iso.date().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
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
    .output(ApiV2010AccountOutgoingCallerIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
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
    .output(ApiV2010AccountOutgoingCallerIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PhoneNumber: z.string().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountValidationRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
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
    .output(ApiV2010AccountConferenceParticipantSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
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
    .output(ApiV2010AccountConferenceParticipantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
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
        Muted: z.boolean().exactOptional(),
        Hold: z.boolean().exactOptional(),
        Coaching: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z.string(),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsJson: t.procedure
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
    .output(ApiV2010AccountCallPaymentsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsSidJson: t.procedure
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
    .output(ApiV2010AccountCallPaymentsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesSidJson: t.procedure
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
    .output(ApiV2010AccountQueueSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesSidJson: t.procedure
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
    .output(ApiV2010AccountQueueSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidQueuesSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsJson: t.procedure
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
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson: t.procedure
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
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsSidJson: t.procedure
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
        IncludeSoftDeleted: z.boolean().exactOptional(),
      }),
    )
    .output(ApiV2010AccountRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsSidJson: t.procedure
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsJson: t.procedure
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
        IncludeSoftDeleted: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
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
    .output(ApiV2010AccountRecordingRecordingAddOnResultSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
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
      .output(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
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
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson:
    t.procedure
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
          PageSize: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(1n).max(1000n))
            .exactOptional(),
          Page: z.int().min(0).exactOptional(),
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson:
    t.procedure
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
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
    .output(ApiV2010AccountRecordingRecordingTranscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
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
    .output(ApiV2010AccountShortCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
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
    .output(ApiV2010AccountShortCodeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        FriendlyName: z.string().exactOptional(),
        ShortCode: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysSidJson: t.procedure
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
    .output(ApiV2010AccountSigningKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysSidJson: t.procedure
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
    .output(ApiV2010AccountSigningKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSigningKeysSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
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
      .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
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
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
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
          PageSize: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(1n).max(1000n))
            .exactOptional(),
          Page: z.int().min(0).exactOptional(),
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson:
    t.procedure
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson:
    t.procedure
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
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
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
          PageSize: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(1n).max(1000n))
            .exactOptional(),
          Page: z.int().min(0).exactOptional(),
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    t.procedure
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    t.procedure
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
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
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
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
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
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
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
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
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
          PageSize: z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(1n).max(1000n))
            .exactOptional(),
          Page: z.int().min(0).exactOptional(),
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
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
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
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
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
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
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
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
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidCallsCallSidSiprecJson: t.procedure
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
    .output(ApiV2010AccountCallSiprecSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidSiprecSidJson: t.procedure
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
    .output(ApiV2010AccountCallSiprecSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsJson: t.procedure
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
    .output(ApiV2010AccountCallStreamSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsSidJson: t.procedure
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
    .output(ApiV2010AccountCallStreamSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidTokensJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountTokenSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
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
    .output(ApiV2010AccountTranscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsAllTimeJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsDailyJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsLastMonthJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsMonthlyJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsThisMonthJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsTodayJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYearlyJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYesterdayJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.boolean().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
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
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
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
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Recurring: UsageTriggerEnumRecurringSchema.exactOptional(),
        TriggerBy: UsageTriggerEnumTriggerFieldSchema.exactOptional(),
        UsageCategory: z.string().exactOptional(),
        PageSize: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(1000n))
          .exactOptional(),
        Page: z.int().min(0).exactOptional(),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson: t.procedure
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
    .output(ApiV2010AccountCallUserDefinedMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson: t.procedure
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
    .output(ApiV2010AccountCallUserDefinedMessageSubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson: t.procedure
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
