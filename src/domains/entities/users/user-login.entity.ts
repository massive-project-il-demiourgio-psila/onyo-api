export type Login = {
  email: string
  password: string
}

class UserLogin {
  public email: string

  public password: string

  constructor(payload: Login) {
    this.email = payload.email
    this.password = payload.password
  }
}

export default UserLogin
