import { Router } from 'express'
import authJwt from '@/infrastructures/http/middlewares/passport-jwt'
import type UserHandler from './user.handler'

const userRouter = (handler: UserHandler) => {
  const router = Router()

  router.post('/register', handler.postAddUser)
  router.get('/me', authJwt, handler.getMyProfile)

  return router
}

export default userRouter
