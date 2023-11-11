import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface props {
  title?: string;
  className?: string;
  children: ReactNode
}

export default function Section({ title, children , className}: props) {
  return (
    <section className={cn(className, 'container rounded-lg flex flex-col items-center border border-border w-2/3 py-10 max-h-full lg:py-28 text-xl lg:max-h-1/2 lg:mb-2 ')}>
      {
        title !== null &&
        < div className='text-3xl font-semibold'>
          <h1>{title}</h1>
        </div>

      }
      {children}
    </section >
  )
}
