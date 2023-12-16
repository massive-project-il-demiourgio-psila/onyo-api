import { autoInjectable, inject } from 'tsyringe'

import { Login } from '@/domains/entities/users/user-login.entity'
import PayloadUser from '@/domains/entities/auths/user-jwt-payload.entity'
import NewAuth from '@/domains/entities/auths/new-auth.entity'

import type { IAuthRepository } from '@/domains/repositories/auth.repository'
import type { IUserRepository } from '@/domains/repositories/user.repository'
import { TokenType, signToken } from '@/infrastructures/security/jwt-manager'
import DiTokens from '@/infrastructures/di-tokens'
import type PasswordHash from '@/applications/security/password-hash'

@autoInjectable()
class LoginUserUseCase {
  private userRepository: IUserRepository

  private authRepository: IAuthRepository

  private passwordHash: PasswordHash

  constructor(
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
    @inject(DiTokens.AuthRepository) authRepository: IAuthRepository,
    @inject(DiTokens.PasswordHash) passwordHash: PasswordHash,
  ) {
    this.userRepository = userRepository
    this.authRepository = authRepository
    this.passwordHash = passwordHash
  }

  async execute(payload: Login) {
    const hashedPwd = await this.userRepository.getPasswordByEmail(payload.email)

    await this.passwordHash.comparePassword(hashedPwd, payload.password)

    const user = await this.userRepository.getUserByEmail(payload.email)
    const role = await this.userRepository.getUserRoleByUserId(user.id)

    const jwtPayload: PayloadUser = {
      role,
      email: user.email,
    }

    const authTokens: NewAuth = {
      accessToken: signToken(jwtPayload, user.id, TokenType.Access),
      refreshToken: signToken(jwtPayload, user.id, TokenType.Refresh),
    }

    await this.authRepository.addToken(authTokens.refreshToken)

    return authTokens
  }
}

export default LoginUserUseCase
