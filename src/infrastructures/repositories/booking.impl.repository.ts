import { IBookingRepository } from '@/domains/repositories/booking.repository'
import { NewBooking, AddedBooking } from '@/domains/entities/bookings/add-booking.entity'
import { singleton } from 'tsyringe'
import { RowDataPacket } from 'mysql2'
import { NewInvoice } from '@/domains/entities/bookings/add-invoice.entity'
import moment from 'moment'
import Repository from './repository'

@singleton()
class BookingRepository extends Repository implements IBookingRepository {
  static readonly BOOKING_PREFIX = `OYBK` as const

  static readonly INVOICE_PREFIX = `INV` as const

  private async generateBookingCode(): Promise<string> {
    const [rows] = await this.pool.query<RowDataPacket[]>('SELECT COUNT(*) AS count FROM bookings')

    if (rows[0] == null) {
      throw new Error('Failed to fetch bookings')
    }

    const { count } = rows[0]

    return `${BookingRepository.BOOKING_PREFIX}${new Date().getFullYear()}${String(count).padStart(6, '0')}` as const
  }

  private async generateInvoiceTrxId(): Promise<string> {
    const [rows] = await this.pool.query<RowDataPacket[]>('SELECT COUNT(*) AS count FROM invoices')

    if (rows[0] == null) {
      throw new Error('Failed to fetch bookings')
    }

    const { count } = rows[0]

    return `${BookingRepository.INVOICE_PREFIX}${moment().format('YYMMDD')}${String(count).padStart(6, '0')}` as const
  }

  async addBooking(data: NewBooking, userId: string): Promise<AddedBooking> {
    const {
      onBehalfOfName,
      onBehalfOfEmail,
      onBehalfOfPhone,
      vehicleId,
      startDate,
      endDate,
      amount,
      totalAmount,
      additionalDriverAmount,
      driverId,
    } = data

    const bookingId = this.idGenerator()
    const bookingCode = await this.generateBookingCode()
    const bookingDetailId = this.idGenerator()

    const addBookingQuery = `
    INSERT INTO bookings (id, user_id, vehicle_id, driver_id, start_at, end_at, amount, additional_driver_amount, total_amount, status, created_by, code)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `

    const addBookingDetailQuery = `
    INSERT INTO booking_details (id, booking_id, on_behalf_of_name, on_behalf_of_phone, on_behalf_of_email, created_by)
    VALUES (?,?,?,?,?,?)
    `

    try {
      await this.pool.beginTransaction()

      await this.pool.query(addBookingQuery, [
        bookingId,
        userId,
        vehicleId,
        driverId,
        startDate,
        endDate,
        amount,
        additionalDriverAmount,
        totalAmount,
        'pending',
        userId,
        bookingCode,
      ])
      await this.pool.query(addBookingDetailQuery, [
        bookingDetailId,
        bookingId,
        onBehalfOfName,
        onBehalfOfPhone,
        onBehalfOfEmail,
        userId,
      ])

      await this.pool.commit()
    } catch (error) {
      await this.pool.rollback()

      throw new Error('Failed to add booking')
    }

    return { totalAmount, bookingId }
  }

  addBookingDetail(data: unknown): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async addInvoice(data: NewInvoice): Promise<void> {
    const { accountName, amount, receipt } = data

    const id = this.idGenerator()
    const trxId = this.generateInvoiceTrxId()

    const sql = `
    INSERT INTO invoices (id, trx_id, amount, payment_type, payment_channel, receipt, account_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    await this.pool.query(sql, [id, trxId, amount, 'cashless', 'bank-transfer', receipt, accountName, 'pending'])
  }

  getAllBookings(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getBookingById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getBookingByUserId(userId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  updateBookingById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteBookingById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  updateInvoiceByBookingId(bookingId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
export default BookingRepository
