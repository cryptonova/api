const response = require('../functions/responses')
const toggleCoin = require('../functions/users/toggleCoin')
const hasCoin = require('../functions/users/hasCoin')
const fetchCoins = require('../functions/users/fetchCoins')
const fetchCoinTransactions = require('../functions/users/fetchCoinTransactions')
const fetchBalance = require('../functions/users/fetchBalance')
const fetchBalanceHistory = require('../functions/users/fetchBalanceHistory')
const storeBalance = require('../functions/users/storeBalance')
const fetchPortfolio = require('../functions/users/fetchPortfolio')
const fetchUser = require('../functions/users/fetchUser')

/**
 * Add or remove coin from portfolio.
 *
 * POST or DELETE: /me/coins/{id}
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.toggleCoin = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const coinId = parseInt(event.pathParameters.id)
    const method = event.httpMethod
    const body = await toggleCoin(coinId, userId, method)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Determine if a user has said coin in its portfolio.
 *
 * GET: /me/coins/{id}
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.hasCoin = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const coinId = parseInt(event.pathParameters.id)
    const body = await hasCoin(coinId, userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch user's coins.
 *
 * GET: /me/coins
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchCoins = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const body = await fetchCoins(userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch user's coin transactions.
 *
 * GET: /me/coins/{id}/transactions
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchCoinTransactions = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const coinId = parseInt(event.pathParameters.id)
    const body = await fetchCoinTransactions(coinId, userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch a user's balance.
 *
 * GET: /me/balance
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchBalance = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const body = await fetchBalance(userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch a user's balance history.
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchBalanceHistory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const days = parseInt(event.queryStringParameters.days)
    const body = await fetchBalanceHistory(userId, days)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * This method takes a snapshot of a user's current balance.
 * It gets invoked from the queue system.
 *
 * @see functions/queue/storeBalances.js.
 *
 * @param event
 * @param context
 */
module.exports.storeBalance = async (event, context) => {
  try {
    const body = await storeBalance(event.userId)

    return context.succeed(body)
  } catch (error) {
    console.error(error)

    return context.fail(error)
  }
}

/**
 * Fetch a user's portfolio insight data.
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchPortfolio = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const body = await fetchPortfolio(userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch authenticated user.
 *
 * GET: /me
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const userId = event.requestContext.authorizer.userId
    const body = await fetchUser(userId)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}
