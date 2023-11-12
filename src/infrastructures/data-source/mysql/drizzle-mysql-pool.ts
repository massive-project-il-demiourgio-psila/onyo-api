import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "",
  database: "rental"
});

export const db = drizzle(poolConnection);
