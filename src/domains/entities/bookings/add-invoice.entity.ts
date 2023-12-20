import { z } from 'zod'

export const addInvoiceSchema = z.object({
  accountName: z.string().trim(),
  bookingId: z.string().ulid(),
  userId: z.string().ulid(),
})

export type AddInvoice = z.infer<typeof addInvoiceSchema>

export const newInvoiceSchema = addInvoiceSchema
  .extend({
    amount: z.number().positive(),
    receipt: z.string().trim(),
  })
  .omit({ bookingId: true, userId: true })

export type NewInvoice = z.infer<typeof newInvoiceSchema>
