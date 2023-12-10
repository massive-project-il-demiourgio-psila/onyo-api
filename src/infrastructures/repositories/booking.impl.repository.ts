import { IBookingRepository } from '@/domains/repositories/booking.repository'
import Repository from './repository'

class BookingRepository extends Repository implements IBookingRepository {
  addBooking(data: unknown): Promise<void> {
    throw new Error('Method not implemented.')
  }

  addBookingDetail(data: unknown): Promise<void> {
    throw new Error('Method not implemented.')
  }

  addInvoice(data: unknown): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
export default BookingRepository
