module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('marketCaps', table => {
      table.increments()
      table.integer('coinId').unsigned().references('coins.id').onDelete('CASCADE')
      table.decimal('usd', 30, 10).unsigned()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('marketCaps')
  ])
}
