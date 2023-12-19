import { type IVehicleRepository } from '@/domains/repositories/vehicle.repository'
import {
  NewVehicleClassification,
  Vehicle,
  VehicleClassification,
  VehicleMake,
  VehicleModel,
} from '@/domains/entities/vehicles/vehicle.entity'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import NotFoundError from '@/commons/exceptions/not-found.error'
import { singleton } from 'tsyringe'
import { VehicleInDB, mapVehicleFromDB } from '@/domains/mapping/vehicle.map'
import Repository from './repository'

@singleton()
class VehicleRepository extends Repository implements IVehicleRepository {
  addVehicle(data: Vehicle): Promise<Vehicle> {
    throw new Error('Method not implemented.')
  }

  getAllVehicles(): Promise<Vehicle[]> {
    throw new Error('Method not implemented.')
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const sql = 'SELECT * FROM vehicles WHERE id = ? LIMIT 1'
    const [rows] = await this.pool.query<Vehicle[] & RowDataPacket[]>(sql, [id])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Not Found')
    }

    return rows[0]
  }

  async getVehicleByMakeId(makeId: string): Promise<Vehicle> {
    const sql = 'SELECT * FROM vehicles WHERE make_id = ? LIMIT 1'
    const [rows] = await this.pool.query<Vehicle[] & RowDataPacket[]>(sql, [makeId])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Not Found')
    }

    return rows[0]
  }

  async getVehicleByModelId(modelId: string): Promise<Vehicle> {
    const sql = 'SELECT * FROM vehicles WHERE model_id = ? LIMIT 1'
    const [rows] = await this.pool.query<Vehicle[] & RowDataPacket[]>(sql, [modelId])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Not Found')
    }

    return rows[0]
  }

  async getVehicleByClassificationId(classificationId: string): Promise<Vehicle> {
    const sql = 'SELECT * FROM vehicles WHERE classication_id = ? LIMIT 1'
    const [rows] = await this.pool.query<Vehicle[] & RowDataPacket[]>(sql, [classificationId])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Not Found')
    }

    return rows[0]
  }

  updateVehicleById(id: string, data: Partial<Vehicle>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteVehicleById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getVehicleCategoriesForCatalogue(
    filters: Partial<{
      transmission: 'automatic' | 'manual'
      noOfSeats: number[]
      makeIds: string[]
      classificationIds: string[]
      startDate: Date
      endDate: Date
    }>,
  ): Promise<Vehicle[]> {
    const { makeIds, classificationIds, noOfSeats, transmission, startDate, endDate } = filters

    let sql = `
        SELECT v.*, CONCAT(vma.name, " ", vmo.name) AS name, COALESCE(v.image_path, vmo.reference_image_path) AS image_path FROM vehicles v
        INNER JOIN vehicle_classifications vc ON vc.id = v.classification_id
        INNER JOIN vehicle_makes vma ON vma.id = v.make_id
        INNER JOIN vehicle_models vmo ON vmo.id = v.model_id
        WHERE 1=1
        `

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any = []

    if (makeIds && makeIds.length > 0) {
      sql += `v.make_id IN (?)`
      values.push(makeIds)
    }

    if (classificationIds && classificationIds.length > 0) {
      sql += ` AND v.classification_id IN (?)`
      values.push(classificationIds)
    }

    if (noOfSeats && noOfSeats.length > 0) {
      sql += ` AND v.no_of_seats IN (?)`
      values.push(noOfSeats)
    }

    if (transmission) {
      sql += ` AND v.transmission = ?`
      values.push(transmission)
    }

    const [rows] = await this.pool.query<VehicleInDB[] & RowDataPacket[]>(sql, values)

    return rows.map((v) => mapVehicleFromDB(v))
  }

  async addVehicleClassification(data: NewVehicleClassification): Promise<void> {
    const { name, description, abbrv, isActive } = data
    const id = this.idGenerator()

    const sql = 'INSERT INTO vehicle_classifications (id, name, description, is_active, abbrv) VALUES (?, ?, ?, ?, ?)'

    const [result] = await this.pool.query<ResultSetHeader>(sql, [id, name, description, isActive, abbrv])
  }

  async getAllVehicleClassifications(): Promise<VehicleClassification[]> {
    const sql = 'SELECT * FROM vehicle_classifications'
    const [rows] = await this.pool.query<VehicleClassification[] & RowDataPacket[]>(sql)

    return rows
  }

  async getVehicleClassificationById(id: string): Promise<VehicleClassification> {
    const sql = 'SELECT * FROM vehicle_classifications WHERE id = ? LIMIT 1'
    const [rows] = await this.pool.query<VehicleClassification[] & RowDataPacket[]>(sql, [id])

    if (rows[0] == null) {
      throw new NotFoundError('Classification Not Found')
    }

    return rows[0]
  }

  updateVehicleClassificationById(id: string, data: Partial<VehicleClassification>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteVehicleClassificationById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  addVehicleMake(data: VehicleMake): Promise<VehicleMake> {
    throw new Error('Method not implemented.')
  }

  getAllVehicleMakes(): Promise<VehicleMake[]> {
    throw new Error('Method not implemented.')
  }

  async getVehicleMakeById(id: string): Promise<VehicleMake> {
    const sql = 'SELECT * FROM vehicle_makes WHERE id = ? LIMIT 1'
    const [rows] = await this.pool.query<VehicleMake[] & RowDataPacket[]>(sql, [id])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Make Not Found')
    }

    return rows[0]
  }

  async getVehicleMakeBySlug(slug: string): Promise<VehicleMake> {
    const sql = 'SELECT * FROM vehicle_makes WHERE slug = ? LIMIT 1'
    const [rows] = await this.pool.query<VehicleMake[] & RowDataPacket[]>(sql, [slug])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Make Not Found')
    }

    return rows[0]
  }

  updateVehicleMakeById(id: string, data: Partial<VehicleMake>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteVehicleMakeById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  addVehicleModel(data: VehicleModel): Promise<VehicleModel> {
    throw new Error('Method not implemented.')
  }

  getAllVehicleModels(): Promise<VehicleModel[]> {
    throw new Error('Method not implemented.')
  }

  async getVehicleModelById(id: string): Promise<VehicleModel> {
    const sql = 'SELECT * FROM vehicle_models WHERE id = ? LIMIT 1'
    const [rows] = await this.pool.query<VehicleModel[] & RowDataPacket[]>(sql, [id])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Model Not Found')
    }

    return rows[0]
  }

  async getVehicleModelBySlug(slug: string): Promise<VehicleModel> {
    const sql = 'SELECT * FROM vehicle_models WHERE slug = ? LIMIT 1'
    const [rows] = await this.pool.query<VehicleModel[] & RowDataPacket[]>(sql, [slug])

    if (rows[0] == null) {
      throw new NotFoundError('Vehicle Model Not Found')
    }

    return rows[0]
  }

  updateVehicleModelById(id: string, data: Partial<VehicleModel>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteVehicleModelById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default VehicleRepository
