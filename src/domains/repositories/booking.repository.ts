export interface IBookingRepository {
  addBooking(data: unknown): Promise<void>
  getAllBookings(): Promise<void>
  getBookingById(id: string): Promise<void>
  getBookingByUserId(userId: string): Promise<void>
  updateBookingById(id: string): Promise<void>
  deleteBookingById(id: string): Promise<void>

  updateInvoiceByBookingId(bookingId: string): Promise<void>
}
