export type FilterBy = {
  makeIds: string[]
  noOfSeats: number[]
  classificationIds: string[]
  transmission: 'automatic' | 'manual'
}

export interface IVehicleRepository {
  // don't bother with pagination :)
  getAllVehicles(): Promise<void>
  getVehicleById(): Promise<void>
  getVehicleByMakeId(): Promise<void>
  getVehicleByModelId(): Promise<void>
  getVehicleCategoriesForCatalogue(filters: Partial<FilterBy>): Promise<void>
  // should get available cars within date range
}
