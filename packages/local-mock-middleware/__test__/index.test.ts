/* eslint-disable */
import { describe, expect, test } from '@jest/globals'
const { name } = require('../src/index')

test('name to equal local-mock-middleware', () => {
  expect(name).toBe('local-mock-middleware')
})
