"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductsColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/AlertModal";
import { deleteFiles } from "@/actions/deleteFiles";

interface CellActionProps {
  data: ProductsColumn;
}

export default function CellAction({ data }: CellActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Product id copied to clipboard");
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/products/${data?.id}`);
      toast.success("Product deleted.");
      router.refresh();
      await deleteFiles(data.images)
    } catch (error: unknown) {
      toast.error("Failed to delete product.");
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
          <DropdownMenuItem onSelect={handleCopy}>
            Copy ID
            <Copy className="ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.push(`/admin/products/${data.id}`)}
          >
            Update
            <Edit className="ml-auto" />
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
