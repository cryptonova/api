const Coin = require('../../models/Coin')
const Transformer = require('../../transformers/Transformer')
const CoinTransformer = require('../../transformers/CoinTransformer')
const { NotFoundException } = require('../exceptions')

async function fetchCoin (slug) {
  const coin = await Coin.findBySlug(slug, ['id', 'name', 'ticker', 'rank', 'image', 'slug', 'blogFeedUrl', 'url', 'whitePaperUrl', 'videoUrl'])
    .eager('[price, allTimeHigh, marketCap, supply]')
    .modifyEager('price', builder => {
      builder.select(['usd', 'btc', 'percentChange1h', 'percentChange1d', 'percentChange1w', 'volume1d']).orderBy('date', 'desc')
    })
    .modifyEager('allTimeHigh', builder => {
      builder.select('usd').orderBy('usd', 'desc')
    })
    .modifyEager('marketCap', builder => {
      builder.select('usd').orderBy('date', 'desc')
    })
    .modifyEager('supply', builder => {
      builder.select(['available', 'total', 'max']).orderBy('date', 'desc')
    }).first()

  if (typeof coin === 'undefined') {
    throw new NotFoundException()
  }

  return new Transformer(CoinTransformer).transform(coin)
}

module.exports = fetchCoin
