import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      database: 'd3vq5ak5e6hgcp',
      user: 'xwzscllzkmzzma',
      password: '1589a964d688ef7b648cfa9bef5d357fd31b7ec60a889f4767440e4cea0e6423',
      host: 'ec2-52-215-209-64.eu-west-1.compute.amazonaws.com',
      port: 5432,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'd3vq5ak5e6hgcp',
      user: 'xwzscllzkmzzma',
      password: '1589a964d688ef7b648cfa9bef5d357fd31b7ec60a889f4767440e4cea0e6423',
      host: 'ec2-52-215-209-64.eu-west-1.compute.amazonaws.com',
      port: 5432,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'd3vq5ak5e6hgcp',
      user: 'xwzscllzkmzzma',
      password: '1589a964d688ef7b648cfa9bef5d357fd31b7ec60a889f4767440e4cea0e6423',
      host: 'ec2-52-215-209-64.eu-west-1.compute.amazonaws.com',
      port: 5432,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },
  },
}

export default config
