const Model = require('./Model')

class Price extends Model {
  static get tableName () {
    return 'prices'
  }

  static create (data) {
    return this.query().insert(data)
  }

  static findByCoinId (coinId, select = '*') {
    return this.query().where('coinId', coinId).orderBy('date', 'desc').select(select).first()
  }

  static findByCoinIdAndDate (coinId, date, select = '*', operator = '>=') {
    return Price.query().select(select).where('coinId', coinId).where('date', operator, date).first()
  }

  static findAllByCoinIdAndDate (coinId, date, select = '*') {
    const startOfDay = moment(date).startOf('day').format(dateTimeFormat)
    const endOfDay = moment(date).endOf('day').format(dateTimeFormat)

    return Price.query()
      .select(select)
      .where('coinId', coinId)
      .where('date', '>=', startOfDay)
      .where('date', '<=', endOfDay)
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['coinId', 'usd', 'btc', 'volume1d', 'date'],

      properties: {
        id: {
          type: 'integer'
        },
        coinId: {
          type: 'integer'
        },
        usd: {
          type: ['number', 'null']
        },
        btc: {
          type: ['number', 'null']
        },
        percentChange1h: {
          type: ['number', 'null']
        },
        percentChange1d: {
          type: ['number', 'null']
        },
        percentChange1w: {
          type: ['number', 'null']
        },
        volume1d: {
          type: ['number', 'null']
        },
        date: {
          type: 'date'
        }
      }
    }
  }
}

module.exports = Price
