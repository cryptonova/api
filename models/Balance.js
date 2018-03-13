const Model = require('./Model')

class Balance extends Model {
  static get tableName () {
    return 'balances'
  }

  static create (data) {
    return this.query().insert(data)
  }

  static findByUserId (userId, select = '*') {
    return this.query().where('userId', userId).select(select)
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['userId', 'value', 'profit'],

      properties: {
        userId: {
          type: 'integer'
        },
        value: {
          type: 'number'
        },
        profit: {
          type: 'number'
        }
      }
    }
  }
}

module.exports = Balance
