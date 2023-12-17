export type VehicleClassification = {
  id: string
  name: string
  description: string
  isActive: boolean
  abbrv: string
}

export type NewVehicleClassification = Omit<VehicleClassification, 'id'>
export type UpdateVehicleClassification = Partial<VehicleClassification>

export type VehicleMake = {
  id: string
  name: string
  slug: string
  logo: string
  vehicleCount: number
  vehicleModelCount: number
  isActive: boolean
}

export type NewVehicleMake = VehicleMake
export type UpdateVehicleMake = Partial<VehicleMake>

export type VehicleModel = {
  id: string
  makeId: string
  name: string
  slug: string
  vehicleCount: number
  isActive: boolean
  refImagePath: string
}

export type NewVehicleModel = VehicleModel
export type UpdateVehicleModel = Partial<VehicleModel>

export type Vehicle = {
  id: string
  makeId: string
  modelId: string
  classificationId: string
  fuelTypeId: string
  perDayAmount: number | null
  perHourAmount: number | null
  transmission: TransmissionType
  noOfSeats: number
  year: number
  licensePlate: string | null
  availability: string
  airCon: number | null
  imagePath: string | null
  images: string[]
  extraAttributes: string | VehicleExtraAttributes
}

export type NewVehicle = Omit<Vehicle, 'id'>
export type UpdateVehicle = Partial<Vehicle>

export type TransmissionType = 'automatic' | 'manual'

export type VehicleExtraAttributes = {
  color: string | null
  noOfDoors: number
  noOfGears: number
  noOfAirbags: number
}
