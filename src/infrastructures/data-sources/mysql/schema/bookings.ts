import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulidx'
import { users } from './users'
import { auditableAtColumns, auditableByColumns } from './auditable'
import { vehicles } from './vehicles'
import { drivers } from './drivers'

export const invoices = mysqlTable('invoices', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  trxId: varchar('trx_id', { length: 128 }).notNull(),
  externalTrxId: varchar('external_trx_id', { length: 128 }),
  externalId: varchar('external_id', { length: 128 }),
  amount: int('amount').notNull(),
  paymentType: varchar('payment_type', { length: 32 }),
  paymentChannel: varchar('payment_channel', { length: 32 }),
  paymentLink: varchar('payment_link', { length: 32 }),
  expiredAt: datetime('expired_at'),
  accountNumber: varchar('account_number', { length: 64 }),
  accountName: varchar('account_name', { length: 128 }),
  note: varchar('note', { length: 255 }),
  status: varchar('status', { length: 128 }),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const bookings = mysqlTable('bookings', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  vehicleId: varchar('vehicle_id', { length: 32 })
    .notNull()
    .references(() => vehicles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  invoiceId: varchar('invoice_id', { length: 32 })
    .notNull()
    .references(() => invoices.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  driverId: varchar('driver_id', { length: 32 }).references(() => drivers.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  startAt: datetime('start_at').notNull(),
  endAt: datetime('end_at').notNull(),
  amount: int('amount').notNull(),
  additionalDriverAmount: int('additional_driver_amount'),
  totalAmount: int('total_amount'),
  reasonCancelled: varchar('reason_cancelled', { length: 255 }),
  status: varchar('status', { length: 128 }),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const bookingDetails = mysqlTable('booking_details', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  bookingId: varchar('booking_id', { length: 32 })
    .notNull()
    .references(() => bookings.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  onBehalfOfName: varchar('on_behalf_of_name', { length: 72 }),
  onBehalfOfPhone: varchar('on_behalf_of_phone', { length: 18 }),
  onBehalfOfEmail: varchar('on_behalf_of_email', { length: 128 }),
  pickUpLocation: varchar('pick_up_location', { length: 72 }),
  dropOffLocation: varchar('drop_off_location', { length: 72 }),
  ...auditableAtColumns,
  ...auditableByColumns,
})
