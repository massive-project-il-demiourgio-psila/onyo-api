import { Response, Request } from 'express'
import { DependencyContainer } from 'tsyringe'
import AddUserUseCase from '@/applications/use-cases/users/add-user.use-case'
import GetSingleUserUseCase from '../../../applications/use-cases/users/get-user.use-case'

class UserHandler {
  private container: DependencyContainer

  constructor(container: DependencyContainer) {
    this.container = container
  }

  postAddUser = async (req: Request, res: Response) => {
    // const { id } = req.user

    const addUserUseCase = this.container.resolve(AddUserUseCase)
    // const registeredUser = await addUserUseCase.execute(req.body, id)

    // res.json(registeredUser)
  }

  getMyProfile = async (req: Request, res: Response) => {
    const getSingleUserUseCase = this.container.resolve(GetSingleUserUseCase)
    const user = await getSingleUserUseCase.execute(req.user?.sub)

    res.json(user)
  }
}

export default UserHandler
