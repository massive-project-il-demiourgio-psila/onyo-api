import IPasswordHash from '@/applications/security/password-hash'
import AuthenticationError from '@/commons/exceptions/authentication.error'
import * as argon2 from 'argon2'
import { singleton } from 'tsyringe'

@singleton()
class Argon2PasswordHash implements IPasswordHash {
  async hash(password: string): Promise<string> {
    return argon2.hash(password)
  }

  async comparePassword(hashed: string, password: string): Promise<void> {
    const result = await argon2.verify(hashed, password)

    if (!result) {
      throw new AuthenticationError("Credential doesn't match")
    }
  }
}

export default Argon2PasswordHash
