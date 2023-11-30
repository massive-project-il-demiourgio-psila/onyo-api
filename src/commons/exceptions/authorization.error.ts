import ClientError from './client.error'

class AuthorizationError extends ClientError {
  constructor(message: string = 'Forbidden', statusCode = 403) {
    super(message, statusCode)

    this.name = AuthorizationError.name
  }
}

export default AuthorizationError
