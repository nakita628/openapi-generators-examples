import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'

export const v2Handler = new Hono()
  .get('/v2/bot/insight/demographic', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/insight/message/delivery',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          date: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/followers',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          date: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[0-9]{8}$/),
              Schema.makeFilter((input) => [...input].length === 8, {
                expected: 'a string of 8 characters',
              }),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          requestId: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customAggregationUnit: Schema.String.check(
            Schema.isPattern(/^[a-zA-Z0-9_]{1,30}$/),
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 30, {
              expected: 'a string of at most 30 characters',
            }),
          ),
          from: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20210301'] }),
          to: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20210301'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/summary',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          richMenuId: Schema.String.annotate({
            jsonSchemaExamples: ['richmenu-0123456789abcdef0123456789abcdef'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          from: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260213'] }),
          to: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260215'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/daily',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          richMenuId: Schema.String.annotate({
            jsonSchemaExamples: ['richmenu-0123456789abcdef0123456789abcdef'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          from: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260213'] }),
          to: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260215'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
