module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.boolean('isAdmin').notNullable().default(0)
    })
  ])
}

module.exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.dropColumn('isAdmin')
    })
  ])
}
