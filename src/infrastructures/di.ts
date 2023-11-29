import { container } from "tsyringe"
import HelloWorldRepository from "./repositories/hello-world-repository-impl"
import { db } from "./data-sources/mysql"
import { redis } from "./data-sources/redis/client"

export function initContainerRegistry() {

    container.register('drizzle', { useValue: db })
    container.register('redis', { useValue: redis })
    container.register('IHelloWorldRepository', { useClass: HelloWorldRepository })

    return container
}
