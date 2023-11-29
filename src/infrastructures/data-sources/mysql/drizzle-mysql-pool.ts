import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema';
import { Logger } from "drizzle-orm";
import logger from "../../../libs/logger";
import { env } from "../../../utils/config";

const { host, port, user, password, dbname: database } = env.mysql

const poolConnection = mysql.createPool({
  host, port, user, password, database
});

export const db = drizzle(poolConnection, {
  mode: 'default',
  schema: schema,
  logger: new class implements Logger {
    logQuery(query: string, params: unknown[]): void {
      logger.info({ query, params });
    }
  }
});

