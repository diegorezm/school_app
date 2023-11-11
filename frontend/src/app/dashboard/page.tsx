"use client"

import React, { useEffect, useState } from 'react'


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"

import Section from "@/components/Section"
import { Button } from "@/components/ui/button"
import { IoAddCircleOutline, IoPencilOutline } from 'react-icons/io5'
import { StudentsDialog } from './StudentsDialog'
import { EditDialog } from './EditDialog'
import Tooltip from '@/components/Tooltip'
import { getAllStudents } from '@/actions/actions'
import { Student } from '@/interface/Student'
import { useToast } from '@/components/ui/use-toast'

export default function Dashboard() {
  const itemsPerPage = 8;
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [arrayStudents, setArrayStudents] = useState<Student[]>([])
  const [editStudent, setEditStudent] = useState<Student | null>(null)
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const fetchStudents = async () => {
    const request = await getAllStudents()
    console.log(request)
    if (request.success) {
      if (request.students) {
        setArrayStudents([...request.students])
      }
    } else {
      toast({
        title: "Could not fetch student data!",
        description: request.message,
        variant: "destructive"
      })
    }

  }

  const handleOpenDialog = () => {
    setOpen(!open)
  }
  const handleOpenEditDialog = () => {
    setOpenEdit(!openEdit)
  }

  const handleEditDialog = (payload: Student) => {
    setEditStudent(payload);
  }

  const totalPages = Math.ceil(arrayStudents.length / itemsPerPage);

  const visibleEntries = arrayStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchStudents()
  }, [])
  return (
    <Section className='relative' title="Dashboard">
      <div className='absolute top-0 right-0 p-2'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <Tooltip title='Actions' className='my-6 text-sm'>
              <DropdownMenuTrigger className='text-gray-400 dark:text-gray-600 hover:text-foreground dark:hover:text-foreground'>
                <IoAddCircleOutline className="text-5xl" />
              </DropdownMenuTrigger>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuLabel className='text-center'>
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className='hover:cursor-pointer'>
                  <Button variant="ghost" className='max-h-5'>Add student</Button>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <StudentsDialog
            setOpen={handleOpenDialog}
            fetchStudents={fetchStudents}
          />
        </Dialog>
      </div>

      <Table>
        <TableCaption>All student records.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Age</TableHead>
            <TableHead className="text-right">Course</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <TableBody>
            {visibleEntries.map((student, i) => (
              <TableRow key={student.id} className='w-full'>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="text-right">{student.age}</TableCell>
                <TableCell className="text-right">{student.course}</TableCell>

                <TableCell className="text-right">
                  <Tooltip title='Edit' className='my-2 text-md'>
                    <DialogTrigger onClick={() => handleEditDialog(student)}>
                      <div className='border border-border w-8 h-8 flex justify-center items-center text-md lg:text-xl lg:h-10 lg:w-10 hover:bg-primary transition-all rounded-lg'>
                        <IoPencilOutline />
                      </div>
                    </DialogTrigger>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {
              editStudent &&
              <EditDialog
                student={editStudent}
                setOpen={handleOpenEditDialog}
                fetchStudents={fetchStudents}
              />
            }
          </TableBody>
        </Dialog>
      </Table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant={"ghost"}
              className={`mx-1 ${currentPage === index + 1 ? 'bg-muted' : ' border border-border'
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </Section>

  )
}

