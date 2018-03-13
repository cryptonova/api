const Model = require('./Model')

class Supply extends Model {
  static get tableName () {
    return 'supplies'
  }

  static create (data) {
    return this.query().insert(data)
  }

  static findByCoinIdAndDate (coinId, date, select = '*', operator = '>=') {
    return this.query().where('coinId', coinId).where('date', operator, date).select(select).first()
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['coinId', 'available', 'total', 'max', 'date'],

      properties: {
        id: {
          type: 'integer'
        },
        coinId: {
          type: 'integer'
        },
        available: {
          type: ['number', 'null']
        },
        total: {
          type: ['number', 'null']
        },
        max: {
          type: ['number', 'null']
        },
        date: {
          type: 'date'
        }
      }
    }
  }
}

module.exports = Supply
