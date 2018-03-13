const moment = require('moment')

/**
 * Round number to nearest precision.
 *
 * @param number {float}
 * @param precision {integer}
 * @returns {number}
 */
function precisionRound (number, precision) {
  const factor = Math.pow(10, precision)

  return Math.round(number * factor) / factor
}

/**
 * Parse value as float or null.
 *
 * @param value {float|string}
 * @returns {number|null}
 */
function parseFloatOrNull (value) {
  value = parseFloat(value)

  if (Number.isNaN(value)) {
    value = null
  }

  return value
}

/**
 * Convert timestamp to UTC date time.
 *
 * @param timestamp {integer}
 * @returns {string}
 */
function timestampToDateTime (timestamp) {
  // Unix Timestamp (milliseconds)
  if (timestamp.toString().length === 13) {
    return moment(timestamp).utc().format(dateTimeFormat)
  }

  // Unix Timestamp (seconds)
  if (timestamp.toString().length === 10) {
    return moment.unix(timestamp).utc().format(dateTimeFormat)
  }
}

/**
 * Date format.
 *
 * @type {string}
 */
const dateFormat = 'YYYY-MM-DD'

/**
 * Date time format.
 *
 * @type {string}
 */
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'

/**
 * Generate policy to allow/deny user access to resource.
 *
 * @param userId
 * @param Effect
 * @param Resource
 * @param isAdmin
 * @returns {object}
 */
const generatePolicy = (userId, Effect, Resource, isAdmin) => ({
  principalId: userId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{ Action: 'execute-api:Invoke', Effect, Resource }]
  },
  context: {
    userId,
    isAdmin
  }
})

module.exports = {
  parseFloatOrNull, timestampToDateTime, dateTimeFormat, dateFormat, precisionRound, generatePolicy
}
