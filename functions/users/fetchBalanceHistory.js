const Balance = require('../../models/Balance')
const Transformer = require('../../transformers/Transformer')
const BalanceTransformer = require('../../transformers/BalanceTransformer')

async function fetchBalanceHistory (userId, days) {
  const limit = days * 4 // A snapshot is stored every 6th hour
  const data = await Balance.findByUserId(userId, ['value', 'profit', 'createdAt'])
    .orderBy('createdAt', 'desc')
    .limit(limit)

  return new Transformer(BalanceTransformer).transform(data)
}

module.exports = fetchBalanceHistory
