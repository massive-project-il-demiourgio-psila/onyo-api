import { Booking } from '../entities/bookings/booking.entity'

export type BookingInDb = {
  id: string
  user_id: string
  vehicle_id: string
  invoice_id: string | null
  driver_id: string
  start_at: string
  end_at: string
  amount: number
  additional_driver_amount: number | null
  total_amount: number
  reason_cancelled: string | null
  status: string
  created_at: string
  updated_at: string | null
  created_by: string
  updated_by: string
  code: string
}

export const mapBookingFromDb = (payload: BookingInDb): Booking => ({
  id: payload.id,
  userId: payload.user_id,
  vehicleId: payload.vehicle_id,
  invoiceId: payload.invoice_id,
  driverId: payload.driver_id,
  startAt: payload.start_at,
  endAt: payload.end_at,
  amount: payload.amount,
  additionalDriverAmount: payload.additional_driver_amount,
  totalAmount: payload.total_amount,
  reasonCancelled: payload.reason_cancelled,
  status: payload.status,
  createdAt: payload.created_at,
  updatedAt: payload.updated_at,
  createdBy: payload.created_by,
  updatedBy: payload.updated_by,
  code: payload.code,
})
