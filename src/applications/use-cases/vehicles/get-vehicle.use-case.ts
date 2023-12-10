import { IVehicleRepository } from '@/domains/repositories/vehicle.repository'

class GetVehicleUseCase {
  private vehicleRepository: IVehicleRepository

  constructor(vehicleRepository: IVehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }

  async execute(payload: unknown) {
    // TODO filters by make, seats, transmissionm, classifications
  }
}

export default GetVehicleUseCase
