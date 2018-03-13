const { parseFloatOrNull } = require('../functions/helpers')

class PriceTransformer {
  static transform (price) {
    return {
      usd: parseFloatOrNull(price.usd),
      btc: parseFloatOrNull(price.btc),
      volume: {
        '1d': parseFloatOrNull(price.volume1d)
      },
      change: {
        '1h': parseFloatOrNull(price.percentChange1h),
        '1d': parseFloatOrNull(price.percentChange1d),
        '1w': parseFloatOrNull(price.percentChange1w)
      },
      date: price.date
    }
  }
}

module.exports = PriceTransformer
