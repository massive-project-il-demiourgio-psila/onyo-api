import 'core-js'
import 'reflect-metadata'
import { AddressInfo } from 'net'

import env from '@/utils/config'
import { logger } from '@/libs/logger'
import createServer from '@/infrastructures/http/server'
import initContainerRegistry from '@/infrastructures/di'

;

(async () => {
  const { port, host } = env.app
  const app = await createServer(initContainerRegistry())
  const server = app.listen(port, host, () => {
    const info = server.address() as AddressInfo
    logger.info(`Http server running on ${info.address}:${info.port}`)
  })

  process.on('SIGTERM', () => {
    logger.debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      logger.debug('HTTP server closed')
    })
  })
})()
