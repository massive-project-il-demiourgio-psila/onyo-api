import * as argon2 from 'argon2'

export const hash = async (password: string) => argon2.hash(password)

export const comparePassword = async (hashedPassword: string, password: string) =>
  argon2.verify(hashedPassword, password)
