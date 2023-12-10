import { Router } from 'express'
import type VehicleHandler from './vehicle.handler'

const vehicleRouter = (handler: VehicleHandler) => {
  const router = Router()

  router.get('/', handler.getVehicle)

  return router
}

export default vehicleRouter
