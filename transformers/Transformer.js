class Transformer {
  constructor (transformer) {
    this.transformer = transformer
  }

  transform (data) {
    if (Array.isArray(data)) {
      return data.map(item => {
        return this.transformer.transform(item)
      })
    }

    return this.transformer.transform(data)
  }
}

module.exports = Transformer
