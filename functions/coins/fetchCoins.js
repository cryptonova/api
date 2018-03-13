const Coin = require('../../models/Coin')
const Transformer = require('../../transformers/Transformer')
const CoinTransformer = require('../../transformers/CoinTransformer')

async function fetchCoins (page, itemsPerPage = 10) {
  page = Number.isInteger(page) ? page : 0

  const response = await Coin.query().select(['id', 'name', 'ticker', 'rank', 'image', 'slug', 'url', 'whitePaperUrl', 'videoUrl'])
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
    })
    .orderBy('rank').page(page, itemsPerPage)

  const prevPage = page - 1
  const nextPage = page + 1
  // We are using floor instead of ceiling because the first page has index zero.
  const totalPages = Math.floor(response.total / itemsPerPage)
  const hasPrevPage = page < totalPages
  const hasNextPage = page > 0 && page < totalPages

  const prevPageUrl = hasNextPage ? `${process.env.API_URL}/coins?page=${prevPage}` : null
  const nextPageUrl = hasPrevPage ? `${process.env.API_URL}/coins?page=${nextPage}` : null
  const coins = new Transformer(CoinTransformer).transform(response.results)

  return {
    coins,
    pagination: {
      prevPageUrl,
      nextPageUrl,
      page
    }
  }
}

module.exports = fetchCoins
