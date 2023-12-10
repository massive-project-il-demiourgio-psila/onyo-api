export interface IRoleRepository {
  addRole(): Promise<void>
  getRole(): Promise<void>
  updateRoleById(id: string): Promise<void>
  deleteRoleById(id: string): Promise<void>
}
