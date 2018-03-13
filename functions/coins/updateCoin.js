const Coin = require('../../models/Coin')
const { NotFoundException, ValidationException } = require('../exceptions')
const validate = require('validate.js')

/**
 * Update coin.
 *
 * @param slug {string}
 * @param input {object}
 * @returns {object}
 */
async function updateCoin (slug, input) {
  const coin = await Coin.findBySlug(slug)

  if (typeof coin === 'undefined') {
    throw new NotFoundException()
  }

  const { url, whitePaperUrl, videoUrl, blogFeedUrl } = JSON.parse(input)
  input = { url, whitePaperUrl, videoUrl, blogFeedUrl }

  const errors = validate(input, Coin.rules)
  if (errors) {
    throw new ValidationException(errors)
  }

  return Coin.patchById(coin.id, input)
}

module.exports = updateCoin
