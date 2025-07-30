'use client'

import Heading from "@/components/ui/heading"
import { columns, AgesColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { useRouter } from "next/navigation"

interface AgesClientProps {
  data: AgesColumn[]
}

export default function AgesClient({ data }: AgesClientProps) {
  const router = useRouter()

  return (
    <div className="pt-5 px-8 space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Ages"
          description="Manage for your products ages"
        />
        <Button
          type="button"
          variant='ghost'
          onClick={() => router.push('/admin/ages/new')}
        >
          Create New
          <PlusCircle/>
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name"/>
    </div>
  )
}
