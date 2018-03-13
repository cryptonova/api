const Coin = require('../../models/Coin')
const Price = require('../../models/Price')
const MarketCap = require('../../models/MarketCap')
const Supply = require('../../models/Supply')
const { parseFloatOrNull, timestampToDateTime } = require('../helpers')
const axios = require('axios')

async function updateCoinData (limit = 5000) {
  const response = await axios.get(`${process.env.CMC_TICKER_API_URL}?limit=${limit}`)
  const coins = response.data

  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < coins.length; index++) {
      try {
        const coin = coins[index]
        const result = await Coin.findBySlug(coin.id)
        const coinId = result.id
        await Coin.patchById(coinId, { rank: parseInt(coin.rank) })

        if (coin.last_updated) {
          const date = timestampToDateTime(coin.last_updated)

          const price = await Price.findByCoinIdAndDate(coinId, date, 'id', '=')
          if (typeof price === 'undefined') {
            await Price.create({
              coinId,
              usd: parseFloatOrNull(coin.price_usd),
              btc: parseFloatOrNull(coin.price_btc),
              percentChange1h: parseFloatOrNull(coin.percent_change_1h),
              percentChange1d: parseFloatOrNull(coin.percent_change_24h),
              percentChange1w: parseFloatOrNull(coin.percent_change_7d),
              volume1d: parseFloatOrNull(coin['24h_volume_usd']),
              date
            })
          }

          const marketCap = await MarketCap.findByCoinIdAndDate(coinId, date, 'id', '=')
          if (typeof marketCap === 'undefined') {
            await MarketCap.create({
              coinId,
              usd: parseFloatOrNull(coin.market_cap_usd),
              date
            })
          }

          const supply = await Supply.findByCoinIdAndDate(coinId, date, 'id', '=')
          if (typeof supply === 'undefined') {
            await Supply.create({
              coinId,
              available: parseFloatOrNull(coin.available_supply),
              total: parseFloatOrNull(coin.total_supply),
              max: parseFloatOrNull(coin.max_supply),
              date
            })
          }
        }
      } catch (error) {
        // We are not throwing this error because it would cancel further indexing
        console.error(error)
      }
    }

    return resolve('Coin data has been updated')
  })
}

module.exports = updateCoinData
