/* eslint-disable @typescript-eslint/naming-convention */
import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'

class BookingHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  postBooking = async (req: Request, res: Response) => {}
}

export default BookingHandler
