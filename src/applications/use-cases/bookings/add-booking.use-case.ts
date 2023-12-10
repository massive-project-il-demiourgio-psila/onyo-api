import type { IBookingRepository } from '@/domains/repositories/booking.repository'
import type { IUserRepository } from '@/domains/repositories/user.repository'
import type { IVehicleRepository } from '@/domains/repositories/vehicle.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
class AddBookingUseCase {
  private bookingRepository: IBookingRepository

  private vehicleRepository: IVehicleRepository

  private userRepository: IUserRepository

  constructor(
    @inject(DiTokens.BookingRepository) bookingRepository: IBookingRepository,
    @inject(DiTokens.VehicleRepository) vehicleRepository: IVehicleRepository,
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
  ) {
    this.bookingRepository = bookingRepository
    this.vehicleRepository = vehicleRepository
    this.userRepository = userRepository
  }

  async execute(payload: unknown) {
    // also add booking detail if on_behalf is null use user data
    // if chosen vehicle model is available
  }
}

export default AddBookingUseCase
