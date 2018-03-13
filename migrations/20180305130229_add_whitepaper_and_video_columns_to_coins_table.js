module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins', table => {
      table.string('url')
      table.string('whitePaperUrl')
      table.string('videoUrl')
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins', table => {
      table.dropColumn('url')
      table.dropColumn('whitePaperUrl')
      table.dropColumn('videoUrl')
    })
  ])
}
