import { Elysia, t } from 'elysia'
import {
  AccountEnumStatusSchema,
  AccountEnumTypeSchema,
  ApiV2010AccountSchema,
  ApiV2010AccountAddressSchema,
  ApiV2010AccountAddressDependentPhoneNumberSchema,
  ApiV2010AccountApplicationSchema,
  ApiV2010AccountAuthorizedConnectAppSchema,
  ApiV2010AccountAvailablePhoneNumberCountrySchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
  ApiV2010AccountBalanceSchema,
  ApiV2010AccountCallSchema,
  ApiV2010AccountCallCallEventSchema,
  ApiV2010AccountCallCallNotificationSchema,
  ApiV2010AccountCallCallNotificationInstanceSchema,
  ApiV2010AccountCallCallRecordingSchema,
  ApiV2010AccountCallPaymentsSchema,
  ApiV2010AccountCallRealtimeTranscriptionSchema,
  ApiV2010AccountCallSiprecSchema,
  ApiV2010AccountCallStreamSchema,
  ApiV2010AccountCallUserDefinedMessageSchema,
  ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  ApiV2010AccountConferenceSchema,
  ApiV2010AccountConferenceConferenceRecordingSchema,
  ApiV2010AccountConferenceParticipantSchema,
  ApiV2010AccountConnectAppSchema,
  ApiV2010AccountIncomingPhoneNumberSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ApiV2010AccountKeySchema,
  ApiV2010AccountMessageSchema,
  ApiV2010AccountMessageMediaSchema,
  ApiV2010AccountMessageMessageFeedbackSchema,
  ApiV2010AccountNewKeySchema,
  ApiV2010AccountNewSigningKeySchema,
  ApiV2010AccountNotificationSchema,
  ApiV2010AccountNotificationInstanceSchema,
  ApiV2010AccountOutgoingCallerIdSchema,
  ApiV2010AccountQueueSchema,
  ApiV2010AccountQueueMemberSchema,
  ApiV2010AccountRecordingSchema,
  ApiV2010AccountRecordingRecordingAddOnResultSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema,
  ApiV2010AccountRecordingRecordingTranscriptionSchema,
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
  AuthorizedConnectAppEnumPermissionSchema,
  CallEnumStatusSchema,
  CallRecordingEnumSourceSchema,
  CallRecordingEnumStatusSchema,
  ConferenceEnumReasonConferenceEndedSchema,
  ConferenceEnumStatusSchema,
  ConferenceRecordingEnumSourceSchema,
  ConferenceRecordingEnumStatusSchema,
  ConnectAppEnumPermissionSchema,
  DependentPhoneNumberEnumAddressRequirementSchema,
  DependentPhoneNumberEnumEmergencyStatusSchema,
  IncomingPhoneNumberEnumAddressRequirementSchema,
  IncomingPhoneNumberEnumEmergencyAddressStatusSchema,
  IncomingPhoneNumberEnumEmergencyStatusSchema,
  IncomingPhoneNumberEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberLocalEnumAddressRequirementSchema,
  IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema,
  IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
  IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberMobileEnumAddressRequirementSchema,
  IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema,
  IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
  IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberTollFreeEnumAddressRequirementSchema,
  IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema,
  IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
  IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
  MessageEnumDirectionSchema,
  MessageEnumStatusSchema,
  MessageFeedbackEnumOutcomeSchema,
  ParticipantEnumStatusSchema,
  RealtimeTranscriptionEnumStatusSchema,
  RecordingAddOnResultEnumStatusSchema,
  RecordingEnumSourceSchema,
  RecordingEnumStatusSchema,
  RecordingTranscriptionEnumStatusSchema,
  SiprecEnumStatusSchema,
  StreamEnumStatusSchema,
  TranscriptionEnumStatusSchema,
  UsageTriggerEnumRecurringSchema,
  UsageTriggerEnumTriggerFieldSchema,
} from '../../components/schemas'
import { _20100401Model } from './model'

export const _20100401 = new Elysia()
  .model({
    AccountEnumStatus: AccountEnumStatusSchema,
    AccountEnumType: AccountEnumTypeSchema,
    ApiV2010Account: ApiV2010AccountSchema,
    ApiV2010AccountAddress: ApiV2010AccountAddressSchema,
    ApiV2010AccountAddressDependentPhoneNumber: ApiV2010AccountAddressDependentPhoneNumberSchema,
    ApiV2010AccountApplication: ApiV2010AccountApplicationSchema,
    ApiV2010AccountAuthorizedConnectApp: ApiV2010AccountAuthorizedConnectAppSchema,
    ApiV2010AccountAvailablePhoneNumberCountry: ApiV2010AccountAvailablePhoneNumberCountrySchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
    ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip:
      ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
    ApiV2010AccountBalance: ApiV2010AccountBalanceSchema,
    ApiV2010AccountCall: ApiV2010AccountCallSchema,
    ApiV2010AccountCallCallEvent: ApiV2010AccountCallCallEventSchema,
    ApiV2010AccountCallCallNotification: ApiV2010AccountCallCallNotificationSchema,
    ApiV2010AccountCallCallNotificationInstance: ApiV2010AccountCallCallNotificationInstanceSchema,
    ApiV2010AccountCallCallRecording: ApiV2010AccountCallCallRecordingSchema,
    ApiV2010AccountCallPayments: ApiV2010AccountCallPaymentsSchema,
    ApiV2010AccountCallRealtimeTranscription: ApiV2010AccountCallRealtimeTranscriptionSchema,
    ApiV2010AccountCallSiprec: ApiV2010AccountCallSiprecSchema,
    ApiV2010AccountCallStream: ApiV2010AccountCallStreamSchema,
    ApiV2010AccountCallUserDefinedMessage: ApiV2010AccountCallUserDefinedMessageSchema,
    ApiV2010AccountCallUserDefinedMessageSubscription:
      ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
    ApiV2010AccountConference: ApiV2010AccountConferenceSchema,
    ApiV2010AccountConferenceConferenceRecording:
      ApiV2010AccountConferenceConferenceRecordingSchema,
    ApiV2010AccountConferenceParticipant: ApiV2010AccountConferenceParticipantSchema,
    ApiV2010AccountConnectApp: ApiV2010AccountConnectAppSchema,
    ApiV2010AccountIncomingPhoneNumber: ApiV2010AccountIncomingPhoneNumberSchema,
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
    ApiV2010AccountKey: ApiV2010AccountKeySchema,
    ApiV2010AccountMessage: ApiV2010AccountMessageSchema,
    ApiV2010AccountMessageMedia: ApiV2010AccountMessageMediaSchema,
    ApiV2010AccountMessageMessageFeedback: ApiV2010AccountMessageMessageFeedbackSchema,
    ApiV2010AccountNewKey: ApiV2010AccountNewKeySchema,
    ApiV2010AccountNewSigningKey: ApiV2010AccountNewSigningKeySchema,
    ApiV2010AccountNotification: ApiV2010AccountNotificationSchema,
    ApiV2010AccountNotificationInstance: ApiV2010AccountNotificationInstanceSchema,
    ApiV2010AccountOutgoingCallerId: ApiV2010AccountOutgoingCallerIdSchema,
    ApiV2010AccountQueue: ApiV2010AccountQueueSchema,
    ApiV2010AccountQueueMember: ApiV2010AccountQueueMemberSchema,
    ApiV2010AccountRecording: ApiV2010AccountRecordingSchema,
    ApiV2010AccountRecordingRecordingAddOnResult:
      ApiV2010AccountRecordingRecordingAddOnResultSchema,
    ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload:
      ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
    ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData:
      ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema,
    ApiV2010AccountRecordingRecordingTranscription:
      ApiV2010AccountRecordingRecordingTranscriptionSchema,
    ApiV2010AccountShortCode: ApiV2010AccountShortCodeSchema,
    ApiV2010AccountSigningKey: ApiV2010AccountSigningKeySchema,
    ApiV2010AccountSipSipCredentialList: ApiV2010AccountSipSipCredentialListSchema,
    ApiV2010AccountSipSipCredentialListSipCredential:
      ApiV2010AccountSipSipCredentialListSipCredentialSchema,
    ApiV2010AccountSipSipDomain: ApiV2010AccountSipSipDomainSchema,
    ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping:
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
    ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping:
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
    ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping:
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
    ApiV2010AccountSipSipDomainSipCredentialListMapping:
      ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
    ApiV2010AccountSipSipDomainSipIpAccessControlListMapping:
      ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
    ApiV2010AccountSipSipIpAccessControlList: ApiV2010AccountSipSipIpAccessControlListSchema,
    ApiV2010AccountSipSipIpAccessControlListSipIpAddress:
      ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
    ApiV2010AccountToken: ApiV2010AccountTokenSchema,
    ApiV2010AccountTranscription: ApiV2010AccountTranscriptionSchema,
    ApiV2010AccountUsageUsageRecord: ApiV2010AccountUsageUsageRecordSchema,
    ApiV2010AccountUsageUsageRecordUsageRecordAllTime:
      ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema,
    ApiV2010AccountUsageUsageRecordUsageRecordDaily:
      ApiV2010AccountUsageUsageRecordUsageRecordDailySchema,
    ApiV2010AccountUsageUsageRecordUsageRecordLastMonth:
      ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema,
    ApiV2010AccountUsageUsageRecordUsageRecordMonthly:
      ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema,
    ApiV2010AccountUsageUsageRecordUsageRecordThisMonth:
      ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema,
    ApiV2010AccountUsageUsageRecordUsageRecordToday:
      ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema,
    ApiV2010AccountUsageUsageRecordUsageRecordYearly:
      ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema,
    ApiV2010AccountUsageUsageRecordUsageRecordYesterday:
      ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema,
    ApiV2010AccountUsageUsageTrigger: ApiV2010AccountUsageUsageTriggerSchema,
    ApiV2010AccountValidationRequest: ApiV2010AccountValidationRequestSchema,
    AuthorizedConnectAppEnumPermission: AuthorizedConnectAppEnumPermissionSchema,
    CallEnumStatus: CallEnumStatusSchema,
    CallRecordingEnumSource: CallRecordingEnumSourceSchema,
    CallRecordingEnumStatus: CallRecordingEnumStatusSchema,
    ConferenceEnumReasonConferenceEnded: ConferenceEnumReasonConferenceEndedSchema,
    ConferenceEnumStatus: ConferenceEnumStatusSchema,
    ConferenceRecordingEnumSource: ConferenceRecordingEnumSourceSchema,
    ConferenceRecordingEnumStatus: ConferenceRecordingEnumStatusSchema,
    ConnectAppEnumPermission: ConnectAppEnumPermissionSchema,
    DependentPhoneNumberEnumAddressRequirement: DependentPhoneNumberEnumAddressRequirementSchema,
    DependentPhoneNumberEnumEmergencyStatus: DependentPhoneNumberEnumEmergencyStatusSchema,
    IncomingPhoneNumberEnumAddressRequirement: IncomingPhoneNumberEnumAddressRequirementSchema,
    IncomingPhoneNumberEnumEmergencyAddressStatus:
      IncomingPhoneNumberEnumEmergencyAddressStatusSchema,
    IncomingPhoneNumberEnumEmergencyStatus: IncomingPhoneNumberEnumEmergencyStatusSchema,
    IncomingPhoneNumberEnumVoiceReceiveMode: IncomingPhoneNumberEnumVoiceReceiveModeSchema,
    IncomingPhoneNumberLocalEnumAddressRequirement:
      IncomingPhoneNumberLocalEnumAddressRequirementSchema,
    IncomingPhoneNumberLocalEnumEmergencyAddressStatus:
      IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema,
    IncomingPhoneNumberLocalEnumEmergencyStatus: IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
    IncomingPhoneNumberLocalEnumVoiceReceiveMode:
      IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
    IncomingPhoneNumberMobileEnumAddressRequirement:
      IncomingPhoneNumberMobileEnumAddressRequirementSchema,
    IncomingPhoneNumberMobileEnumEmergencyAddressStatus:
      IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema,
    IncomingPhoneNumberMobileEnumEmergencyStatus:
      IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
    IncomingPhoneNumberMobileEnumVoiceReceiveMode:
      IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
    IncomingPhoneNumberTollFreeEnumAddressRequirement:
      IncomingPhoneNumberTollFreeEnumAddressRequirementSchema,
    IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus:
      IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema,
    IncomingPhoneNumberTollFreeEnumEmergencyStatus:
      IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
    IncomingPhoneNumberTollFreeEnumVoiceReceiveMode:
      IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
    MessageEnumDirection: MessageEnumDirectionSchema,
    MessageEnumStatus: MessageEnumStatusSchema,
    MessageFeedbackEnumOutcome: MessageFeedbackEnumOutcomeSchema,
    ParticipantEnumStatus: ParticipantEnumStatusSchema,
    RealtimeTranscriptionEnumStatus: RealtimeTranscriptionEnumStatusSchema,
    RecordingAddOnResultEnumStatus: RecordingAddOnResultEnumStatusSchema,
    RecordingEnumSource: RecordingEnumSourceSchema,
    RecordingEnumStatus: RecordingEnumStatusSchema,
    RecordingTranscriptionEnumStatus: RecordingTranscriptionEnumStatusSchema,
    SiprecEnumStatus: SiprecEnumStatusSchema,
    StreamEnumStatus: StreamEnumStatusSchema,
    TranscriptionEnumStatus: TranscriptionEnumStatusSchema,
    UsageTriggerEnumRecurring: UsageTriggerEnumRecurringSchema,
    UsageTriggerEnumTriggerField: UsageTriggerEnumTriggerFieldSchema,
  })
  .get('/2010-04-01/Accounts.json', ({ query }) => { throw new Error('Not implemented') }, {
    query: _20100401Model.ListAccountQuery,
    response: { 200: _20100401Model.ListAccountResponse200 },
    detail: {
      tags: ['Api20100401Account'],
      summary:
        'Retrieves a collection of Accounts belonging to the account used to make the request',
      description:
        'Retrieves a collection of Accounts belonging to the account used to make the request',
      operationId: 'ListAccount',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts.json', ({ body }) => { throw new Error('Not implemented') }, {
    body: _20100401Model.CreateAccountBody,
    response: { 201: 'ApiV2010Account' },
    detail: {
      tags: ['Api20100401Account'],
      summary: 'Create a new Twilio Subaccount from the account making the request',
      description: 'Create a new Twilio Subaccount from the account making the request',
      operationId: 'CreateAccount',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchAccountParams,
    response: { 200: 'ApiV2010Account' },
    detail: {
      tags: ['Api20100401Account'],
      summary: 'Fetch the account specified by the provided Account Sid',
      description: 'Fetch the account specified by the provided Account Sid',
      operationId: 'FetchAccount',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateAccountParams,
    body: _20100401Model.UpdateAccountBody,
    response: { 200: 'ApiV2010Account', 409: _20100401Model.UpdateAccountResponse409 },
    detail: {
      tags: ['Api20100401Account'],
      summary: 'Modify the properties of a given Account',
      description: 'Modify the properties of a given Account',
      operationId: 'UpdateAccount',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Addresses.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListAddressParams,
    query: _20100401Model.ListAddressQuery,
    response: { 200: _20100401Model.ListAddressResponse200 },
    detail: {
      tags: ['Api20100401Address'],
      operationId: 'ListAddress',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Addresses.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateAddressParams,
    body: _20100401Model.CreateAddressBody,
    response: { 201: 'ApiV2010AccountAddress' },
    detail: {
      tags: ['Api20100401Address'],
      operationId: 'CreateAddress',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchAddressParams,
    response: { 200: 'ApiV2010AccountAddress' },
    detail: {
      tags: ['Api20100401Address'],
      operationId: 'FetchAddress',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateAddressParams,
    body: _20100401Model.UpdateAddressBody,
    response: { 200: 'ApiV2010AccountAddress' },
    detail: {
      tags: ['Api20100401Address'],
      operationId: 'UpdateAddress',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteAddressParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Address'],
      operationId: 'DeleteAddress',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Applications.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListApplicationParams,
    query: _20100401Model.ListApplicationQuery,
    response: { 200: _20100401Model.ListApplicationResponse200 },
    detail: {
      tags: ['Api20100401Application'],
      summary:
        'Retrieve a list of applications representing an application within the requesting account',
      description:
        'Retrieve a list of applications representing an application within the requesting account',
      operationId: 'ListApplication',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Applications.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateApplicationParams,
    body: _20100401Model.CreateApplicationBody,
    response: { 201: 'ApiV2010AccountApplication' },
    detail: {
      tags: ['Api20100401Application'],
      summary: 'Create a new application within your account',
      description: 'Create a new application within your account',
      operationId: 'CreateApplication',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchApplicationParams,
    response: { 200: 'ApiV2010AccountApplication' },
    detail: {
      tags: ['Api20100401Application'],
      summary: 'Fetch the application specified by the provided sid',
      description: 'Fetch the application specified by the provided sid',
      operationId: 'FetchApplication',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateApplicationParams,
    body: _20100401Model.UpdateApplicationBody,
    response: { 200: 'ApiV2010AccountApplication' },
    detail: {
      tags: ['Api20100401Application'],
      summary: "Updates the application's properties",
      description: "Updates the application's properties",
      operationId: 'UpdateApplication',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteApplicationParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Application'],
      summary: 'Delete the application by the specified application sid',
      description: 'Delete the application by the specified application sid',
      operationId: 'DeleteApplication',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchAuthorizedConnectAppParams,
      response: { 200: 'ApiV2010AccountAuthorizedConnectApp' },
      detail: {
        tags: ['Api20100401AuthorizedConnectApp'],
        summary: 'Fetch an instance of an authorized-connect-app',
        description: 'Fetch an instance of an authorized-connect-app',
        operationId: 'FetchAuthorizedConnectApp',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListAuthorizedConnectAppParams,
    query: _20100401Model.ListAuthorizedConnectAppQuery,
    response: { 200: _20100401Model.ListAuthorizedConnectAppResponse200 },
    detail: {
      tags: ['Api20100401AuthorizedConnectApp'],
      summary:
        'Retrieve a list of authorized-connect-apps belonging to the account used to make the request',
      description:
        'Retrieve a list of authorized-connect-apps belonging to the account used to make the request',
      operationId: 'ListAuthorizedConnectApp',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListAvailablePhoneNumberCountryParams,
    query: _20100401Model.ListAvailablePhoneNumberCountryQuery,
    response: { 200: _20100401Model.ListAvailablePhoneNumberCountryResponse200 },
    detail: {
      tags: ['Api20100401AvailablePhoneNumberCountry'],
      operationId: 'ListAvailablePhoneNumberCountry',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchAvailablePhoneNumberCountryParams,
      response: { 200: 'ApiV2010AccountAvailablePhoneNumberCountry' },
      detail: {
        tags: ['Api20100401AvailablePhoneNumberCountry'],
        operationId: 'FetchAvailablePhoneNumberCountry',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberLocalParams,
      query: _20100401Model.ListAvailablePhoneNumberLocalQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberLocalResponse200 },
      detail: {
        tags: ['Api20100401Local'],
        operationId: 'ListAvailablePhoneNumberLocal',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberMachineToMachineParams,
      query: _20100401Model.ListAvailablePhoneNumberMachineToMachineQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberMachineToMachineResponse200 },
      detail: {
        tags: ['Api20100401MachineToMachine'],
        operationId: 'ListAvailablePhoneNumberMachineToMachine',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberMobileParams,
      query: _20100401Model.ListAvailablePhoneNumberMobileQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberMobileResponse200 },
      detail: {
        tags: ['Api20100401Mobile'],
        operationId: 'ListAvailablePhoneNumberMobile',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberNationalParams,
      query: _20100401Model.ListAvailablePhoneNumberNationalQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberNationalResponse200 },
      detail: {
        tags: ['Api20100401National'],
        operationId: 'ListAvailablePhoneNumberNational',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberSharedCostParams,
      query: _20100401Model.ListAvailablePhoneNumberSharedCostQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberSharedCostResponse200 },
      detail: {
        tags: ['Api20100401SharedCost'],
        operationId: 'ListAvailablePhoneNumberSharedCost',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberTollFreeParams,
      query: _20100401Model.ListAvailablePhoneNumberTollFreeQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberTollFreeResponse200 },
      detail: {
        tags: ['Api20100401TollFree'],
        operationId: 'ListAvailablePhoneNumberTollFree',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListAvailablePhoneNumberVoipParams,
      query: _20100401Model.ListAvailablePhoneNumberVoipQuery,
      response: { 200: _20100401Model.ListAvailablePhoneNumberVoipResponse200 },
      detail: {
        tags: ['Api20100401Voip'],
        operationId: 'ListAvailablePhoneNumberVoip',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Balance.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchBalanceParams,
    response: { 200: 'ApiV2010AccountBalance' },
    detail: {
      tags: ['Api20100401Balance'],
      summary:
        'Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
      description:
        'Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
      operationId: 'FetchBalance',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Calls.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListCallParams,
    query: _20100401Model.ListCallQuery,
    response: { 200: _20100401Model.ListCallResponse200 },
    detail: {
      tags: ['Api20100401Call'],
      summary: 'Retrieves a collection of calls made to and from your account',
      description: 'Retrieves a collection of calls made to and from your account',
      operationId: 'ListCall',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Calls.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateCallParams,
    body: _20100401Model.CreateCallBody,
    response: { 201: 'ApiV2010AccountCall' },
    detail: {
      tags: ['Api20100401Call'],
      summary:
        'Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections',
      description:
        'Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections',
      operationId: 'CreateCall',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchCallParams,
    response: { 200: 'ApiV2010AccountCall' },
    detail: {
      tags: ['Api20100401Call'],
      summary: 'Fetch the call specified by the provided Call SID',
      description: 'Fetch the call specified by the provided Call SID',
      operationId: 'FetchCall',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateCallParams,
    body: _20100401Model.UpdateCallBody,
    response: { 200: 'ApiV2010AccountCall' },
    detail: {
      tags: ['Api20100401Call'],
      summary: 'Initiates a call redirect or terminates a call',
      description: 'Initiates a call redirect or terminates a call',
      operationId: 'UpdateCall',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteCallParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Call'],
      summary:
        'Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.',
      description:
        'Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.',
      operationId: 'DeleteCall',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListCallEventParams,
    query: _20100401Model.ListCallEventQuery,
    response: { 200: _20100401Model.ListCallEventResponse200 },
    detail: {
      tags: ['Api20100401Event'],
      summary: 'Retrieve a list of all events for a call.',
      description: 'Retrieve a list of all events for a call.',
      operationId: 'ListCallEvent',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchCallNotificationParams,
      response: { 200: 'ApiV2010AccountCallCallNotificationInstance' },
      detail: {
        tags: ['Api20100401CallNotification'],
        operationId: 'FetchCallNotification',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListCallNotificationParams,
      query: _20100401Model.ListCallNotificationQuery,
      response: { 200: _20100401Model.ListCallNotificationResponse200 },
      detail: {
        tags: ['Api20100401CallNotification'],
        operationId: 'ListCallNotification',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListCallRecordingParams,
      query: _20100401Model.ListCallRecordingQuery,
      response: { 200: _20100401Model.ListCallRecordingResponse200 },
      detail: {
        tags: ['Api20100401CallRecording'],
        summary: 'Retrieve a list of recordings belonging to the call used to make the request',
        description: 'Retrieve a list of recordings belonging to the call used to make the request',
        operationId: 'ListCallRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateCallRecordingParams,
      body: _20100401Model.CreateCallRecordingBody,
      response: {
        200: 'ApiV2010AccountCallCallRecording',
        201: 'ApiV2010AccountCallCallRecording',
      },
      detail: {
        tags: ['Api20100401CallRecording'],
        summary: 'Create a recording for the call',
        description: 'Create a recording for the call',
        operationId: 'CreateCallRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchCallRecordingParams,
    response: { 200: 'ApiV2010AccountCallCallRecording' },
    detail: {
      tags: ['Api20100401CallRecording'],
      summary: 'Fetch an instance of a recording for a call',
      description: 'Fetch an instance of a recording for a call',
      operationId: 'FetchCallRecording',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateCallRecordingParams,
      body: _20100401Model.UpdateCallRecordingBody,
      response: {
        200: 'ApiV2010AccountCallCallRecording',
        408: _20100401Model.UpdateCallRecordingResponse408,
      },
      detail: {
        tags: ['Api20100401CallRecording'],
        summary:
          'Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.',
        description:
          'Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.',
        operationId: 'UpdateCallRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteCallRecordingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401CallRecording'],
        summary: 'Delete a recording from your account',
        description: 'Delete a recording from your account',
        operationId: 'DeleteCallRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchConferenceParams,
    response: { 200: 'ApiV2010AccountConference' },
    detail: {
      tags: ['Api20100401Conference'],
      summary: 'Fetch an instance of a conference',
      description: 'Fetch an instance of a conference',
      operationId: 'FetchConference',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateConferenceParams,
    body: _20100401Model.UpdateConferenceBody,
    response: { 200: 'ApiV2010AccountConference' },
    detail: {
      tags: ['Api20100401Conference'],
      operationId: 'UpdateConference',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Conferences.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListConferenceParams,
    query: _20100401Model.ListConferenceQuery,
    response: { 200: _20100401Model.ListConferenceResponse200 },
    detail: {
      tags: ['Api20100401Conference'],
      summary: 'Retrieve a list of conferences belonging to the account used to make the request',
      description:
        'Retrieve a list of conferences belonging to the account used to make the request',
      operationId: 'ListConference',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListConferenceRecordingParams,
      query: _20100401Model.ListConferenceRecordingQuery,
      response: { 200: _20100401Model.ListConferenceRecordingResponse200 },
      detail: {
        tags: ['Api20100401ConferenceRecording'],
        summary: 'Retrieve a list of recordings belonging to the call used to make the request',
        description: 'Retrieve a list of recordings belonging to the call used to make the request',
        operationId: 'ListConferenceRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchConferenceRecordingParams,
      response: { 200: 'ApiV2010AccountConferenceConferenceRecording' },
      detail: {
        tags: ['Api20100401ConferenceRecording'],
        summary: 'Fetch an instance of a recording for a call',
        description: 'Fetch an instance of a recording for a call',
        operationId: 'FetchConferenceRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateConferenceRecordingParams,
      body: _20100401Model.UpdateConferenceRecordingBody,
      response: { 200: 'ApiV2010AccountConferenceConferenceRecording' },
      detail: {
        tags: ['Api20100401ConferenceRecording'],
        summary:
          'Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.',
        description:
          'Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.',
        operationId: 'UpdateConferenceRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteConferenceRecordingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401ConferenceRecording'],
        summary: 'Delete a recording from your account',
        description: 'Delete a recording from your account',
        operationId: 'DeleteConferenceRecording',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchConnectAppParams,
    response: { 200: 'ApiV2010AccountConnectApp' },
    detail: {
      tags: ['Api20100401ConnectApp'],
      summary: 'Fetch an instance of a connect-app',
      description: 'Fetch an instance of a connect-app',
      operationId: 'FetchConnectApp',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateConnectAppParams,
    body: _20100401Model.UpdateConnectAppBody,
    response: { 200: 'ApiV2010AccountConnectApp' },
    detail: {
      tags: ['Api20100401ConnectApp'],
      summary: 'Update a connect-app with the specified parameters',
      description: 'Update a connect-app with the specified parameters',
      operationId: 'UpdateConnectApp',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteConnectAppParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401ConnectApp'],
      summary: 'Delete an instance of a connect-app',
      description: 'Delete an instance of a connect-app',
      operationId: 'DeleteConnectApp',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/ConnectApps.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListConnectAppParams,
    query: _20100401Model.ListConnectAppQuery,
    response: { 200: _20100401Model.ListConnectAppResponse200 },
    detail: {
      tags: ['Api20100401ConnectApp'],
      summary: 'Retrieve a list of connect-apps belonging to the account used to make the request',
      description:
        'Retrieve a list of connect-apps belonging to the account used to make the request',
      operationId: 'ListConnectApp',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListDependentPhoneNumberParams,
      query: _20100401Model.ListDependentPhoneNumberQuery,
      response: { 200: _20100401Model.ListDependentPhoneNumberResponse200 },
      detail: {
        tags: ['Api20100401DependentPhoneNumber'],
        operationId: 'ListDependentPhoneNumber',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchIncomingPhoneNumberParams,
    response: { 200: 'ApiV2010AccountIncomingPhoneNumber' },
    detail: {
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Fetch an incoming-phone-number belonging to the account used to make the request.',
      description:
        'Fetch an incoming-phone-number belonging to the account used to make the request.',
      operationId: 'FetchIncomingPhoneNumber',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateIncomingPhoneNumberParams,
      body: _20100401Model.UpdateIncomingPhoneNumberBody,
      response: { 200: 'ApiV2010AccountIncomingPhoneNumber' },
      detail: {
        tags: ['Api20100401IncomingPhoneNumber'],
        summary: 'Update an incoming-phone-number instance.',
        description: 'Update an incoming-phone-number instance.',
        operationId: 'UpdateIncomingPhoneNumber',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete('/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteIncomingPhoneNumberParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Delete a phone-numbers belonging to the account used to make the request.',
      description: 'Delete a phone-numbers belonging to the account used to make the request.',
      operationId: 'DeleteIncomingPhoneNumber',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListIncomingPhoneNumberParams,
    query: _20100401Model.ListIncomingPhoneNumberQuery,
    response: { 200: _20100401Model.ListIncomingPhoneNumberResponse200 },
    detail: {
      tags: ['Api20100401IncomingPhoneNumber'],
      summary:
        'Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.',
      description:
        'Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.',
      operationId: 'ListIncomingPhoneNumber',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateIncomingPhoneNumberParams,
    body: _20100401Model.CreateIncomingPhoneNumberBody,
    response: { 201: 'ApiV2010AccountIncomingPhoneNumber' },
    detail: {
      tags: ['Api20100401IncomingPhoneNumber'],
      summary: 'Purchase a phone-number for the account.',
      description: 'Purchase a phone-number for the account.',
      operationId: 'CreateIncomingPhoneNumber',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchIncomingPhoneNumberAssignedAddOnParams,
      response: { 200: 'ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn' },
      detail: {
        tags: ['Api20100401AssignedAddOn'],
        summary: 'Fetch an instance of an Add-on installation currently assigned to this Number.',
        description:
          'Fetch an instance of an Add-on installation currently assigned to this Number.',
        operationId: 'FetchIncomingPhoneNumberAssignedAddOn',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteIncomingPhoneNumberAssignedAddOnParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401AssignedAddOn'],
        summary: 'Remove the assignment of an Add-on installation from the Number specified.',
        description: 'Remove the assignment of an Add-on installation from the Number specified.',
        operationId: 'DeleteIncomingPhoneNumberAssignedAddOn',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListIncomingPhoneNumberAssignedAddOnParams,
      query: _20100401Model.ListIncomingPhoneNumberAssignedAddOnQuery,
      response: { 200: _20100401Model.ListIncomingPhoneNumberAssignedAddOnResponse200 },
      detail: {
        tags: ['Api20100401AssignedAddOn'],
        summary: 'Retrieve a list of Add-on installations currently assigned to this Number.',
        description: 'Retrieve a list of Add-on installations currently assigned to this Number.',
        operationId: 'ListIncomingPhoneNumberAssignedAddOn',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateIncomingPhoneNumberAssignedAddOnParams,
      body: _20100401Model.CreateIncomingPhoneNumberAssignedAddOnBody,
      response: { 201: 'ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn' },
      detail: {
        tags: ['Api20100401AssignedAddOn'],
        summary: 'Assign an Add-on installation to the Number specified.',
        description: 'Assign an Add-on installation to the Number specified.',
        operationId: 'CreateIncomingPhoneNumberAssignedAddOn',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchIncomingPhoneNumberAssignedAddOnExtensionParams,
      response: {
        200: 'ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension',
      },
      detail: {
        tags: ['Api20100401AssignedAddOnExtension'],
        summary: 'Fetch an instance of an Extension for the Assigned Add-on.',
        description: 'Fetch an instance of an Extension for the Assigned Add-on.',
        operationId: 'FetchIncomingPhoneNumberAssignedAddOnExtension',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListIncomingPhoneNumberAssignedAddOnExtensionParams,
      query: _20100401Model.ListIncomingPhoneNumberAssignedAddOnExtensionQuery,
      response: { 200: _20100401Model.ListIncomingPhoneNumberAssignedAddOnExtensionResponse200 },
      detail: {
        tags: ['Api20100401AssignedAddOnExtension'],
        summary: 'Retrieve a list of Extensions for the Assigned Add-on.',
        description: 'Retrieve a list of Extensions for the Assigned Add-on.',
        operationId: 'ListIncomingPhoneNumberAssignedAddOnExtension',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListIncomingPhoneNumberLocalParams,
      query: _20100401Model.ListIncomingPhoneNumberLocalQuery,
      response: { 200: _20100401Model.ListIncomingPhoneNumberLocalResponse200 },
      detail: {
        tags: ['Api20100401IncomingPhoneNumberLocal'],
        operationId: 'ListIncomingPhoneNumberLocal',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateIncomingPhoneNumberLocalParams,
      body: _20100401Model.CreateIncomingPhoneNumberLocalBody,
      response: { 201: 'ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal' },
      detail: {
        tags: ['Api20100401IncomingPhoneNumberLocal'],
        operationId: 'CreateIncomingPhoneNumberLocal',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListIncomingPhoneNumberMobileParams,
      query: _20100401Model.ListIncomingPhoneNumberMobileQuery,
      response: { 200: _20100401Model.ListIncomingPhoneNumberMobileResponse200 },
      detail: {
        tags: ['Api20100401IncomingPhoneNumberMobile'],
        operationId: 'ListIncomingPhoneNumberMobile',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateIncomingPhoneNumberMobileParams,
      body: _20100401Model.CreateIncomingPhoneNumberMobileBody,
      response: { 201: 'ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile' },
      detail: {
        tags: ['Api20100401IncomingPhoneNumberMobile'],
        operationId: 'CreateIncomingPhoneNumberMobile',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListIncomingPhoneNumberTollFreeParams,
      query: _20100401Model.ListIncomingPhoneNumberTollFreeQuery,
      response: { 200: _20100401Model.ListIncomingPhoneNumberTollFreeResponse200 },
      detail: {
        tags: ['Api20100401IncomingPhoneNumberTollFree'],
        operationId: 'ListIncomingPhoneNumberTollFree',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateIncomingPhoneNumberTollFreeParams,
      body: _20100401Model.CreateIncomingPhoneNumberTollFreeBody,
      response: { 201: 'ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree' },
      detail: {
        tags: ['Api20100401IncomingPhoneNumberTollFree'],
        operationId: 'CreateIncomingPhoneNumberTollFree',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchKeyParams,
    response: { 200: 'ApiV2010AccountKey' },
    detail: {
      tags: ['Api20100401Key'],
      operationId: 'FetchKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateKeyParams,
    body: _20100401Model.UpdateKeyBody,
    response: { 200: 'ApiV2010AccountKey' },
    detail: {
      tags: ['Api20100401Key'],
      operationId: 'UpdateKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteKeyParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Key'],
      operationId: 'DeleteKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Keys.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListKeyParams,
    query: _20100401Model.ListKeyQuery,
    response: { 200: _20100401Model.ListKeyResponse200 },
    detail: {
      tags: ['Api20100401Key'],
      operationId: 'ListKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Keys.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateNewKeyParams,
    body: _20100401Model.CreateNewKeyBody,
    response: { 201: 'ApiV2010AccountNewKey' },
    detail: {
      tags: ['Api20100401NewKey'],
      operationId: 'CreateNewKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchMediaParams,
      response: { 200: 'ApiV2010AccountMessageMedia' },
      detail: {
        tags: ['Api20100401MediaInstance'],
        summary: 'Fetch a single Media resource associated with a specific Message resource',
        description: 'Fetch a single Media resource associated with a specific Message resource',
        operationId: 'FetchMedia',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteMediaParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401MediaInstance'],
        summary: 'Delete the Media resource.',
        description: 'Delete the Media resource.',
        operationId: 'DeleteMedia',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListMediaParams,
      query: _20100401Model.ListMediaQuery,
      response: { 200: _20100401Model.ListMediaResponse200 },
      detail: {
        tags: ['Api20100401Media'],
        summary: 'Read a list of Media resources associated with a specific Message resource',
        description: 'Read a list of Media resources associated with a specific Message resource',
        operationId: 'ListMedia',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchMemberParams,
      response: { 200: 'ApiV2010AccountQueueMember' },
      detail: {
        tags: ['Api20100401Member'],
        summary: 'Fetch a specific member from the queue',
        description: 'Fetch a specific member from the queue',
        operationId: 'FetchMember',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateMemberParams,
      body: _20100401Model.UpdateMemberBody,
      response: { 200: 'ApiV2010AccountQueueMember' },
      detail: {
        tags: ['Api20100401Member'],
        summary:
          "Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL",
        description:
          "Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL",
        operationId: 'UpdateMember',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListMemberParams,
      query: _20100401Model.ListMemberQuery,
      response: { 200: _20100401Model.ListMemberResponse200 },
      detail: {
        tags: ['Api20100401Member'],
        summary: 'Retrieve the members of the queue',
        description: 'Retrieve the members of the queue',
        operationId: 'ListMember',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Messages.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListMessageParams,
    query: _20100401Model.ListMessageQuery,
    response: { 200: _20100401Model.ListMessageResponse200 },
    detail: {
      tags: ['Api20100401Message'],
      summary: 'Retrieve a list of Message resources associated with a Twilio Account',
      description: 'Retrieve a list of Message resources associated with a Twilio Account',
      operationId: 'ListMessage',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Messages.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateMessageParams,
    body: _20100401Model.CreateMessageBody,
    response: { 201: 'ApiV2010AccountMessage' },
    detail: {
      tags: ['Api20100401Message'],
      summary: 'Send a message',
      description: 'Send a message',
      operationId: 'CreateMessage',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchMessageParams,
    response: { 200: 'ApiV2010AccountMessage' },
    detail: {
      tags: ['Api20100401Message'],
      summary: 'Fetch a specific Message',
      description: 'Fetch a specific Message',
      operationId: 'FetchMessage',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateMessageParams,
    body: _20100401Model.UpdateMessageBody,
    response: { 200: 'ApiV2010AccountMessage' },
    detail: {
      tags: ['Api20100401Message'],
      summary:
        'Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)',
      description:
        'Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)',
      operationId: 'UpdateMessage',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteMessageParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Message'],
      summary: 'Deletes a Message resource from your account',
      description: 'Deletes a Message resource from your account',
      operationId: 'DeleteMessage',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateMessageFeedbackParams,
      body: _20100401Model.CreateMessageFeedbackBody,
      response: { 200: 'ApiV2010AccountMessageMessageFeedback' },
      detail: {
        tags: ['Api20100401Feedback'],
        summary:
          'Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message',
        description:
          'Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message',
        operationId: 'CreateMessageFeedback',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/SigningKeys.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListSigningKeyParams,
    query: _20100401Model.ListSigningKeyQuery,
    response: { 200: _20100401Model.ListSigningKeyResponse200 },
    detail: {
      tags: ['Api20100401SigningKey'],
      operationId: 'ListSigningKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/SigningKeys.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateNewSigningKeyParams,
    body: _20100401Model.CreateNewSigningKeyBody,
    response: { 201: 'ApiV2010AccountNewSigningKey' },
    detail: {
      tags: ['Api20100401NewSigningKey'],
      summary: 'Create a new Signing Key for the account making the request.',
      description: 'Create a new Signing Key for the account making the request.',
      operationId: 'CreateNewSigningKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchNotificationParams,
    response: { 200: 'ApiV2010AccountNotificationInstance' },
    detail: {
      tags: ['Api20100401Notification'],
      summary: 'Fetch a notification belonging to the account used to make the request',
      description: 'Fetch a notification belonging to the account used to make the request',
      operationId: 'FetchNotification',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Notifications.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListNotificationParams,
    query: _20100401Model.ListNotificationQuery,
    response: { 200: _20100401Model.ListNotificationResponse200 },
    detail: {
      tags: ['Api20100401Notification'],
      summary: 'Retrieve a list of notifications belonging to the account used to make the request',
      description:
        'Retrieve a list of notifications belonging to the account used to make the request',
      operationId: 'ListNotification',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchOutgoingCallerIdParams,
    response: { 200: 'ApiV2010AccountOutgoingCallerId' },
    detail: {
      tags: ['Api20100401OutgoingCallerId'],
      summary: 'Fetch an outgoing-caller-id belonging to the account used to make the request',
      description: 'Fetch an outgoing-caller-id belonging to the account used to make the request',
      operationId: 'FetchOutgoingCallerId',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateOutgoingCallerIdParams,
    body: _20100401Model.UpdateOutgoingCallerIdBody,
    response: { 200: 'ApiV2010AccountOutgoingCallerId' },
    detail: {
      tags: ['Api20100401OutgoingCallerId'],
      summary: 'Updates the caller-id',
      description: 'Updates the caller-id',
      operationId: 'UpdateOutgoingCallerId',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteOutgoingCallerIdParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401OutgoingCallerId'],
      summary: 'Delete the caller-id specified from the account',
      description: 'Delete the caller-id specified from the account',
      operationId: 'DeleteOutgoingCallerId',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListOutgoingCallerIdParams,
    query: _20100401Model.ListOutgoingCallerIdQuery,
    response: { 200: _20100401Model.ListOutgoingCallerIdResponse200 },
    detail: {
      tags: ['Api20100401OutgoingCallerId'],
      summary:
        'Retrieve a list of outgoing-caller-ids belonging to the account used to make the request',
      description:
        'Retrieve a list of outgoing-caller-ids belonging to the account used to make the request',
      operationId: 'ListOutgoingCallerId',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateValidationRequestParams,
    body: _20100401Model.CreateValidationRequestBody,
    response: { 200: 'ApiV2010AccountValidationRequest' },
    detail: {
      tags: ['Api20100401ValidationRequest'],
      operationId: 'CreateValidationRequest',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchParticipantParams,
      response: { 200: 'ApiV2010AccountConferenceParticipant' },
      detail: {
        tags: ['Api20100401Participant'],
        summary: 'Fetch an instance of a participant',
        description: 'Fetch an instance of a participant',
        operationId: 'FetchParticipant',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateParticipantParams,
      body: _20100401Model.UpdateParticipantBody,
      response: { 200: 'ApiV2010AccountConferenceParticipant' },
      detail: {
        tags: ['Api20100401Participant'],
        summary: 'Update the properties of the participant',
        description: 'Update the properties of the participant',
        operationId: 'UpdateParticipant',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteParticipantParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401Participant'],
        summary: 'Kick a participant from a given conference',
        description: 'Kick a participant from a given conference',
        operationId: 'DeleteParticipant',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListParticipantParams,
      query: _20100401Model.ListParticipantQuery,
      response: { 200: _20100401Model.ListParticipantResponse200 },
      detail: {
        tags: ['Api20100401Participant'],
        summary:
          'Retrieve a list of participants belonging to the account used to make the request',
        description:
          'Retrieve a list of participants belonging to the account used to make the request',
        operationId: 'ListParticipant',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateParticipantParams,
      body: _20100401Model.CreateParticipantBody,
      response: { 201: 'ApiV2010AccountConferenceParticipant' },
      detail: {
        tags: ['Api20100401Participant'],
        operationId: 'CreateParticipant',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post('/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreatePaymentsParams,
    body: _20100401Model.CreatePaymentsBody,
    response: { 201: 'ApiV2010AccountCallPayments' },
    detail: {
      tags: ['Api20100401Payment'],
      summary: 'create an instance of payments. This will start a new payments session',
      description: 'create an instance of payments. This will start a new payments session',
      operationId: 'CreatePayments',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdatePaymentsParams,
      body: _20100401Model.UpdatePaymentsBody,
      response: { 202: 'ApiV2010AccountCallPayments' },
      detail: {
        tags: ['Api20100401Payment'],
        summary: 'update an instance of payments with different phases of payment flows.',
        description: 'update an instance of payments with different phases of payment flows.',
        operationId: 'UpdatePayments',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchQueueParams,
    response: { 200: 'ApiV2010AccountQueue' },
    detail: {
      tags: ['Api20100401Queue'],
      summary: 'Fetch an instance of a queue identified by the QueueSid',
      description: 'Fetch an instance of a queue identified by the QueueSid',
      operationId: 'FetchQueue',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateQueueParams,
    body: _20100401Model.UpdateQueueBody,
    response: { 200: 'ApiV2010AccountQueue' },
    detail: {
      tags: ['Api20100401Queue'],
      summary: 'Update the queue with the new parameters',
      description: 'Update the queue with the new parameters',
      operationId: 'UpdateQueue',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteQueueParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Queue'],
      summary: 'Remove an empty queue',
      description: 'Remove an empty queue',
      operationId: 'DeleteQueue',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Queues.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListQueueParams,
    query: _20100401Model.ListQueueQuery,
    response: { 200: _20100401Model.ListQueueResponse200 },
    detail: {
      tags: ['Api20100401Queue'],
      summary: 'Retrieve a list of queues belonging to the account used to make the request',
      description: 'Retrieve a list of queues belonging to the account used to make the request',
      operationId: 'ListQueue',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Queues.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateQueueParams,
    body: _20100401Model.CreateQueueBody,
    response: { 201: 'ApiV2010AccountQueue' },
    detail: {
      tags: ['Api20100401Queue'],
      summary: 'Create a queue',
      description: 'Create a queue',
      operationId: 'CreateQueue',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateRealtimeTranscriptionParams,
      body: _20100401Model.CreateRealtimeTranscriptionBody,
      response: { 200: 'ApiV2010AccountCallRealtimeTranscription' },
      detail: {
        tags: ['Api20100401CallTranscription'],
        summary: 'Create a Transcription',
        description: 'Create a Transcription',
        operationId: 'CreateRealtimeTranscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateRealtimeTranscriptionParams,
      body: _20100401Model.UpdateRealtimeTranscriptionBody,
      response: { 200: 'ApiV2010AccountCallRealtimeTranscription' },
      detail: {
        tags: ['Api20100401CallTranscription'],
        summary:
          'Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource',
        description:
          'Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource',
        operationId: 'UpdateRealtimeTranscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchRecordingParams,
    query: _20100401Model.FetchRecordingQuery,
    response: { 200: 'ApiV2010AccountRecording' },
    detail: {
      tags: ['Api20100401Recording'],
      summary: 'Fetch an instance of a recording',
      description: 'Fetch an instance of a recording',
      operationId: 'FetchRecording',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteRecordingParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Recording'],
      summary: 'Delete a recording from your account',
      description: 'Delete a recording from your account',
      operationId: 'DeleteRecording',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Recordings.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListRecordingParams,
    query: _20100401Model.ListRecordingQuery,
    response: { 200: _20100401Model.ListRecordingResponse200 },
    detail: {
      tags: ['Api20100401Recording'],
      summary: 'Retrieve a list of recordings belonging to the account used to make the request',
      description:
        'Retrieve a list of recordings belonging to the account used to make the request',
      operationId: 'ListRecording',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchRecordingAddOnResultParams,
      response: { 200: 'ApiV2010AccountRecordingRecordingAddOnResult' },
      detail: {
        tags: ['Api20100401AddOnResult'],
        summary: 'Fetch an instance of an AddOnResult',
        description: 'Fetch an instance of an AddOnResult',
        operationId: 'FetchRecordingAddOnResult',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteRecordingAddOnResultParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401AddOnResult'],
        summary: 'Delete a result and purge all associated Payloads',
        description: 'Delete a result and purge all associated Payloads',
        operationId: 'DeleteRecordingAddOnResult',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListRecordingAddOnResultParams,
      query: _20100401Model.ListRecordingAddOnResultQuery,
      response: { 200: _20100401Model.ListRecordingAddOnResultResponse200 },
      detail: {
        tags: ['Api20100401AddOnResult'],
        summary: 'Retrieve a list of results belonging to the recording',
        description: 'Retrieve a list of results belonging to the recording',
        operationId: 'ListRecordingAddOnResult',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchRecordingAddOnResultPayloadParams,
      response: { 200: 'ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload' },
      detail: {
        tags: ['Api20100401Payload'],
        summary: 'Fetch an instance of a result payload',
        description: 'Fetch an instance of a result payload',
        operationId: 'FetchRecordingAddOnResultPayload',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteRecordingAddOnResultPayloadParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401Payload'],
        summary: 'Delete a payload from the result along with all associated Data',
        description: 'Delete a payload from the result along with all associated Data',
        operationId: 'DeleteRecordingAddOnResultPayload',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults/:AddOnResultSid/Payloads.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListRecordingAddOnResultPayloadParams,
      query: _20100401Model.ListRecordingAddOnResultPayloadQuery,
      response: { 200: _20100401Model.ListRecordingAddOnResultPayloadResponse200 },
      detail: {
        tags: ['Api20100401Payload'],
        summary: 'Retrieve a list of payloads belonging to the AddOnResult',
        description: 'Retrieve a list of payloads belonging to the AddOnResult',
        operationId: 'ListRecordingAddOnResultPayload',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchRecordingAddOnResultPayloadDataParams,
      response: {
        307: 'ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData',
      },
      detail: {
        tags: ['Api20100401Data'],
        summary: 'Fetch an instance of a result payload',
        description: 'Fetch an instance of a result payload',
        operationId: 'FetchRecordingAddOnResultPayloadData',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchRecordingTranscriptionParams,
      response: { 200: 'ApiV2010AccountRecordingRecordingTranscription' },
      detail: {
        tags: ['Api20100401RecordingTranscription'],
        operationId: 'FetchRecordingTranscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteRecordingTranscriptionParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401RecordingTranscription'],
        operationId: 'DeleteRecordingTranscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListRecordingTranscriptionParams,
      query: _20100401Model.ListRecordingTranscriptionQuery,
      response: { 200: _20100401Model.ListRecordingTranscriptionResponse200 },
      detail: {
        tags: ['Api20100401RecordingTranscription'],
        operationId: 'ListRecordingTranscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchShortCodeParams,
    response: { 200: 'ApiV2010AccountShortCode' },
    detail: {
      tags: ['Api20100401ShortCode'],
      summary: 'Fetch an instance of a short code',
      description: 'Fetch an instance of a short code',
      operationId: 'FetchShortCode',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateShortCodeParams,
    body: _20100401Model.UpdateShortCodeBody,
    response: { 200: 'ApiV2010AccountShortCode' },
    detail: {
      tags: ['Api20100401ShortCode'],
      summary: 'Update a short code with the following parameters',
      description: 'Update a short code with the following parameters',
      operationId: 'UpdateShortCode',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListShortCodeParams,
    query: _20100401Model.ListShortCodeQuery,
    response: { 200: _20100401Model.ListShortCodeResponse200 },
    detail: {
      tags: ['Api20100401ShortCode'],
      summary: 'Retrieve a list of short-codes belonging to the account used to make the request',
      description:
        'Retrieve a list of short-codes belonging to the account used to make the request',
      operationId: 'ListShortCode',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchSigningKeyParams,
    response: { 200: 'ApiV2010AccountSigningKey' },
    detail: {
      tags: ['Api20100401SigningKey'],
      operationId: 'FetchSigningKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateSigningKeyParams,
    body: _20100401Model.UpdateSigningKeyBody,
    response: { 200: 'ApiV2010AccountSigningKey' },
    detail: {
      tags: ['Api20100401SigningKey'],
      operationId: 'UpdateSigningKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteSigningKeyParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401SigningKey'],
      operationId: 'DeleteSigningKey',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipAuthCallsCredentialListMappingParams,
      query: _20100401Model.ListSipAuthCallsCredentialListMappingQuery,
      response: { 200: _20100401Model.ListSipAuthCallsCredentialListMappingResponse200 },
      detail: {
        tags: ['Api20100401AuthCallsCredentialListMapping'],
        summary:
          'Retrieve a list of credential list mappings belonging to the domain used in the request',
        description:
          'Retrieve a list of credential list mappings belonging to the domain used in the request',
        operationId: 'ListSipAuthCallsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipAuthCallsCredentialListMappingParams,
      body: _20100401Model.CreateSipAuthCallsCredentialListMappingBody,
      response: {
        201: 'ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping',
      },
      detail: {
        tags: ['Api20100401AuthCallsCredentialListMapping'],
        summary: 'Create a new credential list mapping resource',
        description: 'Create a new credential list mapping resource',
        operationId: 'CreateSipAuthCallsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipAuthCallsCredentialListMappingParams,
      response: {
        200: 'ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping',
      },
      detail: {
        tags: ['Api20100401AuthCallsCredentialListMapping'],
        summary: 'Fetch a specific instance of a credential list mapping',
        description: 'Fetch a specific instance of a credential list mapping',
        operationId: 'FetchSipAuthCallsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipAuthCallsCredentialListMappingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401AuthCallsCredentialListMapping'],
        summary: 'Delete a credential list mapping from the requested domain',
        description: 'Delete a credential list mapping from the requested domain',
        operationId: 'DeleteSipAuthCallsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipAuthCallsIpAccessControlListMappingParams,
      query: _20100401Model.ListSipAuthCallsIpAccessControlListMappingQuery,
      response: { 200: _20100401Model.ListSipAuthCallsIpAccessControlListMappingResponse200 },
      detail: {
        tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
        summary:
          'Retrieve a list of IP Access Control List mappings belonging to the domain used in the request',
        description:
          'Retrieve a list of IP Access Control List mappings belonging to the domain used in the request',
        operationId: 'ListSipAuthCallsIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipAuthCallsIpAccessControlListMappingParams,
      body: _20100401Model.CreateSipAuthCallsIpAccessControlListMappingBody,
      response: {
        201: 'ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping',
      },
      detail: {
        tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
        summary: 'Create a new IP Access Control List mapping',
        description: 'Create a new IP Access Control List mapping',
        operationId: 'CreateSipAuthCallsIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipAuthCallsIpAccessControlListMappingParams,
      response: {
        200: 'ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping',
      },
      detail: {
        tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
        summary: 'Fetch a specific instance of an IP Access Control List mapping',
        description: 'Fetch a specific instance of an IP Access Control List mapping',
        operationId: 'FetchSipAuthCallsIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipAuthCallsIpAccessControlListMappingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401AuthCallsIpAccessControlListMapping'],
        summary: 'Delete an IP Access Control List mapping from the requested domain',
        description: 'Delete an IP Access Control List mapping from the requested domain',
        operationId: 'DeleteSipAuthCallsIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipAuthRegistrationsCredentialListMappingParams,
      query: _20100401Model.ListSipAuthRegistrationsCredentialListMappingQuery,
      response: { 200: _20100401Model.ListSipAuthRegistrationsCredentialListMappingResponse200 },
      detail: {
        tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
        summary:
          'Retrieve a list of credential list mappings belonging to the domain used in the request',
        description:
          'Retrieve a list of credential list mappings belonging to the domain used in the request',
        operationId: 'ListSipAuthRegistrationsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipAuthRegistrationsCredentialListMappingParams,
      body: _20100401Model.CreateSipAuthRegistrationsCredentialListMappingBody,
      response: {
        201: 'ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping',
      },
      detail: {
        tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
        summary: 'Create a new credential list mapping resource',
        description: 'Create a new credential list mapping resource',
        operationId: 'CreateSipAuthRegistrationsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipAuthRegistrationsCredentialListMappingParams,
      response: {
        200: 'ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping',
      },
      detail: {
        tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
        summary: 'Fetch a specific instance of a credential list mapping',
        description: 'Fetch a specific instance of a credential list mapping',
        operationId: 'FetchSipAuthRegistrationsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipAuthRegistrationsCredentialListMappingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401AuthRegistrationsCredentialListMapping'],
        summary: 'Delete a credential list mapping from the requested domain',
        description: 'Delete a credential list mapping from the requested domain',
        operationId: 'DeleteSipAuthRegistrationsCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipCredentialParams,
      query: _20100401Model.ListSipCredentialQuery,
      response: { 200: _20100401Model.ListSipCredentialResponse200 },
      detail: {
        tags: ['Api20100401Credential'],
        summary: 'Retrieve a list of credentials.',
        description: 'Retrieve a list of credentials.',
        operationId: 'ListSipCredential',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipCredentialParams,
      body: _20100401Model.CreateSipCredentialBody,
      response: { 201: 'ApiV2010AccountSipSipCredentialListSipCredential' },
      detail: {
        tags: ['Api20100401Credential'],
        summary: 'Create a new credential resource.',
        description: 'Create a new credential resource.',
        operationId: 'CreateSipCredential',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipCredentialParams,
      response: { 200: 'ApiV2010AccountSipSipCredentialListSipCredential' },
      detail: {
        tags: ['Api20100401Credential'],
        summary: 'Fetch a single credential.',
        description: 'Fetch a single credential.',
        operationId: 'FetchSipCredential',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateSipCredentialParams,
      body: _20100401Model.UpdateSipCredentialBody,
      response: { 200: 'ApiV2010AccountSipSipCredentialListSipCredential' },
      detail: {
        tags: ['Api20100401Credential'],
        summary: 'Update a credential resource.',
        description: 'Update a credential resource.',
        operationId: 'UpdateSipCredential',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipCredentialParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401Credential'],
        summary: 'Delete a credential resource.',
        description: 'Delete a credential resource.',
        operationId: 'DeleteSipCredential',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListSipCredentialListParams,
    query: _20100401Model.ListSipCredentialListQuery,
    response: { 200: _20100401Model.ListSipCredentialListResponse200 },
    detail: {
      tags: ['Api20100401CredentialList'],
      summary: 'Get All Credential Lists',
      description: 'Get All Credential Lists',
      operationId: 'ListSipCredentialList',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateSipCredentialListParams,
    body: _20100401Model.CreateSipCredentialListBody,
    response: { 201: 'ApiV2010AccountSipSipCredentialList' },
    detail: {
      tags: ['Api20100401CredentialList'],
      summary: 'Create a Credential List',
      description: 'Create a Credential List',
      operationId: 'CreateSipCredentialList',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchSipCredentialListParams,
    response: { 200: 'ApiV2010AccountSipSipCredentialList' },
    detail: {
      tags: ['Api20100401CredentialList'],
      summary: 'Get a Credential List',
      description: 'Get a Credential List',
      operationId: 'FetchSipCredentialList',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateSipCredentialListParams,
      body: _20100401Model.UpdateSipCredentialListBody,
      response: { 200: 'ApiV2010AccountSipSipCredentialList' },
      detail: {
        tags: ['Api20100401CredentialList'],
        summary: 'Update a Credential List',
        description: 'Update a Credential List',
        operationId: 'UpdateSipCredentialList',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete('/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteSipCredentialListParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401CredentialList'],
      summary: 'Delete a Credential List',
      description: 'Delete a Credential List',
      operationId: 'DeleteSipCredentialList',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipCredentialListMappingParams,
      query: _20100401Model.ListSipCredentialListMappingQuery,
      response: { 200: _20100401Model.ListSipCredentialListMappingResponse200 },
      detail: {
        tags: ['Api20100401CredentialListMapping'],
        summary: 'Read multiple CredentialListMapping resources from an account.',
        description: 'Read multiple CredentialListMapping resources from an account.',
        operationId: 'ListSipCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipCredentialListMappingParams,
      body: _20100401Model.CreateSipCredentialListMappingBody,
      response: { 201: 'ApiV2010AccountSipSipDomainSipCredentialListMapping' },
      detail: {
        tags: ['Api20100401CredentialListMapping'],
        summary: 'Create a CredentialListMapping resource for an account.',
        description: 'Create a CredentialListMapping resource for an account.',
        operationId: 'CreateSipCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipCredentialListMappingParams,
      response: { 200: 'ApiV2010AccountSipSipDomainSipCredentialListMapping' },
      detail: {
        tags: ['Api20100401CredentialListMapping'],
        summary: 'Fetch a single CredentialListMapping resource from an account.',
        description: 'Fetch a single CredentialListMapping resource from an account.',
        operationId: 'FetchSipCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipCredentialListMappingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401CredentialListMapping'],
        summary: 'Delete a CredentialListMapping resource from an account.',
        description: 'Delete a CredentialListMapping resource from an account.',
        operationId: 'DeleteSipCredentialListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/SIP/Domains.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListSipDomainParams,
    query: _20100401Model.ListSipDomainQuery,
    response: { 200: _20100401Model.ListSipDomainResponse200 },
    detail: {
      tags: ['Api20100401Domain'],
      summary: 'Retrieve a list of domains belonging to the account used to make the request',
      description: 'Retrieve a list of domains belonging to the account used to make the request',
      operationId: 'ListSipDomain',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/SIP/Domains.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateSipDomainParams,
    body: _20100401Model.CreateSipDomainBody,
    response: { 201: 'ApiV2010AccountSipSipDomain' },
    detail: {
      tags: ['Api20100401Domain'],
      summary: 'Create a new Domain',
      description: 'Create a new Domain',
      operationId: 'CreateSipDomain',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchSipDomainParams,
    response: { 200: 'ApiV2010AccountSipSipDomain' },
    detail: {
      tags: ['Api20100401Domain'],
      summary: 'Fetch an instance of a Domain',
      description: 'Fetch an instance of a Domain',
      operationId: 'FetchSipDomain',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateSipDomainParams,
    body: _20100401Model.UpdateSipDomainBody,
    response: { 200: 'ApiV2010AccountSipSipDomain' },
    detail: {
      tags: ['Api20100401Domain'],
      summary: 'Update the attributes of a domain',
      description: 'Update the attributes of a domain',
      operationId: 'UpdateSipDomain',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteSipDomainParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Domain'],
      summary: 'Delete an instance of a Domain',
      description: 'Delete an instance of a Domain',
      operationId: 'DeleteSipDomain',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipIpAccessControlListParams,
      query: _20100401Model.ListSipIpAccessControlListQuery,
      response: { 200: _20100401Model.ListSipIpAccessControlListResponse200 },
      detail: {
        tags: ['Api20100401IpAccessControlList'],
        summary:
          'Retrieve a list of IpAccessControlLists that belong to the account used to make the request',
        description:
          'Retrieve a list of IpAccessControlLists that belong to the account used to make the request',
        operationId: 'ListSipIpAccessControlList',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipIpAccessControlListParams,
      body: _20100401Model.CreateSipIpAccessControlListBody,
      response: { 201: 'ApiV2010AccountSipSipIpAccessControlList' },
      detail: {
        tags: ['Api20100401IpAccessControlList'],
        summary: 'Create a new IpAccessControlList resource',
        description: 'Create a new IpAccessControlList resource',
        operationId: 'CreateSipIpAccessControlList',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get('/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchSipIpAccessControlListParams,
    response: { 200: 'ApiV2010AccountSipSipIpAccessControlList' },
    detail: {
      tags: ['Api20100401IpAccessControlList'],
      summary: 'Fetch a specific instance of an IpAccessControlList',
      description: 'Fetch a specific instance of an IpAccessControlList',
      operationId: 'FetchSipIpAccessControlList',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateSipIpAccessControlListParams,
      body: _20100401Model.UpdateSipIpAccessControlListBody,
      response: { 200: 'ApiV2010AccountSipSipIpAccessControlList' },
      detail: {
        tags: ['Api20100401IpAccessControlList'],
        summary: 'Rename an IpAccessControlList',
        description: 'Rename an IpAccessControlList',
        operationId: 'UpdateSipIpAccessControlList',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipIpAccessControlListParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401IpAccessControlList'],
        summary: 'Delete an IpAccessControlList from the requested account',
        description: 'Delete an IpAccessControlList from the requested account',
        operationId: 'DeleteSipIpAccessControlList',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipIpAccessControlListMappingParams,
      response: { 200: 'ApiV2010AccountSipSipDomainSipIpAccessControlListMapping' },
      detail: {
        tags: ['Api20100401IpAccessControlListMapping'],
        summary: 'Fetch an IpAccessControlListMapping resource.',
        description: 'Fetch an IpAccessControlListMapping resource.',
        operationId: 'FetchSipIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipIpAccessControlListMappingParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401IpAccessControlListMapping'],
        summary: 'Delete an IpAccessControlListMapping resource.',
        description: 'Delete an IpAccessControlListMapping resource.',
        operationId: 'DeleteSipIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipIpAccessControlListMappingParams,
      query: _20100401Model.ListSipIpAccessControlListMappingQuery,
      response: { 200: _20100401Model.ListSipIpAccessControlListMappingResponse200 },
      detail: {
        tags: ['Api20100401IpAccessControlListMapping'],
        summary: 'Retrieve a list of IpAccessControlListMapping resources.',
        description: 'Retrieve a list of IpAccessControlListMapping resources.',
        operationId: 'ListSipIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipIpAccessControlListMappingParams,
      body: _20100401Model.CreateSipIpAccessControlListMappingBody,
      response: { 201: 'ApiV2010AccountSipSipDomainSipIpAccessControlListMapping' },
      detail: {
        tags: ['Api20100401IpAccessControlListMapping'],
        summary: 'Create a new IpAccessControlListMapping resource.',
        description: 'Create a new IpAccessControlListMapping resource.',
        operationId: 'CreateSipIpAccessControlListMapping',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.ListSipIpAddressParams,
      query: _20100401Model.ListSipIpAddressQuery,
      response: { 200: _20100401Model.ListSipIpAddressResponse200 },
      detail: {
        tags: ['Api20100401SipIpAddress'],
        summary: 'Read multiple IpAddress resources.',
        description: 'Read multiple IpAddress resources.',
        operationId: 'ListSipIpAddress',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateSipIpAddressParams,
      body: _20100401Model.CreateSipIpAddressBody,
      response: { 201: 'ApiV2010AccountSipSipIpAccessControlListSipIpAddress' },
      detail: {
        tags: ['Api20100401SipIpAddress'],
        summary: 'Create a new IpAddress resource.',
        description: 'Create a new IpAddress resource.',
        operationId: 'CreateSipIpAddress',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.FetchSipIpAddressParams,
      response: { 200: 'ApiV2010AccountSipSipIpAccessControlListSipIpAddress' },
      detail: {
        tags: ['Api20100401SipIpAddress'],
        summary: 'Read one IpAddress resource.',
        description: 'Read one IpAddress resource.',
        operationId: 'FetchSipIpAddress',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateSipIpAddressParams,
      body: _20100401Model.UpdateSipIpAddressBody,
      response: { 200: 'ApiV2010AccountSipSipIpAccessControlListSipIpAddress' },
      detail: {
        tags: ['Api20100401SipIpAddress'],
        summary: 'Update an IpAddress resource.',
        description: 'Update an IpAddress resource.',
        operationId: 'UpdateSipIpAddress',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteSipIpAddressParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401SipIpAddress'],
        summary: 'Delete an IpAddress resource.',
        description: 'Delete an IpAddress resource.',
        operationId: 'DeleteSipIpAddress',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post('/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateSiprecParams,
    body: _20100401Model.CreateSiprecBody,
    response: { 200: 'ApiV2010AccountCallSiprec' },
    detail: {
      tags: ['Api20100401Siprec'],
      summary: 'Create a Siprec',
      description: 'Create a Siprec',
      operationId: 'CreateSiprec',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateSiprecParams,
      body: _20100401Model.UpdateSiprecBody,
      response: { 200: 'ApiV2010AccountCallSiprec' },
      detail: {
        tags: ['Api20100401Siprec'],
        summary:
          'Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource',
        description:
          'Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource',
        operationId: 'UpdateSiprec',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post('/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateStreamParams,
    body: _20100401Model.CreateStreamBody,
    response: { 200: 'ApiV2010AccountCallStream' },
    detail: {
      tags: ['Api20100401Stream'],
      summary: 'Create a Stream',
      description: 'Create a Stream',
      operationId: 'CreateStream',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.UpdateStreamParams,
      body: _20100401Model.UpdateStreamBody,
      response: { 200: 'ApiV2010AccountCallStream' },
      detail: {
        tags: ['Api20100401Stream'],
        summary:
          'Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource',
        description:
          'Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource',
        operationId: 'UpdateStream',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post('/2010-04-01/Accounts/:AccountSid/Tokens.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateTokenParams,
    body: _20100401Model.CreateTokenBody,
    response: { 201: 'ApiV2010AccountToken' },
    detail: {
      tags: ['Api20100401Token'],
      summary: 'Create a new token for ICE servers',
      description: 'Create a new token for ICE servers',
      operationId: 'CreateToken',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchTranscriptionParams,
    response: { 200: 'ApiV2010AccountTranscription' },
    detail: {
      tags: ['Api20100401Transcription'],
      summary: 'Fetch an instance of a Transcription',
      description: 'Fetch an instance of a Transcription',
      operationId: 'FetchTranscription',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteTranscriptionParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Transcription'],
      summary: 'Delete a transcription from the account used to make the request',
      description: 'Delete a transcription from the account used to make the request',
      operationId: 'DeleteTranscription',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Transcriptions.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListTranscriptionParams,
    query: _20100401Model.ListTranscriptionQuery,
    response: { 200: _20100401Model.ListTranscriptionResponse200 },
    detail: {
      tags: ['Api20100401Transcription'],
      summary:
        'Retrieve a list of transcriptions belonging to the account used to make the request',
      description:
        'Retrieve a list of transcriptions belonging to the account used to make the request',
      operationId: 'ListTranscription',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordParams,
    query: _20100401Model.ListUsageRecordQuery,
    response: { 200: _20100401Model.ListUsageRecordResponse200 },
    detail: {
      tags: ['Api20100401Record'],
      summary: 'Retrieve a list of usage-records belonging to the account used to make the request',
      description:
        'Retrieve a list of usage-records belonging to the account used to make the request',
      operationId: 'ListUsageRecord',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordAllTimeParams,
    query: _20100401Model.ListUsageRecordAllTimeQuery,
    response: { 200: _20100401Model.ListUsageRecordAllTimeResponse200 },
    detail: {
      tags: ['Api20100401AllTime'],
      operationId: 'ListUsageRecordAllTime',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordDailyParams,
    query: _20100401Model.ListUsageRecordDailyQuery,
    response: { 200: _20100401Model.ListUsageRecordDailyResponse200 },
    detail: {
      tags: ['Api20100401Daily'],
      operationId: 'ListUsageRecordDaily',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordLastMonthParams,
    query: _20100401Model.ListUsageRecordLastMonthQuery,
    response: { 200: _20100401Model.ListUsageRecordLastMonthResponse200 },
    detail: {
      tags: ['Api20100401LastMonth'],
      operationId: 'ListUsageRecordLastMonth',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordMonthlyParams,
    query: _20100401Model.ListUsageRecordMonthlyQuery,
    response: { 200: _20100401Model.ListUsageRecordMonthlyResponse200 },
    detail: {
      tags: ['Api20100401Monthly'],
      operationId: 'ListUsageRecordMonthly',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordThisMonthParams,
    query: _20100401Model.ListUsageRecordThisMonthQuery,
    response: { 200: _20100401Model.ListUsageRecordThisMonthResponse200 },
    detail: {
      tags: ['Api20100401ThisMonth'],
      operationId: 'ListUsageRecordThisMonth',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordTodayParams,
    query: _20100401Model.ListUsageRecordTodayQuery,
    response: { 200: _20100401Model.ListUsageRecordTodayResponse200 },
    detail: {
      tags: ['Api20100401Today'],
      operationId: 'ListUsageRecordToday',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordYearlyParams,
    query: _20100401Model.ListUsageRecordYearlyQuery,
    response: { 200: _20100401Model.ListUsageRecordYearlyResponse200 },
    detail: {
      tags: ['Api20100401Yearly'],
      operationId: 'ListUsageRecordYearly',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageRecordYesterdayParams,
    query: _20100401Model.ListUsageRecordYesterdayQuery,
    response: { 200: _20100401Model.ListUsageRecordYesterdayResponse200 },
    detail: {
      tags: ['Api20100401Yesterday'],
      operationId: 'ListUsageRecordYesterday',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.FetchUsageTriggerParams,
    response: { 200: 'ApiV2010AccountUsageUsageTrigger' },
    detail: {
      tags: ['Api20100401Trigger'],
      summary: 'Fetch and instance of a usage-trigger',
      description: 'Fetch and instance of a usage-trigger',
      operationId: 'FetchUsageTrigger',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.UpdateUsageTriggerParams,
    body: _20100401Model.UpdateUsageTriggerBody,
    response: { 200: 'ApiV2010AccountUsageUsageTrigger' },
    detail: {
      tags: ['Api20100401Trigger'],
      summary: 'Update an instance of a usage trigger',
      description: 'Update an instance of a usage trigger',
      operationId: 'UpdateUsageTrigger',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .delete('/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json', ({ params }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.DeleteUsageTriggerParams,
    response: { 204: t.Void() },
    detail: {
      tags: ['Api20100401Trigger'],
      operationId: 'DeleteUsageTrigger',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .get('/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.ListUsageTriggerParams,
    query: _20100401Model.ListUsageTriggerQuery,
    response: { 200: _20100401Model.ListUsageTriggerResponse200 },
    detail: {
      tags: ['Api20100401Trigger'],
      summary:
        'Retrieve a list of usage-triggers belonging to the account used to make the request',
      description:
        'Retrieve a list of usage-triggers belonging to the account used to make the request',
      operationId: 'ListUsageTrigger',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post('/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: _20100401Model.CreateUsageTriggerParams,
    body: _20100401Model.CreateUsageTriggerBody,
    response: { 201: 'ApiV2010AccountUsageUsageTrigger' },
    detail: {
      tags: ['Api20100401Trigger'],
      summary: 'Create a new UsageTrigger',
      description: 'Create a new UsageTrigger',
      operationId: 'CreateUsageTrigger',
      security: [{ accountSid_authToken: [] }],
    },
  })
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateUserDefinedMessageParams,
      body: _20100401Model.CreateUserDefinedMessageBody,
      response: { 201: 'ApiV2010AccountCallUserDefinedMessage' },
      detail: {
        tags: ['Api20100401UserDefinedMessage'],
        summary: 'Create a new User Defined Message for the given Call SID.',
        description: 'Create a new User Defined Message for the given Call SID.',
        operationId: 'CreateUserDefinedMessage',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.CreateUserDefinedMessageSubscriptionParams,
      body: _20100401Model.CreateUserDefinedMessageSubscriptionBody,
      response: { 201: 'ApiV2010AccountCallUserDefinedMessageSubscription' },
      detail: {
        tags: ['Api20100401UserDefinedMessageSubscription'],
        summary: 'Subscribe to User Defined Messages for a given Call SID.',
        description: 'Subscribe to User Defined Messages for a given Call SID.',
        operationId: 'CreateUserDefinedMessageSubscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: _20100401Model.DeleteUserDefinedMessageSubscriptionParams,
      response: { 204: t.Void() },
      detail: {
        tags: ['Api20100401UserDefinedMessageSubscription'],
        summary: 'Delete a specific User Defined Message Subscription.',
        description: 'Delete a specific User Defined Message Subscription.',
        operationId: 'DeleteUserDefinedMessageSubscription',
        security: [{ accountSid_authToken: [] }],
      },
    },
  )
