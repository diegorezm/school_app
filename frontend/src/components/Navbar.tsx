import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import dynamic from "next/dynamic";
export default function Navbar() {
  const NavlogNoSSR = dynamic(() => import('./Navlog'), {
  ssr: false
})
  return (
    <div className="min-w-screen  text-muted-foreground text-center">
      <nav className="flex justify-between p-2 md:p-4 lg:px-24 md:px-20">
        <div>
          <Link href={"/dashboard"} className="hover:text-secondary-foreground">
            Dashboard
          </Link>
        </div>
        <div className="flex gap-x-6 items-center">
          <NavlogNoSSR />
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}


