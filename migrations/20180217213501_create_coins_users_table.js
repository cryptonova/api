module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coins_users', table => {
      table.increments()
      table.integer('coinId').unsigned()
      table.integer('userId').unsigned()
      table.integer('order').unsigned()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.unique(['coinId', 'userId'])
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ])
}
