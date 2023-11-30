import IHelloWorldRepository from '@/domains/repositories/hello-world.repository'
import { singleton } from 'tsyringe'
import { sql } from 'drizzle-orm'
import Repository from './repository'

@singleton()
class HelloWorldRepository extends Repository implements IHelloWorldRepository {
  async getHelloWorld(): Promise<string> {
    await this.redis?.setEx('hello', 3, 'Hello World')
    const helloRedis = await this.redis!.get('hello')
    const [rows] = await this.drizzle!.execute(sql`SELECT "Hello World"`)
    return (rows as never)[0]['Hello World'] === helloRedis ? 'Hello World' : 'Redis or MySQL is not working properly'
  }
}

export default HelloWorldRepository
