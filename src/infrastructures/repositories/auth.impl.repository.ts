import { IAuthRepository } from '@/domains/repositories/auth.repository'
import { RowDataPacket, type ResultSetHeader } from 'mysql2/promise'
import { singleton } from 'tsyringe'
import NotFoundError from '@/commons/exceptions/not-found.error'
import Repository from './repository'

@singleton()
class AuthRepository extends Repository implements IAuthRepository {
  async addToken(token: string): Promise<boolean> {
    const [inserted] = await this.pool.execute<ResultSetHeader>('INSERT INTO auth_tokens(token) VALUES (?)', [token])

    return !!inserted.affectedRows
  }

  async checkTokenAvailability(token: string): Promise<void> {
    const sql = `SELECT token FROM auth_tokens WHERE token = ? LIMIT 1`
    const [rows] = await this.pool.execute<RowDataPacket[]>(sql, [token])

    if (rows[0] == null) {
      throw new NotFoundError('Token not found')
    }
  }

  async deleteToken(token: string): Promise<boolean> {
    const sql = `DELETE FROM auth_tokens WHERE token = ?`

    const [deleted] = await this.pool.execute<ResultSetHeader>(sql, [token])

    return !!deleted.affectedRows
  }
}

export default AuthRepository
