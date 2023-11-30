import ClientError from './client.error'

class AuthenticationError extends ClientError {
  constructor(message: string = 'Unauthenticated', statusCode = 401) {
    super(message, statusCode)

    this.name = AuthenticationError.name
  }
}

export default AuthenticationError
