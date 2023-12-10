import { type IAuthRepository } from '@/domains/repositories/auth.repository'

class LogoutUserUseCase {
  private authRepository: IAuthRepository

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  async execute(refreshToken: string) {
    await this.authRepository.checkTokenAvailability(refreshToken)
    await this.authRepository.deleteToken(refreshToken)
  }
}

export default LogoutUserUseCase
