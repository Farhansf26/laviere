'use client'

import Heading from "@/components/ui/heading"
import { columns, CategoriesColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { useRouter } from "next/navigation"

interface CategoryClientProps {
  data: CategoriesColumn[]
}

export default function CategoriesClient({ data }: CategoryClientProps) {
  const router = useRouter()

  return (
    <div className="pt-5 px-8 space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manage your categories"
        />
        <Button
          type="button"
          variant='ghost'
          onClick={() => router.push('/admin/categories/new')}
        >
          Create New
          <PlusCircle/>
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name"/>
    </div>
  )
}
