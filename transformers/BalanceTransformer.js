class CoinTransformer {
  static transform (balance) {
    return {
      value: balance.value,
      profit: balance.profit,
      date: balance.createdAt
    }
  }
}

module.exports = CoinTransformer
