import { boolean, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const auditableAtColumns = {
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).onUpdateNow(),
}

export const auditableByColumns = {
  createdBy: varchar('created_by', { length: 128 }).default('system'),
  updatedBy: varchar('updated_by', { length: 128 }).default('system'),
}

export const softDelete = {
  isDeleted: boolean('is_deleted').default(false),
}
