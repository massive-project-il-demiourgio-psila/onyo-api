import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import env from '@/utils/config'
import * as schema from './schema'

const { host, port, user, password, dbname: database } = env.mysql

const connection = mysql.createConnection({
  host,
  port,
  user,
  password,
  database,
  multipleStatements: true,
})

const db = drizzle(connection, { schema, mode: 'default' })

await migrate(db, { migrationsFolder: `${import.meta.dir}/migrations` })

connection.end()
