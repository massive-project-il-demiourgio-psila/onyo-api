import { autoInjectable, inject } from 'tsyringe'

import { Login, loginSchema } from '@/domains/entities/users/user-login.entity'
import PayloadUser from '@/domains/entities/auths/user-jwt-payload.entity'
import NewAuth from '@/domains/entities/auths/new-auth.entity'

import type { IAuthRepository } from '@/domains/repositories/auth.repository'
import type { IUserRepository } from '@/domains/repositories/user.repository'
import { TokenType, signToken } from '@/infrastructures/security/jwt-manager'
import DiTokens from '@/infrastructures/di-tokens'
import type IPasswordHash from '@/applications/security/password-hash'

@autoInjectable()
class LoginUserUseCase {
  private userRepository: IUserRepository

  private authRepository: IAuthRepository

  private passwordHash: IPasswordHash

  constructor(
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
    @inject(DiTokens.AuthRepository) authRepository: IAuthRepository,
    @inject(DiTokens.PasswordHash) passwordHash: IPasswordHash,
  ) {
    this.userRepository = userRepository
    this.authRepository = authRepository
    this.passwordHash = passwordHash
  }

  async execute(payload: Login) {
    loginSchema.parse(payload)

    const { email, password } = payload

    const hashedPwd = await this.userRepository.getPasswordByEmail(email)

    await this.passwordHash.comparePassword(hashedPwd, password)

    const user = await this.userRepository.getUserByEmail(email)
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
