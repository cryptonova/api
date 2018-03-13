const AWS = require('aws-sdk')

function indexHistoricData () {
  const QueueUrl = process.env.HISTORIC_DATA_QUEUE_URL
  const sqs = new AWS.SQS()
  const lambda = new AWS.Lambda()
  const params = {
    QueueUrl,
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
      'coinId'
    ]
  }

  return new Promise((resolve, reject) => {
    sqs.receiveMessage(params, (error, data) => {
      if (error) return reject(error)

      if (typeof data.Messages === 'undefined') {
        return resolve('No messages in the queue')
      }

      const message = data.Messages[0]
      const coinId = parseInt(message.MessageAttributes.coinId.StringValue)
      const params = {
        FunctionName: `cryptonova-${process.env.NODE_ENV}-storeCoinData`,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ coinId })
      }

      lambda.invoke(params, (error, data) => {
        if (error) return reject(error)

        const payload = JSON.parse(data.Payload)

        if (typeof payload.errorMessage !== 'undefined') {
          return reject(payload.errorMessage)
        }

        const params = {
          QueueUrl,
          ReceiptHandle: message.ReceiptHandle
        }

        sqs.deleteMessage(params, error => {
          if (error) return reject(error)

          return resolve('The message has been successfully processed')
        })
      })
    })
  })
}

module.exports = indexHistoricData
