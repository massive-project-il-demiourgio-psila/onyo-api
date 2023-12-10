export interface IPermissionRepository {
  addPermission(): Promise<void>
  getPermission(): Promise<void>
  updatePermissionById(id: string): Promise<void>
  deletePermissionById(id: string): Promise<void>
}
