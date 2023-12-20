/* eslint-disable @typescript-eslint/naming-convention */
import AddBookingUseCase from '@/applications/use-cases/bookings/add-booking.use-case'
import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import AuthorizationError from '@/commons/exceptions/authorization.error'
import BookingUseCase from '@/applications/use-cases/bookings/booking.use-case'
import AddInvoiceUseCase from '../../../applications/use-cases/invoices/add-invoice.use-case'

class BookingHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  getBooking = async (req: Request, res: Response) => {
    const { role } = req.user!

    const bookingUseCase = this.container.resolve(BookingUseCase)

    if (role === 'user') {
      throw new AuthorizationError() // get history instead
    }

    const bookings = await bookingUseCase.getAllBooking()

    res.json(bookings)
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
    const { role } = req.user!
    const bookingId = req.params.bookingId as string

    const bookingUseCase = this.container.resolve(BookingUseCase)

    if (role === 'user') {
      throw new AuthorizationError() // get history instead
    }

    await bookingUseCase.verifyBookingPayment(bookingId)

    res.json({ message: 'success' })
  }
}

export default BookingHandler
