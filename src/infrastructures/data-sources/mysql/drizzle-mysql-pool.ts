import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { Logger } from 'drizzle-orm'
import * as schema from './schema'
import logger from '../../../libs/logger'
import env from '../../../utils/config'

const { host, port, user, password, dbname: database } = env.mysql

const poolConnection = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
})

const db = drizzle(poolConnection, {
  mode: 'default',
  schema,
  logger: new (class implements Logger {
    // eslint-disable-next-line class-methods-use-this
    logQuery(query: string, params: unknown[]): void {
      logger.info({ query, params })
    }
  })(),
})

export default db
