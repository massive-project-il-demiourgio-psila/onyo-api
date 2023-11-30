import jwt, { SignOptions } from 'jsonwebtoken'
import env from '@/utils/config'

const { iss, aud, accessTokenSecret, accessTokenAge } = env.jwt

const jwtSignOptions: SignOptions = {
  issuer: iss,
  audience: aud,
}

export const signToken = (payload: string | object | Buffer, sub: string) =>
  jwt.sign(payload, accessTokenSecret, {
    ...jwtSignOptions,
    subject: sub,
    algorithm: 'HS256',
    expiresIn: accessTokenAge, // the `exp` claim
  })

export const decodeToken = (token: string) => jwt.decode(token, { complete: true })

export const verifyToken = (token: string) =>
  jwt.verify(token, accessTokenSecret, {
    audience: aud,
    issuer: iss,
    maxAge: accessTokenAge, // verify the timespan between `iat` claim
    complete: true,
  })
