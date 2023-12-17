import { Router } from 'express'
import upload from '@/infrastructures/http/middlewares/multer'
import type BookingHandler from './booking.handler'

const bookingRouter = (handler: BookingHandler) => {
  const router = Router()

  router.post('/', handler.postBooking)
  router.put('/invoices', upload.single('payment_proof'), handler.postBooking)

  return router
}

export default bookingRouter
