interface IPasswordHash {
  hash(password: string): Promise<string>
  comparePassword(hashed: string, password: string): Promise<void>
}

export default IPasswordHash
