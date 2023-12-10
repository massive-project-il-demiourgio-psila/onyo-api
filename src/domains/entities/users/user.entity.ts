type ExistingUser = {
  id: string
  fullName: string
  email: string
  phone: string
  dob: string | Date
  gender: string
}

class User {
  public id: string

  public fullName: string

  public email: string

  public phone: string

  public dob: Date

  public gender: string

  constructor(payload: ExistingUser) {
    const { id, fullName, email, phone, dob, gender } = payload

    this.id = id
    this.fullName = fullName
    this.email = email
    this.phone = phone
    this.dob = typeof dob === 'string' ? new Date(dob) : dob
    this.gender = gender
  }
}

export default User
