import jwt, { SignOptions } from 'jsonwebtoken'
import env from '@/utils/config'

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
}

const { iss, aud, accessTokenSecret, accessTokenAge, refreshTokenSecret } = env.jwt

const jwtSignOptions: SignOptions = {
  issuer: iss,
  audience: aud,
}

export const signToken = (payload: string | object | Buffer, sub: string, type: TokenType) =>
  jwt.sign(payload, type === TokenType.Access ? accessTokenSecret : refreshTokenSecret, {
    ...jwtSignOptions,
    subject: sub,
    algorithm: 'HS256',
    expiresIn: type === TokenType.Access ? accessTokenAge : '7d', // the `exp` claim
  })

export const decodeToken = (token: string) => jwt.decode(token, { complete: true })

export const verifyToken = (token: string) =>
  jwt.verify(token, refreshTokenSecret, {
    audience: aud,
    issuer: iss,
    // maxAge: '24h', // verify the timespan between `iat` claim
    complete: true,
  })
