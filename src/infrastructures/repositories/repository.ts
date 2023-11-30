import { autoInjectable, inject } from 'tsyringe'
import type { MySqlDrizzleSchema } from '@/infrastructures/data-sources/mysql'
import type { RedisClientType } from 'redis'

@autoInjectable()
class Repository {
  protected drizzle?: MySqlDrizzleSchema

  protected redis?: RedisClientType

  constructor(@inject('drizzle') drizzle?: MySqlDrizzleSchema, @inject('redis') redis?: RedisClientType) {
    if (this.constructor.name === Repository.name || this.constructor.name === '') {
      throw new Error('class should not be instantiated')
    }

    this.drizzle = drizzle
    this.redis = redis
  }
}

export default Repository
