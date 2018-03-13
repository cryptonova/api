module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('transactions', table => {
      table.increments()
      table.integer('coinId').unsigned().references('coins.id')
      table.integer('userId').unsigned().references('users.id')
      table.decimal('amount', 20, 10)
      table.decimal('price', 20, 10).unsigned()
      table.decimal('cost', 10, 2)
      table.date('date')
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('transactions')
  ])
}
