module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coins', table => {
      table.increments()
      table.string('name')
      table.string('ticker')
      table.integer('rank').unsigned()
      table.string('image')
      table.string('slug').unique()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('coins')
  ])
}
