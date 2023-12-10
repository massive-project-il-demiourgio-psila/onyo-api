import { Router } from 'express'
import { DependencyContainer } from 'tsyringe'
import HelloHandler from './hello.handler'
import helloRouter from './hello.routes'
import AuthHandler from './auth/auth.handler'
import authRouter from './auth/auth.routes'
import userRouter from './user/user.routes'
import UserHandler from './user/user.handler'

// eslint-disable-next-line import/prefer-default-export
export const apiV1Router = (container: DependencyContainer) => {
  const router = Router()
  const helloHandler = new HelloHandler(container)
  const authHandler = new AuthHandler(container)
  const userHandler = new UserHandler(container)

  router.use(helloRouter(helloHandler))
  router.use('/auth', authRouter(authHandler))
  router.use('/users', userRouter(userHandler))

  return router
}
