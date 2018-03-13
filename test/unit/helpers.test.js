/* eslint-disable no-undef */
const chai = require('chai')
const assert = chai.assert
const { precisionRound, parseFloatOrNull, timestampToDateTime } = require('../../functions/helpers')

describe('helpers', () => {
  describe('- precisionRound', () => {
    it('should round values with correct precision', () => {
      let value = precisionRound(10.3421, 2)
      assert.equal(value, 10.34)

      value = precisionRound(10.5, 0)
      assert.equal(value, 11)

      value = precisionRound(0.798, 1)
      assert.equal(value, 0.8)

      value = precisionRound('12.345', 2)
      assert.equal(value, 12.35)
    })
  })

  describe('- parseFloatOrNull', () => {
    it('should parse a value as float or null', () => {
      let value = parseFloatOrNull('123.45')
      assert.equal(value, 123.45)

      value = parseFloatOrNull('string')
      assert.equal(value, null)
    })
  })

  describe('- timestampToDateTime', () => {
    it('should render date time from unix seconds', () => {
      let timestamp = 1520202827
      let value = timestampToDateTime(timestamp)
      assert.equal(value, '2018-03-04 22:33:47')
    })
    it('should render date time from unix milliseconds', () => {
      timestamp = 1520202827000
      value = timestampToDateTime(timestamp)
      assert.equal(value, '2018-03-04 22:33:47')
    })
  })
})
