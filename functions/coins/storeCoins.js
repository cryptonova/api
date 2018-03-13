const AWS = require('aws-sdk')
const sqs = new AWS.SQS()
const Coin = require('../../models/Coin')
const axios = require('axios')

async function storeCoins (limit = 5000) {
  const response = await axios.get(`${process.env.CMC_TICKER_API_URL}?limit=${limit}`)
  const coins = response.data

  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < coins.length; index++) {
      const coin = coins[index]
      const match = await Coin.findBySlug(coin.id, 'id')

      if (typeof match === 'undefined') {
        const insertedCoin = await Coin.query().insert({
          name: coin.name,
          ticker: coin.symbol,
          rank: parseInt(coin.rank),
          slug: coin.id
        })

        const params = {
          MessageBody: insertedCoin.name,
          QueueUrl: process.env.HISTORIC_DATA_QUEUE_URL,
          DelaySeconds: 0,
          MessageAttributes: {
            'coinId': {
              DataType: 'Number',
              StringValue: `${insertedCoin.id}`
            }
          }
        }
        await sqs.sendMessage(params, error => {
          if (error) return reject(error)
        })
      }
    }

    return resolve('New coins has been indexed')
  })
}

module.exports = storeCoins
