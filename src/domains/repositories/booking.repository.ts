import { AddedBooking, NewBooking } from '../entities/bookings/add-booking.entity'
import { NewInvoice } from '../entities/bookings/add-invoice.entity'
import { Booking } from '../entities/bookings/booking.entity'
import { Invoice } from '../entities/bookings/invoice.entity'

export interface IBookingRepository {
  addBooking(data: NewBooking, userId: string): Promise<AddedBooking>

  getAllBookings(): Promise<Booking[]>
  getBookingById(id: string): Promise<Booking>
  getBookingByUserId(userId: string): Promise<void>
  updateBookingById(id: string): Promise<void>
  deleteBookingById(id: string): Promise<void>
  addInvoice(data: NewInvoice): Promise<string>
  attachInvoiceToBooking(invoiceId: string, bookingId: string): Promise<void>
  getInvoiceById(id: string): Promise<Invoice>
  verifyBooking(bookingId: string): Promise<void>

  updateInvoiceByBookingId(bookingId: string): Promise<void>
}
