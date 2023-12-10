import { drizzle } from 'drizzle-orm/mysql2'
import { Logger } from 'drizzle-orm'
import logger from '@/libs/logger'
import pool from './pool'
import * as schema from './schema'

const db = drizzle(pool, {
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
