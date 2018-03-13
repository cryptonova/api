const { parseFloatOrNull } = require('../functions/helpers')
const moment = require('moment')

class TransactionTransformer {
  static transform (transaction) {
    return {
      id: transaction.id,
      amount: parseFloatOrNull(transaction.amount),
      price: parseFloatOrNull(transaction.price),
      cost: parseFloatOrNull(transaction.cost),
      date: moment(transaction.date).format()
    }
  }
}

module.exports = TransactionTransformer
