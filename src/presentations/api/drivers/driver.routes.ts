import { Router } from 'express'
import upload from '@/infrastructures/http/middlewares/multer'
import type DriverHandler from './driver.handler'

const driverRouter = (handler: DriverHandler) => {
  const router = Router()

  router.post('/', upload.fields([{ name: 'picture' }, { name: 'ktp' }, { name: 'sim' }]), handler.postDriver)

  return router
}

export default driverRouter
