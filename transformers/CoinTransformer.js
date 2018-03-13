const { parseFloatOrNull, precisionRound } = require('../functions/helpers')

class CoinTransformer {
  static transform (coin) {
    const data = {
      id: coin.id,
      name: coin.name,
      ticker: coin.ticker,
      rank: coin.rank,
      image: coin.image,
      slug: coin.slug,
      url: coin.url,
      blogFeedUrl: coin.blogFeedUrl,
      whitePaperUrl: coin.whitePaperUrl,
      videoUrl: coin.videoUrl
    }

    // Include price if it has been eager loaded
    if (typeof coin.price !== 'undefined') {
      data.price = {
        usd: parseFloatOrNull(coin.price.usd),
        btc: parseFloatOrNull(coin.price.btc),
        change: {
          '1h': parseFloatOrNull(coin.price.percentChange1h),
          '1d': parseFloatOrNull(coin.price.percentChange1d),
          '1w': parseFloatOrNull(coin.price.percentChange1w)
        },
        volume: {
          '1d': parseFloatOrNull(coin.price.volume1d)
        }
      }
    }

    // Include all-time high price if it has been eager loaded
    if (typeof coin.allTimeHigh !== 'undefined') {
      data.price.ath = {
        usd: parseFloatOrNull(coin.allTimeHigh.usd),
        percentage: precisionRound((parseFloatOrNull(coin.price.usd) / parseFloatOrNull(coin.allTimeHigh.usd) * 100), 2)
      }
    }

    // Include supply if it has been eager loaded
    if (typeof coin.supply !== 'undefined') {
      data.supply = {
        available: coin.supply.available,
        total: coin.supply.total,
        max: coin.supply.max
      }
    }

    // Include market cap if it has been eager loaded
    if (typeof coin.marketCap !== 'undefined') {
      data.marketCap = {
        usd: parseFloat(coin.marketCap.usd)
      }
    }
    // Include transactions if it has been eager loaded
    if (typeof coin.transactions !== 'undefined') {
      data.amount = coin.transactions.reduce((prev, current) => {
        return prev.amount + parseFloat(current.amount)
      }, {
        amount: 0
      })
    }

    return data
  }
}

module.exports = CoinTransformer
