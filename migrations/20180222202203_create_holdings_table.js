module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('holdings', table => {
      table.increments()
      table.integer('userId').unsigned().references('users.id')
      table.decimal('value', 20, 10).unsigned()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('holdings')
  ])
}
