import { Router } from 'express'
import { DependencyContainer } from 'tsyringe'
import HelloHandler from './hello.handler'
import helloRouter from './hello.routes'

// eslint-disable-next-line import/prefer-default-export
export const apiV1Router = (container: DependencyContainer) => {
  const router = Router()
  const helloHandler = new HelloHandler(container)

  router.use(helloRouter(helloHandler))

  return router
}
