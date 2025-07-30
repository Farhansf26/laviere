'use client'

import Heading from "@/components/ui/heading"

export default function SearchFallback() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Heading
        title="Produk Tidak Ditemukan!"
        description="Gunakan kata kunci yang lain"
        center
      />
    </div>
  )
}
