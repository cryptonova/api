module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins', table => {
      table.string('hexColor')
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins', table => {
      table.dropColumn('hexColor')
    })
  ])
}
