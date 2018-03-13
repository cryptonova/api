const storeTransaction = require('../functions/transactions/storeTransaction')
const deleteTransaction = require('../functions/transactions/deleteTransaction')
const response = require('../functions/responses')
const Coin = require('../../models/Coin')
const Auth = require('../../services/Auth')

/**
 * Store transaction.
 *
 * @param event
 * @param context
 */
module.exports.storeTransaction = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const slug = event.pathParameters.slug
    const coin = await Coin.findBySlug(slug, 'id')
    const body = await storeTransaction(coin.id, userId, event.body)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Delete transaction.
 *
 * @param event
 * @param context
 */
module.exports.deleteTransaction = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const id = parseInt(event.pathParameters.id)
    const userId = event.requestContext.authorizer.userId
    const body = await deleteTransaction(id, userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}
