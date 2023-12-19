import { type IUserRepository } from '@/domains/repositories/user.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetSingleUserUseCase {
  private userRepository: IUserRepository

  constructor(@inject(DiTokens.UserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(id: string) {
    const user = await this.userRepository.getUserWithProfileByUserId(id)

    return user
  }
}

export default GetSingleUserUseCase
