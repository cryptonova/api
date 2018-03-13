const Transaction = require('../../models/Transaction')
const User = require('../../models/User')
const { precisionRound } = require('../helpers')

async function fetchPortfolio (userId) {
  const user = await User.findById(userId, 'id')
    .eager('coins.[price, marketCap, supply]')
    .modifyEager('coins', builder => {
      builder.select(['coins.id', 'name', 'hexColor'])
    })
    .modifyEager('coins.price', builder => {
      builder.select('usd').orderBy('date', 'desc')
    })
    .modifyEager('coins.marketCap', builder => {
      builder.select('usd').orderBy('date', 'desc')
    })
    .modifyEager('coins.supply', builder => {
      builder.select(['available', 'total', 'max']).orderBy('date', 'desc')
    })

  let totalValue = 0
  let totalCost = 0

  for (let coin of user.coins) {
    const transactions = await Transaction.findByCoinIdAndUserId(coin.id, userId, ['amount', 'cost'])

    for (let transaction of transactions) {
      const value = parseFloat(coin.price.usd) * parseFloat(transaction.amount)
      totalValue = totalValue + value
      totalCost = totalCost + parseFloat(transaction.cost)
    }
  }

  const totalProfit = totalValue - totalCost
  const partsPerMillion = 100 * 10000 // 1% is 10,000 ppm
  const coins = []

  for (let coin of user.coins) {
    const transactions = await Transaction.findByCoinIdAndUserId(coin.id, userId, ['amount', 'cost'])

    let value = 0
    let profit = 0
    let amount = 0
    let cost = 0

    for (let transaction of transactions) {
      value = value + (parseFloat(coin.price.usd) * parseFloat(transaction.amount))
      cost = cost + parseFloat(transaction.cost)
      amount = amount + parseFloat(transaction.amount)
    }

    profit = value - cost

    let supply
    if (Number.isInteger(coin.supply.max)) {
      supply = coin.supply.max
    } else if (Number.isInteger(coin.supply.total)) {
      supply = coin.supply.total
    } else if (Number.isInteger(coin.supply.available)) {
      supply = coin.supply.available
    }

    coins.push({
      name: coin.name,
      hexColor: coin.hexColor,
      value: value,
      percentageOfValue: precisionRound(value / totalValue * 100, 2),
      percentageOfProfit: precisionRound(profit / totalProfit * 100, 2),
      ppmOfMarketCap: precisionRound(value / coin.marketCap.usd * partsPerMillion, 2),
      ppmOfTotalSupply: precisionRound(amount / supply * partsPerMillion, 2)
    })
  }

  return coins
}

module.exports = fetchPortfolio
