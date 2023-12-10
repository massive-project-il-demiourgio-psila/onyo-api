import mysql from 'mysql2/promise'
import env from '../../../utils/config'

const { host, port, user, password, dbname: database } = env.mysql

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
})

export default pool
