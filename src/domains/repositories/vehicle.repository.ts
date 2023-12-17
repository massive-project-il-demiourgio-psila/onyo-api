import { z } from 'zod'
import {
  NewVehicle,
  NewVehicleClassification,
  NewVehicleMake,
  NewVehicleModel,
  UpdateVehicle,
  UpdateVehicleClassification,
  UpdateVehicleMake,
  UpdateVehicleModel,
  Vehicle,
  VehicleClassification,
  VehicleMake,
  VehicleModel,
} from '../entities/vehicles/vehicle.entity'

const filterBySchema = z
  .object({
    makeIds: z.array(z.string()),
    classificationIds: z.array(z.string()),
    noOfSeats: z.array(z.number()),
    transmission: z.enum(['automatic', 'manual']),
    startDate: z.coerce.date().refine((data) => data > new Date(), { message: 'Start date must be in the future' }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
  })

export type FilterBy = z.infer<typeof filterBySchema>

export interface IVehicleRepository {
  // don't bother with pagination :)
  addVehicle(data: NewVehicle): Promise<Vehicle>
  getAllVehicles(): Promise<Vehicle[]>
  getVehicleById(id: string): Promise<Vehicle>
  getVehicleByMakeId(makeId: string): Promise<Vehicle>
  getVehicleByModelId(modelId: string): Promise<Vehicle>
  getVehicleByClassificationId(classificationId: string): Promise<Vehicle>
  updateVehicleById(id: string, data: UpdateVehicle): Promise<void>
  deleteVehicleById(id: string): Promise<void>
  getVehicleCategoriesForCatalogue(filters: Partial<FilterBy>): Promise<Vehicle[]>

  addVehicleClassification(data: NewVehicleClassification): Promise<void>
  getAllVehicleClassifications(): Promise<VehicleClassification[]>
  getVehicleClassificationById(id: string): Promise<VehicleClassification>
  updateVehicleClassificationById(id: string, data: UpdateVehicleClassification): Promise<void>
  deleteVehicleClassificationById(id: string): Promise<void>

  addVehicleMake(data: NewVehicleMake): Promise<VehicleMake>
  getAllVehicleMakes(): Promise<VehicleMake[]>
  getVehicleMakeById(id: string): Promise<VehicleMake>
  getVehicleMakeBySlug(slug: string): Promise<VehicleMake>
  updateVehicleMakeById(id: string, data: UpdateVehicleMake): Promise<void>
  deleteVehicleMakeById(id: string): Promise<void>

  addVehicleModel(data: NewVehicleModel): Promise<VehicleModel>
  getAllVehicleModels(): Promise<VehicleModel[]>
  getVehicleModelById(id: string): Promise<VehicleModel>
  getVehicleModelBySlug(slug: string): Promise<VehicleModel>
  updateVehicleModelById(id: string, data: UpdateVehicleModel): Promise<void>
  deleteVehicleModelById(id: string): Promise<void>

  // should get available cars within date range
}
