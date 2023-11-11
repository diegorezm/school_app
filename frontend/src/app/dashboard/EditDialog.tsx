import * as z from 'zod'
import { useToast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Student } from "@/interface/Student";
import { deleteStudent, editStudent } from '@/actions/actions'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Student name cannot be empty!"
  }).max(30, {
    message: "The student name is too long."
  }),
  email: z.string().min(10, {
    message: "The email is too short..."
  }).email(),
  age: z.string().min(1, {
    message: "The student age cannot be empty!"
  }),
  course: z.string().min(1, {
    message: "The student course cannot be empty!"
  })
})

interface props {
  student: Student 
  setOpen: () => void,
  fetchStudents: () => void
}

export function EditDialog({ student ,setOpen, fetchStudents}: props) {
  const { name, age, course, email, id } = student;
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      name: name,
      age: age,
      course: course
    }
  })

  useEffect(() => {
    form.reset({
      email,
      name,
      age,
      course,
    });
  }, [email, name, age, course]);


  const courses = [
    "Computer Science",
    "Electrical Engineering",
    "Psychology",
    "Business Administration",
    "Mechanical Engineering",
    "English Literature",
    "Chemistry",
    "Mathematics",
    "Physics",
    "Art History",
  ]

  const handleCourseChange = (value: string) => {
    form.setValue("course", value)

  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const student: Student = {
      id: id,
      name: values.name,
      email: values.email,
      course: values.course,
      age: values.age
    }
    const request = await editStudent(student)
    if (request.success) {
      console.log(student)
      toast({
        title: "Success!",
        description: request.message
      })
      fetchStudents()
    } else {
      toast({
        title: "Failed!",
        description: request.message,
        variant: "destructive"
      })
    }
    setOpen()
  }
  const handleDelete = async () => {
    if (id) {
      const response = await deleteStudent(id)
      if (response.success) {
        console.log("sucess")
        toast({
          title: "Success!",
          description: response.message
        })
      fetchStudents()
      } else {
        console.log("falhou")
        toast({
          title: "Failed!",
          description: response.message,
          variant: "destructive"
        })
      }
    }
    setOpen()
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit student</DialogTitle>
          <DialogDescription>
            Edit this student record
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student name..." {...field} />
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
                    <Input placeholder="Student email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
              }
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Student age..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
              }
            />

            <div className='w-full flex justify-start'>
              <Select onValueChange={(value) => handleCourseChange(value)}>
                <SelectTrigger className=' w-full'>
                  <SelectValue placeholder={course} />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course, index) => (
                    <SelectItem key={index} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex w-full gap-2 justify-between'>
              <Button variant={"outline"} className='w-full' type="submit">Save</Button>
              <Button onClick={handleDelete} className='w-full' type="button">Delete</Button>
            </div>
          </form>
        </Form>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
