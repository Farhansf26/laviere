"use client";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { columns, ProductsColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductsClientProps {
  data: ProductsColumn[];
}

export default function ProductsClient({ data }: ProductsClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <div className="pt-5 px-8 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Products" description="Manage your products" />
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/products/new")}
        >
          Create New
          <PlusCircle />
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name"/>
    </div>
  );
}
