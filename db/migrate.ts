import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import * as schema from './schema'

console.log(process.env.DB_HOST)

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT || 3307) as number,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
});

const db = drizzle(connection, { schema, mode: 'default' })

await migrate(db, { migrationsFolder: './db/migrations/' });

connection.end();
