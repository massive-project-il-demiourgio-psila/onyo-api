import { mysqlTable, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulidx'

// eslint-disable-next-line import/prefer-default-export
export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 32 })
      .primaryKey()
      .$defaultFn(() => ulid()),
    fullName: varchar('full_name', { length: 64 }),
    phone: varchar('phone', { length: 18 }),
    email: text('email'),
  },
  (table) => ({
    emailIdx: uniqueIndex('email_idx').on(table.email),
  }),
)
