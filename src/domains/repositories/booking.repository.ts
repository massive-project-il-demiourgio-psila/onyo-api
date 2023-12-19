import { AddedBooking, NewBooking } from '../entities/bookings/add-booking.entity'
import { NewInvoice } from '../entities/bookings/add-invoice.entity'

export interface IBookingRepository {
  addBooking(data: NewBooking, userId: string): Promise<AddedBooking>

  getAllBookings(): Promise<void>
  getBookingById(id: string): Promise<void>
  getBookingByUserId(userId: string): Promise<void>
  updateBookingById(id: string): Promise<void>
  deleteBookingById(id: string): Promise<void>
  addInvoice(data: NewInvoice): Promise<void>

  updateInvoiceByBookingId(bookingId: string): Promise<void>
}
