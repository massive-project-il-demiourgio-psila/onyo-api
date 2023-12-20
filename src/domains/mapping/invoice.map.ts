import { Invoice } from '../entities/bookings/invoice.entity'

export type InvoiceInDb = {
  id: string
  trx_id: string
  external_trx_id: string | null
  external_id: string | null
  amount: string
  payment_type: string
  payment_channel: string
  payment_link: string | null
  expired_at: string | null
  account_name: string
  receipt: string
  note: string | null
  status: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
}

export const mapInvoiceFromDb = (payload: InvoiceInDb): Invoice => ({
  id: payload.id,
  trxId: payload.trx_id,
  externalTrxId: payload.external_trx_id,
  externalId: payload.external_id,
  amount: payload.amount,
  paymentType: payload.payment_type,
  paymentChannel: payload.payment_channel,
  paymentLink: payload.payment_link,
  expiredAt: payload.expired_at,
  accountName: payload.account_name,
  receipt: payload.receipt,
  note: payload.note,
  status: payload.status,
  createdAt: payload.created_at,
  updatedAt: payload.updated_at,
  createdBy: payload.created_by,
  updatedBy: payload.updated_by,
})
