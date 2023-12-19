/* eslint-disable @typescript-eslint/naming-convention */
import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import GetVehicleUseCase from '@/applications/use-cases/vehicles/get-vehicle.use-case'

class VehicleHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  getVehicle = async (req: Request, res: Response) => {
    const { makes, classes, seats, transmission, start_date: startDate, end_date: endDate } = req.query

    const payload = {
      makeIds: makes?.split(','),
      classificationIds: classes?.split(','),
      noOfSeats: seats?.split(',').map((v) => +v),
      transmission,
      startDate,
      endDate,
    }

    const getVehicleUseCase = this.container.resolve(GetVehicleUseCase)
    const vehicles = await getVehicleUseCase.execute(payload)

    res.status(200).jsonp(vehicles)
  }
}

export default VehicleHandler
