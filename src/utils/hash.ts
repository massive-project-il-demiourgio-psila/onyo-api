import crypto from 'node:crypto'

/* eslint-disable import/prefer-default-export */
export function hashFilename(filename: string) {
  return crypto.createHash('sha1').update(filename).digest('hex')
}
