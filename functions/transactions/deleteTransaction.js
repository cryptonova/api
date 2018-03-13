const Transaction = require('../../models/Transaction')

async function deleteTransaction (id, userId) {
  await Transaction.deleteByIdAndUserId(id, userId)

  return {
    message: 'Transaction has been deleted'
  }
}

module.exports = deleteTransaction
