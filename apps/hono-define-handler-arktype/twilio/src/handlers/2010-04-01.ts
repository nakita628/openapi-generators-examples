import { Hono } from 'hono'
import {
  get20100401AccountsJsonHandler,
  post20100401AccountsJsonHandler,
  get20100401AccountsSidJsonHandler,
  post20100401AccountsSidJsonHandler,
  get20100401AccountsAccountSidAddressesJsonHandler,
  post20100401AccountsAccountSidAddressesJsonHandler,
  get20100401AccountsAccountSidAddressesSidJsonHandler,
  post20100401AccountsAccountSidAddressesSidJsonHandler,
  delete20100401AccountsAccountSidAddressesSidJsonHandler,
  get20100401AccountsAccountSidApplicationsJsonHandler,
  post20100401AccountsAccountSidApplicationsJsonHandler,
  get20100401AccountsAccountSidApplicationsSidJsonHandler,
  post20100401AccountsAccountSidApplicationsSidJsonHandler,
  delete20100401AccountsAccountSidApplicationsSidJsonHandler,
  get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonHandler,
  get20100401AccountsAccountSidAuthorizedConnectAppsJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonHandler,
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonHandler,
  get20100401AccountsAccountSidBalanceJsonHandler,
  get20100401AccountsAccountSidCallsJsonHandler,
  post20100401AccountsAccountSidCallsJsonHandler,
  get20100401AccountsAccountSidCallsSidJsonHandler,
  post20100401AccountsAccountSidCallsSidJsonHandler,
  delete20100401AccountsAccountSidCallsSidJsonHandler,
  get20100401AccountsAccountSidCallsCallSidEventsJsonHandler,
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonHandler,
  get20100401AccountsAccountSidCallsCallSidNotificationsJsonHandler,
  get20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler,
  post20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler,
  get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler,
  post20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler,
  delete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler,
  get20100401AccountsAccountSidConferencesSidJsonHandler,
  post20100401AccountsAccountSidConferencesSidJsonHandler,
  get20100401AccountsAccountSidConferencesJsonHandler,
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonHandler,
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler,
  post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler,
  delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler,
  get20100401AccountsAccountSidConnectAppsSidJsonHandler,
  post20100401AccountsAccountSidConnectAppsSidJsonHandler,
  delete20100401AccountsAccountSidConnectAppsSidJsonHandler,
  get20100401AccountsAccountSidConnectAppsJsonHandler,
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler,
  post20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler,
  delete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler,
  post20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler,
  delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler,
  post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler,
  post20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler,
  post20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler,
  get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler,
  post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler,
  get20100401AccountsAccountSidKeysSidJsonHandler,
  post20100401AccountsAccountSidKeysSidJsonHandler,
  delete20100401AccountsAccountSidKeysSidJsonHandler,
  get20100401AccountsAccountSidKeysJsonHandler,
  post20100401AccountsAccountSidKeysJsonHandler,
  get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler,
  delete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler,
  get20100401AccountsAccountSidMessagesMessageSidMediaJsonHandler,
  get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler,
  post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler,
  get20100401AccountsAccountSidQueuesQueueSidMembersJsonHandler,
  get20100401AccountsAccountSidMessagesJsonHandler,
  post20100401AccountsAccountSidMessagesJsonHandler,
  get20100401AccountsAccountSidMessagesSidJsonHandler,
  post20100401AccountsAccountSidMessagesSidJsonHandler,
  delete20100401AccountsAccountSidMessagesSidJsonHandler,
  post20100401AccountsAccountSidMessagesMessageSidFeedbackJsonHandler,
  get20100401AccountsAccountSidSigningKeysJsonHandler,
  post20100401AccountsAccountSidSigningKeysJsonHandler,
  get20100401AccountsAccountSidNotificationsSidJsonHandler,
  get20100401AccountsAccountSidNotificationsJsonHandler,
  get20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler,
  post20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler,
  delete20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler,
  get20100401AccountsAccountSidOutgoingCallerIdsJsonHandler,
  post20100401AccountsAccountSidOutgoingCallerIdsJsonHandler,
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler,
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler,
  delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler,
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler,
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler,
  post20100401AccountsAccountSidCallsCallSidPaymentsJsonHandler,
  post20100401AccountsAccountSidCallsCallSidPaymentsSidJsonHandler,
  get20100401AccountsAccountSidQueuesSidJsonHandler,
  post20100401AccountsAccountSidQueuesSidJsonHandler,
  delete20100401AccountsAccountSidQueuesSidJsonHandler,
  get20100401AccountsAccountSidQueuesJsonHandler,
  post20100401AccountsAccountSidQueuesJsonHandler,
  post20100401AccountsAccountSidCallsCallSidTranscriptionsJsonHandler,
  post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonHandler,
  get20100401AccountsAccountSidRecordingsSidJsonHandler,
  delete20100401AccountsAccountSidRecordingsSidJsonHandler,
  get20100401AccountsAccountSidRecordingsJsonHandler,
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler,
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler,
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonHandler,
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler,
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler,
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonHandler,
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonHandler,
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler,
  delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler,
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonHandler,
  get20100401AccountsAccountSidSMSShortCodesSidJsonHandler,
  post20100401AccountsAccountSidSMSShortCodesSidJsonHandler,
  get20100401AccountsAccountSidSMSShortCodesJsonHandler,
  get20100401AccountsAccountSidSigningKeysSidJsonHandler,
  post20100401AccountsAccountSidSigningKeysSidJsonHandler,
  delete20100401AccountsAccountSidSigningKeysSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler,
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler,
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler,
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler,
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler,
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler,
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler,
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler,
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler,
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler,
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler,
  delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler,
  get20100401AccountsAccountSidSIPCredentialListsJsonHandler,
  post20100401AccountsAccountSidSIPCredentialListsJsonHandler,
  get20100401AccountsAccountSidSIPCredentialListsSidJsonHandler,
  post20100401AccountsAccountSidSIPCredentialListsSidJsonHandler,
  delete20100401AccountsAccountSidSIPCredentialListsSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler,
  post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler,
  delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsJsonHandler,
  post20100401AccountsAccountSidSIPDomainsJsonHandler,
  get20100401AccountsAccountSidSIPDomainsSidJsonHandler,
  post20100401AccountsAccountSidSIPDomainsSidJsonHandler,
  delete20100401AccountsAccountSidSIPDomainsSidJsonHandler,
  get20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler,
  post20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler,
  get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler,
  post20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler,
  delete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler,
  delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler,
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler,
  post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler,
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler,
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler,
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler,
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler,
  delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler,
  post20100401AccountsAccountSidCallsCallSidSiprecJsonHandler,
  post20100401AccountsAccountSidCallsCallSidSiprecSidJsonHandler,
  post20100401AccountsAccountSidCallsCallSidStreamsJsonHandler,
  post20100401AccountsAccountSidCallsCallSidStreamsSidJsonHandler,
  post20100401AccountsAccountSidTokensJsonHandler,
  get20100401AccountsAccountSidTranscriptionsSidJsonHandler,
  delete20100401AccountsAccountSidTranscriptionsSidJsonHandler,
  get20100401AccountsAccountSidTranscriptionsJsonHandler,
  get20100401AccountsAccountSidUsageRecordsJsonHandler,
  get20100401AccountsAccountSidUsageRecordsAllTimeJsonHandler,
  get20100401AccountsAccountSidUsageRecordsDailyJsonHandler,
  get20100401AccountsAccountSidUsageRecordsLastMonthJsonHandler,
  get20100401AccountsAccountSidUsageRecordsMonthlyJsonHandler,
  get20100401AccountsAccountSidUsageRecordsThisMonthJsonHandler,
  get20100401AccountsAccountSidUsageRecordsTodayJsonHandler,
  get20100401AccountsAccountSidUsageRecordsYearlyJsonHandler,
  get20100401AccountsAccountSidUsageRecordsYesterdayJsonHandler,
  get20100401AccountsAccountSidUsageTriggersSidJsonHandler,
  post20100401AccountsAccountSidUsageTriggersSidJsonHandler,
  delete20100401AccountsAccountSidUsageTriggersSidJsonHandler,
  get20100401AccountsAccountSidUsageTriggersJsonHandler,
  post20100401AccountsAccountSidUsageTriggersJsonHandler,
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonHandler,
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonHandler,
  delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonHandler,
} from '../routes'

export const _20100401Handler = new Hono()
  .get(
    '/2010-04-01/Accounts.json',
    get20100401AccountsJsonHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts.json',
    post20100401AccountsJsonHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:Sid.json',
    get20100401AccountsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:Sid.json',
    post20100401AccountsSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    get20100401AccountsAccountSidAddressesJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    post20100401AccountsAccountSidAddressesJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    get20100401AccountsAccountSidAddressesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    post20100401AccountsAccountSidAddressesSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    delete20100401AccountsAccountSidAddressesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    get20100401AccountsAccountSidApplicationsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    post20100401AccountsAccountSidApplicationsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    get20100401AccountsAccountSidApplicationsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    post20100401AccountsAccountSidApplicationsSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    delete20100401AccountsAccountSidApplicationsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json',
    get20100401AccountsAccountSidAuthorizedConnectAppsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Balance.json',
    get20100401AccountsAccountSidBalanceJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    get20100401AccountsAccountSidCallsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    post20100401AccountsAccountSidCallsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    get20100401AccountsAccountSidCallsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    post20100401AccountsAccountSidCallsSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    delete20100401AccountsAccountSidCallsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json',
    get20100401AccountsAccountSidCallsCallSidEventsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    get20100401AccountsAccountSidCallsCallSidNotificationsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    get20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    post20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    post20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    delete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    get20100401AccountsAccountSidConferencesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    post20100401AccountsAccountSidConferencesSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences.json',
    get20100401AccountsAccountSidConferencesJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    get20100401AccountsAccountSidConnectAppsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    post20100401AccountsAccountSidConnectAppsSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    delete20100401AccountsAccountSidConnectAppsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps.json',
    get20100401AccountsAccountSidConnectAppsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    post20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    delete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    post20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    post20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    post20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    get20100401AccountsAccountSidKeysSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    post20100401AccountsAccountSidKeysSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    delete20100401AccountsAccountSidKeysSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    get20100401AccountsAccountSidKeysJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    post20100401AccountsAccountSidKeysJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    delete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    get20100401AccountsAccountSidMessagesMessageSidMediaJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    get20100401AccountsAccountSidQueuesQueueSidMembersJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    get20100401AccountsAccountSidMessagesJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    post20100401AccountsAccountSidMessagesJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    get20100401AccountsAccountSidMessagesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    post20100401AccountsAccountSidMessagesSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    delete20100401AccountsAccountSidMessagesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    post20100401AccountsAccountSidMessagesMessageSidFeedbackJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    get20100401AccountsAccountSidSigningKeysJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    post20100401AccountsAccountSidSigningKeysJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json',
    get20100401AccountsAccountSidNotificationsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications.json',
    get20100401AccountsAccountSidNotificationsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    get20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    post20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    delete20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    get20100401AccountsAccountSidOutgoingCallerIdsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    post20100401AccountsAccountSidOutgoingCallerIdsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    post20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json',
    post20100401AccountsAccountSidCallsCallSidPaymentsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    post20100401AccountsAccountSidCallsCallSidPaymentsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    get20100401AccountsAccountSidQueuesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    post20100401AccountsAccountSidQueuesSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    delete20100401AccountsAccountSidQueuesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    get20100401AccountsAccountSidQueuesJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    post20100401AccountsAccountSidQueuesJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    post20100401AccountsAccountSidCallsCallSidTranscriptionsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    get20100401AccountsAccountSidRecordingsSidJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    delete20100401AccountsAccountSidRecordingsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings.json',
    get20100401AccountsAccountSidRecordingsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    get20100401AccountsAccountSidSMSShortCodesSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    post20100401AccountsAccountSidSMSShortCodesSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json',
    get20100401AccountsAccountSidSMSShortCodesJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    get20100401AccountsAccountSidSigningKeysSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    post20100401AccountsAccountSidSigningKeysSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    delete20100401AccountsAccountSidSigningKeysSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    get20100401AccountsAccountSidSIPCredentialListsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    post20100401AccountsAccountSidSIPCredentialListsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    get20100401AccountsAccountSidSIPCredentialListsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    post20100401AccountsAccountSidSIPCredentialListsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    delete20100401AccountsAccountSidSIPCredentialListsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    get20100401AccountsAccountSidSIPDomainsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    post20100401AccountsAccountSidSIPDomainsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    get20100401AccountsAccountSidSIPDomainsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    post20100401AccountsAccountSidSIPDomainsSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    delete20100401AccountsAccountSidSIPDomainsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    get20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    post20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    post20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    delete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json',
    post20100401AccountsAccountSidCallsCallSidSiprecJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    post20100401AccountsAccountSidCallsCallSidSiprecSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json',
    post20100401AccountsAccountSidCallsCallSidStreamsJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    post20100401AccountsAccountSidCallsCallSidStreamsSidJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Tokens.json',
    post20100401AccountsAccountSidTokensJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    get20100401AccountsAccountSidTranscriptionsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    delete20100401AccountsAccountSidTranscriptionsSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions.json',
    get20100401AccountsAccountSidTranscriptionsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records.json',
    get20100401AccountsAccountSidUsageRecordsJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json',
    get20100401AccountsAccountSidUsageRecordsAllTimeJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json',
    get20100401AccountsAccountSidUsageRecordsDailyJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json',
    get20100401AccountsAccountSidUsageRecordsLastMonthJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json',
    get20100401AccountsAccountSidUsageRecordsMonthlyJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json',
    get20100401AccountsAccountSidUsageRecordsThisMonthJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json',
    get20100401AccountsAccountSidUsageRecordsTodayJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json',
    get20100401AccountsAccountSidUsageRecordsYearlyJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json',
    get20100401AccountsAccountSidUsageRecordsYesterdayJsonHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    get20100401AccountsAccountSidUsageTriggersSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    post20100401AccountsAccountSidUsageTriggersSidJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    delete20100401AccountsAccountSidUsageTriggersSidJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    get20100401AccountsAccountSidUsageTriggersJsonHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    post20100401AccountsAccountSidUsageTriggersJsonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
