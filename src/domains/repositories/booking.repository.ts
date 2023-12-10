export interface IBookingRepository {
  addBooking(data: unknown): Promise<void>
  addBookingDetail(data: unknown): Promise<void>
  addInvoice(data: unknown): Promise<void>
}
