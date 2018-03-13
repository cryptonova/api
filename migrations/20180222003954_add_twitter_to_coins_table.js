module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins', table => {
      table.string('twitter')
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins', table => {
      table.dropColumn('twitter')
    })
  ])
}
