/* eslint-disable */
import { describe, expect, test } from '@jest/globals'
const { name } = require('../src/index')

test('name to equal local-mock-h5', () => {
  expect(name).toBe('local-mock-h5')
})
