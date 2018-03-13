const Transaction = require('../../models/Transaction')
const Transformer = require('../../transformers/Transformer')
const TransactionTransformer = require('../../transformers/TransactionTransformer')

async function fetchCoinTransactions (coinId, userId) {
  const transactions = await Transaction.findByCoinIdAndUserId(coinId, userId)

  return new Transformer(TransactionTransformer).transform(transactions)
}

module.exports = fetchCoinTransactions
