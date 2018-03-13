const CoinUser = require('../../models/CoinUser')

async function toggleCoin (coinId, userId, method) {
  if (method === 'POST') {
    await CoinUser.query().insert({ coinId, userId })

    return {
      message: 'Coin has been added'
    }
  }

  if (method === 'DELETE') {
    await CoinUser.query().delete().where('coinId', coinId).where('userId', userId)

    return {
      message: 'Coin has been deleted'
    }
  }
}

module.exports = toggleCoin
