import { datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulidx'
import { auditableAtColumns, auditableByColumns } from './auditable'

// eslint-disable-next-line import/prefer-default-export
export const drivers = mysqlTable('drivers', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  fullName: varchar('full_name', { length: 64 }).notNull(),
  phone: varchar('phone_number', { length: 18 }).notNull(),
  email: varchar('email', { length: 256 }),
  ktpVerifiedAt: datetime('ktp_verified_at'),
  simVerifiedAt: datetime('sim_verified_at'),
  ktpPath: varchar('ktp_path', { length: 256 }),
  simPath: varchar('sim_path', { length: 256 }),
  picture: varchar('picture', { length: 256 }),
  ...auditableAtColumns,
  ...auditableByColumns,
})
