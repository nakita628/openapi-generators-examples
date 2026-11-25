import { Hono } from 'hono'
import {
  getV1AccountHandler,
  postV1AccountLinksHandler,
  postV1AccountSessionsHandler,
  getV1AccountsHandler,
  postV1AccountsHandler,
  getV1AccountsAccountHandler,
  postV1AccountsAccountHandler,
  deleteV1AccountsAccountHandler,
  postV1AccountsAccountBankAccountsHandler,
  getV1AccountsAccountBankAccountsIdHandler,
  postV1AccountsAccountBankAccountsIdHandler,
  deleteV1AccountsAccountBankAccountsIdHandler,
  getV1AccountsAccountCapabilitiesHandler,
  getV1AccountsAccountCapabilitiesCapabilityHandler,
  postV1AccountsAccountCapabilitiesCapabilityHandler,
  getV1AccountsAccountExternalAccountsHandler,
  postV1AccountsAccountExternalAccountsHandler,
  getV1AccountsAccountExternalAccountsIdHandler,
  postV1AccountsAccountExternalAccountsIdHandler,
  deleteV1AccountsAccountExternalAccountsIdHandler,
  postV1AccountsAccountLoginLinksHandler,
  getV1AccountsAccountPeopleHandler,
  postV1AccountsAccountPeopleHandler,
  getV1AccountsAccountPeoplePersonHandler,
  postV1AccountsAccountPeoplePersonHandler,
  deleteV1AccountsAccountPeoplePersonHandler,
  getV1AccountsAccountPersonsHandler,
  postV1AccountsAccountPersonsHandler,
  getV1AccountsAccountPersonsPersonHandler,
  postV1AccountsAccountPersonsPersonHandler,
  deleteV1AccountsAccountPersonsPersonHandler,
  postV1AccountsAccountRejectHandler,
  postV1AccountsAccountUnrejectHandler,
  getV1ApplePayDomainsHandler,
  postV1ApplePayDomainsHandler,
  getV1ApplePayDomainsDomainHandler,
  deleteV1ApplePayDomainsDomainHandler,
  getV1ApplicationFeesHandler,
  getV1ApplicationFeesFeeRefundsIdHandler,
  postV1ApplicationFeesFeeRefundsIdHandler,
  getV1ApplicationFeesIdHandler,
  postV1ApplicationFeesIdRefundHandler,
  getV1ApplicationFeesIdRefundsHandler,
  postV1ApplicationFeesIdRefundsHandler,
  getV1AppsInstallsHandler,
  postV1AppsInstallsHandler,
  getV1AppsInstallsIdHandler,
  postV1AppsInstallsIdHandler,
  postV1AppsInstallsIdUninstallHandler,
  getV1AppsSecretsHandler,
  postV1AppsSecretsHandler,
  postV1AppsSecretsDeleteHandler,
  getV1AppsSecretsFindHandler,
  getV1BalanceHandler,
  getV1BalanceHistoryHandler,
  getV1BalanceHistoryIdHandler,
  getV1BalanceSettingsHandler,
  postV1BalanceSettingsHandler,
  getV1BalanceTransactionsHandler,
  getV1BalanceTransactionsIdHandler,
  getV1BillingAlertsHandler,
  postV1BillingAlertsHandler,
  getV1BillingAlertsIdHandler,
  postV1BillingAlertsIdActivateHandler,
  postV1BillingAlertsIdArchiveHandler,
  postV1BillingAlertsIdDeactivateHandler,
  getV1BillingCreditBalanceSummaryHandler,
  getV1BillingCreditBalanceTransactionsHandler,
  getV1BillingCreditBalanceTransactionsIdHandler,
  getV1BillingCreditGrantsHandler,
  postV1BillingCreditGrantsHandler,
  getV1BillingCreditGrantsIdHandler,
  postV1BillingCreditGrantsIdHandler,
  postV1BillingCreditGrantsIdExpireHandler,
  postV1BillingCreditGrantsIdVoidHandler,
  getV1BillingFeedbackOptionsHandler,
  postV1BillingFeedbackOptionsHandler,
  getV1BillingFeedbackOptionsIdHandler,
  postV1BillingFeedbackOptionsIdHandler,
  postV1BillingFeedbackOptionsIdDeactivateHandler,
  postV1BillingMeterEventAdjustmentsHandler,
  postV1BillingMeterEventsHandler,
  getV1BillingMetersHandler,
  postV1BillingMetersHandler,
  getV1BillingMetersIdHandler,
  postV1BillingMetersIdHandler,
  postV1BillingMetersIdDeactivateHandler,
  getV1BillingMetersIdEventSummariesHandler,
  postV1BillingMetersIdReactivateHandler,
  getV1BillingPortalConfigurationsHandler,
  postV1BillingPortalConfigurationsHandler,
  getV1BillingPortalConfigurationsConfigurationHandler,
  postV1BillingPortalConfigurationsConfigurationHandler,
  postV1BillingPortalSessionsHandler,
  getV1ChargesHandler,
  postV1ChargesHandler,
  getV1ChargesSearchHandler,
  getV1ChargesChargeHandler,
  postV1ChargesChargeHandler,
  postV1ChargesChargeCaptureHandler,
  getV1ChargesChargeDisputeHandler,
  postV1ChargesChargeDisputeHandler,
  postV1ChargesChargeDisputeCloseHandler,
  postV1ChargesChargeRefundHandler,
  getV1ChargesChargeRefundsHandler,
  postV1ChargesChargeRefundsHandler,
  getV1ChargesChargeRefundsRefundHandler,
  postV1ChargesChargeRefundsRefundHandler,
  getV1CheckoutSessionsHandler,
  postV1CheckoutSessionsHandler,
  getV1CheckoutSessionsSessionHandler,
  postV1CheckoutSessionsSessionHandler,
  postV1CheckoutSessionsSessionExpireHandler,
  getV1CheckoutSessionsSessionLineItemsHandler,
  getV1ClimateOrdersHandler,
  postV1ClimateOrdersHandler,
  getV1ClimateOrdersOrderHandler,
  postV1ClimateOrdersOrderHandler,
  postV1ClimateOrdersOrderCancelHandler,
  getV1ClimateProductsHandler,
  getV1ClimateProductsProductHandler,
  getV1ClimateSuppliersHandler,
  getV1ClimateSuppliersSupplierHandler,
  getV1ConfirmationTokensConfirmationTokenHandler,
  getV1CountrySpecsHandler,
  getV1CountrySpecsCountryHandler,
  getV1CouponsHandler,
  postV1CouponsHandler,
  getV1CouponsCouponHandler,
  postV1CouponsCouponHandler,
  deleteV1CouponsCouponHandler,
  getV1CreditNotesHandler,
  postV1CreditNotesHandler,
  getV1CreditNotesPreviewHandler,
  getV1CreditNotesPreviewLinesHandler,
  getV1CreditNotesCreditNoteLinesHandler,
  getV1CreditNotesIdHandler,
  postV1CreditNotesIdHandler,
  postV1CreditNotesIdVoidHandler,
  postV1CustomerSessionsHandler,
  getV1CustomersHandler,
  postV1CustomersHandler,
  getV1CustomersSearchHandler,
  getV1CustomersCustomerHandler,
  postV1CustomersCustomerHandler,
  deleteV1CustomersCustomerHandler,
  getV1CustomersCustomerBalanceTransactionsHandler,
  postV1CustomersCustomerBalanceTransactionsHandler,
  getV1CustomersCustomerBalanceTransactionsTransactionHandler,
  postV1CustomersCustomerBalanceTransactionsTransactionHandler,
  getV1CustomersCustomerBankAccountsHandler,
  postV1CustomersCustomerBankAccountsHandler,
  getV1CustomersCustomerBankAccountsIdHandler,
  postV1CustomersCustomerBankAccountsIdHandler,
  deleteV1CustomersCustomerBankAccountsIdHandler,
  postV1CustomersCustomerBankAccountsIdVerifyHandler,
  getV1CustomersCustomerCardsHandler,
  postV1CustomersCustomerCardsHandler,
  getV1CustomersCustomerCardsIdHandler,
  postV1CustomersCustomerCardsIdHandler,
  deleteV1CustomersCustomerCardsIdHandler,
  getV1CustomersCustomerCashBalanceHandler,
  postV1CustomersCustomerCashBalanceHandler,
  getV1CustomersCustomerCashBalanceTransactionsHandler,
  getV1CustomersCustomerCashBalanceTransactionsTransactionHandler,
  getV1CustomersCustomerDiscountHandler,
  deleteV1CustomersCustomerDiscountHandler,
  postV1CustomersCustomerFundingInstructionsHandler,
  getV1CustomersCustomerPaymentMethodsHandler,
  getV1CustomersCustomerPaymentMethodsPaymentMethodHandler,
  getV1CustomersCustomerSourcesHandler,
  postV1CustomersCustomerSourcesHandler,
  getV1CustomersCustomerSourcesIdHandler,
  postV1CustomersCustomerSourcesIdHandler,
  deleteV1CustomersCustomerSourcesIdHandler,
  postV1CustomersCustomerSourcesIdVerifyHandler,
  getV1CustomersCustomerSubscriptionsHandler,
  postV1CustomersCustomerSubscriptionsHandler,
  getV1CustomersCustomerSubscriptionsSubscriptionExposedIdHandler,
  postV1CustomersCustomerSubscriptionsSubscriptionExposedIdHandler,
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdHandler,
  getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscountHandler,
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscountHandler,
  getV1CustomersCustomerTaxIdsHandler,
  postV1CustomersCustomerTaxIdsHandler,
  getV1CustomersCustomerTaxIdsIdHandler,
  deleteV1CustomersCustomerTaxIdsIdHandler,
  getV1DisputesHandler,
  getV1DisputesDisputeHandler,
  postV1DisputesDisputeHandler,
  postV1DisputesDisputeCloseHandler,
  getV1EntitlementsActiveEntitlementsHandler,
  getV1EntitlementsActiveEntitlementsIdHandler,
  getV1EntitlementsFeaturesHandler,
  postV1EntitlementsFeaturesHandler,
  getV1EntitlementsFeaturesIdHandler,
  postV1EntitlementsFeaturesIdHandler,
  postV1EphemeralKeysHandler,
  deleteV1EphemeralKeysKeyHandler,
  getV1EventsHandler,
  getV1EventsIdHandler,
  getV1ExchangeRatesHandler,
  getV1ExchangeRatesRateIdHandler,
  postV1ExternalAccountsIdHandler,
  getV1FileLinksHandler,
  postV1FileLinksHandler,
  getV1FileLinksLinkHandler,
  postV1FileLinksLinkHandler,
  getV1FilesHandler,
  postV1FilesHandler,
  getV1FilesFileHandler,
  getV1FinancialConnectionsAccountsHandler,
  getV1FinancialConnectionsAccountsAccountHandler,
  postV1FinancialConnectionsAccountsAccountDisconnectHandler,
  getV1FinancialConnectionsAccountsAccountOwnersHandler,
  postV1FinancialConnectionsAccountsAccountRefreshHandler,
  postV1FinancialConnectionsAccountsAccountSubscribeHandler,
  postV1FinancialConnectionsAccountsAccountUnsubscribeHandler,
  postV1FinancialConnectionsSessionsHandler,
  getV1FinancialConnectionsSessionsSessionHandler,
  getV1FinancialConnectionsTransactionsHandler,
  getV1FinancialConnectionsTransactionsTransactionHandler,
  getV1ForwardingRequestsHandler,
  postV1ForwardingRequestsHandler,
  getV1ForwardingRequestsIdHandler,
  getV1IdentityVerificationReportsHandler,
  getV1IdentityVerificationReportsReportHandler,
  getV1IdentityVerificationSessionsHandler,
  postV1IdentityVerificationSessionsHandler,
  getV1IdentityVerificationSessionsSessionHandler,
  postV1IdentityVerificationSessionsSessionHandler,
  postV1IdentityVerificationSessionsSessionCancelHandler,
  postV1IdentityVerificationSessionsSessionRedactHandler,
  getV1InvoicePaymentsHandler,
  getV1InvoicePaymentsInvoicePaymentHandler,
  getV1InvoiceRenderingTemplatesHandler,
  getV1InvoiceRenderingTemplatesTemplateHandler,
  postV1InvoiceRenderingTemplatesTemplateArchiveHandler,
  postV1InvoiceRenderingTemplatesTemplateUnarchiveHandler,
  getV1InvoiceitemsHandler,
  postV1InvoiceitemsHandler,
  getV1InvoiceitemsInvoiceitemHandler,
  postV1InvoiceitemsInvoiceitemHandler,
  deleteV1InvoiceitemsInvoiceitemHandler,
  getV1InvoicesHandler,
  postV1InvoicesHandler,
  postV1InvoicesCreatePreviewHandler,
  getV1InvoicesSearchHandler,
  getV1InvoicesInvoiceHandler,
  postV1InvoicesInvoiceHandler,
  deleteV1InvoicesInvoiceHandler,
  postV1InvoicesInvoiceAddLinesHandler,
  postV1InvoicesInvoiceAttachPaymentHandler,
  postV1InvoicesInvoiceFinalizeHandler,
  getV1InvoicesInvoiceLinesHandler,
  postV1InvoicesInvoiceLinesLineItemIdHandler,
  postV1InvoicesInvoiceMarkUncollectibleHandler,
  postV1InvoicesInvoicePayHandler,
  postV1InvoicesInvoiceRemoveLinesHandler,
  postV1InvoicesInvoiceSendHandler,
  postV1InvoicesInvoiceUpdateLinesHandler,
  postV1InvoicesInvoiceVoidHandler,
  getV1IssuingAuthorizationsHandler,
  getV1IssuingAuthorizationsAuthorizationHandler,
  postV1IssuingAuthorizationsAuthorizationHandler,
  postV1IssuingAuthorizationsAuthorizationApproveHandler,
  postV1IssuingAuthorizationsAuthorizationDeclineHandler,
  getV1IssuingCardholdersHandler,
  postV1IssuingCardholdersHandler,
  getV1IssuingCardholdersCardholderHandler,
  postV1IssuingCardholdersCardholderHandler,
  getV1IssuingCardsHandler,
  postV1IssuingCardsHandler,
  getV1IssuingCardsCardHandler,
  postV1IssuingCardsCardHandler,
  getV1IssuingDisputesHandler,
  postV1IssuingDisputesHandler,
  getV1IssuingDisputesDisputeHandler,
  postV1IssuingDisputesDisputeHandler,
  postV1IssuingDisputesDisputeSubmitHandler,
  getV1IssuingPersonalizationDesignsHandler,
  postV1IssuingPersonalizationDesignsHandler,
  getV1IssuingPersonalizationDesignsPersonalizationDesignHandler,
  postV1IssuingPersonalizationDesignsPersonalizationDesignHandler,
  getV1IssuingPhysicalBundlesHandler,
  getV1IssuingPhysicalBundlesPhysicalBundleHandler,
  getV1IssuingSettlementsSettlementHandler,
  postV1IssuingSettlementsSettlementHandler,
  getV1IssuingTokensHandler,
  getV1IssuingTokensTokenHandler,
  postV1IssuingTokensTokenHandler,
  getV1IssuingTransactionsHandler,
  getV1IssuingTransactionsTransactionHandler,
  postV1IssuingTransactionsTransactionHandler,
  postV1LinkAccountSessionsHandler,
  getV1LinkAccountSessionsSessionHandler,
  getV1LinkedAccountsHandler,
  getV1LinkedAccountsAccountHandler,
  postV1LinkedAccountsAccountDisconnectHandler,
  getV1LinkedAccountsAccountOwnersHandler,
  postV1LinkedAccountsAccountRefreshHandler,
  getV1MandatesMandateHandler,
  getV1PaymentAttemptRecordsHandler,
  getV1PaymentAttemptRecordsIdHandler,
  getV1PaymentIntentsHandler,
  postV1PaymentIntentsHandler,
  getV1PaymentIntentsSearchHandler,
  getV1PaymentIntentsIntentHandler,
  postV1PaymentIntentsIntentHandler,
  getV1PaymentIntentsIntentAmountDetailsLineItemsHandler,
  postV1PaymentIntentsIntentApplyCustomerBalanceHandler,
  postV1PaymentIntentsIntentCancelHandler,
  postV1PaymentIntentsIntentCaptureHandler,
  postV1PaymentIntentsIntentConfirmHandler,
  postV1PaymentIntentsIntentIncrementAuthorizationHandler,
  postV1PaymentIntentsIntentVerifyMicrodepositsHandler,
  getV1PaymentLinksHandler,
  postV1PaymentLinksHandler,
  getV1PaymentLinksPaymentLinkHandler,
  postV1PaymentLinksPaymentLinkHandler,
  getV1PaymentLinksPaymentLinkLineItemsHandler,
  getV1PaymentMethodConfigurationsHandler,
  postV1PaymentMethodConfigurationsHandler,
  getV1PaymentMethodConfigurationsConfigurationHandler,
  postV1PaymentMethodConfigurationsConfigurationHandler,
  getV1PaymentMethodDomainsHandler,
  postV1PaymentMethodDomainsHandler,
  getV1PaymentMethodDomainsPaymentMethodDomainHandler,
  postV1PaymentMethodDomainsPaymentMethodDomainHandler,
  postV1PaymentMethodDomainsPaymentMethodDomainValidateHandler,
  getV1PaymentMethodsHandler,
  postV1PaymentMethodsHandler,
  getV1PaymentMethodsPaymentMethodHandler,
  postV1PaymentMethodsPaymentMethodHandler,
  postV1PaymentMethodsPaymentMethodAttachHandler,
  postV1PaymentMethodsPaymentMethodDetachHandler,
  getV1PaymentRecordsHandler,
  postV1PaymentRecordsReportPaymentHandler,
  getV1PaymentRecordsIdHandler,
  postV1PaymentRecordsIdReportPaymentAttemptHandler,
  postV1PaymentRecordsIdReportPaymentAttemptCanceledHandler,
  postV1PaymentRecordsIdReportPaymentAttemptFailedHandler,
  postV1PaymentRecordsIdReportPaymentAttemptGuaranteedHandler,
  postV1PaymentRecordsIdReportPaymentAttemptInformationalHandler,
  postV1PaymentRecordsIdReportRefundHandler,
  getV1PayoutsHandler,
  postV1PayoutsHandler,
  getV1PayoutsPayoutHandler,
  postV1PayoutsPayoutHandler,
  postV1PayoutsPayoutCancelHandler,
  postV1PayoutsPayoutReverseHandler,
  getV1PlansHandler,
  postV1PlansHandler,
  getV1PlansPlanHandler,
  postV1PlansPlanHandler,
  deleteV1PlansPlanHandler,
  getV1PricesHandler,
  postV1PricesHandler,
  getV1PricesSearchHandler,
  getV1PricesPriceHandler,
  postV1PricesPriceHandler,
  getV1ProductCatalogTrialOffersHandler,
  postV1ProductCatalogTrialOffersHandler,
  getV1ProductCatalogTrialOffersIdHandler,
  postV1ProductCatalogTrialOffersIdHandler,
  getV1ProductsHandler,
  postV1ProductsHandler,
  getV1ProductsSearchHandler,
  getV1ProductsIdHandler,
  postV1ProductsIdHandler,
  deleteV1ProductsIdHandler,
  getV1ProductsProductFeaturesHandler,
  postV1ProductsProductFeaturesHandler,
  getV1ProductsProductFeaturesIdHandler,
  deleteV1ProductsProductFeaturesIdHandler,
  getV1PromotionCodesHandler,
  postV1PromotionCodesHandler,
  getV1PromotionCodesPromotionCodeHandler,
  postV1PromotionCodesPromotionCodeHandler,
  getV1QuotesHandler,
  postV1QuotesHandler,
  getV1QuotesQuoteHandler,
  postV1QuotesQuoteHandler,
  postV1QuotesQuoteAcceptHandler,
  postV1QuotesQuoteCancelHandler,
  getV1QuotesQuoteComputedUpfrontLineItemsHandler,
  postV1QuotesQuoteFinalizeHandler,
  getV1QuotesQuoteLineItemsHandler,
  getV1QuotesQuotePdfHandler,
  getV1RadarEarlyFraudWarningsHandler,
  getV1RadarEarlyFraudWarningsEarlyFraudWarningHandler,
  postV1RadarPaymentEvaluationsHandler,
  getV1RadarValueListItemsHandler,
  postV1RadarValueListItemsHandler,
  getV1RadarValueListItemsItemHandler,
  deleteV1RadarValueListItemsItemHandler,
  getV1RadarValueListsHandler,
  postV1RadarValueListsHandler,
  getV1RadarValueListsValueListHandler,
  postV1RadarValueListsValueListHandler,
  deleteV1RadarValueListsValueListHandler,
  getV1RefundsHandler,
  postV1RefundsHandler,
  getV1RefundsRefundHandler,
  postV1RefundsRefundHandler,
  postV1RefundsRefundCancelHandler,
  getV1ReportingReportRunsHandler,
  postV1ReportingReportRunsHandler,
  getV1ReportingReportRunsReportRunHandler,
  getV1ReportingReportTypesHandler,
  getV1ReportingReportTypesReportTypeHandler,
  getV1ReviewsHandler,
  getV1ReviewsReviewHandler,
  postV1ReviewsReviewApproveHandler,
  getV1SetupAttemptsHandler,
  getV1SetupIntentsHandler,
  postV1SetupIntentsHandler,
  getV1SetupIntentsIntentHandler,
  postV1SetupIntentsIntentHandler,
  postV1SetupIntentsIntentCancelHandler,
  postV1SetupIntentsIntentConfirmHandler,
  postV1SetupIntentsIntentVerifyMicrodepositsHandler,
  getV1ShippingRatesHandler,
  postV1ShippingRatesHandler,
  getV1ShippingRatesShippingRateTokenHandler,
  postV1ShippingRatesShippingRateTokenHandler,
  postV1SigmaSavedQueriesIdHandler,
  getV1SigmaScheduledQueryRunsHandler,
  getV1SigmaScheduledQueryRunsScheduledQueryRunHandler,
  postV1SourcesHandler,
  getV1SourcesSourceHandler,
  postV1SourcesSourceHandler,
  getV1SourcesSourceMandateNotificationsMandateNotificationHandler,
  getV1SourcesSourceSourceTransactionsHandler,
  getV1SourcesSourceSourceTransactionsSourceTransactionHandler,
  postV1SourcesSourceVerifyHandler,
  getV1SubscriptionItemsHandler,
  postV1SubscriptionItemsHandler,
  getV1SubscriptionItemsItemHandler,
  postV1SubscriptionItemsItemHandler,
  deleteV1SubscriptionItemsItemHandler,
  getV1SubscriptionSchedulesHandler,
  postV1SubscriptionSchedulesHandler,
  getV1SubscriptionSchedulesScheduleHandler,
  postV1SubscriptionSchedulesScheduleHandler,
  postV1SubscriptionSchedulesScheduleCancelHandler,
  postV1SubscriptionSchedulesScheduleReleaseHandler,
  getV1SubscriptionsHandler,
  postV1SubscriptionsHandler,
  getV1SubscriptionsSearchHandler,
  getV1SubscriptionsSubscriptionExposedIdHandler,
  postV1SubscriptionsSubscriptionExposedIdHandler,
  deleteV1SubscriptionsSubscriptionExposedIdHandler,
  deleteV1SubscriptionsSubscriptionExposedIdDiscountHandler,
  postV1SubscriptionsSubscriptionMigrateHandler,
  postV1SubscriptionsSubscriptionPauseHandler,
  postV1SubscriptionsSubscriptionResumeHandler,
  getV1TaxAssociationsFindHandler,
  postV1TaxCalculationsHandler,
  getV1TaxCalculationsCalculationHandler,
  getV1TaxCalculationsCalculationLineItemsHandler,
  getV1TaxLocationsHandler,
  postV1TaxLocationsHandler,
  getV1TaxLocationsLocationHandler,
  getV1TaxRegistrationsHandler,
  postV1TaxRegistrationsHandler,
  getV1TaxRegistrationsIdHandler,
  postV1TaxRegistrationsIdHandler,
  getV1TaxSettingsHandler,
  postV1TaxSettingsHandler,
  postV1TaxTransactionsCreateFromCalculationHandler,
  postV1TaxTransactionsCreateReversalHandler,
  getV1TaxTransactionsTransactionHandler,
  getV1TaxTransactionsTransactionLineItemsHandler,
  getV1TaxCodesHandler,
  getV1TaxCodesIdHandler,
  getV1TaxIdsHandler,
  postV1TaxIdsHandler,
  getV1TaxIdsIdHandler,
  deleteV1TaxIdsIdHandler,
  getV1TaxRatesHandler,
  postV1TaxRatesHandler,
  getV1TaxRatesTaxRateHandler,
  postV1TaxRatesTaxRateHandler,
  getV1TerminalConfigurationsHandler,
  postV1TerminalConfigurationsHandler,
  getV1TerminalConfigurationsConfigurationHandler,
  postV1TerminalConfigurationsConfigurationHandler,
  deleteV1TerminalConfigurationsConfigurationHandler,
  postV1TerminalConnectionTokensHandler,
  getV1TerminalLocationsHandler,
  postV1TerminalLocationsHandler,
  getV1TerminalLocationsLocationHandler,
  postV1TerminalLocationsLocationHandler,
  deleteV1TerminalLocationsLocationHandler,
  postV1TerminalOnboardingLinksHandler,
  getV1TerminalReadersHandler,
  postV1TerminalReadersHandler,
  getV1TerminalReadersReaderHandler,
  postV1TerminalReadersReaderHandler,
  deleteV1TerminalReadersReaderHandler,
  postV1TerminalReadersReaderCancelActionHandler,
  postV1TerminalReadersReaderCollectInputsHandler,
  postV1TerminalReadersReaderCollectPaymentMethodHandler,
  postV1TerminalReadersReaderConfirmPaymentIntentHandler,
  postV1TerminalReadersReaderProcessPaymentIntentHandler,
  postV1TerminalReadersReaderProcessSetupIntentHandler,
  postV1TerminalReadersReaderRefundPaymentHandler,
  postV1TerminalReadersReaderSetReaderDisplayHandler,
  postV1TerminalRefundsHandler,
  postV1TestHelpersConfirmationTokensHandler,
  postV1TestHelpersCustomersCustomerFundCashBalanceHandler,
  postV1TestHelpersIssuingAuthorizationsHandler,
  postV1TestHelpersIssuingAuthorizationsAuthorizationCaptureHandler,
  postV1TestHelpersIssuingAuthorizationsAuthorizationExpireHandler,
  postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountHandler,
  postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondHandler,
  postV1TestHelpersIssuingAuthorizationsAuthorizationIncrementHandler,
  postV1TestHelpersIssuingAuthorizationsAuthorizationReverseHandler,
  postV1TestHelpersIssuingCardsCardShippingDeliverHandler,
  postV1TestHelpersIssuingCardsCardShippingFailHandler,
  postV1TestHelpersIssuingCardsCardShippingReturnHandler,
  postV1TestHelpersIssuingCardsCardShippingShipHandler,
  postV1TestHelpersIssuingCardsCardShippingSubmitHandler,
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateHandler,
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateHandler,
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectHandler,
  postV1TestHelpersIssuingSettlementsHandler,
  postV1TestHelpersIssuingSettlementsSettlementCompleteHandler,
  postV1TestHelpersIssuingTransactionsCreateForceCaptureHandler,
  postV1TestHelpersIssuingTransactionsCreateUnlinkedRefundHandler,
  postV1TestHelpersIssuingTransactionsTransactionRefundHandler,
  postV1TestHelpersRefundsRefundExpireHandler,
  postV1TestHelpersTerminalReadersReaderPresentPaymentMethodHandler,
  postV1TestHelpersTerminalReadersReaderSucceedInputCollectionHandler,
  postV1TestHelpersTerminalReadersReaderTimeoutInputCollectionHandler,
  getV1TestHelpersTestClocksHandler,
  postV1TestHelpersTestClocksHandler,
  getV1TestHelpersTestClocksTestClockHandler,
  deleteV1TestHelpersTestClocksTestClockHandler,
  postV1TestHelpersTestClocksTestClockAdvanceHandler,
  postV1TestHelpersTreasuryInboundTransfersIdFailHandler,
  postV1TestHelpersTreasuryInboundTransfersIdReturnHandler,
  postV1TestHelpersTreasuryInboundTransfersIdSucceedHandler,
  postV1TestHelpersTreasuryOutboundPaymentsIdHandler,
  postV1TestHelpersTreasuryOutboundPaymentsIdFailHandler,
  postV1TestHelpersTreasuryOutboundPaymentsIdPostHandler,
  postV1TestHelpersTreasuryOutboundPaymentsIdReturnHandler,
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferHandler,
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFailHandler,
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPostHandler,
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturnHandler,
  postV1TestHelpersTreasuryReceivedCreditsHandler,
  postV1TestHelpersTreasuryReceivedDebitsHandler,
  getV1ThreeDSecureAuthenticationsHandler,
  postV1ThreeDSecureAuthenticationsHandler,
  getV1ThreeDSecureAuthenticationsAuthenticationHandler,
  postV1ThreeDSecureAuthenticationsAuthenticationCancelHandler,
  postV1ThreeDSecureAuthenticationsAuthenticationSubmitHandler,
  postV1TokensHandler,
  getV1TokensTokenHandler,
  getV1TopupsHandler,
  postV1TopupsHandler,
  getV1TopupsTopupHandler,
  postV1TopupsTopupHandler,
  postV1TopupsTopupCancelHandler,
  getV1TransfersHandler,
  postV1TransfersHandler,
  getV1TransfersIdReversalsHandler,
  postV1TransfersIdReversalsHandler,
  getV1TransfersTransferHandler,
  postV1TransfersTransferHandler,
  getV1TransfersTransferReversalsIdHandler,
  postV1TransfersTransferReversalsIdHandler,
  getV1TreasuryCreditReversalsHandler,
  postV1TreasuryCreditReversalsHandler,
  getV1TreasuryCreditReversalsCreditReversalHandler,
  getV1TreasuryDebitReversalsHandler,
  postV1TreasuryDebitReversalsHandler,
  getV1TreasuryDebitReversalsDebitReversalHandler,
  getV1TreasuryFinancialAccountsHandler,
  postV1TreasuryFinancialAccountsHandler,
  getV1TreasuryFinancialAccountsFinancialAccountHandler,
  postV1TreasuryFinancialAccountsFinancialAccountHandler,
  postV1TreasuryFinancialAccountsFinancialAccountCloseHandler,
  getV1TreasuryFinancialAccountsFinancialAccountFeaturesHandler,
  postV1TreasuryFinancialAccountsFinancialAccountFeaturesHandler,
  getV1TreasuryInboundTransfersHandler,
  postV1TreasuryInboundTransfersHandler,
  getV1TreasuryInboundTransfersIdHandler,
  postV1TreasuryInboundTransfersInboundTransferCancelHandler,
  getV1TreasuryOutboundPaymentsHandler,
  postV1TreasuryOutboundPaymentsHandler,
  getV1TreasuryOutboundPaymentsIdHandler,
  postV1TreasuryOutboundPaymentsIdCancelHandler,
  getV1TreasuryOutboundTransfersHandler,
  postV1TreasuryOutboundTransfersHandler,
  getV1TreasuryOutboundTransfersOutboundTransferHandler,
  postV1TreasuryOutboundTransfersOutboundTransferCancelHandler,
  getV1TreasuryReceivedCreditsHandler,
  getV1TreasuryReceivedCreditsIdHandler,
  getV1TreasuryReceivedDebitsHandler,
  getV1TreasuryReceivedDebitsIdHandler,
  getV1TreasuryTransactionEntriesHandler,
  getV1TreasuryTransactionEntriesIdHandler,
  getV1TreasuryTransactionsHandler,
  getV1TreasuryTransactionsIdHandler,
  getV1WebhookEndpointsHandler,
  postV1WebhookEndpointsHandler,
  getV1WebhookEndpointsWebhookEndpointHandler,
  postV1WebhookEndpointsWebhookEndpointHandler,
  deleteV1WebhookEndpointsWebhookEndpointHandler,
} from '../routes'

export const v1Handler = new Hono()
  .get(
    '/v1/account',
    getV1AccountHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/account_links',
    postV1AccountLinksHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/account_sessions',
    postV1AccountSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts',
    getV1AccountsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts',
    postV1AccountsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account',
    getV1AccountsAccountHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account',
    postV1AccountsAccountHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/accounts/:account',
    deleteV1AccountsAccountHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/bank_accounts',
    postV1AccountsAccountBankAccountsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/bank_accounts/:id',
    getV1AccountsAccountBankAccountsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/bank_accounts/:id',
    postV1AccountsAccountBankAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/accounts/:account/bank_accounts/:id',
    deleteV1AccountsAccountBankAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/capabilities',
    getV1AccountsAccountCapabilitiesHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/capabilities/:capability',
    getV1AccountsAccountCapabilitiesCapabilityHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/capabilities/:capability',
    postV1AccountsAccountCapabilitiesCapabilityHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/external_accounts',
    getV1AccountsAccountExternalAccountsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/external_accounts',
    postV1AccountsAccountExternalAccountsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/external_accounts/:id',
    getV1AccountsAccountExternalAccountsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/external_accounts/:id',
    postV1AccountsAccountExternalAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/accounts/:account/external_accounts/:id',
    deleteV1AccountsAccountExternalAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/login_links',
    postV1AccountsAccountLoginLinksHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/people',
    getV1AccountsAccountPeopleHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/people',
    postV1AccountsAccountPeopleHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/people/:person',
    getV1AccountsAccountPeoplePersonHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/people/:person',
    postV1AccountsAccountPeoplePersonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/accounts/:account/people/:person',
    deleteV1AccountsAccountPeoplePersonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/persons',
    getV1AccountsAccountPersonsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/persons',
    postV1AccountsAccountPersonsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/accounts/:account/persons/:person',
    getV1AccountsAccountPersonsPersonHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/persons/:person',
    postV1AccountsAccountPersonsPersonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/accounts/:account/persons/:person',
    deleteV1AccountsAccountPersonsPersonHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/reject',
    postV1AccountsAccountRejectHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/accounts/:account/unreject',
    postV1AccountsAccountUnrejectHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/apple_pay/domains',
    getV1ApplePayDomainsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/apple_pay/domains',
    postV1ApplePayDomainsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/apple_pay/domains/:domain',
    getV1ApplePayDomainsDomainHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/apple_pay/domains/:domain',
    deleteV1ApplePayDomainsDomainHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/application_fees',
    getV1ApplicationFeesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/application_fees/:fee/refunds/:id',
    getV1ApplicationFeesFeeRefundsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/application_fees/:fee/refunds/:id',
    postV1ApplicationFeesFeeRefundsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/application_fees/:id',
    getV1ApplicationFeesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/application_fees/:id/refund',
    postV1ApplicationFeesIdRefundHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/application_fees/:id/refunds',
    getV1ApplicationFeesIdRefundsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/application_fees/:id/refunds',
    postV1ApplicationFeesIdRefundsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/apps/installs',
    getV1AppsInstallsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/apps/installs',
    postV1AppsInstallsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/apps/installs/:id',
    getV1AppsInstallsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/apps/installs/:id',
    postV1AppsInstallsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/apps/installs/:id/uninstall',
    postV1AppsInstallsIdUninstallHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/apps/secrets',
    getV1AppsSecretsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/apps/secrets',
    postV1AppsSecretsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/apps/secrets/delete',
    postV1AppsSecretsDeleteHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/apps/secrets/find',
    getV1AppsSecretsFindHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/balance',
    getV1BalanceHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/balance/history',
    getV1BalanceHistoryHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/balance/history/:id',
    getV1BalanceHistoryIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/balance_settings',
    getV1BalanceSettingsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/balance_settings',
    postV1BalanceSettingsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/balance_transactions',
    getV1BalanceTransactionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/balance_transactions/:id',
    getV1BalanceTransactionsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/alerts',
    getV1BillingAlertsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/alerts',
    postV1BillingAlertsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/alerts/:id',
    getV1BillingAlertsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/alerts/:id/activate',
    postV1BillingAlertsIdActivateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/alerts/:id/archive',
    postV1BillingAlertsIdArchiveHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/alerts/:id/deactivate',
    postV1BillingAlertsIdDeactivateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/credit_balance_summary',
    getV1BillingCreditBalanceSummaryHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/credit_balance_transactions',
    getV1BillingCreditBalanceTransactionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/credit_balance_transactions/:id',
    getV1BillingCreditBalanceTransactionsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/credit_grants',
    getV1BillingCreditGrantsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/credit_grants',
    postV1BillingCreditGrantsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/credit_grants/:id',
    getV1BillingCreditGrantsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/credit_grants/:id',
    postV1BillingCreditGrantsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/credit_grants/:id/expire',
    postV1BillingCreditGrantsIdExpireHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/credit_grants/:id/void',
    postV1BillingCreditGrantsIdVoidHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/feedback_options',
    getV1BillingFeedbackOptionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/feedback_options',
    postV1BillingFeedbackOptionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/feedback_options/:id',
    getV1BillingFeedbackOptionsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/feedback_options/:id',
    postV1BillingFeedbackOptionsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/feedback_options/:id/deactivate',
    postV1BillingFeedbackOptionsIdDeactivateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/meter_event_adjustments',
    postV1BillingMeterEventAdjustmentsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/meter_events',
    postV1BillingMeterEventsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/meters',
    getV1BillingMetersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/meters',
    postV1BillingMetersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/meters/:id',
    getV1BillingMetersIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/meters/:id',
    postV1BillingMetersIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/meters/:id/deactivate',
    postV1BillingMetersIdDeactivateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing/meters/:id/event_summaries',
    getV1BillingMetersIdEventSummariesHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing/meters/:id/reactivate',
    postV1BillingMetersIdReactivateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing_portal/configurations',
    getV1BillingPortalConfigurationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing_portal/configurations',
    postV1BillingPortalConfigurationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/billing_portal/configurations/:configuration',
    getV1BillingPortalConfigurationsConfigurationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing_portal/configurations/:configuration',
    postV1BillingPortalConfigurationsConfigurationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/billing_portal/sessions',
    postV1BillingPortalSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/charges',
    getV1ChargesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges',
    postV1ChargesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/charges/search',
    getV1ChargesSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/charges/:charge',
    getV1ChargesChargeHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge',
    postV1ChargesChargeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge/capture',
    postV1ChargesChargeCaptureHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/charges/:charge/dispute',
    getV1ChargesChargeDisputeHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge/dispute',
    postV1ChargesChargeDisputeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge/dispute/close',
    postV1ChargesChargeDisputeCloseHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge/refund',
    postV1ChargesChargeRefundHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/charges/:charge/refunds',
    getV1ChargesChargeRefundsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge/refunds',
    postV1ChargesChargeRefundsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/charges/:charge/refunds/:refund',
    getV1ChargesChargeRefundsRefundHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/charges/:charge/refunds/:refund',
    postV1ChargesChargeRefundsRefundHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/checkout/sessions',
    getV1CheckoutSessionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/checkout/sessions',
    postV1CheckoutSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/checkout/sessions/:session',
    getV1CheckoutSessionsSessionHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/checkout/sessions/:session',
    postV1CheckoutSessionsSessionHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/checkout/sessions/:session/expire',
    postV1CheckoutSessionsSessionExpireHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/checkout/sessions/:session/line_items',
    getV1CheckoutSessionsSessionLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/climate/orders',
    getV1ClimateOrdersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/climate/orders',
    postV1ClimateOrdersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/climate/orders/:order',
    getV1ClimateOrdersOrderHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/climate/orders/:order',
    postV1ClimateOrdersOrderHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/climate/orders/:order/cancel',
    postV1ClimateOrdersOrderCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/climate/products',
    getV1ClimateProductsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/climate/products/:product',
    getV1ClimateProductsProductHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/climate/suppliers',
    getV1ClimateSuppliersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/climate/suppliers/:supplier',
    getV1ClimateSuppliersSupplierHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/confirmation_tokens/:confirmation_token',
    getV1ConfirmationTokensConfirmationTokenHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/country_specs',
    getV1CountrySpecsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/country_specs/:country',
    getV1CountrySpecsCountryHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/coupons',
    getV1CouponsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/coupons',
    postV1CouponsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/coupons/:coupon',
    getV1CouponsCouponHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/coupons/:coupon',
    postV1CouponsCouponHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/coupons/:coupon',
    deleteV1CouponsCouponHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/credit_notes',
    getV1CreditNotesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/credit_notes',
    postV1CreditNotesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/credit_notes/preview',
    getV1CreditNotesPreviewHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/credit_notes/preview/lines',
    getV1CreditNotesPreviewLinesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/credit_notes/:credit_note/lines',
    getV1CreditNotesCreditNoteLinesHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/credit_notes/:id',
    getV1CreditNotesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/credit_notes/:id',
    postV1CreditNotesIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/credit_notes/:id/void',
    postV1CreditNotesIdVoidHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customer_sessions',
    postV1CustomerSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers',
    getV1CustomersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers',
    postV1CustomersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/search',
    getV1CustomersSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer',
    getV1CustomersCustomerHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer',
    postV1CustomersCustomerHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/customers/:customer',
    deleteV1CustomersCustomerHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/balance_transactions',
    getV1CustomersCustomerBalanceTransactionsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/balance_transactions',
    postV1CustomersCustomerBalanceTransactionsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/balance_transactions/:transaction',
    getV1CustomersCustomerBalanceTransactionsTransactionHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/customers/:customer/balance_transactions/:transaction',
    postV1CustomersCustomerBalanceTransactionsTransactionHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/bank_accounts',
    getV1CustomersCustomerBankAccountsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/bank_accounts',
    postV1CustomersCustomerBankAccountsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/bank_accounts/:id',
    getV1CustomersCustomerBankAccountsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/bank_accounts/:id',
    postV1CustomersCustomerBankAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/customers/:customer/bank_accounts/:id',
    deleteV1CustomersCustomerBankAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/bank_accounts/:id/verify',
    postV1CustomersCustomerBankAccountsIdVerifyHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/cards',
    getV1CustomersCustomerCardsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/cards',
    postV1CustomersCustomerCardsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/cards/:id',
    getV1CustomersCustomerCardsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/cards/:id',
    postV1CustomersCustomerCardsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/customers/:customer/cards/:id',
    deleteV1CustomersCustomerCardsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/cash_balance',
    getV1CustomersCustomerCashBalanceHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/cash_balance',
    postV1CustomersCustomerCashBalanceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/cash_balance_transactions',
    getV1CustomersCustomerCashBalanceTransactionsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/cash_balance_transactions/:transaction',
    getV1CustomersCustomerCashBalanceTransactionsTransactionHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/customers/:customer/discount',
    getV1CustomersCustomerDiscountHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/customers/:customer/discount',
    deleteV1CustomersCustomerDiscountHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/funding_instructions',
    postV1CustomersCustomerFundingInstructionsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/payment_methods',
    getV1CustomersCustomerPaymentMethodsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/payment_methods/:payment_method',
    getV1CustomersCustomerPaymentMethodsPaymentMethodHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/customers/:customer/sources',
    getV1CustomersCustomerSourcesHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/sources',
    postV1CustomersCustomerSourcesHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/sources/:id',
    getV1CustomersCustomerSourcesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/sources/:id',
    postV1CustomersCustomerSourcesIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/customers/:customer/sources/:id',
    deleteV1CustomersCustomerSourcesIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/sources/:id/verify',
    postV1CustomersCustomerSourcesIdVerifyHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/subscriptions',
    getV1CustomersCustomerSubscriptionsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/subscriptions',
    postV1CustomersCustomerSubscriptionsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/subscriptions/:subscription_exposed_id',
    getV1CustomersCustomerSubscriptionsSubscriptionExposedIdHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/customers/:customer/subscriptions/:subscription_exposed_id',
    postV1CustomersCustomerSubscriptionsSubscriptionExposedIdHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/v1/customers/:customer/subscriptions/:subscription_exposed_id',
    deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/customers/:customer/subscriptions/:subscription_exposed_id/discount',
    getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscountHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/v1/customers/:customer/subscriptions/:subscription_exposed_id/discount',
    deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscountHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/customers/:customer/tax_ids',
    getV1CustomersCustomerTaxIdsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/customers/:customer/tax_ids',
    postV1CustomersCustomerTaxIdsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/customers/:customer/tax_ids/:id',
    getV1CustomersCustomerTaxIdsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/customers/:customer/tax_ids/:id',
    deleteV1CustomersCustomerTaxIdsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/disputes',
    getV1DisputesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/disputes/:dispute',
    getV1DisputesDisputeHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/disputes/:dispute',
    postV1DisputesDisputeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/disputes/:dispute/close',
    postV1DisputesDisputeCloseHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/entitlements/active_entitlements',
    getV1EntitlementsActiveEntitlementsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/entitlements/active_entitlements/:id',
    getV1EntitlementsActiveEntitlementsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/entitlements/features',
    getV1EntitlementsFeaturesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/entitlements/features',
    postV1EntitlementsFeaturesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/entitlements/features/:id',
    getV1EntitlementsFeaturesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/entitlements/features/:id',
    postV1EntitlementsFeaturesIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/ephemeral_keys',
    postV1EphemeralKeysHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/ephemeral_keys/:key',
    deleteV1EphemeralKeysKeyHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/events',
    getV1EventsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/events/:id',
    getV1EventsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/exchange_rates',
    getV1ExchangeRatesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/exchange_rates/:rate_id',
    getV1ExchangeRatesRateIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/external_accounts/:id',
    postV1ExternalAccountsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/file_links',
    getV1FileLinksHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/file_links',
    postV1FileLinksHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/file_links/:link',
    getV1FileLinksLinkHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/file_links/:link',
    postV1FileLinksLinkHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/files',
    getV1FilesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/files',
    postV1FilesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/files/:file',
    getV1FilesFileHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/financial_connections/accounts',
    getV1FinancialConnectionsAccountsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/financial_connections/accounts/:account',
    getV1FinancialConnectionsAccountsAccountHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/financial_connections/accounts/:account/disconnect',
    postV1FinancialConnectionsAccountsAccountDisconnectHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/financial_connections/accounts/:account/owners',
    getV1FinancialConnectionsAccountsAccountOwnersHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/financial_connections/accounts/:account/refresh',
    postV1FinancialConnectionsAccountsAccountRefreshHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/financial_connections/accounts/:account/subscribe',
    postV1FinancialConnectionsAccountsAccountSubscribeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/financial_connections/accounts/:account/unsubscribe',
    postV1FinancialConnectionsAccountsAccountUnsubscribeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/financial_connections/sessions',
    postV1FinancialConnectionsSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/financial_connections/sessions/:session',
    getV1FinancialConnectionsSessionsSessionHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/financial_connections/transactions',
    getV1FinancialConnectionsTransactionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/financial_connections/transactions/:transaction',
    getV1FinancialConnectionsTransactionsTransactionHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/forwarding/requests',
    getV1ForwardingRequestsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/forwarding/requests',
    postV1ForwardingRequestsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/forwarding/requests/:id',
    getV1ForwardingRequestsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/identity/verification_reports',
    getV1IdentityVerificationReportsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/identity/verification_reports/:report',
    getV1IdentityVerificationReportsReportHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/identity/verification_sessions',
    getV1IdentityVerificationSessionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/identity/verification_sessions',
    postV1IdentityVerificationSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/identity/verification_sessions/:session',
    getV1IdentityVerificationSessionsSessionHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/identity/verification_sessions/:session',
    postV1IdentityVerificationSessionsSessionHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/identity/verification_sessions/:session/cancel',
    postV1IdentityVerificationSessionsSessionCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/identity/verification_sessions/:session/redact',
    postV1IdentityVerificationSessionsSessionRedactHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoice_payments',
    getV1InvoicePaymentsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoice_payments/:invoice_payment',
    getV1InvoicePaymentsInvoicePaymentHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoice_rendering_templates',
    getV1InvoiceRenderingTemplatesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoice_rendering_templates/:template',
    getV1InvoiceRenderingTemplatesTemplateHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoice_rendering_templates/:template/archive',
    postV1InvoiceRenderingTemplatesTemplateArchiveHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoice_rendering_templates/:template/unarchive',
    postV1InvoiceRenderingTemplatesTemplateUnarchiveHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoiceitems',
    getV1InvoiceitemsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoiceitems',
    postV1InvoiceitemsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoiceitems/:invoiceitem',
    getV1InvoiceitemsInvoiceitemHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoiceitems/:invoiceitem',
    postV1InvoiceitemsInvoiceitemHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/invoiceitems/:invoiceitem',
    deleteV1InvoiceitemsInvoiceitemHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoices',
    getV1InvoicesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices',
    postV1InvoicesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/create_preview',
    postV1InvoicesCreatePreviewHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoices/search',
    getV1InvoicesSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoices/:invoice',
    getV1InvoicesInvoiceHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice',
    postV1InvoicesInvoiceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/invoices/:invoice',
    deleteV1InvoicesInvoiceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/add_lines',
    postV1InvoicesInvoiceAddLinesHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/attach_payment',
    postV1InvoicesInvoiceAttachPaymentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/finalize',
    postV1InvoicesInvoiceFinalizeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/invoices/:invoice/lines',
    getV1InvoicesInvoiceLinesHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/lines/:line_item_id',
    postV1InvoicesInvoiceLinesLineItemIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/mark_uncollectible',
    postV1InvoicesInvoiceMarkUncollectibleHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/pay',
    postV1InvoicesInvoicePayHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/remove_lines',
    postV1InvoicesInvoiceRemoveLinesHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/send',
    postV1InvoicesInvoiceSendHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/update_lines',
    postV1InvoicesInvoiceUpdateLinesHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/invoices/:invoice/void',
    postV1InvoicesInvoiceVoidHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/authorizations',
    getV1IssuingAuthorizationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/authorizations/:authorization',
    getV1IssuingAuthorizationsAuthorizationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/authorizations/:authorization',
    postV1IssuingAuthorizationsAuthorizationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/authorizations/:authorization/approve',
    postV1IssuingAuthorizationsAuthorizationApproveHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/authorizations/:authorization/decline',
    postV1IssuingAuthorizationsAuthorizationDeclineHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/cardholders',
    getV1IssuingCardholdersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/cardholders',
    postV1IssuingCardholdersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/cardholders/:cardholder',
    getV1IssuingCardholdersCardholderHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/cardholders/:cardholder',
    postV1IssuingCardholdersCardholderHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/cards',
    getV1IssuingCardsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/cards',
    postV1IssuingCardsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/cards/:card',
    getV1IssuingCardsCardHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/cards/:card',
    postV1IssuingCardsCardHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/disputes',
    getV1IssuingDisputesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/disputes',
    postV1IssuingDisputesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/disputes/:dispute',
    getV1IssuingDisputesDisputeHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/disputes/:dispute',
    postV1IssuingDisputesDisputeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/disputes/:dispute/submit',
    postV1IssuingDisputesDisputeSubmitHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/personalization_designs',
    getV1IssuingPersonalizationDesignsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/personalization_designs',
    postV1IssuingPersonalizationDesignsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/personalization_designs/:personalization_design',
    getV1IssuingPersonalizationDesignsPersonalizationDesignHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/issuing/personalization_designs/:personalization_design',
    postV1IssuingPersonalizationDesignsPersonalizationDesignHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/issuing/physical_bundles',
    getV1IssuingPhysicalBundlesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/physical_bundles/:physical_bundle',
    getV1IssuingPhysicalBundlesPhysicalBundleHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/settlements/:settlement',
    getV1IssuingSettlementsSettlementHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/settlements/:settlement',
    postV1IssuingSettlementsSettlementHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/tokens',
    getV1IssuingTokensHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/tokens/:token',
    getV1IssuingTokensTokenHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/tokens/:token',
    postV1IssuingTokensTokenHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/transactions',
    getV1IssuingTransactionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/issuing/transactions/:transaction',
    getV1IssuingTransactionsTransactionHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/issuing/transactions/:transaction',
    postV1IssuingTransactionsTransactionHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/link_account_sessions',
    postV1LinkAccountSessionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/link_account_sessions/:session',
    getV1LinkAccountSessionsSessionHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/linked_accounts',
    getV1LinkedAccountsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/linked_accounts/:account',
    getV1LinkedAccountsAccountHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/linked_accounts/:account/disconnect',
    postV1LinkedAccountsAccountDisconnectHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/linked_accounts/:account/owners',
    getV1LinkedAccountsAccountOwnersHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/linked_accounts/:account/refresh',
    postV1LinkedAccountsAccountRefreshHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/mandates/:mandate',
    getV1MandatesMandateHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_attempt_records',
    getV1PaymentAttemptRecordsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_attempt_records/:id',
    getV1PaymentAttemptRecordsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_intents',
    getV1PaymentIntentsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents',
    postV1PaymentIntentsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_intents/search',
    getV1PaymentIntentsSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_intents/:intent',
    getV1PaymentIntentsIntentHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent',
    postV1PaymentIntentsIntentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_intents/:intent/amount_details_line_items',
    getV1PaymentIntentsIntentAmountDetailsLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent/apply_customer_balance',
    postV1PaymentIntentsIntentApplyCustomerBalanceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent/cancel',
    postV1PaymentIntentsIntentCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent/capture',
    postV1PaymentIntentsIntentCaptureHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent/confirm',
    postV1PaymentIntentsIntentConfirmHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent/increment_authorization',
    postV1PaymentIntentsIntentIncrementAuthorizationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_intents/:intent/verify_microdeposits',
    postV1PaymentIntentsIntentVerifyMicrodepositsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_links',
    getV1PaymentLinksHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_links',
    postV1PaymentLinksHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_links/:payment_link',
    getV1PaymentLinksPaymentLinkHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_links/:payment_link',
    postV1PaymentLinksPaymentLinkHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_links/:payment_link/line_items',
    getV1PaymentLinksPaymentLinkLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_method_configurations',
    getV1PaymentMethodConfigurationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_method_configurations',
    postV1PaymentMethodConfigurationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_method_configurations/:configuration',
    getV1PaymentMethodConfigurationsConfigurationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_method_configurations/:configuration',
    postV1PaymentMethodConfigurationsConfigurationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_method_domains',
    getV1PaymentMethodDomainsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_method_domains',
    postV1PaymentMethodDomainsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_method_domains/:payment_method_domain',
    getV1PaymentMethodDomainsPaymentMethodDomainHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_method_domains/:payment_method_domain',
    postV1PaymentMethodDomainsPaymentMethodDomainHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_method_domains/:payment_method_domain/validate',
    postV1PaymentMethodDomainsPaymentMethodDomainValidateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_methods',
    getV1PaymentMethodsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_methods',
    postV1PaymentMethodsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_methods/:payment_method',
    getV1PaymentMethodsPaymentMethodHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_methods/:payment_method',
    postV1PaymentMethodsPaymentMethodHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_methods/:payment_method/attach',
    postV1PaymentMethodsPaymentMethodAttachHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_methods/:payment_method/detach',
    postV1PaymentMethodsPaymentMethodDetachHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_records',
    getV1PaymentRecordsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_records/report_payment',
    postV1PaymentRecordsReportPaymentHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payment_records/:id',
    getV1PaymentRecordsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_records/:id/report_payment_attempt',
    postV1PaymentRecordsIdReportPaymentAttemptHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_records/:id/report_payment_attempt_canceled',
    postV1PaymentRecordsIdReportPaymentAttemptCanceledHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_records/:id/report_payment_attempt_failed',
    postV1PaymentRecordsIdReportPaymentAttemptFailedHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_records/:id/report_payment_attempt_guaranteed',
    postV1PaymentRecordsIdReportPaymentAttemptGuaranteedHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payment_records/:id/report_payment_attempt_informational',
    postV1PaymentRecordsIdReportPaymentAttemptInformationalHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/payment_records/:id/report_refund',
    postV1PaymentRecordsIdReportRefundHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payouts',
    getV1PayoutsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payouts',
    postV1PayoutsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/payouts/:payout',
    getV1PayoutsPayoutHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payouts/:payout',
    postV1PayoutsPayoutHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payouts/:payout/cancel',
    postV1PayoutsPayoutCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/payouts/:payout/reverse',
    postV1PayoutsPayoutReverseHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/plans',
    getV1PlansHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/plans',
    postV1PlansHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/plans/:plan',
    getV1PlansPlanHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/plans/:plan',
    postV1PlansPlanHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/plans/:plan',
    deleteV1PlansPlanHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/prices',
    getV1PricesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/prices',
    postV1PricesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/prices/search',
    getV1PricesSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/prices/:price',
    getV1PricesPriceHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/prices/:price',
    postV1PricesPriceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/product_catalog/trial_offers',
    getV1ProductCatalogTrialOffersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/product_catalog/trial_offers',
    postV1ProductCatalogTrialOffersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/product_catalog/trial_offers/:id',
    getV1ProductCatalogTrialOffersIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/product_catalog/trial_offers/:id',
    postV1ProductCatalogTrialOffersIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/products',
    getV1ProductsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/products',
    postV1ProductsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/products/search',
    getV1ProductsSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/products/:id',
    getV1ProductsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/products/:id',
    postV1ProductsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/products/:id',
    deleteV1ProductsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/products/:product/features',
    getV1ProductsProductFeaturesHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/products/:product/features',
    postV1ProductsProductFeaturesHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/products/:product/features/:id',
    getV1ProductsProductFeaturesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/products/:product/features/:id',
    deleteV1ProductsProductFeaturesIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/promotion_codes',
    getV1PromotionCodesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/promotion_codes',
    postV1PromotionCodesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/promotion_codes/:promotion_code',
    getV1PromotionCodesPromotionCodeHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/promotion_codes/:promotion_code',
    postV1PromotionCodesPromotionCodeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/quotes',
    getV1QuotesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/quotes',
    postV1QuotesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/quotes/:quote',
    getV1QuotesQuoteHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/quotes/:quote',
    postV1QuotesQuoteHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/quotes/:quote/accept',
    postV1QuotesQuoteAcceptHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/quotes/:quote/cancel',
    postV1QuotesQuoteCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/quotes/:quote/computed_upfront_line_items',
    getV1QuotesQuoteComputedUpfrontLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/quotes/:quote/finalize',
    postV1QuotesQuoteFinalizeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/quotes/:quote/line_items',
    getV1QuotesQuoteLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/quotes/:quote/pdf',
    getV1QuotesQuotePdfHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/radar/early_fraud_warnings',
    getV1RadarEarlyFraudWarningsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/radar/early_fraud_warnings/:early_fraud_warning',
    getV1RadarEarlyFraudWarningsEarlyFraudWarningHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/radar/payment_evaluations',
    postV1RadarPaymentEvaluationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/radar/value_list_items',
    getV1RadarValueListItemsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/radar/value_list_items',
    postV1RadarValueListItemsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/radar/value_list_items/:item',
    getV1RadarValueListItemsItemHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/radar/value_list_items/:item',
    deleteV1RadarValueListItemsItemHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/radar/value_lists',
    getV1RadarValueListsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/radar/value_lists',
    postV1RadarValueListsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/radar/value_lists/:value_list',
    getV1RadarValueListsValueListHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/radar/value_lists/:value_list',
    postV1RadarValueListsValueListHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/radar/value_lists/:value_list',
    deleteV1RadarValueListsValueListHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/refunds',
    getV1RefundsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/refunds',
    postV1RefundsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/refunds/:refund',
    getV1RefundsRefundHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/refunds/:refund',
    postV1RefundsRefundHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/refunds/:refund/cancel',
    postV1RefundsRefundCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/reporting/report_runs',
    getV1ReportingReportRunsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/reporting/report_runs',
    postV1ReportingReportRunsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/reporting/report_runs/:report_run',
    getV1ReportingReportRunsReportRunHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/reporting/report_types',
    getV1ReportingReportTypesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/reporting/report_types/:report_type',
    getV1ReportingReportTypesReportTypeHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/reviews',
    getV1ReviewsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/reviews/:review',
    getV1ReviewsReviewHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/reviews/:review/approve',
    postV1ReviewsReviewApproveHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/setup_attempts',
    getV1SetupAttemptsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/setup_intents',
    getV1SetupIntentsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/setup_intents',
    postV1SetupIntentsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/setup_intents/:intent',
    getV1SetupIntentsIntentHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/setup_intents/:intent',
    postV1SetupIntentsIntentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/setup_intents/:intent/cancel',
    postV1SetupIntentsIntentCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/setup_intents/:intent/confirm',
    postV1SetupIntentsIntentConfirmHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/setup_intents/:intent/verify_microdeposits',
    postV1SetupIntentsIntentVerifyMicrodepositsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/shipping_rates',
    getV1ShippingRatesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/shipping_rates',
    postV1ShippingRatesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/shipping_rates/:shipping_rate_token',
    getV1ShippingRatesShippingRateTokenHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/shipping_rates/:shipping_rate_token',
    postV1ShippingRatesShippingRateTokenHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/sigma/saved_queries/:id',
    postV1SigmaSavedQueriesIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/sigma/scheduled_query_runs',
    getV1SigmaScheduledQueryRunsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/sigma/scheduled_query_runs/:scheduled_query_run',
    getV1SigmaScheduledQueryRunsScheduledQueryRunHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/sources',
    postV1SourcesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/sources/:source',
    getV1SourcesSourceHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/sources/:source',
    postV1SourcesSourceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/sources/:source/mandate_notifications/:mandate_notification',
    getV1SourcesSourceMandateNotificationsMandateNotificationHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/sources/:source/source_transactions',
    getV1SourcesSourceSourceTransactionsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/sources/:source/source_transactions/:source_transaction',
    getV1SourcesSourceSourceTransactionsSourceTransactionHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/sources/:source/verify',
    postV1SourcesSourceVerifyHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscription_items',
    getV1SubscriptionItemsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscription_items',
    postV1SubscriptionItemsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscription_items/:item',
    getV1SubscriptionItemsItemHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscription_items/:item',
    postV1SubscriptionItemsItemHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/subscription_items/:item',
    deleteV1SubscriptionItemsItemHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscription_schedules',
    getV1SubscriptionSchedulesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscription_schedules',
    postV1SubscriptionSchedulesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscription_schedules/:schedule',
    getV1SubscriptionSchedulesScheduleHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscription_schedules/:schedule',
    postV1SubscriptionSchedulesScheduleHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscription_schedules/:schedule/cancel',
    postV1SubscriptionSchedulesScheduleCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscription_schedules/:schedule/release',
    postV1SubscriptionSchedulesScheduleReleaseHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscriptions',
    getV1SubscriptionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscriptions',
    postV1SubscriptionsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscriptions/search',
    getV1SubscriptionsSearchHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/subscriptions/:subscription_exposed_id',
    getV1SubscriptionsSubscriptionExposedIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscriptions/:subscription_exposed_id',
    postV1SubscriptionsSubscriptionExposedIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/subscriptions/:subscription_exposed_id',
    deleteV1SubscriptionsSubscriptionExposedIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/subscriptions/:subscription_exposed_id/discount',
    deleteV1SubscriptionsSubscriptionExposedIdDiscountHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscriptions/:subscription/migrate',
    postV1SubscriptionsSubscriptionMigrateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscriptions/:subscription/pause',
    postV1SubscriptionsSubscriptionPauseHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/subscriptions/:subscription/resume',
    postV1SubscriptionsSubscriptionResumeHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/associations/find',
    getV1TaxAssociationsFindHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/calculations',
    postV1TaxCalculationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/calculations/:calculation',
    getV1TaxCalculationsCalculationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/calculations/:calculation/line_items',
    getV1TaxCalculationsCalculationLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/locations',
    getV1TaxLocationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/locations',
    postV1TaxLocationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/locations/:location',
    getV1TaxLocationsLocationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/registrations',
    getV1TaxRegistrationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/registrations',
    postV1TaxRegistrationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/registrations/:id',
    getV1TaxRegistrationsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/registrations/:id',
    postV1TaxRegistrationsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/settings',
    getV1TaxSettingsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/settings',
    postV1TaxSettingsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/transactions/create_from_calculation',
    postV1TaxTransactionsCreateFromCalculationHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax/transactions/create_reversal',
    postV1TaxTransactionsCreateReversalHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/transactions/:transaction',
    getV1TaxTransactionsTransactionHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax/transactions/:transaction/line_items',
    getV1TaxTransactionsTransactionLineItemsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax_codes',
    getV1TaxCodesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax_codes/:id',
    getV1TaxCodesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax_ids',
    getV1TaxIdsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax_ids',
    postV1TaxIdsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax_ids/:id',
    getV1TaxIdsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/tax_ids/:id',
    deleteV1TaxIdsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax_rates',
    getV1TaxRatesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax_rates',
    postV1TaxRatesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tax_rates/:tax_rate',
    getV1TaxRatesTaxRateHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tax_rates/:tax_rate',
    postV1TaxRatesTaxRateHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/terminal/configurations',
    getV1TerminalConfigurationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/configurations',
    postV1TerminalConfigurationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/terminal/configurations/:configuration',
    getV1TerminalConfigurationsConfigurationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/configurations/:configuration',
    postV1TerminalConfigurationsConfigurationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/terminal/configurations/:configuration',
    deleteV1TerminalConfigurationsConfigurationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/connection_tokens',
    postV1TerminalConnectionTokensHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/terminal/locations',
    getV1TerminalLocationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/locations',
    postV1TerminalLocationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/terminal/locations/:location',
    getV1TerminalLocationsLocationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/locations/:location',
    postV1TerminalLocationsLocationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/terminal/locations/:location',
    deleteV1TerminalLocationsLocationHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/onboarding_links',
    postV1TerminalOnboardingLinksHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/terminal/readers',
    getV1TerminalReadersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers',
    postV1TerminalReadersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/terminal/readers/:reader',
    getV1TerminalReadersReaderHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader',
    postV1TerminalReadersReaderHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/terminal/readers/:reader',
    deleteV1TerminalReadersReaderHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/cancel_action',
    postV1TerminalReadersReaderCancelActionHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/collect_inputs',
    postV1TerminalReadersReaderCollectInputsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/collect_payment_method',
    postV1TerminalReadersReaderCollectPaymentMethodHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/confirm_payment_intent',
    postV1TerminalReadersReaderConfirmPaymentIntentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/process_payment_intent',
    postV1TerminalReadersReaderProcessPaymentIntentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/process_setup_intent',
    postV1TerminalReadersReaderProcessSetupIntentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/refund_payment',
    postV1TerminalReadersReaderRefundPaymentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/readers/:reader/set_reader_display',
    postV1TerminalReadersReaderSetReaderDisplayHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/terminal/refunds',
    postV1TerminalRefundsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/confirmation_tokens',
    postV1TestHelpersConfirmationTokensHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/customers/:customer/fund_cash_balance',
    postV1TestHelpersCustomersCustomerFundCashBalanceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations',
    postV1TestHelpersIssuingAuthorizationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations/:authorization/capture',
    postV1TestHelpersIssuingAuthorizationsAuthorizationCaptureHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations/:authorization/expire',
    postV1TestHelpersIssuingAuthorizationsAuthorizationExpireHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations/:authorization/finalize_amount',
    postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations/:authorization/fraud_challenges/respond',
    postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations/:authorization/increment',
    postV1TestHelpersIssuingAuthorizationsAuthorizationIncrementHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/authorizations/:authorization/reverse',
    postV1TestHelpersIssuingAuthorizationsAuthorizationReverseHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/cards/:card/shipping/deliver',
    postV1TestHelpersIssuingCardsCardShippingDeliverHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/cards/:card/shipping/fail',
    postV1TestHelpersIssuingCardsCardShippingFailHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/cards/:card/shipping/return',
    postV1TestHelpersIssuingCardsCardShippingReturnHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/cards/:card/shipping/ship',
    postV1TestHelpersIssuingCardsCardShippingShipHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/cards/:card/shipping/submit',
    postV1TestHelpersIssuingCardsCardShippingSubmitHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/personalization_designs/:personalization_design/activate',
    postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/personalization_designs/:personalization_design/deactivate',
    postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/personalization_designs/:personalization_design/reject',
    postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/issuing/settlements',
    postV1TestHelpersIssuingSettlementsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/settlements/:settlement/complete',
    postV1TestHelpersIssuingSettlementsSettlementCompleteHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/transactions/create_force_capture',
    postV1TestHelpersIssuingTransactionsCreateForceCaptureHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/transactions/create_unlinked_refund',
    postV1TestHelpersIssuingTransactionsCreateUnlinkedRefundHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/issuing/transactions/:transaction/refund',
    postV1TestHelpersIssuingTransactionsTransactionRefundHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/refunds/:refund/expire',
    postV1TestHelpersRefundsRefundExpireHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/terminal/readers/:reader/present_payment_method',
    postV1TestHelpersTerminalReadersReaderPresentPaymentMethodHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/terminal/readers/:reader/succeed_input_collection',
    postV1TestHelpersTerminalReadersReaderSucceedInputCollectionHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/terminal/readers/:reader/timeout_input_collection',
    postV1TestHelpersTerminalReadersReaderTimeoutInputCollectionHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/test_helpers/test_clocks',
    getV1TestHelpersTestClocksHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/test_clocks',
    postV1TestHelpersTestClocksHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/test_helpers/test_clocks/:test_clock',
    getV1TestHelpersTestClocksTestClockHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/test_helpers/test_clocks/:test_clock',
    deleteV1TestHelpersTestClocksTestClockHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/test_clocks/:test_clock/advance',
    postV1TestHelpersTestClocksTestClockAdvanceHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/inbound_transfers/:id/fail',
    postV1TestHelpersTreasuryInboundTransfersIdFailHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/inbound_transfers/:id/return',
    postV1TestHelpersTreasuryInboundTransfersIdReturnHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/inbound_transfers/:id/succeed',
    postV1TestHelpersTreasuryInboundTransfersIdSucceedHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_payments/:id',
    postV1TestHelpersTreasuryOutboundPaymentsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_payments/:id/fail',
    postV1TestHelpersTreasuryOutboundPaymentsIdFailHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_payments/:id/post',
    postV1TestHelpersTreasuryOutboundPaymentsIdPostHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_payments/:id/return',
    postV1TestHelpersTreasuryOutboundPaymentsIdReturnHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_transfers/:outbound_transfer',
    postV1TestHelpersTreasuryOutboundTransfersOutboundTransferHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_transfers/:outbound_transfer/fail',
    postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFailHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_transfers/:outbound_transfer/post',
    postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPostHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/treasury/outbound_transfers/:outbound_transfer/return',
    postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturnHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/test_helpers/treasury/received_credits',
    postV1TestHelpersTreasuryReceivedCreditsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/test_helpers/treasury/received_debits',
    postV1TestHelpersTreasuryReceivedDebitsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/three_d_secure/authentications',
    getV1ThreeDSecureAuthenticationsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/three_d_secure/authentications',
    postV1ThreeDSecureAuthenticationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/three_d_secure/authentications/:authentication',
    getV1ThreeDSecureAuthenticationsAuthenticationHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/three_d_secure/authentications/:authentication/cancel',
    postV1ThreeDSecureAuthenticationsAuthenticationCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/three_d_secure/authentications/:authentication/submit',
    postV1ThreeDSecureAuthenticationsAuthenticationSubmitHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/tokens',
    postV1TokensHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/tokens/:token',
    getV1TokensTokenHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/topups',
    getV1TopupsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/topups',
    postV1TopupsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/topups/:topup',
    getV1TopupsTopupHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/topups/:topup',
    postV1TopupsTopupHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/topups/:topup/cancel',
    postV1TopupsTopupCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/transfers',
    getV1TransfersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/transfers',
    postV1TransfersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/transfers/:id/reversals',
    getV1TransfersIdReversalsHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/transfers/:id/reversals',
    postV1TransfersIdReversalsHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/transfers/:transfer',
    getV1TransfersTransferHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/transfers/:transfer',
    postV1TransfersTransferHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/transfers/:transfer/reversals/:id',
    getV1TransfersTransferReversalsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/transfers/:transfer/reversals/:id',
    postV1TransfersTransferReversalsIdHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/credit_reversals',
    getV1TreasuryCreditReversalsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/credit_reversals',
    postV1TreasuryCreditReversalsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/credit_reversals/:credit_reversal',
    getV1TreasuryCreditReversalsCreditReversalHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/debit_reversals',
    getV1TreasuryDebitReversalsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/debit_reversals',
    postV1TreasuryDebitReversalsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/debit_reversals/:debit_reversal',
    getV1TreasuryDebitReversalsDebitReversalHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/financial_accounts',
    getV1TreasuryFinancialAccountsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/financial_accounts',
    postV1TreasuryFinancialAccountsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/financial_accounts/:financial_account',
    getV1TreasuryFinancialAccountsFinancialAccountHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/financial_accounts/:financial_account',
    postV1TreasuryFinancialAccountsFinancialAccountHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/financial_accounts/:financial_account/close',
    postV1TreasuryFinancialAccountsFinancialAccountCloseHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/financial_accounts/:financial_account/features',
    getV1TreasuryFinancialAccountsFinancialAccountFeaturesHandler(
      async (c, { param, query, form }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/v1/treasury/financial_accounts/:financial_account/features',
    postV1TreasuryFinancialAccountsFinancialAccountFeaturesHandler(
      async (c, { param, form }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/v1/treasury/inbound_transfers',
    getV1TreasuryInboundTransfersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/inbound_transfers',
    postV1TreasuryInboundTransfersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/inbound_transfers/:id',
    getV1TreasuryInboundTransfersIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/inbound_transfers/:inbound_transfer/cancel',
    postV1TreasuryInboundTransfersInboundTransferCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/outbound_payments',
    getV1TreasuryOutboundPaymentsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/outbound_payments',
    postV1TreasuryOutboundPaymentsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/outbound_payments/:id',
    getV1TreasuryOutboundPaymentsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/outbound_payments/:id/cancel',
    postV1TreasuryOutboundPaymentsIdCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/outbound_transfers',
    getV1TreasuryOutboundTransfersHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/outbound_transfers',
    postV1TreasuryOutboundTransfersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/outbound_transfers/:outbound_transfer',
    getV1TreasuryOutboundTransfersOutboundTransferHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/treasury/outbound_transfers/:outbound_transfer/cancel',
    postV1TreasuryOutboundTransfersOutboundTransferCancelHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/received_credits',
    getV1TreasuryReceivedCreditsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/received_credits/:id',
    getV1TreasuryReceivedCreditsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/received_debits',
    getV1TreasuryReceivedDebitsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/received_debits/:id',
    getV1TreasuryReceivedDebitsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/transaction_entries',
    getV1TreasuryTransactionEntriesHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/transaction_entries/:id',
    getV1TreasuryTransactionEntriesIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/transactions',
    getV1TreasuryTransactionsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/treasury/transactions/:id',
    getV1TreasuryTransactionsIdHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/webhook_endpoints',
    getV1WebhookEndpointsHandler(async (c, { query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/webhook_endpoints',
    postV1WebhookEndpointsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v1/webhook_endpoints/:webhook_endpoint',
    getV1WebhookEndpointsWebhookEndpointHandler(async (c, { param, query, form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v1/webhook_endpoints/:webhook_endpoint',
    postV1WebhookEndpointsWebhookEndpointHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v1/webhook_endpoints/:webhook_endpoint',
    deleteV1WebhookEndpointsWebhookEndpointHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
