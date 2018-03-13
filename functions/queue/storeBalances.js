const AWS = require('aws-sdk')
const User = require('../../models/User')

async function storeBalances () {
  const users = await User.query().select('id')
  const lambda = new AWS.Lambda()

  return new Promise(resolve => {
    for (let user of users) {
      const params = {
        FunctionName: `cryptonova-${process.env.NODE_ENV}-storeBalance`,
        InvocationType: 'Event',
        Payload: JSON.stringify({ userId: user.id })
      }

      lambda.invoke(params, error => {
        if (error) console.error(error)
      })
    }

    return resolve('All balances has been stored')
  })
}

module.exports = storeBalances
