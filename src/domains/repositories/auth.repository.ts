export interface IAuthRepository {
  addToken(token: string): Promise<boolean>
  checkTokenAvailability(token: string): Promise<void>
  deleteToken(token: string): Promise<boolean>
}
