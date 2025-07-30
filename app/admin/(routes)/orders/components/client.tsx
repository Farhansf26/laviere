'use client'

import Heading from "@/components/ui/heading"
import { columns, OrdersColumn } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrdersClientProps {
  data: OrdersColumn[]
}

export default function OrdersClient({ data }: OrdersClientProps) {
  return (
    <div className="pt-5 px-8 space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Orders"
          description="Manage your customer orders"
        />
      </div>
      <DataTable columns={columns} data={data} searchKey="order_id"/>
    </div>
  )
}
