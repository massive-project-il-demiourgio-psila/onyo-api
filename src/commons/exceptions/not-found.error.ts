import ClientError from './client.error'

class NotFoundError extends ClientError {
  constructor(message: string = 'Not Found', statusCode = 404) {
    super(message, statusCode)

    this.name = NotFoundError.name
  }
}

export default NotFoundError
