import { IUserRepository } from '@/domains/repositories/user.repository'
import RegisterUser from '@/domains/entities/users/register-user.entity'
import { type RowDataPacket } from 'mysql2/promise'
import User from '@/domains/entities/users/user.entity'
import NotFoundError from '@/commons/exceptions/not-found.error'
import Repository from './repository'

interface UserInDB extends RowDataPacket {
  id: string
  fullName: string
  email: string
  password: string
  phone: string
  dob: Date
  emailVerifiedAt: Date
  phoneVerifiedAt: Date
  gender: string
  createdAt: Date
  updatedAt: Date
  createdBy: Date
  updatedBy: Date
  isDeleted: boolean
}

class UserRepository extends Repository implements IUserRepository {
  addUser(user: RegisterUser): Promise<User> {
    throw new Error('Method not implemented.')
  }

  checkAvailableEmail(email: string): Promise<boolean> {
    const sql = `SELECT email FROM users WHERE email = ? LIMIT 1`
    throw new Error('Method not implemented.')
  }

  async getPasswordByEmail(email: string): Promise<string> {
    const [users] = await this.pool.query<UserInDB[]>('SELECT password FROM users WHERE email = ? LIMIT 1', [email])

    if (users[0] == null) {
      throw new NotFoundError('User not found')
    }

    return users[0].password
  }

  getIdByEmail(email: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async getUserById(userId: string): Promise<User> {
    const [users] = await this.pool.query<UserInDB[]>('SELECT * FROM users WHERE id = ? LIMIT 1', [userId])

    if (users[0] == null) {
      throw new NotFoundError('User not found')
    }

    const { id, dob, email, fullName, gender, phone } = users[0]

    return new User({
      id,
      dob,
      email,
      fullName,
      gender,
      phone,
    })
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    const [users] = await this.pool.query<UserInDB[]>('SELECT * FROM users WHERE email = ? LIMIT 1', [userEmail])

    if (users[0] == null) {
      throw new NotFoundError('User not found')
    }

    const { id, dob, email, fullName, gender, phone } = users[0]

    return new User({
      id,
      dob,
      email,
      fullName,
      gender,
      phone,
    })
  }

  async getUserRoleByUserId(id: string): Promise<string> {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      `SELECT
            roles.name
        FROM
            user_roles
            INNER JOIN
            users
            ON
                user_roles.user_id = users.id
            INNER JOIN
            roles
            ON
                user_roles.role_id = roles.id
        WHERE
            users.id = ?`,
      [id],
    )

    return rows[0]!.name
  }
}

export default UserRepository
