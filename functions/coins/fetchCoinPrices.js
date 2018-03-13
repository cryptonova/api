const Coin = require('../../models/Coin')
const Price = require('../../models/Price')
const Transformer = require('../../transformers/Transformer')
const PriceTransformer = require('../../transformers/PriceTransformer')
const { BadRequestException } = require('../exceptions')
const { dateFormat, dateTimeFormat } = require('../helpers')
const momentRange = require('moment-range')
const moment = momentRange.extendMoment(require('moment'))

async function fetchCoinPrices (slug, queryString) {
  const coin = await Coin.findBySlug(slug, 'id')

  try {
    const date = queryString.date

    return await fetchPriceByCoinIdAndDate(coin.id, date)
  } catch (error) {
    console.error(error)
  }

  try {
    const days = parseInt(queryString.days)

    return await fetchPricesByCoinIdAndDays(coin.id, days)
  } catch (error) {
    console.error(error)
  }

  throw new BadRequestException()
}

async function fetchPriceByCoinIdAndDate (coinId, date) {
  const currentDate = moment.utc().format(dateFormat)
  const selectedDate = moment.parseZone(date.replace(' ', '+')).utc().format(dateFormat)
  let price

  if (currentDate === selectedDate) {
    // Select the latest price
    price = await Price.findByCoinId(coinId, ['usd', 'date'])
  } else {
    // Select the price closest to selected date
    price = await Price.findByCoinIdAndDate(coinId, selectedDate, ['usd', 'date'])
  }

  return new Transformer(PriceTransformer).transform(price)
}

async function fetchPricesByCoinIdAndDays (coinId, days) {
  const fromDate = moment().utc().subtract(days, 'days').format(dateTimeFormat)
  const toDate = moment().utc().format(dateTimeFormat)
  const range = moment.range(fromDate, toDate)
  const data = []
  const rangeBy = days < 8 ? 'hours' : 'days'

  for (let dateTime of range.by(rangeBy)) {
    const startOfDay = dateTime.startOf(rangeBy).format(dateTimeFormat)
    const endOfDay = dateTime.endOf(rangeBy).format(dateTimeFormat)

    const prices = await Price.query()
      .select(['usd', 'date'])
      .where('coinId', coinId)
      .where('date', '>=', startOfDay)
      .where('date', '<=', endOfDay)

    if (prices.length) {
      // Calculate the average price
      const price = prices.reduce((prevItem, item, index, array) => {
        return {
          usd: prevItem.usd + parseFloat(item.usd / array.length),
          date: item.date
        }
      }, { usd: 0 })

      data.push(price)
    }
  }

  return new Transformer(PriceTransformer).transform(data)
}

module.exports = fetchCoinPrices
