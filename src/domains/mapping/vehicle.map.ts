import { TransmissionType, type Vehicle } from '../entities/vehicles/vehicle.entity'

export type VehicleInDB = {
  id: string
  make_id: string
  model_id: string
  classification_id: string
  fuel_type_id: string
  name: string
  per_day_amount: number | null
  per_hour_amount: number | null
  transmission: string
  no_of_seats: number
  year: number
  license_plate: string | null
  availability: string
  air_con: number | null
  image_path: string | null
  images: string[]
  extra_attributes: string
}

// eslint-disable-next-line import/prefer-default-export
export const mapVehicleFromDB = (payload: VehicleInDB): Vehicle => ({
  id: payload.id,
  makeId: payload.make_id,
  modelId: payload.model_id,
  classificationId: payload.classification_id,
  name: payload.name,
  fuelTypeId: payload.fuel_type_id,
  perDayAmount: payload.per_day_amount,
  perHourAmount: payload.per_hour_amount,
  transmission: payload.transmission as TransmissionType,
  noOfSeats: payload.no_of_seats,
  year: payload.year,
  licensePlate: payload.license_plate,
  availability: payload.availability,
  airCon: payload.air_con,
  imagePath: payload.image_path,
  images: payload.images,
  extraAttributes: JSON.parse(payload.extra_attributes),
})
