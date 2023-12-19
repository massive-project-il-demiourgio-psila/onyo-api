interface FileStorage {
  upload(buffer: Buffer, fileName: string, path: string): Promise<void>
  getUrl(fileName: string | null, path?: string): string | null
  getPresignedUrl(fileName: string, path?: string): Promise<string>
  checkFileExist(fileName: string, path: string): Promise<boolean>
  deleteObject(fileName: string, path: string): Promise<boolean>
}

export default FileStorage
