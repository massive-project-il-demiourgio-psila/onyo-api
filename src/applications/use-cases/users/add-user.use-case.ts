import type IPasswordHash from '@/applications/security/password-hash'
import RegisterUser from '@/domains/entities/users/register-user.entity'
import { type IPermissionRepository } from '@/domains/repositories/permission.repository'
import { type IRoleRepository } from '@/domains/repositories/role.repository'
import { type IUserRepository } from '@/domains/repositories/user.repository'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
class AddUserUseCase {
  private userRepository: IUserRepository

  private roleRepository: IRoleRepository

  private permissionRepo: IPermissionRepository

  private passwordHash: IPasswordHash

  constructor(
    @inject(DiTokens.UserRepository) userRepository: IUserRepository,
    @inject(DiTokens.RoleRepository) roleRepository: IRoleRepository,
    @inject(DiTokens.PermissionRepository) permissionRepo: IPermissionRepository,
    @inject(DiTokens.PasswordHash) passwordHash: IPasswordHash,
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
    this.permissionRepo = permissionRepo
    this.passwordHash = passwordHash
  }

  async execute(payload: never, by: string | null) {
    // TODO: If created by another admin can have non-regular user role
    let createdBy

    if (by !== null) {
      createdBy = await this.userRepository.getUserById(by)
    }

    const registerUser = new RegisterUser(payload)
    // await this.userRepository.checkAvailableEmail(payload.email)
    // await this.userRepository.checkAvailablePhone(payload.phone)

    registerUser.password = await this.passwordHash.hash(registerUser.password)

    // TODO: verifyEmail or verifyPhone

    return registerUser
  }
}

export default AddUserUseCase
