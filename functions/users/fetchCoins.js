const User = require('../../models/User')
const Transaction = require('../../models/Transaction')
const Transformer = require('../../transformers/Transformer')
const CoinTransformer = require('../../transformers/CoinTransformer')

/**
 * Fetch coins by user id.
 *
 * @param userId {integer}
 * @returns {Promise<*>}
 */
async function fetchCoins (userId) {
  const user = await User.findById(userId)
    .eager('[coins, coins.price]')
    .modifyEager('coins', builder => {
      builder.select(['coins.id', 'name', 'ticker', 'rank', 'image', 'slug']).orderBy('rank', 'asc')
    })
    .modifyEager('coins.price', builder => {
      builder.select(['usd', 'percentChange1d']).orderBy('date', 'desc')
    })
    // .modifyEager('coins.transactions', builder => {
    //   builder.select('amount').where('userId', userId)
    // })

  return new Transformer(CoinTransformer).transform(user.coins)
}

module.exports = fetchCoins
