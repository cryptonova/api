module.exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('holdings', 'balances')
  ])
}

module.exports.down = function (knex, Promise) {}
