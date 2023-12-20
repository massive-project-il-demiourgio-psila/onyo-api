import type FileStorage from '@/applications/storage/file-storage'
import { AddInvoice, addInvoiceSchema } from '@/domains/entities/bookings/add-invoice.entity'
import type { IBookingRepository } from '@/domains/repositories/booking.repository'
import type { IUserRepository } from '@/domains/repositories/user.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'
import mime from 'mime'
import { hashFilename } from '@/utils/hash'
import { Paths } from '@/commons/constants'

type FileUpload = {
  buffer: Buffer
  mimetype: string
}

@injectable()
class AddInvoiceUseCase {
  private bookingRepository: IBookingRepository

  private userRepository: IUserRepository

  private fileStorage: FileStorage

  constructor(
    @inject(DiTokens.BookingRepository) bookingRepository: IBookingRepository,
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
    @inject(DiTokens.FileStorage) fileStorage: FileStorage,
  ) {
    this.bookingRepository = bookingRepository
    this.userRepository = userRepository
    this.fileStorage = fileStorage
  }

  async execute(payload: AddInvoice, { buffer, mimetype }: FileUpload) {
    addInvoiceSchema.parse(payload)

    const { accountName, bookingId, userId } = payload

    const user = await this.userRepository.getUserById(userId)
    const booking = await this.bookingRepository.getBookingById(bookingId)

    const fileHashName = `${user.id}.${booking}`
    const fileName = `${hashFilename(fileHashName)}.${mime.getExtension(mimetype)}`

    await this.fileStorage.upload(buffer, fileName, Paths.PaymentProof)

    await this.bookingRepository.addInvoice({ accountName, amount: booking.amount, receipt: fileName })
  }
}

export default AddInvoiceUseCase
