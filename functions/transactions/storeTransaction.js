const Transaction = require('../../models/Transaction')
const validate = require('validate.js')
const { ValidationException } = require('../exceptions')
const { dateFormat, dateTimeFormat } = require('../helpers')
const moment = require('moment')

async function storeTransaction (coinId, userId, input) {
  const { amount, price, cost, date } = JSON.parse(input)

  validate.extend(validate.validators.datetime, {
    parse (value, options) {
      return +moment.utc(value)
    },
    format (value, options) {
      const format = options.dateOnly ? dateFormat : dateTimeFormat

      return moment.utc(value).format(format)
    }
  })

  const errors = validate({ userId, amount, price, cost, date }, Transaction.rules)
  if (errors) {
    throw new ValidationException(errors)
  }

  return Transaction.create({ userId, coinId, amount, price, cost, date })
}

module.exports = storeTransaction
