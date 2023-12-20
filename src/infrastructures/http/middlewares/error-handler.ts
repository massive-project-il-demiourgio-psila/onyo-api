import ClientError from '@/commons/exceptions/client.error'
import logger from '@/libs/logger'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = async (err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      errors: err.errors,
    })
  }

  logger.error(`${err.name}:: ${err.message}\n${err.stack}`)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}

export default errorHandler
