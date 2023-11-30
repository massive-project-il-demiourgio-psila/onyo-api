import { Router } from 'express'
import { DependencyContainer } from 'tsyringe'
import HelloHandler from './hello/handler'
import helloRouter from './hello/routes'

const apiRouter = (container: DependencyContainer) => {
  const router = Router()
  const helloHandler = new HelloHandler(container)

  router.use(helloRouter(helloHandler))

  return router
}
export default apiRouter