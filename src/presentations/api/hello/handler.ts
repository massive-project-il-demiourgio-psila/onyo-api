import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import GetHelloUseCase from '@/applications/use-cases/hello-use-case'

export default class HelloHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  getHello = async (req: Request, res: Response) => {
    const hello = this.container.resolve(GetHelloUseCase)
    res.json(await hello.execute())
  }
}
