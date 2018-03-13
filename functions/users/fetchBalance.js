const Transaction = require('../../models/Transaction')
const Price = require('../../models/Price')
const User = require('../../models/User')

async function fetchBalance (userId) {
  let balance = []
  const user = await User.findById(userId)
    .eager('coins')
    .modifyEager('coins', builder => builder.select('coins.id'))

  for (let coin of user.coins) {
    const price = await Price.findByCoinId(coin.id, 'usd')
    const transactions = await Transaction.findByCoinIdAndUserId(coin.id, userId, ['amount', 'cost'])

    for (let transaction of transactions) {
      const value = parseFloat(transaction.amount) * parseFloat(price.usd)

      balance.push({
        value,
        profit: value - parseFloat(transaction.cost)
      })
    }
  }

  // TODO: Refactor to BalanceTransformer
  return balance.reduce((prevBalance, balance) => {
    return {
      value: prevBalance.value + balance.value,
      profit: prevBalance.profit + balance.profit
    }
  }, {
    value: 0,
    profit: 0
  })
}

module.exports = fetchBalance
