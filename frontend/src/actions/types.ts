import { Student } from "@/interface/Student"
import { User } from "@/interface/User"

export type Response = {
  message: string,
  success: boolean,
  user?: User,
  token?: string,
  students?: Student[]
  student?: Student
}

export type Login = (email: string, password: string) => Promise<Response>

export type Register = (user: User) => Promise<Response>

export type userData = () => Promise<Response>

// students
export type GetStudents = () => Promise<Response>
export type PostStudents = (Payload: Student) => Promise<Response>
export type DeleteStudents = (id: string) => Promise<Response>
