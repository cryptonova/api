module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments()
      table.string('email').unique()
      table.string('password')
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ])
}
