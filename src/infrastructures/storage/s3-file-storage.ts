/* eslint-disable class-methods-use-this */
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { injectable, singleton } from 'tsyringe'
import env from '@/utils/config'
import FileStorage from '@/applications/storage/file-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const { region, bucket: Bucket, accessKey: accessKeyId, secretKey: secretAccessKey } = env.aws

@singleton()
@injectable()
class S3FileStorage implements FileStorage {
  private s3Client

  constructor() {
    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  async upload(buffer: Buffer, fileName: string, path: string = '') {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket,
        Body: buffer,
        Key: S3FileStorage.getFullPath(fileName, path),
      }),
    )
  }

  getUrl(fileName: string, path: string): string {
    return `https://${Bucket}.s3.${region}.amazonaws.com/${S3FileStorage.getFullPath(fileName, path)}`
  }

  async getPresignedUrl(fileName: string, path: string): Promise<string> {
    const url = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand({ Bucket, Key: S3FileStorage.getFullPath(fileName, path) }),
      { expiresIn: 3600 },
    )

    return url
  }

  async checkFileExist(fileName: string, path: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async deleteObject(fileName: string, path: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  private static getFullPath = (fileName: string, path: string = '') => (path === '' ? fileName : `${path}/${fileName}`)
}

export default S3FileStorage
