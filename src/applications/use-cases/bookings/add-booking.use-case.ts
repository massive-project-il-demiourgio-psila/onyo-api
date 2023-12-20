import { AddBooking, addBookingPayloadSchema, newBookingSchema } from '@/domains/entities/bookings/add-booking.entity'
import type { IBookingRepository } from '@/domains/repositories/booking.repository'
import type IDriverRepository from '@/domains/repositories/driver.repository'
import type { IUserRepository } from '@/domains/repositories/user.repository'
import type { IVehicleRepository } from '@/domains/repositories/vehicle.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { countDaysBetweenDates } from '@/utils/date'
import { inject, injectable } from 'tsyringe'

@injectable()
class AddBookingUseCase {
  private bookingRepository: IBookingRepository

  private vehicleRepository: IVehicleRepository

  private userRepository: IUserRepository

  private driverRepository: IDriverRepository

  constructor(
    @inject(DiTokens.BookingRepository) bookingRepository: IBookingRepository,
    @inject(DiTokens.VehicleRepository) vehicleRepository: IVehicleRepository,
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
    @inject(DiTokens.DriverRepository) driverRepository: IDriverRepository,
  ) {
    this.bookingRepository = bookingRepository
    this.vehicleRepository = vehicleRepository
    this.userRepository = userRepository
    this.driverRepository = driverRepository
  }

  async execute(payload: AddBooking, userId: string) {
    const data = addBookingPayloadSchema.parse(payload)

    let { onBehalfOfName, onBehalfOfEmail, onBehalfOfPhone } = data
    const { onBehalfOfUser, vehicleId, bookingType, startDate, endDate } = data

    const user = await this.userRepository.getUserById(userId)
    const vehicle = await this.vehicleRepository.getVehicleById(vehicleId)

    if (onBehalfOfUser) {
      onBehalfOfName = user.fullName
      onBehalfOfEmail = user.email
      onBehalfOfPhone = user.phone
    }

    const days = countDaysBetweenDates(startDate, endDate)

    const amount = (vehicle.perDayAmount || 100000) * days
    let driverId = null
    let driverAmount = null
    let totalAmount = amount

    if (bookingType === 'with-driver') {
      driverId = await this.driverRepository.getSingleRandomDriver()

      driverAmount = 75000 * days
      totalAmount += driverAmount
    }

    const addBooking = newBookingSchema.parse({
      onBehalfOfUser,
      onBehalfOfName,
      onBehalfOfEmail,
      onBehalfOfPhone,
      vehicleId,
      bookingType,
      startDate,
      endDate,
      amount,
      totalAmount,
      additionalDriverAmount: driverAmount,
      driverId,
    })

    const result = await this.bookingRepository.addBooking(addBooking, user.id)

    return result
  }
}

export default AddBookingUseCase
