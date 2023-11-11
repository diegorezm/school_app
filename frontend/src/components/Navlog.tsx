"use client"

import Link from "next/link";
import { useAuthStore, rehydrate } from "@/state/useAuthStore";
import setCookies from "@/helpers/setCokies";

export default function Navlog() {
  const { user, reset } = useAuthStore()

  const handleLogoutClick = () => {
    reset()
    setCookies("false")
    rehydrate()
  }
  return (
    <Link href={"/login"}>
      {user.auth ? <span onClick={handleLogoutClick}>Logout</span> : "Login"}
    </Link>

  )
}
