import 'core-js'
import 'reflect-metadata'
import { AddressInfo } from 'net'

import env from '@/utils/config'
import { logger } from '@/libs/logger'
import createServer from '@/infrastructures/http/server'
import initContainerRegistry from '@/infrastructures/di'
;

(async () => {
  const app = await createServer(initContainerRegistry())
  const server = app.listen(env.app.port, env.app.host, () => {
    const info = server.address() as AddressInfo
    logger.info(`Http server running on ${info.address}:${info.port}`)
  })
})()
