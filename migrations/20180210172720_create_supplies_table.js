module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('supplies', table => {
      table.increments()
      table.integer('coinId').unsigned().references('coins.id').onDelete('CASCADE')
      table.bigInteger('available').unsigned()
      table.bigInteger('total').unsigned()
      table.bigInteger('max').unsigned()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('supplies')
  ])
}
