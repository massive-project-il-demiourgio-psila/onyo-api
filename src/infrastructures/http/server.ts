import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compress from 'compression'

import passport from 'passport'

import jwtStrategy from '@/infrastructures/security/jwt-strategy'
import rateLimiterMiddleware from '@/infrastructures/http/middlewares/rate-limiter'
import apiRouter from '@/presentations/api'
import { DependencyContainer } from 'tsyringe'
import { httpLogger } from '@/libs/logger'

const createServer = async (container: DependencyContainer) => {
  const express = Express()

  express.use(httpLogger)
  express.use(rateLimiterMiddleware)
  express.use(cors())
  express.use(helmet())
  express.use(compress())

  express.use(bodyParser.json())
  express.use(bodyParser.urlencoded({ extended: true }))

  express.use(passport.initialize())
  passport.use(jwtStrategy())

  express.use('/api', apiRouter(container))

  express.get('/ping', async (req, res) => {
    res.send('Hello World')
  })

  return express
}

export default createServer
