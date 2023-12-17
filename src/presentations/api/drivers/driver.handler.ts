/* eslint-disable @typescript-eslint/naming-convention */
import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'

class DriverHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  postDriver = async (req: Request, res: Response) => {}
}

export default DriverHandler
