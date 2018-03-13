const Model = require('./Model')

class CoinUser extends Model {
  static get tableName () {
    return 'coins_users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['coinId', 'userId'],

      properties: {
        id: {
          type: 'integer'
        },
        coinId: {
          type: 'integer'
        },
        userId: {
          type: 'integer'
        }
      }
    }
  }
}

module.exports = CoinUser
