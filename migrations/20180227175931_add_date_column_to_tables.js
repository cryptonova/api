module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('prices', table => {
      table.dateTime('date')
      table.unique(['coinId', 'date'])
    }),
    knex.schema.table('marketCaps', table => {
      table.dateTime('date')
      table.unique(['coinId', 'date'])
    }),
    knex.schema.table('supplies', table => {
      table.dateTime('date')
      table.unique(['coinId', 'date'])
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('prices', table => {
      table.dropColumn('date')
    }),
    knex.schema.table('marketCaps', table => {
      table.dropColumn('date')
    }),
    knex.schema.table('supplies', table => {
      table.dropColumn('date')
    })
  ])
}
