const { Model } = require('objection')
const Knex = require('knex')

const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
})

// const environment = process.env.NODE_ENV || 'dev'
// const config = require('../knexfile.js')[environment]
// const knex = Knex(config)

Model.knex(knex)

module.exports = Model
