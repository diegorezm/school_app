"use server"
import { cookies } from 'next/headers'

const cookieStore = cookies()

export default async function setToken(token: string) {
  cookieStore.set("token", token)
}
export async function getToken() {
  const token = cookieStore.get("token")
  console.log(token)
  return token ? `Bearer ${token}` : '';
}

export async function deleteToken(){
  cookieStore.delete("token")
}
