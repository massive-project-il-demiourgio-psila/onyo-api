import { boolean, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulidx'
import { auditableAtColumns, auditableByColumns } from './auditable'

// eslint-disable-next-line import/prefer-default-export
export const drivers = mysqlTable('drivers', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  fullName: varchar('full_name', { length: 64 }).notNull(),
  phone: varchar('phone_number', { length: 18 }).unique().notNull(),
  isVerified: boolean('is_verified').notNull().default(false),
  ...auditableAtColumns,
  ...auditableByColumns,
})
