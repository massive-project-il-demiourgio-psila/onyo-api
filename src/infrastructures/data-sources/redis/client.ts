import { createClient } from 'redis'
import logger from '@/libs/logger'
import env from '@/utils/config'

const { host, port, user, password, db } = env.redis

const url = `redis://${user}:${password}@${host}:${port}/${db}`

const client = await createClient({ url })
  .on('error', (err) => logger.error('Redis Client Error::', err))
  .connect()

export { client as default, client as redis, client }
