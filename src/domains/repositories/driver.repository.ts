interface IDriverRepository {
  addDriver(data: unknown): Promise<void>
  getAllDrivers(): Promise<void>
  getDriverById(id: string): Promise<void>
  updateDriverById(id: string, data: unknown): Promise<void>
  deleteDriverById(id: string): Promise<void>

  verifyIdCard(userId: string): Promise<void>
  verifyLicense(userId: string): Promise<void>
}

export default IDriverRepository
