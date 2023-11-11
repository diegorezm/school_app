"use client"
import Section from "@/components/Section";

import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'
import { register } from "@/actions/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User } from "@/interface/User";


const formSchema = z.object({
  email: z.string().email(
    { message: "This email is not a valid email." }
  ).min(10, {
    message: "Your email is too short..."
  }).max(50, {
    message: "Your email is too long..."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long."
  }).max(16, {
    message: "Password must not exceed 16 characters."
  }),
  username: z.string().min(4, {
    message: "Your username is toos short..."
  }).max(35, {
    message: "Your username is too long...."
  }),
  role: z.enum(["ADMIN", "USER"])
})


export default function Register() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      role: "USER"
    }
  })

  type role = "ADMIN" | "USER"

  const handleRoleChange = (value: role) => {
    form.setValue("role", value)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const user: User = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role
    }

    const { message, success } = await register(user)
    if (!success) {
      toast({
        title: "User register failed!",
        description: message,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Sucess!",
        description: message
      })
    }
    router.push("/login")
  }

  return (
    <Section title="Register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col space-y-8 w-full h-full p-6'>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username..." {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
            }
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
            }
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password..." {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
            }
          />

          <div className="w-full flex justify-center">
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="max-w-[15rem]">
                <SelectValue placeholder="User type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN" >Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className='max-w-md'>
            <Button variant={"outline"} type="submit">
              Register
            </Button>
          </div>
          <p>Already have an account? <Link className='text-primary hover:border-b hover:border-primary rounded-sm' href={"/login"}> click here to login!</Link></p>
        </form>

      </Form>


    </Section>
  )
}
