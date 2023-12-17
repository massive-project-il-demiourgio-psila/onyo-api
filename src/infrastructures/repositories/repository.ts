import { autoInjectable, inject } from 'tsyringe'
import type { MySqlDrizzleSchema } from '@/infrastructures/data-sources/mysql'
import type { RedisClientType } from 'redis'
import type { Pool } from 'mysql2/promise'
import DiTokens from '../di-tokens'

@autoInjectable()
class Repository {
  protected pool: Pool

  protected redis: RedisClientType

  protected idGenerator: () => string

  protected drizzle?: MySqlDrizzleSchema

  constructor(
    @inject(DiTokens.Pool) pool: Pool,
    @inject(DiTokens.Redis) redis: RedisClientType,
    @inject(DiTokens.IdGenerator) idGenerator: () => string,
    @inject(DiTokens.Drizzle) drizzle?: MySqlDrizzleSchema,
  ) {
    if (this.constructor.name === Repository.name || this.constructor.name === '') {
      throw new Error('class should not be instantiated')
    }

    this.pool = pool
    this.drizzle = drizzle
    this.redis = redis
    this.idGenerator = idGenerator
  }
}

export default Repository
