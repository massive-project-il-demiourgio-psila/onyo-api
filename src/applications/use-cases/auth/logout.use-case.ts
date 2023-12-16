import AuthorizationError from '@/commons/exceptions/authorization.error'
import { type IAuthRepository } from '@/domains/repositories/auth.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { decodeToken } from '@/infrastructures/security/jwt-manager'
import { Jwt } from 'jsonwebtoken'
import { autoInjectable, inject } from 'tsyringe'

@autoInjectable()
class LogoutUserUseCase {
  private authRepository: IAuthRepository

  constructor(@inject(DiTokens.AuthRepository) authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  async execute(refreshToken: string, userId: string) {
    const availableToken = await this.authRepository.getToken(refreshToken)

    const { payload } = decodeToken(availableToken) as Jwt

    if (payload.sub !== userId) {
      throw new AuthorizationError()
    }

    await this.authRepository.deleteToken(refreshToken)
  }
}

export default LogoutUserUseCase
