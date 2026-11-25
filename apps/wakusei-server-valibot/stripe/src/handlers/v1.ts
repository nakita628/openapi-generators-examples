import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  AccountLinkSchema,
  AccountSchema,
  AccountSessionSchema,
  ApplePayDomainSchema,
  ApplicationFeeSchema,
  AppsInstallSchema,
  AppsSecretSchema,
  BalanceSchema,
  BalanceSettingsSchema,
  BalanceTransactionSchema,
  BankAccountSchema,
  BillingAlertSchema,
  BillingCreditBalanceSummarySchema,
  BillingCreditBalanceTransactionSchema,
  BillingCreditGrantSchema,
  BillingFeedbackOptionSchema,
  BillingMeterEventAdjustmentSchema,
  BillingMeterEventSchema,
  BillingMeterEventSummarySchema,
  BillingMeterSchema,
  BillingPortalConfigurationSchema,
  BillingPortalSessionSchema,
  CapabilitySchema,
  CardSchema,
  CashBalanceSchema,
  ChargeSchema,
  CheckoutSessionSchema,
  ClimateOrderSchema,
  ClimateProductSchema,
  ClimateSupplierSchema,
  ConfirmationTokenSchema,
  CountrySpecSchema,
  CouponSchema,
  CreditNoteLineItemSchema,
  CreditNoteSchema,
  CustomerBalanceTransactionSchema,
  CustomerCashBalanceTransactionSchema,
  CustomerSchema,
  CustomerSessionSchema,
  DeletedAccountSchema,
  DeletedApplePayDomainSchema,
  DeletedCouponSchema,
  DeletedCustomerSchema,
  DeletedDiscountSchema,
  DeletedExternalAccountSchema,
  DeletedInvoiceSchema,
  DeletedInvoiceitemSchema,
  DeletedPaymentSourceSchema,
  DeletedPersonSchema,
  DeletedPlanSchema,
  DeletedProductFeatureSchema,
  DeletedProductSchema,
  DeletedRadarValueListItemSchema,
  DeletedRadarValueListSchema,
  DeletedSubscriptionItemSchema,
  DeletedTaxIdSchema,
  DeletedTerminalConfigurationSchema,
  DeletedTerminalLocationSchema,
  DeletedTerminalReaderSchema,
  DeletedTestHelpersTestClockSchema,
  DeletedWebhookEndpointSchema,
  DiscountSchema,
  DisputeSchema,
  EntitlementsActiveEntitlementSchema,
  EntitlementsFeatureSchema,
  EphemeralKeySchema,
  EventSchema,
  ExchangeRateSchema,
  ExternalAccountSchema,
  FeeRefundSchema,
  FileLinkSchema,
  FileSchema,
  FinancialConnectionsAccountOwnerSchema,
  FinancialConnectionsAccountSchema,
  FinancialConnectionsSessionSchema,
  FinancialConnectionsTransactionSchema,
  ForwardingRequestSchema,
  FundingInstructionsSchema,
  IdentityVerificationReportSchema,
  IdentityVerificationSessionSchema,
  InvoicePaymentSchema,
  InvoiceRenderingTemplateSchema,
  InvoiceSchema,
  InvoiceitemSchema,
  IssuingAuthorizationSchema,
  IssuingCardSchema,
  IssuingCardholderSchema,
  IssuingDisputeSchema,
  IssuingPersonalizationDesignSchema,
  IssuingPhysicalBundleSchema,
  IssuingSettlementSchema,
  IssuingTokenSchema,
  IssuingTransactionSchema,
  ItemSchema,
  LineItemSchema,
  LoginLinkSchema,
  MandateSchema,
  PaymentAttemptRecordSchema,
  PaymentIntentAmountDetailsLineItemSchema,
  PaymentIntentSchema,
  PaymentLinkSchema,
  PaymentMethodConfigurationSchema,
  PaymentMethodDomainSchema,
  PaymentMethodSchema,
  PaymentRecordSchema,
  PaymentSourceSchema,
  PayoutSchema,
  PersonSchema,
  PlanSchema,
  PriceSchema,
  ProductCatalogTrialOfferSchema,
  ProductFeatureSchema,
  ProductSchema,
  PromotionCodeSchema,
  QuoteSchema,
  RadarEarlyFraudWarningSchema,
  RadarPaymentEvaluationSchema,
  RadarValueListItemSchema,
  RadarValueListSchema,
  RefundSchema,
  ReportingReportRunSchema,
  ReportingReportTypeSchema,
  ReviewSchema,
  ScheduledQueryRunSchema,
  SetupAttemptSchema,
  SetupIntentSchema,
  ShippingRateSchema,
  SigmaSigmaApiQuerySchema,
  SourceMandateNotificationSchema,
  SourceSchema,
  SourceTransactionSchema,
  SubscriptionItemSchema,
  SubscriptionScheduleSchema,
  SubscriptionSchema,
  TaxAssociationSchema,
  TaxCalculationLineItemSchema,
  TaxCalculationSchema,
  TaxCodeSchema,
  TaxIdSchema,
  TaxLocationSchema,
  TaxRateSchema,
  TaxRegistrationSchema,
  TaxSettingsSchema,
  TaxTransactionLineItemSchema,
  TaxTransactionSchema,
  TerminalConfigurationSchema,
  TerminalConnectionTokenSchema,
  TerminalLocationSchema,
  TerminalOnboardingLinkSchema,
  TerminalReaderSchema,
  TerminalRefundSchema,
  TestHelpersTestClockSchema,
  ThreeDSecureAuthenticationSchema,
  TokenSchema,
  TopupSchema,
  TransferReversalSchema,
  TransferSchema,
  TreasuryCreditReversalSchema,
  TreasuryDebitReversalSchema,
  TreasuryFinancialAccountFeaturesSchema,
  TreasuryFinancialAccountSchema,
  TreasuryInboundTransferSchema,
  TreasuryOutboundPaymentSchema,
  TreasuryOutboundTransferSchema,
  TreasuryReceivedCreditSchema,
  TreasuryReceivedDebitSchema,
  TreasuryTransactionEntrySchema,
  TreasuryTransactionSchema,
  WebhookEndpointSchema,
} from '../components'

export const getV1Account = os
  .route({
    method: 'GET',
    path: '/v1/account',
    summary: 'Retrieve account',
    description: '<p>Retrieves the details of an account.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(AccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountLinks = os
  .route({
    method: 'POST',
    path: '/v1/account_links',
    summary: 'Create an account link',
    description:
      '<p>Creates an AccountLink object that includes a single-use Stripe URL that the platform can redirect their user to in order to take them through the Connect Onboarding flow.</p>',
    successDescription: 'Successful response.',
  })
  .output(AccountLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountSessions = os
  .route({
    method: 'POST',
    path: '/v1/account_sessions',
    summary: 'Create an Account Session',
    description:
      '<p>Creates an AccountSession object that includes a single-use token that the platform can use on their front-end to grant client-side API access.</p>',
    successDescription: 'Successful response.',
  })
  .output(AccountSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Accounts = os
  .route({
    method: 'GET',
    path: '/v1/accounts',
    summary: 'List all connected accounts',
    description:
      '<p>Returns a list of accounts connected to your platform via <a href="/docs/connect">Connect</a>. If you’re not a platform, the list is empty.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(AccountSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/accounts/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Accounts = os
  .route({
    method: 'POST',
    path: '/v1/accounts',
    summary: 'Create an account',
    description:
      '<p>With <a href="/docs/connect">Connect</a>, you can create Stripe accounts for your users.\nTo do this, you’ll first need to <a href="https://dashboard.stripe.com/account/applications/settings">register your platform</a>.</p>\n\n<p>If you’ve already collected information for your connected accounts, you <a href="/connect/marketplace/tasks/create#prefill-account-information">can prefill that information</a> when\ncreating the account. Connect Onboarding won’t ask for the prefilled information during account onboarding.\nYou can prefill any information on the account.</p>',
    successDescription: 'Successful response.',
  })
  .output(AccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccount = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}',
    summary: 'Retrieve account',
    description: '<p>Retrieves the details of an account.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(AccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccount = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}',
    summary: 'Update an account',
    description:
      '<p>Updates a <a href="/connect/accounts">connected account</a> by setting the values of the parameters passed. Any parameters not provided are\nleft unchanged.</p>\n\n<p>For accounts where <a href="/api/accounts/object#account_object-controller-requirement_collection">controller.requirement_collection</a>\nis <code>application</code>, which includes Custom accounts, you can update any information on the account.</p>\n\n<p>For accounts where <a href="/api/accounts/object#account_object-controller-requirement_collection">controller.requirement_collection</a>\nis <code>stripe</code>, which includes Standard and Express accounts, you can update all information until you create\nan <a href="/api/account_links">Account Link</a> or <a href="/api/account_sessions">Account Session</a> to start Connect onboarding,\nafter which some properties can no longer be updated.</p>\n\n<p>To update your own account, use the <a href="https://dashboard.stripe.com/settings/account">Dashboard</a>. Refer to our\n<a href="/docs/connect/updating-accounts">Connect</a> documentation to learn more about updating accounts.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(AccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1AccountsAccount = os
  .route({
    method: 'DELETE',
    path: '/v1/accounts/{account}',
    summary: 'Delete an account',
    description:
      '<p>With <a href="/connect">Connect</a>, you can delete accounts you manage.</p>\n\n<p>Test-mode accounts can be deleted at any time.</p>\n\n<p>Live-mode accounts that have access to the standard dashboard and Stripe is responsible for negative account balances cannot be deleted, which includes Standard accounts. All other Live-mode accounts, can be deleted when all <a href="/api/balance/balance_object">balances</a> are zero.</p>\n\n<p>If you want to delete your own account, use the <a href="https://dashboard.stripe.com/settings/account">account information tab in your account settings</a> instead.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountBankAccounts = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/bank_accounts',
    summary: 'Create an external account',
    description: '<p>Create an external account for a given account.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountBankAccountsId = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/bank_accounts/{id}',
    summary: 'Retrieve an external account',
    description: '<p>Retrieve a specified external account for a given account.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountBankAccountsId = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/bank_accounts/{id}',
    summary: 'Update a bank account',
    description:
      '<p>Updates the metadata, account holder name, account holder type of a bank account belonging to\na connected account and optionally sets it as the default for its currency. Other bank account\ndetails are not editable by design.</p>\n\n<p>You can only update bank accounts when <a href="/api/accounts/object#account_object-controller-requirement_collection">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href="/connect/custom-accounts">Custom accounts</a>.</p>\n\n<p>You can re-enable a disabled bank account by performing an update call without providing any\narguments or changes.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1AccountsAccountBankAccountsId = os
  .route({
    method: 'DELETE',
    path: '/v1/accounts/{account}/bank_accounts/{id}',
    summary: 'Delete an external account',
    description: '<p>Delete a specified external account for a given account.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(DeletedExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountCapabilities = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/capabilities',
    summary: 'List all account capabilities',
    description:
      '<p>Returns a list of capabilities associated with the account. The capabilities are returned sorted by creation date, with the most recent capability appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CapabilitySchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountCapabilitiesCapability = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/capabilities/{capability}',
    summary: 'Retrieve an Account Capability',
    description: '<p>Retrieves information about the specified Account Capability.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      capability: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CapabilitySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountCapabilitiesCapability = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/capabilities/{capability}',
    summary: 'Update an Account Capability',
    description:
      '<p>Updates an existing Account Capability. Request or remove a capability by updating its <code>requested</code> parameter.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), capability: v.string() }))
  .output(CapabilitySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountExternalAccounts = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/external_accounts',
    summary: 'List all external accounts',
    description: '<p>List external accounts for an account.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      object: v.optional(v.picklist(['bank_account', 'card'])),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(v.union([BankAccountSchema, CardSchema])),
          v.description(
            'The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.',
          ),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountExternalAccounts = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/external_accounts',
    summary: 'Create an external account',
    description: '<p>Create an external account for a given account.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountExternalAccountsId = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/external_accounts/{id}',
    summary: 'Retrieve an external account',
    description: '<p>Retrieve a specified external account for a given account.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountExternalAccountsId = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/external_accounts/{id}',
    summary: 'Update a bank account',
    description:
      '<p>Updates the metadata, account holder name, account holder type of a bank account belonging to\na connected account and optionally sets it as the default for its currency. Other bank account\ndetails are not editable by design.</p>\n\n<p>You can only update bank accounts when <a href="/api/accounts/object#account_object-controller-requirement_collection">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href="/connect/custom-accounts">Custom accounts</a>.</p>\n\n<p>You can re-enable a disabled bank account by performing an update call without providing any\narguments or changes.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1AccountsAccountExternalAccountsId = os
  .route({
    method: 'DELETE',
    path: '/v1/accounts/{account}/external_accounts/{id}',
    summary: 'Delete an external account',
    description: '<p>Delete a specified external account for a given account.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(DeletedExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountLoginLinks = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/login_links',
    summary: 'Create a login link',
    description:
      '<p>Creates a login link for a connected account to access the Express Dashboard.</p>\n\n<p><strong>You can only create login links for accounts that use the <a href="/connect/express-dashboard">Express Dashboard</a> and are connected to your platform</strong>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(LoginLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountPeople = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/people',
    summary: 'List all persons',
    description:
      '<p>Returns a list of people associated with the account’s legal entity. The people are returned sorted by creation date, with the most recent people appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      relationship: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              authorizer: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              director: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              executive: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              legal_guardian: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              owner: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              representative: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
            }),
          ),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PersonSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountPeople = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/people',
    summary: 'Create a person',
    description: '<p>Creates a new person.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountPeoplePerson = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/people/{person}',
    summary: 'Retrieve a person',
    description: '<p>Retrieves an existing person.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      person: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountPeoplePerson = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/people/{person}',
    summary: 'Update a person',
    description: '<p>Updates an existing person.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      person: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(PersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1AccountsAccountPeoplePerson = os
  .route({
    method: 'DELETE',
    path: '/v1/accounts/{account}/people/{person}',
    summary: 'Delete a person',
    description:
      '<p>Deletes an existing person’s relationship to the account’s legal entity. Any person with a relationship for an account can be deleted through the API, except if the person is the <code>representative</code>. If your integration is using the <code>executive</code> parameter, you cannot delete the only verified <code>executive</code> on file.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      person: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(DeletedPersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountPersons = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/persons',
    summary: 'List all persons',
    description:
      '<p>Returns a list of people associated with the account’s legal entity. The people are returned sorted by creation date, with the most recent people appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      relationship: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              authorizer: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              director: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              executive: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              legal_guardian: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              owner: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              representative: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
            }),
          ),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PersonSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountPersons = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/persons',
    summary: 'Create a person',
    description: '<p>Creates a new person.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AccountsAccountPersonsPerson = os
  .route({
    method: 'GET',
    path: '/v1/accounts/{account}/persons/{person}',
    summary: 'Retrieve a person',
    description: '<p>Retrieves an existing person.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      person: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountPersonsPerson = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/persons/{person}',
    summary: 'Update a person',
    description: '<p>Updates an existing person.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      person: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(PersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1AccountsAccountPersonsPerson = os
  .route({
    method: 'DELETE',
    path: '/v1/accounts/{account}/persons/{person}',
    summary: 'Delete a person',
    description:
      '<p>Deletes an existing person’s relationship to the account’s legal entity. Any person with a relationship for an account can be deleted through the API, except if the person is the <code>representative</code>. If your integration is using the <code>executive</code> parameter, you cannot delete the only verified <code>executive</code> on file.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      person: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(DeletedPersonSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountReject = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/reject',
    summary: 'Reject an account',
    description:
      '<p>With <a href="/connect">Connect</a>, you can reject accounts that you have flagged as suspicious.</p>\n\n<p>Only accounts where your platform is liable for negative account balances, which includes Custom and Express accounts, can be rejected.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(AccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AccountsAccountUnreject = os
  .route({
    method: 'POST',
    path: '/v1/accounts/{account}/unreject',
    summary: 'Unreject an account',
    description:
      '<p>With Connect, you can unreject accounts that you have previously rejected.</p>\n\n<p>Only accounts that were rejected by your platform can be unrejected. This API cannot be used to unreject accounts that were rejected by Stripe.</p>\n\n<p>Unreject will only enable charges and/or payouts if there are no other restrictions other than those placed by a previous rejection. If you have separately paused charges and/or payouts outside of rejection, those pauses will remain in place after unrejection.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(AccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ApplePayDomains = os
  .route({
    method: 'GET',
    path: '/v1/apple_pay/domains',
    description: '<p>List apple pay domains.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      domain_name: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ApplePayDomainSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/apple_pay\/domains/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ApplePayDomains = os
  .route({
    method: 'POST',
    path: '/v1/apple_pay/domains',
    description: '<p>Create an apple pay domain.</p>',
    successDescription: 'Successful response.',
  })
  .output(ApplePayDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ApplePayDomainsDomain = os
  .route({
    method: 'GET',
    path: '/v1/apple_pay/domains/{domain}',
    description: '<p>Retrieve an apple pay domain.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      domain: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ApplePayDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1ApplePayDomainsDomain = os
  .route({
    method: 'DELETE',
    path: '/v1/apple_pay/domains/{domain}',
    description: '<p>Delete an apple pay domain.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ domain: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedApplePayDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ApplicationFees = os
  .route({
    method: 'GET',
    path: '/v1/application_fees',
    summary: 'List all application fees',
    description:
      '<p>Returns a list of application fees you’ve previously collected. The application fees are returned in sorted order, with the most recent fees appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ApplicationFeeSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/application_fees/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ApplicationFeesFeeRefundsId = os
  .route({
    method: 'GET',
    path: '/v1/application_fees/{fee}/refunds/{id}',
    summary: 'Retrieve an application fee refund',
    description:
      '<p>By default, you can see the 10 most recent refunds stored directly on the application fee object, but you can also retrieve details about a specific refund stored on the application fee.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      fee: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FeeRefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ApplicationFeesFeeRefundsId = os
  .route({
    method: 'POST',
    path: '/v1/application_fees/{fee}/refunds/{id}',
    summary: 'Update an application fee refund',
    description:
      '<p>Updates the specified application fee refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>\n\n<p>This request only accepts metadata as an argument.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      fee: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(FeeRefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ApplicationFeesId = os
  .route({
    method: 'GET',
    path: '/v1/application_fees/{id}',
    summary: 'Retrieve an application fee',
    description:
      '<p>Retrieves the details of an application fee that your account has collected. The same information is returned when refunding the application fee.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ApplicationFeeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ApplicationFeesIdRefund = os
  .route({
    method: 'POST',
    path: '/v1/application_fees/{id}/refund',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ApplicationFeeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ApplicationFeesIdRefunds = os
  .route({
    method: 'GET',
    path: '/v1/application_fees/{id}/refunds',
    summary: 'List all application fee refunds',
    description:
      '<p>You can see a list of the refunds belonging to a specific application fee. Note that the 10 most recent refunds are always available by default on the application fee object. If you need more than those 10, you can use this API method and the <code>limit</code> and <code>starting_after</code> parameters to page through additional refunds.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(FeeRefundSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ApplicationFeesIdRefunds = os
  .route({
    method: 'POST',
    path: '/v1/application_fees/{id}/refunds',
    summary: 'Create an application fee refund',
    description:
      '<p>Refunds an application fee that has previously been collected but not yet refunded.\nFunds will be refunded to the Stripe account from which the fee was originally collected.</p>\n\n<p>You can optionally refund only part of an application fee.\nYou can do so multiple times, until the entire fee has been refunded.</p>\n\n<p>Once entirely refunded, an application fee can’t be refunded again.\nThis method will raise an error when called on an already-refunded application fee,\nor when trying to refund more money than is left on an application fee.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FeeRefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AppsInstalls = os
  .route({
    method: 'GET',
    path: '/v1/apps/installs',
    summary: 'List all app installs',
    description:
      '<p>Returns a list of app installs. An app developer or embedding platform filtering by its own app sees the installs across the accounts that installed it; other callers see the installs on their own account. The key selects the environment: a live key lists live installs, a sandbox API key lists the installs on that sandbox, and the key of an app’s managed sandbox filtering by <code>app</code> lists that app’s installs across every sandbox. For existing accounts that still use legacy test mode, a test mode key lists legacy test mode installs.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      app: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      approval_required: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      channel: v.optional(v.picklist(['private_live', 'private_test', 'public', 'testing'])),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      created_by: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(
        v.picklist([
          'install_failed',
          'installed',
          'installing',
          'uninstall_failed',
          'uninstalling',
        ]),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(AppsInstallSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/apps\/installs/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AppsInstalls = os
  .route({
    method: 'POST',
    path: '/v1/apps/installs',
    summary: 'Create an app install',
    description:
      '<p>Creates an app install. An account installs its own private app with its own key; public and testing installs are made from the Dashboard. An app developer or embedding platform acting on a connected account through <code>Stripe-Account</code> installs or reinstalls its app there. For a private app, creating an install installs the newest completed upload; when that version is already installed with nothing pending, the existing install is returned.</p>',
    successDescription: 'Successful response.',
  })
  .output(AppsInstallSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AppsInstallsId = os
  .route({
    method: 'GET',
    path: '/v1/apps/installs/{id}',
    summary: 'Retrieve an app install',
    description:
      '<p>Retrieves an app install. The installing account, the app’s developer (with the keys of the account that owns the app or of the app’s managed sandbox), and the embedding platform that created the install can retrieve it.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(AppsInstallSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AppsInstallsId = os
  .route({
    method: 'POST',
    path: '/v1/apps/installs/{id}',
    summary: 'Update an app install',
    description:
      '<p>Reauthorizes an app install. The installer grants the permissions, content security policy entries, and endpoints that the version being installed requests. An account reauthorizes its own installs on any channel with its own key; app developers and embedding platforms reauthorize installs on connected accounts through <code>Stripe-Account</code>. For private apps, the version being installed is the newest completed upload.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(AppsInstallSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AppsInstallsIdUninstall = os
  .route({
    method: 'POST',
    path: '/v1/apps/installs/{id}/uninstall',
    summary: 'Uninstall an app install',
    description: '<p>Uninstalls an app from the account that installed it.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(AppsInstallSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AppsSecrets = os
  .route({
    method: 'GET',
    path: '/v1/apps/secrets',
    summary: 'List secrets',
    description: '<p>List all secrets stored on the given scope.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      scope: v.pipe(
        v.unknown(),
        v.transform((input) => {
          if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
          const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
            (acc, [key, value]) => {
              const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
              return name === undefined ? acc : { ...acc, [name]: value }
            },
            {},
          )
          return Object.keys(out).length > 0 ? out : input
        }),
        v.object({
          type: v.picklist(['account', 'user']),
          user: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        }),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(AppsSecretSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/apps\/secrets/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AppsSecrets = os
  .route({
    method: 'POST',
    path: '/v1/apps/secrets',
    summary: 'Set a Secret',
    description: '<p>Create or replace a secret in the secret store.</p>',
    successDescription: 'Successful response.',
  })
  .output(AppsSecretSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1AppsSecretsDelete = os
  .route({
    method: 'POST',
    path: '/v1/apps/secrets/delete',
    summary: 'Delete a Secret',
    description: '<p>Deletes a secret from the secret store by name and scope.</p>',
    successDescription: 'Successful response.',
  })
  .output(AppsSecretSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1AppsSecretsFind = os
  .route({
    method: 'GET',
    path: '/v1/apps/secrets/find',
    summary: 'Find a Secret',
    description: '<p>Finds a secret in the secret store by name and scope.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      name: v.pipe(v.string(), v.maxCodePoints(5000)),
      scope: v.pipe(
        v.unknown(),
        v.transform((input) => {
          if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
          const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
            (acc, [key, value]) => {
              const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
              return name === undefined ? acc : { ...acc, [name]: value }
            },
            {},
          )
          return Object.keys(out).length > 0 ? out : input
        }),
        v.object({
          type: v.picklist(['account', 'user']),
          user: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        }),
      ),
    }),
  )
  .output(AppsSecretSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Balance = os
  .route({
    method: 'GET',
    path: '/v1/balance',
    summary: 'Retrieve balance',
    description:
      '<p>Retrieves the current account balance, based on the authentication that was used to make the request.\n For a sample request, see <a href="/docs/connect/account-balances#accounting-for-negative-balances">Accounting for negative balances</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BalanceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BalanceHistory = os
  .route({
    method: 'GET',
    path: '/v1/balance/history',
    summary: 'List all balance transactions',
    description:
      '<p>Returns a list of transactions that have contributed to the Stripe account balance (for example, charges, transfers, and so on). The transactions return in sorted order, with the most recent transactions appearing first.</p>\n\n<p>The previous name of this endpoint was “Balance history,” and it used the path <code>/v1/balance/history</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      currency: v.optional(v.string()),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payout: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      source: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BalanceTransactionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/balance_transactions/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BalanceHistoryId = os
  .route({
    method: 'GET',
    path: '/v1/balance/history/{id}',
    summary: 'Retrieve a balance transaction',
    description:
      '<p>Retrieves the balance transaction with the given ID.</p>\n\n<p>Note that this endpoint previously used the path <code>/v1/balance/history/:id</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BalanceSettings = os
  .route({
    method: 'GET',
    path: '/v1/balance_settings',
    summary: 'Retrieve balance settings',
    description:
      '<p>Retrieves balance settings for a given connected account.\n Related guide: <a href="/connect/authentication">Making API calls for connected accounts</a></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BalanceSettingsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BalanceSettings = os
  .route({
    method: 'POST',
    path: '/v1/balance_settings',
    summary: 'Update balance settings',
    description:
      '<p>Updates balance settings for a given connected account.\n Related guide: <a href="/connect/authentication">Making API calls for connected accounts</a></p>',
    successDescription: 'Successful response.',
  })
  .output(BalanceSettingsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BalanceTransactions = os
  .route({
    method: 'GET',
    path: '/v1/balance_transactions',
    summary: 'List all balance transactions',
    description:
      '<p>Returns a list of transactions that have contributed to the Stripe account balance (for example, charges, transfers, and so on). The transactions return in sorted order, with the most recent transactions appearing first.</p>\n\n<p>The previous name of this endpoint was “Balance history,” and it used the path <code>/v1/balance/history</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      currency: v.optional(v.string()),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payout: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      source: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BalanceTransactionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/balance_transactions/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BalanceTransactionsId = os
  .route({
    method: 'GET',
    path: '/v1/balance_transactions/{id}',
    summary: 'Retrieve a balance transaction',
    description:
      '<p>Retrieves the balance transaction with the given ID.</p>\n\n<p>Note that this endpoint previously used the path <code>/v1/balance/history/:id</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingAlerts = os
  .route({
    method: 'GET',
    path: '/v1/billing/alerts',
    summary: 'List billing alerts',
    description: '<p>Lists billing active and inactive alerts</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      alert_type: v.optional(v.literal('usage_threshold')),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      meter: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingAlertSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/billing\/alerts/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingAlerts = os
  .route({
    method: 'POST',
    path: '/v1/billing/alerts',
    summary: 'Create a billing alert',
    description: '<p>Creates a billing alert</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingAlertsId = os
  .route({
    method: 'GET',
    path: '/v1/billing/alerts/{id}',
    summary: 'Retrieve a billing alert',
    description: '<p>Retrieves a billing alert given an ID</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BillingAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingAlertsIdActivate = os
  .route({
    method: 'POST',
    path: '/v1/billing/alerts/{id}/activate',
    summary: 'Activate a billing alert',
    description: '<p>Reactivates this alert, allowing it to trigger again.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingAlertsIdArchive = os
  .route({
    method: 'POST',
    path: '/v1/billing/alerts/{id}/archive',
    summary: 'Archive a billing alert',
    description:
      '<p>Archives this alert, removing it from the list view and APIs. This is non-reversible.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingAlertsIdDeactivate = os
  .route({
    method: 'POST',
    path: '/v1/billing/alerts/{id}/deactivate',
    summary: 'Deactivate a billing alert',
    description: '<p>Deactivates this alert, preventing it from triggering.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingCreditBalanceSummary = os
  .route({
    method: 'GET',
    path: '/v1/billing/credit_balance_summary',
    summary: 'Retrieve the credit balance summary for a customer',
    description: '<p>Retrieves the credit balance summary for a customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      filter: v.pipe(
        v.unknown(),
        v.transform((input) => {
          if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
          const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
            (acc, [key, value]) => {
              const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
              return name === undefined ? acc : { ...acc, [name]: value }
            },
            {},
          )
          return Object.keys(out).length > 0 ? out : input
        }),
        v.object({
          applicability_scope: v.optional(
            v.partial(
              v.object({
                price_type: v.literal('metered'),
                prices: v.pipe(
                  v.unknown(),
                  v.transform((input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  ),
                  v.array(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) })),
                ),
              }),
            ),
          ),
          credit_grant: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
          type: v.picklist(['applicability_scope', 'credit_grant']),
        }),
      ),
    }),
  )
  .output(BillingCreditBalanceSummarySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingCreditBalanceTransactions = os
  .route({
    method: 'GET',
    path: '/v1/billing/credit_balance_transactions',
    summary: 'List credit balance transactions',
    description: '<p>Retrieve a list of credit balance transactions.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      credit_grant: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingCreditBalanceTransactionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/billing\/credit_grants/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingCreditBalanceTransactionsId = os
  .route({
    method: 'GET',
    path: '/v1/billing/credit_balance_transactions/{id}',
    summary: 'Retrieve a credit balance transaction',
    description: '<p>Retrieves a credit balance transaction.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BillingCreditBalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingCreditGrants = os
  .route({
    method: 'GET',
    path: '/v1/billing/credit_grants',
    summary: 'List credit grants',
    description: '<p>Retrieve a list of credit grants.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingCreditGrantSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/billing\/credit_grants/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingCreditGrants = os
  .route({
    method: 'POST',
    path: '/v1/billing/credit_grants',
    summary: 'Create a credit grant',
    description: '<p>Creates a credit grant.</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingCreditGrantSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingCreditGrantsId = os
  .route({
    method: 'GET',
    path: '/v1/billing/credit_grants/{id}',
    summary: 'Retrieve a credit grant',
    description: '<p>Retrieves a credit grant.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BillingCreditGrantSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingCreditGrantsId = os
  .route({
    method: 'POST',
    path: '/v1/billing/credit_grants/{id}',
    summary: 'Update a credit grant',
    description: '<p>Updates a credit grant.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingCreditGrantSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingCreditGrantsIdExpire = os
  .route({
    method: 'POST',
    path: '/v1/billing/credit_grants/{id}/expire',
    summary: 'Expire a credit grant',
    description: '<p>Expires a credit grant.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingCreditGrantSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingCreditGrantsIdVoid = os
  .route({
    method: 'POST',
    path: '/v1/billing/credit_grants/{id}/void',
    summary: 'Void a credit grant',
    description: '<p>Voids a credit grant.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingCreditGrantSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingFeedbackOptions = os
  .route({
    method: 'GET',
    path: '/v1/billing/feedback_options',
    summary: 'List all feedback options',
    description: '<p>Returns a list of your feedback options.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'inactive'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingFeedbackOptionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description('Resource for the List Endpoint of Feedback Option.'),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingFeedbackOptions = os
  .route({
    method: 'POST',
    path: '/v1/billing/feedback_options',
    summary: 'Create a feedback option',
    description: '<p>Creates a new feedback option.</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingFeedbackOptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingFeedbackOptionsId = os
  .route({
    method: 'GET',
    path: '/v1/billing/feedback_options/{id}',
    summary: 'Retrieve a feedback option',
    description: '<p>Retrieves a feedback option object given an ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BillingFeedbackOptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingFeedbackOptionsId = os
  .route({
    method: 'POST',
    path: '/v1/billing/feedback_options/{id}',
    summary: 'Update a feedback option',
    description: '<p>Updates the description of an existing feedback option.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingFeedbackOptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingFeedbackOptionsIdDeactivate = os
  .route({
    method: 'POST',
    path: '/v1/billing/feedback_options/{id}/deactivate',
    summary: 'Deactivate a feedback option',
    description:
      '<p>Deactivates a feedback option. Deactivated feedback options cannot be used in portal configurations.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingFeedbackOptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingMeterEventAdjustments = os
  .route({
    method: 'POST',
    path: '/v1/billing/meter_event_adjustments',
    summary: 'Create a billing meter event adjustment',
    description: '<p>Creates a billing meter event adjustment.</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingMeterEventAdjustmentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingMeterEvents = os
  .route({
    method: 'POST',
    path: '/v1/billing/meter_events',
    summary: 'Create a billing meter event',
    description: '<p>Creates a billing meter event.</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingMeterEventSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingMeters = os
  .route({
    method: 'GET',
    path: '/v1/billing/meters',
    summary: 'List billing meters',
    description: '<p>Retrieve a list of billing meters.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'inactive'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingMeterSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/billing\/meters/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingMeters = os
  .route({
    method: 'POST',
    path: '/v1/billing/meters',
    summary: 'Create a billing meter',
    description: '<p>Creates a billing meter.</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingMeterSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingMetersId = os
  .route({
    method: 'GET',
    path: '/v1/billing/meters/{id}',
    summary: 'Retrieve a billing meter',
    description: '<p>Retrieves a billing meter given an ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BillingMeterSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingMetersId = os
  .route({
    method: 'POST',
    path: '/v1/billing/meters/{id}',
    summary: 'Update a billing meter',
    description: '<p>Updates a billing meter.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingMeterSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingMetersIdDeactivate = os
  .route({
    method: 'POST',
    path: '/v1/billing/meters/{id}/deactivate',
    summary: 'Deactivate a billing meter',
    description:
      '<p>When a meter is deactivated, no more meter events will be accepted for this meter. You can’t attach a deactivated meter to a price.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingMeterSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingMetersIdEventSummaries = os
  .route({
    method: 'GET',
    path: '/v1/billing/meters/{id}/event_summaries',
    summary: 'List billing meter event summaries',
    description: '<p>Retrieve a list of billing meter event summaries.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      end_time: v.pipe(
        v.string(),
        v.regex(/^-?(?:0|[1-9]\d*)$/),
        v.transform((input) => Number(input)),
        v.number(),
        v.safeInteger(),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      start_time: v.pipe(
        v.string(),
        v.regex(/^-?(?:0|[1-9]\d*)$/),
        v.transform((input) => Number(input)),
        v.number(),
        v.safeInteger(),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      value_grouping_window: v.optional(v.picklist(['day', 'hour'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingMeterEventSummarySchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/billing\/meters\/[^\/]+\/event_summaries/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingMetersIdReactivate = os
  .route({
    method: 'POST',
    path: '/v1/billing/meters/{id}/reactivate',
    summary: 'Reactivate a billing meter',
    description:
      '<p>When a meter is reactivated, events for this meter can be accepted and you can attach the meter to a price.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingMeterSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingPortalConfigurations = os
  .route({
    method: 'GET',
    path: '/v1/billing_portal/configurations',
    summary: 'List portal configurations',
    description:
      '<p>Returns a list of configurations that describe the functionality of the customer portal.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      is_default: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(BillingPortalConfigurationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/billing_portal\/configurations/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingPortalConfigurations = os
  .route({
    method: 'POST',
    path: '/v1/billing_portal/configurations',
    summary: 'Create a portal configuration',
    description:
      '<p>Creates a configuration that describes the functionality and behavior of a PortalSession</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingPortalConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1BillingPortalConfigurationsConfiguration = os
  .route({
    method: 'GET',
    path: '/v1/billing_portal/configurations/{configuration}',
    summary: 'Retrieve a portal configuration',
    description:
      '<p>Retrieves a configuration that describes the functionality of the customer portal.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      configuration: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BillingPortalConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingPortalConfigurationsConfiguration = os
  .route({
    method: 'POST',
    path: '/v1/billing_portal/configurations/{configuration}',
    summary: 'Update a portal configuration',
    description:
      '<p>Updates a configuration that describes the functionality of the customer portal.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(BillingPortalConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1BillingPortalSessions = os
  .route({
    method: 'POST',
    path: '/v1/billing_portal/sessions',
    summary: 'Create a portal session',
    description: '<p>Creates a session of the customer portal.</p>',
    successDescription: 'Successful response.',
  })
  .output(BillingPortalSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Charges = os
  .route({
    method: 'GET',
    path: '/v1/charges',
    summary: 'List all charges',
    description:
      '<p>Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.string()),
      transfer_group: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ChargeSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/charges/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Charges = os
  .route({
    method: 'POST',
    path: '/v1/charges',
    summary: 'Create a charge',
    description:
      '<p>This method is deprecated and will be removed soon. If your integration uses it, you need to update it to use a different payment flow, such as <a href="/docs/payments/payment-intents">the Payment Intents API</a>.</p>',
    successDescription: 'Successful response.',
  })
  .output(ChargeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ChargesSearch = os
  .route({
    method: 'GET',
    path: '/v1/charges/search',
    summary: 'Search charges',
    description:
      '<p>Search for charges you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ChargeSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ChargesCharge = os
  .route({
    method: 'GET',
    path: '/v1/charges/{charge}',
    summary: 'Retrieve a charge',
    description:
      '<p>Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ChargeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesCharge = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}',
    summary: 'Update a charge',
    description:
      '<p>Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ChargeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesChargeCapture = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}/capture',
    summary: 'Capture a charge',
    description:
      '<p>This method is deprecated and will be removed soon. If your integration uses it, you need to update it to use a different payment flow, such as <a href="/docs/payments/payment-intents">the Payment Intents API</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ChargeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ChargesChargeDispute = os
  .route({
    method: 'GET',
    path: '/v1/charges/{charge}/dispute',
    description: '<p>Retrieve a dispute for a specified charge.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(DisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesChargeDispute = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}/dispute',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesChargeDisputeClose = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}/dispute/close',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesChargeRefund = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}/refund',
    summary: 'Create a refund',
    description:
      '<p>When you create a new refund, you must specify either a Charge or a PaymentIntent object.</p>\n\n<p>This action refunds a previously created charge that’s not refunded yet.\nFunds are refunded to the credit or debit card that’s originally charged.</p>\n\n<p>You can optionally refund only part of a charge.\nYou can repeat this until the entire charge is refunded.</p>\n\n<p>After you entirely refund a charge, you can’t refund it again.\nThis method raises an error when it’s called on an already-refunded charge,\nor when you attempt to refund more money than is left on a charge.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ChargeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ChargesChargeRefunds = os
  .route({
    method: 'GET',
    path: '/v1/charges/{charge}/refunds',
    summary: 'List all refunds',
    description:
      '<p>You can see a list of the refunds belonging to a specific charge. Note that the 10 most recent refunds are always available by default on the charge object. If you need more than those 10, you can use this API method and the <code>limit</code> and <code>starting_after</code> parameters to page through additional refunds.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.string(),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(RefundSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesChargeRefunds = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}/refunds',
    summary: 'Create a refund',
    description:
      '<p>When you create a new refund, you must specify a Charge or a PaymentIntent object on which to create it.</p>\n\n<p>Creating a new refund will refund a charge that has previously been created but not yet refunded.\nFunds will be refunded to the credit or debit card that was originally charged.</p>\n\n<p>You can optionally refund only part of a charge.\nYou can do so multiple times, until the entire charge has been refunded.</p>\n\n<p>Once entirely refunded, a charge can’t be refunded again.\nThis method will raise an error when called on an already-refunded charge,\nor when trying to refund more money than is left on a charge.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ChargesChargeRefundsRefund = os
  .route({
    method: 'GET',
    path: '/v1/charges/{charge}/refunds/{refund}',
    description: '<p>Retrieves the details of an existing refund.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.string(),
      refund: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ChargesChargeRefundsRefund = os
  .route({
    method: 'POST',
    path: '/v1/charges/{charge}/refunds/{refund}',
    description: '<p>Update a specified refund.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ charge: v.string(), refund: v.string() }))
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CheckoutSessions = os
  .route({
    method: 'GET',
    path: '/v1/checkout/sessions',
    summary: 'List all Checkout Sessions',
    description: '<p>Returns a list of Checkout Sessions.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_details: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.object({ email: v.string() }),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      payment_link: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['complete', 'expired', 'open'])),
      subscription: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CheckoutSessionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CheckoutSessions = os
  .route({
    method: 'POST',
    path: '/v1/checkout/sessions',
    summary: 'Create a Checkout Session',
    description: '<p>Creates a Checkout Session object.</p>',
    successDescription: 'Successful response.',
  })
  .output(CheckoutSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CheckoutSessionsSession = os
  .route({
    method: 'GET',
    path: '/v1/checkout/sessions/{session}',
    summary: 'Retrieve a Checkout Session',
    description: '<p>Retrieves a Checkout Session object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      session: v.pipe(v.string(), v.maxCodePoints(66)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CheckoutSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CheckoutSessionsSession = os
  .route({
    method: 'POST',
    path: '/v1/checkout/sessions/{session}',
    summary: 'Update a Checkout Session',
    description:
      '<p>Updates a Checkout Session object.</p>\n\n<p>Related guide: <a href="/payments/advanced/dynamic-updates">Dynamically update a Checkout Session</a></p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CheckoutSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CheckoutSessionsSessionExpire = os
  .route({
    method: 'POST',
    path: '/v1/checkout/sessions/{session}/expire',
    summary: 'Expire a Checkout Session',
    description:
      '<p>A Checkout Session can be expired when it is in one of these statuses: <code>open</code> </p>\n\n<p>After it expires, a customer can’t complete a Checkout Session and customers loading the Checkout Session see a message saying the Checkout Session is expired.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CheckoutSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CheckoutSessionsSessionLineItems = os
  .route({
    method: 'GET',
    path: '/v1/checkout/sessions/{session}/line_items',
    summary: "Retrieve a Checkout Session's line items",
    description:
      '<p>When retrieving a Checkout Session, there is an includable <strong>line_items</strong> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      session: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(ItemSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ClimateOrders = os
  .route({
    method: 'GET',
    path: '/v1/climate/orders',
    summary: 'List orders',
    description:
      '<p>Lists all Climate order objects. The orders are returned sorted by creation date, with the\nmost recently created orders appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ClimateOrderSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/climate\/orders/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ClimateOrders = os
  .route({
    method: 'POST',
    path: '/v1/climate/orders',
    summary: 'Create an order',
    description:
      '<p>Creates a Climate order object for a given Climate product. The order will be processed immediately\nafter creation and payment will be deducted your Stripe balance.</p>',
    successDescription: 'Successful response.',
  })
  .output(ClimateOrderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ClimateOrdersOrder = os
  .route({
    method: 'GET',
    path: '/v1/climate/orders/{order}',
    summary: 'Retrieve an order',
    description: '<p>Retrieves the details of a Climate order object with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      order: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ClimateOrderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ClimateOrdersOrder = os
  .route({
    method: 'POST',
    path: '/v1/climate/orders/{order}',
    summary: 'Update an order',
    description:
      '<p>Updates the specified order by setting the values of the parameters passed.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ order: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ClimateOrderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ClimateOrdersOrderCancel = os
  .route({
    method: 'POST',
    path: '/v1/climate/orders/{order}/cancel',
    summary: 'Cancel an order',
    description:
      '<p>Cancels a Climate order. You can cancel an order within 24 hours of creation. Stripe refunds the\nreservation <code>amount_subtotal</code>, but not the <code>amount_fees</code> for user-triggered cancellations. Frontier\nmight cancel reservations if suppliers fail to deliver. If Frontier cancels the reservation, Stripe\nprovides 90 days advance notice and refunds the <code>amount_total</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ order: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ClimateOrderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ClimateProducts = os
  .route({
    method: 'GET',
    path: '/v1/climate/products',
    summary: 'List products',
    description: '<p>Lists all available Climate product objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ClimateProductSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/climate\/products/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ClimateProductsProduct = os
  .route({
    method: 'GET',
    path: '/v1/climate/products/{product}',
    summary: 'Retrieve a product',
    description: '<p>Retrieves the details of a Climate product with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      product: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ClimateProductSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ClimateSuppliers = os
  .route({
    method: 'GET',
    path: '/v1/climate/suppliers',
    summary: 'List suppliers',
    description: '<p>Lists all available Climate supplier objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ClimateSupplierSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/climate\/suppliers/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ClimateSuppliersSupplier = os
  .route({
    method: 'GET',
    path: '/v1/climate/suppliers/{supplier}',
    summary: 'Retrieve a supplier',
    description: '<p>Retrieves a Climate supplier object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      supplier: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ClimateSupplierSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ConfirmationTokensConfirmationToken = os
  .route({
    method: 'GET',
    path: '/v1/confirmation_tokens/{confirmation_token}',
    summary: 'Retrieve a ConfirmationToken',
    description: '<p>Retrieves an existing ConfirmationToken object</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      confirmation_token: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ConfirmationTokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CountrySpecs = os
  .route({
    method: 'GET',
    path: '/v1/country_specs',
    summary: 'List Country Specs',
    description: '<p>Lists all Country Spec objects available in the API.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CountrySpecSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/country_specs/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CountrySpecsCountry = os
  .route({
    method: 'GET',
    path: '/v1/country_specs/{country}',
    summary: 'Retrieve a Country Spec',
    description: '<p>Returns a Country Spec for a given Country code.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      country: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CountrySpecSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Coupons = os
  .route({
    method: 'GET',
    path: '/v1/coupons',
    summary: 'List all coupons',
    description: '<p>Returns a list of your coupons.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CouponSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/coupons/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Coupons = os
  .route({
    method: 'POST',
    path: '/v1/coupons',
    summary: 'Create a coupon',
    description:
      '<p>You can create coupons easily via the <a href="https://dashboard.stripe.com/coupons">coupon management</a> page of the Stripe dashboard. Coupon creation is also accessible via the API if you need to create coupons on the fly.</p>\n\n<p>A coupon has either a <code>percent_off</code> or an <code>amount_off</code> and <code>currency</code>. If you set an <code>amount_off</code>, that amount will be subtracted from any invoice’s subtotal. For example, an invoice with a subtotal of <currency>100</currency> will have a final total of <currency>0</currency> if a coupon with an <code>amount_off</code> of <amount>200</amount> is applied to it and an invoice with a subtotal of <currency>300</currency> will have a final total of <currency>100</currency> if a coupon with an <code>amount_off</code> of <amount>200</amount> is applied to it.</p>',
    successDescription: 'Successful response.',
  })
  .output(CouponSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CouponsCoupon = os
  .route({
    method: 'GET',
    path: '/v1/coupons/{coupon}',
    summary: 'Retrieve a coupon',
    description: '<p>Retrieves the coupon with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      coupon: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CouponSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CouponsCoupon = os
  .route({
    method: 'POST',
    path: '/v1/coupons/{coupon}',
    summary: 'Update a coupon',
    description:
      '<p>Updates the metadata of a coupon. Other coupon details (currency, duration, amount_off) are, by design, not editable.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ coupon: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CouponSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CouponsCoupon = os
  .route({
    method: 'DELETE',
    path: '/v1/coupons/{coupon}',
    summary: 'Delete a coupon',
    description:
      '<p>You can delete coupons via the <a href="https://dashboard.stripe.com/coupons">coupon management</a> page of the Stripe dashboard. However, deleting a coupon does not affect any customers who have already applied the coupon; it means that new customers can’t redeem the coupon. You can also delete coupons via the API.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ coupon: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedCouponSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CreditNotes = os
  .route({
    method: 'GET',
    path: '/v1/credit_notes',
    summary: 'List all credit notes',
    description: '<p>Returns a list of credit notes.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      invoice: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CreditNoteSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CreditNotes = os
  .route({
    method: 'POST',
    path: '/v1/credit_notes',
    summary: 'Create a credit note',
    description:
      '<p>Issue a credit note to adjust the amount of a finalized invoice. A credit note will first reduce the invoice’s <code>amount_remaining</code> (and <code>amount_due</code>), but not below zero.\nThis amount is indicated by the credit note’s <code>pre_payment_amount</code>. The excess amount is indicated by <code>post_payment_amount</code>, and it can result in any combination of the following:</p>\n\n<ul>\n<li>Refunds: create a new refund (using <code>refund_amount</code>) or link existing refunds (using <code>refunds</code>).</li>\n<li>Customer balance credit: credit the customer’s balance (using <code>credit_amount</code>) which will be automatically applied to their next invoice when it’s finalized.</li>\n<li>Outside of Stripe credit: record the amount that is or will be credited outside of Stripe (using <code>out_of_band_amount</code>).</li>\n</ul>\n\n<p>The sum of refunds, customer balance credits, and outside of Stripe credits must equal the <code>post_payment_amount</code>.</p>\n\n<p>You may issue multiple credit notes for an invoice. Each credit note may increment the invoice’s <code>pre_payment_credit_notes_amount</code>,\n<code>post_payment_credit_notes_amount</code>, or both, depending on the invoice’s <code>amount_remaining</code> at the time of credit note creation.</p>\n\n<p>For invoices that also have refunds created through the <a href="/docs/api/refunds">Refund API</a>, the credit note API subtracts those refund amounts from the maximum creditable amount. This prevents the combined credit notes and refunds from exceeding the invoice amount. If you use both, ensure the combined total does not exceed the invoice’s paid amount.</p>',
    successDescription: 'Successful response.',
  })
  .output(CreditNoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CreditNotesPreview = os
  .route({
    method: 'GET',
    path: '/v1/credit_notes/preview',
    summary: 'Preview a credit note',
    description: '<p>Get a preview of a credit note without creating it.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      credit_amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      effective_at: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      email_type: v.optional(v.picklist(['credit_note', 'none'])),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
      lines: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(
            v.object({
              amount: v.optional(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ),
              description: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              invoice_line_item: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              metadata: v.optional(v.record(v.string(), v.string())),
              quantity: v.optional(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ),
              tax_amounts: v.optional(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(
                      v.object({
                        amount: v.pipe(
                          v.string(),
                          v.regex(/^-?(?:0|[1-9]\d*)$/),
                          v.transform((input) => Number(input)),
                          v.number(),
                          v.safeInteger(),
                        ),
                        tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)),
                        taxable_amount: v.pipe(
                          v.string(),
                          v.regex(/^-?(?:0|[1-9]\d*)$/),
                          v.transform((input) => Number(input)),
                          v.number(),
                          v.safeInteger(),
                        ),
                      }),
                    ),
                  ),
                  v.literal(''),
                ]),
              ),
              tax_rates: v.optional(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
                  ),
                  v.literal(''),
                ]),
              ),
              type: v.picklist(['custom_line_item', 'invoice_line_item']),
              unit_amount: v.optional(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ),
              unit_amount_decimal: v.optional(v.string()),
            }),
          ),
        ),
      ),
      memo: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      metadata: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.record(v.string(), v.string()),
        ),
      ),
      out_of_band_amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      reason: v.optional(
        v.picklist(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
      ),
      refund_amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      refunds: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(
            v.partial(
              v.object({
                amount_refunded: v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                payment_record_refund: v.object({
                  payment_record: v.pipe(v.string(), v.maxCodePoints(5000)),
                  refund_group: v.pipe(v.string(), v.maxCodePoints(5000)),
                }),
                refund: v.string(),
                type: v.picklist(['payment_record_refund', 'refund']),
              }),
            ),
          ),
        ),
      ),
      shipping_cost: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(v.object({ shipping_rate: v.pipe(v.string(), v.maxCodePoints(5000)) })),
        ),
      ),
    }),
  )
  .output(CreditNoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CreditNotesPreviewLines = os
  .route({
    method: 'GET',
    path: '/v1/credit_notes/preview/lines',
    summary: "Retrieve a credit note preview's line items",
    description:
      '<p>When retrieving a credit note preview, you’ll get a <strong>lines</strong> property containing the first handful of those items. This URL you can retrieve the full (paginated) list of line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      credit_amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      effective_at: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      email_type: v.optional(v.picklist(['credit_note', 'none'])),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      lines: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(
            v.object({
              amount: v.optional(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ),
              description: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              invoice_line_item: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              metadata: v.optional(v.record(v.string(), v.string())),
              quantity: v.optional(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ),
              tax_amounts: v.optional(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(
                      v.object({
                        amount: v.pipe(
                          v.string(),
                          v.regex(/^-?(?:0|[1-9]\d*)$/),
                          v.transform((input) => Number(input)),
                          v.number(),
                          v.safeInteger(),
                        ),
                        tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)),
                        taxable_amount: v.pipe(
                          v.string(),
                          v.regex(/^-?(?:0|[1-9]\d*)$/),
                          v.transform((input) => Number(input)),
                          v.number(),
                          v.safeInteger(),
                        ),
                      }),
                    ),
                  ),
                  v.literal(''),
                ]),
              ),
              tax_rates: v.optional(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
                  ),
                  v.literal(''),
                ]),
              ),
              type: v.picklist(['custom_line_item', 'invoice_line_item']),
              unit_amount: v.optional(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ),
              unit_amount_decimal: v.optional(v.string()),
            }),
          ),
        ),
      ),
      memo: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      metadata: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.record(v.string(), v.string()),
        ),
      ),
      out_of_band_amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      reason: v.optional(
        v.picklist(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
      ),
      refund_amount: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      refunds: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(
            v.partial(
              v.object({
                amount_refunded: v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                payment_record_refund: v.object({
                  payment_record: v.pipe(v.string(), v.maxCodePoints(5000)),
                  refund_group: v.pipe(v.string(), v.maxCodePoints(5000)),
                }),
                refund: v.string(),
                type: v.picklist(['payment_record_refund', 'refund']),
              }),
            ),
          ),
        ),
      ),
      shipping_cost: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(v.object({ shipping_rate: v.pipe(v.string(), v.maxCodePoints(5000)) })),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(CreditNoteLineItemSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CreditNotesCreditNoteLines = os
  .route({
    method: 'GET',
    path: '/v1/credit_notes/{credit_note}/lines',
    summary: "Retrieve a credit note's line items",
    description:
      '<p>When retrieving a credit note, you’ll get a <strong>lines</strong> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      credit_note: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(CreditNoteLineItemSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CreditNotesId = os
  .route({
    method: 'GET',
    path: '/v1/credit_notes/{id}',
    summary: 'Retrieve a credit note',
    description: '<p>Retrieves the credit note object with the given identifier.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CreditNoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CreditNotesId = os
  .route({
    method: 'POST',
    path: '/v1/credit_notes/{id}',
    summary: 'Update a credit note',
    description: '<p>Updates an existing credit note.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CreditNoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CreditNotesIdVoid = os
  .route({
    method: 'POST',
    path: '/v1/credit_notes/{id}/void',
    summary: 'Void a credit note',
    description:
      '<p>Marks a credit note as void. Learn more about <a href="/docs/billing/invoices/credit-notes#voiding">voiding credit notes</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CreditNoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomerSessions = os
  .route({
    method: 'POST',
    path: '/v1/customer_sessions',
    summary: 'Create a Customer Session',
    description:
      '<p>Creates a Customer Session object that includes a single-use client secret that you can use on your front-end to grant client-side API access for certain customer resources.</p>',
    successDescription: 'Successful response.',
  })
  .output(CustomerSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Customers = os
  .route({
    method: 'GET',
    path: '/v1/customers',
    summary: 'List all customers',
    description:
      '<p>Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      email: v.optional(v.pipe(v.string(), v.maxCodePoints(512))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      test_clock: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CustomerSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/customers/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Customers = os
  .route({
    method: 'POST',
    path: '/v1/customers',
    summary: 'Create a customer',
    description: '<p>Creates a new customer object.</p>',
    successDescription: 'Successful response.',
  })
  .output(CustomerSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersSearch = os
  .route({
    method: 'GET',
    path: '/v1/customers/search',
    summary: 'Search customers',
    description:
      '<p>Search for customers you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CustomerSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomer = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}',
    summary: 'Retrieve a customer',
    description: '<p>Retrieves a Customer object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(v.union([CustomerSchema, DeletedCustomerSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomer = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}',
    summary: 'Update a customer',
    description:
      '<p>Updates the specified customer by setting the values of the parameters passed. Any parameters not provided are left unchanged. For example, if you pass the <strong>source</strong> parameter, that becomes the customer’s active source (such as a card) to be used for all charges in the future. When you update a customer to a new valid card source by passing the <strong>source</strong> parameter: for each of the customer’s current subscriptions, if the subscription bills automatically and is in the <code>past_due</code> state, then the latest open invoice for the subscription with automatic collection enabled is retried. This retry doesn’t count as an automatic retry, and doesn’t affect the next regularly scheduled payment for the invoice. Changing the <strong>default_source</strong> for a customer doesn’t trigger this behavior.</p>\n\n<p>This request accepts mostly the same arguments as the customer creation call.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CustomerSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomer = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}',
    summary: 'Delete a customer',
    description:
      '<p>Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedCustomerSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerBalanceTransactions = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/balance_transactions',
    summary: 'List customer balance transactions',
    description:
      '<p>Returns a list of transactions that updated the customer’s <a href="/docs/billing/customer/balance">balances</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      invoice: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(CustomerBalanceTransactionSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerBalanceTransactions = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/balance_transactions',
    summary: 'Create a customer balance transaction',
    description:
      '<p>Creates an immutable transaction that updates the customer’s credit <a href="/docs/billing/customer/balance">balance</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CustomerBalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerBalanceTransactionsTransaction = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/balance_transactions/{transaction}',
    summary: 'Retrieve a customer balance transaction',
    description:
      '<p>Retrieves a specific customer balance transaction that updated the customer’s <a href="/docs/billing/customer/balance">balances</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      transaction: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CustomerBalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerBalanceTransactionsTransaction = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/balance_transactions/{transaction}',
    summary: 'Update a customer credit balance transaction',
    description:
      '<p>Most credit balance transaction fields are immutable, but you may update its <code>description</code> and <code>metadata</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(CustomerBalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerBankAccounts = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/bank_accounts',
    summary: 'List all bank accounts',
    description:
      '<p>You can see a list of the bank accounts belonging to a Customer. Note that the 10 most recent sources are always available by default on the Customer. If you need more than those 10, you can use this API method and the <code>limit</code> and <code>starting_after</code> parameters to page through additional bank accounts.</p>',
    deprecated: true,
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(BankAccountSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerBankAccounts = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/bank_accounts',
    summary: 'Create a card',
    description:
      '<p>When you create a new credit card, you must specify a customer or recipient on which to create it.</p>\n\n<p>If the card’s owner has no default card, then the new card will become the default.\nHowever, if the owner already has a default, then it will not change.\nTo change the default, you should <a href="/api/customers/update">update the customer</a> to have a new <code>default_source</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentSourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerBankAccountsId = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/bank_accounts/{id}',
    summary: 'Retrieve a bank account',
    description:
      '<p>By default, you can see the 10 most recent sources stored on a Customer directly on the object, but you can also retrieve details about a specific bank account stored on the Stripe account.</p>',
    deprecated: true,
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(BankAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerBankAccountsId = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/bank_accounts/{id}',
    summary: 'Update a card',
    description: '<p>Update a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(v.union([CardSchema, BankAccountSchema, SourceSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerBankAccountsId = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/bank_accounts/{id}',
    summary: 'Delete a customer source',
    description: '<p>Delete a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(v.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerBankAccountsIdVerify = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/bank_accounts/{id}/verify',
    summary: 'Verify a bank account',
    description: '<p>Verify a specified bank account for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(BankAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerCards = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/cards',
    summary: 'List all cards',
    description:
      '<p>You can see a list of the cards belonging to a customer.\nNote that the 10 most recent sources are always available on the <code>Customer</code> object.\nIf you need more than those 10, you can use this API method and the <code>limit</code> and <code>starting_after</code> parameters to page through additional cards.</p>',
    deprecated: true,
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(CardSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerCards = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/cards',
    summary: 'Create a card',
    description:
      '<p>When you create a new credit card, you must specify a customer or recipient on which to create it.</p>\n\n<p>If the card’s owner has no default card, then the new card will become the default.\nHowever, if the owner already has a default, then it will not change.\nTo change the default, you should <a href="/api/customers/update">update the customer</a> to have a new <code>default_source</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentSourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerCardsId = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/cards/{id}',
    summary: 'Retrieve a card',
    description:
      '<p>You can always see the 10 most recent cards directly on a customer; this method lets you retrieve details about a specific card stored on the customer.</p>',
    deprecated: true,
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerCardsId = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/cards/{id}',
    summary: 'Update a card',
    description: '<p>Update a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(v.union([CardSchema, BankAccountSchema, SourceSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerCardsId = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/cards/{id}',
    summary: 'Delete a customer source',
    description: '<p>Delete a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(v.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerCashBalance = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/cash_balance',
    summary: 'Retrieve a cash balance',
    description: '<p>Retrieves a customer’s cash balance.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CashBalanceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerCashBalance = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/cash_balance',
    summary: "Update a cash balance's settings",
    description: '<p>Changes the settings on a customer’s cash balance.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CashBalanceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerCashBalanceTransactions = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/cash_balance_transactions',
    summary: 'List cash balance transactions',
    description:
      '<p>Returns a list of transactions that modified the customer’s <a href="/docs/payments/customer-balance">cash balance</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(CustomerCashBalanceTransactionSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(
        'Customers with certain payments enabled have a cash balance, representing funds that were paid\nby the customer to a merchant, but have not yet been allocated to a payment. Cash Balance Transactions\nrepresent when funds are moved into or out of this balance. This includes funding by the customer, allocation\nto payments, and refunds to the customer.',
      ),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerCashBalanceTransactionsTransaction = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/cash_balance_transactions/{transaction}',
    summary: 'Retrieve a cash balance transaction',
    description:
      '<p>Retrieves a specific cash balance transaction, which updated the customer’s <a href="/docs/payments/customer-balance">cash balance</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      transaction: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(CustomerCashBalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerDiscount = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/discount',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(DiscountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerDiscount = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/discount',
    summary: 'Delete a customer discount',
    description: '<p>Removes the currently applied discount on a customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedDiscountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerFundingInstructions = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/funding_instructions',
    summary: 'Create or retrieve funding instructions for a customer cash balance',
    description:
      '<p>Retrieve funding instructions for a customer cash balance. If funding instructions do not yet exist for the customer, new\nfunding instructions will be created. If funding instructions have already been created for a given customer, the same\nfunding instructions will be retrieved. In other words, we will return the same funding instructions each time.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FundingInstructionsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerPaymentMethods = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/payment_methods',
    summary: "List a Customer's PaymentMethods",
    description: '<p>Returns a list of PaymentMethods for a given Customer</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      allow_redisplay: v.optional(v.picklist(['always', 'limited', 'unspecified'])),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(
        v.picklist([
          'acss_debit',
          'affirm',
          'afterpay_clearpay',
          'alipay',
          'alma',
          'amazon_pay',
          'au_becs_debit',
          'bacs_debit',
          'bancontact',
          'billie',
          'bizum',
          'blik',
          'boleto',
          'card',
          'cashapp',
          'crypto',
          'custom',
          'customer_balance',
          'eps',
          'fpx',
          'giropay',
          'grabpay',
          'ideal',
          'kakao_pay',
          'klarna',
          'konbini',
          'kr_card',
          'link',
          'mb_way',
          'mobilepay',
          'multibanco',
          'naver_pay',
          'nz_bank_account',
          'oxxo',
          'p24',
          'pay_by_bank',
          'payco',
          'paynow',
          'paypal',
          'paypay',
          'payto',
          'pix',
          'promptpay',
          'revolut_pay',
          'samsung_pay',
          'satispay',
          'scalapay',
          'sepa_debit',
          'sequra',
          'sofort',
          'sunbit',
          'swish',
          'twint',
          'upi',
          'us_bank_account',
          'wechat_pay',
          'zip',
        ]),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentMethodSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerPaymentMethodsPaymentMethod = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/payment_methods/{payment_method}',
    summary: "Retrieve a Customer's PaymentMethod",
    description: '<p>Retrieves a PaymentMethod object for a given Customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      payment_method: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentMethodSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerSources = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/sources',
    description: '<p>List sources for a specified customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      object: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(v.union([BankAccountSchema, CardSchema, SourceSchema])),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerSources = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/sources',
    summary: 'Create a card',
    description:
      '<p>When you create a new credit card, you must specify a customer or recipient on which to create it.</p>\n\n<p>If the card’s owner has no default card, then the new card will become the default.\nHowever, if the owner already has a default, then it will not change.\nTo change the default, you should <a href="/api/customers/update">update the customer</a> to have a new <code>default_source</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentSourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerSourcesId = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/sources/{id}',
    description: '<p>Retrieve a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(500)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentSourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerSourcesId = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/sources/{id}',
    summary: 'Update a card',
    description: '<p>Update a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(v.union([CardSchema, BankAccountSchema, SourceSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerSourcesId = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/sources/{id}',
    summary: 'Delete a customer source',
    description: '<p>Delete a specified source for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(v.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerSourcesIdVerify = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/sources/{id}/verify',
    summary: 'Verify a bank account',
    description: '<p>Verify a specified bank account for a given customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(BankAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerSubscriptions = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/subscriptions',
    summary: 'List active subscriptions',
    description:
      '<p>You can see a list of the customer’s active subscriptions. Note that the 10 most recent active subscriptions are always available by default on the customer object. If you need more than those 10, you can use the limit and starting_after parameters to page through additional subscriptions.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(SubscriptionSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerSubscriptions = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/subscriptions',
    summary: 'Create a subscription',
    description: '<p>Creates a new subscription on an existing customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerSubscriptionsSubscriptionExposedId = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}',
    summary: 'Retrieve a subscription',
    description: '<p>Retrieves the subscription with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerSubscriptionsSubscriptionExposedId = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}',
    summary: 'Update a subscription on a customer',
    description:
      '<p>Updates an existing subscription on a customer to match the specified parameters. When changing plans or quantities, we will optionally prorate the price we charge next month to make up for any price changes. To preview how the proration will be calculated, use the <a href="#upcoming_invoice">upcoming invoice</a> endpoint.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerSubscriptionsSubscriptionExposedId = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}',
    summary: 'Cancel a subscription',
    description:
      '<p>Cancels a customer’s subscription. If you set the <code>at_period_end</code> parameter to <code>true</code>, the subscription will remain active until the end of the period, at which point it will be canceled and not renewed. Otherwise, with the default <code>false</code> value, the subscription is terminated immediately. In either case, the customer will not be charged again for the subscription.</p>\n\n<p>Note, however, that any pending invoice items that you’ve created will still be charged for at the end of the period, unless manually <a href="/api/invoiceitems/delete">deleted</a>. If you’ve set the subscription to cancel at the end of the period, any pending prorations will also be left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations will be removed.</p>\n\n<p>By default, upon subscription cancellation, Stripe will stop automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(DiscountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount',
    summary: 'Delete a customer discount',
    description: '<p>Removes the currently applied discount on a customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(DeletedDiscountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerTaxIds = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/tax_ids',
    summary: 'List all Customer tax IDs',
    description: '<p>Returns a list of tax IDs for a customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TaxIdSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1CustomersCustomerTaxIds = os
  .route({
    method: 'POST',
    path: '/v1/customers/{customer}/tax_ids',
    summary: 'Create a Customer tax ID',
    description: '<p>Creates a new <code>tax_id</code> object for a customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TaxIdSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1CustomersCustomerTaxIdsId = os
  .route({
    method: 'GET',
    path: '/v1/customers/{customer}/tax_ids/{id}',
    summary: 'Retrieve a Customer tax ID',
    description: '<p>Retrieves the <code>tax_id</code> object with the given identifier.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      id: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxIdSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1CustomersCustomerTaxIdsId = os
  .route({
    method: 'DELETE',
    path: '/v1/customers/{customer}/tax_ids/{id}',
    summary: 'Delete a Customer tax ID',
    description: '<p>Deletes an existing <code>tax_id</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
  .output(DeletedTaxIdSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Disputes = os
  .route({
    method: 'GET',
    path: '/v1/disputes',
    summary: 'List all disputes',
    description: '<p>Returns a list of your disputes.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(DisputeSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/disputes/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1DisputesDispute = os
  .route({
    method: 'GET',
    path: '/v1/disputes/{dispute}',
    summary: 'Retrieve a dispute',
    description: '<p>Retrieves the dispute with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      dispute: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(DisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1DisputesDispute = os
  .route({
    method: 'POST',
    path: '/v1/disputes/{dispute}',
    summary: 'Update a dispute',
    description:
      '<p>When you get a dispute, contacting your customer is always the best first step. If that doesn’t work, you can submit evidence to help us resolve the dispute in your favor. You can do this in your <a href="https://dashboard.stripe.com/disputes">dashboard</a>, but if you prefer, you can use the API to submit evidence programmatically.</p>\n\n<p>Depending on your dispute type, different evidence fields will give you a better chance of winning your dispute. To figure out which evidence fields to provide, see our <a href="/docs/disputes/categories">guide to dispute types</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1DisputesDisputeClose = os
  .route({
    method: 'POST',
    path: '/v1/disputes/{dispute}/close',
    summary: 'Close a dispute',
    description:
      '<p>Closing the dispute for a charge indicates that you do not have any evidence to submit and are essentially dismissing the dispute (accepting it), acknowledging it as lost.</p>\n\n<p>The status of the dispute will change from <code>needs_response</code> to <code>lost</code>. <em>Closing a dispute is irreversible</em>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1EntitlementsActiveEntitlements = os
  .route({
    method: 'GET',
    path: '/v1/entitlements/active_entitlements',
    summary: 'List all active entitlements',
    description: '<p>Retrieve a list of active entitlements for a customer</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(EntitlementsActiveEntitlementSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1EntitlementsActiveEntitlementsId = os
  .route({
    method: 'GET',
    path: '/v1/entitlements/active_entitlements/{id}',
    summary: 'Retrieve an active entitlement',
    description: '<p>Retrieve an active entitlement</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(EntitlementsActiveEntitlementSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1EntitlementsFeatures = os
  .route({
    method: 'GET',
    path: '/v1/entitlements/features',
    summary: 'List all features',
    description: '<p>Retrieve a list of features</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      archived: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      lookup_key: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(EntitlementsFeatureSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/entitlements\/features/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1EntitlementsFeatures = os
  .route({
    method: 'POST',
    path: '/v1/entitlements/features',
    summary: 'Create a feature',
    description: '<p>Creates a feature</p>',
    successDescription: 'Successful response.',
  })
  .output(EntitlementsFeatureSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1EntitlementsFeaturesId = os
  .route({
    method: 'GET',
    path: '/v1/entitlements/features/{id}',
    summary: 'Retrieve a feature',
    description: '<p>Retrieves a feature</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(EntitlementsFeatureSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1EntitlementsFeaturesId = os
  .route({
    method: 'POST',
    path: '/v1/entitlements/features/{id}',
    summary: 'Updates a feature',
    description: '<p>Update a feature’s metadata or permanently deactivate it.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(EntitlementsFeatureSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1EphemeralKeys = os
  .route({
    method: 'POST',
    path: '/v1/ephemeral_keys',
    summary: 'Create an ephemeral key',
    description: '<p>Creates a short-lived API key for a given resource.</p>',
    successDescription: 'Successful response.',
  })
  .output(EphemeralKeySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1EphemeralKeysKey = os
  .route({
    method: 'DELETE',
    path: '/v1/ephemeral_keys/{key}',
    summary: 'Immediately invalidate an ephemeral key',
    description: '<p>Invalidates a short-lived API key for a given resource.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ key: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(EphemeralKeySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Events = os
  .route({
    method: 'GET',
    path: '/v1/events',
    summary: 'List all events',
    description:
      '<p>List events, going back up to 30 days. Each event data is rendered according to Stripe API version at its creation time, specified in <a href="https://docs.stripe.com/api/events/object">event object</a> <code>api_version</code> attribute (not according to your current Stripe API version or <code>Stripe-Version</code> header).</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      delivery_success: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      types: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(EventSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/events/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1EventsId = os
  .route({
    method: 'GET',
    path: '/v1/events/{id}',
    summary: 'Retrieve an event',
    description:
      '<p>Retrieves the details of an event if it was created in the last 30 days. Supply the unique identifier of the event, which you might have received in a webhook.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(EventSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ExchangeRates = os
  .route({
    method: 'GET',
    path: '/v1/exchange_rates',
    summary: 'List all exchange rates',
    description:
      '<p>[Deprecated] The <code>ExchangeRate</code> APIs are deprecated. Please use the <a href="https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api">FX Quotes API</a> instead.</p>\n\n<p>Returns a list of objects that contain the rates at which foreign currencies are converted to one another. Only shows the currencies for which Stripe supports.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ExchangeRateSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/exchange_rates/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ExchangeRatesRateId = os
  .route({
    method: 'GET',
    path: '/v1/exchange_rates/{rate_id}',
    summary: 'Retrieve an exchange rate',
    description:
      '<p>[Deprecated] The <code>ExchangeRate</code> APIs are deprecated. Please use the <a href="https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api">FX Quotes API</a> instead.</p>\n\n<p>Retrieves the exchange rates from the given currency to every supported currency.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      rate_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ExchangeRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ExternalAccountsId = os
  .route({
    method: 'POST',
    path: '/v1/external_accounts/{id}',
    summary: 'Update a bank account',
    description:
      '<p>Updates the metadata, account holder name, account holder type of a bank account belonging to\na connected account and optionally sets it as the default for its currency. Other bank account\ndetails are not editable by design.</p>\n\n<p>You can only update bank accounts when <a href="/api/accounts/object#account_object-controller-requirement_collection">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href="/connect/custom-accounts">Custom accounts</a>.</p>\n\n<p>You can re-enable a disabled bank account by performing an update call without providing any\narguments or changes.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.string() }))
  .output(ExternalAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FileLinks = os
  .route({
    method: 'GET',
    path: '/v1/file_links',
    summary: 'List all file links',
    description: '<p>Returns a list of file links.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      expired: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      file: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(FileLinkSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/file_links/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FileLinks = os
  .route({
    method: 'POST',
    path: '/v1/file_links',
    summary: 'Create a file link',
    description: '<p>Creates a new file link object.</p>',
    successDescription: 'Successful response.',
  })
  .output(FileLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FileLinksLink = os
  .route({
    method: 'GET',
    path: '/v1/file_links/{link}',
    summary: 'Retrieve a file link',
    description: '<p>Retrieves the file link with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      link: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FileLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FileLinksLink = os
  .route({
    method: 'POST',
    path: '/v1/file_links/{link}',
    summary: 'Update a file link',
    description:
      '<p>Updates an existing file link object. Expired links can no longer be updated.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ link: v.string() }))
  .output(FileLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Files = os
  .route({
    method: 'GET',
    path: '/v1/files',
    summary: 'List all files',
    description:
      '<p>Returns a list of the files that your account has access to. Stripe sorts and returns the files by their creation dates, placing the most recently created files at the top.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      purpose: v.optional(
        v.picklist([
          'account_requirement',
          'additional_verification',
          'business_icon',
          'business_logo',
          'customer_signature',
          'dispute_evidence',
          'document_provider_identity_document',
          'finance_report_run',
          'financial_account_statement',
          'identity_document',
          'identity_document_downloadable',
          'issuing_regulatory_reporting',
          'pci_document',
          'platform_terms_of_service',
          'selfie',
          'sigma_scheduled_query',
          'tax_document_user_upload',
          'terminal_android_apk',
          'terminal_reader_splashscreen',
          'terminal_wifi_certificate',
          'terminal_wifi_private_key',
        ]),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(FileSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/files/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Files = os
  .route({
    method: 'POST',
    path: '/v1/files',
    summary: 'Create a file',
    description:
      '<p>To upload a file to Stripe, you need to send a request of type <code>multipart/form-data</code>. Include the file you want to upload in the request, and the parameters for creating a file.</p>\n\n<p>All of Stripe’s officially supported Client libraries support sending <code>multipart/form-data</code>.</p>',
    successDescription: 'Successful response.',
  })
  .output(FileSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FilesFile = os
  .route({
    method: 'GET',
    path: '/v1/files/{file}',
    summary: 'Retrieve a file',
    description:
      '<p>Retrieves the details of an existing file object. After you supply a unique file ID, Stripe returns the corresponding file object. Learn how to <a href="/docs/file-upload#download-file-contents">access file contents</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      file: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FileSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FinancialConnectionsAccounts = os
  .route({
    method: 'GET',
    path: '/v1/financial_connections/accounts',
    summary: 'List Accounts',
    description: '<p>Returns a list of Financial Connections <code>Account</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account_holder: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              account: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
            }),
          ),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      session: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(FinancialConnectionsAccountSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/financial_connections\/accounts/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FinancialConnectionsAccountsAccount = os
  .route({
    method: 'GET',
    path: '/v1/financial_connections/accounts/{account}',
    summary: 'Retrieve an Account',
    description: '<p>Retrieves the details of a Financial Connections <code>Account</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FinancialConnectionsAccountsAccountDisconnect = os
  .route({
    method: 'POST',
    path: '/v1/financial_connections/accounts/{account}/disconnect',
    summary: 'Disconnect an Account',
    description:
      '<p>Disables your access to a Financial Connections <code>Account</code>. You will no longer be able to access data associated with the account (e.g. balances, transactions).</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FinancialConnectionsAccountsAccountOwners = os
  .route({
    method: 'GET',
    path: '/v1/financial_connections/accounts/{account}/owners',
    summary: 'List Account Owners',
    description: '<p>Lists all owners for a given <code>Account</code></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      ownership: v.pipe(v.string(), v.maxCodePoints(5000)),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(FinancialConnectionsAccountOwnerSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FinancialConnectionsAccountsAccountRefresh = os
  .route({
    method: 'POST',
    path: '/v1/financial_connections/accounts/{account}/refresh',
    summary: 'Refresh Account data',
    description:
      '<p>Refreshes the data associated with a Financial Connections <code>Account</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FinancialConnectionsAccountsAccountSubscribe = os
  .route({
    method: 'POST',
    path: '/v1/financial_connections/accounts/{account}/subscribe',
    summary: 'Subscribe to data refreshes for an Account',
    description:
      '<p>Subscribes to periodic refreshes of data associated with a Financial Connections <code>Account</code>. When the account status is active, data is typically refreshed once a day.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FinancialConnectionsAccountsAccountUnsubscribe = os
  .route({
    method: 'POST',
    path: '/v1/financial_connections/accounts/{account}/unsubscribe',
    summary: 'Unsubscribe from data refreshes for an Account',
    description:
      '<p>Unsubscribes from periodic refreshes of data associated with a Financial Connections <code>Account</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1FinancialConnectionsSessions = os
  .route({
    method: 'POST',
    path: '/v1/financial_connections/sessions',
    summary: 'Create a Session',
    description:
      '<p>To launch the Financial Connections authorization flow, create a <code>Session</code>. The session’s <code>client_secret</code> can be used to launch the flow using Stripe.js.</p>',
    successDescription: 'Successful response.',
  })
  .output(FinancialConnectionsSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FinancialConnectionsSessionsSession = os
  .route({
    method: 'GET',
    path: '/v1/financial_connections/sessions/{session}',
    summary: 'Retrieve a Session',
    description: '<p>Retrieves the details of a Financial Connections <code>Session</code></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      session: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FinancialConnectionsSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FinancialConnectionsTransactions = os
  .route({
    method: 'GET',
    path: '/v1/financial_connections/transactions',
    summary: 'List Transactions',
    description: '<p>Returns a list of Financial Connections <code>Transaction</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      transacted_at: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      transaction_refresh: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.object({ after: v.pipe(v.string(), v.maxCodePoints(5000)) }),
        ),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(FinancialConnectionsTransactionSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/financial_connections\/transactions/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1FinancialConnectionsTransactionsTransaction = os
  .route({
    method: 'GET',
    path: '/v1/financial_connections/transactions/{transaction}',
    summary: 'Retrieve a Transaction',
    description: '<p>Retrieves the details of a Financial Connections <code>Transaction</code></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FinancialConnectionsTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ForwardingRequests = os
  .route({
    method: 'GET',
    path: '/v1/forwarding/requests',
    summary: 'List all ForwardingRequests',
    description: '<p>Lists all ForwardingRequest objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ForwardingRequestSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description('List of ForwardingRequest data.'),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ForwardingRequests = os
  .route({
    method: 'POST',
    path: '/v1/forwarding/requests',
    summary: 'Create a ForwardingRequest',
    description: '<p>Creates a ForwardingRequest object.</p>',
    successDescription: 'Successful response.',
  })
  .output(ForwardingRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ForwardingRequestsId = os
  .route({
    method: 'GET',
    path: '/v1/forwarding/requests/{id}',
    summary: 'Retrieve a ForwardingRequest',
    description: '<p>Retrieves a ForwardingRequest object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ForwardingRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IdentityVerificationReports = os
  .route({
    method: 'GET',
    path: '/v1/identity/verification_reports',
    summary: 'List VerificationReports',
    description: '<p>List all verification reports.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      client_reference_id: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(v.picklist(['document', 'id_number'])),
      verification_session: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IdentityVerificationReportSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/identity\/verification_reports/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IdentityVerificationReportsReport = os
  .route({
    method: 'GET',
    path: '/v1/identity/verification_reports/{report}',
    summary: 'Retrieve a VerificationReport',
    description: '<p>Retrieves an existing VerificationReport</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      report: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IdentityVerificationReportSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IdentityVerificationSessions = os
  .route({
    method: 'GET',
    path: '/v1/identity/verification_sessions',
    summary: 'List VerificationSessions',
    description: '<p>Returns a list of VerificationSessions</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      client_reference_id: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      related_customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      related_customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'processing', 'requires_input', 'verified'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IdentityVerificationSessionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/identity\/verification_sessions/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IdentityVerificationSessions = os
  .route({
    method: 'POST',
    path: '/v1/identity/verification_sessions',
    summary: 'Create a VerificationSession',
    description:
      '<p>Creates a VerificationSession object.</p>\n\n<p>After the VerificationSession is created, display a verification modal using the session <code>client_secret</code> or send your users to the session’s <code>url</code>.</p>\n\n<p>If your API key is in test mode, verification checks won’t actually process, though everything else will occur as if in live mode.</p>\n\n<p>Related guide: <a href="/docs/identity/verify-identity-documents">Verify your users’ identity documents</a></p>',
    successDescription: 'Successful response.',
  })
  .output(IdentityVerificationSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IdentityVerificationSessionsSession = os
  .route({
    method: 'GET',
    path: '/v1/identity/verification_sessions/{session}',
    summary: 'Retrieve a VerificationSession',
    description:
      '<p>Retrieves the details of a VerificationSession that was previously created.</p>\n\n<p>When the session status is <code>requires_input</code>, you can use this method to retrieve a valid\n<code>client_secret</code> or <code>url</code> to allow re-submission.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      session: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IdentityVerificationSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IdentityVerificationSessionsSession = os
  .route({
    method: 'POST',
    path: '/v1/identity/verification_sessions/{session}',
    summary: 'Update a VerificationSession',
    description:
      '<p>Updates a VerificationSession object.</p>\n\n<p>When the session status is <code>requires_input</code>, you can use this method to update the\nverification check and options.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IdentityVerificationSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IdentityVerificationSessionsSessionCancel = os
  .route({
    method: 'POST',
    path: '/v1/identity/verification_sessions/{session}/cancel',
    summary: 'Cancel a VerificationSession',
    description:
      '<p>A VerificationSession object can be canceled when it is in <code>requires_input</code> <a href="/docs/identity/how-sessions-work">status</a>.</p>\n\n<p>Once canceled, future submission attempts are disabled. This cannot be undone. <a href="/docs/identity/verification-sessions#cancel">Learn more</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IdentityVerificationSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IdentityVerificationSessionsSessionRedact = os
  .route({
    method: 'POST',
    path: '/v1/identity/verification_sessions/{session}/redact',
    summary: 'Redact a VerificationSession',
    description:
      '<p>Redact a VerificationSession to remove all collected information from Stripe. This will redact\nthe VerificationSession and all objects related to it, including VerificationReports, Events,\nrequest logs, etc.</p>\n\n<p>A VerificationSession object can be redacted when it is in <code>requires_input</code> or <code>verified</code>\n<a href="/docs/identity/how-sessions-work">status</a>. Redacting a VerificationSession in <code>requires_action</code>\nstate will automatically cancel it.</p>\n\n<p>The redaction process may take up to four days. When the redaction process is in progress, the\nVerificationSession’s <code>redaction.status</code> field will be set to <code>processing</code>; when the process is\nfinished, it will change to <code>redacted</code> and an <code>identity.verification_session.redacted</code> event\nwill be emitted.</p>\n\n<p>Redaction is irreversible. Redacted objects are still accessible in the Stripe API, but all the\nfields that contain personal data will be replaced by the string <code>[redacted]</code> or a similar\nplaceholder. The <code>metadata</code> field will also be erased. Redacted objects cannot be updated or\nused for any purpose.</p>\n\n<p><a href="/docs/identity/verification-sessions#redact">Learn more</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IdentityVerificationSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoicePayments = os
  .route({
    method: 'GET',
    path: '/v1/invoice_payments',
    summary: 'List all payments for an invoice',
    description:
      '<p>When retrieving an invoice, there is an includable payments property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of payments.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      invoice: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.object({
            payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            payment_record: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            type: v.picklist(['payment_intent', 'payment_record']),
          }),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'open', 'paid'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(InvoicePaymentSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoicePaymentsInvoicePayment = os
  .route({
    method: 'GET',
    path: '/v1/invoice_payments/{invoice_payment}',
    summary: 'Retrieve an InvoicePayment',
    description: '<p>Retrieves the invoice payment with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      invoice_payment: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(InvoicePaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoiceRenderingTemplates = os
  .route({
    method: 'GET',
    path: '/v1/invoice_rendering_templates',
    summary: 'List all invoice rendering templates',
    description:
      '<p>List all templates, ordered by creation date, with the most recently created template appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'archived'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(InvoiceRenderingTemplateSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoiceRenderingTemplatesTemplate = os
  .route({
    method: 'GET',
    path: '/v1/invoice_rendering_templates/{template}',
    summary: 'Retrieve an invoice rendering template',
    description:
      '<p>Retrieves an invoice rendering template with the given ID. It by default returns the latest version of the template. Optionally, specify a version to see previous versions.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      template: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      version: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
    }),
  )
  .output(InvoiceRenderingTemplateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoiceRenderingTemplatesTemplateArchive = os
  .route({
    method: 'POST',
    path: '/v1/invoice_rendering_templates/{template}/archive',
    summary: 'Archive an invoice rendering template',
    description:
      '<p>Updates the status of an invoice rendering template to ‘archived’ so no new Stripe objects (customers, invoices, etc.) can reference it. The template can also no longer be updated. However, if the template is already set on a Stripe object, it will continue to be applied on invoices generated by it.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ template: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceRenderingTemplateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoiceRenderingTemplatesTemplateUnarchive = os
  .route({
    method: 'POST',
    path: '/v1/invoice_rendering_templates/{template}/unarchive',
    summary: 'Unarchive an invoice rendering template',
    description:
      '<p>Unarchive an invoice rendering template so it can be used on new Stripe objects again.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ template: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceRenderingTemplateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Invoiceitems = os
  .route({
    method: 'GET',
    path: '/v1/invoiceitems',
    summary: 'List all invoice items',
    description:
      '<p>Returns a list of your invoice items. Invoice items are returned sorted by creation date, with the most recently created invoice items appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      invoice: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      pending: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(InvoiceitemSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/invoiceitems/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Invoiceitems = os
  .route({
    method: 'POST',
    path: '/v1/invoiceitems',
    summary: 'Create an invoice item',
    description:
      '<p>Creates an item to be added to a draft invoice (up to 250 items per invoice). If no invoice is specified, the item will be on the next invoice created for the customer specified.</p>',
    successDescription: 'Successful response.',
  })
  .output(InvoiceitemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoiceitemsInvoiceitem = os
  .route({
    method: 'GET',
    path: '/v1/invoiceitems/{invoiceitem}',
    summary: 'Retrieve an invoice item',
    description: '<p>Retrieves the invoice item with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      invoiceitem: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(InvoiceitemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoiceitemsInvoiceitem = os
  .route({
    method: 'POST',
    path: '/v1/invoiceitems/{invoiceitem}',
    summary: 'Update an invoice item',
    description:
      '<p>Updates the amount or description of an invoice item on an upcoming invoice. Updating an invoice item is only possible before the invoice it’s attached to is closed.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoiceitem: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceitemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1InvoiceitemsInvoiceitem = os
  .route({
    method: 'DELETE',
    path: '/v1/invoiceitems/{invoiceitem}',
    summary: 'Delete an invoice item',
    description:
      '<p>Deletes an invoice item, removing it from an invoice. Deleting invoice items is only possible when they’re not attached to invoices, or if it’s attached to a draft invoice.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoiceitem: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedInvoiceitemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Invoices = os
  .route({
    method: 'GET',
    path: '/v1/invoices',
    summary: 'List all invoices',
    description:
      '<p>You can list all invoices, or list the invoices for a specific customer. The invoices are returned sorted by creation date, with the most recently created invoices appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      collection_method: v.optional(v.picklist(['charge_automatically', 'send_invoice'])),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      due_date: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['draft', 'open', 'paid', 'uncollectible', 'void'])),
      subscription: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(InvoiceSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/invoices/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Invoices = os
  .route({
    method: 'POST',
    path: '/v1/invoices',
    summary: 'Create an invoice',
    description:
      '<p>This endpoint creates a draft invoice for a given customer. The invoice remains a draft until you <a href="/api/invoices/finalize">finalize</a> the invoice, which allows you to <a href="/api/invoices/pay">pay</a> or <a href="/api/invoices/send">send</a> the invoice to your customers.</p>',
    successDescription: 'Successful response.',
  })
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesCreatePreview = os
  .route({
    method: 'POST',
    path: '/v1/invoices/create_preview',
    summary: 'Create a preview invoice',
    description:
      '<p>At any time, you can preview the upcoming invoice for a subscription or subscription schedule. This will show you all the charges that are pending, including subscription renewal charges, invoice item charges, etc. It will also show you any discounts that are applicable to the invoice.</p>\n\n<p>You can also preview the effects of creating or updating a subscription or subscription schedule, including a preview of any prorations that will take place. To ensure that the actual proration is calculated exactly the same as the previewed proration, you should pass the <code>subscription_details.proration_date</code> parameter when doing the actual subscription update.</p>\n\n<p>The recommended way to get only the prorations being previewed on the invoice is to consider line items where <code>parent.subscription_item_details.proration</code> is <code>true</code>.</p>\n\n<p>Note that when you are viewing an upcoming invoice, you are simply viewing a preview – the invoice has not yet been created. As such, the upcoming invoice will not show up in invoice listing calls, and you cannot use the API to pay or edit the invoice. If you want to change the amount that your customer will be billed, you can add, remove, or update pending invoice items, or update the customer’s discount.</p>\n\n<p>Note: Currency conversion calculations use the latest exchange rates. Exchange rates may vary between the time of the preview and the time of the actual invoice creation. <a href="https://docs.stripe.com/currencies/conversions">Learn more</a></p>',
    successDescription: 'Successful response.',
  })
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoicesSearch = os
  .route({
    method: 'GET',
    path: '/v1/invoices/search',
    summary: 'Search invoices',
    description:
      '<p>Search for invoices you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(InvoiceSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoicesInvoice = os
  .route({
    method: 'GET',
    path: '/v1/invoices/{invoice}',
    summary: 'Retrieve an invoice',
    description: '<p>Retrieves the invoice with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoice = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}',
    summary: 'Update an invoice',
    description:
      '<p>Draft invoices are fully editable. Once an invoice is <a href="/docs/billing/invoices/workflow#finalized">finalized</a>,\nyou can no longer change most of its details, including monetary values and <code>collection_method</code>. For most invoices,\nthis also includes <code>description</code>.</p>\n\n<p>If you would like to stop the Stripe Billing engine from automatically finalizing, reattempting payments on,\nsending reminders for, or <a href="/docs/billing/invoices/reconciliation">automatically reconciling</a> invoices, pass\n<code>auto_advance=false</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1InvoicesInvoice = os
  .route({
    method: 'DELETE',
    path: '/v1/invoices/{invoice}',
    summary: 'Delete a draft invoice',
    description:
      '<p>Permanently deletes a one-off invoice draft. This cannot be undone. Attempts to delete invoices that are no longer in a draft state will fail; once an invoice has been finalized or if an invoice is for a subscription, it must be <a href="/api/invoices/void">voided</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedInvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceAddLines = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/add_lines',
    summary: 'Bulk add invoice line items',
    description:
      '<p>Adds multiple line items to an invoice. This is only possible when an invoice is still a draft.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceAttachPayment = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/attach_payment',
    summary: 'Attach a payment to an Invoice',
    description:
      '<p>Attaches a PaymentIntent or an Out of Band Payment to the invoice, adding it to the list of <code>payments</code>.</p>\n\n<p>For the PaymentIntent, when the PaymentIntent’s status changes to <code>succeeded</code>, the payment is credited\nto the invoice, increasing its <code>amount_paid</code>. When the invoice is fully paid, the\ninvoice’s status becomes <code>paid</code>.</p>\n\n<p>If the PaymentIntent’s status is already <code>succeeded</code> when it’s attached, it’s\ncredited to the invoice immediately.</p>\n\n<p>See: <a href="/docs/invoicing/partial-payments">Partial payments</a> to learn more.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceFinalize = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/finalize',
    summary: 'Finalize an invoice',
    description:
      '<p>Stripe automatically finalizes drafts before sending and attempting payment on invoices. However, if you’d like to finalize a draft invoice manually, you can do so using this method.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1InvoicesInvoiceLines = os
  .route({
    method: 'GET',
    path: '/v1/invoices/{invoice}/lines',
    summary: "Retrieve an invoice's line items",
    description:
      '<p>When retrieving an invoice, you’ll get a <strong>lines</strong> property containing the total count of line items and the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(LineItemSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceLinesLineItemId = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/lines/{line_item_id}',
    summary: "Update an invoice's line item",
    description:
      '<p>Updates an invoice’s line item. Some fields, such as <code>tax_amounts</code>, only live on the invoice line item,\nso they can only be updated through this endpoint. Other fields, such as <code>amount</code>, live on both the invoice\nitem and the invoice line item, so updates on this endpoint will propagate to the invoice item as well.\nUpdating an invoice’s line item is only possible before the invoice is finalized.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
      line_item_id: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(LineItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceMarkUncollectible = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/mark_uncollectible',
    summary: 'Mark an invoice as uncollectible',
    description:
      '<p>Marking an invoice as uncollectible is useful for keeping track of bad debts that can be written off for accounting purposes.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoicePay = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/pay',
    summary: 'Pay an invoice',
    description:
      '<p>Stripe automatically creates and then attempts to collect payment on invoices for customers on subscriptions according to your <a href="https://dashboard.stripe.com/account/billing/automatic">subscriptions settings</a>. However, if you’d like to attempt payment on an invoice out of the normal collection schedule or for some other reason, you can do so.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceRemoveLines = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/remove_lines',
    summary: 'Bulk remove invoice line items',
    description:
      '<p>Removes multiple line items from an invoice. This is only possible when an invoice is still a draft.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceSend = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/send',
    summary: 'Send an invoice for manual payment',
    description:
      '<p>Stripe will automatically send invoices to customers according to your <a href="https://dashboard.stripe.com/account/billing/automatic">subscriptions settings</a>. However, if you’d like to manually send an invoice to your customer out of the normal schedule, you can do so. When sending invoices that have already been paid, there will be no reference to the payment in the email.</p>\n\n<p>Requests made in test-mode result in no emails being sent, despite sending an <code>invoice.sent</code> event.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceUpdateLines = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/update_lines',
    summary: 'Bulk update invoice line items',
    description:
      '<p>Updates multiple line items on an invoice. This is only possible when an invoice is still a draft.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1InvoicesInvoiceVoid = os
  .route({
    method: 'POST',
    path: '/v1/invoices/{invoice}/void',
    summary: 'Void an invoice',
    description:
      '<p>Mark a finalized invoice as void. This cannot be undone. Voiding an invoice is similar to <a href="/api/invoices/delete">deletion</a>, however it only applies to finalized invoices and maintains a papertrail where the invoice can still be found.</p>\n\n<p>Consult with local regulations to determine whether and how an invoice might be amended, canceled, or voided in the jurisdiction you’re doing business in. You might need to <a href="/api/invoices/create">issue another invoice</a> or <a href="/api/credit_notes/create">credit note</a> instead. Stripe recommends that you consult with your legal counsel for advice specific to your business.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(InvoiceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingAuthorizations = os
  .route({
    method: 'GET',
    path: '/v1/issuing/authorizations',
    summary: 'List all authorizations',
    description:
      '<p>Returns a list of Issuing <code>Authorization</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      card: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      cardholder: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['closed', 'expired', 'pending', 'reversed'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingAuthorizationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/issuing\/authorizations/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingAuthorizationsAuthorization = os
  .route({
    method: 'GET',
    path: '/v1/issuing/authorizations/{authorization}',
    summary: 'Retrieve an authorization',
    description: '<p>Retrieves an Issuing <code>Authorization</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      authorization: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingAuthorizationsAuthorization = os
  .route({
    method: 'POST',
    path: '/v1/issuing/authorizations/{authorization}',
    summary: 'Update an authorization',
    description:
      '<p>Updates the specified Issuing <code>Authorization</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingAuthorizationsAuthorizationApprove = os
  .route({
    method: 'POST',
    path: '/v1/issuing/authorizations/{authorization}/approve',
    summary: 'Approve an authorization',
    description:
      '<p>[Deprecated] Approves a pending Issuing <code>Authorization</code> object. This request should be made within the timeout window of the <a href="/docs/issuing/controls/real-time-authorizations">real-time authorization</a> flow. \nThis method is deprecated. Instead, <a href="/docs/issuing/controls/real-time-authorizations#authorization-handling">respond directly to the webhook request to approve an authorization</a>.</p>',
    deprecated: true,
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingAuthorizationsAuthorizationDecline = os
  .route({
    method: 'POST',
    path: '/v1/issuing/authorizations/{authorization}/decline',
    summary: 'Decline an authorization',
    description:
      '<p>[Deprecated] Declines a pending Issuing <code>Authorization</code> object. This request should be made within the timeout window of the <a href="/docs/issuing/controls/real-time-authorizations">real time authorization</a> flow.\nThis method is deprecated. Instead, <a href="/docs/issuing/controls/real-time-authorizations#authorization-handling">respond directly to the webhook request to decline an authorization</a>.</p>',
    deprecated: true,
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingCardholders = os
  .route({
    method: 'GET',
    path: '/v1/issuing/cardholders',
    summary: 'List all cardholders',
    description:
      '<p>Returns a list of Issuing <code>Cardholder</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      email: v.optional(v.string()),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      phone_number: v.optional(v.string()),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'blocked', 'inactive'])),
      type: v.optional(v.picklist(['company', 'individual'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingCardholderSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/issuing\/cardholders/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingCardholders = os
  .route({
    method: 'POST',
    path: '/v1/issuing/cardholders',
    summary: 'Create a cardholder',
    description:
      '<p>Creates a new Issuing <code>Cardholder</code> object that can be issued cards.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingCardholderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingCardholdersCardholder = os
  .route({
    method: 'GET',
    path: '/v1/issuing/cardholders/{cardholder}',
    summary: 'Retrieve a cardholder',
    description: '<p>Retrieves an Issuing <code>Cardholder</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      cardholder: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingCardholderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingCardholdersCardholder = os
  .route({
    method: 'POST',
    path: '/v1/issuing/cardholders/{cardholder}',
    summary: 'Update a cardholder',
    description:
      '<p>Updates the specified Issuing <code>Cardholder</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ cardholder: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardholderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingCards = os
  .route({
    method: 'GET',
    path: '/v1/issuing/cards',
    summary: 'List all cards',
    description:
      '<p>Returns a list of Issuing <code>Card</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      cardholder: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      exp_month: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      exp_year: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      last4: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      personalization_design: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'canceled', 'inactive'])),
      type: v.optional(v.picklist(['physical', 'virtual'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingCardSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/issuing\/cards/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingCards = os
  .route({
    method: 'POST',
    path: '/v1/issuing/cards',
    summary: 'Create a card',
    description: '<p>Creates an Issuing <code>Card</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingCardsCard = os
  .route({
    method: 'GET',
    path: '/v1/issuing/cards/{card}',
    summary: 'Retrieve a card',
    description: '<p>Retrieves an Issuing <code>Card</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      card: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingCardsCard = os
  .route({
    method: 'POST',
    path: '/v1/issuing/cards/{card}',
    summary: 'Update a card',
    description:
      '<p>Updates the specified Issuing <code>Card</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingDisputes = os
  .route({
    method: 'GET',
    path: '/v1/issuing/disputes',
    summary: 'List all disputes',
    description:
      '<p>Returns a list of Issuing <code>Dispute</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['expired', 'lost', 'submitted', 'unsubmitted', 'won'])),
      transaction: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingDisputeSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/issuing\/disputes/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingDisputes = os
  .route({
    method: 'POST',
    path: '/v1/issuing/disputes',
    summary: 'Create a dispute',
    description:
      '<p>Creates an Issuing <code>Dispute</code> object. Individual pieces of evidence within the <code>evidence</code> object are optional at this point. Stripe only validates that required evidence is present during submission. Refer to <a href="/docs/issuing/purchases/disputes#dispute-reasons-and-evidence">Dispute reasons and evidence</a> for more details about evidence requirements.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingDisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingDisputesDispute = os
  .route({
    method: 'GET',
    path: '/v1/issuing/disputes/{dispute}',
    summary: 'Retrieve a dispute',
    description: '<p>Retrieves an Issuing <code>Dispute</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      dispute: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingDisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingDisputesDispute = os
  .route({
    method: 'POST',
    path: '/v1/issuing/disputes/{dispute}',
    summary: 'Update a dispute',
    description:
      '<p>Updates the specified Issuing <code>Dispute</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Properties on the <code>evidence</code> object can be unset by passing in an empty string.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingDisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingDisputesDisputeSubmit = os
  .route({
    method: 'POST',
    path: '/v1/issuing/disputes/{dispute}/submit',
    summary: 'Submit a dispute',
    description:
      '<p>Submits an Issuing <code>Dispute</code> to the card network. Stripe validates that all evidence fields required for the dispute’s reason are present. For more details, see <a href="/docs/issuing/purchases/disputes#dispute-reasons-and-evidence">Dispute reasons and evidence</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingDisputeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingPersonalizationDesigns = os
  .route({
    method: 'GET',
    path: '/v1/issuing/personalization_designs',
    summary: 'List all personalization designs',
    description:
      '<p>Returns a list of personalization design objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      lookup_keys: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(200))),
        ),
      ),
      preferences: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              is_default: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              is_platform_default: v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
            }),
          ),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'inactive', 'rejected', 'review'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingPersonalizationDesignSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/issuing\/personalization_designs/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingPersonalizationDesigns = os
  .route({
    method: 'POST',
    path: '/v1/issuing/personalization_designs',
    summary: 'Create a personalization design',
    description: '<p>Creates a personalization design object.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingPersonalizationDesignSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingPersonalizationDesignsPersonalizationDesign = os
  .route({
    method: 'GET',
    path: '/v1/issuing/personalization_designs/{personalization_design}',
    summary: 'Retrieve a personalization design',
    description: '<p>Retrieves a personalization design object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingPersonalizationDesignSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingPersonalizationDesignsPersonalizationDesign = os
  .route({
    method: 'POST',
    path: '/v1/issuing/personalization_designs/{personalization_design}',
    summary: 'Update a personalization design',
    description: '<p>Updates a card personalization object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingPersonalizationDesignSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingPhysicalBundles = os
  .route({
    method: 'GET',
    path: '/v1/issuing/physical_bundles',
    summary: 'List all physical bundles',
    description:
      '<p>Returns a list of physical bundle objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'inactive', 'review'])),
      type: v.optional(v.picklist(['custom', 'standard'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingPhysicalBundleSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/issuing\/physical_bundles/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingPhysicalBundlesPhysicalBundle = os
  .route({
    method: 'GET',
    path: '/v1/issuing/physical_bundles/{physical_bundle}',
    summary: 'Retrieve a physical bundle',
    description: '<p>Retrieves a physical bundle object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      physical_bundle: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingPhysicalBundleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingSettlementsSettlement = os
  .route({
    method: 'GET',
    path: '/v1/issuing/settlements/{settlement}',
    summary: 'Retrieve a settlement',
    description: '<p>Retrieves an Issuing <code>Settlement</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      settlement: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingSettlementSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingSettlementsSettlement = os
  .route({
    method: 'POST',
    path: '/v1/issuing/settlements/{settlement}',
    summary: 'Update a settlement',
    description:
      '<p>Updates the specified Issuing <code>Settlement</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ settlement: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingSettlementSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingTokens = os
  .route({
    method: 'GET',
    path: '/v1/issuing/tokens',
    summary: 'List all issuing tokens for card',
    description: '<p>Lists all Issuing <code>Token</code> objects for a given card.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      card: v.pipe(v.string(), v.maxCodePoints(5000)),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'deleted', 'requested', 'suspended'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingTokenSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingTokensToken = os
  .route({
    method: 'GET',
    path: '/v1/issuing/tokens/{token}',
    summary: 'Retrieve an issuing token',
    description: '<p>Retrieves an Issuing <code>Token</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      token: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingTokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingTokensToken = os
  .route({
    method: 'POST',
    path: '/v1/issuing/tokens/{token}',
    summary: 'Update a token status',
    description:
      '<p>Attempts to update the specified Issuing <code>Token</code> object to the status specified.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ token: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingTokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingTransactions = os
  .route({
    method: 'GET',
    path: '/v1/issuing/transactions',
    summary: 'List all transactions',
    description:
      '<p>Returns a list of Issuing <code>Transaction</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      card: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      cardholder: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(v.picklist(['capture', 'refund'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(IssuingTransactionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/issuing\/transactions/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1IssuingTransactionsTransaction = os
  .route({
    method: 'GET',
    path: '/v1/issuing/transactions/{transaction}',
    summary: 'Retrieve a transaction',
    description: '<p>Retrieves an Issuing <code>Transaction</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(IssuingTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1IssuingTransactionsTransaction = os
  .route({
    method: 'POST',
    path: '/v1/issuing/transactions/{transaction}',
    summary: 'Update a transaction',
    description:
      '<p>Updates the specified Issuing <code>Transaction</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ transaction: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1LinkAccountSessions = os
  .route({
    method: 'POST',
    path: '/v1/link_account_sessions',
    summary: 'Create a Session',
    description:
      '<p>To launch the Financial Connections authorization flow, create a <code>Session</code>. The session’s <code>client_secret</code> can be used to launch the flow using Stripe.js.</p>',
    successDescription: 'Successful response.',
  })
  .output(FinancialConnectionsSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1LinkAccountSessionsSession = os
  .route({
    method: 'GET',
    path: '/v1/link_account_sessions/{session}',
    summary: 'Retrieve a Session',
    description: '<p>Retrieves the details of a Financial Connections <code>Session</code></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      session: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FinancialConnectionsSessionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1LinkedAccounts = os
  .route({
    method: 'GET',
    path: '/v1/linked_accounts',
    summary: 'List Accounts',
    description: '<p>Returns a list of Financial Connections <code>Account</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account_holder: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              account: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
            }),
          ),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      session: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(FinancialConnectionsAccountSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/financial_connections\/accounts/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1LinkedAccountsAccount = os
  .route({
    method: 'GET',
    path: '/v1/linked_accounts/{account}',
    summary: 'Retrieve an Account',
    description: '<p>Retrieves the details of a Financial Connections <code>Account</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1LinkedAccountsAccountDisconnect = os
  .route({
    method: 'POST',
    path: '/v1/linked_accounts/{account}/disconnect',
    summary: 'Disconnect an Account',
    description:
      '<p>Disables your access to a Financial Connections <code>Account</code>. You will no longer be able to access data associated with the account (e.g. balances, transactions).</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1LinkedAccountsAccountOwners = os
  .route({
    method: 'GET',
    path: '/v1/linked_accounts/{account}/owners',
    summary: 'List Account Owners',
    description: '<p>Lists all owners for a given <code>Account</code></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      account: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      ownership: v.pipe(v.string(), v.maxCodePoints(5000)),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(FinancialConnectionsAccountOwnerSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1LinkedAccountsAccountRefresh = os
  .route({
    method: 'POST',
    path: '/v1/linked_accounts/{account}/refresh',
    summary: 'Refresh Account data',
    description:
      '<p>Refreshes the data associated with a Financial Connections <code>Account</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(FinancialConnectionsAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1MandatesMandate = os
  .route({
    method: 'GET',
    path: '/v1/mandates/{mandate}',
    summary: 'Retrieve a Mandate',
    description: '<p>Retrieves a Mandate object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      mandate: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(MandateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentAttemptRecords = os
  .route({
    method: 'GET',
    path: '/v1/payment_attempt_records',
    summary: 'List Payment Attempt Records',
    description:
      '<p>List all the Payment Attempt Records attached to the specified Payment Record.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_record: v.pipe(v.string(), v.maxCodePoints(5000)),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentAttemptRecordSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description('A list of PaymentAttemptRecords.'),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentAttemptRecordsId = os
  .route({
    method: 'GET',
    path: '/v1/payment_attempt_records/{id}',
    summary: 'Retrieve a Payment Attempt Record',
    description: '<p>Retrieves a Payment Attempt Record with the given ID</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentAttemptRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentIntents = os
  .route({
    method: 'GET',
    path: '/v1/payment_intents',
    summary: 'List all PaymentIntents',
    description: '<p>Returns a list of PaymentIntents.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentIntentSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/payment_intents/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntents = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents',
    summary: 'Create a PaymentIntent',
    description:
      '<p>Creates a PaymentIntent object.</p>\n\n<p>After the PaymentIntent is created, attach a payment method and <a href="/docs/api/payment_intents/confirm">confirm</a>\nto continue the payment. Learn more about <a href="/docs/payments/payment-intents">the available payment flows\nwith the Payment Intents API</a>.</p>\n\n<p>When you use <code>confirm=true</code> during creation, it’s equivalent to creating\nand confirming the PaymentIntent in the same call. You can use any parameters\navailable in the <a href="/docs/api/payment_intents/confirm">confirm API</a> when you supply\n<code>confirm=true</code>.</p>',
    successDescription: 'Successful response.',
  })
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentIntentsSearch = os
  .route({
    method: 'GET',
    path: '/v1/payment_intents/search',
    summary: 'Search PaymentIntents',
    description:
      '<p>Search for PaymentIntents you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentIntentSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentIntentsIntent = os
  .route({
    method: 'GET',
    path: '/v1/payment_intents/{intent}',
    summary: 'Retrieve a PaymentIntent',
    description:
      '<p>Retrieves the details of a PaymentIntent that has previously been created. </p>\n\n<p>You can retrieve a PaymentIntent client-side using a publishable key when the <code>client_secret</code> is in the query string. </p>\n\n<p>If you retrieve a PaymentIntent with a publishable key, it only returns a subset of properties. Refer to the <a href="/api/payment_intents/object">payment intent</a> object reference for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      client_secret: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntent = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}',
    summary: 'Update a PaymentIntent',
    description:
      '<p>Updates properties on a PaymentIntent object without confirming.</p>\n\n<p>Depending on which properties you update, you might need to confirm the\nPaymentIntent again. For example, updating the <code>payment_method</code>\nalways requires you to confirm the PaymentIntent again. If you prefer to\nupdate and confirm at the same time, we recommend updating properties through\nthe <a href="/docs/api/payment_intents/confirm">confirm API</a> instead.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentIntentsIntentAmountDetailsLineItems = os
  .route({
    method: 'GET',
    path: '/v1/payment_intents/{intent}/amount_details_line_items',
    summary: 'List all PaymentIntent LineItems',
    description: '<p>Lists all LineItems of a given PaymentIntent.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(PaymentIntentAmountDetailsLineItemSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntentApplyCustomerBalance = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}/apply_customer_balance',
    summary: 'Reconcile a customer_balance PaymentIntent',
    description:
      '<p>Manually reconcile the remaining amount for a <code>customer_balance</code> PaymentIntent.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntentCancel = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}/cancel',
    summary: 'Cancel a PaymentIntent',
    description:
      '<p>You can cancel a PaymentIntent object when it’s in one of these statuses: <code>requires_payment_method</code>, <code>requires_capture</code>, <code>requires_confirmation</code>, <code>requires_action</code> or, <a href="/docs/payments/intents">in rare cases</a>, <code>processing</code>. </p>\n\n<p>After it’s canceled, no additional charges are made by the PaymentIntent and any operations on the PaymentIntent fail with an error. For PaymentIntents with a <code>status</code> of <code>requires_capture</code>, the remaining <code>amount_capturable</code> is automatically refunded. </p>\n\n<p>You can directly cancel the PaymentIntent for a Checkout Session only when the PaymentIntent has a status of <code>requires_capture</code>. Otherwise, you must <a href="/docs/api/checkout/sessions/expire">expire the Checkout Session</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntentCapture = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}/capture',
    summary: 'Capture a PaymentIntent',
    description:
      '<p>Capture the funds of an existing uncaptured PaymentIntent when its status is <code>requires_capture</code>.</p>\n\n<p>Uncaptured PaymentIntents are cancelled a set number of days (7 by default) after their creation.</p>\n\n<p>Learn more about <a href="/docs/payments/capture-later">separate authorization and capture</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntentConfirm = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}/confirm',
    summary: 'Confirm a PaymentIntent',
    description:
      '<p>Confirm that your customer intends to pay with current or provided\npayment method. Upon confirmation, the PaymentIntent will attempt to initiate\na payment.</p>\n\n<p>If the selected payment method requires additional authentication steps, the\nPaymentIntent will transition to the <code>requires_action</code> status and\nsuggest additional actions via <code>next_action</code>. If payment fails,\nthe PaymentIntent transitions to the <code>requires_payment_method</code> status or the\n<code>canceled</code> status if the confirmation limit is reached. If\npayment succeeds, the PaymentIntent will transition to the <code>succeeded</code>\nstatus (or <code>requires_capture</code>, if <code>capture_method</code> is set to <code>manual</code>).</p>\n\n<p>If the <code>confirmation_method</code> is <code>automatic</code>, payment may be attempted\nusing our <a href="/docs/stripe-js/reference#stripe-handle-card-payment">client SDKs</a>\nand the PaymentIntent’s <a href="#payment_intent_object-client_secret">client_secret</a>.\nAfter <code>next_action</code>s are handled by the client, no additional\nconfirmation is required to complete the payment.</p>\n\n<p>If the <code>confirmation_method</code> is <code>manual</code>, all payment attempts must be\ninitiated using a secret key.</p>\n\n<p>If any actions are required for the payment, the PaymentIntent will\nreturn to the <code>requires_confirmation</code> state\nafter those actions are completed. Your server needs to then\nexplicitly re-confirm the PaymentIntent to initiate the next payment\nattempt.</p>\n\n<p>There is a variable upper limit on how many times a PaymentIntent can be confirmed.\nAfter this limit is reached, any further calls to this endpoint will\ntransition the PaymentIntent to the <code>canceled</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntentIncrementAuthorization = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}/increment_authorization',
    summary: 'Increment an authorization',
    description:
      '<p>Perform an incremental authorization on an eligible\n<a href="/docs/api/payment_intents/object">PaymentIntent</a>. To be eligible, the\nPaymentIntent’s status must be <code>requires_capture</code> and\n<a href="/docs/api/charges/object#charge_object-payment_method_details-card_present-incremental_authorization_supported">incremental_authorization_supported</a>\nmust be <code>true</code>.</p>\n\n<p>Incremental authorizations attempt to increase the authorized amount on\nyour customer’s card to the new, higher <code>amount</code> provided. Similar to the\ninitial authorization, incremental authorizations can be declined. A\nsingle PaymentIntent can call this endpoint multiple times to further\nincrease the authorized amount.</p>\n\n<p>If the incremental authorization succeeds, the PaymentIntent object\nreturns with the updated\n<a href="/docs/api/payment_intents/object#payment_intent_object-amount">amount</a>.\nIf the incremental authorization fails, a\n<a href="/docs/error-codes#card-declined">card_declined</a> error returns, and no other\nfields on the PaymentIntent or Charge update. The PaymentIntent\nobject remains capturable for the previously authorized amount.</p>\n\n<p>Each PaymentIntent can have a maximum of 10 incremental authorization attempts, including declines.\nAfter it’s captured, a PaymentIntent can no longer be incremented.</p>\n\n<p>Learn more about incremental authorizations with\n<a href="/docs/terminal/features/incremental-authorizations">in-person payments</a> and\n<a href="/docs/payments/incremental-authorization?platform=web&ui=elements">online payments</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentIntentsIntentVerifyMicrodeposits = os
  .route({
    method: 'POST',
    path: '/v1/payment_intents/{intent}/verify_microdeposits',
    summary: 'Verify microdeposits on a PaymentIntent',
    description: '<p>Verifies microdeposits on a PaymentIntent object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentLinks = os
  .route({
    method: 'GET',
    path: '/v1/payment_links',
    summary: 'List all payment links',
    description: '<p>Returns a list of your payment links.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentLinkSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/payment_links/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentLinks = os
  .route({
    method: 'POST',
    path: '/v1/payment_links',
    summary: 'Create a payment link',
    description: '<p>Creates a payment link.</p>',
    successDescription: 'Successful response.',
  })
  .output(PaymentLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentLinksPaymentLink = os
  .route({
    method: 'GET',
    path: '/v1/payment_links/{payment_link}',
    summary: 'Retrieve payment link',
    description: '<p>Retrieve a payment link.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      payment_link: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentLinksPaymentLink = os
  .route({
    method: 'POST',
    path: '/v1/payment_links/{payment_link}',
    summary: 'Update a payment link',
    description: '<p>Updates a payment link.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payment_link: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentLinksPaymentLinkLineItems = os
  .route({
    method: 'GET',
    path: '/v1/payment_links/{payment_link}/line_items',
    summary: "Retrieve a payment link's line items",
    description:
      '<p>When retrieving a payment link, there is an includable <strong>line_items</strong> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      payment_link: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(ItemSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentMethodConfigurations = os
  .route({
    method: 'GET',
    path: '/v1/payment_method_configurations',
    summary: 'List payment method configurations',
    description: '<p>List payment method configurations</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      application: v.optional(v.union([v.pipe(v.string(), v.maxCodePoints(100)), v.literal('')])),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentMethodConfigurationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/payment_method_configurations/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodConfigurations = os
  .route({
    method: 'POST',
    path: '/v1/payment_method_configurations',
    summary: 'Create a payment method configuration',
    description: '<p>Creates a payment method configuration</p>',
    successDescription: 'Successful response.',
  })
  .output(PaymentMethodConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentMethodConfigurationsConfiguration = os
  .route({
    method: 'GET',
    path: '/v1/payment_method_configurations/{configuration}',
    summary: 'Retrieve payment method configuration',
    description: '<p>Retrieve payment method configuration</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      configuration: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentMethodConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodConfigurationsConfiguration = os
  .route({
    method: 'POST',
    path: '/v1/payment_method_configurations/{configuration}',
    summary: 'Update payment method configuration',
    description: '<p>Update payment method configuration</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentMethodConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentMethodDomains = os
  .route({
    method: 'GET',
    path: '/v1/payment_method_domains',
    summary: 'List payment method domains',
    description: '<p>Lists the details of existing payment method domains.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      domain_name: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      enabled: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentMethodDomainSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/payment_method_domains/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodDomains = os
  .route({
    method: 'POST',
    path: '/v1/payment_method_domains',
    summary: 'Create a payment method domain',
    description: '<p>Creates a payment method domain.</p>',
    successDescription: 'Successful response.',
  })
  .output(PaymentMethodDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentMethodDomainsPaymentMethodDomain = os
  .route({
    method: 'GET',
    path: '/v1/payment_method_domains/{payment_method_domain}',
    summary: 'Retrieve a payment method domain',
    description: '<p>Retrieves the details of an existing payment method domain.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      payment_method_domain: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentMethodDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodDomainsPaymentMethodDomain = os
  .route({
    method: 'POST',
    path: '/v1/payment_method_domains/{payment_method_domain}',
    summary: 'Update a payment method domain',
    description: '<p>Updates an existing payment method domain.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payment_method_domain: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentMethodDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodDomainsPaymentMethodDomainValidate = os
  .route({
    method: 'POST',
    path: '/v1/payment_method_domains/{payment_method_domain}/validate',
    summary: 'Validate an existing payment method domain',
    description:
      '<p>Some payment methods might require additional steps to register a domain. If the requirements weren’t satisfied when the domain was created, the payment method will be inactive on the domain.\nThe payment method doesn’t appear in Elements or Embedded Checkout for this domain until it is active.</p>\n\n<p>To activate a payment method on an existing payment method domain, complete the required registration steps specific to the payment method, and then validate the payment method domain with this endpoint.</p>\n\n<p>Related guides: <a href="/docs/payments/payment-methods/pmd-registration">Payment method domains</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payment_method_domain: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentMethodDomainSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentMethods = os
  .route({
    method: 'GET',
    path: '/v1/payment_methods',
    summary: 'List PaymentMethods',
    description: '<p>Returns a list of all PaymentMethods.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      allow_redisplay: v.optional(v.picklist(['always', 'limited', 'unspecified'])),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(
        v.picklist([
          'acss_debit',
          'affirm',
          'afterpay_clearpay',
          'alipay',
          'alma',
          'amazon_pay',
          'au_becs_debit',
          'bacs_debit',
          'bancontact',
          'billie',
          'bizum',
          'blik',
          'boleto',
          'card',
          'cashapp',
          'crypto',
          'custom',
          'customer_balance',
          'eps',
          'fpx',
          'giropay',
          'grabpay',
          'ideal',
          'kakao_pay',
          'klarna',
          'konbini',
          'kr_card',
          'link',
          'mb_way',
          'mobilepay',
          'multibanco',
          'naver_pay',
          'nz_bank_account',
          'oxxo',
          'p24',
          'pay_by_bank',
          'payco',
          'paynow',
          'paypal',
          'paypay',
          'payto',
          'pix',
          'promptpay',
          'revolut_pay',
          'samsung_pay',
          'satispay',
          'scalapay',
          'sepa_debit',
          'sequra',
          'sofort',
          'sunbit',
          'swish',
          'twint',
          'upi',
          'us_bank_account',
          'wechat_pay',
          'zip',
        ]),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentMethodSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/payment_methods/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethods = os
  .route({
    method: 'POST',
    path: '/v1/payment_methods',
    summary: 'Create a PaymentMethod',
    description:
      '<p>Creates a PaymentMethod object. Read the <a href="/docs/stripe-js/reference#stripe-create-payment-method">Stripe.js reference</a> to learn how to create PaymentMethods via Stripe.js.</p>\n\n<p>Instead of creating a PaymentMethod directly, we recommend using the <a href="/docs/payments/accept-a-payment">PaymentIntents</a> API to accept a payment immediately or the <a href="/docs/payments/save-and-reuse">SetupIntent</a> API to collect payment method details ahead of a future payment.</p>',
    successDescription: 'Successful response.',
  })
  .output(PaymentMethodSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentMethodsPaymentMethod = os
  .route({
    method: 'GET',
    path: '/v1/payment_methods/{payment_method}',
    summary: 'Retrieve a PaymentMethod',
    description:
      '<p>Retrieves a PaymentMethod object attached to the StripeAccount. To retrieve a payment method attached to a Customer, you should use <a href="/docs/api/payment_methods/customer">Retrieve a Customer’s PaymentMethods</a></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      payment_method: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentMethodSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodsPaymentMethod = os
  .route({
    method: 'POST',
    path: '/v1/payment_methods/{payment_method}',
    summary: 'Update a PaymentMethod',
    description:
      '<p>Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payment_method: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentMethodSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodsPaymentMethodAttach = os
  .route({
    method: 'POST',
    path: '/v1/payment_methods/{payment_method}/attach',
    summary: 'Attach a PaymentMethod to a Customer',
    description:
      '<p>Attaches a PaymentMethod object to a Customer.</p>\n\n<p>To attach a new PaymentMethod to a customer for future payments, we recommend you use a <a href="/docs/api/setup_intents">SetupIntent</a>\nor a PaymentIntent with <a href="/docs/api/payment_intents/create#create_payment_intent-setup_future_usage">setup_future_usage</a>.\nThese approaches will perform any necessary steps to set up the PaymentMethod for future payments. Using the <code>/v1/payment_methods/:id/attach</code>\nendpoint without first using a SetupIntent or PaymentIntent with <code>setup_future_usage</code> does not optimize the PaymentMethod for\nfuture use, which makes later declines and payment friction more likely.\nSee <a href="/docs/payments/payment-intents#future-usage">Optimizing cards for future payments</a> for more information about setting up\nfuture payments.</p>\n\n<p>To use this PaymentMethod as the default for invoice or subscription payments,\nset <a href="/docs/api/customers/update#update_customer-invoice_settings-default_payment_method"><code>invoice_settings.default_payment_method</code></a>,\non the Customer to the PaymentMethod’s ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payment_method: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentMethodSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentMethodsPaymentMethodDetach = os
  .route({
    method: 'POST',
    path: '/v1/payment_methods/{payment_method}/detach',
    summary: 'Detach a PaymentMethod from a Customer',
    description:
      '<p>Detaches a PaymentMethod object from a Customer. Detachment is permanent and irreversible — once detached, a PaymentMethod can no longer be used for payments or re-attached to a Customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payment_method: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentMethodSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentRecords = os
  .route({
    method: 'GET',
    path: '/v1/payment_records',
    summary: 'List Payment Records',
    description: '<p>List all the Payment Records for a given merchant.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created_after: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      created_before: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PaymentRecordSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description('A list of PaymentRecords.'),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsReportPayment = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/report_payment',
    summary: 'Report a payment',
    description:
      '<p>Report a new Payment Record. You may report a Payment Record as it is\n initialized and later report updates through the other report_* methods, or report Payment\n Records in a terminal state directly, through this method.</p>',
    successDescription: 'Successful response.',
  })
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PaymentRecordsId = os
  .route({
    method: 'GET',
    path: '/v1/payment_records/{id}',
    summary: 'Retrieve a Payment Record',
    description: '<p>Retrieves a Payment Record with the given ID</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsIdReportPaymentAttempt = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/{id}/report_payment_attempt',
    summary: 'Report a payment attempt',
    description:
      '<p>Report a new payment attempt on the specified Payment Record. A new payment\n attempt can only be specified if all other payment attempts are canceled or failed.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsIdReportPaymentAttemptCanceled = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/{id}/report_payment_attempt_canceled',
    summary: 'Report payment attempt canceled',
    description:
      '<p>Report that the most recent payment attempt on the specified Payment Record\n was canceled.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsIdReportPaymentAttemptFailed = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/{id}/report_payment_attempt_failed',
    summary: 'Report payment attempt failed',
    description:
      '<p>Report that the most recent payment attempt on the specified Payment Record\n failed or errored.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsIdReportPaymentAttemptGuaranteed = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/{id}/report_payment_attempt_guaranteed',
    summary: 'Report payment attempt guaranteed',
    description:
      '<p>Report that the most recent payment attempt on the specified Payment Record\n was guaranteed.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsIdReportPaymentAttemptInformational = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/{id}/report_payment_attempt_informational',
    summary: 'Report payment attempt informational',
    description: '<p>Report informational updates on the specified Payment Record.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PaymentRecordsIdReportRefund = os
  .route({
    method: 'POST',
    path: '/v1/payment_records/{id}/report_refund',
    summary: 'Report a refund',
    description:
      '<p>Report that the most recent payment attempt on the specified Payment Record\n was refunded.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PaymentRecordSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Payouts = os
  .route({
    method: 'GET',
    path: '/v1/payouts',
    summary: 'List all payouts',
    description:
      '<p>Returns a list of existing payouts sent to third-party bank accounts or payouts that Stripe sent to you. The payouts return in sorted order, with the most recently created payouts appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      arrival_date: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      destination: v.optional(v.string()),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PayoutSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/payouts/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Payouts = os
  .route({
    method: 'POST',
    path: '/v1/payouts',
    summary: 'Create a payout',
    description:
      '<p>To send funds to your own bank account, create a new payout object. Your <a href="#balance">Stripe balance</a> must cover the payout amount. If it doesn’t, you receive an “Insufficient Funds” error.</p>\n\n<p>If your API key is in test mode, money won’t actually be sent, though every other action occurs as if you’re in live mode.</p>\n\n<p>If you create a manual payout on a Stripe account that uses multiple payment source types, you need to specify the source type balance that the payout draws from. The <a href="/api/balances/object">balance object</a> details available and pending amounts by source type.</p>',
    successDescription: 'Successful response.',
  })
  .output(PayoutSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PayoutsPayout = os
  .route({
    method: 'GET',
    path: '/v1/payouts/{payout}',
    summary: 'Retrieve a payout',
    description:
      '<p>Retrieves the details of an existing payout. Supply the unique payout ID from either a payout creation request or the payout list. Stripe returns the corresponding payout information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      payout: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PayoutSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PayoutsPayout = os
  .route({
    method: 'POST',
    path: '/v1/payouts/{payout}',
    summary: 'Update a payout',
    description:
      '<p>Updates the specified payout by setting the values of the parameters you pass. We don’t change parameters that you don’t provide. This request only accepts the metadata as arguments.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payout: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PayoutSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PayoutsPayoutCancel = os
  .route({
    method: 'POST',
    path: '/v1/payouts/{payout}/cancel',
    summary: 'Cancel a payout',
    description:
      '<p>You can cancel a previously created payout if its status is <code>pending</code>. Stripe refunds the funds to your available balance. You can’t cancel automatic Stripe payouts.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payout: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PayoutSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PayoutsPayoutReverse = os
  .route({
    method: 'POST',
    path: '/v1/payouts/{payout}/reverse',
    summary: 'Reverse a payout',
    description:
      '<p>Reverses a payout by debiting the destination bank account. At this time, you can only reverse payouts for connected accounts to US and Canadian bank accounts. If the payout is manual and in the <code>pending</code> status, use <code>/v1/payouts/:id/cancel</code> instead.</p>\n\n<p>By requesting a reversal through <code>/v1/payouts/:id/reverse</code>, you confirm that the authorized signatory of the selected bank account authorizes the debit on the bank account and that no other authorization is required.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ payout: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PayoutSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Plans = os
  .route({
    method: 'GET',
    path: '/v1/plans',
    summary: 'List all plans',
    description: '<p>Returns a list of your plans.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      product: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(PlanSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/plans/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Plans = os
  .route({
    method: 'POST',
    path: '/v1/plans',
    summary: 'Create a plan',
    description:
      '<p>You can now model subscriptions more flexibly using the <a href="#prices">Prices API</a>. It replaces the Plans API and is backwards compatible to simplify your migration.</p>',
    successDescription: 'Successful response.',
  })
  .output(PlanSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PlansPlan = os
  .route({
    method: 'GET',
    path: '/v1/plans/{plan}',
    summary: 'Retrieve a plan',
    description: '<p>Retrieves the plan with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      plan: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PlanSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PlansPlan = os
  .route({
    method: 'POST',
    path: '/v1/plans/{plan}',
    summary: 'Update a plan',
    description:
      '<p>Updates the specified plan by setting the values of the parameters passed. Any parameters not provided are left unchanged. By design, you cannot change a plan’s ID, amount, currency, or billing cycle.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ plan: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PlanSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1PlansPlan = os
  .route({
    method: 'DELETE',
    path: '/v1/plans/{plan}',
    summary: 'Delete a plan',
    description:
      '<p>Deleting plans means new subscribers can’t be added. Existing subscribers aren’t affected.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ plan: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedPlanSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Prices = os
  .route({
    method: 'GET',
    path: '/v1/prices',
    summary: 'List all prices',
    description:
      '<p>Returns a list of your active prices, excluding <a href="/docs/products-prices/pricing-models#inline-pricing">inline prices</a>. For the list of inactive prices, set <code>active</code> to false.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      currency: v.optional(v.string()),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      lookup_keys: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      product: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      recurring: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              interval: v.picklist(['day', 'month', 'week', 'year']),
              meter: v.pipe(v.string(), v.maxCodePoints(5000)),
              usage_type: v.picklist(['licensed', 'metered']),
            }),
          ),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.optional(v.picklist(['one_time', 'recurring'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(PriceSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/prices/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Prices = os
  .route({
    method: 'POST',
    path: '/v1/prices',
    summary: 'Create a price',
    description:
      '<p>Creates a new <a href="https://docs.stripe.com/api/prices">Price</a> for an existing <a href="https://docs.stripe.com/api/products">Product</a>. The Price can be recurring or one-time.</p>',
    successDescription: 'Successful response.',
  })
  .output(PriceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PricesSearch = os
  .route({
    method: 'GET',
    path: '/v1/prices/search',
    summary: 'Search prices',
    description:
      '<p>Search for prices you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PriceSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PricesPrice = os
  .route({
    method: 'GET',
    path: '/v1/prices/{price}',
    summary: 'Retrieve a price',
    description: '<p>Retrieves the price with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      price: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PriceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PricesPrice = os
  .route({
    method: 'POST',
    path: '/v1/prices/{price}',
    summary: 'Update a price',
    description:
      '<p>Updates the specified price by setting the values of the parameters passed. Any parameters not provided are left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ price: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PriceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ProductCatalogTrialOffers = os
  .route({
    method: 'GET',
    path: '/v1/product_catalog/trial_offers',
    summary: 'List trial offers',
    description: '<p>Returns a list of trial offers.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      prices: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(ProductCatalogTrialOfferSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ProductCatalogTrialOffers = os
  .route({
    method: 'POST',
    path: '/v1/product_catalog/trial_offers',
    summary: 'Create a trial offer',
    description: '<p>Creates a trial offer.</p>',
    successDescription: 'Successful response.',
  })
  .output(ProductCatalogTrialOfferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ProductCatalogTrialOffersId = os
  .route({
    method: 'GET',
    path: '/v1/product_catalog/trial_offers/{id}',
    summary: 'Retrieve a trial offer',
    description: '<p>Retrieves the trial offer with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ProductCatalogTrialOfferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ProductCatalogTrialOffersId = os
  .route({
    method: 'POST',
    path: '/v1/product_catalog/trial_offers/{id}',
    summary: 'Update a trial offer',
    description:
      '<p>Updates the specified trial offer by setting the values of the parameters passed. Any parameters not provided are left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ProductCatalogTrialOfferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Products = os
  .route({
    method: 'GET',
    path: '/v1/products',
    summary: 'List all products',
    description:
      '<p>Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      shippable: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      url: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(ProductSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/products/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Products = os
  .route({
    method: 'POST',
    path: '/v1/products',
    summary: 'Create a product',
    description: '<p>Creates a new product object.</p>',
    successDescription: 'Successful response.',
  })
  .output(ProductSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ProductsSearch = os
  .route({
    method: 'GET',
    path: '/v1/products/search',
    summary: 'Search products',
    description:
      '<p>Search for products you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ProductSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ProductsId = os
  .route({
    method: 'GET',
    path: '/v1/products/{id}',
    summary: 'Retrieve a product',
    description:
      '<p>Retrieves the details of an existing product. Supply the unique product ID from either a product creation request or the product list, and Stripe will return the corresponding product information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ProductSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ProductsId = os
  .route({
    method: 'POST',
    path: '/v1/products/{id}',
    summary: 'Update a product',
    description:
      '<p>Updates the specific product by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ProductSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1ProductsId = os
  .route({
    method: 'DELETE',
    path: '/v1/products/{id}',
    summary: 'Delete a product',
    description:
      '<p>Delete a product. Deleting a product is only possible if it has no prices associated with it. Additionally, deleting a product with <code>type=good</code> is only possible if it has no SKUs associated with it.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedProductSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ProductsProductFeatures = os
  .route({
    method: 'GET',
    path: '/v1/products/{product}/features',
    summary: 'List all features attached to a product',
    description: '<p>Retrieve a list of features for a product</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      product: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ProductFeatureSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ProductsProductFeatures = os
  .route({
    method: 'POST',
    path: '/v1/products/{product}/features',
    summary: 'Attach a feature to a product',
    description:
      '<p>Creates a product_feature, which represents a feature attachment to a product</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ product: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ProductFeatureSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ProductsProductFeaturesId = os
  .route({
    method: 'GET',
    path: '/v1/products/{product}/features/{id}',
    summary: 'Retrieve a product_feature',
    description:
      '<p>Retrieves a product_feature, which represents a feature attachment to a product</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      product: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ProductFeatureSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1ProductsProductFeaturesId = os
  .route({
    method: 'DELETE',
    path: '/v1/products/{product}/features/{id}',
    summary: 'Remove a feature from a product',
    description: '<p>Deletes the feature attachment to a product</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      product: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(DeletedProductFeatureSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PromotionCodes = os
  .route({
    method: 'GET',
    path: '/v1/promotion_codes',
    summary: 'List all promotion codes',
    description: '<p>Returns a list of your promotion codes.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      code: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      coupon: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(PromotionCodeSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/promotion_codes/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PromotionCodes = os
  .route({
    method: 'POST',
    path: '/v1/promotion_codes',
    summary: 'Create a promotion code',
    description:
      '<p>A promotion code points to an underlying promotion. You can optionally restrict the code to a specific customer, redemption limit, and expiration date.</p>',
    successDescription: 'Successful response.',
  })
  .output(PromotionCodeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1PromotionCodesPromotionCode = os
  .route({
    method: 'GET',
    path: '/v1/promotion_codes/{promotion_code}',
    summary: 'Retrieve a promotion code',
    description:
      '<p>Retrieves the promotion code with the given ID. In order to retrieve a promotion code by the customer-facing <code>code</code> use <a href="/docs/api/promotion_codes/list">list</a> with the desired <code>code</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      promotion_code: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(PromotionCodeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1PromotionCodesPromotionCode = os
  .route({
    method: 'POST',
    path: '/v1/promotion_codes/{promotion_code}',
    summary: 'Update a promotion code',
    description:
      '<p>Updates the specified promotion code by setting the values of the parameters passed. Most fields are, by design, not editable.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ promotion_code: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(PromotionCodeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Quotes = os
  .route({
    method: 'GET',
    path: '/v1/quotes',
    summary: 'List all quotes',
    description: '<p>Returns a list of your quotes.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['accepted', 'canceled', 'draft', 'open'])),
      test_clock: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(QuoteSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/quotes/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Quotes = os
  .route({
    method: 'POST',
    path: '/v1/quotes',
    summary: 'Create a quote',
    description:
      '<p>A quote models prices and services for a customer. Default options for <code>header</code>, <code>description</code>, <code>footer</code>, and <code>expires_at</code> can be set in the dashboard via the <a href="https://dashboard.stripe.com/settings/billing/quote">quote template</a>.</p>',
    successDescription: 'Successful response.',
  })
  .output(QuoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1QuotesQuote = os
  .route({
    method: 'GET',
    path: '/v1/quotes/{quote}',
    summary: 'Retrieve a quote',
    description: '<p>Retrieves the quote with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      quote: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(QuoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1QuotesQuote = os
  .route({
    method: 'POST',
    path: '/v1/quotes/{quote}',
    summary: 'Update a quote',
    description: '<p>A quote models prices and services for a customer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(QuoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1QuotesQuoteAccept = os
  .route({
    method: 'POST',
    path: '/v1/quotes/{quote}/accept',
    summary: 'Accept a quote',
    description: '<p>Accepts the specified quote.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(QuoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1QuotesQuoteCancel = os
  .route({
    method: 'POST',
    path: '/v1/quotes/{quote}/cancel',
    summary: 'Cancel a quote',
    description: '<p>Cancels the quote.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(QuoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1QuotesQuoteComputedUpfrontLineItems = os
  .route({
    method: 'GET',
    path: '/v1/quotes/{quote}/computed_upfront_line_items',
    summary: "Retrieve a quote's upfront line items",
    description:
      '<p>When retrieving a quote, there is an includable <a href="https://stripe.com/docs/api/quotes/object#quote_object-computed-upfront-line_items"><strong>computed.upfront.line_items</strong></a> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of upfront line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      quote: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(ItemSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1QuotesQuoteFinalize = os
  .route({
    method: 'POST',
    path: '/v1/quotes/{quote}/finalize',
    summary: 'Finalize a quote',
    description: '<p>Finalizes the quote.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(QuoteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1QuotesQuoteLineItems = os
  .route({
    method: 'GET',
    path: '/v1/quotes/{quote}/line_items',
    summary: "Retrieve a quote's line items",
    description:
      '<p>When retrieving a quote, there is an includable <strong>line_items</strong> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      quote: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(ItemSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1QuotesQuotePdf = os
  .route({
    method: 'GET',
    path: '/v1/quotes/{quote}/pdf',
    summary: 'Download quote PDF',
    description:
      '<p>Download the PDF for a finalized quote. Explanation for special handling can be found <a href="https://docs.stripe.com/quotes/overview#quote_pdf">here</a></p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      quote: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RadarEarlyFraudWarnings = os
  .route({
    method: 'GET',
    path: '/v1/radar/early_fraud_warnings',
    summary: 'List all early fraud warnings',
    description: '<p>Returns a list of early fraud warnings.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.optional(v.string()),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(RadarEarlyFraudWarningSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/radar\/early_fraud_warnings/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RadarEarlyFraudWarningsEarlyFraudWarning = os
  .route({
    method: 'GET',
    path: '/v1/radar/early_fraud_warnings/{early_fraud_warning}',
    summary: 'Retrieve an early fraud warning',
    description:
      '<p>Retrieves the details of an early fraud warning that has previously been created. </p>\n\n<p>Please refer to the <a href="#early_fraud_warning_object">early fraud warning</a> object reference for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      early_fraud_warning: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(RadarEarlyFraudWarningSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1RadarPaymentEvaluations = os
  .route({
    method: 'POST',
    path: '/v1/radar/payment_evaluations',
    summary: 'Create a Payment Evaluation',
    description:
      '<p>Request a Radar API fraud risk score from Stripe for a payment before sending it for external processor authorization.</p>',
    successDescription: 'Successful response.',
  })
  .output(RadarPaymentEvaluationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RadarValueListItems = os
  .route({
    method: 'GET',
    path: '/v1/radar/value_list_items',
    summary: 'List all value list items',
    description:
      '<p>Returns a list of <code>ValueListItem</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      value: v.optional(v.pipe(v.string(), v.maxCodePoints(800))),
      value_list: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(RadarValueListItemSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/radar\/value_list_items/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1RadarValueListItems = os
  .route({
    method: 'POST',
    path: '/v1/radar/value_list_items',
    summary: 'Create a value list item',
    description:
      '<p>Creates a new <code>ValueListItem</code> object, which is added to the specified parent value list.</p>',
    successDescription: 'Successful response.',
  })
  .output(RadarValueListItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RadarValueListItemsItem = os
  .route({
    method: 'GET',
    path: '/v1/radar/value_list_items/{item}',
    summary: 'Retrieve a value list item',
    description: '<p>Retrieves a <code>ValueListItem</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      item: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(RadarValueListItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1RadarValueListItemsItem = os
  .route({
    method: 'DELETE',
    path: '/v1/radar/value_list_items/{item}',
    summary: 'Delete a value list item',
    description:
      '<p>Deletes a <code>ValueListItem</code> object, removing it from its parent value list.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ item: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedRadarValueListItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RadarValueLists = os
  .route({
    method: 'GET',
    path: '/v1/radar/value_lists',
    summary: 'List all value lists',
    description:
      '<p>Returns a list of <code>ValueList</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      alias: v.optional(v.pipe(v.string(), v.maxCodePoints(100))),
      contains: v.optional(v.pipe(v.string(), v.maxCodePoints(800))),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(RadarValueListSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/radar\/value_lists/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1RadarValueLists = os
  .route({
    method: 'POST',
    path: '/v1/radar/value_lists',
    summary: 'Create a value list',
    description:
      '<p>Creates a new <code>ValueList</code> object, which can then be referenced in rules.</p>',
    successDescription: 'Successful response.',
  })
  .output(RadarValueListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RadarValueListsValueList = os
  .route({
    method: 'GET',
    path: '/v1/radar/value_lists/{value_list}',
    summary: 'Retrieve a value list',
    description: '<p>Retrieves a <code>ValueList</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      value_list: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(RadarValueListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1RadarValueListsValueList = os
  .route({
    method: 'POST',
    path: '/v1/radar/value_lists/{value_list}',
    summary: 'Update a value list',
    description:
      '<p>Updates a <code>ValueList</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Note that <code>item_type</code> is immutable.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ value_list: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(RadarValueListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1RadarValueListsValueList = os
  .route({
    method: 'DELETE',
    path: '/v1/radar/value_lists/{value_list}',
    summary: 'Delete a value list',
    description:
      '<p>Deletes a <code>ValueList</code> object, also deleting any items contained within the value list. To be deleted, a value list must not be referenced in any rules.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ value_list: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedRadarValueListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Refunds = os
  .route({
    method: 'GET',
    path: '/v1/refunds',
    summary: 'List all refunds',
    description:
      '<p>Returns a list of all refunds you created. We return the refunds in sorted order, with the most recent refunds appearing first. The 10 most recent refunds are always available by default on the Charge object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      charge: v.optional(v.string()),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(RefundSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/refunds/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Refunds = os
  .route({
    method: 'POST',
    path: '/v1/refunds',
    summary: 'Create a refund',
    description:
      '<p>When you create a new refund, you must specify a Charge or a PaymentIntent object on which to create it.</p>\n\n<p>Creating a new refund will refund a charge that has previously been created but not yet refunded.\nFunds will be refunded to the credit or debit card that was originally charged.</p>\n\n<p>You can optionally refund only part of a charge.\nYou can do so multiple times, until the entire charge has been refunded.</p>\n\n<p>Once entirely refunded, a charge can’t be refunded again.\nThis method will raise an error when called on an already-refunded charge,\nor when trying to refund more money than is left on a charge.</p>',
    successDescription: 'Successful response.',
  })
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1RefundsRefund = os
  .route({
    method: 'GET',
    path: '/v1/refunds/{refund}',
    summary: 'Retrieve a refund',
    description: '<p>Retrieves the details of an existing refund.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      refund: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1RefundsRefund = os
  .route({
    method: 'POST',
    path: '/v1/refunds/{refund}',
    summary: 'Update a refund',
    description:
      '<p>Updates the refund that you specify by setting the values of the passed parameters. Any parameters that you don’t provide remain unchanged.</p>\n\n<p>This request only accepts <code>metadata</code> as an argument.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ refund: v.string() }))
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1RefundsRefundCancel = os
  .route({
    method: 'POST',
    path: '/v1/refunds/{refund}/cancel',
    summary: 'Cancel a refund',
    description:
      '<p>Cancels a refund with a status of <code>requires_action</code>.</p>\n\n<p>You can’t cancel refunds in other states. Only refunds for payment methods that require customer action can enter the <code>requires_action</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ refund: v.string() }))
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ReportingReportRuns = os
  .route({
    method: 'GET',
    path: '/v1/reporting/report_runs',
    summary: 'List all Report Runs',
    description: '<p>Returns a list of Report Runs, with the most recent appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ReportingReportRunSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/reporting\/report_runs/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ReportingReportRuns = os
  .route({
    method: 'POST',
    path: '/v1/reporting/report_runs',
    summary: 'Create a Report Run',
    description:
      '<p>Creates a new object and begin running the report. (Certain report types require a <a href="https://stripe.com/docs/keys#test-live-modes">live-mode API key</a>.)</p>',
    successDescription: 'Successful response.',
  })
  .output(ReportingReportRunSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ReportingReportRunsReportRun = os
  .route({
    method: 'GET',
    path: '/v1/reporting/report_runs/{report_run}',
    summary: 'Retrieve a Report Run',
    description: '<p>Retrieves the details of an existing Report Run.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      report_run: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ReportingReportRunSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ReportingReportTypes = os
  .route({
    method: 'GET',
    path: '/v1/reporting/report_types',
    summary: 'List all Report Types',
    description: '<p>Returns a full list of Report Types.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ReportingReportTypeSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ReportingReportTypesReportType = os
  .route({
    method: 'GET',
    path: '/v1/reporting/report_types/{report_type}',
    summary: 'Retrieve a Report Type',
    description:
      '<p>Retrieves the details of a Report Type. (Certain report types require a <a href="https://stripe.com/docs/keys#test-live-modes">live-mode API key</a>.)</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      report_type: v.string(),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ReportingReportTypeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Reviews = os
  .route({
    method: 'GET',
    path: '/v1/reviews',
    summary: 'List all open reviews',
    description:
      '<p>Returns a list of <code>Review</code> objects that have <code>open</code> set to <code>true</code>. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ReviewSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ReviewsReview = os
  .route({
    method: 'GET',
    path: '/v1/reviews/{review}',
    summary: 'Retrieve a review',
    description: '<p>Retrieves a <code>Review</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      review: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ReviewSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ReviewsReviewApprove = os
  .route({
    method: 'POST',
    path: '/v1/reviews/{review}/approve',
    summary: 'Approve a review',
    description:
      '<p>Approves a <code>Review</code> object, closing it and removing it from the list of reviews.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ review: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ReviewSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SetupAttempts = os
  .route({
    method: 'GET',
    path: '/v1/setup_attempts',
    summary: 'List all SetupAttempts',
    description:
      '<p>Returns a list of SetupAttempts that associate with a provided SetupIntent.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      setup_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SetupAttemptSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/setup_attempts/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SetupIntents = os
  .route({
    method: 'GET',
    path: '/v1/setup_intents',
    summary: 'List all SetupIntents',
    description: '<p>Returns a list of SetupIntents.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      attach_to_self: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      payment_method: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SetupIntentSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/setup_intents/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SetupIntents = os
  .route({
    method: 'POST',
    path: '/v1/setup_intents',
    summary: 'Create a SetupIntent',
    description:
      '<p>Creates a SetupIntent object.</p>\n\n<p>After you create the SetupIntent, attach a payment method and <a href="/docs/api/setup_intents/confirm">confirm</a>\nit to collect any required permissions to charge the payment method later.</p>',
    successDescription: 'Successful response.',
  })
  .output(SetupIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SetupIntentsIntent = os
  .route({
    method: 'GET',
    path: '/v1/setup_intents/{intent}',
    summary: 'Retrieve a SetupIntent',
    description:
      '<p>Retrieves the details of a SetupIntent that has previously been created. </p>\n\n<p>Client-side retrieval using a publishable key is allowed when the <code>client_secret</code> is provided in the query string. </p>\n\n<p>When retrieved with a publishable key, only a subset of properties will be returned. Please refer to the <a href="#setup_intent_object">SetupIntent</a> object reference for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      client_secret: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SetupIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SetupIntentsIntent = os
  .route({
    method: 'POST',
    path: '/v1/setup_intents/{intent}',
    summary: 'Update a SetupIntent',
    description: '<p>Updates a SetupIntent object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SetupIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SetupIntentsIntentCancel = os
  .route({
    method: 'POST',
    path: '/v1/setup_intents/{intent}/cancel',
    summary: 'Cancel a SetupIntent',
    description:
      '<p>You can cancel a SetupIntent object when it’s in one of these statuses: <code>requires_payment_method</code>, <code>requires_confirmation</code>, or <code>requires_action</code>. </p>\n\n<p>After you cancel it, setup is abandoned and any operations on the SetupIntent fail with an error. You can’t cancel the SetupIntent for a Checkout Session. <a href="/docs/api/checkout/sessions/expire">Expire the Checkout Session</a> instead.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SetupIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SetupIntentsIntentConfirm = os
  .route({
    method: 'POST',
    path: '/v1/setup_intents/{intent}/confirm',
    summary: 'Confirm a SetupIntent',
    description:
      '<p>Confirm that your customer intends to set up the current or\nprovided payment method. For example, you would confirm a SetupIntent\nwhen a customer hits the “Save” button on a payment method management\npage on your website.</p>\n\n<p>If the selected payment method does not require any additional\nsteps from the customer, the SetupIntent will transition to the\n<code>succeeded</code> status.</p>\n\n<p>Otherwise, it will transition to the <code>requires_action</code> status and\nsuggest additional actions via <code>next_action</code>. If setup fails,\nthe SetupIntent will transition to the\n<code>requires_payment_method</code> status or the <code>canceled</code> status if the\nconfirmation limit is reached.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SetupIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SetupIntentsIntentVerifyMicrodeposits = os
  .route({
    method: 'POST',
    path: '/v1/setup_intents/{intent}/verify_microdeposits',
    summary: 'Verify microdeposits on a SetupIntent',
    description: '<p>Verifies microdeposits on a SetupIntent object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SetupIntentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ShippingRates = os
  .route({
    method: 'GET',
    path: '/v1/shipping_rates',
    summary: 'List all shipping rates',
    description: '<p>Returns a list of your shipping rates.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      currency: v.optional(v.string()),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ShippingRateSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/shipping_rates/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ShippingRates = os
  .route({
    method: 'POST',
    path: '/v1/shipping_rates',
    summary: 'Create a shipping rate',
    description: '<p>Creates a new shipping rate object.</p>',
    successDescription: 'Successful response.',
  })
  .output(ShippingRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ShippingRatesShippingRateToken = os
  .route({
    method: 'GET',
    path: '/v1/shipping_rates/{shipping_rate_token}',
    summary: 'Retrieve a shipping rate',
    description: '<p>Returns the shipping rate object with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      shipping_rate_token: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ShippingRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ShippingRatesShippingRateToken = os
  .route({
    method: 'POST',
    path: '/v1/shipping_rates/{shipping_rate_token}',
    summary: 'Update a shipping rate',
    description: '<p>Updates an existing shipping rate object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ shipping_rate_token: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ShippingRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SigmaSavedQueriesId = os
  .route({
    method: 'POST',
    path: '/v1/sigma/saved_queries/{id}',
    summary: 'Update an existing Sigma Query',
    description: '<p>Update an existing Sigma query that previously exists</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SigmaSigmaApiQuerySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SigmaScheduledQueryRuns = os
  .route({
    method: 'GET',
    path: '/v1/sigma/scheduled_query_runs',
    summary: 'List all scheduled query runs',
    description: '<p>Returns a list of scheduled query runs.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ScheduledQueryRunSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/sigma\/scheduled_query_runs/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SigmaScheduledQueryRunsScheduledQueryRun = os
  .route({
    method: 'GET',
    path: '/v1/sigma/scheduled_query_runs/{scheduled_query_run}',
    summary: 'Retrieve a scheduled query run',
    description: '<p>Retrieves the details of a scheduled query run.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      scheduled_query_run: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ScheduledQueryRunSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Sources = os
  .route({
    method: 'POST',
    path: '/v1/sources',
    summary: 'Create a source',
    description: '<p>Creates a new source object.</p>',
    successDescription: 'Successful response.',
  })
  .output(SourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SourcesSource = os
  .route({
    method: 'GET',
    path: '/v1/sources/{source}',
    summary: 'Retrieve a source',
    description:
      '<p>Retrieves an existing source object. Supply the unique source ID from a source creation request and Stripe will return the corresponding up-to-date source object information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      source: v.pipe(v.string(), v.maxCodePoints(5000)),
      client_secret: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SourcesSource = os
  .route({
    method: 'POST',
    path: '/v1/sources/{source}',
    summary: 'Update a source',
    description:
      '<p>Updates the specified source by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>\n\n<p>This request accepts the <code>metadata</code> and <code>owner</code> as arguments. It is also possible to update type specific information for selected payment methods. Please refer to our <a href="/docs/sources">payment method guides</a> for more detail.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ source: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SourcesSourceMandateNotificationsMandateNotification = os
  .route({
    method: 'GET',
    path: '/v1/sources/{source}/mandate_notifications/{mandate_notification}',
    summary: 'Retrieve a Source MandateNotification',
    description: '<p>Retrieves a new Source MandateNotification.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      mandate_notification: v.pipe(v.string(), v.maxCodePoints(5000)),
      source: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SourceMandateNotificationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SourcesSourceSourceTransactions = os
  .route({
    method: 'GET',
    path: '/v1/sources/{source}/source_transactions',
    description: '<p>List source transactions for a given source.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      source: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SourceTransactionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SourcesSourceSourceTransactionsSourceTransaction = os
  .route({
    method: 'GET',
    path: '/v1/sources/{source}/source_transactions/{source_transaction}',
    summary: 'Retrieve a source transaction',
    description:
      '<p>Retrieve an existing source transaction object. Supply the unique source ID from a source creation request and the source transaction ID and Stripe will return the corresponding up-to-date source object information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      source: v.pipe(v.string(), v.maxCodePoints(5000)),
      source_transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SourceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SourcesSourceVerify = os
  .route({
    method: 'POST',
    path: '/v1/sources/{source}/verify',
    description: '<p>Verify a given source.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ source: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SubscriptionItems = os
  .route({
    method: 'GET',
    path: '/v1/subscription_items',
    summary: 'List all subscription items',
    description: '<p>Returns a list of your subscription items for a given subscription.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
      subscription: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SubscriptionItemSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/subscription_items/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionItems = os
  .route({
    method: 'POST',
    path: '/v1/subscription_items',
    summary: 'Create a subscription item',
    description:
      '<p>Adds a new item to an existing subscription. No existing items will be changed or replaced.</p>',
    successDescription: 'Successful response.',
  })
  .output(SubscriptionItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SubscriptionItemsItem = os
  .route({
    method: 'GET',
    path: '/v1/subscription_items/{item}',
    summary: 'Retrieve a subscription item',
    description: '<p>Retrieves the subscription item with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      item: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SubscriptionItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionItemsItem = os
  .route({
    method: 'POST',
    path: '/v1/subscription_items/{item}',
    summary: 'Update a subscription item',
    description: '<p>Updates the plan or quantity of an item on a current subscription.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ item: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1SubscriptionItemsItem = os
  .route({
    method: 'DELETE',
    path: '/v1/subscription_items/{item}',
    summary: 'Delete a subscription item',
    description:
      '<p>Deletes an item from the subscription. Removing a subscription item from a subscription will not cancel the subscription.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ item: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedSubscriptionItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SubscriptionSchedules = os
  .route({
    method: 'GET',
    path: '/v1/subscription_schedules',
    summary: 'List all schedules',
    description: '<p>Retrieves the list of your subscription schedules.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      canceled_at: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      completed_at: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      released_at: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      scheduled: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SubscriptionScheduleSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/subscription_schedules/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionSchedules = os
  .route({
    method: 'POST',
    path: '/v1/subscription_schedules',
    summary: 'Create a schedule',
    description:
      '<p>Creates a new subscription schedule object. Each customer can have up to 500 active or scheduled subscriptions.</p>',
    successDescription: 'Successful response.',
  })
  .output(SubscriptionScheduleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SubscriptionSchedulesSchedule = os
  .route({
    method: 'GET',
    path: '/v1/subscription_schedules/{schedule}',
    summary: 'Retrieve a schedule',
    description:
      '<p>Retrieves the details of an existing subscription schedule. You only need to supply the unique subscription schedule identifier that was returned upon subscription schedule creation.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      schedule: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SubscriptionScheduleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionSchedulesSchedule = os
  .route({
    method: 'POST',
    path: '/v1/subscription_schedules/{schedule}',
    summary: 'Update a schedule',
    description: '<p>Updates an existing subscription schedule.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ schedule: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionScheduleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionSchedulesScheduleCancel = os
  .route({
    method: 'POST',
    path: '/v1/subscription_schedules/{schedule}/cancel',
    summary: 'Cancel a schedule',
    description:
      '<p>Cancels a subscription schedule and its associated subscription immediately (if the subscription schedule has an active subscription). A subscription schedule can only be canceled if its status is <code>not_started</code> or <code>active</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ schedule: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionScheduleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionSchedulesScheduleRelease = os
  .route({
    method: 'POST',
    path: '/v1/subscription_schedules/{schedule}/release',
    summary: 'Release a schedule',
    description:
      '<p>Releases the subscription schedule immediately, which will stop scheduling of its phases, but leave any existing subscription in place. A schedule can only be released if its status is <code>not_started</code> or <code>active</code>. If the subscription schedule is currently associated with a subscription, releasing it will remove its <code>subscription</code> property and set the subscription’s ID to the <code>released_subscription</code> property.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ schedule: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionScheduleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Subscriptions = os
  .route({
    method: 'GET',
    path: '/v1/subscriptions',
    summary: 'List subscriptions',
    description:
      '<p>By default, returns a list of subscriptions that have not been canceled. In order to list canceled subscriptions, specify <code>status=canceled</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      automatic_tax: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.object({
            enabled: v.pipe(
              v.string(),
              v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
              v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
            ),
          }),
        ),
      ),
      collection_method: v.optional(v.picklist(['charge_automatically', 'send_invoice'])),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      current_period_end: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      current_period_start: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      price: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(
        v.picklist([
          'active',
          'all',
          'canceled',
          'ended',
          'incomplete',
          'incomplete_expired',
          'past_due',
          'paused',
          'trialing',
          'unpaid',
        ]),
      ),
      test_clock: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SubscriptionSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/subscriptions/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Subscriptions = os
  .route({
    method: 'POST',
    path: '/v1/subscriptions',
    summary: 'Create a subscription',
    description:
      '<p>Creates a new subscription on an existing customer. Each customer can have up to 500 active or scheduled subscriptions.</p>\n\n<p>When you create a subscription with <code>collection_method=charge_automatically</code>, the first invoice is finalized as part of the request.\nThe <code>payment_behavior</code> parameter determines the exact behavior of the initial payment.</p>\n\n<p>To start subscriptions where the first invoice always begins in a <code>draft</code> status, use <a href="/docs/billing/subscriptions/subscription-schedules#managing">subscription schedules</a> instead.\nSchedules provide the flexibility to model more complex billing configurations that change over time.</p>',
    successDescription: 'Successful response.',
  })
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SubscriptionsSearch = os
  .route({
    method: 'GET',
    path: '/v1/subscriptions/search',
    summary: 'Search subscriptions',
    description:
      '<p>Search for subscriptions you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.\nDon’t use search in read-after-write flows where strict consistency is necessary. Under normal operating\nconditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up\nto an hour behind during outages. Search functionality is not available to merchants in India.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      page: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      query: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(SubscriptionSchema),
        has_more: v.boolean(),
        next_page: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(5000)))),
        object: v.pipe(
          v.literal('search_result'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value.",
          ),
        ),
        total_count: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The total number of objects that match the query, only accurate up to 10,000.',
            ),
          ),
        ),
        url: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1SubscriptionsSubscriptionExposedId = os
  .route({
    method: 'GET',
    path: '/v1/subscriptions/{subscription_exposed_id}',
    summary: 'Retrieve a subscription',
    description: '<p>Retrieves the subscription with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionsSubscriptionExposedId = os
  .route({
    method: 'POST',
    path: '/v1/subscriptions/{subscription_exposed_id}',
    summary: 'Update a subscription',
    description:
      '<p>Updates an existing subscription to match the specified parameters.\nWhen changing prices or quantities, we optionally prorate the price we charge next month to make up for any price changes.\nTo preview how the proration is calculated, use the <a href="/docs/api/invoices/create_preview">create preview</a> endpoint.</p>\n\n<p>By default, we prorate subscription changes. For example, if a customer signs up on May 1 for a <currency>100</currency> price, they’ll be billed <currency>100</currency> immediately. If on May 15 they switch to a <currency>200</currency> price, then on June 1 they’ll be billed <currency>250</currency> (<currency>200</currency> for a renewal of her subscription, plus a <currency>50</currency> prorating adjustment for half of the previous month’s <currency>100</currency> difference). Similarly, a downgrade generates a credit that is applied to the next invoice. We also prorate when you make quantity changes. You can also <a href="/billing/scripts/stripe-authored/proration">use scripts to prorate your billing</a>. To learn more, see <a href="/billing/subscriptions/prorations">Prorations</a>.</p>\n\n<p>Switching prices does not normally change the billing date or generate an immediate charge unless:</p>\n\n<ul>\n<li>The billing interval is changed (for example, from monthly to yearly).</li>\n<li>The subscription moves from free to paid.</li>\n<li>A trial starts or ends.</li>\n</ul>\n\n<p>In these cases, we apply a credit for the unused time on the previous price, immediately charge the customer using the new price, and reset the billing date. Learn about how <a href="/docs/billing/subscriptions/upgrade-downgrade#immediate-payment">Stripe immediately attempts payment for subscription changes</a>.</p>\n\n<p>If you want to charge for an upgrade immediately, pass <code>proration_behavior</code> as <code>always_invoice</code> to create prorations, automatically invoice the customer for those proration adjustments, and attempt to collect payment. If you pass <code>create_prorations</code>, the prorations are created but not automatically invoiced. If you want to bill the customer for the prorations before the subscription’s renewal date, you need to manually <a href="/docs/api/invoices/create">invoice the customer</a>.</p>\n\n<p>If you don’t want to prorate, set the <code>proration_behavior</code> option to <code>none</code>. With this option, the customer is billed <currency>100</currency> on May 1 and <currency>200</currency> on June 1. Similarly, if you set <code>proration_behavior</code> to <code>none</code> when switching between different billing intervals (for example, from monthly to yearly), we don’t generate any credits for the old subscription’s unused time. We still reset the billing date and bill immediately for the new subscription.</p>\n\n<p>Updating the quantity on a subscription many times in an hour may result in <a href="/docs/rate-limits">rate limiting</a>. If you need to bill for a frequently changing quantity, consider integrating <a href="/docs/billing/subscriptions/usage-based">usage-based billing</a> instead.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1SubscriptionsSubscriptionExposedId = os
  .route({
    method: 'DELETE',
    path: '/v1/subscriptions/{subscription_exposed_id}',
    summary: 'Cancel a subscription',
    description:
      '<p>Cancels a customer’s subscription immediately. The customer won’t be charged again for the subscription. After it’s canceled, the subscription is largely immutable. You can still update its <a href="/metadata">metadata</a> and <code>cancellation_details</code>.</p>\n\n<p>Any pending invoice items that you’ve created are still charged at the end of the period, unless manually <a href="/api/invoiceitems/delete">deleted</a>. If you’ve set the subscription to cancel at the end of the period, any pending prorations are also left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations are removed if <code>invoice_now</code> and <code>prorate</code> are both set to false.</p>\n\n<p>By default, upon subscription cancellation, Stripe stops automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1SubscriptionsSubscriptionExposedIdDiscount = os
  .route({
    method: 'DELETE',
    path: '/v1/subscriptions/{subscription_exposed_id}/discount',
    summary: 'Delete a subscription discount',
    description: '<p>Removes the currently applied discount on a subscription.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedDiscountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionsSubscriptionMigrate = os
  .route({
    method: 'POST',
    path: '/v1/subscriptions/{subscription}/migrate',
    summary: 'Migrate a subscription',
    description: '<p>Upgrade the billing_mode of an existing subscription.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ subscription: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionsSubscriptionPause = os
  .route({
    method: 'POST',
    path: '/v1/subscriptions/{subscription}/pause',
    summary: 'Pause a subscription',
    description:
      '<p>Pauses a subscription by transitioning it to the paused status. A paused subscription does not generate invoices and will not advance to new billing periods. The subscription can be resumed later using the resume endpoint. Cannot pause subscriptions with attached schedules.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ subscription: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1SubscriptionsSubscriptionResume = os
  .route({
    method: 'POST',
    path: '/v1/subscriptions/{subscription}/resume',
    summary: 'Resume a subscription',
    description:
      '<p>Initiates resumption of a paused subscription, optionally resetting the billing cycle anchor and creating prorations. Resume is only available for subscriptions that use <code>charge_automatically</code> collection. If Stripe doesn’t generate a resumption invoice, the subscription becomes <code>active</code> immediately. When a resumption invoice is generated, Stripe finalizes it immediately. If the invoice is paid or marked uncollectible, the subscription becomes <code>active</code>. If the invoice is manually voided, the subscription stays <code>paused</code>. If there is no payment attempt within 23 hours, Stripe voids the invoice and the subscription stays <code>paused</code>. Learn more about <a href="/docs/billing/subscriptions/pause#resume-subscriptions">resuming subscriptions</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ subscription: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(SubscriptionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxAssociationsFind = os
  .route({
    method: 'GET',
    path: '/v1/tax/associations/find',
    summary: 'Find a Tax Association',
    description: '<p>Finds a tax association object by PaymentIntent id.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(TaxAssociationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxCalculations = os
  .route({
    method: 'POST',
    path: '/v1/tax/calculations',
    summary: 'Create a Calculation',
    description:
      '<p>Calculates tax based on the input and returns a Tax <code>Calculation</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxCalculationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxCalculationsCalculation = os
  .route({
    method: 'GET',
    path: '/v1/tax/calculations/{calculation}',
    summary: 'Retrieve a Calculation',
    description:
      '<p>Retrieves a Tax <code>Calculation</code> object, if the calculation hasn’t expired.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      calculation: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxCalculationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxCalculationsCalculationLineItems = os
  .route({
    method: 'GET',
    path: '/v1/tax/calculations/{calculation}/line_items',
    summary: "Retrieve a Calculation's line items",
    description:
      '<p>Retrieves the line items of a tax calculation as a collection, if the calculation hasn’t expired.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      calculation: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TaxCalculationLineItemSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/tax\/calculations\/[^\/]+\/line_items/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxLocations = os
  .route({
    method: 'GET',
    path: '/v1/tax/locations',
    summary: 'List tax locations',
    description:
      '<p>Retrieve a list of all tax locations. Tax locations can represent the venues for services, tickets, or other product types.</p>\n\n<p>The response includes detailed information for each tax location, such as its address, type, and description.</p>\n\n<p>You can paginate through the list by using the <code>limit</code> parameter to control the number of results returned in each request.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      type: v.literal('performance'),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TaxLocationSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/tax\/locations/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxLocations = os
  .route({
    method: 'POST',
    path: '/v1/tax/locations',
    summary: 'Create a tax location',
    description:
      '<p>Create a tax location to use in calculating taxes for a service, ticket, or other type of product. The resulting object contains the ID, address, type, and description of the tax location.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxLocationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxLocationsLocation = os
  .route({
    method: 'GET',
    path: '/v1/tax/locations/{location}',
    summary: 'Retrieve a tax location',
    description:
      '<p>Fetch the details of a specific tax location using its unique identifier. Use a tax location to calculate taxes based on the location of the end product, such as a performance, instead of the customer address. For more details, check the <a href="https://docs.stripe.com/tax/tax-for-tickets/integration-guide">integration guide</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      location: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxLocationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxRegistrations = os
  .route({
    method: 'GET',
    path: '/v1/tax/registrations',
    summary: 'List registrations',
    description: '<p>Returns a list of Tax <code>Registration</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['active', 'all', 'expired', 'scheduled'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TaxRegistrationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/tax\/registrations/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxRegistrations = os
  .route({
    method: 'POST',
    path: '/v1/tax/registrations',
    summary: 'Create a registration',
    description: '<p>Creates a new Tax <code>Registration</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxRegistrationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxRegistrationsId = os
  .route({
    method: 'GET',
    path: '/v1/tax/registrations/{id}',
    summary: 'Retrieve a registration',
    description: '<p>Returns a Tax <code>Registration</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxRegistrationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxRegistrationsId = os
  .route({
    method: 'POST',
    path: '/v1/tax/registrations/{id}',
    summary: 'Update a registration',
    description:
      '<p>Updates an existing Tax <code>Registration</code> object.</p>\n\n<p>A registration cannot be deleted after it has been created. If you wish to end a registration you may do so by setting <code>expires_at</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TaxRegistrationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxSettings = os
  .route({
    method: 'GET',
    path: '/v1/tax/settings',
    summary: 'Retrieve settings',
    description: '<p>Retrieves Tax <code>Settings</code> for a merchant.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxSettingsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxSettings = os
  .route({
    method: 'POST',
    path: '/v1/tax/settings',
    summary: 'Update settings',
    description:
      '<p>Updates Tax <code>Settings</code> parameters used in tax calculations. All parameters are editable but none can be removed once set. Check the returned Tax <code>Settings</code> object and validate that its status is <code>active</code>.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxSettingsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxTransactionsCreateFromCalculation = os
  .route({
    method: 'POST',
    path: '/v1/tax/transactions/create_from_calculation',
    summary: 'Create a Transaction from a Calculation',
    description:
      '<p>Creates a Tax Transaction from a calculation, if that calculation hasn’t expired. Calculations expire after 90 days.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxTransactionsCreateReversal = os
  .route({
    method: 'POST',
    path: '/v1/tax/transactions/create_reversal',
    summary: 'Create a reversal Transaction',
    description:
      '<p>Partially or fully reverses a previously created <code>Transaction</code>.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxTransactionsTransaction = os
  .route({
    method: 'GET',
    path: '/v1/tax/transactions/{transaction}',
    summary: 'Retrieve a Transaction',
    description: '<p>Retrieves a Tax <code>Transaction</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxTransactionsTransactionLineItems = os
  .route({
    method: 'GET',
    path: '/v1/tax/transactions/{transaction}/line_items',
    summary: "Retrieve a Transaction's line items",
    description:
      '<p>Retrieves the line items of a committed standalone transaction as a collection.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TaxTransactionLineItemSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/tax\/transactions\/[^\/]+\/line_items/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxCodes = os
  .route({
    method: 'GET',
    path: '/v1/tax_codes',
    summary: 'List all tax codes',
    description:
      '<p>A list of <a href="https://stripe.com/docs/tax/tax-categories">all tax codes available</a> to add to Products in order to allow specific tax calculations.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.string()),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.string()),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TaxCodeSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxCodesId = os
  .route({
    method: 'GET',
    path: '/v1/tax_codes/{id}',
    summary: 'Retrieve a tax code',
    description:
      '<p>Retrieves the details of an existing tax code. Supply the unique tax code ID and Stripe will return the corresponding tax code information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxCodeSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxIds = os
  .route({
    method: 'GET',
    path: '/v1/tax_ids',
    summary: 'List all tax IDs',
    description: '<p>Returns a list of tax IDs.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      owner: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.object({
            account: v.optional(v.string()),
            customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            type: v.picklist(['account', 'application', 'customer', 'self']),
          }),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TaxIdSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxIds = os
  .route({
    method: 'POST',
    path: '/v1/tax_ids',
    summary: 'Create a tax ID',
    description: '<p>Creates a new account or customer <code>tax_id</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxIdSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxIdsId = os
  .route({
    method: 'GET',
    path: '/v1/tax_ids/{id}',
    summary: 'Retrieve a tax ID',
    description: '<p>Retrieves an account or customer <code>tax_id</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxIdSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1TaxIdsId = os
  .route({
    method: 'DELETE',
    path: '/v1/tax_ids/{id}',
    summary: 'Delete a tax ID',
    description: '<p>Deletes an existing account or customer <code>tax_id</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedTaxIdSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxRates = os
  .route({
    method: 'GET',
    path: '/v1/tax_rates',
    summary: 'List all tax rates',
    description:
      '<p>Returns a list of your tax rates. Tax rates are returned sorted by creation date, with the most recently created tax rates appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      active: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      inclusive: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TaxRateSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/tax_rates/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxRates = os
  .route({
    method: 'POST',
    path: '/v1/tax_rates',
    summary: 'Create a tax rate',
    description: '<p>Creates a new tax rate.</p>',
    successDescription: 'Successful response.',
  })
  .output(TaxRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TaxRatesTaxRate = os
  .route({
    method: 'GET',
    path: '/v1/tax_rates/{tax_rate}',
    summary: 'Retrieve a tax rate',
    description: '<p>Retrieves a tax rate with the given ID</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TaxRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TaxRatesTaxRate = os
  .route({
    method: 'POST',
    path: '/v1/tax_rates/{tax_rate}',
    summary: 'Update a tax rate',
    description: '<p>Updates an existing tax rate.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TaxRateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TerminalConfigurations = os
  .route({
    method: 'GET',
    path: '/v1/terminal/configurations',
    summary: 'List all Configurations',
    description: '<p>Returns a list of <code>Configuration</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      is_account_default: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TerminalConfigurationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/terminal\/configurations/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalConfigurations = os
  .route({
    method: 'POST',
    path: '/v1/terminal/configurations',
    summary: 'Create a Configuration',
    description: '<p>Creates a new <code>Configuration</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TerminalConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TerminalConfigurationsConfiguration = os
  .route({
    method: 'GET',
    path: '/v1/terminal/configurations/{configuration}',
    summary: 'Retrieve a Configuration',
    description: '<p>Retrieves a <code>Configuration</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      configuration: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(v.union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalConfigurationsConfiguration = os
  .route({
    method: 'POST',
    path: '/v1/terminal/configurations/{configuration}',
    summary: 'Update a Configuration',
    description: '<p>Updates a new <code>Configuration</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(v.union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1TerminalConfigurationsConfiguration = os
  .route({
    method: 'DELETE',
    path: '/v1/terminal/configurations/{configuration}',
    summary: 'Delete a Configuration',
    description: '<p>Deletes a <code>Configuration</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedTerminalConfigurationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalConnectionTokens = os
  .route({
    method: 'POST',
    path: '/v1/terminal/connection_tokens',
    summary: 'Create a Connection Token',
    description:
      '<p>To connect to a reader the Stripe Terminal SDK needs to retrieve a short-lived connection token from Stripe, proxied through your server. On your backend, add an endpoint that creates and returns a connection token.</p>',
    successDescription: 'Successful response.',
  })
  .output(TerminalConnectionTokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TerminalLocations = os
  .route({
    method: 'GET',
    path: '/v1/terminal/locations',
    summary: 'List all Locations',
    description: '<p>Returns a list of <code>Location</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TerminalLocationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/terminal\/locations/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalLocations = os
  .route({
    method: 'POST',
    path: '/v1/terminal/locations',
    summary: 'Create a Location',
    description:
      '<p>Creates a new <code>Location</code> object.\nFor further details, including which address fields are required in each country, see the <a href="/docs/terminal/fleet/locations">Manage locations</a> guide.</p>',
    successDescription: 'Successful response.',
  })
  .output(TerminalLocationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TerminalLocationsLocation = os
  .route({
    method: 'GET',
    path: '/v1/terminal/locations/{location}',
    summary: 'Retrieve a Location',
    description: '<p>Retrieves a <code>Location</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      location: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(v.union([TerminalLocationSchema, DeletedTerminalLocationSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalLocationsLocation = os
  .route({
    method: 'POST',
    path: '/v1/terminal/locations/{location}',
    summary: 'Update a Location',
    description:
      '<p>Updates a <code>Location</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ location: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(v.union([TerminalLocationSchema, DeletedTerminalLocationSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1TerminalLocationsLocation = os
  .route({
    method: 'DELETE',
    path: '/v1/terminal/locations/{location}',
    summary: 'Delete a Location',
    description: '<p>Deletes a <code>Location</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ location: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedTerminalLocationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalOnboardingLinks = os
  .route({
    method: 'POST',
    path: '/v1/terminal/onboarding_links',
    summary: 'Create an Onboarding Link',
    description:
      '<p>Creates a new <code>OnboardingLink</code> object that contains a redirect_url used for onboarding onto Tap to Pay on iPhone.</p>',
    successDescription: 'Successful response.',
  })
  .output(TerminalOnboardingLinkSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TerminalReaders = os
  .route({
    method: 'GET',
    path: '/v1/terminal/readers',
    summary: 'List all Readers',
    description: '<p>Returns a list of <code>Reader</code> objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      device_type: v.optional(
        v.picklist([
          'bbpos_chipper2x',
          'bbpos_wisepad3',
          'bbpos_wisepos_e',
          'mobile_phone_reader',
          'simulated_stripe_s700',
          'simulated_stripe_s710',
          'simulated_verifone_m425',
          'simulated_verifone_p630',
          'simulated_verifone_ux700',
          'simulated_verifone_v660p',
          'simulated_wisepos_e',
          'stripe_m2',
          'stripe_s700',
          'stripe_s710',
          'verifone_P400',
          'verifone_m425',
          'verifone_p630',
          'verifone_ux700',
          'verifone_v660p',
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      location: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      serial_number: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['offline', 'online'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TerminalReaderSchema), v.description('A list of readers')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReaders = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers',
    summary: 'Create a Reader',
    description: '<p>Creates a new <code>Reader</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TerminalReadersReader = os
  .route({
    method: 'GET',
    path: '/v1/terminal/readers/{reader}',
    summary: 'Retrieve a Reader',
    description: '<p>Retrieves a <code>Reader</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      reader: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(v.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReader = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}',
    summary: 'Update a Reader',
    description:
      '<p>Updates a <code>Reader</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(v.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1TerminalReadersReader = os
  .route({
    method: 'DELETE',
    path: '/v1/terminal/readers/{reader}',
    summary: 'Delete a Reader',
    description: '<p>Deletes a <code>Reader</code> object.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedTerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderCancelAction = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/cancel_action',
    summary: 'Cancel the current reader action',
    description:
      '<p>Cancels the current reader action. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven#programmatic-cancellation">Programmatic Cancellation</a> for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(v.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderCollectInputs = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/collect_inputs',
    summary: 'Collect inputs using a Reader',
    description:
      '<p>Initiates an <a href="/docs/terminal/features/collect-inputs">input collection flow</a> on a Reader to display input forms and collect information from your customers.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderCollectPaymentMethod = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/collect_payment_method',
    summary: 'Hand off a PaymentIntent to a Reader and collect card details',
    description:
      '<p>Initiates a payment flow on a Reader and updates the PaymentIntent with card details before manual confirmation. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=inspect#collect-a-paymentmethod">Collecting a Payment method</a> for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderConfirmPaymentIntent = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/confirm_payment_intent',
    summary: 'Confirm a PaymentIntent on the Reader',
    description:
      '<p>Finalizes a payment on a Reader. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=inspect#confirm-the-paymentintent">Confirming a Payment</a> for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderProcessPaymentIntent = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/process_payment_intent',
    summary: 'Hand-off a PaymentIntent to a Reader',
    description:
      '<p>Initiates a payment flow on a Reader. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=immediately#process-payment">process the payment</a> for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderProcessSetupIntent = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/process_setup_intent',
    summary: 'Hand-off a SetupIntent to a Reader',
    description:
      '<p>Initiates a SetupIntent flow on a Reader. See <a href="/docs/terminal/features/saving-payment-details/save-directly">Save directly without charging</a> for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderRefundPayment = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/refund_payment',
    summary: 'Refund a Charge or a PaymentIntent in-person',
    description:
      '<p>Initiates an in-person refund on a Reader. See <a href="/docs/terminal/payments/regional?integration-country=CA#refund-an-interac-payment">Refund an Interac Payment</a> for more details.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalReadersReaderSetReaderDisplay = os
  .route({
    method: 'POST',
    path: '/v1/terminal/readers/{reader}/set_reader_display',
    summary: 'Set reader display',
    description:
      '<p>Sets the reader display to show <a href="/docs/terminal/features/display">cart details</a>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TerminalRefunds = os
  .route({
    method: 'POST',
    path: '/v1/terminal/refunds',
    summary: 'Create a refund using a Terminal-supported device.',
    description:
      '<p>Internal endpoint for terminal use to create a refund for a card_present or card charge.</p>\n\n<p>You can optionally refund only part of a charge.</p>',
    successDescription: 'Successful response.',
  })
  .output(TerminalRefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersConfirmationTokens = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/confirmation_tokens',
    summary: 'Create a test Confirmation Token',
    description:
      '<p>Creates a test mode Confirmation Token server side for your integration tests.</p>',
    successDescription: 'Successful response.',
  })
  .output(ConfirmationTokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersCustomersCustomerFundCashBalance = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/customers/{customer}/fund_cash_balance',
    summary: 'Fund a test mode cash balance',
    description: '<p>Create an incoming testmode bank transfer</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(CustomerCashBalanceTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizations = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations',
    summary: 'Create a test-mode authorization',
    description: '<p>Create a test-mode authorization.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizationsAuthorizationCapture = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/capture',
    summary: 'Capture a test-mode authorization',
    description: '<p>Capture a test-mode authorization.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizationsAuthorizationExpire = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/expire',
    summary: 'Expire a test-mode authorization',
    description: '<p>Expire a test-mode Authorization.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount',
    summary: "Finalize a test-mode authorization's amount",
    description:
      '<p>Finalize the amount on an Authorization prior to capture, when the initial authorization was for an estimated amount.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond',
    summary: 'Respond to fraud challenge',
    description:
      '<p>Respond to a fraud challenge on a testmode Issuing authorization, simulating either a confirmation of fraud or a correction of legitimacy.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizationsAuthorizationIncrement = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/increment',
    summary: 'Increment a test-mode authorization',
    description: '<p>Increment a test-mode Authorization.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingAuthorizationsAuthorizationReverse = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/reverse',
    summary: 'Reverse a test-mode authorization',
    description: '<p>Reverse a test-mode Authorization.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingAuthorizationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingCardsCardShippingDeliver = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/cards/{card}/shipping/deliver',
    summary: 'Deliver a testmode card',
    description:
      '<p>Updates the shipping status of the specified Issuing <code>Card</code> object to <code>delivered</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingCardsCardShippingFail = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/cards/{card}/shipping/fail',
    summary: 'Fail a testmode card',
    description:
      '<p>Updates the shipping status of the specified Issuing <code>Card</code> object to <code>failure</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingCardsCardShippingReturn = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/cards/{card}/shipping/return',
    summary: 'Return a testmode card',
    description:
      '<p>Updates the shipping status of the specified Issuing <code>Card</code> object to <code>returned</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingCardsCardShippingShip = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/cards/{card}/shipping/ship',
    summary: 'Ship a testmode card',
    description:
      '<p>Updates the shipping status of the specified Issuing <code>Card</code> object to <code>shipped</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingCardsCardShippingSubmit = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/cards/{card}/shipping/submit',
    summary: 'Submit a testmode card',
    description:
      '<p>Updates the shipping status of the specified Issuing <code>Card</code> object to <code>submitted</code>. This method requires Stripe Version ‘2024-09-30.acacia’ or later.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingCardSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate',
    summary: 'Activate a testmode personalization design',
    description:
      '<p>Updates the <code>status</code> of the specified testmode personalization design object to <code>active</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingPersonalizationDesignSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate',
    summary: 'Deactivate a testmode personalization design',
    description:
      '<p>Updates the <code>status</code> of the specified testmode personalization design object to <code>inactive</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingPersonalizationDesignSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject',
    summary: 'Reject a testmode personalization design',
    description:
      '<p>Updates the <code>status</code> of the specified testmode personalization design object to <code>rejected</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingPersonalizationDesignSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingSettlements = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/settlements',
    summary: 'Create a test-mode settlement',
    description: '<p>Allows the user to create an Issuing settlement.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingSettlementSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingSettlementsSettlementComplete = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/settlements/{settlement}/complete',
    summary: 'Complete a test-mode settlement',
    description: '<p>Allows the user to mark an Issuing settlement as complete.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ settlement: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingSettlementSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingTransactionsCreateForceCapture = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/transactions/create_force_capture',
    summary: 'Create a test-mode force capture',
    description:
      '<p>Allows the user to capture an arbitrary amount, also known as a forced capture.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingTransactionsCreateUnlinkedRefund = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/transactions/create_unlinked_refund',
    summary: 'Create a test-mode unlinked refund',
    description:
      '<p>Allows the user to refund an arbitrary amount, also known as a unlinked refund.</p>',
    successDescription: 'Successful response.',
  })
  .output(IssuingTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersIssuingTransactionsTransactionRefund = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/issuing/transactions/{transaction}/refund',
    summary: 'Refund a test-mode transaction',
    description: '<p>Refund a test-mode Transaction.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ transaction: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(IssuingTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersRefundsRefundExpire = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/refunds/{refund}/expire',
    summary: 'Expire a pending refund.',
    description: '<p>Expire a refund with a status of <code>requires_action</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ refund: v.string() }))
  .output(RefundSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTerminalReadersReaderPresentPaymentMethod = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method',
    summary: 'Simulate presenting a payment method',
    description:
      '<p>Presents a payment method on a simulated reader. Can be used to simulate accepting a payment, saving a card or refunding a transaction.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTerminalReadersReaderSucceedInputCollection = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection',
    summary: 'Simulate a successful input collection',
    description:
      '<p>Use this endpoint to trigger a successful input collection on a simulated reader.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTerminalReadersReaderTimeoutInputCollection = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection',
    summary: 'Simulate an input collection timeout',
    description:
      '<p>Use this endpoint to complete an input collection with a timeout error on a simulated reader.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TerminalReaderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TestHelpersTestClocks = os
  .route({
    method: 'GET',
    path: '/v1/test_helpers/test_clocks',
    summary: 'List all test clocks',
    description: '<p>Returns a list of your test clocks.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TestHelpersTestClockSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/test_helpers\/test_clocks/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTestClocks = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/test_clocks',
    summary: 'Create a test clock',
    description:
      '<p>Creates a new test clock that can be attached to new customers and quotes.</p>',
    successDescription: 'Successful response.',
  })
  .output(TestHelpersTestClockSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TestHelpersTestClocksTestClock = os
  .route({
    method: 'GET',
    path: '/v1/test_helpers/test_clocks/{test_clock}',
    summary: 'Retrieve a test clock',
    description: '<p>Retrieves a test clock.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      test_clock: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TestHelpersTestClockSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1TestHelpersTestClocksTestClock = os
  .route({
    method: 'DELETE',
    path: '/v1/test_helpers/test_clocks/{test_clock}',
    summary: 'Delete a test clock',
    description: '<p>Deletes a test clock.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ test_clock: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedTestHelpersTestClockSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTestClocksTestClockAdvance = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/test_clocks/{test_clock}/advance',
    summary: 'Advance a test clock',
    description:
      '<p>Starts advancing a test clock to a specified time in the future. Advancement is done when status changes to <code>Ready</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ test_clock: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TestHelpersTestClockSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryInboundTransfersIdFail = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail',
    summary: 'Test mode: Fail an InboundTransfer',
    description:
      '<p>Transitions a test mode created InboundTransfer to the <code>failed</code> status. The InboundTransfer must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryInboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryInboundTransfersIdReturn = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/inbound_transfers/{id}/return',
    summary: 'Test mode: Return an InboundTransfer',
    description:
      '<p>Marks the test mode InboundTransfer object as returned and links the InboundTransfer to a ReceivedDebit. The InboundTransfer must already be in the <code>succeeded</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryInboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryInboundTransfersIdSucceed = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/inbound_transfers/{id}/succeed',
    summary: 'Test mode: Succeed an InboundTransfer',
    description:
      '<p>Transitions a test mode created InboundTransfer to the <code>succeeded</code> status. The InboundTransfer must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryInboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundPaymentsId = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_payments/{id}',
    summary: 'Test mode: Update an OutboundPayment',
    description:
      '<p>Updates a test mode created OutboundPayment with tracking details. The OutboundPayment must not be cancelable, and cannot be in the <code>canceled</code> or <code>failed</code> states.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundPaymentsIdFail = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_payments/{id}/fail',
    summary: 'Test mode: Fail an OutboundPayment',
    description:
      '<p>Transitions a test mode created OutboundPayment to the <code>failed</code> status. The OutboundPayment must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundPaymentsIdPost = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_payments/{id}/post',
    summary: 'Test mode: Post an OutboundPayment',
    description:
      '<p>Transitions a test mode created OutboundPayment to the <code>posted</code> status. The OutboundPayment must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundPaymentsIdReturn = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_payments/{id}/return',
    summary: 'Test mode: Return an OutboundPayment',
    description:
      '<p>Transitions a test mode created OutboundPayment to the <code>returned</code> status. The OutboundPayment must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundTransfersOutboundTransfer = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}',
    summary: 'Test mode: Update an OutboundTransfer',
    description:
      '<p>Updates a test mode created OutboundTransfer with tracking details. The OutboundTransfer must not be cancelable, and cannot be in the <code>canceled</code> or <code>failed</code> states.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFail = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail',
    summary: 'Test mode: Fail an OutboundTransfer',
    description:
      '<p>Transitions a test mode created OutboundTransfer to the <code>failed</code> status. The OutboundTransfer must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPost = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post',
    summary: 'Test mode: Post an OutboundTransfer',
    description:
      '<p>Transitions a test mode created OutboundTransfer to the <code>posted</code> status. The OutboundTransfer must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturn = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return',
    summary: 'Test mode: Return an OutboundTransfer',
    description:
      '<p>Transitions a test mode created OutboundTransfer to the <code>returned</code> status. The OutboundTransfer must already be in the <code>processing</code> state.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryReceivedCredits = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/received_credits',
    summary: 'Test mode: Create a ReceivedCredit',
    description:
      '<p>Use this endpoint to simulate a test mode ReceivedCredit initiated by a third party. In live mode, you can’t directly create ReceivedCredits initiated by third parties.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryReceivedCreditSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TestHelpersTreasuryReceivedDebits = os
  .route({
    method: 'POST',
    path: '/v1/test_helpers/treasury/received_debits',
    summary: 'Test mode: Create a ReceivedDebit',
    description:
      '<p>Use this endpoint to simulate a test mode ReceivedDebit initiated by a third party. In live mode, you can’t directly create ReceivedDebits initiated by third parties.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryReceivedDebitSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ThreeDSecureAuthentications = os
  .route({
    method: 'GET',
    path: '/v1/three_d_secure/authentications',
    summary: 'List all 3D Secure Authentications',
    description: '<p>Returns a list of 3D Secure Authentications.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(
        v.picklist([
          'canceled',
          'error',
          'failed',
          'requires_challenge',
          'requires_submission',
          'succeeded',
        ]),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(ThreeDSecureAuthenticationSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/three_d_secure\/authentications/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ThreeDSecureAuthentications = os
  .route({
    method: 'POST',
    path: '/v1/three_d_secure/authentications',
    summary: 'Create a 3DS Authentication',
    description:
      '<p>This endpoint creates a 3DS Authentication. Refer to the <a href="/payments/3d-secure/standalone-3d-secure#create-a-3ds-authentication-object">Create a 3DS Authentication object section of the Standalone 3DS guide</a> for more information.</p>\n\n<p>You can pass the submit parameter to automatically submit the 3DS Authentication object when you create it. Refer to the <a href="/payments/3d-secure/standalone-3d-secure#submit-at-creation">Submit at creation section of the Standalone 3DS guide</a> for more information.</p>',
    successDescription: 'Successful response.',
  })
  .output(ThreeDSecureAuthenticationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1ThreeDSecureAuthenticationsAuthentication = os
  .route({
    method: 'GET',
    path: '/v1/three_d_secure/authentications/{authentication}',
    summary: 'Retrieve a 3DS Authentication',
    description: '<p>This endpoint retrieves a 3DS Authentication.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      authentication: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(ThreeDSecureAuthenticationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ThreeDSecureAuthenticationsAuthenticationCancel = os
  .route({
    method: 'POST',
    path: '/v1/three_d_secure/authentications/{authentication}/cancel',
    summary: 'Cancel a 3DS Authentication',
    description:
      '<p>This endpoint cancels a 3DS Authentication. You can cancel a 3DS Authentication object when it’s in a non-final status:\n<code>requires_submission</code> or <code>requires_challenge</code>.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authentication: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ThreeDSecureAuthenticationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1ThreeDSecureAuthenticationsAuthenticationSubmit = os
  .route({
    method: 'POST',
    path: '/v1/three_d_secure/authentications/{authentication}/submit',
    summary: 'Submit a 3DS Authentication',
    description:
      '<p>This endpoint submits a 3DS Authentication. You can submit a 3DS Authentication object when it has status <code>requires_submission</code>. Refer to the <a href="/payments/3d-secure/standalone-3d-secure#submit-the-3ds-authentication-object">Submit the 3DS Authentication object section of the Standalone 3DS guide</a> for more information.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ authentication: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(ThreeDSecureAuthenticationSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Tokens = os
  .route({
    method: 'POST',
    path: '/v1/tokens',
    summary: 'Create a bank account token',
    description:
      '<p>Creates a single-use token that represents a bank account’s details.\nYou can use this token with any v1 API method in place of a bank account dictionary. You can only use this token once. To do so, attach it to a <a href="#accounts">connected account</a> where <a href="/api/accounts/object#account_object-controller-requirement_collection">controller.requirement_collection</a> is <code>application</code>, which includes Custom accounts.</p>',
    successDescription: 'Successful response.',
  })
  .output(TokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TokensToken = os
  .route({
    method: 'GET',
    path: '/v1/tokens/{token}',
    summary: 'Retrieve a token',
    description: '<p>Retrieves the token with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      token: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TokenSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Topups = os
  .route({
    method: 'GET',
    path: '/v1/topups',
    summary: 'List all top-ups',
    description: '<p>Returns a list of top-ups.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      amount: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'failed', 'pending', 'succeeded'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TopupSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/topups/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Topups = os
  .route({
    method: 'POST',
    path: '/v1/topups',
    summary: 'Create a top-up',
    description: '<p>Top up the balance of an account</p>',
    successDescription: 'Successful response.',
  })
  .output(TopupSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TopupsTopup = os
  .route({
    method: 'GET',
    path: '/v1/topups/{topup}',
    summary: 'Retrieve a top-up',
    description:
      '<p>Retrieves the details of a top-up that has previously been created. Supply the unique top-up ID that was returned from your previous request, and Stripe will return the corresponding top-up information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      topup: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TopupSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TopupsTopup = os
  .route({
    method: 'POST',
    path: '/v1/topups/{topup}',
    summary: 'Update a top-up',
    description:
      '<p>Updates the metadata of a top-up. Other top-up details are not editable by design.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ topup: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TopupSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TopupsTopupCancel = os
  .route({
    method: 'POST',
    path: '/v1/topups/{topup}/cancel',
    summary: 'Cancel a top-up',
    description: '<p>Cancels a top-up. Only pending top-ups can be canceled.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ topup: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TopupSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1Transfers = os
  .route({
    method: 'GET',
    path: '/v1/transfers',
    summary: 'List all transfers',
    description:
      '<p>Returns a list of existing transfers sent to connected accounts. The transfers are returned in sorted order, with the most recently created transfers appearing first.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      destination: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      transfer_group: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TransferSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/transfers/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1Transfers = os
  .route({
    method: 'POST',
    path: '/v1/transfers',
    summary: 'Create a transfer',
    description:
      '<p>To send funds from your Stripe account to a connected account, you create a new transfer object. Your <a href="#balance">Stripe balance</a> must be able to cover the transfer amount, or you’ll receive an “Insufficient Funds” error.</p>',
    successDescription: 'Successful response.',
  })
  .output(TransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TransfersIdReversals = os
  .route({
    method: 'GET',
    path: '/v1/transfers/{id}/reversals',
    summary: 'List all reversals',
    description:
      '<p>You can see a list of the reversals belonging to a specific transfer. Note that the 10 most recent reversals are always available by default on the transfer object. If you need more than those 10, you can use this API method and the <code>limit</code> and <code>starting_after</code> parameters to page through additional reversals.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(v.array(TransferReversalSchema), v.description('Details about each object.')),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TransfersIdReversals = os
  .route({
    method: 'POST',
    path: '/v1/transfers/{id}/reversals',
    summary: 'Create a transfer reversal',
    description:
      '<p>When you create a new reversal, you must specify a transfer to create it on.</p>\n\n<p>When reversing transfers, you can optionally reverse part of the transfer. You can do so as many times as you wish until the entire transfer has been reversed.</p>\n\n<p>Once entirely reversed, a transfer can’t be reversed again. This method will return an error when called on an already-reversed transfer, or when trying to reverse more money than is left on a transfer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TransferReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TransfersTransfer = os
  .route({
    method: 'GET',
    path: '/v1/transfers/{transfer}',
    summary: 'Retrieve a transfer',
    description:
      '<p>Retrieves the details of an existing transfer. Supply the unique transfer ID from either a transfer creation request or the transfer list, and Stripe will return the corresponding transfer information.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TransfersTransfer = os
  .route({
    method: 'POST',
    path: '/v1/transfers/{transfer}',
    summary: 'Update a transfer',
    description:
      '<p>Updates the specified transfer by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>\n\n<p>This request accepts only metadata as an argument.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TransfersTransferReversalsId = os
  .route({
    method: 'GET',
    path: '/v1/transfers/{transfer}/reversals/{id}',
    summary: 'Retrieve a reversal',
    description:
      '<p>By default, you can see the 10 most recent reversals stored directly on the transfer object, but you can also retrieve details about a specific reversal stored on the transfer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TransferReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TransfersTransferReversalsId = os
  .route({
    method: 'POST',
    path: '/v1/transfers/{transfer}/reversals/{id}',
    summary: 'Update a reversal',
    description:
      '<p>Updates the specified reversal by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>\n\n<p>This request only accepts metadata and description as arguments.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
    }),
  )
  .output(TransferReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryCreditReversals = os
  .route({
    method: 'GET',
    path: '/v1/treasury/credit_reversals',
    summary: 'List all CreditReversals',
    description: '<p>Returns a list of CreditReversals.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      received_credit: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'posted', 'processing'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryCreditReversalSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryCreditReversals = os
  .route({
    method: 'POST',
    path: '/v1/treasury/credit_reversals',
    summary: 'Create a CreditReversal',
    description: '<p>Reverses a ReceivedCredit and creates a CreditReversal object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryCreditReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryCreditReversalsCreditReversal = os
  .route({
    method: 'GET',
    path: '/v1/treasury/credit_reversals/{credit_reversal}',
    summary: 'Retrieve a CreditReversal',
    description:
      '<p>Retrieves the details of an existing CreditReversal by passing the unique CreditReversal ID from either the CreditReversal creation request or CreditReversal list</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      credit_reversal: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryCreditReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryDebitReversals = os
  .route({
    method: 'GET',
    path: '/v1/treasury/debit_reversals',
    summary: 'List all DebitReversals',
    description: '<p>Returns a list of DebitReversals.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      received_debit: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      resolution: v.optional(v.picklist(['lost', 'won'])),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'completed', 'processing'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryDebitReversalSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryDebitReversals = os
  .route({
    method: 'POST',
    path: '/v1/treasury/debit_reversals',
    summary: 'Create a DebitReversal',
    description: '<p>Reverses a ReceivedDebit and creates a DebitReversal object.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryDebitReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryDebitReversalsDebitReversal = os
  .route({
    method: 'GET',
    path: '/v1/treasury/debit_reversals/{debit_reversal}',
    summary: 'Retrieve a DebitReversal',
    description: '<p>Retrieves a DebitReversal object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      debit_reversal: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryDebitReversalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryFinancialAccounts = os
  .route({
    method: 'GET',
    path: '/v1/treasury/financial_accounts',
    summary: 'List all FinancialAccounts',
    description: '<p>Returns a list of FinancialAccounts.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['closed', 'open'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(TreasuryFinancialAccountSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/treasury\/financial_accounts/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryFinancialAccounts = os
  .route({
    method: 'POST',
    path: '/v1/treasury/financial_accounts',
    summary: 'Create a FinancialAccount',
    description:
      '<p>Creates a new FinancialAccount. Each connected account can have up to three FinancialAccounts by default.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryFinancialAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryFinancialAccountsFinancialAccount = os
  .route({
    method: 'GET',
    path: '/v1/treasury/financial_accounts/{financial_account}',
    summary: 'Retrieve a FinancialAccount',
    description: '<p>Retrieves the details of a FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      financial_account: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryFinancialAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryFinancialAccountsFinancialAccount = os
  .route({
    method: 'POST',
    path: '/v1/treasury/financial_accounts/{financial_account}',
    summary: 'Update a FinancialAccount',
    description: '<p>Updates the details of a FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ financial_account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryFinancialAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryFinancialAccountsFinancialAccountClose = os
  .route({
    method: 'POST',
    path: '/v1/treasury/financial_accounts/{financial_account}/close',
    summary: 'Close a FinancialAccount',
    description:
      '<p>Closes a FinancialAccount. A FinancialAccount can only be closed if it has a zero balance, has no pending InboundTransfers, and has canceled all attached Issuing cards.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ financial_account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryFinancialAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryFinancialAccountsFinancialAccountFeatures = os
  .route({
    method: 'GET',
    path: '/v1/treasury/financial_accounts/{financial_account}/features',
    summary: 'Retrieve FinancialAccount Features',
    description: '<p>Retrieves Features information associated with the FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      financial_account: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryFinancialAccountFeaturesSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryFinancialAccountsFinancialAccountFeatures = os
  .route({
    method: 'POST',
    path: '/v1/treasury/financial_accounts/{financial_account}/features',
    summary: 'Update FinancialAccount Features',
    description: '<p>Updates the Features associated with a FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ financial_account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryFinancialAccountFeaturesSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryInboundTransfers = os
  .route({
    method: 'GET',
    path: '/v1/treasury/inbound_transfers',
    summary: 'List all InboundTransfers',
    description:
      '<p>Returns a list of InboundTransfers sent from the specified FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'failed', 'processing', 'succeeded'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryInboundTransferSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryInboundTransfers = os
  .route({
    method: 'POST',
    path: '/v1/treasury/inbound_transfers',
    summary: 'Create an InboundTransfer',
    description: '<p>Creates an InboundTransfer.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryInboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryInboundTransfersId = os
  .route({
    method: 'GET',
    path: '/v1/treasury/inbound_transfers/{id}',
    summary: 'Retrieve an InboundTransfer',
    description: '<p>Retrieves the details of an existing InboundTransfer.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryInboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryInboundTransfersInboundTransferCancel = os
  .route({
    method: 'POST',
    path: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel',
    summary: 'Cancel an InboundTransfer',
    description: '<p>Cancels an InboundTransfer.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ inbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryInboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryOutboundPayments = os
  .route({
    method: 'GET',
    path: '/v1/treasury/outbound_payments',
    summary: 'List all OutboundPayments',
    description:
      '<p>Returns a list of OutboundPayments sent from the specified FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'failed', 'posted', 'processing', 'returned'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryOutboundPaymentSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/treasury\/outbound_payments/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryOutboundPayments = os
  .route({
    method: 'POST',
    path: '/v1/treasury/outbound_payments',
    summary: 'Create an OutboundPayment',
    description: '<p>Creates an OutboundPayment.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryOutboundPaymentsId = os
  .route({
    method: 'GET',
    path: '/v1/treasury/outbound_payments/{id}',
    summary: 'Retrieve an OutboundPayment',
    description:
      '<p>Retrieves the details of an existing OutboundPayment by passing the unique OutboundPayment ID from either the OutboundPayment creation request or OutboundPayment list.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryOutboundPaymentsIdCancel = os
  .route({
    method: 'POST',
    path: '/v1/treasury/outbound_payments/{id}/cancel',
    summary: 'Cancel an OutboundPayment',
    description: '<p>Cancel an OutboundPayment.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundPaymentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryOutboundTransfers = os
  .route({
    method: 'GET',
    path: '/v1/treasury/outbound_transfers',
    summary: 'List all OutboundTransfers',
    description:
      '<p>Returns a list of OutboundTransfers sent from the specified FinancialAccount.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['canceled', 'failed', 'posted', 'processing', 'returned'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryOutboundTransferSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryOutboundTransfers = os
  .route({
    method: 'POST',
    path: '/v1/treasury/outbound_transfers',
    summary: 'Create an OutboundTransfer',
    description: '<p>Creates an OutboundTransfer.</p>',
    successDescription: 'Successful response.',
  })
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryOutboundTransfersOutboundTransfer = os
  .route({
    method: 'GET',
    path: '/v1/treasury/outbound_transfers/{outbound_transfer}',
    summary: 'Retrieve an OutboundTransfer',
    description:
      '<p>Retrieves the details of an existing OutboundTransfer by passing the unique OutboundTransfer ID from either the OutboundTransfer creation request or OutboundTransfer list.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1TreasuryOutboundTransfersOutboundTransferCancel = os
  .route({
    method: 'POST',
    path: '/v1/treasury/outbound_transfers/{outbound_transfer}/cancel',
    summary: 'Cancel an OutboundTransfer',
    description:
      '<p>An OutboundTransfer can be canceled if the funds have not yet been paid out.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(TreasuryOutboundTransferSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryReceivedCredits = os
  .route({
    method: 'GET',
    path: '/v1/treasury/received_credits',
    summary: 'List all ReceivedCredits',
    description: '<p>Returns a list of ReceivedCredits.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      linked_flows: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.object({
            source_flow_type: v.picklist([
              'credit_reversal',
              'other',
              'outbound_payment',
              'outbound_transfer',
              'payout',
            ]),
          }),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['failed', 'succeeded'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryReceivedCreditSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryReceivedCreditsId = os
  .route({
    method: 'GET',
    path: '/v1/treasury/received_credits/{id}',
    summary: 'Retrieve a ReceivedCredit',
    description:
      '<p>Retrieves the details of an existing ReceivedCredit by passing the unique ReceivedCredit ID from the ReceivedCredit list.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryReceivedCreditSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryReceivedDebits = os
  .route({
    method: 'GET',
    path: '/v1/treasury/received_debits',
    summary: 'List all ReceivedDebits',
    description: '<p>Returns a list of ReceivedDebits.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['failed', 'succeeded'])),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryReceivedDebitSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryReceivedDebitsId = os
  .route({
    method: 'GET',
    path: '/v1/treasury/received_debits/{id}',
    summary: 'Retrieve a ReceivedDebit',
    description:
      '<p>Retrieves the details of an existing ReceivedDebit by passing the unique ReceivedDebit ID from the ReceivedDebit list</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryReceivedDebitSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryTransactionEntries = os
  .route({
    method: 'GET',
    path: '/v1/treasury/transaction_entries',
    summary: 'List all TransactionEntries',
    description: '<p>Retrieves a list of TransactionEntry objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      effective_at: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      order_by: v.optional(v.picklist(['created', 'effective_at'])),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      transaction: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryTransactionEntrySchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^\/v1\/treasury\/transaction_entries/),
            v.maxCodePoints(5000),
          ),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryTransactionEntriesId = os
  .route({
    method: 'GET',
    path: '/v1/treasury/transaction_entries/{id}',
    summary: 'Retrieve a TransactionEntry',
    description: '<p>Retrieves a TransactionEntry object.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryTransactionEntrySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryTransactions = os
  .route({
    method: 'GET',
    path: '/v1/treasury/transactions',
    summary: 'List all Transactions',
    description: '<p>Retrieves a list of Transaction objects.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      created: v.optional(
        v.union([
          v.partial(
            v.object({
              gt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              gte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lt: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
              lte: v.pipe(
                v.string(),
                v.regex(/^-?(?:0|[1-9]\d*)$/),
                v.transform((input) => Number(input)),
                v.number(),
                v.safeInteger(),
              ),
            }),
          ),
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ]),
      ),
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      financial_account: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      order_by: v.optional(v.picklist(['created', 'posted_at'])),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      status: v.optional(v.picklist(['open', 'posted', 'void'])),
      status_transitions: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.partial(
            v.object({
              posted_at: v.union([
                v.partial(
                  v.object({
                    gt: v.pipe(
                      v.string(),
                      v.regex(/^-?(?:0|[1-9]\d*)$/),
                      v.transform((input) => Number(input)),
                      v.number(),
                      v.safeInteger(),
                    ),
                    gte: v.pipe(
                      v.string(),
                      v.regex(/^-?(?:0|[1-9]\d*)$/),
                      v.transform((input) => Number(input)),
                      v.number(),
                      v.safeInteger(),
                    ),
                    lt: v.pipe(
                      v.string(),
                      v.regex(/^-?(?:0|[1-9]\d*)$/),
                      v.transform((input) => Number(input)),
                      v.number(),
                      v.safeInteger(),
                    ),
                    lte: v.pipe(
                      v.string(),
                      v.regex(/^-?(?:0|[1-9]\d*)$/),
                      v.transform((input) => Number(input)),
                      v.number(),
                      v.safeInteger(),
                    ),
                  }),
                ),
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
              ]),
            }),
          ),
        ),
      ),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.pipe(
          v.array(TreasuryTransactionSchema),
          v.description('Details about each object.'),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1TreasuryTransactionsId = os
  .route({
    method: 'GET',
    path: '/v1/treasury/transactions/{id}',
    summary: 'Retrieve a Transaction',
    description: '<p>Retrieves the details of an existing Transaction.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(TreasuryTransactionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1WebhookEndpoints = os
  .route({
    method: 'GET',
    path: '/v1/webhook_endpoints',
    summary: 'List all webhook endpoints',
    description: '<p>Returns a list of your webhook endpoints.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
      ),
      starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
    }),
  )
  .output(
    v.pipe(
      v.object({
        data: v.array(WebhookEndpointSchema),
        has_more: v.pipe(
          v.boolean(),
          v.description(
            'True if this list has another page of items after this one that can be fetched.',
          ),
        ),
        object: v.pipe(
          v.literal('list'),
          v.description(
            "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          ),
        ),
        url: v.pipe(
          v.pipe(v.string(), v.regex(/^\/v1\/webhook_endpoints/), v.maxCodePoints(5000)),
          v.description('The URL where this list can be accessed.'),
        ),
      }),
      v.description(''),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1WebhookEndpoints = os
  .route({
    method: 'POST',
    path: '/v1/webhook_endpoints',
    summary: 'Create a webhook endpoint',
    description:
      '<p>A webhook endpoint must have a <code>url</code> and a list of <code>enabled_events</code>. You may optionally specify the Boolean <code>connect</code> parameter. If set to true, then a Connect webhook endpoint that notifies the specified <code>url</code> about events from all connected accounts is created; otherwise an account webhook endpoint that notifies the specified <code>url</code> only about events from your account is created. You can also create webhook endpoints in the <a href="https://dashboard.stripe.com/account/webhooks">webhooks settings</a> section of the Dashboard.</p>',
    successDescription: 'Successful response.',
  })
  .output(WebhookEndpointSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV1WebhookEndpointsWebhookEndpoint = os
  .route({
    method: 'GET',
    path: '/v1/webhook_endpoints/{webhook_endpoint}',
    summary: 'Retrieve a webhook endpoint',
    description: '<p>Retrieves the webhook endpoint with the given ID.</p>',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      webhook_endpoint: v.pipe(v.string(), v.maxCodePoints(5000)),
      expand: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        ),
      ),
    }),
  )
  .output(WebhookEndpointSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV1WebhookEndpointsWebhookEndpoint = os
  .route({
    method: 'POST',
    path: '/v1/webhook_endpoints/{webhook_endpoint}',
    summary: 'Update a webhook endpoint',
    description:
      '<p>Updates the webhook endpoint. You may edit the <code>url</code>, the list of <code>enabled_events</code>, and the status of your endpoint.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ webhook_endpoint: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(WebhookEndpointSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV1WebhookEndpointsWebhookEndpoint = os
  .route({
    method: 'DELETE',
    path: '/v1/webhook_endpoints/{webhook_endpoint}',
    summary: 'Delete a webhook endpoint',
    description:
      '<p>You can also delete webhook endpoints via the <a href="https://dashboard.stripe.com/account/webhooks">webhook endpoint management</a> page of the Stripe dashboard.</p>',
    successDescription: 'Successful response.',
  })
  .input(v.object({ webhook_endpoint: v.pipe(v.string(), v.maxCodePoints(5000)) }))
  .output(DeletedWebhookEndpointSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
