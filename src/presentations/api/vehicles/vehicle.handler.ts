import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import GetVehicleUseCase from '@/applications/use-cases/vehicles/get-vehicle.use-case'

class VehicleHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  getVehicle = async (req: Request, res: Response) => {
    // const { email, password } = req.body
    // filtered query params

    const getVehicleUseCase = this.container.resolve(GetVehicleUseCase)
    // const authTokens = await loginUseCase.execute({ email, password })

    // res.json(authTokens)
  }
}

export default VehicleHandler
