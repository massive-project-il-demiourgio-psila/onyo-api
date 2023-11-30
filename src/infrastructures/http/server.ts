import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compress from 'compression'
import passport from 'passport'

import jwtStrategy from '@/infrastructures/http/middlewares/jwt-strategy'
import rateLimiter from '@/infrastructures/http/middlewares/rate-limiter'
import errorHandler from '@/infrastructures/http/middlewares/error-handler'
import { apiV1Router } from '@/presentations/api'
import { DependencyContainer } from 'tsyringe'
import { httpLogger } from '@/libs/logger'

const createServer = async (container: DependencyContainer) => {
  const express = Express()

  express.use(httpLogger)
  express.use(rateLimiter)
  express.use(cors())
  express.use(helmet())
  express.use(compress())

  express.use(bodyParser.json())
  express.use(bodyParser.urlencoded({ extended: true }))

  express.use(passport.initialize())
  passport.use(jwtStrategy())

  express.use('/api/v1', apiV1Router(container))

  express.get('/ping', async (_req, res) => {
    res.send('Hello World')
  })

  express.use(errorHandler)

  return express
}

export default createServer
