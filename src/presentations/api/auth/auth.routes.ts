import { Router } from 'express'
import authJwt from '@/infrastructures/http/middlewares/passport-jwt'
import type AuthHandler from './auth.handler'

const authRouter = (handler: AuthHandler) => {
  const router = Router()

  router.post('/login', handler.postUserLogin)
  router.post('/logout', authJwt, handler.postUserLogout)
  //   router.post('/token/refresh', handler.postUserLogout)

  return router
}

export default authRouter
