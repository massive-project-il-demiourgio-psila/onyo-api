import RegisterUser from '../entities/users/register-user.entity'
import User from '../entities/users/user.entity'

export interface IUserRepository {
  addUser(user: RegisterUser): Promise<User>
  checkAvailableEmail(email: string): Promise<boolean>
  getPasswordByEmail(email: string): Promise<string>
  getIdByEmail(email: string): Promise<string>
  getUserById(id: string): Promise<User>
  getUserByEmail(email: string): Promise<User>
  getUserRoleByUserId(id: string): Promise<string>
}
