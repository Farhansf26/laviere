"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { OrdersColumn } from "./columns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Status = "PENDING" | "PAID" | "SHIPPED" | 'COMPLETED' | 'CANCELED';

interface StatusActionProps {
  data: OrdersColumn;
}

export default function StatusAction({ data }: StatusActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleStatusChange = async (value: Status) => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/orders/${data.id}`, { status: value })
      toast.success('Status updated!')
    } catch (error: unknown) {
      toast.error('Failed to update status!')
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <Select
      disabled={isLoading}
      defaultValue={data.status}
      onValueChange={(value: Status) => handleStatusChange(value)}
      value={data.status}
    >
      <SelectTrigger className={cn(
        'min-w-[170px]',
        data.status === 'PAID' ? 'bg-dark-green !text-white' :
        data.status === 'CANCELED' ? 'bg-red-600 !text-white' :
        data.status === 'PENDING' ? 'bg-neutral-200' :
        data.status === 'SHIPPED' ? 'bg-light-brown' :
        data.status === 'COMPLETED' && 'bg-black text-white'
      )}>
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="PENDING"
          className="bg-neutral-200 focus:bg-neutral-200/90 transition-colors"
        >
          Pending
        </SelectItem>
        <SelectItem
          value="PAID"
          className="bg-green-700 my-1.5 focus:bg-green-700/90 !text-white transition-colors"
        >
          Diproses
        </SelectItem>
        <SelectItem
          value="CANCELED"
          className="bg-red-600 focus:bg-red-600/90 !text-white transition-colors"
        >
          Dicancel
        </SelectItem>
        <SelectItem
          value="SHIPPED"
          className="bg-light-brown my-1.5 focus:bg-yellow-400 !text-black transition-colors"
        >
          Dalam Perjalanan
        </SelectItem>
        <SelectItem
          value="COMPLETED"
          className="bg-black focus:bg-gray-950 !text-white transition-colors"
        >
          Pesanan Selesai
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
