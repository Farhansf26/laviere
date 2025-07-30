"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import CellStatus from "./StatusAction"

export type OrdersColumn = {
  id: string
  order_id: string
  user_name?: string | null
  phoneNumber: string
  address: string
  createdAt: string
  status: string
}

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "order_id",
    header: "ID",
  },
  {
    accessorKey: "user_name",
    header: "Username",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex items-center justify-center">
      <CellStatus data={row.original}/>
    </div>
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]