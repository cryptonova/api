module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('prices', table => {
      table.renameColumn('volumePrevious24h', 'volume1d')
    })
  ])
}

module.exports.down = function (knex, Promise) {}
