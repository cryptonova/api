const axios = require('axios')
const AWS = require('aws-sdk')
const Coin = require('../../models/Coin')

async function downloadImage (coin) {
  const url = `${process.env.CMC_COIN_URL}/${coin.slug}`
  let response = await axios.get(url)

  const regExp = new RegExp(`${process.env.CMC_IMAGE_URL}/\\d+.png`)
  const result = regExp.exec(response.data)
  response = await axios.get(result[0], { responseType: 'arraybuffer' })

  const fileName = `${coin.slug}.png`
  const bucket = `${process.env.S3_BUCKET}/icons`

  const s3 = new AWS.S3()
  const params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: fileName,
    ContentType: response.headers['content-type'],
    ContentLength: response.headers['content-length'],
    Body: response.data
  }

  await s3.putObject(params, error => {
    if (error) throw error
  })

  await Coin.patchById(coin.id, {
    image: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${bucket}/${fileName}`
  })
}

module.exports = downloadImage
