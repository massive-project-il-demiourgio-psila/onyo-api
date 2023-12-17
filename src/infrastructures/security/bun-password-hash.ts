import IPasswordHash from '@/applications/security/password-hash'
import AuthenticationError from '@/commons/exceptions/authentication.error'
import { singleton } from 'tsyringe'

@singleton()
class BunPasswordHash implements IPasswordHash {
  async hash(password: string): Promise<string> {
    return Bun.password.hash(password)
  }

  async comparePassword(hashed: string, password: string): Promise<void> {
    const result = await Bun.password.verify(password, hashed)

    if (!result) {
      throw new AuthenticationError("Credential doesn't match")
    }
  }
}

export default BunPasswordHash
