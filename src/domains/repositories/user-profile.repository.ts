export interface IUserProfileRepository {
  addUserProfile(address: string): Promise<void>
}
