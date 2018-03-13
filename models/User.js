const Model = require('./Model')

class User extends Model {
  /**
   * User table.
   *
   * @returns {string}
   */
  static get tableName () {
    return 'users'
  }

  static create (data) {
    return this.query().insert(data)
  }

  /**
   * Find user by id.
   *
   * @param id {integer}
   * @param select {string|array}
   * @returns {User}
   */
  static findById (id, select = '*') {
    return this.query().where('id', id).select(select).first()
  }

  /**
   * Find user by email.
   *
   * @param email {string}
   * @param select {string|array}
   * @returns {User}
   */
  static findByEmail (email, select = '*') {
    return this.query().where('email', email).first()
  }

  /**
   * Validation schema.
   *
   * @returns {array}
   */
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: {
          type: 'integer'
        },
        email: {
          type: 'string'
        }
      }
    }
  }

  /**
   * User relationships.
   *
   * @returns {array}
   */
  static get relationMappings () {
    const Coin = require('./Coin')

    return {
      coins: {
        relation: Model.ManyToManyRelation,
        modelClass: Coin,
        join: {
          from: 'users.id',
          through: {
            from: 'coins_users.userId',
            to: 'coins_users.coinId'
          },
          to: 'coins.id'
        }
      }
    }
  }
}

module.exports = User
