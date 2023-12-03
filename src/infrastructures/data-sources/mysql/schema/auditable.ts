import { boolean, datetime, varchar } from 'drizzle-orm/mysql-core'

export const auditableAtColumns = {
  createdAt: datetime('created_at'),
  updatedAt: datetime('updated_at'),
}

export const auditableByColumns = {
  createdBy: varchar('created_by', { length: 128 }).default('system'),
  updatedBy: varchar('updated_by', { length: 128 }).default('system'),
}

export const softDelete = {
  isDeleted: boolean('is_deleted').default(false),
}
