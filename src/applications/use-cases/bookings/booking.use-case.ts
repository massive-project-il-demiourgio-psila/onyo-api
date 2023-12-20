import { Booking } from '@/domains/entities/bookings/booking.entity'
import type { IBookingRepository } from '@/domains/repositories/booking.repository'
import type { IUserRepository } from '@/domains/repositories/user.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
class BookingUseCase {
  private bookingRepository: IBookingRepository

  private userRepository: IUserRepository

  constructor(
    @inject(DiTokens.BookingRepository) bookingRepository: IBookingRepository,
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
  ) {
    this.bookingRepository = bookingRepository
    this.userRepository = userRepository
  }

  async getAllBooking() {
    const bookings = await this.bookingRepository.getAllBookings()

    return bookings
  }
}

export default BookingUseCase
