import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import LoginUserUseCase from '@/applications/use-cases/auth/login.use-case'
import LogoutUserUseCase from '@/applications/use-cases/auth/logout.use-case'
import GetSingleUserUseCase from '@/applications/use-cases/users/get-user.use-case'
import { decodeToken } from '@/infrastructures/security/jwt-manager'
import { Jwt } from 'jsonwebtoken'

class AuthHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  postUserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const loginUseCase = this.container.resolve(LoginUserUseCase)
    const getUserUseCase = this.container.resolve(GetSingleUserUseCase)
    const authTokens = await loginUseCase.execute({ email, password })
    const decoded = (decodeToken(authTokens.accessToken) as Jwt).payload
    const user = await getUserUseCase.execute(decoded.sub! as string)

    res.json({ user: { ...user, role: decoded.role }, token: authTokens.accessToken })
  }

  postUserLogout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    const { sub: id } = req.user!

    const logoutUseCase = this.container.resolve(LogoutUserUseCase)
    await logoutUseCase.execute(refreshToken, id)

    res.json({ message: 'Token revoked' })
  }
}

export default AuthHandler
