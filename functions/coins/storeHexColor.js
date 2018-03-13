const ColorExtractor = require('../../services/ColorExtractor')
const Coin = require('../../models/Coin')

async function storeHexColor (coinId, image) {
  const colorExtractor = new ColorExtractor(image)
  const hexColor = await colorExtractor.getHexColor()

  return Coin.patchById(coinId, {
    hexColor
  })
}

module.exports = storeHexColor
