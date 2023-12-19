import IDriverRepository from '@/domains/repositories/driver.repository'
import { RowDataPacket } from 'mysql2'
import Repository from './repository'

class DriverRepository extends Repository implements IDriverRepository {
  addDriver(data: unknown): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getAllDrivers(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getSingleRandomDriver(): Promise<string> {
    const [rows] = await this.pool.execute<RowDataPacket[]>('SELECT id FROM drivers ORDER BY RAND() LIMIT 1')

    if (rows[0] == null || rows.length === 0) throw Error('Failed to assign random driver')

    return rows[0].id
  }

  getDriverById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  updateDriverById(id: string, data: unknown): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteDriverById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  verifyIdCard(userId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  verifyLicense(userId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
