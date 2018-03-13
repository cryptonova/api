module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('coins_users', table => {
      table.foreign('coinId').references('coins.id')
      table.foreign('userId').references('users.id')
    })
  ])
}

module.exports.down = function (knex, Promise) {}
