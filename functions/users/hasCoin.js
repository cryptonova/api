const CoinUser = require('../../models/CoinUser')

async function hasCoin (coinId, userId) {
  const match = await CoinUser.query()
    .where('coinId', coinId)
    .where('userId', userId)
    .count('id as count')
    .first()

  return {
    isSaved: !!match.count
  }
}

module.exports = hasCoin
