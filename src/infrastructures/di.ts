import { container } from 'tsyringe'
import HelloWorldRepository from '@/infrastructures/repositories/hello-world.impl.repository'
import db from '@/infrastructures/data-sources/mysql/drizzle-mysql-pool'
import { redis } from '@/infrastructures/data-sources/redis/client'

export default function initContainerRegistry() {
  container.register('drizzle', { useValue: db })
  container.register('redis', { useValue: redis })
  container.register('IHelloWorldRepository', { useClass: HelloWorldRepository })

  return container
}
