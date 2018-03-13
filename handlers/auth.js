const authRegister = require('../functions/auth/register')
const authLogin = require('../functions/auth/login')
const response = require('../functions/responses')
const { generatePolicy } = require('../functions/helpers')
const Auth = require('../services/Auth')

/**
 * Register user.
 *
 * POST: /auth/register
 *
 * @param event
 * @param context
 */
module.exports.register = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const body = await authRegister(event.body)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Login and authenticate user.
 *
 * POST: /auth/login
 *
 * @param event
 * @param context
 */
module.exports.login = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const body = await authLogin(event.body)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Refresh authentication token.
 *
 * GET: /auth/refresh
 *
 * @param event
 * @param context
 */
module.exports.refresh = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const { userId, isAdmin } = event.requestContext.authorizer
    const token = Auth.getToken(userId, isAdmin)

    return callback(null, response.ok({ token }))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Auth middleware.
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.authorize = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const { userId, isAdmin } = new Auth(event).getPayLoad

    return callback(null, generatePolicy(userId, 'Allow', event.methodArn, isAdmin))
  } catch (error) {
    console.error(error)

    return callback(null, response.unauthorized())
  }
}

/**
 * Admin auth middleware.
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.authorizeAdmin = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const { userId, isAdmin } = new Auth(event).getPayLoad

    if (isAdmin) {
      return callback(null, generatePolicy(userId, 'Allow', event.methodArn, isAdmin))
    }

    return callback(null, generatePolicy(userId, 'Deny', event.methodArn, isAdmin))
  } catch (error) {
    console.error(error)

    return callback(null, response.unauthorized())
  }
}
