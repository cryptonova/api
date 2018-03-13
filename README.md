<p align="center">
  <img height="100" src="https://s3.eu-west-2.amazonaws.com/cryptonova-prod/img/cryptonova-github.png">
</p>

## About
Cryptonova's API is built by integrating [Amazon's API Gateway](https://aws.amazon.com/api-gateway/) and serverless functionality ([AWS Lambda](https://aws.amazon.com/lambda/)), thus creating a cost efficient API where you only pay for what you use. (It doesn't cost you anything to test this out locally.)

## Getting Started
1. You need to set up an `env.yml` file in the root of the project with data similar to this:
```yml
dev:
  DB_HOST: '127.0.0.1'
  DB_USER: 'root'
  DB_PASSWORD: ''
  DB_DATABASE: 'cryptonova'
  API_URL: 'http://localhost:3000'
  CMC_TICKER_API_URL: 'https://api.coinmarketcap.com/v1/ticker/'
  CMC_GRAPH_API_URL: 'https://graphs2.coinmarketcap.com/currencies'
  CMC_COIN_URL: 'https://coinmarketcap.com/currencies'
  CMC_IMAGE_URL: 'https://s2.coinmarketcap.com/static/img/coins/200x200'
  AWS_REGION: 'your-aws-region'
  S3_BUCKET: 'your-s3-bucket'
  JWT_SECRET: 'your-jwt-secret'
  HISTORIC_DATA_QUEUE_URL: 'https://sqs.{aws-region}.amazonaws.com/{id}/{queue-name}'
```
2. Run the follwing commands to install dependencies, provisioning the database and run a local server.
```bash
yarn
serverless invoke local -f storeCoins
serverless invoke local -f updateCoinData
serverless invoke local -f storeCoinData --data '{"coinId": 1}' # Stores historic data for Bitcoin
serverless offline
```

## Acknowledgments
Cryptonova wouldn't be possible without [coinmarketcap.com's public API](https://coinmarketcap.com/api/). 
