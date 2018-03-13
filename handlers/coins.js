const response = require('../functions/responses')
const Coin = require('../models/Coin')
const downloadImage = require('../functions/coins/downloadImage')
const fetchBlogFeed = require('../functions/coins/fetchBlogFeed')
const fetchCoins = require('../functions/coins/fetchCoins')
const fetchCoin = require('../functions/coins/fetchCoin')
const fetchCoinPrices = require('../functions/coins/fetchCoinPrices')
const searchCoin = require('../functions/coins/searchCoin')
const storeCoins = require('../functions/coins/storeCoins')
const storeCoinData = require('../functions/coins/storeCoinData')
const storeHexColor = require('../functions/coins/storeHexColor')
const updateCoinData = require('../functions/coins/updateCoinData')
const updateCoin = require('../functions/coins/updateCoin')

/**
 * Fetch paginated coins.
 *
 * GET: /coins?page={integer}
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchCoins = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  let page = 0
  try {
    page = parseInt(event.queryStringParameters.page)
  } catch (error) {}

  try {
    const body = await fetchCoins(page)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch coin.
 *
 * GET: /coins/{slug}
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchCoin = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const slug = event.pathParameters.slug
    const body = await fetchCoin(slug)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Fetch coin prices.
 *
 * GET: /coins/{slug}/prices?(days|date)
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchCoinPrices = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const slug = event.pathParameters.slug
    const queryString = event.queryStringParameters
    const body = await fetchCoinPrices(slug, queryString)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Store new coins once per hour.
 *
 * @param event
 * @param context
 */
module.exports.storeCoins = (event, context) => {
  storeCoins().then(response => {
    return context.succeed(response)
  }).catch(error => {
    console.error(error)

    return context.fail(error)
  })
}

/**
 * Store historic coin data.
 * This method gets invoked by the queue system.
 *
 * @param event
 * @param context
 */
module.exports.storeCoinData = (event, context) => {
  storeCoinData(event.coinId).then(response => {
    return context.succeed(response)
  }).catch(error => {
    console.error(error)

    return context.fail(error)
  })
}

/**
 * Update coin data.
 * This method runs every five minutes.
 *
 * @param event
 * @param context
 */
module.exports.updateCoinData = (event, context) => {
  updateCoinData().then(response => {
    return context.succeed(response)
  }).catch(error => {
    console.error(error)

    return context.fail(error)
  })
}

/**
 * Download coin image.
 *
 * TODO: Should get invoked when a new coin has been added.
 *
 * @param event
 * @param context
 */
module.exports.downloadImage = async (event, context) => {
  try {
    const coin = await Coin.query().where('image', null).orderBy('id', 'asc').first()

    if (typeof coin === 'undefined') {
      return context.succeed('No images to download')
    }

    await downloadImage(coin)

    return context.succeed('Image has been downloaded')
  } catch (error) {
    console.error(error)

    return context.fail(error)
  }
}

/**
 * Fetch blog feed.
 *
 * GET: /coins/{slug}/feed
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.fetchBlogFeed = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const slug = event.pathParameters.slug
    const body = await fetchBlogFeed(slug)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Search coin.
 *
 * GET: /coins/search?query={string}
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.searchCoin = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const query = event.queryStringParameters.query
    const body = await searchCoin(query)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}

/**
 * Stores a coin's hex color.
 *
 * TODO: Should be invoked when a new image has been downloaded.
 *
 * @param event
 * @param context
 */
module.exports.storeHexColor = async (event, context) => {
  try {
    const coin = await Coin.query()
      .select(['id', 'image'])
      .whereNotNull('image')
      .whereNull('hexColor')
      .orderBy('rank', 'asc')
      .first()

    if (typeof coin === 'undefined') {
      return context.succeed('No hex colors to store')
    }

    await storeHexColor(coin.id, coin.image)

    return context.succeed('Hex color has been stored')
  } catch (error) {
    console.error(error)

    return context.fail(error)
  }
}

/**
 * Update coin information. Accessing this endpoint requires admin privileges.
 *
 * PATCH: /coins/{slug}
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.updateCoin = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const slug = event.pathParameters.slug
    const body = await updateCoin(slug, event.body)

    return callback(null, response.ok(body))
  } catch (error) {
    console.error(error)

    return callback(null, response.fail(error))
  }
}
