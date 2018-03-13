const yaml = require('yamljs')
const env = yaml.load('env.yml')

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: env.dev.DB_HOST,
      user: env.dev.DB_USER,
      password: env.dev.DB_PASSWORD,
      database: env.dev.DB_DATABASE
    },
    migrations: {
      tableName: 'migrations'
    }
  },
  testing: {
    client: 'mysql2',
    connection: {
      host: env.test.DB_HOST,
      user: env.test.DB_USER,
      password: env.test.DB_PASSWORD,
      database: env.test.DB_DATABASE
    },
    migrations: {
      tableName: 'migrations'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: env.prod.DB_HOST,
      user: env.prod.DB_USER,
      password: env.prod.DB_PASSWORD,
      database: env.prod.DB_DATABASE
    },
    migrations: {
      tableName: 'migrations'
    }
  }
}
