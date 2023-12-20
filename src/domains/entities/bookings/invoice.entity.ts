export type Invoice = {
  id: string
  trxId: string
  externalTrxId: string | null
  externalId: string | null
  amount: string
  paymentType: string
  paymentChannel: string
  paymentLink: string | null
  expiredAt: string | null
  accountName: string
  receipt: string
  note: string | null
  status: string
  createdAt: string
  updatedAt: string | null
  createdBy: string
  updatedBy: string
}
