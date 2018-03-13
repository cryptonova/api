const storeHistoricData = require('../functions/queue/storeCoinData')
const storeBalances = require('../functions/queue/storeBalances')

module.exports.storeHistoricData = (event, context) => {
  storeHistoricData().then(response => {
    return context.succeed(response)
  }).catch(error => {
    console.error(error)

    return context.fail(error)
  })
}

/**
 * Prepare snapshots of balances.
 *
 * @param event
 * @param context
 */
module.exports.storeBalances = (event, context) => {
  storeBalances().then(response => {
    return context.succeed(response)
  }).catch(error => {
    console.error(error)

    return context.fail(error)
  })
}
