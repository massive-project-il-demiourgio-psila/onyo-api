export interface IAuthRepository {
  addToken(token: string): Promise<boolean>
  getToken(token: string): Promise<string>
  deleteToken(token: string): Promise<boolean>
}
