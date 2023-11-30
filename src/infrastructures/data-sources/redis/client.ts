import { createClient } from 'redis'
import logger from '@/libs/logger'
import env from '@/utils/config'

const client = await createClient({
  url: env.redis.url,
})
  .on('error', (err) => logger.error('Redis Client Error::', err))
  .connect()

export { client as default, client as redis, client }
