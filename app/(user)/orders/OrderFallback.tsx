'use client'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { useRouter } from "next/navigation"
import { IoChevronBackCircle } from "react-icons/io5"

export default function SearchFallback() {
  const router = useRouter()
  
  return (
    <div className="flex space-y-3 items-center justify-center min-h-[70vh]">
      <Heading
        title="Anda belum memiliki pesanan!"
        description="Yuk, beli produk yang anda inginkan"
        center
      />
      <Button
        onClick={() => router.push('/')}
      >
        <IoChevronBackCircle/>
        Kembali ke Beranda
      </Button>
    </div>
  )
}
