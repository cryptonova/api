const Coin = require('../../models/Coin')

function searchCoin (query) {
  return Coin.query()
    .select(['name', 'ticker', 'image', 'slug'])
    .where('name', 'like', `%${query}%`)
    .orWhere('ticker', 'like', `%${query}%`)
    .orderBy('rank', 'asc')
    .limit(5)
}

module.exports = searchCoin
