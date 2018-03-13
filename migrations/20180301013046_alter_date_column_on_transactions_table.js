module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('transactions', table => {
      table.dateTime('date').alter()
    })
  ])
}

module.exports.down = function (knex, Promise) {}
