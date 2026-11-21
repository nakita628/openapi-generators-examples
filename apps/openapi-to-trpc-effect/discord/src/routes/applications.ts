import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  ActionTypesSchema,
  ActivitiesAttachmentResponseSchema,
  ApplicationCommandAttachmentOptionSchema,
  ApplicationCommandBooleanOptionSchema,
  ApplicationCommandChannelOptionSchema,
  ApplicationCommandHandlerSchema,
  ApplicationCommandIntegerOptionSchema,
  ApplicationCommandMentionableOptionSchema,
  ApplicationCommandNumberOptionSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandRoleOptionSchema,
  ApplicationCommandStringOptionSchema,
  ApplicationCommandSubcommandGroupOptionSchema,
  ApplicationCommandSubcommandOptionSchema,
  ApplicationCommandTypeSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationCommandUserOptionSchema,
  ApplicationEventWebhooksStatusSchema,
  ApplicationExplicitContentFilterTypesSchema,
  ApplicationFormPartialSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
  CommandPermissionsResponseSchema,
  EmbeddedActivityInstanceSchema,
  EmojiResponseSchema,
  EntitlementOwnerTypesSchema,
  EntitlementResponseSchema,
  InteractionContextTypeSchema,
  ListApplicationEmojisResponseSchema,
  PrivateApplicationResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

const t = initTRPC.create()

export const applicationsRouter = t.router({
  getApplicationsMe: t.procedure
    .output(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsMe: t.procedure
    .input(Schema.toStandardSchemaV1(ApplicationFormPartialSchema))
    .output(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          description: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                default: Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 400, {
                    expected: 'a string of at most 400 characters',
                  }),
                ),
                localizations: Schema.optional(
                  Schema.NullOr(
                    Schema.Record(
                      Schema.String,
                      Schema.String.check(
                        Schema.makeFilter((input) => [...input].length <= 400, {
                          expected: 'a string of at most 400 characters',
                        }),
                      ),
                    ),
                  ),
                ),
              }),
            ),
          ),
          icon: Schema.optional(Schema.NullOr(Schema.String)),
          cover_image: Schema.optional(Schema.NullOr(Schema.String)),
          team_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          interactions_endpoint_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          explicit_content_filter: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationExplicitContentFilterTypesSchema]),
          ),
          max_participants: Schema.optional(
            Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(-1))),
          ),
          type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema])),
          tags: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 20, {
                    expected: 'a string of at most 20 characters',
                  }),
                ),
              ).check(Schema.isMaxLength(5), Schema.isUnique()),
            ),
          ),
          custom_install_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          install_params: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationOAuth2InstallParamsSchema]),
          ),
          role_connections_verification_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ),
          ),
          integration_types_config: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.Union([
                  Schema.NullOr(Schema.Null),
                  ApplicationIntegrationTypeConfigurationSchema,
                ]),
              ),
            ),
          ),
          event_webhooks_status: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationEventWebhooksStatusSchema]),
          ),
          event_webhooks_url: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => URL.canParse(input)),
                Schema.makeFilter((input) => [...input].length <= 2048, {
                  expected: 'a string of at most 2048 characters',
                }),
              ),
            ).annotate({ description: 'Event webhooks URL for the app to receive webhook events' }),
          ),
          event_webhooks_types: Schema.optional(
            Schema.NullOr(Schema.Array(ActionTypesSchema).check(Schema.isUnique())),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdActivityInstancesInstanceId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          instance_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmbeddedActivityInstanceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdAttachment: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(ActivitiesAttachmentResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommands: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          with_localizations: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema))),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdCommands: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          body: Schema.NullOr(
            Schema.Array(ApplicationCommandUpdateRequestSchema).check(Schema.isMaxLength(130)),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema))),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdCommands: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          name_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 32, {
                    expected: 'a string of at most 32 characters',
                  }),
                ),
              ),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          description_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 100, {
                    expected: 'a string of at most 100 characters',
                  }),
                ),
              ),
            ),
          ),
          options: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ApplicationCommandAttachmentOptionSchema,
                  ApplicationCommandBooleanOptionSchema,
                  ApplicationCommandChannelOptionSchema,
                  ApplicationCommandIntegerOptionSchema,
                  ApplicationCommandMentionableOptionSchema,
                  ApplicationCommandNumberOptionSchema,
                  ApplicationCommandRoleOptionSchema,
                  ApplicationCommandStringOptionSchema,
                  ApplicationCommandSubcommandGroupOptionSchema,
                  ApplicationCommandSubcommandOptionSchema,
                  ApplicationCommandUserOptionSchema,
                ]),
              ).check(Schema.isMaxLength(25)),
            ),
          ),
          default_member_permissions: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(18014398509481984),
              ),
            ),
          ),
          dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
          contexts: Schema.optional(
            Schema.NullOr(
              Schema.Array(InteractionContextTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          integration_types: Schema.optional(
            Schema.NullOr(
              Schema.Array(ApplicationIntegrationTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          handler: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
              description:
                "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            }),
          ),
          type: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandTypeSchema]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
          name_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 32, {
                    expected: 'a string of at most 32 characters',
                  }),
                ),
              ),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          description_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 100, {
                    expected: 'a string of at most 100 characters',
                  }),
                ),
              ),
            ),
          ),
          options: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ApplicationCommandAttachmentOptionSchema,
                  ApplicationCommandBooleanOptionSchema,
                  ApplicationCommandChannelOptionSchema,
                  ApplicationCommandIntegerOptionSchema,
                  ApplicationCommandMentionableOptionSchema,
                  ApplicationCommandNumberOptionSchema,
                  ApplicationCommandRoleOptionSchema,
                  ApplicationCommandStringOptionSchema,
                  ApplicationCommandSubcommandGroupOptionSchema,
                  ApplicationCommandSubcommandOptionSchema,
                  ApplicationCommandUserOptionSchema,
                ]),
              ).check(Schema.isMaxLength(25)),
            ),
          ),
          default_member_permissions: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(18014398509481984),
              ),
            ),
          ),
          dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
          contexts: Schema.optional(
            Schema.NullOr(
              Schema.Array(InteractionContextTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          integration_types: Schema.optional(
            Schema.NullOr(
              Schema.Array(ApplicationIntegrationTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          handler: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
              description:
                "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojis: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(ListApplicationEmojisResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEmojis: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 2, {
              expected: 'a string of at least 2 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          image: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmojiResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmojiResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          emoji_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmojiResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlements: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          user_id: Schema.optional(SnowflakeTypeSchema),
          sku_ids: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(100),
                Schema.isUnique(),
              ),
            ]),
          ),
          guild_id: Schema.optional(SnowflakeTypeSchema),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          exclude_ended: Schema.optional(Schema.Boolean),
          exclude_deleted: Schema.optional(Schema.Boolean),
          only_active: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(EntitlementResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlements: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          sku_id: SnowflakeTypeSchema.annotate({
            description: 'ID of the SKU to grant the entitlement to',
          }),
          owner_id: SnowflakeTypeSchema.annotate({
            description: 'ID of the guild or user to grant the entitlement to',
          }),
          owner_type: EntitlementOwnerTypesSchema.annotate({
            description: '1 for a guild subscription, 2 for a user subscription',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EntitlementResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EntitlementResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          with_localizations: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema))),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          body: Schema.NullOr(
            Schema.Array(ApplicationCommandUpdateRequestSchema).check(Schema.isMaxLength(130)),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ApplicationCommandResponseSchema))),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          name_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 32, {
                    expected: 'a string of at most 32 characters',
                  }),
                ),
              ),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          description_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 100, {
                    expected: 'a string of at most 100 characters',
                  }),
                ),
              ),
            ),
          ),
          options: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ApplicationCommandAttachmentOptionSchema,
                  ApplicationCommandBooleanOptionSchema,
                  ApplicationCommandChannelOptionSchema,
                  ApplicationCommandIntegerOptionSchema,
                  ApplicationCommandMentionableOptionSchema,
                  ApplicationCommandNumberOptionSchema,
                  ApplicationCommandRoleOptionSchema,
                  ApplicationCommandStringOptionSchema,
                  ApplicationCommandSubcommandGroupOptionSchema,
                  ApplicationCommandSubcommandOptionSchema,
                  ApplicationCommandUserOptionSchema,
                ]),
              ).check(Schema.isMaxLength(25)),
            ),
          ),
          default_member_permissions: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(18014398509481984),
              ),
            ),
          ),
          dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
          contexts: Schema.optional(
            Schema.NullOr(
              Schema.Array(InteractionContextTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          integration_types: Schema.optional(
            Schema.NullOr(
              Schema.Array(ApplicationIntegrationTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          handler: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
              description:
                "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            }),
          ),
          type: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandTypeSchema]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(CommandPermissionsResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
          name_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 32, {
                    expected: 'a string of at most 32 characters',
                  }),
                ),
              ),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          description_localizations: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 100, {
                    expected: 'a string of at most 100 characters',
                  }),
                ),
              ),
            ),
          ),
          options: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ApplicationCommandAttachmentOptionSchema,
                  ApplicationCommandBooleanOptionSchema,
                  ApplicationCommandChannelOptionSchema,
                  ApplicationCommandIntegerOptionSchema,
                  ApplicationCommandMentionableOptionSchema,
                  ApplicationCommandNumberOptionSchema,
                  ApplicationCommandRoleOptionSchema,
                  ApplicationCommandStringOptionSchema,
                  ApplicationCommandSubcommandGroupOptionSchema,
                  ApplicationCommandSubcommandOptionSchema,
                  ApplicationCommandUserOptionSchema,
                ]),
              ).check(Schema.isMaxLength(25)),
            ),
          ),
          default_member_permissions: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(18014398509481984),
              ),
            ),
          ),
          dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
          contexts: Schema.optional(
            Schema.NullOr(
              Schema.Array(InteractionContextTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          integration_types: Schema.optional(
            Schema.NullOr(
              Schema.Array(ApplicationIntegrationTypeSchema).check(
                Schema.isMinLength(1),
                Schema.isUnique(),
              ),
            ),
          ),
          handler: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
              description:
                "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationCommandResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CommandPermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          guild_id: SnowflakeTypeSchema,
          command_id: SnowflakeTypeSchema,
          permissions: Schema.optional(
            Schema.NullOr(
              Schema.Array(ApplicationCommandPermissionSchema).check(Schema.isMaxLength(100)),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CommandPermissionsResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(Schema.Array(ApplicationRoleConnectionsMetadataItemResponseSchema)),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          body: Schema.NullOr(
            Schema.Array(ApplicationRoleConnectionsMetadataItemRequestSchema).check(
              Schema.isMaxLength(5),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(Schema.Array(ApplicationRoleConnectionsMetadataItemResponseSchema)),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
