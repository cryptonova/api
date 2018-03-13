const Model = require('./Model')

class MarketCap extends Model {
  static get tableName () {
    return 'marketCaps'
  }

  static create (data) {
    return this.query().insert(data)
  }

  static findByCoinId (coinId, select = '*') {
    return this.query().where('coinId', coinId).orderBy('date', 'desc').select(select).first()
  }

  static findByCoinIdAndDate (coinId, date, select = '*', operator = '>=') {
    return this.query().where('coinId', coinId).where('date', operator, date).select(select).first()
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['coinId', 'usd', 'date'],

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
        date: {
          type: 'date'
        }
      }
    }
  }
}

module.exports = MarketCap
