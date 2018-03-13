const Coin = require('../../models/Coin')
const Price = require('../../models/Price')
const MarketCap = require('../../models/MarketCap')
const axios = require('axios')
const { parseFloatOrNull, timestampToDateTime } = require('../helpers')

async function storeCoinData (coinId) {
  const coin = await Coin.findById(coinId, 'slug')
  const response = await axios.get(`${process.env.CMC_GRAPH_API_URL}/${coin.slug}`)
  const data = response.data

  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < data.price_usd.length; index++) {
      const date = timestampToDateTime(data.price_usd[index][0])

      const price = await Price.findByCoinIdAndDate(coinId, date, 'id', '=')
      if (typeof price === 'undefined') {
        await Price.create({
          coinId,
          usd: parseFloatOrNull(data.price_usd[index][1]),
          btc: parseFloatOrNull(data.price_btc[index][1]),
          volume1d: parseFloatOrNull(data['volume_usd'][index][1]),
          date
        })
      }

      const marketCap = await MarketCap.findByCoinIdAndDate(coinId, date, 'id', '=')
      if (marketCap === 'undefined') {
        await MarketCap.create({
          coinId,
          usd: parseFloatOrNull(data.market_cap_by_available_supply[index][1]),
          date
        })
      }
    }

    return resolve('Historic coin data has been stored')
  })
}

module.exports = storeCoinData
