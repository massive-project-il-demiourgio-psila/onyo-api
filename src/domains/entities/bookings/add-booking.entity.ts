import z from 'zod'

export const addBookingPayloadSchema = z.object({
  onBehalfOfUser: z.boolean(),
  onBehalfOfName: z.string().trim().nullable(),
  onBehalfOfEmail: z.string().trim().nullable(),
  onBehalfOfPhone: z.string().trim().nullable(),
  vehicleId: z.string().ulid(),
  bookingType: z.string(),
  startDate: z.coerce.date().refine((data) => data >= new Date(), { message: 'Start date must be in the future' }),
  endDate: z.coerce.date(),
})

addBookingPayloadSchema.superRefine((val, ctx) => {
  if (val.onBehalfOfUser === false) {
    if (val.onBehalfOfName === '' || val.onBehalfOfName == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Name must not be empty when not using user data',
      })
    }

    if (val.onBehalfOfPhone === '' || val.onBehalfOfPhone == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone must not be empty when not using user data',
      })
    }
  }
})

addBookingPayloadSchema.refine((data) => data.endDate > data.startDate, {
  message: 'End date cannot be earlier than start date.',
  path: ['endDate'],
})

export type AddBooking = z.infer<typeof addBookingPayloadSchema>

export const newBookingSchema = addBookingPayloadSchema.extend({
  amount: z.number().positive(),
  totalAmount: z.number().positive(),
  additionalDriverAmount: z.number().positive().nullable(),
  driverId: z.string().ulid().nullable(),
})

export type NewBooking = z.infer<typeof newBookingSchema>

export const addedBookingSchema = z.object({
  totalAmount: z.number().positive(),
  bookingId: z.string(),
})

export type AddedBooking = z.infer<typeof addedBookingSchema>
