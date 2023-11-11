export interface User {
  id?: String
  username: String,
  email: String,
  password?: string,
  role: "ADMIN" | "USER",
  auth?:boolean
}
