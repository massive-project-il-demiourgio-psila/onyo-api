import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import LoginUserUseCase from '@/applications/use-cases/auth/login.use-case'
import LogoutUserUseCase from '@/applications/use-cases/auth/logout.use-case'

class AuthHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  postUserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const loginUseCase = this.container.resolve(LoginUserUseCase)
    const authTokens = await loginUseCase.execute({ email, password })

    res.json(authTokens)
  }

  postUserLogout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    const { sub: id } = req.user! as any

    const logoutUseCase = this.container.resolve(LogoutUserUseCase)
    await logoutUseCase.execute(refreshToken, id)

    res.json({ message: 'Token revoked' })
  }
}

export default AuthHandler
