import config from '../config'

const knexConfig: { [key: string]: any } = {
  test: {
    client: 'postgresql',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    connection: 'postgres://localhost:5432/lesson_comp_api_test'
  },
  development: {
    client: 'postgresql',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    connection: 'postgres://localhost:5432/lesson_comp_api_dev'
  },
  production: {
    client: 'postgresql',
    connection: config.prodDatabaseUrl,
    pool: {
      min: 2,
      max: 10
    }
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
}

export default knexConfig
