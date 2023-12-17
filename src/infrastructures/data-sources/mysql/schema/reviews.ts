import { mysqlTable, text, tinyint, varchar } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulidx'
import { users } from './users'
import { bookings } from './bookings'
import { vehicles } from './vehicles'
import { auditableAtColumns, auditableByColumns } from './auditable'

// eslint-disable-next-line import/prefer-default-export
export const reviews = mysqlTable('reviews', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  bookingId: varchar('booking_id', { length: 32 })
    .notNull()
    .references(() => bookings.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  vehicleId: varchar('vehicle_id', { length: 32 }).references(() => vehicles.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  rating: tinyint('rating'),
  content: text('content'),
  ...auditableAtColumns,
  ...auditableByColumns,
})
