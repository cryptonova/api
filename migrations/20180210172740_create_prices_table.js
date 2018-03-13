module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('prices', table => {
      table.increments()
      table.integer('coinId').unsigned().references('coins.id').onDelete('CASCADE')
      table.decimal('usd', 20, 10).unsigned()
      table.decimal('btc', 20, 10).unsigned()
      table.decimal('percentChange1h', 10, 2)
      table.decimal('percentChange1d', 10, 2)
      table.decimal('percentChange1w', 10, 2)
      table.bigInteger('volumePrevious24h').unsigned()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('prices')
  ])
}
