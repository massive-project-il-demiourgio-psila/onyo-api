/* eslint-disable import/prefer-default-export */
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'

// or just use redis :)
export const auth = mysqlTable('auth_tokens', {
  token: text('token').notNull(),
  // columns below are not really necessary since we can just decode for payload
  userId: varchar('user_id', { length: 32 }),
  expiresAt: timestamp('expire_at', { mode: 'string' }),
})
