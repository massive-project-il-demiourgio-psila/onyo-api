import { IBookingRepository } from '@/domains/repositories/booking.repository'
import { IVehicleRepository } from '@/domains/repositories/vehicle.repository'
import { IUserRepository } from '@/domains/repositories/user.repository'

class CancelBookingUseCase {
  private bookingRepository: IBookingRepository

  private vehicleRepository: IVehicleRepository

  private userRepository: IUserRepository

  constructor(
    bookingRepository: IBookingRepository,
    vehicleRepository: IVehicleRepository,
    userRepository: IUserRepository,
  ) {
    this.bookingRepository = bookingRepository
    this.vehicleRepository = vehicleRepository
    this.userRepository = userRepository
  }

  async execute(payload: unknown) {
    // TODO
  }
}

export default CancelBookingUseCase
