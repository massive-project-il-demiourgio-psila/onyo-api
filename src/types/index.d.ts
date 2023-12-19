export {}

declare global {
  namespace Express {
    interface User {
      role: string
      email: string
      iat: number
      exp: number
      aud: string
      iss: string
      sub: string
    }
    export interface Request {
      user?: User | undefined
    }
  }
}
