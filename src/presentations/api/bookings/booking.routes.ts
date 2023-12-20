import { Router } from 'express'
import upload from '@/infrastructures/http/middlewares/multer'
import authJwt from '@/infrastructures/http/middlewares/passport-jwt'
import type BookingHandler from './booking.handler'

const bookingRouter = (handler: BookingHandler) => {
  const router = Router()

  router.get('/', authJwt, handler.getBooking)
  router.post('/', authJwt, handler.postBooking)
  router.post('/:bookingId/invoice', upload.single('paymentProof'), authJwt, handler.postInvoice)
  router.put('/:bookingId/invoice/verify', authJwt, handler.updateBookingValidatePayment)

  return router
}

export default bookingRouter
