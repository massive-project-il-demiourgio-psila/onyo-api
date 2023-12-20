export type Booking = {
  id: string
  userId: string
  vehicleId: string
  invoiceId: string | null
  driverId: string
  startAt: string
  endAt: string
  amount: number
  additionalDriverAmount: number | null
  totalAmount: number
  reasonCancelled: string | null
  status: string
  createdAt: string
  updatedAt: string | null
  createdBy: string
  updatedBy: string
  code: string
}
