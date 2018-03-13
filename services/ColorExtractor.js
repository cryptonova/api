const getColors = require('get-image-colors')

class ColorExtractor {
  /**
   * ColorExtractor constructor.
   *
   * @param image {string}
   */
  constructor (image) {
    this.image = image
  }

  /**
   * Get hex color from selected image.
   *
   * @returns {string}
   */
  async getHexColor () {
    const colors = await getColors(this.image)
    const color = this.mergeColors(colors)
    const { r, g, b } = this.normaliseValues(color, colors.length)

    return this.rgbToHex(r, g, b)
  }

  /**
   * Merge all colors into one array.
   *
   * @param colors {array}
   * @returns {array}
   */
  mergeColors (colors) {
    return colors.map(color => color.rgb()).reduce((prevColor, currentColor) => {
      return [
        prevColor[0] + currentColor[0],
        prevColor[1] + currentColor[1],
        prevColor[2] + currentColor[2]
      ]
    }, [
      0, 0, 0
    ])
  }

  /**
   * Normalise RGB values.
   *
   * @param colors
   * @param count
   * @returns {{r: number, g: number, b: number}}
   */
  normaliseValues (colors, count) {
    const r = parseInt(colors[0] / count)
    const g = parseInt(colors[1] / count)
    const b = parseInt(colors[2] / count)

    return {
      r, g, b
    }
  }

  /**
   * Convert RGB components to hex code.
   *
   * @param r {integer}
   * @param g {integer}
   * @param b {integer}
   * @returns {string}
   */
  rgbToHex (r, g, b) {
    return `#${this.colorComponentToHex(r)}${this.colorComponentToHex(g)}${this.colorComponentToHex(b)}`
  }

  /**
   * Convert color component to a double digit hex code.
   *
   * @param colorComponent {integer}
   * @returns {string}
   */
  colorComponentToHex (colorComponent) {
    const hex = colorComponent.toString(16)

    return hex.length === 1 ? '0' + hex : hex
  }
}

module.exports = ColorExtractor
