/* eslint-disable @typescript-eslint/naming-convention */
import AddBookingUseCase from '@/applications/use-cases/bookings/add-booking.use-case'
import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import AuthorizationError from '@/commons/exceptions/authorization.error'
import BookingUseCase from '@/applications/use-cases/bookings/booking.use-case'
import pool from '@/infrastructures/data-sources/mysql/pool'
import AddInvoiceUseCase from '../../../applications/use-cases/invoices/add-invoice.use-case'

class BookingHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  getBooking = async (req: Request, res: Response) => {
    const { sub: userId, role } = req.user!

    const bookingUseCase = this.container.resolve(BookingUseCase)

    if (role === 'user') {
      const [rows] = await pool.query(
        `
      SELECT
        CONCAT( vehicle_makes.name, " ", vehicle_models.name, " ", vehicles.year ) AS name,
        bookings.status,
        bookings.total_amount,
        bookings.additional_driver_amount,
        bookings.end_at,
        bookings.start_at,
        bookings.amount,
        bookings.code
      FROM
        users
        INNER JOIN bookings ON users.id = bookings.user_id
        INNER JOIN invoices ON bookings.invoice_id = invoices.id
        INNER JOIN vehicles ON bookings.vehicle_id = vehicles.id
        INNER JOIN vehicle_models ON vehicles.model_id = vehicle_models.id
        INNER JOIN vehicle_makes ON vehicle_models.make_id = vehicle_makes.id
      WHERE
        users.id = ?
      `,
        [userId],
      )

      res.json(rows)
    }

    const bookings = await bookingUseCase.getAllBooking()

    res.json(bookings)
  }

  getBookingById = async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId as string

    const [rows] = await pool.query(
      `
    SELECT
      CONCAT( vehicle_makes.name, " ", vehicle_models.name, " ", vehicles.year ) AS name,
      bookings.status,
      bookings.total_amount,
      bookings.additional_driver_amount,
      bookings.end_at,
      bookings.start_at,
      bookings.amount,
      bookings.code,
      booking_details.on_behalf_of_name,
      invoices.receipt
    FROM
      bookings
      INNER JOIN invoices ON bookings.invoice_id = invoices.id
      INNER JOIN vehicles ON bookings.vehicle_id = vehicles.id
      INNER JOIN vehicle_models ON vehicles.model_id = vehicle_models.id
      INNER JOIN vehicle_makes ON vehicle_models.make_id = vehicle_makes.id
      INNER JOIN booking_details ON bookings.id = booking_details.booking_id
    WHERE
      bookings.id = ?
    `,
      [bookingId],
    )

    res.json(rows)
  }

  postBooking = async (req: Request, res: Response) => {
    const addBookingUseCase = this.container.resolve(AddBookingUseCase)
    const { bookingId, totalAmount } = await addBookingUseCase.execute(req.body, req.user!.sub)

    res.status(201).json({ bookingId, totalAmount })
  }

  /**
   * Add payment to booking
   */
  postInvoice = async (req: Request, res: Response) => {
    const { buffer, mimetype } = req.file!
    const { accountName } = req.body
    const bookingId = req.params.bookingId as string
    const { sub: userId } = req.user!

    const addInvoiceUseCase = this.container.resolve(AddInvoiceUseCase)
    await addInvoiceUseCase.execute({ accountName, bookingId, userId }, { buffer, mimetype })

    res.status(201).json({ message: 'success' })
  }

  updateBookingValidatePayment = async (req: Request, res: Response) => {
    // const { role } = req.user!
    const bookingId = req.params.bookingId as string

    const bookingUseCase = this.container.resolve(BookingUseCase)

    // if (role === 'user') {
    //   throw new AuthorizationError() // get history instead
    // }

    await bookingUseCase.verifyBookingPayment(bookingId)

    res.json({ message: 'success' })
  }
}

export default BookingHandler
