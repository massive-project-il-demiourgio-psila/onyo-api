export type CreateUser = {
  id: string
  fullName: string
  email: string
  password: string
  phone: string
  dob: string | Date
  gender: string
  roleId?: string
  permissionIds?: string[]
}

class RegisterUser {
  public id: string

  public fullName: string

  public email?: string

  public password: string

  public phoneNumber?: string

  public dob: Date

  public gender: string

  constructor(payload: CreateUser) {
    const { id, fullName, email, password, phone, dob, gender } = payload

    this.id = id
    this.fullName = fullName
    this.email = email
    this.password = password
    this.phoneNumber = phone
    this.dob = typeof dob === 'string' ? new Date(dob) : dob
    this.gender = gender
  }
}

export default RegisterUser
