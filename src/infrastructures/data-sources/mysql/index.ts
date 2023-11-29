import { MySql2Database } from 'drizzle-orm/mysql2'
import * as schema from './schema'

export * from './drizzle-mysql-pool'
export type MySqlDrizzleSchema = MySql2Database<typeof schema>
