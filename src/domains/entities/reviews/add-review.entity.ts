import { z } from 'zod'

export const addReviewSchema = z.object({
  userId: z.string().ulid(),
  bookingId: z.string().ulid(),
  vehicleId: z.string().ulid().optional(),
  content: z.string().trim().nullable(),
  rating: z.number().min(1).max(5),
})

export type AddReview = z.infer<typeof addReviewSchema>
