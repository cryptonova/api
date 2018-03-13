const Model = require('./Model')

class Coin extends Model {
  /**
   * Coin table.
   *
   * @returns {string}
   */
  static get tableName () {
    return 'coins'
  }

  /**
   * Find coin by id.
   *
   * @param id {integer}
   * @param select {string|array}
   * @returns {Coin}
   */
  static findById (id, select = '*') {
    return this.query().where('id', id).select(select).first()
  }

  /**
   * Find coin by slug.
   *
   * @param slug {string}
   * @param select {string|array}
   * @returns {Coin}
   */
  static findBySlug (slug, select = '*') {
    return this.query().where('slug', slug).select(select).first()
  }

  /**
   * Patch coin by id and return the modified record.
   *
   * @param id {integer}
   * @param body {object}
   * @returns {Coin}
   */
  static patchById (id, body) {
    return this.query().patchAndFetchById(id, body)
  }

  /**
   * Validation rules.
   *
   * @returns {object}
   */
  static get rules () {
    return {
      url: {
        url: true
      },
      whitePaperUrl: {
        url: true
      },
      videoUrl: {
        url: true
      },
      blogFeedUrl: {
        url: true
      }
    }
  }

  /**
   * Database validation rules.
   *
   * @returns {object}
   */
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'ticker', 'rank', 'slug'],

      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        ticker: {
          type: 'string'
        },
        rank: {
          type: 'integer'
        },
        slug: {
          type: 'string'
        },
        image: {
          type: ['string', 'null']
        }
      }
    }
  }

  /**
   * Relationships.
   *
   * @returns {object}
   */
  static get relationMappings () {
    const Price = require('./Price')
    const MarketCap = require('./MarketCap')
    const Supply = require('./Supply')
    const Transaction = require('./Transaction')

    return {
      price: {
        relation: Model.HasOneRelation,
        modelClass: Price,
        join: {
          from: 'coins.id',
          to: 'prices.coinId'
        }
      },
      allTimeHigh: {
        relation: Model.HasOneRelation,
        modelClass: Price,
        join: {
          from: 'coins.id',
          to: 'prices.coinId'
        }
      },
      marketCap: {
        relation: Model.HasOneRelation,
        modelClass: MarketCap,
        join: {
          from: 'coins.id',
          to: 'marketCaps.coinId'
        }
      },
      supply: {
        relation: Model.HasOneRelation,
        modelClass: Supply,
        join: {
          from: 'coins.id',
          to: 'supplies.coinId'
        }
      },
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: 'coins.id',
          to: 'transactions.coinId'
        }
      }
    }
  }
}

module.exports = Coin
