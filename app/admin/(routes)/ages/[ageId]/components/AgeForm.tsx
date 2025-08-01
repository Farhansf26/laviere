'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Age } from "@/lib/generated/prisma"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import AlertModal from "@/components/modals/AlertModal"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  name: z.string().min(1),
})

interface AgeFormProps {
  data?: Age | null
}

export default function AgeForm({ data }: AgeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const params = useParams()

  const title = data ? 'Update Age' : 'Create Age'
  const description = data ? 'update or delete age' : 'create a new age'
  const action = data ? 'Save Changes' : 'Submit'
  const toastMessage = data ? 'Age updated' : 'Age created'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
    
      if(data) {
        await axios.patch(`/api/ages/${params?.ageId}`, values)
      } else {
        await axios.post('/api/ages', values)
      }

      router.push('/admin/ages')
      toast.success(toastMessage)
    } catch (error: unknown) {
      toast.error('Failed to create/update age!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/ages/${data?.id}`)
      router.push('/admin/ages')
      toast.success('Age deleted.')
    } catch (error: unknown) {
      toast.error('Failed to delete age.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disabled={isLoading}
        onDelete={handleDelete}
      />
      <div className="flex flex-col space-y-4">
        <div>
          <Heading
            title={title}
            description={description}
          />
        </div>
        <Separator/>
        <div className="grid md:grid-cols-3 grid-cols-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="ex: Dewasa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end space-x-4">
                {data && (
                  <Button
                    type="button"
                    variant='destructive'
                    onClick={() => setIsOpen(true)}
                  >
                    Delete 
                    <Trash/>
                  </Button>
                )}
                <Button type="submit" disabled={isLoading}>{action}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
