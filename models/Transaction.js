const Model = require('./Model')

class Transaction extends Model {
  static get tableName () {
    return 'transactions'
  }

  /**
   * Create transaction.
   *
   * @param input {object}
   * @returns {Transaction}
   */
  static create (input) {
    this.query().insert(input)
  }

  /**
   * Find transactions by coin id and user id.
   *
   * @param userId {integer}
   * @param coinId {integer}
   * @param select {string|array}
   * @returns {Transaction}
   */
  static findByCoinIdAndUserId (coinId, userId, select = '*') {
    return this.query().where('coinId', coinId).where('userId', userId).select(select).orderBy('date', 'desc')
  }

  /**
   * Delete transaction by id and user id.
   *
   * @param id {integer}
   * @param userId {integer}
   */
  static deleteByIdAndUserId (id, userId) {
    return this.query().where('id', id).where('userId', userId).delete()
  }

  /**
   * Validation rules.
   *
   * @returns {object}
   */
  static get rules () {
    return {
      userId: {
        presence: true,
        numericality: {
          onlyInteger: true
        }
      },
      amount: {
        presence: true,
        numericality: true
      },
      price: {
        presence: true,
        numericality: true
      },
      cost: {
        presence: true,
        numericality: true
      },
      date: {
        presence: true,
        datetime: true
      }
    }
  }

  /**
   * Database validation schema.
   *
   * @returns {object}
   */
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['coinId', 'userId', 'amount', 'price', 'cost', 'date'],

      properties: {
        id: {
          type: 'integer'
        },
        coinId: {
          type: 'integer'
        },
        userId: {
          type: 'integer'
        },
        amount: {
          type: 'number'
        },
        price: {
          type: 'number'
        },
        cost: {
          type: 'number'
        },
        date: {
          type: 'date-time'
        }
      }
    }
  }
}

module.exports = Transaction
