module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('balances', table => {
      table.decimal('profit', 20, 10)
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('balances', table => {
      table.dropColumn('profit')
    })
  ])
}
