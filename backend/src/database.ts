import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'
import { Database } from 'sqlite3'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  pool: {
    // @ts-expect-error no way of typing cb
    afterCreate: (conn: Database, cb) =>
      conn.run('PRAGMA foreign_keys = ON', cb),
  },
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
}

export const knex = setupKnex(config)
