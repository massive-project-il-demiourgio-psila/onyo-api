import type { IVehicleRepository } from '@/domains/repositories/vehicle.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'
import { Vehicle } from '@/domains/entities/vehicles/vehicle.entity'
import type FileStorage from '@/applications/storage/file-storage'
import { FilterBy } from '../../../domains/repositories/vehicle.repository'
import { Paths } from '../../../commons/constants'

@injectable()
class GetVehicleUseCase {
  private vehicleRepository: IVehicleRepository

  private fileStorage: FileStorage

  constructor(
    @inject(DiTokens.VehicleRepository) vehicleRepository: IVehicleRepository,
    @inject(DiTokens.FileStorage) fileStorage: FileStorage,
  ) {
    this.vehicleRepository = vehicleRepository
    this.fileStorage = fileStorage
  }

  async execute(payload: Partial<FilterBy>): Promise<Vehicle[]> {
    const result = await this.vehicleRepository.getVehicleCategoriesForCatalogue(payload)

    return result.map((v) => ({ ...v, imagePath: this.fileStorage.getUrl(v.imagePath, Paths.VehicleModelRefImage) }))
  }
}

export default GetVehicleUseCase
