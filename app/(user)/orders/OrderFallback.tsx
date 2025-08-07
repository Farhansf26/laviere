'use client'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { useRouter } from "next/navigation"
import { FaHome } from "react-icons/fa"

export default function OrdersFallback() {
  const router = useRouter()
  
  return (
    <div className="flex flex-col space-y-3 items-center justify-center min-h-[70vh]">
      <Heading
        title="Anda belum memiliki pesanan!"
        description="Yuk, beli produk yang anda inginkan"
        center
      />
      <Button
        onClick={() => router.push('/')}
      >
        Kembali ke Beranda
        <FaHome/>
      </Button>
    </div>
  )
}
