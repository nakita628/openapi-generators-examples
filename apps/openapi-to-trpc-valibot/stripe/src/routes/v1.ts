import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const v1Router = t.router({
  getV1Account: t.procedure
    .input(v.partial(v.object({ expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))) })))
    .output(AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountLinks: t.procedure.output(AccountLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1AccountSessions: t.procedure.output(AccountSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Accounts: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.string(),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.string(),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Accounts: t.procedure.output(AccountSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AccountsAccount: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccount: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccount: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccounts: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountBankAccountsId: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.string(),
      }),
    )
    .output(ExternalAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccountsId: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountBankAccountsId: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(DeletedExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilities: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        capability: v.string(),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(CapabilitySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), capability: v.string() }))
    .output(CapabilitySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccounts: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.string()),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccounts: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.string(),
      }),
    )
    .output(ExternalAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccountsId: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountExternalAccountsId: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(DeletedExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountLoginLinks: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(LoginLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeople: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        relationship: v.optional(
          v.partial(
            v.object({
              authorizer: v.boolean(),
              director: v.boolean(),
              executive: v.boolean(),
              legal_guardian: v.boolean(),
              owner: v.boolean(),
              representative: v.boolean(),
            }),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeople: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeoplePerson: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        person: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PersonSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeoplePerson: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        person: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPeoplePerson: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        person: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(DeletedPersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersons: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        relationship: v.optional(
          v.partial(
            v.object({
              authorizer: v.boolean(),
              director: v.boolean(),
              executive: v.boolean(),
              legal_guardian: v.boolean(),
              owner: v.boolean(),
              representative: v.boolean(),
            }),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersons: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersonsPerson: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        person: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PersonSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersonsPerson: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        person: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPersonsPerson: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        person: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(DeletedPersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountReject: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountUnreject: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplePayDomains: t.procedure
    .input(
      v.partial(
        v.object({
          domain_name: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplePayDomains: t.procedure.output(ApplePayDomainSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ApplePayDomainsDomain: t.procedure
    .input(
      v.object({
        domain: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(ApplePayDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ApplePayDomainsDomain: t.procedure
    .input(v.object({ domain: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedApplePayDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFees: t.procedure
    .input(
      v.partial(
        v.object({
          charge: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        fee: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(FeeRefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      v.object({
        fee: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(FeeRefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ApplicationFeeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefund: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ApplicationFeeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesIdRefunds: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefunds: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FeeRefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsInstalls: t.procedure
    .input(
      v.partial(
        v.object({
          account: v.pipe(v.string(), v.maxCodePoints(5000)),
          app: v.pipe(v.string(), v.maxCodePoints(5000)),
          approval_required: v.boolean(),
          channel: v.picklist(['private_live', 'private_test', 'public', 'testing']),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          created_by: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist([
            'install_failed',
            'installed',
            'installing',
            'uninstall_failed',
            'uninstalling',
          ]),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstalls: t.procedure.output(AppsInstallSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AppsInstallsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(AppsInstallSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(AppsInstallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsIdUninstall: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(AppsInstallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsSecrets: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        scope: v.object({
          type: v.picklist(['account', 'user']),
          user: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        }),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsSecrets: t.procedure.output(AppsSecretSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1AppsSecretsDelete: t.procedure.output(AppsSecretSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AppsSecretsFind: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        name: v.pipe(v.string(), v.maxCodePoints(5000)),
        scope: v.object({
          type: v.picklist(['account', 'user']),
          user: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        }),
      }),
    )
    .output(AppsSecretSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Balance: t.procedure
    .input(v.partial(v.object({ expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))) })))
    .output(BalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistory: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          currency: v.string(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payout: v.pipe(v.string(), v.maxCodePoints(5000)),
          source: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistoryId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceSettings: t.procedure
    .input(v.partial(v.object({ expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))) })))
    .output(BalanceSettingsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BalanceSettings: t.procedure.output(BalanceSettingsSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BalanceTransactions: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          currency: v.string(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payout: v.pipe(v.string(), v.maxCodePoints(5000)),
          source: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceTransactionsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingAlerts: t.procedure
    .input(
      v.partial(
        v.object({
          alert_type: v.literal('usage_threshold'),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          meter: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlerts: t.procedure.output(BillingAlertSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingAlertsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BillingAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdActivate: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdArchive: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdDeactivate: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceSummary: t.procedure
    .input(
      v.object({
        customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        filter: v.object({
          applicability_scope: v.optional(
            v.partial(
              v.object({
                price_type: v.literal('metered'),
                prices: v.array(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) })),
              }),
            ),
          ),
          credit_grant: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
          type: v.picklist(['applicability_scope', 'credit_grant']),
        }),
      }),
    )
    .output(BillingCreditBalanceSummarySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactions: t.procedure
    .input(
      v.partial(
        v.object({
          credit_grant: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactionsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BillingCreditBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditGrants: t.procedure
    .input(
      v.partial(
        v.object({
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrants: t.procedure.output(BillingCreditGrantSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingCreditGrantsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BillingCreditGrantSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdExpire: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdVoid: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingFeedbackOptions: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'inactive']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptions: t.procedure.output(BillingFeedbackOptionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingFeedbackOptionsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BillingFeedbackOptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingFeedbackOptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsIdDeactivate: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingFeedbackOptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeterEventAdjustments: t.procedure
    .output(BillingMeterEventAdjustmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeterEvents: t.procedure.output(BillingMeterEventSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingMeters: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'inactive']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeters: t.procedure.output(BillingMeterSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingMetersId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BillingMeterSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdDeactivate: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingMetersIdEventSummaries: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        end_time: v.pipe(v.number(), v.integer()),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        start_time: v.pipe(v.number(), v.integer()),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdReactivate: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurations: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          is_default: v.boolean(),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurations: t.procedure
    .output(BillingPortalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(
      v.object({
        configuration: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(BillingPortalConfigurationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(BillingPortalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalSessions: t.procedure.output(BillingPortalSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Charges: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.string(),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.string(),
          transfer_group: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Charges: t.procedure.output(ChargeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ChargesSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesCharge: t.procedure
    .input(
      v.object({
        charge: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(ChargeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesCharge: t.procedure
    .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeCapture: t.procedure
    .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeDispute: t.procedure
    .input(
      v.object({
        charge: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(DisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDispute: t.procedure
    .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDisputeClose: t.procedure
    .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefund: t.procedure
    .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefunds: t.procedure
    .input(
      v.object({
        charge: v.string(),
        ending_before: v.optional(v.string()),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefunds: t.procedure
    .input(v.object({ charge: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefundsRefund: t.procedure
    .input(
      v.object({
        charge: v.string(),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        refund: v.string(),
      }),
    )
    .output(RefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefundsRefund: t.procedure
    .input(v.object({ charge: v.string(), refund: v.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessions: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_details: v.object({ email: v.string() }),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
          payment_link: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['complete', 'expired', 'open']),
          subscription: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessions: t.procedure.output(CheckoutSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CheckoutSessionsSession: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        session: v.pipe(v.string(), v.maxCodePoints(66)),
      }),
    )
    .output(CheckoutSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSession: t.procedure
    .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CheckoutSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSessionExpire: t.procedure
    .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CheckoutSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessionsSessionLineItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        session: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateOrders: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrders: t.procedure.output(ClimateOrderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ClimateOrdersOrder: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        order: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ClimateOrderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrder: t.procedure
    .input(v.object({ order: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ClimateOrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrderCancel: t.procedure
    .input(v.object({ order: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ClimateOrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProducts: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProductsProduct: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        product: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ClimateProductSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliers: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliersSupplier: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        supplier: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ClimateSupplierSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ConfirmationTokensConfirmationToken: t.procedure
    .input(
      v.object({
        confirmation_token: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(ConfirmationTokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecs: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecsCountry: t.procedure
    .input(
      v.object({
        country: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(CountrySpecSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Coupons: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Coupons: t.procedure.output(CouponSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CouponsCoupon: t.procedure
    .input(
      v.object({
        coupon: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(CouponSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CouponsCoupon: t.procedure
    .input(v.object({ coupon: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CouponSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CouponsCoupon: t.procedure
    .input(v.object({ coupon: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedCouponSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotes: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotes: t.procedure.output(CreditNoteSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CreditNotesPreview: t.procedure
    .input(
      v.object({
        amount: v.optional(v.pipe(v.number(), v.integer())),
        credit_amount: v.optional(v.pipe(v.number(), v.integer())),
        effective_at: v.optional(v.pipe(v.number(), v.integer())),
        email_type: v.optional(v.picklist(['credit_note', 'none'])),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
        lines: v.optional(
          v.array(
            v.object({
              amount: v.optional(v.pipe(v.number(), v.integer())),
              description: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              invoice_line_item: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              metadata: v.optional(v.record(v.string(), v.string())),
              quantity: v.optional(v.pipe(v.number(), v.integer())),
              tax_amounts: v.optional(
                v.union([
                  v.array(
                    v.object({
                      amount: v.pipe(v.number(), v.integer()),
                      tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)),
                      taxable_amount: v.pipe(v.number(), v.integer()),
                    }),
                  ),
                  v.literal(''),
                ]),
              ),
              tax_rates: v.optional(
                v.union([v.array(v.pipe(v.string(), v.maxCodePoints(5000))), v.literal('')]),
              ),
              type: v.picklist(['custom_line_item', 'invoice_line_item']),
              unit_amount: v.optional(v.pipe(v.number(), v.integer())),
              unit_amount_decimal: v.optional(v.string()),
            }),
          ),
        ),
        memo: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        metadata: v.optional(v.record(v.string(), v.string())),
        out_of_band_amount: v.optional(v.pipe(v.number(), v.integer())),
        reason: v.optional(
          v.picklist(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
        ),
        refund_amount: v.optional(v.pipe(v.number(), v.integer())),
        refunds: v.optional(
          v.array(
            v.partial(
              v.object({
                amount_refunded: v.pipe(v.number(), v.integer()),
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
        shipping_cost: v.optional(
          v.partial(v.object({ shipping_rate: v.pipe(v.string(), v.maxCodePoints(5000)) })),
        ),
      }),
    )
    .output(CreditNoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesPreviewLines: t.procedure
    .input(
      v.object({
        amount: v.optional(v.pipe(v.number(), v.integer())),
        credit_amount: v.optional(v.pipe(v.number(), v.integer())),
        effective_at: v.optional(v.pipe(v.number(), v.integer())),
        email_type: v.optional(v.picklist(['credit_note', 'none'])),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        lines: v.optional(
          v.array(
            v.object({
              amount: v.optional(v.pipe(v.number(), v.integer())),
              description: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              invoice_line_item: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
              metadata: v.optional(v.record(v.string(), v.string())),
              quantity: v.optional(v.pipe(v.number(), v.integer())),
              tax_amounts: v.optional(
                v.union([
                  v.array(
                    v.object({
                      amount: v.pipe(v.number(), v.integer()),
                      tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)),
                      taxable_amount: v.pipe(v.number(), v.integer()),
                    }),
                  ),
                  v.literal(''),
                ]),
              ),
              tax_rates: v.optional(
                v.union([v.array(v.pipe(v.string(), v.maxCodePoints(5000))), v.literal('')]),
              ),
              type: v.picklist(['custom_line_item', 'invoice_line_item']),
              unit_amount: v.optional(v.pipe(v.number(), v.integer())),
              unit_amount_decimal: v.optional(v.string()),
            }),
          ),
        ),
        memo: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        metadata: v.optional(v.record(v.string(), v.string())),
        out_of_band_amount: v.optional(v.pipe(v.number(), v.integer())),
        reason: v.optional(
          v.picklist(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
        ),
        refund_amount: v.optional(v.pipe(v.number(), v.integer())),
        refunds: v.optional(
          v.array(
            v.partial(
              v.object({
                amount_refunded: v.pipe(v.number(), v.integer()),
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
        shipping_cost: v.optional(
          v.partial(v.object({ shipping_rate: v.pipe(v.string(), v.maxCodePoints(5000)) })),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesCreditNoteLines: t.procedure
    .input(
      v.object({
        credit_note: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(CreditNoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CreditNoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesIdVoid: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CreditNoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomerSessions: t.procedure.output(CustomerSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Customers: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          email: v.pipe(v.string(), v.maxCodePoints(512)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          test_clock: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Customers: t.procedure.output(CustomerSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CustomersSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomer: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(v.union([CustomerSchema, DeletedCustomerSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomer: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CustomerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomer: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedCustomerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactions: t.procedure
    .input(
      v.object({
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoice: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactions: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CustomerBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        transaction: v.string(),
      }),
    )
    .output(CustomerBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(CustomerBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccounts: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.string()),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccounts: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BankAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(v.union([CardSchema, BankAccountSchema, SourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerBankAccountsId: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(v.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsIdVerify: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BankAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCards: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.string()),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCards: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCardsId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(CardSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCardsId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(v.union([CardSchema, BankAccountSchema, SourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerCardsId: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(v.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalance: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(CashBalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCashBalance: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CashBalanceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactions: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactionsTransaction: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        transaction: v.string(),
      }),
    )
    .output(CustomerCashBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerDiscount: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(DiscountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerDiscount: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerFundingInstructions: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FundingInstructionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethods: t.procedure
    .input(
      v.object({
        allow_redisplay: v.optional(v.picklist(['always', 'limited', 'unspecified'])),
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethodsPaymentMethod: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        payment_method: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentMethodSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSources: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.string()),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSources: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSourcesId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(500)),
      }),
    )
    .output(PaymentSourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(v.union([CardSchema, BankAccountSchema, SourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSourcesId: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(v.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesIdVerify: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(BankAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptions: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptions: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SubscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(DiscountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIds: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerTaxIds: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIdsId: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.string(),
      }),
    )
    .output(TaxIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerTaxIdsId: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)), id: v.string() }))
    .output(DeletedTaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Disputes: t.procedure
    .input(
      v.partial(
        v.object({
          charge: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1DisputesDispute: t.procedure
    .input(
      v.object({
        dispute: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(DisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDispute: t.procedure
    .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDisputeClose: t.procedure
    .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlements: t.procedure
    .input(
      v.object({
        customer: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlementsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(EntitlementsActiveEntitlementSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsFeatures: t.procedure
    .input(
      v.partial(
        v.object({
          archived: v.boolean(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          lookup_key: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeatures: t.procedure.output(EntitlementsFeatureSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1EntitlementsFeaturesId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(EntitlementsFeatureSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeaturesId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(EntitlementsFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EphemeralKeys: t.procedure.output(EphemeralKeySchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  deleteV1EphemeralKeysKey: t.procedure
    .input(v.object({ key: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(EphemeralKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Events: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          delivery_success: v.boolean(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.pipe(v.string(), v.maxCodePoints(5000)),
          types: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EventsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(EventSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRates: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRatesRateId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        rate_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ExchangeRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ExternalAccountsId: t.procedure
    .input(v.object({ id: v.string() }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FileLinks: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.string(),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          expired: v.boolean(),
          file: v.pipe(v.string(), v.maxCodePoints(5000)),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.string(),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinks: t.procedure.output(FileLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FileLinksLink: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        link: v.string(),
      }),
    )
    .output(FileLinkSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinksLink: t.procedure
    .input(v.object({ link: v.string() }))
    .output(FileLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Files: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          purpose: v.picklist([
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
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Files: t.procedure.output(FileSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FilesFile: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        file: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(FileSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccounts: t.procedure
    .input(
      v.partial(
        v.object({
          account_holder: v.partial(
            v.object({
              account: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
            }),
          ),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          session: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccount: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountDisconnect: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccountOwners: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountRefresh: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountSubscribe: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountUnsubscribe: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsSessions: t.procedure
    .output(FinancialConnectionsSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsSessionsSession: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        session: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(FinancialConnectionsSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactions: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        transacted_at: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        transaction_refresh: v.optional(
          v.object({ after: v.pipe(v.string(), v.maxCodePoints(5000)) }),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactionsTransaction: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(FinancialConnectionsTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ForwardingRequests: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.partial(
            v.object({
              gt: v.pipe(v.number(), v.integer()),
              gte: v.pipe(v.number(), v.integer()),
              lt: v.pipe(v.number(), v.integer()),
              lte: v.pipe(v.number(), v.integer()),
            }),
          ),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ForwardingRequests: t.procedure.output(ForwardingRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ForwardingRequestsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ForwardingRequestSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReports: t.procedure
    .input(
      v.partial(
        v.object({
          client_reference_id: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.picklist(['document', 'id_number']),
          verification_session: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReportsReport: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        report: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IdentityVerificationReportSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessions: t.procedure
    .input(
      v.partial(
        v.object({
          client_reference_id: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          related_customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          related_customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['canceled', 'processing', 'requires_input', 'verified']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessions: t.procedure
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessionsSession: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        session: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IdentityVerificationSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSession: t.procedure
    .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionCancel: t.procedure
    .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionRedact: t.procedure
    .input(v.object({ session: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePayments: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
          limit: v.pipe(v.number(), v.integer()),
          payment: v.object({
            payment_intent: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            payment_record: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            type: v.picklist(['payment_intent', 'payment_record']),
          }),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['canceled', 'open', 'paid']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePaymentsInvoicePayment: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoice_payment: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(InvoicePaymentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplates: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'archived']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplatesTemplate: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        template: v.pipe(v.string(), v.maxCodePoints(5000)),
        version: v.optional(v.pipe(v.number(), v.integer())),
      }),
    )
    .output(InvoiceRenderingTemplateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateArchive: t.procedure
    .input(v.object({ template: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceRenderingTemplateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateUnarchive: t.procedure
    .input(v.object({ template: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceRenderingTemplateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoiceitems: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
          limit: v.pipe(v.number(), v.integer()),
          pending: v.boolean(),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoiceitems: t.procedure.output(InvoiceitemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoiceitem: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(InvoiceitemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceitemsInvoiceitem: t.procedure
    .input(v.object({ invoiceitem: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceitemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoiceitemsInvoiceitem: t.procedure
    .input(v.object({ invoiceitem: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedInvoiceitemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoices: t.procedure
    .input(
      v.partial(
        v.object({
          collection_method: v.picklist(['charge_automatically', 'send_invoice']),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          due_date: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['draft', 'open', 'paid', 'uncollectible', 'void']),
          subscription: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoices: t.procedure.output(InvoiceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1InvoicesCreatePreview: t.procedure.output(InvoiceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1InvoicesSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoice: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(InvoiceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoice: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoicesInvoice: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedInvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAddLines: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAttachPayment: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceFinalize: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoiceLines: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceLinesLineItemId: t.procedure
    .input(
      v.object({
        invoice: v.pipe(v.string(), v.maxCodePoints(5000)),
        line_item_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(LineItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceMarkUncollectible: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoicePay: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceRemoveLines: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceSend: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceUpdateLines: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceVoid: t.procedure
    .input(v.object({ invoice: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizations: t.procedure
    .input(
      v.partial(
        v.object({
          card: v.pipe(v.string(), v.maxCodePoints(5000)),
          cardholder: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['closed', 'expired', 'pending', 'reversed']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizationsAuthorization: t.procedure
    .input(
      v.object({
        authorization: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorization: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationApprove: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationDecline: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCardholders: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          email: v.string(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          phone_number: v.string(),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'blocked', 'inactive']),
          type: v.picklist(['company', 'individual']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholders: t.procedure.output(IssuingCardholderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingCardholdersCardholder: t.procedure
    .input(
      v.object({
        cardholder: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(IssuingCardholderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholdersCardholder: t.procedure
    .input(v.object({ cardholder: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardholderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCards: t.procedure
    .input(
      v.partial(
        v.object({
          cardholder: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          exp_month: v.pipe(v.number(), v.integer()),
          exp_year: v.pipe(v.number(), v.integer()),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          last4: v.pipe(v.string(), v.maxCodePoints(5000)),
          limit: v.pipe(v.number(), v.integer()),
          personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'canceled', 'inactive']),
          type: v.picklist(['physical', 'virtual']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCards: t.procedure.output(IssuingCardSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingCardsCard: t.procedure
    .input(
      v.object({
        card: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(IssuingCardSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardsCard: t.procedure
    .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingDisputes: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['expired', 'lost', 'submitted', 'unsubmitted', 'won']),
          transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputes: t.procedure.output(IssuingDisputeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingDisputesDispute: t.procedure
    .input(
      v.object({
        dispute: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(IssuingDisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDispute: t.procedure
    .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingDisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDisputeSubmit: t.procedure
    .input(v.object({ dispute: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingDisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesigns: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          lookup_keys: v.array(v.pipe(v.string(), v.maxCodePoints(200))),
          preferences: v.partial(
            v.object({ is_default: v.boolean(), is_platform_default: v.boolean() }),
          ),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'inactive', 'rejected', 'review']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesigns: t.procedure
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundles: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'inactive', 'review']),
          type: v.picklist(['custom', 'standard']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundlesPhysicalBundle: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        physical_bundle: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IssuingPhysicalBundleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingSettlementsSettlement: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        settlement: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IssuingSettlementSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingSettlementsSettlement: t.procedure
    .input(v.object({ settlement: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingSettlementSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokens: t.procedure
    .input(
      v.object({
        card: v.pipe(v.string(), v.maxCodePoints(5000)),
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokensToken: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        token: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IssuingTokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTokensToken: t.procedure
    .input(v.object({ token: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingTokenSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactions: t.procedure
    .input(
      v.partial(
        v.object({
          card: v.pipe(v.string(), v.maxCodePoints(5000)),
          cardholder: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.picklist(['capture', 'refund']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactionsTransaction: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(IssuingTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTransactionsTransaction: t.procedure
    .input(v.object({ transaction: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkAccountSessions: t.procedure.output(FinancialConnectionsSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1LinkAccountSessionsSession: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        session: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(FinancialConnectionsSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccounts: t.procedure
    .input(
      v.partial(
        v.object({
          account_holder: v.partial(
            v.object({
              account: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer: v.pipe(v.string(), v.maxCodePoints(5000)),
              customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
            }),
          ),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          session: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccount: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountDisconnect: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccountOwners: t.procedure
    .input(
      v.object({
        account: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountRefresh: t.procedure
    .input(v.object({ account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1MandatesMandate: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        mandate: v.string(),
      }),
    )
    .output(MandateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecords: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecordsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentAttemptRecordSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntents: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntents: t.procedure.output(PaymentIntentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentIntentsSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntent: t.procedure
    .input(
      v.object({
        client_secret: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentIntentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntent: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntentAmountDetailsLineItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        intent: v.pipe(v.string(), v.maxCodePoints(5000)),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentApplyCustomerBalance: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCancel: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCapture: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentConfirm: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentIncrementAuthorization: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentVerifyMicrodeposits: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinks: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinks: t.procedure.output(PaymentLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentLinksPaymentLink: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        payment_link: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentLinkSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinksPaymentLink: t.procedure
    .input(v.object({ payment_link: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinksPaymentLinkLineItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        payment_link: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurations: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          application: v.union([v.pipe(v.string(), v.maxCodePoints(100)), v.literal('')]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurations: t.procedure
    .output(PaymentMethodConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(
      v.object({
        configuration: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(PaymentMethodConfigurationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentMethodConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodDomains: t.procedure
    .input(
      v.partial(
        v.object({
          domain_name: v.pipe(v.string(), v.maxCodePoints(5000)),
          enabled: v.boolean(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomains: t.procedure.output(PaymentMethodDomainSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        payment_method_domain: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentMethodDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(v.object({ payment_method_domain: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentMethodDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomainValidate: t.procedure
    .input(v.object({ payment_method_domain: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentMethodDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethods: t.procedure
    .input(
      v.partial(
        v.object({
          allow_redisplay: v.picklist(['always', 'limited', 'unspecified']),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.picklist([
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
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethods: t.procedure.output(PaymentMethodSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentMethodsPaymentMethod: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        payment_method: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentMethodSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethod: t.procedure
    .input(v.object({ payment_method: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodAttach: t.procedure
    .input(v.object({ payment_method: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodDetach: t.procedure
    .input(v.object({ payment_method: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentRecords: t.procedure
    .input(
      v.partial(
        v.object({
          created_after: v.pipe(v.number(), v.integer()),
          created_before: v.pipe(v.number(), v.integer()),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsReportPayment: t.procedure.output(PaymentRecordSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentRecordsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PaymentRecordSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttempt: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptCanceled: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptFailed: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptGuaranteed: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptInformational: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportRefund: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Payouts: t.procedure
    .input(
      v.partial(
        v.object({
          arrival_date: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          destination: v.string(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Payouts: t.procedure.output(PayoutSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PayoutsPayout: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        payout: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PayoutSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayout: t.procedure
    .input(v.object({ payout: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutCancel: t.procedure
    .input(v.object({ payout: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutReverse: t.procedure
    .input(v.object({ payout: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Plans: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          product: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Plans: t.procedure.output(PlanSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PlansPlan: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        plan: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PlanSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PlansPlan: t.procedure
    .input(v.object({ plan: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PlanSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1PlansPlan: t.procedure
    .input(v.object({ plan: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedPlanSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Prices: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          currency: v.string(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          lookup_keys: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          product: v.pipe(v.string(), v.maxCodePoints(5000)),
          recurring: v.partial(
            v.object({
              interval: v.picklist(['day', 'month', 'week', 'year']),
              meter: v.pipe(v.string(), v.maxCodePoints(5000)),
              usage_type: v.picklist(['licensed', 'metered']),
            }),
          ),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          type: v.picklist(['one_time', 'recurring']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Prices: t.procedure.output(PriceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PricesSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PricesPrice: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        price: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PriceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PricesPrice: t.procedure
    .input(v.object({ price: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PriceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffers: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          prices: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffers: t.procedure
    .output(ProductCatalogTrialOfferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffersId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ProductCatalogTrialOfferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffersId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ProductCatalogTrialOfferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Products: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          ids: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          shippable: v.boolean(),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          url: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Products: t.procedure.output(ProductSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ProductsSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ProductSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ProductSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedProductSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeatures: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        product: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsProductFeatures: t.procedure
    .input(v.object({ product: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ProductFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeaturesId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        product: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ProductFeatureSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsProductFeaturesId: t.procedure
    .input(
      v.object({
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        product: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(DeletedProductFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PromotionCodes: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          code: v.pipe(v.string(), v.maxCodePoints(5000)),
          coupon: v.pipe(v.string(), v.maxCodePoints(5000)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodes: t.procedure.output(PromotionCodeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PromotionCodesPromotionCode: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        promotion_code: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(PromotionCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodesPromotionCode: t.procedure
    .input(v.object({ promotion_code: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(PromotionCodeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Quotes: t.procedure
    .input(
      v.partial(
        v.object({
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['accepted', 'canceled', 'draft', 'open']),
          test_clock: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Quotes: t.procedure.output(QuoteSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1QuotesQuote: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        quote: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(QuoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuote: t.procedure
    .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteAccept: t.procedure
    .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteCancel: t.procedure
    .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteComputedUpfrontLineItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        quote: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteFinalize: t.procedure
    .input(v.object({ quote: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteLineItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        quote: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuotePdf: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        quote: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarnings: t.procedure
    .input(
      v.partial(
        v.object({
          charge: v.string(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
            v.pipe(
              v.string(),
              v.regex(/^\/v1\/radar\/early_fraud_warnings/),
              v.maxCodePoints(5000),
            ),
            v.description('The URL where this list can be accessed.'),
          ),
        }),
        v.description(''),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarningsEarlyFraudWarning: t.procedure
    .input(
      v.object({
        early_fraud_warning: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(RadarEarlyFraudWarningSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarPaymentEvaluations: t.procedure.output(RadarPaymentEvaluationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListItems: t.procedure
    .input(
      v.object({
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListItems: t.procedure.output(RadarValueListItemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListItemsItem: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        item: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(RadarValueListItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListItemsItem: t.procedure
    .input(v.object({ item: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedRadarValueListItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueLists: t.procedure
    .input(
      v.partial(
        v.object({
          alias: v.pipe(v.string(), v.maxCodePoints(100)),
          contains: v.pipe(v.string(), v.maxCodePoints(800)),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueLists: t.procedure.output(RadarValueListSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListsValueList: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        value_list: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(RadarValueListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListsValueList: t.procedure
    .input(v.object({ value_list: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(RadarValueListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListsValueList: t.procedure
    .input(v.object({ value_list: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedRadarValueListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Refunds: t.procedure
    .input(
      v.partial(
        v.object({
          charge: v.string(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.string(),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.string(),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Refunds: t.procedure.output(RefundSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RefundsRefund: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        refund: v.string(),
      }),
    )
    .output(RefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefund: t.procedure
    .input(v.object({ refund: v.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefundCancel: t.procedure
    .input(v.object({ refund: v.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportRuns: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReportingReportRuns: t.procedure.output(ReportingReportRunSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ReportingReportRunsReportRun: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        report_run: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ReportingReportRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypes: t.procedure
    .input(v.partial(v.object({ expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))) })))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypesReportType: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        report_type: v.string(),
      }),
    )
    .output(ReportingReportTypeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Reviews: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReviewsReview: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        review: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ReviewSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReviewsReviewApprove: t.procedure
    .input(v.object({ review: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ReviewSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupAttempts: t.procedure
    .input(
      v.object({
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupIntents: t.procedure
    .input(
      v.partial(
        v.object({
          attach_to_self: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          payment_method: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntents: t.procedure.output(SetupIntentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SetupIntentsIntent: t.procedure
    .input(
      v.object({
        client_secret: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SetupIntentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntent: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentCancel: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentConfirm: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentVerifyMicrodeposits: t.procedure
    .input(v.object({ intent: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ShippingRates: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          currency: v.string(),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRates: t.procedure.output(ShippingRateSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ShippingRatesShippingRateToken: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        shipping_rate_token: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ShippingRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRatesShippingRateToken: t.procedure
    .input(v.object({ shipping_rate_token: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ShippingRateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SigmaSavedQueriesId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SigmaSigmaApiQuerySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRuns: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
            v.pipe(
              v.string(),
              v.regex(/^\/v1\/sigma\/scheduled_query_runs/),
              v.maxCodePoints(5000),
            ),
            v.description('The URL where this list can be accessed.'),
          ),
        }),
        v.description(''),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRunsScheduledQueryRun: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        scheduled_query_run: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(ScheduledQueryRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Sources: t.procedure.output(SourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SourcesSource: t.procedure
    .input(
      v.object({
        client_secret: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        source: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSource: t.procedure
    .input(v.object({ source: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceMandateNotificationsMandateNotification: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        mandate_notification: v.pipe(v.string(), v.maxCodePoints(5000)),
        source: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SourceMandateNotificationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactions: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        source: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactionsSourceTransaction: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        source: v.pipe(v.string(), v.maxCodePoints(5000)),
        source_transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SourceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSourceVerify: t.procedure
    .input(v.object({ source: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.string()),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItems: t.procedure.output(SubscriptionItemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionItemsItem: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        item: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SubscriptionItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItemsItem: t.procedure
    .input(v.object({ item: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionItemsItem: t.procedure
    .input(v.object({ item: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedSubscriptionItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionSchedules: t.procedure
    .input(
      v.partial(
        v.object({
          canceled_at: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          completed_at: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          released_at: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          scheduled: v.boolean(),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedules: t.procedure.output(SubscriptionScheduleSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionSchedulesSchedule: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        schedule: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SubscriptionScheduleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesSchedule: t.procedure
    .input(v.object({ schedule: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleCancel: t.procedure
    .input(v.object({ schedule: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleRelease: t.procedure
    .input(v.object({ schedule: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Subscriptions: t.procedure
    .input(
      v.partial(
        v.object({
          automatic_tax: v.object({ enabled: v.boolean() }),
          collection_method: v.picklist(['charge_automatically', 'send_invoice']),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          current_period_end: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          current_period_start: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          customer: v.pipe(v.string(), v.maxCodePoints(5000)),
          customer_account: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          price: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist([
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
          test_clock: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Subscriptions: t.procedure.output(SubscriptionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionsSearch: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(SubscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(v.object({ subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(v.object({ subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(v.object({ subscription_exposed_id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionMigrate: t.procedure
    .input(v.object({ subscription: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionPause: t.procedure
    .input(v.object({ subscription: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionResume: t.procedure
    .input(v.object({ subscription: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxAssociationsFind: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        payment_intent: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxAssociationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxCalculations: t.procedure.output(TaxCalculationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxCalculationsCalculation: t.procedure
    .input(
      v.object({
        calculation: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(TaxCalculationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCalculationsCalculationLineItems: t.procedure
    .input(
      v.object({
        calculation: v.pipe(v.string(), v.maxCodePoints(5000)),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxLocations: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxLocations: t.procedure.output(TaxLocationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxLocationsLocation: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        location: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxLocationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRegistrations: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['active', 'all', 'expired', 'scheduled']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrations: t.procedure.output(TaxRegistrationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRegistrationsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxRegistrationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrationsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TaxRegistrationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxSettings: t.procedure
    .input(v.partial(v.object({ expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))) })))
    .output(TaxSettingsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxSettings: t.procedure.output(TaxSettingsSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TaxTransactionsCreateFromCalculation: t.procedure
    .output(TaxTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxTransactionsCreateReversal: t.procedure.output(TaxTransactionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxTransactionsTransaction: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxTransactionsTransactionLineItems: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(500))),
        transaction: v.pipe(v.string(), v.maxCodePoints(5000)),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodes: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.string(),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.string(),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodesId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxIds: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          owner: v.object({
            account: v.optional(v.string()),
            customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            customer_account: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
            type: v.picklist(['account', 'application', 'customer', 'self']),
          }),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxIds: t.procedure.output(TaxIdSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxIdsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TaxIdsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedTaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRates: t.procedure
    .input(
      v.partial(
        v.object({
          active: v.boolean(),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          inclusive: v.boolean(),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRates: t.procedure.output(TaxRateSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRatesTaxRate: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TaxRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRatesTaxRate: t.procedure
    .input(v.object({ tax_rate: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TaxRateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalConfigurations: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          is_account_default: v.boolean(),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurations: t.procedure.output(TerminalConfigurationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      v.object({
        configuration: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(v.union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurationsConfiguration: t.procedure
    .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(v.union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalConfigurationsConfiguration: t.procedure
    .input(v.object({ configuration: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedTerminalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConnectionTokens: t.procedure.output(TerminalConnectionTokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalLocations: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocations: t.procedure.output(TerminalLocationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalLocationsLocation: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        location: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(v.union([TerminalLocationSchema, DeletedTerminalLocationSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocationsLocation: t.procedure
    .input(v.object({ location: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(v.union([TerminalLocationSchema, DeletedTerminalLocationSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalLocationsLocation: t.procedure
    .input(v.object({ location: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedTerminalLocationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalOnboardingLinks: t.procedure.output(TerminalOnboardingLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalReaders: t.procedure
    .input(
      v.partial(
        v.object({
          device_type: v.picklist([
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
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          location: v.pipe(v.string(), v.maxCodePoints(5000)),
          serial_number: v.pipe(v.string(), v.maxCodePoints(5000)),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['offline', 'online']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReaders: t.procedure.output(TerminalReaderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalReadersReader: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        reader: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(v.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReader: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(v.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalReadersReader: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedTerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCancelAction: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(v.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectInputs: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectPaymentMethod: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderConfirmPaymentIntent: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessPaymentIntent: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessSetupIntent: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderRefundPayment: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderSetReaderDisplay: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalRefunds: t.procedure.output(TerminalRefundSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersConfirmationTokens: t.procedure.output(ConfirmationTokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersCustomersCustomerFundCashBalance: t.procedure
    .input(v.object({ customer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(CustomerCashBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizations: t.procedure
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationCapture: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationExpire: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationIncrement: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationReverse: t.procedure
    .input(v.object({ authorization: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingDeliver: t.procedure
    .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingFail: t.procedure
    .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingReturn: t.procedure
    .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingShip: t.procedure
    .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingSubmit: t.procedure
    .input(v.object({ card: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate: t.procedure
    .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate: t.procedure
    .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject: t.procedure
    .input(v.object({ personalization_design: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingSettlements: t.procedure.output(IssuingSettlementSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersIssuingSettlementsSettlementComplete: t.procedure
    .input(v.object({ settlement: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingSettlementSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsCreateForceCapture: t.procedure
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsCreateUnlinkedRefund: t.procedure
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsTransactionRefund: t.procedure
    .input(v.object({ transaction: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersRefundsRefundExpire: t.procedure
    .input(v.object({ refund: v.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderPresentPaymentMethod: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderSucceedInputCollection: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderTimeoutInputCollection: t.procedure
    .input(v.object({ reader: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TestHelpersTestClocks: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocks: t.procedure.output(TestHelpersTestClockSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TestHelpersTestClocksTestClock: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        test_clock: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TestHelpersTestClockSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TestHelpersTestClocksTestClock: t.procedure
    .input(v.object({ test_clock: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedTestHelpersTestClockSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocksTestClockAdvance: t.procedure
    .input(v.object({ test_clock: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TestHelpersTestClockSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdFail: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdReturn: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdSucceed: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsId: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdFail: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdPost: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdReturn: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFail: t.procedure
    .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPost: t.procedure
    .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturn: t.procedure
    .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryReceivedCredits: t.procedure
    .output(TreasuryReceivedCreditSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryReceivedDebits: t.procedure
    .output(TreasuryReceivedDebitSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ThreeDSecureAuthentications: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist([
            'canceled',
            'error',
            'failed',
            'requires_challenge',
            'requires_submission',
            'succeeded',
          ]),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthentications: t.procedure
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ThreeDSecureAuthenticationsAuthentication: t.procedure
    .input(
      v.object({
        authentication: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(ThreeDSecureAuthenticationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationCancel: t.procedure
    .input(v.object({ authentication: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationSubmit: t.procedure
    .input(v.object({ authentication: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Tokens: t.procedure.output(TokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TokensToken: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        token: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Topups: t.procedure
    .input(
      v.partial(
        v.object({
          amount: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['canceled', 'failed', 'pending', 'succeeded']),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Topups: t.procedure.output(TopupSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TopupsTopup: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        topup: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TopupSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopup: t.procedure
    .input(v.object({ topup: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TopupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopupCancel: t.procedure
    .input(v.object({ topup: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TopupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Transfers: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          destination: v.pipe(v.string(), v.maxCodePoints(5000)),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          transfer_group: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Transfers: t.procedure.output(TransferSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TransfersIdReversals: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
      }),
    )
    .output(
      v.pipe(
        v.object({
          data: v.pipe(
            v.array(TransferReversalSchema),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersIdReversals: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TransferReversalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransfer: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransfer: t.procedure
    .input(v.object({ transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransferReversalsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TransferReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransferReversalsId: t.procedure
    .input(
      v.object({
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
        transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TransferReversalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryCreditReversals: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryCreditReversals: t.procedure.output(TreasuryCreditReversalSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryCreditReversalsCreditReversal: t.procedure
    .input(
      v.object({
        credit_reversal: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(TreasuryCreditReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryDebitReversals: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryDebitReversals: t.procedure.output(TreasuryDebitReversalSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryDebitReversalsDebitReversal: t.procedure
    .input(
      v.object({
        debit_reversal: v.pipe(v.string(), v.maxCodePoints(5000)),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
      }),
    )
    .output(TreasuryDebitReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccounts: t.procedure
    .input(
      v.partial(
        v.object({
          created: v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
          status: v.picklist(['closed', 'open']),
        }),
      ),
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
            v.pipe(
              v.string(),
              v.regex(/^\/v1\/treasury\/financial_accounts/),
              v.maxCodePoints(5000),
            ),
            v.description('The URL where this list can be accessed.'),
          ),
        }),
        v.description(''),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccounts: t.procedure
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryFinancialAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(v.object({ financial_account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountClose: t.procedure
    .input(v.object({ financial_account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryFinancialAccountFeaturesSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(v.object({ financial_account: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryFinancialAccountFeaturesSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryInboundTransfers: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfers: t.procedure.output(TreasuryInboundTransferSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryInboundTransfersId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryInboundTransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfersInboundTransferCancel: t.procedure
    .input(v.object({ inbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundPayments: t.procedure
    .input(
      v.object({
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        customer: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
            v.pipe(
              v.string(),
              v.regex(/^\/v1\/treasury\/outbound_payments/),
              v.maxCodePoints(5000),
            ),
            v.description('The URL where this list can be accessed.'),
          ),
        }),
        v.description(''),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPayments: t.procedure.output(TreasuryOutboundPaymentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryOutboundPaymentsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPaymentsIdCancel: t.procedure
    .input(v.object({ id: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfers: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfers: t.procedure
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfersOutboundTransferCancel: t.procedure
    .input(v.object({ outbound_transfer: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCredits: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        linked_flows: v.optional(
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCreditsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryReceivedCreditSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebits: t.procedure
    .input(
      v.object({
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebitsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryReceivedDebitSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntries: t.procedure
    .input(
      v.object({
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        effective_at: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntriesId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryTransactionEntrySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactions: t.procedure
    .input(
      v.object({
        created: v.optional(
          v.union([
            v.partial(
              v.object({
                gt: v.pipe(v.number(), v.integer()),
                gte: v.pipe(v.number(), v.integer()),
                lt: v.pipe(v.number(), v.integer()),
                lte: v.pipe(v.number(), v.integer()),
              }),
            ),
            v.pipe(v.number(), v.integer()),
          ]),
        ),
        ending_before: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        financial_account: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        order_by: v.optional(v.picklist(['created', 'posted_at'])),
        starting_after: v.optional(v.pipe(v.string(), v.maxCodePoints(5000))),
        status: v.optional(v.picklist(['open', 'posted', 'void'])),
        status_transitions: v.optional(
          v.partial(
            v.object({
              posted_at: v.union([
                v.partial(
                  v.object({
                    gt: v.pipe(v.number(), v.integer()),
                    gte: v.pipe(v.number(), v.integer()),
                    lt: v.pipe(v.number(), v.integer()),
                    lte: v.pipe(v.number(), v.integer()),
                  }),
                ),
                v.pipe(v.number(), v.integer()),
              ]),
            }),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionsId: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        id: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(TreasuryTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1WebhookEndpoints: t.procedure
    .input(
      v.partial(
        v.object({
          ending_before: v.pipe(v.string(), v.maxCodePoints(5000)),
          expand: v.array(v.pipe(v.string(), v.maxCodePoints(5000))),
          limit: v.pipe(v.number(), v.integer()),
          starting_after: v.pipe(v.string(), v.maxCodePoints(5000)),
        }),
      ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpoints: t.procedure.output(WebhookEndpointSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      v.object({
        expand: v.optional(v.array(v.pipe(v.string(), v.maxCodePoints(5000)))),
        webhook_endpoint: v.pipe(v.string(), v.maxCodePoints(5000)),
      }),
    )
    .output(WebhookEndpointSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(v.object({ webhook_endpoint: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(WebhookEndpointSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(v.object({ webhook_endpoint: v.pipe(v.string(), v.maxCodePoints(5000)) }))
    .output(DeletedWebhookEndpointSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
