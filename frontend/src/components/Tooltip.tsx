import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface props {
  title: string;
  className?:string;
  children: ReactNode
}

export default function Tooltip({ title, children , className}: props) {
  return (
    <div className="group flex relative">
      <span 
      className=
      {cn(className,"absolute bg-accent text-foreground  px-1 py-0.5 rounded-md left-1/2 -translate-x-1/2 -top-full transition-all opacity-0 group-hover:opacity-100 z-10 w-fit text-center")}
      >
      {title}
      </span>
      {children}
    </div>
  )
}
