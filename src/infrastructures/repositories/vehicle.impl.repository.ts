import { FilterBy, type IVehicleRepository } from '@/domains/repositories/vehicle.repository'
import Repository from './repository'

class VehicleRepository extends Repository implements IVehicleRepository {
  getAllVehicles(): Promise<void> {
    const sql = `SELECT * FROM vehicles`
    throw new Error('Method not implemented.')
  }

  getVehicleById(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getVehicleByMakeId(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getVehicleByModelId(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getVehicleCategoriesForCatalogue(filters: Partial<FilterBy>): Promise<void> {
    const { makeIds, classificationIds, noOfSeats, transmission } = filters

    let sql = `
        SELECT * FROM vehicles v
        INNER JOIN vehicle_classifications vc ON vc.id = v.classification_id
        INNER JOIN vehicle_makes vma ON vma.id = v.make_id
        INNER JOIN vehicle_models vmo ON vmo.id = v.model_id
        WHERE v.availability = ?
        `

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any = ['available']

    if (makeIds && makeIds.length > 0) {
      sql += ` AND v.make_id IN (?)`
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

    const [rows] = await this.pool.execute(sql, values)
  }
}

export default VehicleRepository
