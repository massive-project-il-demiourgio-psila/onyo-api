import { Router } from 'express'
import HelloHandler from './handler'

const helloRouter = (handler: HelloHandler) => {
  const router = Router()

  router.get('/hello', handler.getHello)

  return router
}

export default helloRouter
