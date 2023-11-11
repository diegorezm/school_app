"use client"
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'
import Section from '@/components/Section'
import { getUserData, login } from '@/actions/actions'
import { useStore } from 'zustand'
import { useAuthStore, rehydrate } from '@/state/useAuthStore'

const formSchema = z.object({
  email: z.string().email(
    { message: "This email is not a valid email." }
  ).min(10, {
    message: "Your email is too short..."
  }).max(50, {
    message: "Your email is too long..."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters long."
  }).max(20, {
    message: "Password must not exceed 16 characters."
  }),
})

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const setUser = useStore(useAuthStore, (state) => state.setUser)
  const setToken = useStore(useAuthStore, (state) => state.setToken)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values
    const { message, success, token } = await login(email, password)
    if (!success) {
      toast({
        title: "Login failed!",
        description: message,
        variant: "destructive"
      })
    } else {
      if (token) {
        console.log(token)
        setToken(token)
      }
      toast({
        title: "Sucess!",
        description: message
      })
    }

    const data = await getUserData()
    if (!data.success) {
      toast({
        title: "Failed to fetch user data...",
        description: data.message,
        variant: "destructive"
      })
    } else {
      router.push("/dashboard")
    }
    if (data.user != null) {
      setUser(data.user)
      rehydrate()
    }

  }

  return (
    <Section title='Login'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col space-y-8 w-3/5'>
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


          <div className='max-w-md'>
            <Button variant={"outline"} type="submit">
              Login
            </Button>
          </div>
          <p>Don&apos;t have an account yet? click <Link className='text-primary hover:border-b hover:border-primary rounded-sm' href={"/register"}> here to create one!</Link></p>
        </form>
      </Form>
    </Section>

  )
}
