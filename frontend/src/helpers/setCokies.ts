"use server"

import { cookies } from 'next/headers'

export default async function setCookies(state: string) {
  const cookieStore = cookies()
  if (cookieStore.has("auth")) {
    cookieStore.delete("auth")
  }
  cookieStore.set("auth", state)
}
