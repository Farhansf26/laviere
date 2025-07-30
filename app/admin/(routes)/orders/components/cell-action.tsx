"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrdersColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/AlertModal";
import { FaEye } from "react-icons/fa";

interface CellActionProps {
  data: OrdersColumn;
}

export default function CellAction({ data }: CellActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/orders/${data?.id}`);
      toast.success("Order deleted.");
      router.refresh();
    } catch (error: unknown) {
      toast.error("Failed to delete order.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disabled={isLoading}
        onDelete={handleDelete}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() => router.push(`/admin/orders/${data.id}`)}
          >
            See Detail
            <FaEye className="ml-auto"/>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-red-500 text-white hover:!bg-red-400 hover:!text-white mt-1"
            onSelect={() => setIsOpen(true)}
          >
            Delete
            <Trash2 className="ml-auto" color="white" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
