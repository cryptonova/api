const Balance = require('../../models/Balance')
const fetchBalance = require('./fetchBalance')

async function storeBalance (userId) {
  const balance = await fetchBalance(userId)
  balance.userId = userId

  return Balance.create(balance)
}

module.exports = storeBalance
